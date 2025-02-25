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
        }),
        formations: defineCollection({
            type: 'page',
            source: 'formations/*.md',
            schema: z.object({
                title: z.string(),
                category: z.string(),
                level: z.string().default('Tous niveaux'),
                description: z.string(),
                order: z.number().default(0)
            })
        }),
        projects: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                image: z.string().default('/placeholder.webp'),
                tags: z.array(z.string()).default([])
            })
        }),
        clients: defineCollection({
            type: 'page',
            source: 'clients/*.md',
            schema: z.object({
                name: z.string(),
                logo: z.string()
            })
        })
    }
})
