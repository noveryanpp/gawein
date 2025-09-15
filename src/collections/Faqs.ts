import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question', // or your tag field
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
    }
  ],
}
