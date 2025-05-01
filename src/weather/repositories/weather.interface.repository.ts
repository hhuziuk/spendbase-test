import { Weather } from '../entities/weather.domain.entity';

export const WEATHER_REPOSITORY = 'WEATHER_REPOSITORY';

export interface IWeatherRepository {
	create(weather: Weather): Promise<Weather>;
	getBy(lat: number, lon: number, part: string): Promise<Weather | null>;
}
