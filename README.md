# 🤖 Bitcoin's blocks Explorer - GraphQL API

Simple GraphQL API for blocks from Bitcoin's blockchain

- Built with Apollo and REST Data Sources
- Uses [Blockchain.com Explorer](https://www.blockchain.com/explorer) API

Hosted example: https://blocks-graphql-api.herokuapp.com/

![Screen Shot 2020-12-02 at 23 55 48](https://user-images.githubusercontent.com/3536796/100930451-67e4bc00-34e9-11eb-8d02-81a7528f49d5.png)

# Caching

- For caching in this project optimal setup would be Cache Aside strategy with LRU policy
- Caching can be implemented at two levels in Apollo - GraphQL level and Data Fetching level
  - In this project GraphQL resources caching is used (as described in [documentation](https://www.apollographql.com/docs/apollo-server/performance/caching/))
  - Also, caching together with requests deduplication is implemented in Data Sources itself (as described [in this post](https://khalilstemmler.com/blogs/graphql/how-apollo-rest-data-source-caches-api-calls/))
  - Cache population on start is not implemented for the simplicity reason
- For production setup I would have a separate instance with Redis or Memcached
  - To implement a single cache layer for multiple web server node instances
- For development setup I just used a simple built-in caching instruments from Apollo

# Logging

- Now used simple winston console logger
- In a real-world environment logs should be written into files and rotated

# Limitation

- Build and run scripts are not fully production-ready, they are not properly optimized
- Lots of things like proper validation are simplified
- No logging implemented at the moment
- It's still pretty naive implementation of blockchain-like API

# Examples

Query examples:

```graphql
{
  blocks(date: "2020-11-29", offset: 0, limit: 10) {
    total
    blocks {
      height
      hash
      time  
    }
  }
  
  block(hash: "0000000000000000000ca70f82b7fa348ddb5d00ed9526ed40a7ccf85e5b18e4") {
    hash
    ver
    fee
    prev_block
    mrkl_root
    time
    bits
    block_index
    height
    weight
    main_chain
    n_tx
    nonce
    size
  }
  
  transactions(hash: "0000000000000000000ca70f82b7fa348ddb5d00ed9526ed40a7ccf85e5b18e4", offset: 0, limit: 10) {
    total
    transactions {
      fee
      hash
      inputs {
        index
        prev_out {
          addr
          value
        }
      }
      lock_time
      out {
        addr
        value
      }
      size
      time
      tx_index
      weight
    }
  }
}
```
