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

A ember-cli addon to render barcodes using the [JsBarcode](https://github.com/lindell/JsBarcode) library. See the [demo](https://maxwondercorn.github.io/ember-cli-barcode/)

The addon adds accessibility attributes and elements to the generated barcodes. See the [Accessibility](#Accessibility) section below.

## Version Compatibility

ember-cli-barcode is compatible with Ember 2.4 onward and is passing tests for Ember 3.x.

Version 2.x onward no longer requires Bower but you need to add configuration to `ember-cli-build.js` - thanks @donaldwasserman

After upgrading to 2.x, if jsbarcode was your only Bower dependency you can remove bower.json from your project and delete the bower_components directory. If you have other Bower dependencies, remove the jsbarcode dependency from bower.json

## Installation

```
  $ ember install ember-cli-barcode
```

By default all barcode types are added to your app. See the [build configuration](#Build-Configuration) section for slimming your build

## Usage

The simplest form to render a barcode is to pass in a value and the default options will be used to generate a CODE128 barcode:

```hbs
{{bar-code value="abc123456"}}
```

Or using angle bracket invocation, available in Ember 3.4+
```hbs
<BarCode @value="abc123456" />
```

Which renders:

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/abc123456.png "CODE128 Barcode")

&nbsp;

By default, barcodes are rendered using the `svg` element. The element can be changed to `img` or `canvas` using the tagName property:

```hbs
{{bar-code
  value="A45689"
  tagName="img"}}
```

```hbs
{{bar-code
  value="A45689"
  tagName="canvas"}}
```

Use the `img` tag if you want the ability to right-click copy or save the displayed barcode.

## Options

All JsBarcode's [options](https://github.com/lindell/JsBarcode/wiki/Options#format) are supported by the addon. See [Barcode Specifications](http://www.makebarcode.com/specs/speclist.html) for details on each format. A few examples are below. See the [demo](https://github.com/lindell/JsBarcode/wiki/Options#format) application for more.

Change the barcode format by passing the format name into the component. To display a UPC barcode:

```hbs
  {{bar-code
    value="123456789999"
    format="UPC"}}
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/upc.png "UPC Barcode")

&nbsp;

The color of the barcode or it's background can be changed:

```hbs
  {{bar-code
    value="abc123456"
    lineColor="red"}}
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/redlines.png "Colored Barcode")

&nbsp;

background color changed:

```hbs
  {{bar-code
    value="abc123456"
    lineColor="#ffffff"
    background="#660033"}}
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/background.png "Barcode with colored background")

&nbsp;

Any valid html or hexadecimal color can be used for the `lineColor` or `background` options. The component does not support the Ember component blockform.

If you have many options, pass an object using the `options` property instead of a large number of individual properties. The `options` will override any other properties set on the component.

```js
  // app/controllers/application.js
  myOptions: {
    format: "UPC",
    textPosition: "top",
    lineColor: "#ff3399",
  }
```

```hbs
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

Alternatively, you can globally set any option for your application using `config/enviroment.js`. See [Runtime Configuration](#Runtime-Configuration) for details.

## EAN13 and UPC

The `flat` option is supported for both EAN13 and UPC barcodes defaulting to `false` if not specified Additionally the `lastChar` option is supported for EAN13 barcodes with a default value of ''.

## Invalid Barcode Values

If you pass an invalid value based on the format, the barcode will not render. To capture invalid values assign an action to the `vaild` property.

```hbs
// app/templates/application.hbs
// pass invalid code for EAN8 barcodes
{{bar-code format="EAN8"  value="9638" valid=(action 'checkValid')}}

{{if validCode "Valid" "Invalid"}}
```

```js
// app/controllers/application.js
import Controller from "@ember/controller";

export default Controller.extend({
  validCode: false,

  actions: {
    checkValid(status) {
      this.set("validCode", status);
    }
  }
});
```

IF you have have multiple barcodes in a template and want to check the validity of each individually, you need a dedicated action and controller property for each barcode.

## Accessibility

ember-cli-barcode adds the `alt` attribute, other attributes or other elements to the barcode image for website accessibly. This Medium [post](https://medium.com/statuscode/getting-started-with-website-accessibility-5586c7febc92) by Carie Fisher discuses the whys of website accessibility.

The default text generated for accessibility is based on the barcode's value:

```js
"Barcode value <value>";
```

where `<value>` is the value passed into the component. You can override the text used on an individual component invocation by setting the `altText` property. You can globally override all components and exclude the value from the text string using [runtime configuration](#Runtime-Configuration). There are additional accessibility options that can be set in runtime configuration.

```hbs
{{bar-code value="9638A3" altText="Ticket barcode"}}
```

generates the following alternative attribute text

```
Ticket barcode 9638A3
```

Excluding the value

Each element type, img, svg and canvas requires different attributes or additional elements to meet A11Y guidelines. Assuming the component declaration

```hbs
{{bar-code value="BCD10"}}
```

the markup generated for each "image" type would be

### svg:

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)" aria-labelledby="title">
  ... svg data
  <title>Barcode value BCD10</title>
</svg>
```

### image:

```html
<img  src="data:image/png;base64,iVBORw0KGgoAA6dOLEi..." alt="Barcode value BCD10">
```

### canvas:

```html
<canvas role="img" aria-label="Barcode value BCD10">
   canvas data...
</canvas>
```

## Build Configuration

By default, this addon provides the `JsBarcode.all` javascript file. If you are looking to slim your build and only need a specific version provided by the upstream package,
you can pass the type of file you'd like to include via the `include` option. If you supply `all` or a falsy value, the addon will include the default all package.

The example below configures the addon to include only code128 barcodes in the Ember app.

```js
// ember-cli-build.js
const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    "ember-cli-barcode": {
      include: "code128"
    }
  });

  return app.toTree();
};
```

### Supported Options

- `all`
- `codabar`
- `code128`
- `code39`
- `ean-upc`
- `itf`
- `msi`
- `pharmacode`.

## Runtime Configuration

Barcode options may be configured globally in `config/enviroement.js`. Global option properties can still be overridden on individual components by setting the property on the components invocation. See the sample configuration setting below.

See JsBarcode's [options](https://github.com/lindell/JsBarcode/wiki/Options#format) for the values that may be globally set.

The following accessibility values may also be set in runtime configuration

| Value Name      | Default | Description                                                                                                                                                                       |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| altText         | null    | Globally sets text portion of the alt text attribute. Can also be set on the component                                                                                            |
| excludeAltValue | false   | Do not include the barcode value in the alt text                                                                                                                                  |
| ariaHidden      | false   | Adds the aria-hidden attribute to the image effectively hiding it from screen readers                                                                                             |
| addTitle        | false   | Adds the title to img and canvas tags so they will show the text value on hover. svgs use the title element for accessibility so it's added by default, unless you set ariaHidden |

```js
// ember-cli-barcode options
ENV["ember-cli-barcode"] = {
  altText: "Ticket", // override accessibility text
  addTitle: true, // add title to each barcode

  // jsbarcode options
  format: "code128",
  mod43: false,
  width: 3,
  height: 200,
  displayValue: false,
  fontOptions: "",
  font: "Arial",
  textAlign: "left",
  textPosition: "top",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: 20,
  marginBottom: 30,
  marginLeft: 5,
  marginRight: 13,
  flat: false,
  lastChar: "Q"
};
```

## More

The dummy application allows you to experiment with many of the barcode options. As you select different barcode formats a predefined valid code is selected for rendering. scandit.com has a nice <a src="https://www.scandit.com/types-barcodes-choosing-right-barcode/">summary</a> of the different barcode formats.

## Running

To run the dummy application

- `npm install` or `yarn`
- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).

## Tests

- `npm install` or `yarn`
- `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
- `ember test`
- `ember test --server`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

MIT
