[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devdependencies-badge]][devdependencies-badge-url]
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-barcode.svg)](https://emberobserver.com/addons/ember-cli-barcode)

[npm-badge]: https://img.shields.io/npm/v/ember-cli-barcode.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-cli-barcode
[travis-badge]: https://img.shields.io/travis/maxwondercorn/ember-cli-barcode/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/maxwondercorn/ember-cli-barcode
[ember-observer-badge]: http://emberobserver.com/badges/ember-cli-barcode.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-cli-barcode
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-badge-url]: https://github.com/maxwondercorn/ember-cli-barcode/blob/master/LICENSE
[dependencies-badge]: https://img.shields.io/david/maxwondercorn/ember-cli-barcode.svg
[dependencies-badge-url]: https://david-dm.org/maxwondercorn/ember-cli-barcode
[devdependencies-badge]: https://img.shields.io/david/dev/maxwondercorn/ember-cli-barcode.svg
[devdependencies-badge-url]: https://david-dm.org/maxwondercorn/ember-cli-barcode#info=devDependencies

# ember-cli-barcode

A ember-cli addon to render barcodes using the [JsBarcode](https://github.com/lindell/JsBarcode) library. See the [demo](https://maxwondercorn.github.io/ember-cli-barcode/) to experiment with many of the barcode options.

The addon adds accessibility attributes and elements to the generated barcodes. See the [Accessibility](#Accessibility) section below.

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.4 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```bash
  $ ember install ember-cli-barcode
```

By default all barcode types are added to your app. See the [build configuration](#Build-Configuration) section for slimming your build

## Simple Usage

The simplest form to render a barcode is to pass in a value and the default options will be used to generate a CODE128 barcode:

```handlebars
{{bar-code value="abc123456"}}
```

Or using angle bracket invocation, available in Ember 3.4+
```handlebars
<BarCode @value="abc123456" />
```

Which renders:

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/abc123456.png "CODE128 Barcode")

By default, barcodes are rendered using the `svg` element. The element can be changed to `img` or `canvas` using the tagName property:

```handlebars
{{bar-code
  value="A45689"
  tagName="img"}}

{{bar-code
  value="A45689"
  tagName="canvas"}}
```

Use the `img` tag if you want the ability to right-click copy or save the displayed barcode.

See the [Options](OPTIONS.md) readme for detailed barcode options.

See the [Contributing](CONTRIBUTING.md) guide for details.
