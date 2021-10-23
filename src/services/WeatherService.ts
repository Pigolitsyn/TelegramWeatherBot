import fetch from "node-fetch";
import { open_token, api_token } from "../config.js";

export class Weather {
	static async getWeatherWithCoords(lat: number, lon: number) {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${open_token}`);
		const data = await response.json();
		return data;
	}

	static async getWeather(city: string) {
		const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_token}&q=${city}&aqi=no`);
		const data = await response.json();
		return data;
	}
}