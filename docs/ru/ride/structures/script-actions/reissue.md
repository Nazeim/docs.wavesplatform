# Reissue

> :warning: Структура `Reissue` представлена в [Стандартной библиотеке](/ru/ride/script/standard-library) **версии 4**, которая в настоящее время доступна только на [Stagenet](/ru/blockchain/blockchain-network/stage-network).

`Reissue` — cтруктура, задающая параметры довыпуска токена. Довыпуск выполняется, только если структура включена в [результирующее выражение](/ru/ride/functions/callable-function#резуnьтат-выпоnнения-2) вызываемой функции.

## Конструктор

```ride
Reissuen(assetId: ByteVector, isReissuable: Boolean, quantity: Int)
```

## Поля

| # | Название | Тип данных | Описание |
| :--- | :--- | :--- | :--- |
| 1 | assetId | [ByteVector](/ru/ride/data-types/byte-vector) | [ID токена](/ru/blockchain/token/token-id) для довыпуска |
| 2 | isReissuable | [Boolean](/ru/ride/data-types/boolean) | Флаг возможности довыпуска |
| 3 | quantity | [Int](/ru/ride/data-types/int) | Количество токена |
