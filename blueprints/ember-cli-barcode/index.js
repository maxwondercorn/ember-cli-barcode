/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall(/* options */) {
    return this.addBowerPackagesToProject([
      { name: 'JsBarcode', target: '3.8.0' }
    ]);
  }

};