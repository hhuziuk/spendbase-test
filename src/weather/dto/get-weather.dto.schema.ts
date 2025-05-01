import * as z from 'zod';

export const GetWeatherQueryDtoSchema = z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    part: z.string().nonempty()
});

export type CreateWeatherDtoType = z.infer<typeof GetWeatherQueryDtoSchema>;