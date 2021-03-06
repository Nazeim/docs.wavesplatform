# Загрузить актуальный блокчейн

Для работы ноды необходима актуальная база данных блокчейна. Можно загрузить архив **blockchain_last.tar**, содержащий актуальный блокчейн, по ссылкам ниже.

По умолчанию данные блокчейна расположены в папке `data`, которая находится в основной папке приложения.
Стандартное расположение основной папки приложения для разных операционных систем см. в разделе [Каталог приложения по умолчанию](/ru/waves-node/node-configuration#каталог-приложения-по-умолчанию) статьи [Конфигурация ноды](/ru/waves-node/node-configuration).

**Внимание!** Используйте базы данных блокчейна только из надежных источников.

## Актуальные загружаемые базы данных (state с node.wavesnodes.com)

* Mainnet: [http://blockchain.wavesnodes.com/](http://blockchain.wavesnodes.com/)
* Testnet: [http://blockchain-testnet.wavesnodes.com/](http://blockchain-testnet.wavesnodes.com/)
* Stagenet: [http://blockchain-stagenet.wavesnodes.com/](http://blockchain-testnet.wavesnodes.com/)

**Примечание.** Файлы по ссылкам регулярно обновляются.

## Пошаговая инструкция (Linux DEB)

Чтобы загрузить и применить последнюю базу данных блокчейна, выполните следующие шаги:

1. Загрузите архив `blockchain_last.tar` по одной из ссылок.
2. Проверьте контрольную сумму с помощью любого подходящего инструмента. Контрольная сумма файла `blockchain_last.tar` должна совпадать с указанной в файле `blockchain_last.tar.SHA1SUM`.
3. Удалите папку с данными, выполнив следующую команду: `sudo rm -rdf /var/lib/waves/data`.
4. Распакуйте файлы базы данных в папку, выполнив следующую команду: `tar -xvf blockchain_last.tar -C /var/lib/waves/data`.
5. Запустите ноду, выполнив следующую команду: `sudo systemctl start waves`.

## Альтернативный способ распаковки (Linux)

Традиционный способ загрузки и распаковки требует много дискового пространства. В некоторых случаях диска хватает только на сам блокчейн с небольшим запасом.
Пользователи Linux могут воспользоваться одной из приведенных ниже команд для распаковки архива прямо в процессе скачивания. В результате на диске сохранится только распакованный блокчейн, без архива, что позволит сэкономить дисковое пространство.

Если нода установлена из **DEB**-пакета, выполните следующую команду:

```bash
cd /var/lib/waves
sudo -u waves bash -c "wget -qO- http://blockchain.wavesnodes.com/blockchain_last.tar --show-progress | tar xf -"
```

Если нода запускается из **JAR**-файла, перейдите в папку `data`, где хранятся данные блокчейна, и выполните следующую команду:

```bash
wget -qO- http://blockchain.wavesnodes.com/blockchain_last.tar --show-progress | tar xf -
```
