---
sidebarDepth: 2
---

# Node Configuration

The **node configuration file** is a settings file of a [node](/en/blockchain/node).

The configuration system of Waves Node uses HOCON format. HOCON stands for Human-Optimized Config Object Notation. The complete description of HOCON could be found in the [Official HOCON documentation](https://github.com/typesafehub/config/blob/master/HOCON). The advantages of HOCON are simple syntax and ability to use comments.

## Default Configs and Overrides

### Default Configuration Embedded into JAR

An [example](https://github.com/wavesplatform/Waves/blob/master/node/src/main/resources/application.conf) of the default node configuration file that is embedded into jar-file is available on Github.

> After upgrading to version 1.0.2 please note if your `/etc/waves/waves.conf` was originally copied from a template, make sure that waves.directory points to the correct directory. If this option doesn't exist in the config, default directory will be used. For details, see [Waves Configuration Section](#Waves-Configuration-Section).

### Overriding Parameters When Running JAR-file

If you run JAR file it is recommended to override default parameters by passing a path to config file as the command line parameter then starting Waves Node application.

```bash
java -jar waves-all-0.13.3.jar waves.conf
```

Typically this file should contain your node's unique characteristics (ip, name, keys, etc...) and network-specific parameters similar to waves-mainnet or waves-testnet configs from previous sections (files shipped with DEB packages).

### MainNet and TestNet Config in DEB-packages

If you use DEB-packages to install a node, they also contain configuration files which override some parameters specific to the network:

* <https://github.com/wavesplatform/Waves/blob/master/node/waves-mainnet.conf>
* <https://github.com/wavesplatform/Waves/blob/master/node/waves-testnet.conf>
* <https://github.com/wavesplatform/Waves/blob/master/node/waves-stagenet.conf>

## Sections of the Configuration File

| Section         | Description                                                   |
|-----------------|---------------------------------------------------------------|
| [waves](#Waves-Configuration-Section)| essential node parameters and other configuration subsections |
| db              | blockchain database parameters                                |
| [network](#Network-Settings)| peer to peer network parameters                               |
| [wallet](#Wallet-Settings)| built in node wallet parameters                               |
| [blockchain](#Blockchain-Settings)| blockchain parameters                                         |
| [miner](#Miner-Settings)| blocks generator parameters                                   |
| [rest-api](#REST-API-Settings)        | node API parameters                                           |
| [synchronization](#Synchronization-Settings) | node synchronization parameters                               |
| [utx](#UTX-Pool-Settings)| unconfirmed transactions pool parameters                      |
| [features](#Features-Settings)        | features parameters                                           |
| [rewards](#Rewards-Settings)| rewards parameters                                            |
| kamon           | performance metrics parameters                                |
| metrics         | blocks, transactions and other info metrics parameters        |

### Waves Configuration Section

Root configuration section `waves` holds essential application parameters and other configuration subsections.

The `directory` parameter allows to set a path to the base application directory. It is possible to use environment variables to set configuration parameters. For example, by default, the base directory constructed relative to the user’s `HOME` environment variable. Please, do not enclose environment variables references in quotes, in this case, they will be handled as strings and won’t be resolved.

Make sure the defined directory has a correct owner set: `waves` for mainnet or `waves-testnet` for testnet.

By default, depending on the operating system and the type of blockchain, the following folders are used:

| | *nix | macOS | Windows |
| :--- | :--- | :--- | :--- |
| Mainnet | `$XDG_DATA_HOME/waves-mainnet` or `$HOME/.local/share/waves-mainnet` | `$HOME/Library/Application Support/waves-mainnet` | `%LOCALAPPDATA%/waves-mainnet` |
| Testnet | `$XDG_DATA_HOME/waves-testnet` or `$HOME/.local/share/waves-testnet` | `$HOME/Library/Application Support/waves-testnet` | `%LOCALAPPDATA%/waves-testnet` |
| Stagenet | `$XDG_DATA_HOME/waves-stagenet` or `$HOME/.local/share/waves-stagenet` | `$HOME/Library/Application Support/waves-stagenet` | `%LOCALAPPDATA%/waves-stagenet` |
| Custom | `$XDG_DATA_HOME/waves-custom-<character>*` or `$HOME/.local/share/waves-custom-<character>*` | `$HOME/Library/Application Support/waves-custom-<character>*` | `%LOCALAPPDATA%/waves-custom-<character>*` |

\* See the `address-scheme-character` parameter description in [Configuring Custom Blockchain](#section-20ddd805c332b711c4699ea1c9539300) section.

Use `leveldb-cache-size` parameter to set the size of the internal cache of LevelDB database.

**Note:** The number of bytes should be given to set the cache size parameter. But you can use size units: <ul><li>K - for kilobyte</li><li>M - for megabytes</li><li>G - for gigabytes</li></ul>

### Network Settings

In `network` section P2P network related settings could be set.

| Name                        | Description                                                                                                                                                                                                                                                                  | Default value                                                                                                                                                                                                         |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`                        | Sets the location of peers database where the node stores lists of known and blacklisted peers.                                                                                                                                                                              | By default, the path is resolved with regard to base `directory` from `waves` section                                                                                                                                 |
| `declared-address`            | Sets the external IP address and port number of the node. It’s necessary to work behind NAT in most cloud hosting, where the machine does not interface directly with the external address. The format of this parameter is "\[ip-address\] :\[port\]".                      | If you do not specify it, then your node connects to the P2P network, but it won’t listen to incoming connections so other nodes will not be able to connect. Other nodes are connected to your node using these data |
| `bind-address`                | Sets the IP address of local network interface on which Waves Node will accept incoming connections.                                                                                                                                                                         | By default, node binds to `0.0.0.0` that means that it will listen on all available network adapters                                                                                                                  |
| `port`                        | Sets the network port number to which other Waves nodes will connect. Check that the port is reachable from outside otherwise, your node will connect to P2P network only using outgoing connections. If this the port is taken by other application, your node won’t start. |                                                                                                                                                                                                                       |
| `node-name`                   | Sets the name of your node visible to other participants of the P2P network. The name transmitted during initial handshake.                                                                                                                                                  | By default, this parameter is commented out, which leads to random name generation                                                                                                                                    |
| `nonce`                       | This value is sent during a handshake. This value is used to distinguish nodes connected from one IP address.                                                                                                                                                                 | By default, it is not set and generated randomly.                                                                                                                                                                     |
| `known-peers`                 | This parameter stores the list of bootstrap nodes to which your node will establish outgoing connections while initializing.                                                                                                                                                      | By default it set to Testnet nodes.                                                                                                                                                                                   |
| `peers-data-residence-time`   | Sets the period of time during which the node stores information about external peer since last communication session with it.                                                                                                                       |                                                                                                                                                                                                                       |
| `black-list-residence-time`   | Sets the period of time for which information about external peer stays in the blacklist.                                                                                                                                                            |                                                                                                                                                                                                                       |
| `max-inbound-connections`     | Sets the maximum number of simultaneous inbound connections handled by the node.                                                                                                                                                                                             |                                                                                                                                                                                                                       |
| `max-outbound-connections`    | This parameter limits the number of outgoing network connections.                                                                                                                                                                                                               |                                                                                                                                                                                                                       |
| `max-single-host-connections` | Specifies the allowed number of network connections made from single IP address.                                                                                                                                                                                  |                                                                                                                                                                                                                       |
| `connection-timeout`          | This parameter can be used to change the network communication timeout.                                                                                                                                                                                                           |                                                                                                                                                                                                                       |
| `outbound-buffer-size`        | Sets the network buffer size. Better leave the default value, incorrect buffer size could lead to node malfunction.                                                                                                                                      |                                                                                                                                                                                                                       |
| `max-unverified-peers`        | This parameter can be used to change the maximum size of the buffer to store information about peers during handshake process.                                                                                                                                                                          |                                                                                                                                                                                                                       |
| `enable-peers-exchange`       | This parameter can be used to enable requesting and sending the information about peers.                                                                                                                                                                                                      |                                                                                                                                                                                                                       |
| `enable-blacklisting`         | This parameter allows to enable or disable blacklisting of peers.                                                                                                                                                                                                                 |                                                                                                                                                                                                                       |
| `peers-broadcast-interval`    | Sets the period of time between broadcasts of known peers list to other nodes.                                                                                                                                                                                   |                                                                                                                                                                                                                       |
| `handshake-timeout`           | Sets time period to wait for reply during handshake. In case of no reply the peer will be blacklisted.                                                                                                                                                           |                                                                                                                                                                                                                       |
| `upnp`                        | This section allows to set the UPnP settings. Actually, those settings are useful only if you run your Waves node on the home network where the node can ask your router to establish a tunnel.                                                                                     | By default, this functionality is disabled. Use `enable` parameter of `upnp` to enable this functionality.                                                                                                            |
| `traffic-logger`              | This section allows to enable or disable logging of some of the incoming or outgoing network messages. Network messages are logged at TRACE level.                                                                                                                                  |                                                                                                                                                                                                                       |

**Note:** All time span parameters are set in milliseconds. But duration units can be used to shorten the value. Supported units are: <ul><li>s - second, seconds</li><li>m - muinute, minutes</li><li>h - hour, hours</li><li>d - day, days</li></ul> For usage examples see the default configuration file above.

### Wallet Settings

In `wallet` section you can configure parameters of the wallet built in Waves node.

| Name     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default value                                                                              |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `file`     | Sets the path to the wallet file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | By default, the path to the file is calculated relative to the base application directory. |
| `password` | Sets the password string to protect the wallet file.                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                            |
| `seed`     | This parameter is used to recreate an existing wallet on a new node. Provide the BASE58 string of your seed here. If you don’t have any existing wallet, comment out this parameter and start the node. During the first run, the application will create a new wallet with a random seed for you. In this case, the seed will be displayed in the application log. If you miss it or if you don’t want to check the log files, it will also be available in REST API using the wallet/seed method. |                                                                                            |

**Warning:** The wallet is a critical part of your node. Better to create its file in a safe and protected location. Don’t forget to backup your wallet’s file. It’s recommended to remove the seed from the configuration file immediately after the start of the node. If an attacker gains access to this seed string, he has the access to all your funds on all your addresses!

#### Update Wallet's Settings

If you want to run the node with another wallet, use one of the following instuctions:

* Replace `wallet.dat` file with the file which contains SEED phrase of another wallet.

OR

* Delete/copy to another location your `wallet.dat` file for making directory `/wallet` empty. Then update SEED in config file.

Restart the node. After restarting the node will use another wallet settings.

### Blockchain Settings

In `blockchain` section you can select the blockchain type or create your own blockchain.

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-transactions-per-block-diff` | Sets the number of transactions stored in memory before storing on disk. Reducing the number could increase the number of disk operations.                                                                                                                                                                                                                                                  |               |
| `min-blocks-in-memory`            | Change the number of blocks stored in memory using this parameter.                                                                                                                                                                                                                                                                                                                          |               |
| `type`                            | This parameter allows to select the blockchain type. Choices are: MAINNET, TESTNET, STAGENET, and CUSTOM. For MAINNET or TESTNET or STAGENET types, parameters of blockchain are built in the application so you don’t have to configure them. But if you select CUSTOM blockchain type, you have to provide the `custom`  configuration section \(which is commented out in the example\). |               |

#### Configuring Custom Blockchain

The `custom` section allows to set parameters of your custom blockchain.

| Name                     | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `address-scheme-character` | This parameter in `custom` section to set the address feature character. This character used while building an address and also passed over a network during a handshake. The latter allow nodes not to connect to the nodes with other blockchains.                                                                                                    |               |
| `functionality`            | This section allows to set the timestamps of activation of different blockchain validations. It is better to set all functionality settings to 0 to have a blockchain with all validations active.                                                                                                                                                      |               |
| `genesis`                  | Section describes the first \(genesis\) block of your custom blockchain.                                                                                                                                                                                                                                                                                |               |
| `block-timestamp`          | Sets the date of creation of genesis block.                                                                                                                                                                                                                                                                                                             |               |
| `timestamp`                | Sets time of creation for genesis transactions.                                                                                                                                                                                                                                                                                                         |               |
| `signature`                | Sets the signature of genesis block.                                                                                                                                                                                                                                                                                                                    |               |
| `initial-balance`          | This parameter allows to adjust the speed of block generation in the very beginning of your custom blockchain.                                                                                                                                                                                                                                          |               |
| `average-block-delay`      | Sets the speed of block generation in your blockchain. This is a target period of time between blocks. In reality the delays between blocks may vary.                                                                                                                                                                                                   |               |
| `transactions`             | This parameter allows to provide the list of first transactions. Each transaction is described by recipient’s address \(as BASE58 string\) and amount. You have to distribute all initial balance to one or more addresses in genesis block. If you failed to do so, the genesis block will be considered as incorrect and the application won’t start. |               |

### Miner Settings

In `miner` section it is possible to configure parameters of the new blocks generator.

| Name                                                 | Description                                                                                   | Default value                                                                                                                                                                                                                                                                                                                     |
|------------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enable`                                               | This parameter enables or disables block generation on the node.                              | By default, it’s enabled, but if you disable it your node won’t try to generate new blocks \(  won’t mine\).                                                                                                                                                                                                                      |
| `quorum`                                               | Sets the minimum required number of connected peers to enable and start mining of new blocks. | By default it is set to 1, so your node will start mining as soon as it connects to the first peer in the P2P network. Setting this parameter to 0 will enable off-line generation.                                                                                                                                               |
| `interval-after-last-block-then-generation-is-allowed` | This parameter allows to tune your node’s blocks download and generation behavior.            | By default, it set to 1 day, which means that your node won’t start block generation until it has the last block in the local blockchain not older than 1 day. So, using this parameter you tell your node to actualize the blockchain before starting to generate new blocks. Actually, it works only after long node shutdowns. |

### REST API Settings

The **REST API Section** is a section in the node configuration file with settings of a [node API](/en/waves-node/node-api).

| Name | Description | Default value |
| :--- | :--- | :--- |
| `enable` | Activates REST API. <br>If you want to deactivate REST API, change the default value to `no` | yes |
| `bind-address` | Sets the network address where the REST API will accept the incoming connections. <br>**Note.** It's not recommended to change the default value. Use [Nginx’s proxy pass module](http://nginx.org/ru/docs/http/ngx_http_proxy_module.html) or [SSH port forwarding](http://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html) for external access. | `"127.0.0.1"` |
| `port` | Sets the port number where the REST API will await connections. | 6869 |
| `api-key-hash` | Sets the hash of the [API key](https://en.wikipedia.org/wiki/Application_programming_interface_key) that is provided by the node owner. For details about generating hash see [To Generate Hash of the API Key](#To-Generate-Hash-of-the-API-Key) section. | "" |
| `cors` | Enables [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support that is necessary for [Swagger](https://swagger.io/) and [Exchange](https://waves.exchange).<br>[CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) allows to safely resolve queries for other domains outside the one that is running the node.<br> **Note.** If you want to deactivate [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) support, change the default value to `no` | yes |

**Note**: During REST API calls the node owner must provide the API key itself, not the the hashed value.

This is an example for signing a transaction that already exists in the wallet of the node owner as a CURL command:

```bash
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'X-API-Key: YOUR UNIQUE API KEY'
-d '{ \
"amount": 5800000000, \
"fee": 100000, \
"type": 4, \
"version": 1, \
"attachment": "", \
"sender": "3P3pUKEAKxegWr3PZkGYNq1mzQQaQ5zxZbw", \
"feeAssetId": null, \
"assetId": null, \
"recipient": "3P9p39MwZ5JjwdBSYEWC6XYri4jpovzcAbs", \
"feeAsset": null, \
"timestamp": 1568020044350 \
}' 'http://nodes.wavesnodes.com/transactions/sign'
```

#### To Generate Hash of the API Key

[API key](https://en.wikipedia.org/wiki/Application_programming_interface_key) of the node owner is highly important just like the [seed](http://confluence.wavesplatform.com/display/WDOCS/Seed+phrase) phrase and the password of the wallet.

Follow these steps to generate the hash of the API key:<br> 1. Go to [Swagger web interface](/en/waves-node/node-api)<br> 2. Click on [utils](https://nodes.wavesnodes.com/api-docs/index.html#/utils) section<br>3. Click on the API method [/utils/hash/secure](https://nodes.wavesnodes.com/api-docs/index.html#!/utils/hashSecure_1)<br>4. Create a unique [API key](https://en.wikipedia.org/wiki/Application_programming_interface_key) as a string value and include it in the `message` parameter<br> 5. Get the hash of the [API key](https://en.wikipedia.org/wiki/Application_programming_interface_key) and paste it in your node configuration file<br>6. Restart the node

**Note:** The API key is transmitted in the HTTP header as unprotected plain text. An attacker can intercept it in the network transit and use it to transfer your money to any address! So it's highly important to protect the transmission using HTTPS or SSH port forwarding.

### Synchronization Settings

In `synchronization` section it is possible to tune different aspects of node synchronization process.

| Name                     | Description                                                                                                                                                                                                                                                                                                                                                              | Default value |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-rollback`             | This parameter allows to change the length of blockchain that can be discarded in case of fork detection. If your node is on a fork with a lower score, it will try to switch to another fork, to do so the node will rollback few blocks. If the detected fork is longer than the given number, node prefers not to switch to another fork even if its score is bigger. |               |
| `max-chain-length`         | Sets the size of the buffer that stores blocks of detected fork. This size should be bigger than maximum fork length.                                                                                                                                                                                                                                                    |               |
| `synchronization-timeout`  | Sets the timeout on block download operation.                                                                                                                                                                                                                                                                                                                            |               |
| `score-broadcast-interval` | Sets the interval between score broadcasts to the P2P network.                                                                                                                                                                                                                                                                                                           |               |
| `score-ttl`                | Sets the time-to-live interval of broadcasted score packets.                                                                                                                                                                                                                                                                                                             |               |
| `remote-score-debounce`    | Sets the time to wait before receiving the next score update from a peer.                                                                                                                                                                                                                                                                                                |               |
| `history-replier`          | In this subsection you can configure the number of last blocks and micro-blocks cached in memory.                                                                                                                                                                                                                                                                        |               |
| `micro-block-synchronizer` | In this subsection you could tune various parameters of Waves-NG protocol.                                                                                                                                                                                                                                                                                               |               |

### UTX Pool Settings

The `utx` section allows to set unconfirmed transactions pool parameters.

| Name                | Description                                                                                                                                                                                                                                                        | Default value |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `max-size`            | Sets the size of unconfirmed transactions pool (both scripted and non-scripted).                                                                                                                                                                                   |               |
| `max-scripted-size`   | Sets the size of unconfirmed transactions pool for scripted transactions. Prior to node version 1.1.6, the invoke script transactions were not counted (the counted were the transactions for the validation of which it is required to execute a smart contract). |               |
| `max-transaction-age` | Sets the maximum age of transactions allowed to UTX.                                                                                                                                                                                                               |               |

### Features Settings

The `features` section allows to set features parameters

`auto-shutdown-on-unsupported-feature` If this parameter is turned on, the node will be shut down on activation of a feature that is not implemented by node’s codebase. By default this parameter is set to yes.

`supported` parameter contains the list of features IDs, supported by the node owner. By default, the list is empty.

<a id="rewards"></a>

### Rewards Settings

In this section, you can set the desired reward size using `desired` parameter. The setting value is specified in WAVELETs.

If the value is greater than the current reward size, then miner votes for the current reward size increase; if the value is smaller — for the decrease.

Example of the setting that has the desired value of 7 WAVES:

```js
waves {
  rewards {
    desired = 700000000
  }
}  
```

The value can be any integer in the range from 0 to 9,223,372,036,854,775,807 inclusive. Negative value will be ignored.

See [Mining reward](/en/blockchain/mining/mining-reward) for more information.
