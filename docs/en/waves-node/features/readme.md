# Features

**Feature** is a new functionality added to the [Waves blockchain](/en/blockchain/blockchain) during a new [release](https://github.com/wavesplatform/Waves/releases).

Each feature has a name and a unique feature ID.

Waves nodes currently support the following features:

| Feature ID |                        Name                       | Description                                                                                                                                                                                              | Blockchain Height* | Activation Date |
|------------|:-------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|-----------------|
| 1          | Minimum Generating Balance of 1000 WAVES          | Min generating balance of the mining account has to be 1000 WAVES, for the accout to generate blocks                                                                                                     | 810 000           | Dec 2017        |
| 2          | NG Protocol                                       | Transition to Waves NG protocol                                                                                                                                                                          | 805 000           | Dec 2017        |
| 3          | Mass Transfer Transaction                         | Introduction of mass transfer transaction                                                                                                                                                                | 940 000           | Mar 2018        |
| 4          | Smart Accounts                                    | Introduction of smart accounts                                                                                                                                                                           | 1 190 000         | Sep 2018        |
| 5          | Data Transaction                                  | Introduction of data transactions                                                                                                                                                                        | 1 060 000         | Jun 2018        |
| 6          | Burn Any Tokens                                   | Ability of the issuer to burn tokens                                                                                                                                                                     | 1 070 000         | Jul 2018        |
| 7          | Fee Sponsorship                                   | Introduction of sponsor transactions                                                                                                                                                                     | 1 080 000         | Jul 2018        |
| 8          | Fair PoS                                          | Changes in PoS protocol. The share of generated blocks must match the share of the node generating balance                                                                                               | 1 100 000         | Jul 2018        |
| 9          | Smart Assets                                      | Introduction of smart assets                                                                                                                                                                             | 1 340 000         | Jan 2019        |
| 10         | Smart Account Trading                             | Ability to place smart account orders. The Matched-account can be smart account or dApp                                                                                                                  | 1 340 000         | Jan 2019        |
| 11         | RIDE 4 DAPPS                                      | Improvements of Ride language. Added [functions]. Introduced script invocation transaction                                                                                                               | 1 610 000         | Jul 2019        |
| 12         | Order Version 3                                   | Ability to set order comission in any token                                                                                                                                                              | 1 610 000         | Jul 2019        |
| 13         | Reduce NFT fee                                    | If the amount of token in the issuing transaction is 1, the number of decimal places is 0, and the token cannot be reissued, then the commission for such a transaction will be 0.001 WAVES instead of 1 | 1 610 000         | Jul 2019        |
| 14         | Block Reward and Community Driven Monetary Policy | Introduction of mining reward                                                                                                                                                                            | 1 740 000         | Oct 2019        |

>*Mainnet blockchain height where the feature was activated.

## Feature Status

Each feature can be in one of three statuses:

1. Voting
2. Approved
3. Activated

## Activation Process of New Features

When some new feature is developed and released, it must be activated.

* Activation process consists of "voting" period and "activation" period. Each mining node (which generates blocks) can set in its configuration a parameter to vote for this new feature. After that all blocks generated by such a node contain the vote for the feature.

* Every 3000 blocks on testnet (10000 blocks on mainnet) - it's an "election period". If there are not less than 2700 blocks on testnet (8000 blocks on mainnet) with support of the feature during the election period, the feature becomes "voted". After it's "voted" there is a period of "activation" - 3000 blocks for testnet (10000 blocks for mainnet). After they all passed, the feature start working. At this moment all nodes which can not supports such feature (old versions) stops.

## Feature Activation Protocol

**Feature activation protocol** is a procedure according to which a new [feature](/en/waves-node/features/feature) gets activated, i.e. it gets the "activated" status.

For more details see [Activation protocol](/en/blockchain/waves-protocol/activation-protocol) page.
