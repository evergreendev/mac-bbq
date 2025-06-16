import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'The Black Hills community deeply appreciates the selfless dedication of our military members and their families in defending our freedoms. Each year, at the Military Appreciation Event, we honor several distinguished Airmen and Soldiers for their exemplary achievements both in their careers and within the community.',
  siteName: 'McBride Military Appreciation BBQ',
  title: 'McBride Military Appreciation BBQ',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
