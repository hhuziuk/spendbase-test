import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherOrmEntity } from '../entities/weather.orm.entity';
import { IWeatherRepository } from './weather.interface.repository';
import { Weather } from '../entities/weather.domain.entity';

@Injectable()
export class WeatherRepository implements IWeatherRepository {
	constructor(
		@InjectRepository(WeatherOrmEntity)
		private readonly repo: Repository<WeatherOrmEntity>
	) {}

	async create(weather: Weather): Promise<Weather> {
		const entity = this.repo.create(weather);
		const saved = await this.repo.save(entity);
		return saved;
	}

	async getBy(lat: number, lon: number, part: string): Promise<Weather | null> {
		const entity = await this.repo.findOne({
			where: { lat, lon, part }
		});
		if (!entity) return null;
		return entity;
	}
}
