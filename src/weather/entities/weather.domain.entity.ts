export class Weather {
	constructor(
		public readonly weatherId: string,
		public readonly lat: number,
		public readonly lon: number,
		public readonly part: string,
		public readonly sunrise: number,
		public readonly sunset: number,
		public readonly temp: number,
		public readonly feels_like: number,
		public readonly pressure: number,
		public readonly humidity: number,
		public readonly uvi: number,
		public readonly wind_speed: number
	) {}
}
