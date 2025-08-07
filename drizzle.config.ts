import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/migrations',
  schema: './src/main/db/schemas',
  dialect: 'sqlite'
})
