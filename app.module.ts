import { Module } from '@nestjs/common';
import { WeatherModule } from './src/weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './src/configs/config';
import { WeatherOrmEntity } from '@/weather/entities/weather.orm.entity';

@Module({
	imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: config.db.host,
          port: config.db.port,
          username: config.db.user,
          password: config.db.password,
          database: config.db.database,
          entities: [WeatherOrmEntity],
          synchronize: config.db.synchronize,
        }),
        WeatherModule,
      ],
})
export class AppModule {}
