# @hrimsoft/utils 
![GitHub](https://img.shields.io/github/license/basim108/utils-js)
![npm](https://img.shields.io/npm/v/@hrimsoft/utils)
![npm](https://img.shields.io/npm/dy/@hrimsoft/utils)

# installing
`npm install @hrimsoft/utils --save`

or

`yarn add @hrimsoft/utils`
# usage
## Checking arguments on null, white space or empty arrays
```javascript
import _ from '@hrimsoft/utils';
// or
// const _ = require('@hrimsoft/utils').default

_.isNull('  '); // true
_.isNotNull('  '); // false; it's more readable than if(!_.isNull('   '))...

_.isNull([]); // true
```
## Checking callback functions before calling them
```javascript
import _ from '@hrimsoft/utils';
// or
// const _ = require('@hrimsoft/utils').default

function my_func(callback){
    if(_.isFunction(callback))
      callback.call();
}

// if you have an object and you need to check it member on being a function dynamically
const obj = {
    prop: {
        method: (x) => x + 1;
    }
}
_.isFunction('prop.method', obj)); // true
```
## Casting to numbers
```javascript
import _ from '@hrimsoft/utils';
// or
// const _ = require('@hrimsoft/utils').default

_.toNumber('.5'); // 0.5
_.toNumber('12'); // 12
_.toNumber(true); // 1
_.toNumber(['1',false, '-12.3']); // [1,0,-12.3]
```
## Casting to boolean
```javascript
import _ from '@hrimsoft/utils';
// or
// const _ = require('@hrimsoft/utils').default

_.toBool(5);     // true
_.toBool(0);     // false
_.toBool('');    // false
_.toBool('  ');  // false

// argument could be in any case
_.toBool('TrUe');  // true
_.toBool('FalSe);  // false

_.toBool(null);    // false
_.toBool({});      // true
_.toBool([]);      // false
_.toBool([1,'false', ' ', { prop: 10 }]); // [true, false, false, true]
```
