import path from 'node:path'
import type { PrismaConfig } from 'prisma'

// import your .env file
import 'dotenv/config'

type Env = {
  DATABASE_URL: string
}
export default {
  earlyAccess: true,
  schema: path.join('prisma', './'),
} satisfies PrismaConfig<Env>
