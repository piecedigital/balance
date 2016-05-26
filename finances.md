# Finances

___

This module handles the creating of finances records. It has one initial function that accepts no arguments. Once called it will return an object containing more functions:
- `createFinancesObject`
- `addNewBlock`
- `addRecord`

## createFinancesObject

This function takes a string as an argument. The string should be the MongoDB ID for the field of the user account in the `users` collection. Once called it'll return an object to create a new root finances object for the user's account in the database.

```json
{
  <userAccountId>,
  "moneyManagement": {
    "years": []
  }
}
```

## addNewBlock

This function accepts a string as its first and only argument. This string will be equal to `year`, `month`, or `day`, the only blocks allowed. Once called it will return an object for the new block of records:

```json
{
  <blockName>,
  "override": null,
  "overrideRecords": {
    "totalRevenue": 0,
    "totalEspenses": 0
  },
  "sourcesOfRevenue": [],
  "revenueExceptions": [],
  "sourcesOfExpenses": [],
  "expenseExceptions": [],
  "sourceNames": [],
  <next block down>: Array or undefined
}
```

## addRecord

This function accepts a string as its first and only argument. This string will be equal to `year`, `month`, or `day`, the only blocks allowed. Once called it will return an object with more functions:
- `create`
- `createDate`
- `sourceName`

### create

Accepts three arguments:
- `type` - a string equal to `revenue` or `expense`, indicating what type of record it is
- `money` - a string of a float representing the money for the record
- `otherData` - an object containing the necessary information to create `sourceName` and `date` properties:

```json
{
  "sourceName": String,
  "year": String:Integer,
  "month": String:Integer,
  "day": String:Integer
}
```

Returns an object representing the revenue for the new record block:

```json
{
  "sourceName": Object,
  "revenuePer<block name>": Number,
  "date": Number,
}
```

### createDate

Accepts three string arguments:

- `year` - a four digit number representing the year
- `month` - a two digit number representing the month
- `day` - a two digit number representing the day

### sourceName

To supplement the `sourceName` property of the new record, created with the `create` function ([seen above](https://github.com/piecedigital/cash-check/blob/master/finances.md#create)):

```json
{
  "sourceName": <Source Name>,
  "sourceNameFlat": <source_name>
}
```
