Barcode Options
------------------------------------------------------------------------------

All JsBarcode's [options](https://github.com/lindell/JsBarcode/wiki/Options#format) are supported by the addon. See [Barcode Specifications](http://www.makebarcode.com/specs/speclist.html) for details on each format. A few examples are shown below. See the [demo](https://github.com/lindell/JsBarcode/wiki/Options#format) application for more.

Change the barcode format by passing the format name into the component. To display a UPC barcode:

```handlebars
  <BarCode
    @value="123456789999"
    @format="UPC"
  />
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/upc.png "UPC Barcode")

&nbsp;

The color of the barcode or it's background can be changed:

```handlebars
  <BarCode
    @value="abc123456"
    @lineColor="red"
  />
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/redlines.png "Colored Barcode")

&nbsp;

background color changed:

```handlebars
  <BarCode
    @value="abc123456"
    @lineColor="#ffffff"
    @background="#660033"
  />
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/background.png "Barcode with colored background")

&nbsp;

Any valid html or hexadecimal color can be used for the `lineColor` or `background` options. The component does not support the Ember component blockform.

If you have many options, pass an object using the `options` property instead of a large number of individual properties. The `options` will override any other properties set on the component.

```javascript
  // app/controllers/application.js
  myOptions: {
    format: "UPC",
    textPosition: "top",
    lineColor: "#ff3399",
  }
```

```html
  <!-- app/templates/application.hbs -->
  <BarCode
    @value="11223344"
    @options={{this.myOptions}}
  />

  <!-- options override other settings -->
  <!-- line color will be ##ff3399 -->
  <BarCode
    @value="11223344"
    @options={{this.myOptions}}
    @lineColor="blue"
  />
```

![alt text](https://github.com/maxwondercorn/ember-cli-barcode/raw/master/images/linecolorff3399.png "Barcode line color ff3399")

&nbsp;

Alternatively, you can globally set any option for your application using `config/enviroment.js`. See [Runtime Configuration](#Runtime-Configuration) for details.

## EAN13 and UPC

The `flat` option is supported for both EAN13 and UPC barcodes defaulting to `false` if not specified Additionally the `lastChar` option is supported for EAN13 barcodes with a default value of ''.

## Invalid Barcode Values

If you pass an invalid value based on the format, the barcode will not render. To capture invalid values assign an action to the `vaild` property.

```handlebars
// app/templates/application.hbs
// pass invalid code for EAN8 barcodes
 <BarCode @format="EAN8" @value="9638" @valid={{this.checkValid}} />

{{if validCode "Valid" "Invalid"}}
```

```javascript
// app/controllers/application.js
import Controller from "@ember/controller";
import { action } from '@ember/object';

export default Controller.extend({
  validCode: false,

  @aciton
  checkValid(status) {
    this.validCode = status
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

```handlebars
 <BarCode @value="9638A3" @altText="Ticket barcode" />
```

generates the following alternative attribute text

```
Ticket barcode 9638A3
```

Excluding the value

Each element type, img, svg and canvas requires different attributes or additional elements to meet A11Y guidelines. Assuming the component declaration

```handlebars
 <BarCode @value="BCD10" />
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
<img src="data:image/png;base64,iVBORw0KGgoAA6dOLEi..." alt="Barcode value BCD10">
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

```javascript
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

```javascript
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