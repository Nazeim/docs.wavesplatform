# Публичные функции

## GET /assets/balance/{address}

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Балансы по всем активам, которые когда-либо имел данный аккаунт \(кроме WAVES\).

```bash
"address" - адрес аккаунта в Base58
```

**Параметры ответа:**

```
"address" -  Адрес аккаунта в Base58
"balances" - Список балансов для активов, которые когда-либо имел данный аккаунт
"assetId" - ID актива в Base58
"balance" - Баланс заданного актива на аккаунте
"quantity" - Общее количество выпущенных активов
"reissuable" - Является ли актив перевыпускаемым?
"issueTransaction" - Транзакция создания данного актива
"minSponsoredAssetFee" - Минимальная комиссия ассета, опционально, доступно для спонсорских активов
"sponsorBalance" - Спонсорский баланс в waves
```

**Пример ответа в JSON:**

```js
{
  "address": "3Mv61qe6egMSjRDZiiuvJDnf3Q1qW9tTZDB",
  "balances": [
    {
      "assetId": "Ax9T4grFxx5m3KPUEKjMdnQkCKtBktf694wU2wJYvQUD",
      "balance": 4879179221,
      "quantity": 48791792210,
      "reissuable": true,
      "minSponsoredAssetFee" : 100,
      "sponsorBalance" : 1233221,
      "issueTransaction" : {
         "type" : 3,
         ...
      }
    },
    {
      "assetId": "49KfHPJcKvSAvNKwM7CTofjKHzL87SaSx8eyADBjv5Wi",
      "balance": 10,
      "quantity": 10000000000,
      "reissuable": false,
      "issueTransaction" : {
         "type" : 3,
         ...
      }
    }
  ]
}
```

## GET /assets/balance/{address}/{assetId} <a id="getassetbalance"></a>

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Баланс аккаунта для заданного ассета.

```
  "address" - Адрес аккаунта в Base58
  "assetId" - ID ассета в Base58
```

**Пример ответа в JSON:**

```js
{
  "address": "3Mv61qe6egMSjRDZiiuvJDnf3Q1qW9tTZDB",
  "assetId": "Ax9T4grFxx5m3KPUEKjMdnQkCKtBktf694wU2wJYvQUD",
  "balance": 4879179221
}
```

## GET /assets/details/{assetId}

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Описание актива.

```
  "assetId" – ID актива в Base58
```

**Пример ответа в JSON:**
```js
{
  "assetId" : "8tdULCMr598Kn2dUaKwHkvsNyFbDB1Uj5NxvVRTQRnMQ",
  "issueHeight" : 140194,
  "issueTimestamp" : 1504015013373,
  "issuer" : "3NCBMxgdghg4tUhEEffSXy11L6hUi6fcBpd",
  "name" : "name",
  "description" : "Sponsored asset",
  "decimals" : 1,
  "reissuable" : true,
  "quantity" : 1221905614,
  "script" : null,
  "scriptText" : null,
  "complexity" : 0,
  "extraFee": 0,
  "minSponsoredAssetFee" : 100000 // null assume no sponsorship, number - amount of assets for minimal fee
}
```

## GET /assets/details/?id={assetId1}&id={assetId2}&...

Описание заданных активов.

> :warning: Данный метод доступен начиная с версии ноды 1.2.0, после активации фичи "Ride V4 and multiple attached payments for Invoke Script Transaction" (No. 16). Подробнее в статье [Протокол активации](/en/blockchain/waves-protocol/activation-protocol). В данный момент доступна версия 1.2.x достуана на [Stagenet](/en/blockchain/blockchain-network/stage-network).

**Параметры запроса:**

```
  assetIdN – ID актива в Base58
```

