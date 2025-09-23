import type { CollectionConfig } from 'payload';

export const Portfolios: CollectionConfig = {
    slug: 'portfolios',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: false,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                    required: false,
                }
            ]
        },
        {
            name: 'service',
            type: 'relationship',
            relationTo: 'services',
            required: true,
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        },
        {
            name: 'url',
            type: 'text',
            required: false,
        },
        {
            name: 'client',
            type: 'text',
            required: false,
        },
        {
            name: 'completedAt',
            type: 'date',
            required: false,
        },
        {
            name: 'technologies',
            type: 'array',
            fields: [
                {
                    name: 'technology',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'order',
            type: 'number',
            required: true,
        },
    ],
}
