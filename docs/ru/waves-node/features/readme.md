# Фичи

**Фича** это функциональность, добавленная в [блокчейн Waves](/ru/blockchain/blockchain) во время нового [релиза](https://github.com/wavesplatform/Waves/releases).

У фич есть названия и уникальные ID и их можено активировать задав параметр `supported` в секции `features` файла конфигурации. Подродбнее в секции [Настройки фич](/ru/waves-node/node-configuration#настройки-фич) статьи [Конфигурация ноды](/ru/waves-node/node-configuration).

Waves Mainnet ноды в данный момент поддерживают следующие фичи:

| ID Фичи |                        Название                       | Описание                                                                                                                                                                                              | Высота блокчейна* | Дата активации |
|------------|:-------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|-----------------|
| 1          | Minimum Generating Balance of 1000 WAVES          | Минимальный генерирующий баланс майнинг-счета должен составлять 1000 WAVES, чтобы нода генерировала блоки                                                                                                     | 810 000           | Dec 2017        |
| 2          | NG Protocol                                       | Переход на протокол Waves NG                                                                                                                                                                          | 805 000           | Dec 2017        |
| 3          | Mass Transfer Transaction                         | Введение трансакции массовой рассылки                                                                                                                                                                | 940 000           | Mar 2018        |
| 4          | Smart Accounts                                    | Введение смарт аккаунтов                                                                                                                                                                           | 1 190 000         | Sep 2018        |
| 5          | Data Transaction                                  | Введение дата транзакций                                                                                                                                                                        | 1 060 000         | Jun 2018        |
| 6          | Burn Any Tokens                                   | Введена возможность сжигать токены                                                                                                                                                                     | 1 070 000         | Jul 2018        |
| 7          | Fee Sponsorship                                   | Введение спонсорских странзакций                                                                                                                                                                     | 1 080 000         | Jul 2018        |
| 8          | Fair PoS                                          | Изменения в протоколе PoS. Доля сгенерированных блоков должна соответствовать доле генерирующего баланса ноды                                                                                               | 1 100 000         | Jul 2018        |
| 9          | Smart Assets                                      | Введение смарт ассетов                                                                                                                                                                             | 1 340 000         | Jan 2019        |
| 10         | Smart Account Trading                             | Введена возможность размещать ордеры смарт аккаунтов. Сматченный аккаунт может быть смарт аккаунтом или dApp                                                                                                                  | 1 340 000         | Jan 2019        |
| 11         | RIDE 4 DAPPS                                      | Усовершенствован язык Ride. Добавлены [functions]. Введена транзакция script invocation                                                                                                               | 1 610 000         | Jul 2019        |
| 12         | Order Version 3                                   | Добавлена возможность задавать комиссию ордера в любых токенах                                                                                                                                                              | 1 610 000         | Jul 2019        |
| 13         | Reduce NFT fee                                    | Если количество токенов в транзакции выпуска равно 1, количество знаков после запятой равно 0, и токен не может быть переиздан, комиссия за такую ​​транзакцию будет составлять 0,001 WAVES вместо 1 | 1 610 000         | Jul 2019        |
| 14         | Block Reward and Community Driven Monetary Policy | Введение награды за майнинг                                                                                                                                                                            | 1 740 000         | Oct 2019        |

>*высота блокчейна Mainnet в момент активации фичи.

:warning: Следующие фичи доступны начиная с версии ноды  1.2.x, в данный момент только на Stagenet:

| ID Фичи | Название | Описание |
|------------|:-------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 15 | VRF and Protobuf | Добавлена ​​возможность подписывать только заголовок блока майнящей нодой. Добавлена ​​поддержка проверки SNARK. Добавлена ​​возможность для dApp оплачивать транзакции.
| 16 | Ride V4 and multiple attached payments for Invoke Script Transaction | В версии 4 языка Ride к транзакции `Invoke Script` может применяться до двух платежей. Добавлена ​​транзакция `Update Asset Info`. Добавлена ​​транзакция `Delete Entry`. Добавлен BlockTxs MerkleRoot.
| | |

## Статус фич

Каждая фича может иметь один из трех статусов:

1. Voting
2. Approved
3. Activated

## Активания новых фич

**Протокол активации фич** это процедура, согласно которой новые [фичи](/ru/waves-node/features/feature) получают статус "activated".

* Процесс активации состоит из голосования и активации. Каждая майнинговая нода (которая генерирует блоки) может голосовать за новую фичу, установив параметр голосования в своем файле конфигурации. Такая нода генерирует блоки, содержащие голос за фичу. см. [пример](/ru/waves-node/activation-protocol#пример) и более подробную информацию см. в статье [Протокол активации](/ru/waves-node/activation-protocol).

* Если в Mainnet имеется не менее 8000 блоков (2700 в Testnet и 40 в Stagenet) с поддержкой фичи в течение периода голосования (каждые 10000 блоков в Mainnet, 3000 в Testnet и 100 в Stagenet), тогда фича получает статус "approved" в блокчейне. "Approved" фича становится "Activated" после еще 10000 блоков в сети Mainnet (3000 в Testnet и 100 в Stagenet). Тогда фича начинает работать, и все ноды, которые не могут поддерживать такую фичу (старые версии) перестанут работать.

Подробнее в статье [Протокол активации](/en/blockchain/waves-protocol/activation-protocol).