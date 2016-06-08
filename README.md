# AngularJS Circular Time Picker
Native AngularJS datetime picker element directive with a circular interface for time

[Home / demo page](http://sidaudhi.github.io/angular-circular-timepicker/)

# Dependencies

Requires:
 * AngularJS 1.4.x or higher (1.0.x will not work)
 * MomentJS

# Usage
We use **bower** and **npm** for dependency management, run

```shell
bower install --save angular-circular-timepicker
```
```shell
npm install --save angular-circular-timepicker
```

This will copy the angular-circular-timepicker files into your components folder, along with its dependencies.

### Add the css:

#### bower

```html
<link rel="stylesheet" href="bower_components/angular-circular-timepicker/dist/stylesheets/angular.circular.timepicker.css"/>
```
#### npm
```html
<link rel="stylesheet" href="node_modules/angular-circular-timepicker/dist/stylesheets/angular.circular.timepicker.css"/>
```

### Load the script files in your application:
#### bower
```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/moment/moment.js"></script>
<script type="text/javascript" src="bower_components/angular-circular-timepicker/dist/javascript/angular.circular.timepicker.js"></script>
```
#### npm
```html
<script type="text/javascript" src="node_modules/angular/angular.js"></script>
<script type="text/javascript" src="node_modules/moment/moment.js"></script>
<script type="text/javascript" src="node_modules/angular-circular-timepicker/dist/javascript/angular.circular.timepicker.js"></script>
```

Add the date module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['angular.circular.timepicker'])
```

Apply the directive to your form elements:

```html
<circulartimepicker model="data.date"></circulartimepicker>
```
