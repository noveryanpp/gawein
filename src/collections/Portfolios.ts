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
            name: 'description',
            type: 'textarea',
            required: false,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            required: false,
        },
        {
            name: 'order',
            type: 'number',
            required: true,
        },
    ],
}
