# Cardano Public API Service

<p>This is a public service that gives access to the Cardano Blockchain to the public via an API. It is not directly affiliated wih the Cardano Foundation or IOHK.</p>

## Building Blocks
<p>The following repos area used with modifications</p>

- [cardano-graphql](https://github.com/input-output-hk/cardano-graphql)
- [cardano-wallet](https://github.com/input-output-hk/cardano-wallet)

## How to Query
<p>The two services are available at port 8010 for the graphql and port 8050 for the wallet</p>

### Cardano GraphQL

`https://cnode.dynamicstrategies.io:8010`

The following use case have been documented in the graphql_sample_queries folder:
- **chainTip** - returns the block numbe that is at the top of the blockchain
- 

### Cardano Wallet

`https://cnode.dynamicstrategies.io:8050`