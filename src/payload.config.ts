import * as nodeMailer from 'nodemailer'
import { Media } from './collections/Media'
import { Pages } from '@/collections/Pages'
import { Honorees } from '@/collections/Honorees'
import { Sponsors } from '@/collections/Sponsors'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'

import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import path from 'path'
import { buildConfig, getPayload } from 'payload'
import configPromise from '@payload-config'
import { fileURLToPath } from 'url'

import { revalidateRedirects } from './hooks/revalidateRedirects'

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page } from 'src/payload-types'
import { Users } from '@/collections/Users'
import { SiteOptions } from '@/SiteOptions/config'
import { Footer } from '@/Footer/config'
import { Header } from '@/Header/config'
import { LimitedSelect } from '@/blocks/Form/LimitedSelect/config'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import * as process from 'node:process'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const transporter = nodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Pioneer Auto Show` : 'Pioneer Auto Show'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@mcbridemilitarybbq.com',
    defaultFromName: 'McBride Military BBQ',
    transport: transporter,
  }),
  collections: [Users, Media, Pages, Honorees, Sponsors],
  globals: [Header, Footer, SiteOptions],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages', 'media'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              return !('name' in field && field.name === 'url')
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
        LimitedSelect,
      },
      beforeEmail: async (emails, beforeChangeParams) => {
        console.log("-----------------",beforeChangeParams.data.submissionData);

        try {
          const submissionData = beforeChangeParams.data.submissionData;

          if (!process.env.ZAPIER_URL || !submissionData.find((x: { field: string }) => x.field === 'role')){//A silly way to tell if it's the volunteer form
            return emails
          }

          await fetch(process.env.ZAPIER_URL, {
            method: "POST",
            body: JSON.stringify({
              name: submissionData.find((x: { field: string }) => x.field === 'name'),
              email: submissionData.find((x: { field: string }) => x.field === 'email'),
              role: submissionData.find((x: { field: string }) => x.field === 'role')
            })
          })
        } catch (e) {
          console.log(e)
        }

        return emails
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
      formSubmissionOverrides: {
        hooks: {
          beforeValidate: [
            async (a) => {
              const payload = await getPayload({ config: configPromise })

              if (!a?.data?.form) return true

              const form = await payload.findByID({
                collection: 'forms',
                id: a.data.form,
              })

              if (!form || !form.fields) return a.data

              const limitFieldsArray = form.fields.filter((x) => {
                if (x.blockType !== 'limitedSelect') return false

                return x
              })

              if (limitFieldsArray.length === 0) return a.data

              console.log({
                ...form,
                fields: {
                  ...form.fields.map((field) => {
                    if (field.blockType !== 'limitedSelect') return field

                    return {
                      ...field,
                      options: field?.options?.map((option) => {
                        const optionToUpdate = a?.data?.submissionData.find(
                          (data: { field: string }) => data.field === field.name,
                        )

                        if (option.value === optionToUpdate.value) {
                          return {
                            ...option,
                            limit: option.limit - 1,
                          }
                        }

                        return option
                      }),
                    }
                  }),
                },
              })

              await payload.update({
                collection: 'forms',
                id: a.data.form,
                data: {
                  ...form,
                  fields: form.fields.map((field) => {
                    if (field.blockType !== 'limitedSelect') return field

                    return {
                      ...field,
                      options: field?.options?.map((option) => {
                        const optionToUpdate = a?.data?.submissionData.find(
                          (data: { field: string }) => data.field === field.name,
                        )

                        if (option.value === optionToUpdate.value) {
                          return {
                            ...option,
                            limit: option.limit - 1,
                          }
                        }

                        return option
                      }),
                    }
                  }),
                },
              })

              return a.data
            },
          ],
        },
      },
    }),
  ],
})
