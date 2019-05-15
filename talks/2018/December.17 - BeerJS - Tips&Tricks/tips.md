# Tips and tricks

## Variable names

## Type coersion

```javascript
const inputValue = '4';

// bad
const val = new Number(inputValue);
const val = +inputValue;
const val = parseInt(inputValue);
const val = inputValue >> 0; // can't handle numbers above 32 bits

// good
const val = Number(inputValue);
const val = parseInt(inputValue, 10);
```

## falsy vs false

undefined, null, 0, false, NaN, ''

if(!x){


}











## Number.toFixed => string








## DOM is mutable, always check for null












## Hack the default JSON parse to handle errors better

```javascript
var originalParse = JSON.parse;

JSON.parse = function(x) {
    try {

    } catch(e) {
      myLogging(e);
      throw(e)
    }
}
```






## Don't use setInterval, use recursive setTimeout
















## Why 42 &#42 === *










## Alwasys init whole objects










## Computed object properties

```javascript
const obj = {
  foo: 5,
  bar: 'str',
  [getKey('enabled')]: true,
};
```








## Use generators to create realistic mocks











## Filename === defaultExport










## You can't improve what you don't measure










## Single purpose

function add(a, b){
  if(a and b are numbers)
  return a + b
  }

















## Don't call me, I'll call you


object.syncGiveMeX();

