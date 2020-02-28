# Alternative Method (Install SBT)

The node can be built and installed on any device that supports java. For **Ubuntu**, SBT packageAll ‌produces only DEB package but for other operating systems, ZIP archive or a fat JAR can be used as well.
To build and test your Waves Node, follow the steps:

## 1. Setup the Environment

* ### Installing Java

```bash
sudo apt-get update
sudo apt-get install default-jre default-jdk
```

* ### Installing SBT
Please follow the SBT installation instructions depending on your operating system ([Mac](https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Mac.html), [Windows](https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Windows.html), [Linux](https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Linux.html)).

## 2. Obtaining Source Codes

```bash
git clone git@github.com:wavesplatform/Waves.git
cd Waves
```

## 3. Running Unit Tests

```bash
sbt test
```

## 4. Building Packages

* ### Mainnet

```bash
sbt packageAll
```

* ### Testnet

```bash
sbt -Dnetwork=testnet packageAll
```

## 5. Installing DEB Package

DEB package located in target folder. You can replace '\*' with actual package name:

```bash
sudo dpkg -i target/*.deb
```

## 6. Running Fat JAR

You can replace waves-all\*.jar with actual jar name \(it should have "all"-word\):

```bash
java -jar target/waves-all*.jar path/to/config/file
```

> :bulb: For OSX - homebrew is preferable choice. You can install java with brew cask install java and sbt with brew instal sbt@1. Build/Test steps are common for any OS \(but you should use ‘\' instead of '/' in windows\).
