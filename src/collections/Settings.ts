import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Site Name',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline'
    },
    {
      name: 'mainLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Logo',
      required: true,
    },
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
      required: true,
    },
    {
      name: 'termsOfService',
      type: 'richText',
      label: 'Terms of Service',
      required: true,
    },
    {
      name: 'privacyPolicy',
      type: 'richText',
      label: 'Privacy Policy',
      required: true,
    },
  ],
}