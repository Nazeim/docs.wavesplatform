# Node Owner Guide

Waves uses peer-to-peer network for disseminating block and transaction information. Any computer running Waves blockchain software is considered a node. The structure of the peer-to-peer network impacts the security and performance of cryptocurrencies. A geographically clustered network can quickly propagate new blocks to many other nodes. This makes it more difficult for malicious miners to propagate conflicting blocks/transactions quicker than the honest nodes.

However, less clustered network means that full nodes are being run by a wider variety of users which is also good for decentralization.

Nodes are the critical components of Waves ecosystem. By Running a Waves node, you help processing transactions and you can increase your profit for securing the network if users [lease](/en/blockchain/leasing) their funds to your node \(You can lease any sum starting from 0.002 WAVES. The more WAVES you lease to a node, the more rewards you receive.\).

The WAVES you own \(or that have been leased to you\) reflect your mining power, the more you own, the higher your chances of processing the next block and receiving the transaction fees as a reward. The final amount will also depend on overall network activity and the level of fees generated.

A validating node is a node that [validates](en/blockchain/transaction/transaction-validation) transactions. A mining node is a node that does [mining](/en/blockchain/mining). Each mining node is a validating node.

Reasons to run node:

* Mining - earn profit
* Own project - get the latest blockchain data from your own node without having to trust third party. Send transations from your own node.
Use your node API, to be independent from trird party.
Tweak your own node to setup extended functionality for your project.

For details about Waves protocol, blockchain scalability and rewards see [Waves-NG Protocol](/en/blockchain/waves-protocol/waves-ng-protocol) article.

## Full Node

Running full node allows to take part in the decentralized process of block creation. The job of a full node is to store the blockchain data, pass along the data to other nodes (relay blocks and transactions to miners), and ensure newly added blocks are valid. Validation entails ensuring that the format of the block is correct, all hashes in the new block were computed correctly, the new block contains the hash of the previous block, and each transaction in the block is valid and signed by the appropriate parties (answer end user queries about the state of the blockchain). Full nodes may also act as mining nodes \(i.e., generating new blocks\), The mining node checks that each transaction is self-valid since the other nodes would reject the block if it includes invalid transactions.

Any node may propose new transactions, and these proposed transactions are propagated between nodes until they are eventually added to a block.

**Note:** You can find the list of the existing full nodes at [dev.pywaves.org](http://dev.pywaves.org/generators/).

## Mainnet, Testnet, Stagenet

There are three types of Waves blockchain network:

* [Mainnet](/en/blockchain/blockchain-network/main-network)
* [Testnet](/en/blockchain/blockchain-network/test-network)
* [Stagenet](/en/blockchain/blockchain-network/stage-network)

`Mainnet` carries out real transactions within Waves blockchain network, `Testnet` is similar, but the tokens in it have no value. `Stagenet` is Waves blockchain that is used for testing experimental functionality.

**Note**: In general, the difference between `Mainnet`, `Testnet` and `Stagenet` node is the config file (.conf) used.

## Running a Node

There are different options to run Waves full node. Review the [Node configuration](/en/waves-node/node-configuration) article to select an option that suits your needs. A running node can have zero balance, however, to create mining pool, a node must have the minimum balance of **1000 WAVES** (including Waves that are lease to the node).

### Installing a Node

There are different options to install Waves node. The installation methods are explained in [Install Waves Node](/en/waves-node/how-to-install-a-node/how-to-install-a-node) article.

### Getting Actual Blockchain

After installing a node, you need to get the blockchain database, using one of the methods described in [Get Waves Blockchain](/en/waves-node/options-for-getting-actual-blockchain) article.

### Upgrade Your Node

When you own a node, you need to check the [Releases](https://github.com/wavesplatform/Waves/releases/) page on a regular basis for the latest updates. Releases of new versions of node come with release notes document describing the new features and telling the node owner what actions to take to upgrade, depending on the type of the update.
To upgrade your node, follow the steps described in [Upgrade Waves Node](/en/waves-node/upgrading) article.

### Dealing With Forks

Fork is the moment when a blockchain splits in two seperate ones. Forks can happen because of node version difference (for example, when your node is of older version). Also, forks can be caused by malicious attacks or system failure. A forked node continues generating blocks, but it does not communicate with other valid nodes.
You can check the blockchain height or the last 100 signatures of blocks to understand if your node is on fork or not. Use [chaincmp](https://github.com/wavesplatform/gowaves/releases/tag/v0.1.2) utility to compare blockchains on your node and the reference nodes.

Your node can be on fork with height **less** than 2000 blocks or **more** than 2000 blocks.

* In case that your node is on fork with a height less than 2000 blocks, you can implement rollback as described in [Rollback Waves Node](/en/waves-node/how-to-rollback-a-node) article, after that restart the node to begin generating blocks.
* Otherwise, you need to go with one of the options described in [Get Waves Blockchain](/en/waves-node/options-for-getting-actual-blockchain) article.
