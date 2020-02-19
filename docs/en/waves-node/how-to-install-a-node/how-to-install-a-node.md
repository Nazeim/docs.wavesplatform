# Install Waves Node

The methods to install Waves node are explained in this article.

## System Requirements

| Minimal requirements for | CPU | RAM | SSD |
| :--- | :--- | :--- | :--- | :--- |
|[Validating node](/en/blockchain/node/validating-node) | 2 | 4Gb | 60Gb SSD |
|[Mining node](/en/blockchain/node/mining-node) | 2+ | 4+ Gb | 60+ Gb SSD |

### Docker

The easiest way to run Waves node on `macOS`, `Windows` or `Linux` machine is by means of Waves Docker container. You install the Docker app and then use console command to run the node or change the node settings. For details, see [Waves Node in Docker](/en/waves-node/waves-node-in-docker) article.

### Jar Package

The other way is to [download the latest version](https://github.com/wavesplatform/Waves/releases) of `waves.jar` and the required `.conf` configuration file to your machine and run the app with the console commands.

More specific steps depend on your operating system:

* [On macOS](/en/waves-node/how-to-install-a-node/on-mac)
* [On Windows](/en/waves-node/how-to-install-a-node/on-windows)
* [On Ubuntu](/en/waves-node/how-to-install-a-node/on-ubuntu)

For details about configuration file, see [Node Configuration](/en/waves-node/node-configuration) article.

### SBT Package

You can install Waves node on Linux-based system from SBT package. For details, see [Alternative Method (Installing SBT)](/en/waves-node/how-to-build-and-test-a-node.md) article.

### Yandex.Cloud

You can also run Waves node in Yandex.Cloud. For details, see [Running Waves Node in Yandex.Cloud](/en/waves-node/running-waves-node-in-yandex-cloud) article.

Here you can find tutorial about [Installing Waves Node on Digital Ocean](https://www.youtube.com/watch?v=CDmMeZlzKbk&feature=youtu.be).

## Troubleshooting

   There is a known issue crashing a node with the following error:

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
