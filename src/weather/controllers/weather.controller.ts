import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateWeatherDto } from '../dto/create-weather.dto';
import { GetWeatherQueryDto } from '../dto/get-weather.dto';
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor';
import { WeatherService } from '../services/weather.service';


@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateWeatherDto) {
        return await this.weatherService.create(dto);
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    @HttpCode(HttpStatus.OK)
    async getWeather(@Query() dto: GetWeatherQueryDto) {
    const result = await this.weatherService.getResponse(dto);
    if (!result) throw new NotFoundException('Weather not found');
    return result;
    }
}
