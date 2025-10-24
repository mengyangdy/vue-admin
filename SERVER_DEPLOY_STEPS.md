# Vue Admin 项目云服务器部署步骤

## 📋 部署前准备

### 服务器要求

- **系统**: Ubuntu 20.04 LTS 或更高版本
- **内存**: 至少 2GB RAM
- **硬盘**: 至少 10GB 可用空间
- **网络**: 开放端口 80（HTTP）和 443（HTTPS，可选）

## 🚀 第一步：连接服务器

### 1.1 使用 SSH 连接服务器

```bash
# 在本地终端执行
ssh username@your-server-ip

# 例如：
ssh root@123.456.789.0
```

### 1.2 更新系统

```bash
# 更新包列表
sudo apt update

# 升级系统
sudo apt upgrade -y

# 安装必要工具
sudo apt install -y curl wget git vim
```

## 🐳 第二步：安装 Docker

### 2.1 安装 Docker

```bash
# 下载并安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 删除安装脚本
rm get-docker.sh
```

### 2.2 配置 Docker 用户权限

```bash
# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或执行以下命令使组权限生效
newgrp docker
```

### 2.3 验证 Docker 安装

```bash
# 检查 Docker 版本
docker --version

# 测试 Docker 是否正常工作
docker run hello-world
```

## 🔧 第三步：安装 Docker Compose

### 3.1 下载 Docker Compose

```bash
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 3.2 设置执行权限

```bash
# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

## 🗄️ 第四步：安装和配置 MySQL

### 4.1 安装 MySQL

```bash
# 安装 MySQL
sudo apt install mysql-server -y

# 启动 MySQL 服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 检查 MySQL 状态
sudo systemctl status mysql
```

### 4.2 配置 MySQL 安全设置

```bash
# 运行 MySQL 安全配置脚本
sudo mysql_secure_installation
```

**配置选项：**

- 设置 root 密码
- 删除匿名用户
- 禁止 root 远程登录
- 删除测试数据库
- 重新加载权限表

### 4.3 创建数据库和用户

```bash
# 登录 MySQL
sudo mysql -u root -p

# 创建数据库
CREATE DATABASE nest_admin_sql CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户（可选，也可以使用 root 用户）
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON nest_admin_sql.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

# 退出 MySQL
EXIT;
```

## 📁 第五步：上传项目代码

### 5.1 创建项目目录

```bash
# 创建项目目录
sudo mkdir -p /opt/vue-admin
sudo chown $(whoami):$(whoami) /opt/vue-admin
cd /opt/vue-admin
```

### 5.2 上传代码（选择一种方法）

**方法一：使用 Git（推荐）**

```bash
# 克隆项目代码
git clone https://github.com/your-username/vue-admin.git .

# 或者如果项目在本地，使用 SCP 上传
```

**方法二：使用 SCP 上传（在本地执行）**

```bash
# 在本地终端执行
scp -r ./vue-admin username@your-server-ip:/opt/vue-admin/
```

### 5.3 验证代码上传

```bash
# 检查项目文件
ls -la

# 应该看到以下文件：
# docker-compose.yml
# nest-service/
# src/
# package.json
# 等...
```

## ⚙️ 第六步：配置数据库连接

### 6.1 修改后端数据库配置

```bash
# 编辑数据库配置文件
nano nest-service/db/index.ts
```

**修改以下配置：**

```typescript
// nest-service/db/index.ts
const poolConfig = {
  host: 'localhost', // 数据库地址
  port: 3306, // 数据库端口
  user: 'root', // 数据库用户名（或你创建的用户）
  password: 'your-password', // 数据库密码
  database: 'nest_admin_sql', // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4',
  timezone: '+08:00',
};
```

### 6.2 修改数据库迁移配置

```bash
# 编辑数据库迁移配置
nano nest-service/drizzle.config.ts
```

**修改配置：**

```typescript
// nest-service/drizzle.config.ts
export default defineConfig({
  schema: './db/schema.ts',
  dialect: 'mysql',
  out: './db/drizzle',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'your-password',
    database: 'nest_admin_sql',
  },
});
```

