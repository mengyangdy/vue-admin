# Vue Admin 项目生产环境部署指南

## ⚠️ 重要说明

**生产环境不建议使用 Docker 管理数据库**，原因：

- 数据安全性风险
- 性能损耗
- 备份恢复复杂
- 运维管理困难

**推荐方案：**

- 使用云数据库服务（阿里云 RDS、腾讯云 CDB 等）
- 使用独立的数据库服务器
- 使用数据库集群方案

## 📋 项目概述

这是一个基于 Vue 3 + Nest.js 的全栈管理系统，使用 Docker 容器化部署。

### 技术栈

- **前端**: Vue 3 + Vite + TypeScript + UnoCSS
- **后端**: Nest.js + TypeScript + MySQL + Drizzle ORM
- **部署**: Docker + Docker Compose + Nginx

## 🚀 生产环境快速部署

### 1. 服务器准备

确保你的服务器满足以下要求：

- Ubuntu 18.04 或更高版本
- 至少 2GB RAM
- 至少 10GB 可用磁盘空间
- 开放端口 80（HTTP）和 443（HTTPS）
- **外部数据库服务**（推荐）

### 2. 数据库准备

#### 方案一：云数据库服务（推荐）

```bash
# 阿里云 RDS MySQL 示例配置
DATABASE_HOST=rm-xxxxx.mysql.rds.aliyuncs.com
DATABASE_PORT=3306
DATABASE_NAME=vue_admin
DATABASE_USER=admin
DATABASE_PASSWORD=your-secure-password
```

#### 方案二：独立数据库服务器

```bash
# 独立服务器配置
DATABASE_HOST=db-server.your-domain.com
DATABASE_PORT=3306
DATABASE_NAME=vue_admin
DATABASE_USER=admin
DATABASE_PASSWORD=your-secure-password
```

### 3. 上传项目文件

将整个项目文件夹上传到服务器：

```bash
# 使用 git clone（推荐）
git clone your-repository-url
cd vue-admin
```

### 4. 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env.production

# 编辑配置文件，修改以下关键配置：
nano .env.production
```

**必须修改的配置：**

- `DATABASE_HOST` - 你的数据库地址
- `DATABASE_PASSWORD` - 数据库密码
- `JWT_SECRET` - JWT 密钥
- `CORS_ORIGIN` - 你的域名

### 5. 启动生产服务

```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

### 6. 验证部署

```bash
# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 检查健康状态
curl -f http://localhost:5001/health
curl -f http://localhost
```

## 🔧 手动部署步骤

如果自动部署失败，可以按照以下步骤手动部署：

### 1. 安装 Docker

```bash
# 更新包索引
sudo apt-get update

# 安装必要的包
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 设置稳定版仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新包索引
sudo apt-get update

# 安装 Docker Engine
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

### 2. 安装 Docker Compose

```bash
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env.production

# 编辑环境变量（必须修改数据库配置）
nano .env.production
```

### 4. 启动生产服务

```bash
# 构建并启动所有服务
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f
```

## 📊 服务管理

### 常用命令

```bash
# 启动生产服务
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d

# 查看服务状态
docker-compose -f docker-compose.prod.yml ps

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f [service-name]

# 重启服务
docker-compose -f docker-compose.prod.yml restart [service-name]

# 停止所有服务
docker-compose -f docker-compose.prod.yml down

# 更新服务
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### 服务说明

- **frontend**: Vue 前端应用，运行在 80 端口
- **backend**: Nest.js 后端 API，运行在 5001 端口
- **数据库**: 外部数据库服务（不在容器中）

## 🌐 访问应用

部署成功后，你可以通过以下地址访问：

- **前端应用**: `http://your-domain.com`
- **后端 API**: `http://your-domain.com/api`

## 🔒 安全配置

### 1. 修改默认密码

在生产环境中，请务必修改以下配置：

```bash
# 编辑 .env.production
nano .env.production

# 修改数据库密码
DATABASE_PASSWORD=your-secure-password

# 修改 JWT 密钥
JWT_SECRET=your-super-secret-jwt-key

# 修改 CORS 配置
CORS_ORIGIN=https://your-domain.com
```

### 2. 配置防火墙

```bash
# 安装 UFW
sudo apt-get install ufw

# 允许 SSH
sudo ufw allow ssh

# 允许 HTTP
sudo ufw allow 80

# 允许 HTTPS（如果使用 SSL）
sudo ufw allow 443

# 启用防火墙
sudo ufw enable
```

### 3. 配置 SSL（推荐）

使用 Let's Encrypt 配置 HTTPS：

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com
```

## 🐛 故障排除

### 1. 容器启动失败

```bash
# 查看详细日志
docker-compose -f docker-compose.prod.yml logs [service-name]

# 检查容器状态
docker-compose -f docker-compose.prod.yml ps

# 重新构建
docker-compose -f docker-compose.prod.yml up -d --build --force-recreate
```

### 2. 数据库连接问题

```bash
# 检查后端日志
docker-compose -f docker-compose.prod.yml logs backend

# 测试数据库连接
docker-compose -f docker-compose.prod.yml exec backend ping your-database-host
```

### 3. 前端无法访问后端

检查 Nginx 配置：

```bash
# 查看 Nginx 日志
docker-compose -f docker-compose.prod.yml logs frontend

# 检查 Nginx 配置
docker-compose -f docker-compose.prod.yml exec frontend cat /etc/nginx/conf.d/default.conf
```

## 📈 性能优化

### 1. 启用 Gzip 压缩

Nginx 配置已包含 Gzip 压缩。

### 2. 静态资源缓存

Nginx 配置已包含静态资源缓存策略。

### 3. 数据库优化

对于云数据库服务，通常已经过优化。如需进一步优化：

```sql
-- 检查数据库性能
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Slow_queries';
```

## 🔄 更新部署

当代码更新时：

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build

# 或者只更新特定服务
docker-compose -f docker-compose.prod.yml up -d --build frontend
```

## 📞 技术支持

如果遇到问题，请检查：

1. Docker 和 Docker Compose 是否正确安装
2. 端口是否被占用
3. 防火墙设置是否正确
4. 服务器资源是否充足
5. **数据库连接是否正常**

---

**注意**: 生产环境请务必使用外部数据库服务，确保数据安全和性能。
