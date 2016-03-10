# Cash Check
#### Track The Cash You Earn and Spend
___

## To Do
- Figure out features
- Figure out nav UX
- Figure out UI/prototype layout
- Figure out tools needed
___

## Features and Functionality
- Enter cash earnings of the year
  - User can enter source of income
  - User can enter multiple revenue values and a source for each
  - User can enter tax percentage
  - User can enter cash per month to calc. cash per day
  - Display total revenue, tax amount, and cash after tax

  - Enter cash earnings of the month
    - User can enter source of income
    - User can enter multiple revenue values and a source for each
    - User can enter tax percentage
    - User can enter cash per week to calc. cash per day
    - Display total revenue, tax amount, and cash after tax

    - Enter cash earnings of the week
      - User can enter source of income
      - User can enter multiple revenue values and a source for each
      - User can enter tax percentage
      - User can enter cash per day to calc. cash per day
      - Display total revenue, tax amount, and cash after tax

      - Enter cash earnings of the day
        - User can enter source of income
        - User can enter multiple revenue values and a source for each
        - User can enter tax percentage
        - User can enter cash per hour to calc. cash per day
        - Display total revenue, tax amount, and cash after tax
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
      - mongoose(? Not necessary)
    - react + react-jsx(? This would mean server rendered React pages)
      - fs (comes with node. We'll need this if we go with react-jsx)
- Client
  - React
  - Sass

### (Suggested) Development Tools
**!!!These dev tools are per user choice. No dev tool should be used in such a way that it forces everyone else to use it if they don't want to!!!**
- Gulp
  - node-sass
  - browser-sync
    - nodemon
