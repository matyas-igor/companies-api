# 🤖 GraphQL API for construction companies

Simple GraphQL API for construction companies

- Built with NodeJS, Apollo Server, Typescript

![Screen Shot 2021-01-19 at 21 10 51](https://user-images.githubusercontent.com/3536796/105075853-982ced80-5a8a-11eb-83d1-6a803e253e29.png)

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

# Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run start`

Runs the previously built app.

### `npm run develop`

Instantly start the app in a development mode.

### `npm run db:generate`

Regenerate database of companies.
