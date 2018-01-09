/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-barcode',

  included(app) {
    this._super.included.apply(this, arguments);
    app.import(app.bowerDirectory + '/JsBarcode/dist/JsBarcode.all.js');
  },

  isDevelopingAddon() {
    return true;
  }
};