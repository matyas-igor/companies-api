import fs from 'fs'
import Chance from 'chance'

const COMPANIES_AMOUNT = 120

const chance = new Chance()

const main = () => {
  const specialities = JSON.parse(fs.readFileSync('./fixtures/specialities.json').toString())
  const cities = JSON.parse(fs.readFileSync('./fixtures/cities.json').toString())

  const companies = Array(COMPANIES_AMOUNT)
    .fill(undefined)
    .map((u, index) => ({
      id: index + 1,
      name: chance.company(),
      logo: `http://tinygraphs.com/squares/${chance.string({ length: 12, casing: 'lower', alpha: true })}?theme=bythepool&numcolors=4&size=220&fmt=svg`,
      speciality: specialities[chance.integer({ min: 0, max: specialities.length - 1 })],
      city: cities[chance.integer({ min: 0, max: cities.length - 1 })],
    }))

  fs.writeFileSync('./fixtures/companies.json', JSON.stringify(companies, null, 2))
}

main()
