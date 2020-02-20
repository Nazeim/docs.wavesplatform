# Rollback Waves Node

You can **rollback** your node to a specific height to remove all blocks after that given height.

There are two options:

1. You can implement rollback under the following condition: **the rolling back can be implemented no more than 2000 blocks**. Implement the rollback by using `POST /debug/rollback` with the **API key** \(See [_**Waves Full Node API**_](https://nodes.wavesplatform.com/api-docs/index.html#!/debug/rollback)\). For example,

   ```js
      {
        "rollbackTo": 1057490,
        "returnTransactionsToUtx": false
      }
   ```

2. If the condition is not met \(you need to rollback to more than 2000 blocks\), then follow the steps described in  [Options for Getting Actual Blockchain](/en/waves-node/options-for-getting-actual-blockchain) article to get the actual blockchain state.

You can use [**chaincmp**](https://github.com/wavesplatform/gowaves/releases/tag/v0.1.2) utility to compare blockchains on the node and reference nodes.

## Common Issues While Implementing a Rollback

If you request a **rollback** via **curl/swagger** and get **error 503,** it doesn't mean the request is not processed \(It means that it timed out\). To make sure that the node is actually processing, check that the node state doesn't change \(with status check if the block height is not rising\) after starting to reroll. It will take some processing time to start _synchronization_ again from a desired location.  
The node can process a **rollback** to up to **2000 blocks** without restating database, so if the node is on fork for some reason then rollback as soon as possible or you will have to restate and that will probably take longer time.
