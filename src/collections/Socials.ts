import type { GlobalConfig } from 'payload'

export const Socials: GlobalConfig = {
  slug: 'socials',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Reddit', value: 'reddit' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Working Hours', value: 'working-hours' },
            { label: 'Address', value: 'address' },
            { label: 'Other', value: 'other' },
          ],
          required: true,
        },
      ]
    },
  ],
}