## 🗃️ 第七步：初始化数据库

### 7.1 安装后端依赖

```bash
# 进入后端目录
cd nest-service

# 安装依赖
npm install
```

### 7.2 运行数据库迁移

```bash
# 运行数据库迁移
npx drizzle-kit push
```

**如果遇到错误，检查：**

- 数据库连接信息是否正确
- MySQL 服务是否正在运行
- 数据库用户权限是否正确

### 7.3 验证数据库

```bash
# 登录 MySQL 检查
mysql -u root -p

# 查看数据库
SHOW DATABASES;

# 查看表
USE nest_admin_sql;
SHOW TABLES;

# 退出
EXIT;
```

## 🚀 第八步：启动 Docker 服务

### 8.1 回到项目根目录

```bash
# 回到项目根目录
cd /opt/vue-admin
```

### 8.2 启动所有服务

```bash
# 构建并启动所有服务
docker-compose up -d --build
```

### 8.3 查看服务状态

```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## ✅ 第九步：验证部署

### 9.1 检查服务健康状态

```bash
# 检查后端服务
curl -f http://localhost:5001/health

# 检查前端服务
curl -f http://localhost
```

### 9.2 查看服务日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 9.3 访问应用

- **前端应用**: `http://your-server-ip`
- **后端 API**: `http://your-server-ip:5001`

## 🔒 第十步：配置防火墙（可选）

### 10.1 安装 UFW

```bash
# 安装 UFW
sudo apt install ufw -y
```

### 10.2 配置防火墙规则

```bash
# 允许 SSH
sudo ufw allow ssh

# 允许 HTTP
sudo ufw allow 80

# 允许 HTTPS（如果使用 SSL）
sudo ufw allow 443

# 启用防火墙
sudo ufw enable

# 查看防火墙状态
sudo ufw status
```

## 🔐 第十一步：配置 SSL（推荐）

### 11.1 安装 Certbot

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### 11.2 获取 SSL 证书

```bash
# 获取 SSL 证书（需要域名）
sudo certbot --nginx -d your-domain.com
```

## 🔧 常用管理命令

### 服务管理

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f [service-name]

# 进入容器
docker-compose exec [service-name] sh
```

### 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose up -d --build

# 只更新特定服务
docker-compose up -d --build frontend
```

### 数据库管理

```bash
# 备份数据库
mysqldump -u root -p nest_admin_sql > backup_$(date +%Y%m%d).sql

# 恢复数据库
mysql -u root -p nest_admin_sql < backup_20241201.sql
```

## 🐛 故障排除

### 1. 容器启动失败

```bash
# 查看详细日志
docker-compose logs [service-name]

# 检查容器状态
docker-compose ps

# 重新构建
docker-compose up -d --build --force-recreate
```

### 2. 数据库连接问题

```bash
# 检查 MySQL 服务状态
sudo systemctl status mysql

# 测试数据库连接
mysql -u root -p -h localhost

# 检查数据库
SHOW DATABASES;
```

### 3. 前端无法访问后端

```bash
# 检查 Nginx 配置
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# 检查网络连接
docker-compose exec frontend ping backend
```

## 📊 监控和维护

### 1. 查看资源使用情况

```bash
# 查看 Docker 资源使用
docker stats

# 查看系统资源
htop
```

### 2. 日志管理

```bash
# 查看应用日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 查看系统日志
sudo journalctl -f
```

## 🎉 部署完成！

如果所有步骤都成功执行，你应该能够：

1. **访问前端应用**: `http://your-server-ip`
2. **访问后端 API**: `http://your-server-ip:5001`
3. **查看服务状态**: `docker-compose ps`
4. **查看日志**: `docker-compose logs -f`

## 📞 如果遇到问题

请检查：

1. Docker 和 Docker Compose 是否正确安装
2. 端口是否被占用
3. 数据库连接是否正常
4. 服务器资源是否充足
5. 防火墙设置是否正确

---

**注意**: 请根据你的实际环境调整配置，特别是数据库连接信息。
