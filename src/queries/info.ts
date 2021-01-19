import 'apollo-cache-control'
import path from 'path'

const cities = require(path.join(__dirname, `../../fixtures/cities.json`))
const specialities = require(path.join(__dirname, `../../fixtures/specialities.json`))

export const InfoQuery = {
  info: async (_source, args, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: 300 })
    return {
      cities,
      specialities,
    }
  },
}
