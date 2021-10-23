/* eslint-disable @typescript-eslint/no-explicit-any */
import { Telegraf } from "telegraf"; 
import { bot_token } from "./config.js";
import { Weather } from "./services/WeatherService.js";

const bot = new Telegraf(bot_token);
bot.start(ctx => ctx.reply("Enter city name"));

function calvinToCel(calvin: number) {
	return (calvin - 273).toFixed(2);
}


bot.on("text", ctx => {
	Weather.getWeather(ctx.message.text).then((data: any) => {
		if (!data.error) {
			ctx.replyWithLocation(data.location.lat, data.location.lon);
			let icon_link = data.current.condition.icon;
			icon_link = icon_link.replace("//", "");
			ctx.replyWithPhoto(icon_link);
			ctx.reply("Температура: " + data.current.temp_c);
		} else ctx.reply("Нет такого места в базе");
	});
});
// Listening messages
bot.on("location", ctx => {
	Weather.getWeatherWithCoords(ctx.message.location.latitude, ctx.message.location.longitude).then((data: any) => {
		ctx.reply(`Температура: ${calvinToCel(data.main.temp)}`);
		console.log(data);
	});
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));