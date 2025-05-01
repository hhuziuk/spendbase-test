import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IWeatherRepository, WEATHER_REPOSITORY } from '../repositories/weather.interface.repository';
import { CreateWeatherDto } from '../dto/create-weather.dto';
import { v4 } from 'uuid';
import { Weather } from '../entities/weather.domain.entity';
import { config } from '../../configs/config';
import { firstValueFrom } from 'rxjs';
import { GetWeatherQueryDto } from '../dto/get-weather.dto';

@Injectable()
export class WeatherService {
    constructor(
        @Inject(WEATHER_REPOSITORY)
        private readonly weatherRepository: IWeatherRepository,
        private readonly httpService: HttpService
    ) {}

    async create(dto: CreateWeatherDto) {

        const { lat, lon, part } = dto;

        const api = await this.fetchWeatherFromApi(lat, lon, part);

        const newWeather = new Weather(
        v4(),
        dto.lat,
        dto.lon,
        dto.part,
        api.sunrise,
        api.sunset,
        api.temp,
        api.feels_like,
        api.pressure,
        api.humidity,
        api.uvi,
        api.wind_speed,
        );

        return await this.weatherRepository.create(newWeather);
    }

    async getResponse(dto: GetWeatherQueryDto) {
        const { lat, lon, part } = dto;
        return await this.weatherRepository.getBy(lat, lon, part);
    }

    async fetchWeatherFromApi(
        lat: number,
        lon: number,
        part: string,
      ): Promise<{
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        uvi: number;
        wind_speed: number;
      }> {
        const url = 'https://api.openweathermap.org/data/3.0/onecall';
        const params: Record<string, string> = {
          lat: lat.toString(),
          lon: lon.toString(),
          exclude: part,
          appid: config.apiKey,
        };
      
        const response$ = this.httpService.get(url, { params });
        const { data } = await firstValueFrom(response$);
      
        const current = data.current;
        if (!current) {
          throw new Error('no data in weatherAPI response');
        }
      
        return {
          sunrise: current.sunrise,
          sunset: current.sunset,
          temp: current.temp,
          feels_like: current.feels_like,
          pressure: current.pressure,
          humidity: current.humidity,
          uvi: current.uvi, // i have problem, because there is no "uvi" param in openweatherMap response
          wind_speed: current.wind_speed,
        };
      }
}
