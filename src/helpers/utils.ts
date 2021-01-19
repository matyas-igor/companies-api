export const paginate = (data: any[], offset: number, limit: number) => {
  return data.slice(offset, offset + limit)
}