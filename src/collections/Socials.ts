import { getPayload, type GlobalConfig } from 'payload'
import configPromise from '@/payload.config'

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
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.platform === 'other',
          },
          validate: (value: any, { siblingData }: any) => {
            if (siblingData?.platform === 'other' && !value) {
              return 'Icon is required when platform is Other'
            }
            return true
          },
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
      ],
      hooks: {
        beforeChange: [
          async ({ value }: any) => {
            if (!Array.isArray(value)) return value
            const payload = await getPayload({ config: configPromise })
            return Promise.all(
              value.map(async (item: any) => {
                if (
                  item.platform &&
                  item.platform !== 'other'
                ) {
                  const media = await payload.find({
                    collection: 'media',
                    where: { filename: { equals: (item.platform + '.svg') } },
                    limit: 1,
                  })
                  if (media.docs.length > 0) {
                    item.icon = media.docs[0].id
                  }
                }
                return item
              })
            )
          },
        ],
      },
    },
  ],
}