**Пример ответа в JSON:**
```js
[
  {
    "assetId": "7TG1nzpVhqqafTh4yeP4XXbEwtE4SnqHkqR2PfbLiA3U",
    "issueHeight": 1714607,
    "issueTimestamp": 1568977278682,
    "issuer": "3PMno2s9naUyUbbnkBHfWpjgtzvRKyAzwkW",
    "name": "Museician",
    "description": "A token to help musicians in all facets of their careers from the live side to the studio side and everything in between.",
    "decimals": 8,
    "reissuable": true,
    "quantity": 999989995499039700,
    "scripted": false,
    "minSponsoredAssetFee": 50000000
  },
  {
  "assetId" : "8tdULCMr598Kn2dUaKwHkvsNyFbDB1Uj5NxvVRTQRnMQ",
  "issueHeight" : 140194,
  "issueTimestamp" : 1504015013373,
  "issuer" : "3NCBMxgdghg4tUhEEffSXy11L6hUi6fcBpd",
  "name" : "name",
  "description" : "Sponsored asset",
  "decimals" : 1,
  "reissuable" : true,
  "quantity" : 1221905614,
  "script" : null,
  "scriptText" : null,
  "complexity" : 0,
  "extraFee": 0,
  "minSponsoredAssetFee": 100000
  } 
]
```

## GET /assets/nft/{address}/limit/{limit}?after={after}

NFT баланс аккаунта.

После активации фичи 16, этот метод возвращает только активы, которые были созданы после активации фичи 13 в качестве NFT активов (amount: 1, decimal places: 0, reissuable: false).

Перед активацией фичи 16 данный метод будет возвращать все активы, созданные как NFT активы (amount: 1, decimal places: 0, reissuable: false).

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

**Параметры запроса:**

```
  address – Адрес аккаунта в Base58
  limit — Количество токенов, которые необходимо вернуть
  after — Id токена для нумерации следующего
```

**Привет ответа в JSON:**

```js
[
  {
    "assetId": "7TG1nzpVhqqafTh4yeP4XXbEwtE4SnqHkqR2PfbLiA3U",
    "issueHeight": 1714607,
    "issueTimestamp": 1568977278682,
    "issuer": "3PMno2s9naUyUbbnkBHfWpjgtzvRKyAzwkW",
    "name": "Museician",
    "description": "A token to help musicians in all facets of their careers from the live side to the studio side and everything in between.",
    "decimals": 0,
    "reissuable": false,
    "quantity": 1,
    "scripted": false,
    "minSponsoredAssetFee": 50000000,
    "originTransactionId": "8RwwkZJ373Nm6fJCgV2Lefe6FeWawUY2APujcsauUNMR"
  },
  {
    "assetId": "7TG1nzpVhqqafTh4yeP4XXbEwtE4SnqHkqR2PfbLiA3U",
    "issueHeight": 1714607,
    "issueTimestamp": 1568977278682,
    "issuer": "3PMno2s9naUyUbbnkBHfWpjgtzvRKyAzwkW",
    "name": "Museician",
    "description": "A token to help musicians in all facets of their careers from the live side to the studio side and everything in between.",
    "decimals": 0,
    "reissuable": false,
    "quantity": 1,
    "scripted": false,
    "minSponsoredAssetFee": 50000000,
    "originTransactionId": "8RwwkZJ373Nm6fJCgV2Lefe6FeWawUY2APujcsauUNMR"
  } 
]
```

## POST /assets/broadcast/issue

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Опубликовать подписанную транзакцию выпуска актива в сети.

**Параметры запроса:**

```
"name" - Имя актива, не уникально, длиной от 4 до 16 байт, в plain text.
"description" - Описание актива, максимальная длина 1000 байт, в plain text.
"sender" - Адрес аккаунта отправителя, который существует в кошельке ноды в Base58
"senderPublicKey" - Публичный ключ аккаунта отправителя в Base58
"fee" - Комисся транзации за выпуск ассета, min = 100000000 (1WAVES).
"decimals" - Количество знаков после запятой для отображения частей ассета, max = 8.
"quantity" - Количество выпускаемых неделимых частиц ассета.
"reissuable" - Логический параметр определяющий возможно ли выпускать дополнительные ассеты.
"signature" - Подпись всех данных тразакции в Base58.
```

**Пример запроса в JSON:**

