# Приватыне функции

Все приватные функции, приведённые ниже требуют API ключ, предоставленный в каждом HTTP запросе с использованием `X-Api-Key` хедера. Значение по умолчанию `ridethewaves!`. Безопасно хэшированный хедер хранится в настройке `rest-api.api-key-hash` файла конфигураации waves.conf. Подробнее в статье [/utils/hash/secure](/en/waves-node/node-api/utils).

## POST /assets/issue

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Выпустить новый актив для адреса, который существует в кошельке ноды.

**Параметры запроса:**

    Такие же как в Broadcast Issue Assets, кроме `senderPublicKey`, `timestamp` и `signature`.
    "sender" - адрес аккаунта отправителя в Base58, который существуент в кошельке ноды.

**Пример запроса в JSON:**

```js
{
  "name": "Test Asset 1",
  "quantity": 100000000000,
  "description": "Some description",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "decimals": 8,
  "reissuable": true,
  "fee": 100000000
}
```

**Параметры ответа:**

```
Также как в Broadcast Issue Assets.
```

**Пример ответа в JSON:**

```
Также как в Broadcast Issue Assets.
```

## POST /assets/reissue 

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Перевыпустиьь дополнителное количество актива.

**Параметры запроса:**

    Такие же как в Broadcast Issue Assets, кроме `senderPublicKey`, `timestamp` и `signature`.
    "sender" - адрес аккаунта отправителя в Base58, который существуент в кошельке ноды

**Пример запроса в JSON:**

```js
{
  "quantity": 22300000000,
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "reissuable": true,
  "fee": 100000
}
```

**Параметры ответа:**

```
Также как в Broadcast Issue Assets.
```

**Пример ответа в JSON:**

```
Также как в Broadcast Issue Assets.
```

## POST /assets/burn

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Сжечь заданное количество актива.

**Параметры запроса:**

```
"assetId" - ID ранее выпущенного актива в Base58.
"sender" - адрес отправителя в Base58.
"fee" - комиссия за выпуск актива, min = 100000
"amount" - количество сжигаемого актива (количество неделимых частиц актива).
```

**Пример запроса в JSON:**

```js
{
  "sender" : "EHDZiTW9uhZmpfKRyJtusHXCQ3ABwJ3t9dxZdiPp2GZC",
  "fee" : 100000000,
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

## POST /assets/transfer

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

Создать транзакцию перевода активов с одного адреса на другой.

**Параметры запроса:**

    Такие же как в Broadcast Issue Assets, кроме `senderPublicKey`, `timestamp` и `signature`.
    "sender" - адрес аккаунта отправителя в Base58, который существуент в кошельке ноды

**Пример запроса в JSON:**

```js
{
  "assetId": "E9yZC4cVhCDfbjFJCc9CqkAtkoFy5KaCe64iaxHM2adG",
  "sender": "3NBVqYXrapgJP9atQccdBPAgJPwHDKkh6A8",
  "recipient": "3Mx2afTZ2KbRrLNbytyzTtXukZvqEB8SkW7",
  "fee": 100000,
  "amount": 5500000000,
  "attachment": "BJa6cfyGUmzBFTj3vvvaew"
}
```

**Параметры ответа:**

```
Также как в Broadcast Issue Assets.
```

**Пример ответа в JSON:**

```
Также как в Broadcast Issue Assets.
```

## POST /assets/masstransfer

![master](https://img.shields.io/badge/MAINNET-available-4bc51d.svg)

СОздать транзакцию для перевода актива на несколько адресов одновременно.

**Параметры запроса:**

```
"sender" - адрес отправителя в Base58.
"assetId" - ID актива для отправки. По умолчанию WAVES.
"transfers" - список пар (recipient, amount) где
   "recipient" это адрес в Base58 и
   "amount" это количество отправляемых активов на заданный адрес.
"fee" - комиссия транзакции, по умолчанию 100000 + 50000 * (поличество переводов)
"attachment" - произвольное сообщение в Base58. 140 байт max.
```

**Пример запроса в JSON:**

```js
{
  "sender" : "3HhQxe5kLwuTfE3psYcorrhogY4fCwz2BSh",
  "fee" : 200000,
  "assetId" : null,
  "attachment" : "59QuUcqP6p",
  "transfers" : [ {
    "recipient" : "3HUQa6qtLhNvBJNyPV1pDRahbrcuQkaDQv2",
    "amount" : 100000000
  }, {
    "recipient" : "3HaAdZcCXAqhvFj113Gbe3Kww4rCGMUZaEZ",
    "amount" : 200000000
  } ]
}
```

**Пример ответа в JSON:**

```js
{
  "type" : 11,
  "id" : "BG7MQF8KffVU6MMbJW5xPowVQsohwJhfEJ4wSF8cWdC2",
  "sender" : "3HhQxe5kLwuTfE3psYcorrhogY4fCwz2BSh",
  "senderPublicKey" : "7eAkEXtFGRPQ9pxjhtcQtbH889n8xSPWuswKfW2v3iK4",
  "fee" : 200000,
  "timestamp" : 1518091313964,
  "signature" : "4Ph6RpcPFfBhU2fx6JgcHLwBuYSpnEzfHvuAHaVVi8mPjn9D69LX7UaCtBEGjtaTJ7uBwhF38nc7wMEZDL4rYLDV",
  "assetId" : null,
  "attachment" : "59QuUcqP6p",
  "transfers" : [ {
    "recipient" : "3HUQa6qtLhNvBJNyPV1pDRahbrcuQkaDQv2",
    "amount" : 100000000
  }, {
    "recipient" : "3HaAdZcCXAqhvFj113Gbe3Kww4rCGMUZaEZ",
    "amount" : 200000000
  } ]
}
```
