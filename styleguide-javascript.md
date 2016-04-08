# JavaScript Style Guide

___

I'll keep this fairly brief and get to the point of everything, so most of this documentation will be examples.

### Variable Names and Declaration
All variable names should be camel-cased.

For variables that are (to be treated as) immutable you must insert "Immut_" at the beginning.
```js
var shoehorn = require("shoehornjs");
const Immut_fooBar = "foobar";
```

Argument variables **must** have their value checked using Shoehornjs. The documentation for it can be found [here](http://npmjs.com/package/shoehornjs).
```js
myFunctionTakesACallback(function(returnedData) {
  returnedData = shoehorn().String(returnedData);
});
```
```js
myFunctionTakesACallback(givenData, callback) {
  callback( shoehorn().String(givenData) );
};
```

Because Shoehorn will return the desired data type even if the expected type is wrong, this reassignment check isn't necessary
```js
myStuff.reduce(function(number1, number2) {
  return shoehorn().Int(number1) + shoehorn().Int(number2);
});
```

If the arguments provided aren't expected they'll be caught.

**Note:** For server code `const` should be used when assigning data to immutable variables.

Q: Why use [Shoehornjs](http://npmjs.com/package/shoehornjs) and this  manner of variable creation instead of something like TypeScript?

A: I simple don't want it. I don't feel the need for it. And I don't want everything I write to go through a processor. I don't think it'll make anything faster or better for me. I'm not one of those people that get hung up on static typing. I can live with it, I can live without it; it makes no never mind to me.

Q: I like using underscored variables over camel-case. Can I do that instead?

A: No. I'd appreciate it if you respect this style guide.

### Functions
Fairly simply, the opening brace for a function should be on the same line as the function. I don't know where that came from but that's not how I'm doing things 'round there here parts.

``` js
var foo = function() {
  // code goes here... of course
};
```

A: But... I like the block beginning on the next line :(.

Q: I'm certain.

### Objects
The style of writing an object is the same as writing a function: begin the block on the same line.

``` js
var Object_myObject = {
  foo: "foo"
};
```

### Arrays
Arrays are usually fine as one liners. However if the array was to contain an object or (for whatever damned reason) a function, those cells need to move to the next line.

``` js
var myArray = ["foo", "bar", "baxz"];
```
``` js
var myObjectifiedArray = [{
  ...
},
{
  ...
}];
```

### Comments
Comments should be made throughout explaining parts of the code.

Code that needs attention should have their urgency expressed with 1-3 exclamation marks (which we'll call "tier marks"), followed by a description.

Here's what these marks essentially mean and what they can be used for:
- ! = "Take a look at this when you can" - This should be used for code that's functional, but it could use some refactoring or needs to be completed. This is low priority, things that can wait until other things are done, or when you're bored.
- !! = "Make some time for this" - This should go on a task list. This should be used for code that is mostly functional but will break on rare conditions, code that's not readable, uncommented, etc.
- !!! = "Handle this ASAP" - This gets bumped to the top of your task list. This should be used for code that's doesn't work, breaks on most cases, is not tested/has no test case, doesn't follow the style guide, etc.

```js
// ! - This could be written better
```

You can further express an immediate but small description of the issue by appending an adjective within square brackets directly after the tier marks.
- [refactor]
- [fragile]
- [broken]
- [avoid]

```js
// !!![broken] - User input is not being sanitized
```

Tier marks and adjectives **should** be used together as they will indicate the issue at hand very quickly without much reading, however they aren't required to be used together.
