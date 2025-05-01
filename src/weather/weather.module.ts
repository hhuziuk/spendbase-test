import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';
import { WEATHER_REPOSITORY } from './repositories/weather.interface.repository';
import { WeatherRepository } from './repositories/weather.repository';
import { config } from '../configs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherOrmEntity } from './entities/weather.orm.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: config.axios.timeout,
      maxRedirects: config.axios.maxRedirects,
    }),
    TypeOrmModule.forFeature([WeatherOrmEntity]),
  ],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    {
      provide: WEATHER_REPOSITORY,
      useClass: WeatherRepository,
    },
  ],
})
export class WeatherModule {}
