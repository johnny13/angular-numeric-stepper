# Angular Numeric Stepper directive

A little bit advanced numeric stepper. Based on https://github.com/revolunet/angular-stepper

Has "step-by" attribute and a different layout

## Usage

To use the directive at this moment, there are two ways. (Pretty boring ways if you ask me)

1. One is to clone this repo and then manually copy to your project
2. Other is to follow the instructions on https://github.com/revolunet/angular-stepper
    and then implement the changes here

after installing add a dependency

add a dependency to your app :
```javascript
angular.module('MyApp', [
    'revolunet.stepper'
]);
```
use the directive :
```html
<div numeric-stepper ng-model="product.quantity" min="config.min" max="config.max" step-by="config.stepBy"></div>
```

## Licence
Licensed under the permissive MIT license

