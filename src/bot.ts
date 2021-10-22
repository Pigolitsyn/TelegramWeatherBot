import { Telegraf } from 'telegraf' 
import fetch from 'node-fetch'
import { bot_token, api_token, open_token } from './tokens.js'


async function getWeatherWithCoords(lat: Number, lon: Number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${open_token}`)
  const data = await response.json();
  return data
}


async function getWeather(city: String) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_token}&q=${city}&aqi=no`);
  const data = await response.json();
  return data;
}

const bot = new Telegraf(bot_token)
bot.start(ctx => ctx.reply("Enter city name"))

function calvinToCel(calvin: Number) {
  return (Number(calvin) - 273).toFixed(2)
}


bot.on("text", ctx => {
  getWeather(ctx.message.text).then((data: any) => {
  if (!data.error) {
    ctx.replyWithLocation(Number(data.location.lat), Number(data.location.lon))
    let icon_link = data.current.condition.icon
    icon_link = icon_link.replace('//', '')
    ctx.replyWithPhoto(icon_link)
    ctx.reply('Температура: ' + data.current.temp_c)
  } else ctx.reply("Нет такого места в базе")
  })
})
// Listening messages
bot.on("location", ctx => {
  getWeatherWithCoords(Number(ctx.message.location.latitude), Number(ctx.message.location.longitude)).then((data: any) => {
    // ctx.reply(`Температура: ${calvinToCel(data.main.temp)}`)
    console.log(data)
  })
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))