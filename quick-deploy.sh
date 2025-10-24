#!/bin/bash

# Vue Admin 项目快速部署脚本
# 使用方法: ./quick-deploy.sh

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# 检查是否为 root 用户
check_root() {
    if [ "$EUID" -eq 0 ]; then
        log_error "请不要使用 root 用户运行此脚本"
        exit 1
    fi
}

# 更新系统
update_system() {
    log_step "更新系统..."
    sudo apt update && sudo apt upgrade -y
    sudo apt install -y curl wget git vim
    log_info "系统更新完成"
}

# 安装 Docker
install_docker() {
    log_step "安装 Docker..."
    
    if command -v docker &> /dev/null; then
        log_info "Docker 已安装"
    else
        log_info "正在安装 Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        rm get-docker.sh
        
        # 将当前用户添加到 docker 组
        sudo usermod -aG docker $USER
        log_info "Docker 安装完成，请重新登录或运行 'newgrp docker'"
    fi
}

# 安装 Docker Compose
install_docker_compose() {
    log_step "安装 Docker Compose..."
    
    if command -v docker-compose &> /dev/null; then
        log_info "Docker Compose 已安装"
    else
        log_info "正在安装 Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        log_info "Docker Compose 安装完成"
    fi
}

# 安装 MySQL
install_mysql() {
    log_step "安装 MySQL..."
    
    if command -v mysql &> /dev/null; then
        log_info "MySQL 已安装"
    else
        log_info "正在安装 MySQL..."
        sudo apt install -y mysql-server
        sudo systemctl start mysql
        sudo systemctl enable mysql
        log_info "MySQL 安装完成"
    fi
}

# 配置 MySQL
configure_mysql() {
    log_step "配置 MySQL..."
    
    log_warn "请手动配置 MySQL："
    echo "1. 运行: sudo mysql_secure_installation"
    echo "2. 创建数据库: CREATE DATABASE nest_admin_sql CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    echo "3. 修改 nest-service/db/index.ts 中的数据库连接信息"
    echo ""
    read -p "按回车键继续..."
}

# 创建项目目录
create_project_dir() {
    log_step "创建项目目录..."
    
    sudo mkdir -p /opt/vue-admin
    sudo chown $(whoami):$(whoami) /opt/vue-admin
    log_info "项目目录创建完成: /opt/vue-admin"
}

# 上传项目代码
upload_code() {
    log_step "上传项目代码..."
    
    log_warn "请手动上传项目代码到 /opt/vue-admin"
    echo "可以使用以下方法："
    echo "1. Git: git clone <repository-url> /opt/vue-admin"
    echo "2. SCP: scp -r ./vue-admin user@server:/opt/vue-admin/"
    echo ""
    read -p "按回车键继续..."
}

# 配置数据库连接
configure_database() {
    log_step "配置数据库连接..."
    
    log_warn "请手动修改数据库连接配置："
    echo "文件: /opt/vue-admin/nest-service/db/index.ts"
    echo "文件: /opt/vue-admin/nest-service/drizzle.config.ts"
    echo ""
    read -p "按回车键继续..."
}

# 初始化数据库
init_database() {
    log_step "初始化数据库..."
    
    cd /opt/vue-admin/nest-service
    
    if [ -f "package.json" ]; then
        log_info "安装后端依赖..."
        npm install
        
        log_info "运行数据库迁移..."
        npx drizzle-kit push
    else
        log_error "后端项目未找到"
        exit 1
    fi
}

# 启动服务
start_services() {
    log_step "启动服务..."
    
    cd /opt/vue-admin
    
    if [ -f "docker-compose.yml" ]; then
        log_info "构建并启动服务..."
        docker-compose up -d --build
        
        log_info "等待服务启动..."
        sleep 10
        
        # 检查服务状态
        docker-compose ps
    else
        log_error "docker-compose.yml 文件未找到"
        exit 1
    fi
}

# 健康检查
health_check() {
    log_step "执行健康检查..."
    
    # 检查后端服务
    if curl -f http://localhost:5001/health > /dev/null 2>&1; then
        log_info "✅ 后端服务健康检查通过"
    else
        log_warn "❌ 后端服务健康检查失败"
    fi
    
    # 检查前端服务
    if curl -f http://localhost > /dev/null 2>&1; then
        log_info "✅ 前端服务健康检查通过"
    else
        log_warn "❌ 前端服务健康检查失败"
    fi
}

# 显示访问信息
show_access_info() {
    log_step "部署完成！"
    
    echo ""
    echo "🎉 项目部署成功！"
    echo ""
    echo "访问地址："
    echo "  前端应用: http://$(hostname -I | awk '{print $1}')"
    echo "  后端 API: http://$(hostname -I | awk '{print $1}'):5001"
    echo ""
    echo "常用命令："
    echo "  查看服务状态: docker-compose ps"
    echo "  查看日志: docker-compose logs -f"
    echo "  重启服务: docker-compose restart"
    echo "  停止服务: docker-compose down"
    echo ""
}

# 主函数
main() {
    echo "🚀 Vue Admin 项目快速部署脚本"
    echo "=================================="
    echo ""
    
    check_root
    update_system
    install_docker
    install_docker_compose
    install_mysql
    configure_mysql
    create_project_dir
    upload_code
    configure_database
    init_database
    start_services
    health_check
    show_access_info
}

# 执行主函数
main "$@"
