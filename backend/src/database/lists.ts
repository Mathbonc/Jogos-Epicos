import { EntryType, ListEntry, GameList } from "../models/list.model";


let lists : GameList[] = [
    {
        "userId": 1,
        "entries": [
            {
                "entryId": 1,
                "gameId": 2,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-03-11")
            },
            {
                "entryId": 2,
                "gameId": 8,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-04-27")
            },
            {
                "entryId": 3,
                "gameId": 12,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2019-05-28")
            },
            {
                "entryId": 4,
                "gameId": 10,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-02-03")
            },
            {
                "entryId": 5,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-04-02")
            }
        ]
    },
    {
        "userId": 2,
        "entries": [
            {
                "entryId": 1,
                "gameId": 1,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-01-25")
            },
            {
                "entryId": 2,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-07-21")
            },
            {
                "entryId": 3,
                "gameId": 3,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-01-14")
            },
            {
                "entryId": 4,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-12-27")
            },
            {
                "entryId": 5,
                "gameId": 9,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-07-09")
            },
            {
                "entryId": 6,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-01-16")
            },
            {
                "entryId": 7,
                "gameId": 6,
                "entryType": EntryType.PLAYED,
                "date": new Date("2022-05-27")
            },
            {
                "entryId": 8,
                "gameId": 10,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-02-22")
            },
            {
                "entryId": 9,
                "gameId": 11,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-03-11")
            },
            {
                "entryId": 10,
                "gameId": 5,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-06-09")
            },
            {
                "entryId": 11,
                "gameId": 2,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-11-03")
            },
            {
                "entryId": 12,
                "gameId": 12,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-10-13")
            }
        ]
    },
    {
        "userId": 3,
        "entries": [
            {
                "entryId": 1,
                "gameId": 4,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-07-26")
            },
            {
                "entryId": 2,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-04-19")
            },
            {
                "entryId": 3,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-07-06")
            },
            {
                "entryId": 4,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-03-24")
            }
        ]
    },
    {
        "userId": 4,
        "entries": [
            {
                "entryId": 1,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-03-19")
            },
            {
                "entryId": 2,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-08-05")
            },
            {
                "entryId": 3,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-03-01")
            },
            {
                "entryId": 4,
                "gameId": 12,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-03-17")
            },
            {
                "entryId": 5,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-05-28")
            },
            {
                "entryId": 6,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-06-12")
            },
            {
                "entryId": 7,
                "gameId": 5,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-09-15")
            }
        ]
    },
    {
        "userId": 5,
        "entries": [
            {
                "entryId": 1,
                "gameId": 5,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2021-01-31")
            },
            {
                "entryId": 2,
                "gameId": 7,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-05-16")
            },
            {
                "entryId": 3,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-06-16")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-12-02")
            },
            {
                "entryId": 5,
                "gameId": 4,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-07-19")
            }
        ]
    },
    {
        "userId": 6,
        "entries": [
            {
                "entryId": 1,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-03-02")
            },
            {
                "entryId": 2,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-08-03")
            },
            {
                "entryId": 3,
                "gameId": 10,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-12-04")
            },
            {
                "entryId": 4,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-01-16")
            },
            {
                "entryId": 5,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-06-06")
            }
        ]
    },
    {
        "userId": 7,
        "entries": [
            {
                "entryId": 1,
                "gameId": 9,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-05-19")
            },
            {
                "entryId": 2,
                "gameId": 6,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-09-29")
            },
            {
                "entryId": 3,
                "gameId": 8,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2020-03-31")
            },
            {
                "entryId": 4,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-03-21")
            },
            {
                "entryId": 5,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-02-09")
            },
            {
                "entryId": 6,
                "gameId": 1,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-01-05")
            },
            {
                "entryId": 7,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2018-03-21")
            }
        ]
    },
    {
        "userId": 8,
        "entries": [
            {
                "entryId": 1,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-09-16")
            },
            {
                "entryId": 2,
                "gameId": 5,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-08-26")
            },
            {
                "entryId": 3,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-03-03")
            },
            {
                "entryId": 4,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-03-29")
            },
            {
                "entryId": 5,
                "gameId": 6,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-10-18")
            },
            {
                "entryId": 6,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-10-30")
            },
            {
                "entryId": 7,
                "gameId": 1,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-12-04")
            },
            {
                "entryId": 8,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-07-23")
            },
            {
                "entryId": 9,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-02-24")
            }
        ]
    },
    {
        "userId": 9,
        "entries": [
            {
                "entryId": 1,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-04-16")
            },
            {
                "entryId": 2,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-09-13")
            },
            {
                "entryId": 3,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-07-02")
            },
            {
                "entryId": 4,
                "gameId": 2,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-03-01")
            },
            {
                "entryId": 5,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-03-30")
            }
        ]
    },
    {
        "userId": 10,
        "entries": [
            {
                "entryId": 1,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-09-15")
            },
            {
                "entryId": 2,
                "gameId": 6,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-01-16")
            },
            {
                "entryId": 3,
                "gameId": 10,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-12-21")
            },
            {
                "entryId": 4,
                "gameId": 12,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-04-08")
            },
            {
                "entryId": 5,
                "gameId": 2,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-10-17")
            },
            {
                "entryId": 6,
                "gameId": 9,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-06-19")
            },
            {
                "entryId": 7,
                "gameId": 7,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-03-05")
            },
            {
                "entryId": 8,
                "gameId": 1,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-05-25")
            },
            {
                "entryId": 9,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-10-20")
            },
            {
                "entryId": 10,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-07-18")
            },
            {
                "entryId": 11,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-08-12")
            },
            {
                "entryId": 12,
                "gameId": 8,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-01-12")
            }
        ]
    },
    {
        "userId": 11,
        "entries": [
            {
                "entryId": 1,
                "gameId": 6,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-02-14")
            },
            {
                "entryId": 2,
                "gameId": 8,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-07-11")
            },
            {
                "entryId": 3,
                "gameId": 10,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-09-03")
            },
            {
                "entryId": 4,
                "gameId": 1,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-10-09")
            },
            {
                "entryId": 5,
                "gameId": 2,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2020-03-15")
            },
            {
                "entryId": 6,
                "gameId": 5,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-12-09")
            },
            {
                "entryId": 7,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-05-03")
            }
        ]
    },
    {
        "userId": 12,
        "entries": [
            {
                "entryId": 1,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-10-31")
            },
            {
                "entryId": 2,
                "gameId": 12,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-04-02")
            },
            {
                "entryId": 3,
                "gameId": 6,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-10-08")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-09-16")
            },
            {
                "entryId": 5,
                "gameId": 9,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-02-05")
            },
            {
                "entryId": 6,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-05-19")
            },
            {
                "entryId": 7,
                "gameId": 2,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-08-07")
            },
            {
                "entryId": 8,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-09-22")
            },
            {
                "entryId": 9,
                "gameId": 10,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-12-12")
            },
            {
                "entryId": 10,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-04-17")
            },
            {
                "entryId": 11,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2018-02-07")
            }
        ]
    },
    {
        "userId": 13,
        "entries": [
            {
                "entryId": 1,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-11-20")
            },
            {
                "entryId": 2,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-06-05")
            },
            {
                "entryId": 3,
                "gameId": 6,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-02-09")
            },
            {
                "entryId": 4,
                "gameId": 7,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-12-22")
            }
        ]
    },
    {
        "userId": 14,
        "entries": [
            {
                "entryId": 1,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-08-14")
            },
            {
                "entryId": 2,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-06-13")
            },
            {
                "entryId": 3,
                "gameId": 1,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-11-02")
            },
            {
                "entryId": 4,
                "gameId": 2,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-06-07")
            }
        ]
    },
    {
        "userId": 15,
        "entries": [
            {
                "entryId": 1,
                "gameId": 1,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2019-04-22")
            },
            {
                "entryId": 2,
                "gameId": 10,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-05-13")
            },
            {
                "entryId": 3,
                "gameId": 3,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2021-08-01")
            },
            {
                "entryId": 4,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-07-14")
            },
            {
                "entryId": 5,
                "gameId": 8,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-03-04")
            }
        ]
    },
    {
        "userId": 16,
        "entries": [
            {
                "entryId": 1,
                "gameId": 6,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-11-23")
            },
            {
                "entryId": 2,
                "gameId": 1,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-09-30")
            },
            {
                "entryId": 3,
                "gameId": 5,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-09-27")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2022-09-04")
            },
            {
                "entryId": 5,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2018-11-12")
            }
        ]
    },
    {
        "userId": 17,
        "entries": [
            {
                "entryId": 1,
                "gameId": 5,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-06-10")
            },
            {
                "entryId": 2,
                "gameId": 9,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2019-03-20")
            },
            {
                "entryId": 3,
                "gameId": 4,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2019-02-16")
            },
            {
                "entryId": 4,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-05-02")
            },
            {
                "entryId": 5,
                "gameId": 6,
                "entryType": EntryType.PLAYED,
                "date": new Date("2017-05-18")
            },
            {
                "entryId": 6,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-07-06")
            }
        ]
    },
    {
        "userId": 18,
        "entries": [
            {
                "entryId": 1,
                "gameId": 2,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-09-05")
            },
            {
                "entryId": 2,
                "gameId": 12,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-11-07")
            },
            {
                "entryId": 3,
                "gameId": 1,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-08-05")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-12-09")
            }
        ]
    },
    {
        "userId": 19,
        "entries": [
            {
                "entryId": 1,
                "gameId": 11,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-11-09")
            },
            {
                "entryId": 2,
                "gameId": 1,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-04-10")
            },
            {
                "entryId": 3,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-09-30")
            },
            {
                "entryId": 4,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-03-31")
            },
            {
                "entryId": 5,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-07-01")
            },
            {
                "entryId": 6,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-06-30")
            },
            {
                "entryId": 7,
                "gameId": 8,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2021-07-30")
            },
            {
                "entryId": 8,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-03-08")
            },
            {
                "entryId": 9,
                "gameId": 3,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-04-06")
            },
            {
                "entryId": 10,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-08-27")
            }
        ]
    },
    {
        "userId": 20,
        "entries": [
            {
                "entryId": 1,
                "gameId": 6,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-05-09")
            },
            {
                "entryId": 2,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-03-15")
            },
            {
                "entryId": 3,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-09-27")
            }
        ]
    },
    {
        "userId": 21,
        "entries": [
            {
                "entryId": 1,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-04-21")
            },
            {
                "entryId": 2,
                "gameId": 1,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-01-08")
            },
            {
                "entryId": 3,
                "gameId": 8,
                "entryType": EntryType.PLAYED,
                "date": new Date("2021-08-23")
            },
            {
                "entryId": 4,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-08-08")
            },
            {
                "entryId": 5,
                "gameId": 5,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-11-13")
            },
            {
                "entryId": 6,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2023-04-14")
            },
            {
                "entryId": 7,
                "gameId": 3,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-11-15")
            },
            {
                "entryId": 8,
                "gameId": 4,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-10-30")
            },
            {
                "entryId": 9,
                "gameId": 2,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-10-16")
            },
            {
                "entryId": 10,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-05-25")
            }
        ]
    },
    {
        "userId": 22,
        "entries": [
            {
                "entryId": 1,
                "gameId": 12,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2019-05-10")
            },
            {
                "entryId": 2,
                "gameId": 3,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-12-04")
            },
            {
                "entryId": 3,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-09-30")
            },
            {
                "entryId": 4,
                "gameId": 1,
                "entryType": EntryType.PLAYED,
                "date": new Date("2020-01-13")
            },
            {
                "entryId": 5,
                "gameId": 8,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-12-10")
            },
            {
                "entryId": 6,
                "gameId": 7,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2017-06-19")
            },
            {
                "entryId": 7,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-07-07")
            }
        ]
    },
    {
        "userId": 23,
        "entries": [
            {
                "entryId": 1,
                "gameId": 3,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-03-26")
            },
            {
                "entryId": 2,
                "gameId": 5,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-12-28")
            },
            {
                "entryId": 3,
                "gameId": 11,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-12-28")
            },
            {
                "entryId": 4,
                "gameId": 6,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2020-09-17")
            },
            {
                "entryId": 5,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-08-27")
            },
            {
                "entryId": 6,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2019-04-15")
            }
        ]
    },
    {
        "userId": 24,
        "entries": [
            {
                "entryId": 1,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-05-15")
            },
            {
                "entryId": 2,
                "gameId": 6,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-06-16")
            },
            {
                "entryId": 3,
                "gameId": 12,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-09-06")
            },
            {
                "entryId": 4,
                "gameId": 10,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-09-13")
            },
            {
                "entryId": 5,
                "gameId": 1,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2023-01-15")
            },
            {
                "entryId": 6,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-03-09")
            },
            {
                "entryId": 7,
                "gameId": 4,
                "entryType": EntryType.PLAYED,
                "date": new Date("2018-10-23")
            },
            {
                "entryId": 8,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-01-31")
            },
            {
                "entryId": 9,
                "gameId": 3,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-12-18")
            },
            {
                "entryId": 10,
                "gameId": 5,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-06-19")
            }
        ]
    },
    {
        "userId": 25,
        "entries": [
            {
                "entryId": 1,
                "gameId": 2,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2022-10-11")
            },
            {
                "entryId": 2,
                "gameId": 9,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2021-11-24")
            },
            {
                "entryId": 3,
                "gameId": 1,
                "entryType": EntryType.PLAYED,
                "date": new Date("2022-05-05")
            },
            {
                "entryId": 4,
                "gameId": 10,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2020-10-23")
            }
        ]
    },
    {
        "userId": 26,
        "entries": [
            {
                "entryId": 1,
                "gameId": 4,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-04-21")
            },
            {
                "entryId": 2,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-07-30")
            },
            {
                "entryId": 3,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2018-11-25")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-06-09")
            },
            {
                "entryId": 5,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-12-14")
            },
            {
                "entryId": 6,
                "gameId": 10,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-01-13")
            }
        ]
    },
    {
        "userId": 27,
        "entries": [
            {
                "entryId": 1,
                "gameId": 4,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-04-21")
            },
            {
                "entryId": 2,
                "gameId": 8,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2022-07-30")
            },
            {
                "entryId": 3,
                "gameId": 2,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2018-11-25")
            },
            {
                "entryId": 4,
                "gameId": 11,
                "entryType": EntryType.ABANDONED,
                "date": new Date("2018-06-09")
            },
            {
                "entryId": 5,
                "gameId": 7,
                "entryType": EntryType.PLAYED,
                "date": new Date("2023-12-14")
            },
            {
                "entryId": 6,
                "gameId": 10,
                "entryType": EntryType.WISHLIST,
                "date": new Date("2017-01-13")
            }
        ]
    }
];

export default lists
