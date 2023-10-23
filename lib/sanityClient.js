import { createClient } from '@sanity/client'

const config= {
 projectId: "z4k56ebm",
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: "skKQCrMMo7Xp1cN23K5UrXjNQg0q4SiI3qXpqMncbfcoh3Zj538K612992M2CExYHLYDJWa2sd5Xb0M4cSDJwkvgOJQmHVqF14ImWo2HuRPSroGeLP11oyqxTMKkF2mRF50GDo1N3HI7fbtCTYgQHERwMoGARRBeNHzc54mzASkZz7TgTaxc",
  useCdn: false,
}


export const client = createClient(config)

