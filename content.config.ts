import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        code: defineCollection({
            type: 'page',
            source: 'code/*.md',
            schema: z.object({
                title: z.string(),
                visible: z.string(),
                techs: z.array(z.string()),
                gallery: z.array(z.string()),
                links: z.record(z.string()),
            })
        }),
        nocode: defineCollection({
            type: 'page',
            source: 'nocode/*.md',
            schema: z.object({
                title: z.string(),
                softwares: z.array(z.string()),
            })
        })
    }
})
