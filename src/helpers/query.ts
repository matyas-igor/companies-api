import fuzzysort from 'fuzzysort'
import { Order } from './types'

export const paginate = (data: any[], offset: number, limit: number): any[] => {
  return data.slice(offset, offset + limit)
}

export const sort = (data: any[], field: string, order: Order): any[] => {
  const type = typeof data?.[0]?.[field]
  if (type === 'number') {
    data.sort((a: number, b: number) => (order === 'desc' ? -1 : 1) * (a?.[field] - b?.[field]))
  } else if (type === 'string') {
    data.sort((a: string, b: string) => (order === 'desc' ? -1 : 1) * a?.[field]?.localeCompare(b?.[field]))
  }
  return data
}

type Filter = (data: any[]) => any[]

export const applyFilters = (data: any[], filterFns: Filter[]) => {
  return filterFns.reduce((currentData, filterFn: Filter) => filterFn(currentData), data)
}

export const filterByValues = (key: string, values: string[] = []): Filter => {
  return (data: any[]) => (values.length === 0 ? data : data.filter((item: any) => values.includes(item?.[key])))
}

export const filterByQuery = (key: string, q: string = ''): Filter => {
  return (data: any[]) =>
    !q
      ? data
      : fuzzysort
          .go<any>(q, data, { key })
          .map(({ obj }) => obj)
}
