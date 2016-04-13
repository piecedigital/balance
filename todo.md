# Cashulator
#### Calculate your revenue and expenses with ease
___

## To Do
- Document/Figure out:
  - ... features
  - ... nav UX
  - ... UI/prototype layout
  - ... tools needed **[obtained]**
  - ... style guide **[obtained]**
  - ... error codes **[obtained]** ! - continued existence up for debate
  - ... file structure and custom modules
  - ... data structures **[obtained]**

___

## Features and Functionality
- Pages - Home(landing page), Signup/Login, About, Terms and Conditions, Dashboard(when signed in)
- Page: Home
  - [Home Page UX and Features](https://github.com/piecedigital/cash-check/blob/master/home-page.md)

- Page: Dashboard
  - [Dashboard UX and Features](https://github.com/piecedigital/cash-check/blob/master/dashboard-features.md)

___

## UI/Layout
1. **Color Scheme #1:**
  - Black and Orange
2. **Color Scheme #2:**
  - Customizable (starts off as #3)

___

## Development and Production Tools
### Production Tools
- Server
  - Node
  - **Packages (by package name)**:
    - bcryptjs **[obtained]**
    - body-parser **[obtained]**
    - cookie-parser **[obtained]**
    - csurf **[obtained]**
    - ejs **[obtained]**
    - express **[obtained]**
    - fs (?)
    - helmet **[obtained]**
    - mongodb **[obtained]**
    - path (comes with node) **[obtained]**
    - [shoehornjs](http://npmjs.com/package/shoehornjs) **[obtained]**
- Client
  - React
  - Sass
    - [layoutcss](http://npmjs.com/package/layoutcss)

### Development Tools
- gulp
  - node-sass
  - browser-sync
  - nodemon
- jasmine-node
- morgan **[obtained]**

### Style guide
- [CSS Style Guide](https://github.com/piecedigital/cash-check/blob/master/styleguide-css.md)
- [Error Codes Style Guide](https://github.com/piecedigital/cash-check/blob/master/styleguide-error-codes.md) (may not keep this)
- [JavaScript Style Guide](https://github.com/piecedigital/cash-check/blob/master/styleguide-javascript.md)

### File Structure and Custom modules
- /
  - [node_modules/](https://github.com/piecedigital/cash-check/blob/master/todo.md#production-tools)
  - custom_modules/
    - [accounts.js](https://github.com/piecedigital/cash-check/blob/master/accounts.md) (handles all user account creation and validation operations) **[exists]**
    - [callback-router.js](https://github.com/piecedigital/cash-check/blob/master/callback-router.md) (handles all callbacks in an array to avoid CB hell) **[exists]**
    - csrf-routes.js (handles routes that require CSRF validation)
    - [mongo-queries.js](https://github.com/piecedigital/cash-check/blob/master/mongo-queries.md) (handles all DB query operations) **[exists]**
    - routes.js (route all handling) **[exists]**
  - public/
    - js/
      - calculator.js (handles all calculations through various functions)
      - jquery-1.12.x.min.js
      - react-app.js (the entire app view)
    - css/
      - home-page.scss
        - home-page.css
      - app-page.scss
        - app-page.css
    - images/
  - views/
  - private/
    - private-data.js
  - app.js
  - Procfile =
    - "web: node app.js"
  - .gitignore
  - jasmine.spec.js (handles the initiation of all jasmine tests)

### Data structures
#### User account info. Collection: users
``` js
{
  "firstName": String,
  "lastName": String,
  "email": String, // regex: /([a-z0-9]){1,}([.][a-z0-9]{1,})?([@][a-z0-9]{2,}[.][a-z]{1,3})([.][a-z]{1,2})?/i
  "password": String,
  "username": String, // regex: /^[a-z0-9_-]{3,}$/gi
  // ...  // used for login and to connect the user document in the "users" collection
  "accountType": String, // ["basic", "premium"]
  "ban": {
    "status": Boolean,
    "banDate": Number, // new Date().getTime() === gets milliseconds
    "reason": String // explains the reason for the user's ban
  },
  "suspension":  {
    "reasons": [
      "startDate": Number, // new Date().getTime() === gets milliseconds
      "endDate":
    ]
  }
}
```

#### User money management data. Collection: moneyManagement

// !! - reevaluate this data structure
``` js
{
  "userAccountId": String, // used to connect the user document in the "users" collection
  "sourceNames": [ // central source for the source names of revenue/expenses
    {
      "sourceName": String,
      "sourceNameFlattened": String // source name is lower-cased and spaces are hyphenated
    },
    ...
  ],
  "moneyManagement": {
    "year": Number,
    "sourcesOfRevenue": [
      {
        "sourceName": String,
        "revenuePerMonth": Number,
        "taxPercentage": Number, // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
        "revenueExceptions": [
          Number,
          ...
        ]
      },
      ...
    ],
    "sourcesOfExpenses": [
      {
        "sourceName": String,
        "expensePerMonth": Number,
        "expenseExceptions": [
          Number,
          ...
        ]
      },
      ...
    ],
    "months": [
      {
        "month": String, // January
        "sourcesOfRevenue": [
          {
            "sourceName": String,
            "revenuePerDay": Number,
            "taxPercentage": Number, // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
            "revenueExceptions": [
              Number,
              ...
            ]
          },
          ...
        ],
        "sourcesOfExpenses": [
          {
            "sourceName": String,
            "expensePerDay": Number,
            "expenseExceptions": [
              Number,
              ...
            ]
          },
          ...
        ],
        "days": [ // equal to number of days of the month
          {
            "day": String // day of the month
            "sourcesOfRevenue": [
              {
                "sourceName": String,
                "revenuePerHour": Number,
                "taxPercentage": Number, // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
                "revenueExceptions": [
                  Number,
                  ...
                ]
              },
              ...
            ]
            "sourcesOfExpenses": [
              {
                "sourceName": String,
                "expensePerHour": Number,
                "expenseExceptions": [
                  Number,
                  ...
                ]
              },
              ...
            ]
          }
        ]
      },
      ...
    ]
  }
}
```
