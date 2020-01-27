# Методы распространения

Для работы с ролловерами, трастами, недвижимостью, страхованием и для других операций, необходимо, чтобы активы распределялись между сторонами или между исполняемыми контрактами. Адрес может просто представлять пользователя, например, владельца учетной записи. Но он также может представлять собой индивидуальный уникальный актив.

## Методы

С чем могут возникать сложности при распределении активов среди нескольких владельцев:

* Время, затрачиваемое на тяжелые запросы _**/asset/distribution**_.
* Уязвимость к DDOS атакам на ноды, которые используют метод без нумерации.

Рекомендуем использовать запрос **GET /assets/{assetId}/distribution/{height}** чтобы получить баланс распределения на заданной высоте блока \(до 2,000 блоков\). Это работает с нумерацией.  
КОличество адресов в одном запросе ограничено параметром **limit**, который по умолчанию равен 1000 max. Если это ваша нода, то можно настроит max limit в файле конфигурации **Application.Conf** путём изменения параметра **distribution-address-limit**. Модно включить адрес следующего запроса для получить следующую часть распределения актива путём использования опционального параметра **After** .

## Примеры

Предположим, что нам нудно распределить актив `DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J` на высоте 1352994 с лимитом 10 адресов:

**1. Первый запрос:**

```js
http://nodes.wavesnodes.com/assets/DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J/distribution/1352994/limit/10
```

**2. Первый ответ:**

```js
{
  "hasNext" : true,
  "lastItem" : "3PHyfTkzkaC7dv29RDCYL8XHx2EaZU8Nk2X",
  "items" : {
    "3PC4roN512iugc6xGVTTM2XkoWKEdSiiscd" : 5630,
    "3PPKF2pH4KMYgsDixjrhnWrPycVHr1Ye37V" : 3540364,
    "3PMzLSxyP9hgGNAmFgmHZ7ei9cCibbk6nYC" : 1,
    "3P59RUApvri6pS2LpCuem3ypsF8hGbTuhJW" : 5,
    "3PCW1xqHcXLb9irik43tDrYY2xuVGsdvfH3" : 4,
    "3P1y6WPuhP69FLPd4yjRhjDEaBukyJdHq2y" : 1,
    "3PHyfTkzkaC7dv29RDCYL8XHx2EaZU8Nk2X" : 1,
    "3P2Z9TJdHejPZHM4qoX6i2No2n2cXSnVPPE" : 1,
    "3PC4ybZEUecdDfDRgNPCySdjeGc9jJsJ1v7" : 1,
    "3PPfAGBSZbTka5jCL3iXmQycXdgySbCj3kK" : 5
  }
}
```

Где:

* **hasNext** = true если есть следующий запрос.
* **lastItem**: адрес последнего элемента \(следует использовать параметр 'lastItem' чтобы получить следующую порцию\).
* **items**: список распределяемых адресов.

**1. Запрос на получение 10 следующих адресов при распределении на высоте 1353075 и после адреса LastItem, который = 3PPfAGBSZbTka5jCL3iXmQycXdgySbCj3kK :**

```js
http://nodes.wavesnodes.com/assets/DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J/distribution/1353075/limit/10?after=3PPfAGBSZbTka5jCL3iXmQycXdgySbCj3kK
```

**2. Ответ с 10 адресами распределения:**

```js
{
  "hasNext" : true,
  "lastItem" : "3P4TXRsqDJm2ZGBD5mAZjePf5agmXMeuDb9",
  "items" : {
    "3P4TXRsqDJm2ZGBD5mAZjePf5agmXMeuDb9" : 5,
    "3PHczp777nxGPj4JTocuDa8sdVohzuxk3Bc" : 1,
    "3PBhRmXaAmusZ68fR4s8fx5ej7BnjaakghA" : 5,
    "3PAFYk89L1DLhyTzV8n4pa3Tu3Ag6qJAJof" : 5,
    "3P1y6WPuhP69FLPd4yjRhjDEaBukyJdHq2y" : 1,
    "3PGa2ZKine8AEoWW6bUcQ361n4EDDk9KY3N" : 5,
    "3PChKs3ZTQ8RaosngtpkpFCGPcfQ7rJ6FkH" : 5,
    "3PHyfTkzkaC7dv29RDCYL8XHx2EaZU8Nk2X" : 1,
    "3P2Z9TJdHejPZHM4qoX6i2No2n2cXSnVPPE" : 1,
    "3PGBDioYWFZXyfMvEwwrwKMBzNLxVZ3ax7G" : 4
  }
}
```

**3. Следующие запросы для получения всего распределения будут аналогичными.**

`DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J` в параметре **after** _**N**_ запрос следует заменить на **lastItem **from _**N-1**_  и повторять до значния **hasNext == false**.
