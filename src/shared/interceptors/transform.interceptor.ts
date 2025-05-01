import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseData {
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	uvi: number;
	wind_speed: number;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor<any, ResponseData> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseData> {
		return next.handle().pipe(
			map((entity) => ({
				sunrise: entity.sunrise,
				sunset: entity.sunset,
				temp: entity.temp,
				feels_like: entity.feels_like,
				pressure: entity.pressure,
				humidity: entity.humidity,
				uvi: entity.uvi,
				wind_speed: entity.wind_speed
			}))
		);
	}
}
