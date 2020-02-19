# Install Waves Node

The methods to install Waves node are explained in this article.

## System Requirements

|  | vCPU | RAM | SSD | Command as Jar |
| :--- | :--- | :--- | :--- | :--- |
| Minimal requirements for [validating node](/en/blockchain/node/validating-node) | 2 | 4Gb | 60Gb SSD | `Xmx` flag Specifies the maximum size of the memory allocation pool for a Java virtual machine (JVM), Add `-Xmx` option before `-jar` parameter, choose size depending on your host RAM. The command should be as following <br/>`java -Xmx3072M -jar`|
| Minimal requirements for [mining node](/en/blockchain/node/mining-node) | 2+ | 4+ Gb | 60+ Gb SSD | `java -Xmx4096M -jar` |

>A common use for `Xmx` flag is when you encounter a `java.lang.OutOfMemoryError`.

### Docker

The easiest way to run Waves node is by means of Waves Docker container. It requires just one command to enable everything or change the settings of the node. For details, see [Waves Node in Docker](/en/waves-node/waves-node-in-docker) article.

### Jar Package

The other way is to [download the latest version](https://github.com/wavesplatform/Waves/releases) of `waves.jar` and the required `.conf` configuration file \(for mainnet or testnet\) to any folder, for example `~/waves`.

More specific steps depend on your operating system:

* [On macOS](/en/waves-node/how-to-install-a-node/on-mac)
* [On Windows](/en/waves-node/how-to-install-a-node/on-windows)
* [On Ubuntu](/en/waves-node/how-to-install-a-node/on-ubuntu)

For details about configuration file, see [Node Configuration](/en/waves-node/node-configuration) article.

Here you can find a tutorial about [Installing Waves Node on Digital Ocean](https://www.youtube.com/watch?v=CDmMeZlzKbk&feature=youtu.be).

### SBT Package

You can also install Waves node from SBT package. For details, see [Alternative Method (Installing SBT)](/en/waves-node/how-to-build-and-test-a-node.md) article.

### Yandex.Cloud

You can also run Waves node in Yandex.Cloud. For details, see [Running Waves Node in Yandex.Cloud](/en/waves-node/running-waves-node-in-yandex-cloud) article.

## Troubleshooting

   There is a known issue when a node can crash with the following error:

   ```bash
   Caused by: org.iq80.leveldb.DBException: IO error: /var/lib/waves/data/33837022.ldb: Too many open files
   ```

   The error is caused by the operating system limit of the number of simultaneously open files.

   In this case the solution is to change the default values to `65536` of the following parameters in the `/etc/security/limits.conf` file:

   ```bash
    * soft nofile 24000 #soft limits
    * hard nofile 65000 #hard limits
   ```

   and also add the following line in the `/etc/systemd/system.conf` file:

   ```bash
   DefaultLimitNOFILE=65536
   ```

then reboot your machine.

