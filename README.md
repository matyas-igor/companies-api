# 🤖 GraphQL API for construction companies

Simple GraphQL API for construction companies built with Apollo Server.

# Examples

Query examples:

```graphql
{
  companies(limit: 10, cities: ["Bremen", "Cologne"], sortBy: { field: "name", order: desc } ) {
    limit
    offset
    total
    nodes {
      id
      name
      speciality
      logo
      city
    }
  }
  info {
    cities
    specialities
  }
}
```
