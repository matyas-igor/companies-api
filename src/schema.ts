import { gql } from 'apollo-server'

export const typeDefs = gql`
  enum Order {
    asc
    desc
  }

  input SortBy {
    field: String!
    order: Order!
  }

  type Company {
    id: Int!
    name: String!
    logo: String!
    city: String!
    speciality: String!
  }

  type CompaniesConnection {
    offset: Int!
    limit: Int!
    total: Int!
    nodes: [Company]!
  }

  type Info {
    cities: [String]!
    specialities: [String]!
  }

  type Query {
    info: Info!
    companies(q: String, cities: [String], specialities: [String], offset: Int, limit: Int, sortBy: SortBy): CompaniesConnection!
  }
`
