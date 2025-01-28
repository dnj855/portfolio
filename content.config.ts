import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        code: defineCollection({
            type: 'page',
            source: 'code/*.md',
            schema: z.object({
                title: z.string(),
                visible: z.string(),
            })
        })
    }
})
