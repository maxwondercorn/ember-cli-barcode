[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![CircleCI Build Status][circle-badge]][circle-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url] 
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]


[npm-badge]: https://img.shields.io/npm/v/{{REPO_NAME}}.svg
[npm-badge-url]: https://www.npmjs.com/package/{{REPO_NAME}}
[travis-badge]: https://img.shields.io/travis/{{USER_NAME}}/{{REPO_NAME}}/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/{{USER_NAME}}/{{REPO_NAME}}
[circle-badge]: https://circleci.com/gh/{{USER_NAME}}/{{REPO_NAME}}/tree/master.svg?style=svg&circle-token={{CIRCLE_TOKEN}}
[circle-badge-url]: https://circleci.com/gh/{{USER_NAME}}/{{REPO_NAME}}/tree/master
[coveralls-badge]: https://coveralls.io/repos/github/{{USER_NAME}}/{{REPO_NAME}}/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/{{USER_NAME}}/{{REPO_NAME}}?branch=master
[codeclimate-badge]: https://img.shields.io/codeclimate/github/{{USER_NAME}}/{{REPO_NAME}}.svg
[codeclimate-badge-url]: https://codeclimate.com/github/{{USER_NAME}}/{{REPO_NAME}}
[ember-observer-badge]: http://emberobserver.com/badges/{{REPO_NAME}}.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/{{REPO_NAME}}
[license-badge]: https://img.shields.io/npm/l/{{REPO_NAME}}.svg
[license-badge-url]: LICENSE.md
[dependencies-badge]: https://img.shields.io/david/{{USER_NAME}}/{{REPO_NAME}}.svg
[dependencies-badge-url]: https://david-dm.org/{{USER_NAME}}/{{REPO_NAME}}
[devDependencies-badge]: https://img.shields.io/david/dev/{{USER_NAME}}/{{REPO_NAME}}.svg
[devDependencies-badge-url]: https://david-dm.org/{{USER_NAME}}/{{REPO_NAME}}#info=devDependencies

# ember-cli-barcode

An ember-cli addon to render barcodes in Ember applications using the [JsBarcode](https://github.com/lindell/JsBarcode) library.  See the [demo](http://GitHub-Mark-32px.png)


## Installation
```
  $ ember install ember-cli-barcode
```
## Usage

The simpliest form to render a barcode is to pass in a value using the defaults options.  This will generate a CODE128 barcode:

```
{{{bar-code value="abc123456"}}}
```
&nbsp; 

Which renders:

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "CODE128 Barcode")
  
&nbsp; 


By default, barcodes will be rendered using the `svg` element.  You can change the element to `img` or `canvas` using the tagName property:

```
{{bar-code
  value="A45689"
  tagName="img"}}

{{bar-code
  value="A45689"
  tagName="canvas"}}
```

Use the `img` tag if you want the ability to copy or save the barcode displayed on the page.

## Options

All JsBarcode [options](https://github.com/lindell/JsBarcode/wiki/Options#format) are supported by the addon. See [Barcode Specifications](http://www.makebarcode.com/specs/speclist.html) for details on each format.  A few examples are below.  See the [demo](https://github.com/lindell/JsBarcode/wiki/Options#format) application for more.

Chage the barcode format by passing the format name into the component.  To display a Code39 barcode:

```
  {{bar-code
    value="A34562"
    format="CODE39"}}
```

The color of the barcode or it's background can be chaged:

```
  {{bar-code
    value="abc123456"
    lineColor="red"}}

  {{bar-code
    value="abc123456"
    lineColor="#ffffff"
    background="#660033"}}
```

Any valid html or hexadecimal color can be used for the `lineColor` or `background` options. The component blockform is not supported.

If you have many options, instead of passing a large number of parameters you can pass an object using the `options` parameter.  The options parameter will override any other parameters set on the component.

```
  myOptions: {
    format: "UPC",
    textPosition: "top",
    lineColor: "#ff3399",
  }

  {{bar-code
    value="11223344"
    options=myOptions}}

  // options overrides other settings
  // line color will be #ff3399
  {{bar-code
    value="11223344"
    options=myOptions
    lineColor="blue"}}
```

## EAN13 and UPC

The `flat` option is supported for both EAN13 and UPC barcodes defaulting to `false` if not specided.  Additionally the `lastChar` option is supported for EAN13 barcodes with a default value of ''.

## Invalid Barcode Values
IF you pass an invalid value based on the format, the barcode will not render.  To capture invalid values assign an action to the `vaild` property.


```
app/templates/application.hbs
// invalid code for form EAN8
{{barcode format="EAN8"  value="9638" valid=(action 'checkValid')}}

{{if validCode "Valid" "Invalid"}}
```


```
app/controllers/application.js
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
## More
The dummy application allows you to experiment with many of the barcode options. As you select different barcode formats a predifined valid code is selected for rendering. Invalid codes generate errors scandit.com has a nice <a src="https://www.scandit.com/types-barcodes-choosing-right-barcode/">summary</a> of different barcode formats.

## Running

To run the dummy application:

* `bower install`
* `npm install`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Tests

Testing requires jsbarcode.js be installed as a bower component

* `bower install`

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

MIT
