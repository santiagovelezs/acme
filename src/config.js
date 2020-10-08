import { config } from "dotenv"
config()

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://mongo/acmedb",
  PORT: process.env.PORT || 3000,
  SECRET: 'ACME-Hotel-API-UAM-2020'
}