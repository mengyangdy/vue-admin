import {defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema:'./db/schema.ts',
  dialect:'mysql',
  out:'./db/drizzle',
  dbCredentials:{
    host:'119.8.103.97',
    port:3306,
    user:'root',
    password:'MENgyang110.',
    database:'nest_admin_sql'
  }
})