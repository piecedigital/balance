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
- sourceOfRevenue
- sourceOfExpense
- exception
- sourceName

### sourceOfRevenue

Returns an object representing the revenue for the new record block:

```json
{
  "sourceName": String,
  "revenuePer<blockName>": Number,
  "taxPercentage": Number,
}
```

### sourceOfExpense

Returns an object representing the expenses for the new record block:

```json
{
  "sourceName": String,
  "expensePer<blockName>": Number
}
```

### exception

Accepts a date in milliseconds and returns it. (why? For clarity sake, I think)

### sourceName

To supplement the `sourceName` property of the `sourceOfRevenue` and `sourceOfExpense` blocks:

```json
{
  "sourceName": <Source Name>,
  "sourceNameFlat": <source_name>
}
```
