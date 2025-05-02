import * as z from 'zod';

export const GetWeatherQueryDtoSchema = z.object({
    lat: z.preprocess((val) => Number(val), z.number().min(-90).max(90)),
    lon: z.preprocess((val) => Number(val), z.number().min(-180).max(180)),
    part: z.string().nonempty()
  });

export type CreateWeatherDtoType = z.infer<typeof GetWeatherQueryDtoSchema>;