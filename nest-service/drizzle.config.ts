import {defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema:'./db/schema.ts',
  dialect:'mysql',
  out:'./db/drizzle',
  dbCredentials:{
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'nest_admin_sql'
  }
})