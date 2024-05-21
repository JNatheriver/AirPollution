import { z } from 'zod';

export type CurrentPollutionType = z.infer<typeof CurrentPollution>;

export const CurrentPollution = z.object({
    coord: z.object({
        lon: z.number().min(-180).max(180),
        lat: z.number().min(-90).max(90)
    }),
    list: z.array(z.object({
        main: z.object({
            aqi: z.number().min(1).max(5)
        }),
        components: z.object({
            co: z.number(),
            no: z.number(),
            no2: z.number(),
            o3: z.number(),
            so2: z.number(),
            pm2_5: z.number(),
            pm10: z.number(),
            nh3: z.number(),
        }),
        dt: z.number()
    })).max(1),
})

export function ConvertComponentsToArray(components: Record<string, number>){
    return Object.keys(components).map(k=>({
        key: k,
        value: components[k]
    }))
} 