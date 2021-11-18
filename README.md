# Cardano Public API Service

<p>This is a public service that gives access to the Cardano Blockchain to the public via an API. It is not directly affiliated wih the Cardano Foundation or IOHK.</p>

## Building Blocks
<p>The following repos area used:</p>

- [cardano-graphql](https://github.com/input-output-hk/cardano-graphql)
- [cardano-wallet](https://github.com/input-output-hk/cardano-wallet)

## How to Query
<p>The two services are available at port 8010 for the graphql and port 8050 for the wallet</p>

### What front end client to use?
You can choose one of the clients from this [List](https://graphql.org/code/) for your favourite language.
Or use the light client

### Light GraphQL Client
<p>A light client is included in the folder clientgql in this repo, and a working version of it open
to the public is available at the following path.</p>
<p>The idea is that you should be able to try out different queries and use it to quickly prototype
something useful.</p>

`https://dynamicstrategies.io/gqclient`

### Cardano GraphQL
<p>This is the API endpoint where you can send GraphQL queries and it will return the content 
from the Cardano blockchain. You need a GraphQL client to query this endpoint</p>

`https://cnode.dynamicstrategies.io:8010/v1/graphql`

The following use case have been documented in the graphql_sample_queries folder:
- **chainTip** - returns the block numbe that is at the top of the blockchain
- **stakePoolTickers** - returns the list of pool Tickers with their pool ids
- **poolHash** - returns a list of pools with their pool_id and their pool hashes that uniquely identifies the pool
- **poolMetadata** - returns a list of Pools with their Metadata hashes and Urls
- **poolUpdate** - returns a list of updates that were done to all pools, this can be filtered by pool id or by update id


### Cardano Wallet


`https://cnode.dynamicstrategies.io:8050`



## Useful notes
### Create local api proxy to avoid issue with CORS
<p>If clone the repo and decide to run a local version of the Light Client you are likeely
to get errors related to CORS. To solve it you should run a local proxy server</p>

`lcp --proxyUrl https://cnode.dynamicstrategies.io:8010/v1/graphql`

<p>And then you should point all your graphQL API queries to </p>

`http://localhost:8010/proxy`

<p>The issue with CORS is well explained here</p>

[Link](https://medium.com/tribalscale/stop-cursing-cors-c2cbb4997057)