```js
{
  "name": "Test Asset 1",
  "description": "Some description",  
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "quantity": 100000000000,
  "decimals": 8,
  "reissuable": true,
  "fee": 100000000,
  "timestamp": 1479287120875,
  "signature": "3cCKi3D17ysyEVg2cd3JGpCzm6ovL3HF8qDksX41oPLEqiRmMVZ2C8QJjs2Utd9YfQfzuEVRyzLsqPer89qAfo1A"
}
```

**Параметры ответа:**

```
"type" - Тип транзакции (3 для IssueTransaction).
"id" - Id(хэш) транзакции в Base58.
"assetId" - ID актива в Base58, фактически равен tx id.
"fee" - комисия транзакции.
"timestamp" - врменная отметка транзакции.
"sender" - адрес аккаунта отправителя в Base58.
"senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
"name" - имя актива.
"description" - описание актива.
"quantity" - количество минимальных единиц актива.
"decimals" - количество знакова после запятой для отображения частиц актива.
"reissuable" - логический параметр определяющий возможно ли выпускать дополнительные ассеты.
"signature" - подпись всех данных тразакции в Base58.
```

**Пример запроса в JSON:**

```js
{
  "type": 3,
  "id": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "name": "2bNcNL6HTQeVaJe9v",
  "description": "BJa6cfyHD5f9r6B4A9kEmB",
  "quantity": 100000000000,
  "decimals": 8,
  "reissuable": true,
  "fee": 100000000,
  "timestamp": 1479210401734,
  "signature": "4AKyeVcMMx9hUNpqQpeF5QPf5oWquyWk8avy524ZCXM6KdbYWpQZYf72NidzqSF3Prc6HA3DKEgdrCEhCcqw6Xbq"
}
```

