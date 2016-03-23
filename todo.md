# Balance
#### Balance your funds with ease
___

## To Do
- Document/Figure out:
  - ... features
  - ... nav UX
  - ... UI/prototype layout
  - ... tools needed
  - ... style guide
  - ... file structure and custom modules
  - ... data structures

___

## Features and Functionality
- Pages - Home(landing page), Signup/Login, About, Terms and Conditions, Dashboard(when signed in)
- Page: Home
  - Hero image
    - Title: "Balance"
    - Subtitle: "Money Management Made Simple and Easy"
  - About section
    - Title: "What Is Balance?"
    - Body: "Balance is a simple-to-use web application that makes it easy to manage your money. Track where your money is coming from, where it's going, where it needs to go, and, ultimately, what goes in your pocket!"
  - Key Features section
    - "Manage your money in detail, down to the day"
    - "View individual stats and metrics in real time, or with the click of a button"
    - "Customize your experience; pick the color scheme of your dashboard"

- Page: Dashboard
  - Enter cash earnings of the year
    - User can enter revenue per month and source of income. Value will be used to calculate cash per year
      - Dollars and cents should have separate inputs
        - Block key inputs that aren't within this key code range: 48-57, 188
        - Allow 188 (comma) for dollar input
        - Allow 9 (tab) for navigation
    - User can enter multiple revenue values and a source for each
    - User can enter tax percentage to be deducted and displayed
    - Display total revenue before taxes, tax amount, and cash after taxes
    - Enter cash earnings of the month
      - User can enter revenue per day and source of income. Value will be used to calculate cash per month
        - Dollars and cents should have separate inputs
          - Block key inputs that aren't within this key code range: 48-57, 188
          - Allow 188 (comma) for dollar input
          - Allow 9 (tab) for navigation
      - User can enter multiple revenue values and a source for each
      - User can enter tax percentage to be deducted and displayed
      - Display total revenue before taxes, tax amount, and cash after taxes
      - Enter cash earnings of the day
        - User can enter revenue per hour and source of income. Value will be used to calculate cash per day
          - Dollars and cents should have separate inputs
            - Block key inputs that aren't within this key code range: 48-57, 188
            - Allow 188 (comma) for dollar input
            - Allow 9 (tab) for navigation
        - User can enter multiple revenue values and a source for each
        - User can enter tax percentage to be deducted and displayed
        - Display total revenue before taxes, tax amount, and cash after taxes
          - Can enter tax percentage

___

## Nav UX
- Begin at: Year Cash Earnings
- Can navigate directly to: [Month|Week|Day] Cash Earnings
  - Month Cash Earnings
  - Can navigate directly to: [Week|Day] Cash Earnings
    - Week Cash Earnings
    - Can navigate directly to: Day Cash Earnings
      - Day Cash Earnings

___

## UI/Layout
1. **Color Scheme #1:**
  - Shades of green/US currency colors
2. **Color Scheme #2:**
  - Localized currency colors
3. **Color Scheme #3:**
  - Mostly white (boring)
4. **Color Scheme #4:**
  - Customizable (starts off as #3)

___

## Development and Production Tools
### Production Tools
- Server
  - Node
  - **Packages (by package name)**:
    - express
    - path (comes with node)
    - body-parser
    - cookie-parser
    - bcryptjs
    - csurf
    - helmetjs
    - mongodb
    - ejs
    - fs (?)
    - [shoehornjs](http://npmjs.com/package/shoehornjs)
- Client
  - React
  - Sass
    - [layoutcss](http://npmjs.com/package/layoutcss)

### Development Tools
- gulp
  - node-sass
  - jasmine
  - browser-sync
    - nodemon

### Style guide
- [JavaScript Style Guide](https://github.com/piecedigital/cash-check/blob/master/styleguide-javascript.md)
- [CSS Style Guide](https://github.com/piecedigital/cash-check/blob/master/styleguide-css.md)

### File Structure and Custom modules
- /
  - [node_modules/](https://github.com/piecedigital/cash-check/blob/master/todo.md#production-tools)
  - custom_modules/
    - routes.js (route all handling)
    - accounts.js (handles all user account operations)
    - mongo-querier.js (handles all DB query operations)
  - public/
    - js/
      - jquery-1.12.x.min.js
      - react-app.js (the entire app view)
      - calculator.js (handles all calculations through various functions)
    - css/
      - home-page.scss
        - home-page.css
      - app-page.scss
        - app-page.css
    - images/
  - views/
  - private/
    - private_data.js
    - jasmine.spec.js
  - app.js
  - Procfile =
    - "web: node app.js"
  - .gitignore
  - package.json =
    - name: "cash-check"
    - description: "Track The Cash You Earn and Spend"
    - keywords: ["cash", "money", "revenue", "management", "tracking"]

### Data structures
#### User account info. Collection: users
``` js
{
  "String_firstName": String,
  "String_lastName": String,
  "String_email": String, // regex: /([a-z0-9]){1,}([.][a-z0-9]{1,})?([@][a-z0-9]{2,}[.][a-z]{1,3})([.][a-z]{1,2})?/i
  "String_username": String, // regex: /^[a-z0-9_-]{3,}$/gi
  // ...  // used for login and to connect the user document in the "users" collection
  "String_accountType": String, // ["basic", "premium"]
  "Object_ban": {
    "Bool_status": Boolean,
    "Int_banDate": Number, // new Date().getTime() === gets milliseconds
    "String_reason": String // explains the reason for the user's ban
  },
  "Object_suspension":  {
    "Int_times": Number, // Equal to length of "reasons"
    "Array_reasons": [
      "Int_startDate": Number, // new Date().getTime() === gets milliseconds
      "Int_endDate":
    ]
  }
}
```

#### User money management data. Collection: moneyManagement
``` js
{
  "String_username": String, // used to connect the user document in the "users" collection
  "Object_moneyManagement": {
    "Int_year": Number,
    "Array_sourcesOfIncome": [
      {
        "String_sourceName": String,
        "Int_revenuePerMonth": Number,
        "Int_taxPercentage": Number // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
      },
      ...
    ]
    "Array_months": [
      {
        "String_month": String, // January
        "Array_sourcesOfIncome": [
          {
            "String_sourceName": String,
            "Int_revenuePerDay": Number,
            "Int_taxPercentage": Number // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
          },
          ...
        ]
        "Array_days": [ // equal to number of days of the month
          {
            "Array_sourcesOfIncome": [
              {
                "String_sourceName": String,
                "Float_revenuePerHour": Number,
                "Float_taxPercentage": Number // between 0-100. to be converted to a decimal representation (ex: 50% = .5)
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
