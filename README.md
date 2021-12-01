# Cardano Public API Service

<p>A public service that gives the public access to the Cardano Blockchain via a GraphQL API. It is not directly affiliated wih the Cardano Foundation or IOHK.</p>

## Building Blocks
<p>The following repo was used for much of the back end:</p>

- [cardano-graphql](https://github.com/input-output-hk/cardano-graphql)

## How to Query
<p>Using your favourite GraphQL client, or a light client that was built for this project as described below</p>

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
<p>This is the API endpoint that accepts GraphQL queries and will return the content 
from the Cardano blockchain. You need a GraphQL client to query this endpoint</p>

`https://cnode.dynamicstrategies.io:8010/v1/graphql`

The following use case have been documented in the graphql_sample_queries folder, a note what each one does is in the comments in each file:
- adaPots
- adaPots_perEpoch
- blockDetails
- chainTip
- epochParams
- epochStats
- latestBlock
- metaData
- oneBlock
- poolHash
- poolMetadata
- poolUpdate_allPools
- poolUpdate_onePool
- poolUpdate_oneUpdate
- stakePoolTickers
- totalStaked
- transactionByHash
- UTXOAtAddress

**Rate Limits** - the API is currently limited to 1 request/second per IP address, with bursts up to 20 requests. This is plenty for individual users and small projects.

## Useful notes
### Create local api proxy to avoid issue with CORS
<p>If you are cloning the repo and running in local environment then you are likely
to get errors related to CORS. To solve it you should run a local proxy server</p>

`lcp --proxyUrl https://cnode.dynamicstrategies.io:8010/v1/graphql`

<p>And then you should point all your graphQL API queries to </p>

`http://localhost:8010/proxy`

<p>The issue with CORS is well explained here</p>

[Link](https://medium.com/tribalscale/stop-cursing-cors-c2cbb4997057)

## Uses Cases
<p>The following projects have rely on this API service for accessing data on the Cardano Blockchain</p>

- [Cardano Staking Reward Calculator](https://dynamicstrategies.io/crewardcalculator)