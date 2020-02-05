# Upgrade Waves Node

Prior to upgrading a Waves Node check the type of installation used. It can be either a **DEB** file (Deb-base GNU/Linux installation) or a **JAR** file (other operating systems). Based on the type of installation used, follow one of the procedures below to upgrade the Waves Node. For more details about types of Waves Node installation, see [How to Install a Node](/en/waves-node/how-to-install-a-node/how-to-install-a-node) article.

## Upgrading Node from APT Repository

The most convenient method to install/upgrade Waves Node on Linux is probably by means of APT repository. The repository provides mainnet, testnet and stagenet packages.
When this installation method is used, the related dependencies (namely OpenJDK 8) will also be automatically downloaded.

To install the latest version of a package for mainnet from the APT repository, run the following commands:

```bash
curl -sL http://apt.wavesplatform.com/apt-key.gpg | sudo apt-key add -
sudo add-apt-repository "deb https://apt.wavesplatform.com/ xenial mainnet"
sudo apt update
sudo apt install waves
```

**Note:** The Waves package is supported on Debian 8.0+, Ubuntu 16.04+ and their forks.

Once the new version of Waves Node is released, you can update the package by running the following commands:

```bash
sudo apt update
sudo apt upgrade
```

## Upgraging JAR Node

To upgrade a **JAR** Node complete the following steps:

1. Run your Node, if it is not currently running, by executing the following command:

   ```bash
   java -jar waves.jar waves.conf
   ```

   **Note:** For more details on running a node, see [How to Install a Node](/en/waves-node/how-to-install-a-node/how-to-install-a-node).

2. Check the current version of your node in **/var/log/waves/waves.log** or, check the version in the filename of the **JAR** file.
3. Review the [latest Waves Release](https://github.com/wavesplatform/Waves/releases) page and download the latest (**Mainnet**, **Testnet** or **Stagenet**, depending on the type of your node) release (**JAR** file).
4. Review the release notes and check if the new version requires rebuilding the state database.
5. **Optional step:** If the new version of the Node requires rebuilding the state database, export the existing blocks.
See [Export/Import Blockchain](/en/waves-node/options-for-getting-actual-blockchain/import-from-the-blockchain) and [Download the Latest Blockchain](/en/waves-node/options-for-getting-actual-blockchain/state-downloading-and-applying) articles for detais about exporting/importing blocks.

   **Note:** Exporting/importing blocks is not mandatory but it saves internet data traffic. Otherwise the Node will download all the necessary data from the internet.

6. Stop the node (kill the Waves java process).

7. Replace the old **JAR** file with the downloaded one of the latest version.

8. **Optional step:** If the new version of the Node requires rebuilding the state database, import the binary file. See [Export/Import Blockchain](/en/waves-node/options-for-getting-actual-blockchain/import-from-the-blockchain) for details.

9. Run the node by executing the following command:

   ```bash
   java -jar waves.jar waves.conf
   ```

## Upgrading DEB node

To upgrade a **DEB** Node complete the following steps:

1. Run your node, if it is not currently running, by executing the following command:

   ```bash
   # sudo systemctl start waves
   ```

   **Note:** For more details on running a node, see [How to Install a Node](/en/waves-node/how-to-install-a-node/how-to-install-a-node).

2. Check the current version of your node in **/var/log/waves/waves.log** or execute the following command:

   ```bash
   # dpkg -l waves
   ```

3. Review the [latest Waves Release](https://github.com/wavesplatform/Waves/releases) page and download the latest (**Mainnet**, **Testnet** or **Stagenet**, depending on the type of your node) release (**DEB** file).
4. Review the release notes and check if the new version requires rebuilding the state database.
5. **Optional step:** If the new version of the Node requires rebuilding the state database, export the existing blocks.
See [Export/Import Blockchain](/en/waves-node/options-for-getting-actual-blockchain/import-from-the-blockchain) and [Download the Latest Blockchain](/en/waves-node/options-for-getting-actual-blockchain/state-downloading-and-applying) articles for details about exporting/importing blocks.

   **Note:** Exporting/importing blocks is not mandatory but it saves internet data traffic. Otherwise the Node will download all the necessary data from the internet.

6. Stop the Node by executing the following command:

   ```bash
   # sudo systemctl stop waves
   ```

7. Upgrade the existing DEB file by running the following command:

   ```bash
   # sudo dpkg -i waves_X.Y.Z_all.deb
   ```

8. **Optional step:** If the new version of the Node requires rebuilding the state database, import the binary file. See [Export/Import Blockchain](/en/waves-node/options-for-getting-actual-blockchain/import-from-the-blockchain) for details.

9. Run the node by executing the following command:

   ```bash
   # sudo systemctl start waves
   ```

## Update Node Configuration File

See [Node Configuration File](/en/waves-node/node-configuration) article for details.
