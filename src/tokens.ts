import { config } from "dotenv"
config()


const bot_token = process.env.BOT_TOKEN ?? "Anything"
if (bot_token === "Anything") {
  throw new Error('BOT_TOKEN must be provided!')
}

const api_token = process.env.WEATHERAPI_TOKEN
if (api_token === undefined) {
  throw new Error('WEATHERAPI_TOKEN must be provided!')
}

const open_token = process.env.OPENWEATHER_TOKEN
if (open_token === undefined) {
  throw new Error('OPENWEATHER_TOKEN must be provided!')
}

export { bot_token, api_token, open_token }