#!/bin/bash

# Vue Admin 项目部署脚本
# 使用方法: ./deploy.sh [环境] [操作]
# 示例: ./deploy.sh prod up

set -e

# 配置变量
PROJECT_NAME="vue-admin"
PROJECT_DIR="/home/$(whoami)/projects/$PROJECT_NAME"
ENV_FILE=".env.production"
COMPOSE_FILE="docker-compose.prod.yml"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# 检查 Docker 是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
    
    log_info "Docker 环境检查通过"
}

# 检查项目目录
check_project_dir() {
    if [ ! -d "$PROJECT_DIR" ]; then
        log_error "项目目录不存在: $PROJECT_DIR"
        log_info "请先上传项目代码到服务器"
        exit 1
    fi
    
    cd "$PROJECT_DIR"
    log_info "项目目录: $(pwd)"
}

# 检查环境变量文件
check_env_file() {
    if [ ! -f "$ENV_FILE" ]; then
        log_warn "环境变量文件不存在: $ENV_FILE"
        log_info "正在从模板创建环境变量文件..."
        cp env.example "$ENV_FILE"
        log_warn "请编辑 $ENV_FILE 文件，配置数据库连接等信息"
        log_info "编辑命令: nano $ENV_FILE"
        exit 1
    fi
    
    log_info "环境变量文件检查通过"
}

# 创建必要目录
create_directories() {
    mkdir -p logs
    log_info "创建必要目录完成"
}

# 启动服务
start_services() {
    log_info "启动生产环境服务..."
    docker-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build
    
    log_info "等待服务启动..."
    sleep 10
    
    # 检查服务状态
    docker-compose -f "$COMPOSE_FILE" ps
}

# 停止服务
stop_services() {
    log_info "停止服务..."
    docker-compose -f "$COMPOSE_FILE" down
}

# 重启服务
restart_services() {
    log_info "重启服务..."
    docker-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" restart
}

# 查看日志
view_logs() {
    log_info "查看服务日志..."
    docker-compose -f "$COMPOSE_FILE" logs -f
}

# 更新服务
update_services() {
    log_info "更新服务..."
    git pull
    docker-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build
}

# 健康检查
health_check() {
    log_info "执行健康检查..."
    
    # 检查后端服务
    if curl -f http://localhost:5001/health > /dev/null 2>&1; then
        log_info "后端服务健康检查通过"
    else
        log_error "后端服务健康检查失败"
    fi
    
    # 检查前端服务
    if curl -f http://localhost > /dev/null 2>&1; then
        log_info "前端服务健康检查通过"
    else
        log_error "前端服务健康检查失败"
    fi
}

# 显示帮助信息
show_help() {
    echo "Vue Admin 项目部署脚本"
    echo ""
    echo "使用方法:"
    echo "  $0 [操作]"
    echo ""
    echo "操作:"
    echo "  up       启动服务"
    echo "  down     停止服务"
    echo "  restart  重启服务"
    echo "  logs     查看日志"
    echo "  update   更新服务"
    echo "  health   健康检查"
    echo "  help     显示帮助"
    echo ""
    echo "示例:"
    echo "  $0 up      # 启动服务"
    echo "  $0 logs    # 查看日志"
    echo "  $0 health  # 健康检查"
}

# 主函数
main() {
    local action=${1:-help}
    
    case $action in
        up)
            check_docker
            check_project_dir
            check_env_file
            create_directories
            start_services
            health_check
            ;;
        down)
            check_docker
            check_project_dir
            stop_services
            ;;
        restart)
            check_docker
            check_project_dir
            restart_services
            health_check
            ;;
        logs)
            check_docker
            check_project_dir
            view_logs
            ;;
        update)
            check_docker
            check_project_dir
            update_services
            health_check
            ;;
        health)
            check_docker
            check_project_dir
            health_check
            ;;
        help|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"