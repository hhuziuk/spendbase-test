import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	Query,
	UseInterceptors
} from '@nestjs/common';
import { CreateWeatherDto } from '../dto/create-weather.dto';
import { GetWeatherQueryDto } from '../dto/get-weather.dto';
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor';
import { WeatherService } from '../services/weather.service';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import { CreateWeatherDtoSchema } from '../dto/create-weather.dto.schema';
import { GetWeatherQueryDtoSchema } from '../dto/get-weather.dto.schema';

@Controller('weather')
export class WeatherController {
	constructor(private readonly weatherService: WeatherService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ZodValidationPipe(CreateWeatherDtoSchema)) dto: CreateWeatherDto) {
		return await this.weatherService.create(dto);
	}

	@Get()
	@UseInterceptors(TransformInterceptor)
	@HttpCode(HttpStatus.OK)
	async getWeather(@Query(new ZodValidationPipe(GetWeatherQueryDtoSchema)) dto: GetWeatherQueryDto) {
		const result = await this.weatherService.getResponse(dto);
		if (!result) throw new NotFoundException('Weather not found');
		return result;
	}
}
