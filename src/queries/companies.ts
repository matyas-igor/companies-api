import 'apollo-cache-control'
import path from 'path'
import { applyFilters, filterByQuery, filterByValues, paginate, sort } from '../helpers/query'
import { Order } from '../helpers/types'

const companies = require(path.join(__dirname, `../../fixtures/companies.json`))

export const CompaniesQuery = {
  companies: async (
    _source,
    { q, cities = [], specialities = [], offset = 0, limit = 20, sortBy = { field: 'name', order: 'asc' } },
    context,
    info
  ) => {
    info.cacheControl.setCacheHint({ maxAge: 300 })
    // apply filtering
    const companiesFiltered = applyFilters(companies, [
      filterByValues('city', cities),
      filterByValues('speciality', specialities),
      filterByQuery('name', q),
    ])
    // apply sorting & pagination
    const companiesNodes = paginate(sort(companiesFiltered, sortBy.field, sortBy.order as Order), offset, limit)
    return {
      offset,
      limit,
      total: companiesFiltered.length,
      nodes: companiesNodes,
    }
  },
}
