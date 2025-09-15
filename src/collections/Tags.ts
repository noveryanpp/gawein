import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name', // or your tag field
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
