# Версия 1.2 (Stagenet)

## Улучшения 

* Усовершенствован механизм [генерации блоков](/ru/blockchain/block/block-generation) за счет использования [VRF](https://en.wikipedia.org/wiki/Verifiable_random_function) (Verifiable random function). Это улучшение позволяет противостоять атакам типа stake grinding, при помощи которых злоумышленники пытаются повысить для себя вероятность генерации блока.
* Изменена схема подписания майнящей нодой транзакций блока. Ранее майнящей ноде требовалось подписывать блок вместе со всеми транзакциями. Теперь в заголовок блока добавлен [корневой хеш транзакций](/ru/blockchain/block/merkle-root), поэтому достаточно подписать только заголовок.
* В качестве идентификатора блока используется хеш BLAKE2b-256 заголовка блока.
* Реализована возможность удалять записи в хранилище данных аккаунта. Это действие может быть выполнено при помощи [транзакции данных](/ru/blockchain/transaction-type/data-transaction) либо структуры [DeleteEntry](/ru/ride/structures/common-structures/delete-entry) языка Ride.
* Реализована возможность изменять наименование и описание выпущенных ассетов. Для этого предлагается использовать транзакцию нового типа, называемую [транзакцией обновления информации ассета](/ru/blockchain/transaction-type/update-asset-info-transaction).
* Снижена минимальная комиссия за [транзакцию довыпуска](/ru/blockchain/transaction-type/reissue-transaction) — с 1 до 0,001 WAVES.
* Бинарные форматы транзакций реализованы на основе [protobuf](https://developers.google.com/protocol-buffers/docs/overview?hl=ru).
* В [транзакции выпуска](/ru/blockchain/transaction-type/issue-transaction) формат полей `name` и `description` изменен с bytes на string.
* В [транзакции перевода](/ru/blockchain/transaction-type/transfer-transaction) и [транзакции массового перевода](/ru/blockchain/transaction-type/mass-transfer-transaction) изменен тип поля `attachment` на [union](/ru/ride/data-types/union) `(type: Int|Boolean|ByteVector|String)`.
* В [транзакции данных](/ru/blockchain/transaction-type/transfer-transaction) максимальный размер данных увеличен до 165890 байт.
* В [транзакции обмена](/ru/blockchain/transaction-type/transfer-transaction) ордера на покупку и продажу могут быть указаны в любом порядке.
* Изменена формула расчета price в [ордерах](/ru/blockchain/order). Ранее, при определении price для ассетов с разным количеством десятичных знаков, возникала проблема с величиной price. Её максимальное значение зависело от разности десятичных знаков ассетов. К примеру, price для [NFT](/ru/blockchain/token/non-fungible-token)-ассета не мог превышать 1000 WAVES. Измененная формула исправляет эту проблему. Разность  десятичных знаков больше не влияет на максимальный размер price.

## Обновление Node API

* Доработан метод `GET /assets/details/{assetId}`. Теперь он позволяет получать информацию по нескольким ассетам, перечисленным в списке. Для запроса к `/assets/details/{assetId}` теперь можно использовать метод POST. В JSON ответа добавлен объект `originTransactionId`, содержащий ID транзакции, выпустившей ассет с `{assetId}`.
* Доработан метод `GET /assets/nft/{address}/limit/{limit}`. В JSON ответа добавлен массив `assetDetails`, содержащий список NFT-ассетов, принадлежащих указанному адресу. Кроме того, добавлена возможность совершать запрос к `/assets/nft/{address}/limit/{limit}` при помощи метода POST.
* Реализован метод `GET /transactions/merkleProof?id=some1&id=some2`. Данный метод принимает на вход ID транзакции или массив ID транзакций и возвращает массив доказательств для проверки присутствия транзакции в блоке.
* В методы, которые возвращают заголовок блока, добавлены поля `id` и `transactionsRoot`. Список методов:
  * `GET /blocks/headers/last`
  * `GET /blocks/headers/seq/{from}/{to}`
  * `GET /blocks/headers/at/{height}`
  * `GET /blocks/at/{height}`
  * `GET /blocks/signature/{signature}`
  * `GET /blocks/address/{address}/{from}/{to}`
  * `GET /blocks/last`
  * `GET /blocks/seq/{from}/{to}`

## Улучшения Ride

* Выпущена версия 4 [Стандартной библиотеки](/ru/ride/script/standard-library).
* Добавлены действия скрипта, которые может выполнять [вызываемая функция](/ru/ride/functions/callable-functions) dApp-скрипта:
   * [Issue](/ru/ride/structures/common-structures/issue) — выпуск токена.
   * [Reissue](/ru/ride/structures/common-structures/reissue) — довыпуск токена.
   * [Burn](/ru/ride/structures/common-structures/burn) — сжигание токена.
   * [BooleanEntry](/ru/ride/structures/common-structures/boolean-entry), [BinaryEntry](/ru/ride/structures/common-structures/binary-entry), [IntegerEntry](/ru/ride/structures/common-structures/int-entry), [StringEntry](/ru/ride/structures/common-structures/string-entry) — добавление или изменение записи соответствующего типа в хранилище данных аккаунта. Эти действия используются вместо [DataEntry](/ru/ride/structures/common-structures/data-entry), которая не поддерживается в версии 4.
   * [DeleteEntry](/ru/ride/structures/common-structures/delete-entry) — удаление записи из хранилища данных аккаунта.
* Изменен формат результата вызываемой функции: в версии 4 результат представляет собой список действий скрипта. Структуры `ScriptResult`, `WriteSet` и `TransferSet` не поддерживаются.
* Комиссия за выполнение транзакции вызова скрипта увеличивается на 1 WAVES за каждый ассет (кроме NFT), выпущенный при помощи структуры `Issue`.
* Реализована возможность использовать список в качестве аргумента вызываемой функции.
* Реализована возможность обрабатывать в dApp до двух платежей, приложенных к транзакции вызова скрипта.
* Добавлены встроенные функции:
   * [calculateAssetId](/ru/ride/functions/built-in-functions/blockchain-functions#calculate) — получает ID ассета, сформированного структурой [Issue](/ru/ride/structures/common-structures/issue) при выполнении транзакции вызова скрипта. Сложность равна 10.
   * [contains](/ru/ride/functions/built-in-functions/string-functions#contains) — проверяет, содержит ли строка заданную подстроку. Сложность 20.
   * [createMerkleRoot](/ru/ride/functions/built-in-functions/verification-functions##createmerkleroot) — вычисляет [корневой хеш дерева Меркла транзакций блока](/ru/blockchain/block/merkle-root). Сложность 30.
   * [groth16verify](/ru/ride/functions/built-in-functions/verification-functions#groth16verify) — семейство функций верификации [доказательства с нулевым разглашением](https://ru.wikipedia.org/wiki/Доказательство_с_нулевым_разглашением). Сложность 1900–3900 в зависимости от размера массива публичных входов.
   * [median](/ru/ride/functions/built-in-functions/math-functions#median) — вычисление медианы списка целых чисел. Сложность 10.
   * [transferTransactionFromProto](/ru/ride/functions/built-in-functions/converting-functions#transfertransactionfromproto) — десериализует транзакцию перевода. Сложность 5.
   * [valueOrElse(t: T|Unit, t0 : T)](/ru/ride/functions/built-in-functions/union-functions#valueOrElse) — получение значения из параметра типа данных объединение. Сложность 13.
* Для встроенных [функций хеширования](/ru/ride/functions/built-in-functions/hashing-functions) `blakeb256`, `keccak256`, `sha256` и встроенных [функций верификации](/ru/ride/functions/built-in-functions/verification-functions) `rsaVerify`, `sigVerify` в версии 4 изменена сложность и добавлены семейства аналогичных функций с различной сложностью в зависимости от размера аргумента. Если размер данных известен заранее, можно использовать более «дешевую» функцию.
* Добавлены встроенные функции работы со списками:
   * Конкатенация при помощи оператора `++`. Пример: результатом выражения `[1, 2] ++ [3, 4]` будет `[1, 2, 3, 4]`. Сложность равна 10.
   * Добавление элемента в конец списка. Пример: результатом выражения `["foo","bar"] :+ "baz"` будет `["foo", "bar", "baz"]`. Сложность равна 3.

## Активация

Активация перечисленных улучшений производится путем голосования за фичи №&nbsp;15  “VRF and Protobuf” и №&nbsp;16 “Ride V4 and multiple attached payments for Invoke Script Transaction”.
