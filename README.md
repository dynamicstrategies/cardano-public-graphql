# Cardano Public API Service

<p>This is a public service that gives access to the Cardano Blockchain to the public via an API. It is not directly affiliated wih the Cardano Foundation or IOHK.</p>

## Building Blocks
<p>The following repos area used with modifications</p>

- [cardano-graphql](https://github.com/input-output-hk/cardano-graphql)
- [cardano-wallet](https://github.com/input-output-hk/cardano-wallet)

## How to Query
<p>The two services are available at port 8010 for the graphql and port 8050 for the wallet</p>

### What front end client to use?
You can choose one of the clients from this [List](https://graphql.org/code/) for your favourite language

### Cardano GraphQL

`https://cnode.dynamicstrategies.io:8010`

The following use case have been documented in the graphql_sample_queries folder:
- **chainTip** - returns the block numbe that is at the top of the blockchain
- **stakePoolTickers** - returns the list of pool Tickers with their pool ids
- **poolHash** - returns a list of pools with their pool_id and their pool hashes that uniquely identifies the pool
- **poolMetadata** - returns a list of Pools with their Metadata hashes and Urls
- **poolUpdate** - returns a list of updates that were done to all pools, this can be filtered by pool id or by update id


### Cardano Wallet


`https://cnode.dynamicstrategies.io:8050`