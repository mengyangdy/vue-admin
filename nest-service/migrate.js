const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const connection = await mysql.createConnection({
    host: '119.8.103.97',
    port: 3306,
    user: 'root',
    password: 'MENgyang110.',
    database: 'nest_admin_sql'
  });

  try {
    // 读取 SQL 文件
    const sqlPath = path.join(__dirname, 'db/drizzle/0000_lonely_champions.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('执行迁移 SQL:');
    console.log(sql);
    
    // 执行 SQL
    await connection.execute(sql);
    console.log('✅ 迁移执行成功！');
    
  } catch (error) {
    console.error('❌ 迁移执行失败:', error.message);
  } finally {
    await connection.end();
  }
}

runMigration();
