Feature|Block: Year|Block: Month|Block: Day
:---|:---:|:---:|:---:|:---:
Can enter pre-tax revenue or post-tax/tax-free revenue|Yes|Yes|Yes
Can specify a block to be a specific date or for all matching block types (default)|N/A: *Years are all individually set* |Yes|Yes
Blocks can be specified to have no revenue and/or expense|Yes|Yes|Yes
User can enter multiple revenue amounts with the name of the source of income **[1]** |Yes|Yes|Yes
User can enter multiple expense amounts with the name of the source of expense **[2]** |Yes|Yes|Yes
**[1,2]** If the current money block has a specified year the revenue/expense will be one time, else it will be per block of the same type|N/A: *Years are all individually set* |Yes|Yes
**[2]** Expenses can be percentages|Yes|Yes|Yes
In overview mode: display total revenue before taxes, tax amount, and cash after taxes|Yes|Yes|Yes
Can toggle between parent block evaluation and child block evaluation **[3]** |Yes|Yes|No: *This block doesn't have any child blocks*

- Block key inputs that aren't within this key code range: 48-57, 188
- Allow key code 188 (comma) for dollar input
- Allow key code 9 (tab) for navigation

- Year block
- Can navigate directly to: Child Month block
  - Month block
    - Can navigate directly to: Parent Year block
      - Any changes to the block must be saved/discarded before navigating
    - Can navigate directly to: Child Day block
      - Day block
        - Can navigate directly to: Parent Month block
          - Any changes to the block must be saved/discarded before navigating