## POST /assets/broadcast/reissue
![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Перевыпустить дополнительное количество активов. Опубликовать в сети подписанную транзакцию перевыпуска актива.

**Параметры запроса:**

```
"assetId" - ID ранее выпущенного актива в Base58.
"senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
"fee" - комисия транзакции выпуска актива, min = 100000.
"quantity" - дополнительное количество перевыпускаемых активов (количество неделимых частиц актива).
"reissuable" - логический параметр определяющий возможно ли выпускать дополнительные ассеты.
"timestamp" - временная отметка транзакции.
"signature" - подпись всех данных тразакции в Base58.
```

**Пример запроса в JSON:**

```js
{
  "quantity": 22300000000,
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "reissuable": true,
  "fee": 100000,
  "timestamp": 1479221697312,
  "signature": "49Gp5qit4GF5723LxQLjsBRoyJKKH41LpNUzwwi2ZM6dXuE9a18ApAJt9sfK3uMpjD1PiHXshS31nN9NtpYm8veu"
}
```

**Параметры ответа:**

```
"type" - Тип транзакции (5 для ReissueTransaction)
Остальные параметра также как у Broadcast Issue Assets
```

**Пример ответа в JSON:**

```js
{
  "type": 5,
  "id": "2fA4nzfCXrPmpAscwGrLoL6JHTa1u4eRLv5vbohzVxBn",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "quantity": 22300000000,
  "reissuable": true,
  "fee": 100000,
  "timestamp": 1479221697312,
  "signature": "49Gp5qit4GF5723LxQLjsBRoyJKKH41LpNUzwwi2ZM6dXuE9a18ApAJt9sfK3uMpjD1PiHXshS31nN9NtpYm8veu"
}
```

## POST /assets/broadcast/burn
![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Сжечь заданное количество актва. Опубликовать в сети подписанную транзакцию сжигания актива.

**Параметры запроса:**

```
"assetId" - ID ранее выпущенного актива в Base58.
"senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
"fee" - комисия транзакции сжигания актива, min = 100000.
"quantity" - количество сжигаемого актива (количество неделимых частиц актива).
"timestamp" - временная отметка транзакции.
"signature" - подпись всех данных тразакции в Base58.
```

**Пример запроса в JSON:**

```js
{
  "senderPublicKey" : "EHDZiTW9uhZmpfKRyJtusHXCQ3ABwJ3t9dxZdiPp2GZC",
  "fee" : 100000000,
  "timestamp" : 1495623946088,
  "signature" : "4sWPrZFpR379XC4Med1y8AK2Avmx8nVUxVAzsE4QMzEeMtQyHgjzfQsi2Y5VY7diCqMAzohy9ZSTP3yfiB3QPQMd",
  "assetId" : "AP5dp4LsmdU7dKHDcgm6kcWmeaqzWi2pXyemrn4yTzfo",
  "amount" : 50000
}
```

**Пример ответа в JSON:**

```js
{
  "type" : 6,
  "id" : "AoqmyXSurAoLqH5zbcKPtksdPwadgudhE7tZ495cQDWs",
  "sender" : "3HRUALDoUaWAmAndWRqhbiQFoqgamhAVggE",
  "senderPublicKey" : "EHDZiTW9uhZmpfKRyJtusHXCQ3ABwJ3t9dxZdiPp2GZC",
  "fee" : 100000000,
  "timestamp" : 1495623946088,
  "signature" : "4sWPrZFpR379XC4Med1y8AK2Avmx8nVUxVAzsE4QMzEeMtQyHgjzfQsi2Y5VY7diCqMAzohy9ZSTP3yfiB3QPQMd",
  "assetId" : "AP5dp4LsmdU7dKHDcgm6kcWmeaqzWi2pXyemrn4yTzfo",
  "amount" : 50000
}
```

## POST /assets/broadcast/transfer
![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Опубликовать в сети подписанную транзакцию перевода актива с одного адреса на другой.

**Параметры запроса:**

* Подписанный запрос перевода:

    ```
    "assetId" [опионально] - ID передаваемого актива в Base58. Не указывается при передаче WAVES.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58
    "recipient" - адрес аккаунта получателя в Base58
    "fee" - комиссия транзакции передачи актива, min = 100000 (WAVElets).
    "feeAssetId" [опионально] - ID актива комиссии транзакции. По умолчанию WAVES, если параметр не задан.
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - Произвольные дополнительные данные транзакции в Base58. Максимальная длина 140 байт.
    "timestamp" - временная отметка транзакции.
    "signature" - подпись всех данных тразакции в Base58.
    ```

* Подписанный запрос перевода с версией:

    ```
    "assetId" [опионально] - ID передаваемого актива в Base58. Не указывается при передаче WAVES.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58
    "recipient" - адрес аккаунта получателя в Base58
    "fee" - комиссия транзакции передачи актива, min = 100000 (WAVElets).
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - Произвольные дополнительные данные транзакции в Base58. Максимальная длина 140 байт.
    "timestamp" - временная отметка транзакции.
    "verson" - версия транзакции. Всегда 2.
    "proofs" - Пруфы в Base58. Может быть подписью или секретным словом, которое можно верифицировать в смарт контракте.
    ```

**Пример запроса в JSON:**

```js
{
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
  "fee": 100000,
  "amount": 5500000000,
  "attachment": "BJa6cfyGUmzBFTj3vvvaew",
  "timestamp": 1479222433704,
  "signature": "2TyN8pNS7mS9gfCbX2ktpkWVYckoAmRmDZzKH3K35DKs6sUoXHArzukV5hvveK9t79uzT3cA8CYZ9z3Utj6CnCEo"
}
```

**Параметры ответа:**

* Подписанный запрос перевода:

    ```
    "type" - Тип транзакции (4 для TransferTransaction).
    "id" - Id(хэш) странзакции в Base58.
    "assetId" - ID актива в Base58, фактически равен id транзакции.
    "timestamp" - временная отметка транзакции.
    "sender" - адрес аккаунта отправителя в Base58.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "recipient" - адрес аккаунта получателя в Base58.
    "feeAsset" - ID ассета комиссии транзакции, в данный момент null, i.e. WAVES
    "fee" - сумма комиссии транзакции.
    "attachment" - вложение в Base58.
    "signature" - подпись всех данных тразакции в Base58.
    ```

* Подписанный запрос перевода с версией:

    ```
    "type" - Тип транзакции (4 для TransferTransaction).
    "id" - Id(хэш) странзакции в Base58.
    "sender" - адрес аккаунта отправителя в Base58.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "fee" - сумма комиссии транзакции.
    "timestamp" - временная отметка транзакции.
    "proofs" - массив пруфов в Base58.
    "version" - версия транзакции (всегда 2)
    "recipient" - адрес аккаунта получателя в Base58.
    "assetId" - ID актива в Base58, фактически равен id транзакции.
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - вложение в Base58.
    ```

**Пример запроса в JSON:**

```js
{
  "type": 4,
  "id": "3xPyT73TGV7c5PKEJpicwSsX7PXyi3Lm1JFNQivFRLuy",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
  "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "amount": 5500000000,
  "feeAsset": null,
  "fee": 100000,
  "timestamp": 1479222433704,
  "attachment": "BJa6cfyGUmzBFTj3vvvaew",
  "signature": "2TyN8pNS7mS9gfCbX2ktpkWVYckoAmRmDZzKH3K35DKs6sUoXHArzukV5hvveK9t79uzT3cA8CYZ9z3Utj6CnCEo"
}
```

## POST /assets/broadcast/batch-transfer

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Опубликовать в сети несколько транзакиций перевода с одного адреса на другой. Сейчас ограничение по размеру отъекта JSON состаляет 1 мегабайт.

**Параметры запроса:**

Массив JSON объектов:

* Подписанный запрос перевода:

    ```
    "assetId" [optional] - ID передаваемого актива в Base58. Не указывается при передаче WAVES.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "recipient" - адрес аккаунта получателя в Base58.
    "fee" - сумма комиссии транзакции, min = 100000 (WAVElets).
    "feeAssetId" [опционально] - ID актива комиссии транзакции. По умолчанию WAVES, если параметр не задан.
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - Произвольные дополнительные данные транзакции в Base58. Максимальная длина 140 байт.
    "timestamp" - временная отметка транзакции.
    "signature" - подпись всех данных тразакции в Base58.
    ```

* Подписанный запрос перевода с версией:

    ```
    "assetId" [optional] - ID передаваемого актива в Base58. Не указывается при передаче WAVES.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "recipient" - адрес аккаунта получателя в Base58.
    "fee" - сумма комиссии транзакции, min = 100000 (WAVElets).
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - Произвольные дополнительные данные транзакции в Base58. Максимальная длина 140 байт.
    "timestamp" - временная отметка транзакции.
    "verson" - Версия транзакции. Всегда 2.
    "proofs" - Пруфы в Base58. Может быть подписью или секретным словом, которое можно верифицировать в смарт контракте.
    ```

**Пример запроса в JSON:**

```js
[
  {
    "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
    "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
    "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
    "fee": 100000,
    "amount": 5500000000,
    "attachment": "BJa6cfyGUmzBFTj3vvvaew",
    "timestamp": 1479222433704,
    "signature": "2TyN8pNS7mS9gfCbX2ktpkWVYckoAmRmDZzKH3K35DKs6sUoXHArzukV5hvveK9t79uzT3cA8CYZ9z3Utj6CnCEo"
  },
  {
    "assetId": "Aih8nqFiogg9AFaByXrDvoSZnzmXEndPxxyti7zvp3Bp",
    "senderPublicKey": "UpbUnRwjkF9kjYHqGtWkkYJPqCtY4AdaKuwGUdNhcYzX",
    "recipient": "2dmG3TnD1iha2Nr29F1DuZzG9nTH941r9e3",
    "fee": 100000,
    "amount": 5500000000,
    "attachment": "YbFwKyUhKw1r1Ag64dpkbK",
    "timestamp": 1479222433704,
    "version": 2,
    "proofs": [
      "45bw5ynx7wynXMtmS6EEx8hNs3YMFctknUBsnVPQ3YbPmB8vhFoL5CSFHTBMFmnsLVbdNCpvFGGbPjbfZxbLb8j9r8MTWrbgPJQ",
      "HpSmAWoES5pKvaUbo4VdbkgxiwKYMHdRAJEibVhZzwv3BcBJVBr2hNzaF5o7SAgVw8oHdq4Lgw"
    ]
  }
]
```

**Параметра ответа:**

Массив отбектов JSON:

* Подписанный запрос перевода:

    ```
    "type" - Тип транзакции (4 для TransferTransaction).
    "id" - Id(хэш) транзакции в Base58.
    "assetId" - ID актива в Base58, фактически равен id транзакции.
    "timestamp" - временная отметка транзакции.
    "sender" - адрес аккаунта отправителя в Base58.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "recipient" - адрес аккаунта получателя в Base58.
    "feeAsset" - ID актива комиссии транзакции. По умолчанию WAVES, если параметр не задан.
    "fee" - сумма комиссии транзакции.
    "attachment" - вложение в Base58.
    "signature" - подпись всех данных тразакции в Base58.
    ```

* Подписанный запрос перевода с версией:

    ```
    "type" - Тип транзакции (4 для TransferTransaction).
    "id" - Id(хэш) транзакции в Base58.
    "sender" - адрес аккаунта отправителя в Base58.
    "senderPublicKey" - публичный ключ аккаунта отправителя в Base58.
    "fee" - сумма комиссии транзакции.
    "timestamp" - временная отметка транзакции.
    "proofs" - массив пруфов в Base58.
    "version" - версия транзакции (Всегда 2)
    "recipient" - адрес аккаунта получателя в Base58.
    "assetId" - ID актива в Base58, фактически равен id транзакции.
    "amount" - количество передаваемого актива (количество неделимых частиц актива).
    "attachment" - вложение в Base58.
    ```

**Пример ответа в JSON:**

```js
[
  {
    "type": 4,
    "id": "3xPyT73TGV7c5PKEJpicwSsX7PXyi3Lm1JFNQivFRLuy",
    "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
    "senderPublicKey": "CRxqEuxhdZBEHX42MU4FfyJxuHmbDBTaHMhM3Uki7pLw",
    "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
    "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
    "amount": 5500000000,
    "feeAsset": null,
    "fee": 100000,
    "timestamp": 1479222433704,
    "attachment": "BJa6cfyGUmzBFTj3vvvaew",
    "signature": "2TyN8pNS7mS9gfCbX2ktpkWVYckoAmRmDZzKH3K35DKs6sUoXHArzukV5hvveK9t79uzT3cA8CYZ9z3Utj6CnCEo"
  },
  {
    "type": 4,
    "id": "3MHxkG7Jp1dR7iZSyYiNPy7G4BMTCUPbs2snAzvv4wu1",
    "sender": "4V4TpBPPfvEXYmzteXLPkK5xwVXWjnQwJ5H",
    "senderPublicKey": "UpbUnRwjkF9kjYHqGtWkkYJPqCtY4AdaKuwGUdNhcYzX",
    "fee": 100000,
    "timestamp": 1479222433704,
    "proofs": [
      "45bw5ynx7wynXMtmS6EEx8hNs3YMFctknUBsnVPQ3YbPmB8vhFoL5CSFHTBMFmnsLVbdNCpvFGGbPjbfZxbLb8j9r8MTWrbgPJQ",
      "HpSmAWoES5pKvaUbo4VdbkgxiwKYMHdRAJEibVhZzwv3BcBJVBr2hNzaF5o7SAgVw8oHdq4Lgw"
    ],
    "version": 2,
    "recipient": "2dmG3TnD1iha2Nr29F1DuZzG9nTH941r9e3",
    "assetId": "Aih8nqFiogg9AFaByXrDvoSZnzmXEndPxxyti7zvp3Bp",
    "amount": 5500000000,
    "attachment": "YbFwKyUhKw1r1Ag64dpkbK"
  }
]
```
