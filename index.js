/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-barcode',

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/JsBarcode.all.js')
  },

  treeForVendor(vendorTree) {
    var barcodeTree = new Funnel(path.dirname(require.resolve('jsbarcode/dist/JsBarcode.all.js')), {
      files: ['JsBarcode.all.js']
    });

    return new MergeTrees([vendorTree, barcodeTree]);
  }
};
