/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var SilentError = require('silent-error'); // From ember-cli

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
// https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

const defaultOptions = {
  included: false
}

const includedFiles = ['codabar', 'code128', 'code39', 'ean-upc', 'itf-14', 'itf', 'msi', 'pharmacode'];

function generateFilePath(file) {
  if (file = 'all') {
    return 'JsBarcode.all.min.js';
  }
  if (!includedFiles.includes(file)) {
    throw new SilentError('ember-cli-barcode file option is not a valid JsBarcode option, `all` or `falsy`');
    return false;
  }
  return `barcodes/JsBarcode.${file}.min.js`;
}

function generateJSbarcodePaths(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }
  if (options.includes('all')) {
    return ['JsBarcode.all.min.js']
  }
  return options.map(file => {
    if (includedFiles.includes(file)) {
      return`barcodes/JsBarcode.${file}.min.js`
    }
  });
}

module.exports = {
  name: 'ember-cli-barcode',

  included() {
    this._super.included.apply(this, arguments);
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);
    let options = Object.assign(defaultOptions, app.options['ember-cli-barcode']);
    let file = generateFilePath(options['include']);
    this.import(`vendor/ember-cli-barcode/${file}`);
  },

  treeForVendor(vendorTree) {
    let paths = generateJSbarcodePaths(includedFiles);
    paths.push('JsBarcode.all.min.js');
    var barcodeTree = new Funnel(path.dirname(require.resolve('jsbarcode/dist/JsBarcode.all.min.js')), {
      destDir: 'ember-cli-barcode',
      files: paths
    });
    return new MergeTrees([vendorTree, barcodeTree]);
  }
};
