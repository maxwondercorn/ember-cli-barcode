[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url] 
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-barcode.svg)](https://emberobserver.com/addons/ember-cli-barcode)
<!-- [![Maintainability][maintanabilty-badge]][maintanabilty-url] -->
<!-- [![CircleCI Build Status][circle-badge]][circle-badge-url] -->
<!-- [![Test Coverage][coveralls-badge]][coveralls-badge-url] -->
<!-- [![Code Climate][codeclimate-badge]][codeclimate-badge-url] -->

[npm-badge]: https://img.shields.io/npm/v/ember-cli-barcode.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-cli-barcode
[travis-badge]: https://img.shields.io/travis/maxwondercorn/ember-cli-barcode/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/maxwondercorn/ember-cli-barcode
[circle-badge]: https://circleci.com/gh/maxwondercorn/ember-cli-barcode/tree/master.svg?style=svg&circle-token={{CIRCLE_TOKEN}}
[circle-badge-url]: https://circleci.com/gh/maxwondercorn/ember-cli-barcode/tree/master
[coveralls-badge]: https://coveralls.io/repos/github/maxwondercorn/ember-cli-barcode/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/maxwondercorn/ember-cli-barcode?branch=master
[codeclimate-badge]: https://img.shields.io/codeclimate/github/maxwondercorn/ember-cli-barcode.svg
[codeclimate-badge-url]: https://codeclimate.com/github/maxwondercorn/ember-cli-barcode
[ember-observer-badge]: http://emberobserver.com/badges/ember-cli-barcode.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-cli-barcode
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-badge-url]: https://github.com/maxwondercorn/ember-cli-barcode/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/david/maxwondercorn/ember-cli-barcode.svg
[dependencies-badge-url]: https://david-dm.org/maxwondercorn/ember-cli-barcode
[devDependencies-badge]: https://img.shields.io/david/dev/maxwondercorn/ember-cli-barcode.svg
[devDependencies-badge-url]: https://david-dm.org/maxwondercorn/ember-cli-barcode#info=devDependencies
[maintanabilty-badge]: https://api.codeclimate.com/v1/badges/f1c7cd432536e28aacdf/maintainability
[maintanabilty-url]: https://codeclimate.com/github/maxwondercorn/ember-cli-barcode/maintainability

# ember-cli-barcode

An ember-cli addon to render barcodes in Ember applications using the [JsBarcode](https://github.com/lindell/JsBarcode) library.  See the [demo](https://maxwondercorn.github.io/ember-cli-barcode/)

## Version Compatibility
ember-cli-barcode is compatible with Ember 2.4 onward and is passing tests for Ember 3.x.  ember-cli-barcode version 2.0 onward no longer requires Bower - thanks @donaldwasserman

After upgrading to 2.x, if jsbarcode was your only Bower dependency you can remove bower.json from your project and delete the bower_components directory. If you have other Bower dependencies, remove the jsbarcode dependency from bower.json

## Installation
```
  $ ember install ember-cli-barcode
```
## Usage

The simplest form to render a barcode is to pass in a value using the default options which generate a CODE128 barcode:

```
{{bar-code value="abc123456"}}
```

Which renders:

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/abc123456.png "CODE128 Barcode")
  
&nbsp; 


By default, barcodes are rendered using the `svg` element.  The element can be changed to `img` or `canvas` using the tagName property:

```
{{bar-code
  value="A45689"
  tagName="img"}}
```

```
{{bar-code
  value="A45689"
  tagName="canvas"}}
```

Use the `img` tag if you want the ability to right-click copy or save the displayed barcode.

## Options

All JsBarcode's [options](https://github.com/lindell/JsBarcode/wiki/Options#format) are supported by the addon. See [Barcode Specifications](http://www.makebarcode.com/specs/speclist.html) for details on each format.  A few examples are below.  See the [demo](https://github.com/lindell/JsBarcode/wiki/Options#format) application for more.

Change the barcode format by passing the format name into the component.  To display a UPC barcode:

```
  {{bar-code
    value="123456789999"
    format="UPC"}}
```
![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/upc.png "UPC Barcode")

&nbsp; 


The color of the barcode or it's background can be changed:

```
  {{bar-code
    value="abc123456"
    lineColor="red"}}
```
![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/redlines.png "Colored Barcode")

&nbsp; 


background color changed:
```
  {{bar-code
    value="abc123456"
    lineColor="#ffffff"
    background="#660033"}}
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/background.png "Barcode with colored background")

&nbsp; 

Any valid html or hexadecimal color can be used for the `lineColor` or `background` options. The component does not support the Ember component blockform.

If you have many options, pass an object using the `options` parameter instead of passing a large number of individual parameters.  The `options` will override any other parameters set on the component.

```
  // app/controllers/application.js
  myOptions: {
    format: "UPC",
    textPosition: "top",
    lineColor: "#ff3399",
  }
```
```
  {{!-- app/templates/application.hbs --}}
  {{bar-code
    value="11223344"
    options=myOptions}}

  {{!-- options override other settings --}}
  {{!-- line color will be ##ff3399 --}}
  {{bar-code
    value="11223344"
    options=myOptions
    lineColor="blue"}}
```
![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/linecolorff3399.png "Barcode line color ff3399")

&nbsp; 


## EAN13 and UPC

The `flat` option is supported for both EAN13 and UPC barcodes defaulting to `false` if not specified  Additionally the `lastChar` option is supported for EAN13 barcodes with a default value of ''.

## Invalid Barcode Values
If you pass an invalid value based on the format, the barcode will not render.  To capture invalid values assign an action to the `vaild` property.


```
// app/templates/application.hbs
// pass invalid code for EAN8 barcodes
{{barcode format="EAN8"  value="9638" valid=(action 'checkValid')}}

{{if validCode "Valid" "Invalid"}}
```


```
// app/controllers/application.js
import Controller from '@ember/controller';

export default Controller.extend({
  validCode: false,

  actions: {
      checkValid (status) {
        this.set('validCode', status)
      },
  }

});
```

IF you have have multiple barcodes in a template and want to check the validity of each individually, you would need a dedicated action and controller property for each barcode.

## More
The dummy application allows you to experiment with many of the barcode options. As you select different barcode formats a predefined valid code is selected for rendering. scandit.com has a nice <a src="https://www.scandit.com/types-barcodes-choosing-right-barcode/">summary</a> of different barcode formats.

## Running

To run the dummy application

* `npm install` or `yarn`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Tests

* `npm install` or `yarn`
* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`


For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

MIT
