import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
      defaultValue: 'Konsultasi Gratis',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: false,
      defaultValue: '/contact',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
    },
  ],
}
