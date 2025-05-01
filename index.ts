import 'reflect-metadata';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { config } from './src/configs/config';

(async () => {
	try {
		const app = await NestFactory.create(AppModule);

		app.setGlobalPrefix('api');

		const port = config.port;
		await app.listen(port);
		console.log(`aap is running on: http://localhost:${port}/api`);
	} catch (e) {}
})();
