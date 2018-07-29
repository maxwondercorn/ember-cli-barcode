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

function containsMatchingFile(name) {
  return includedFiles.includes(name);
}

function processOptions(options) {
  let {included} = options;
  let all = ['all']
  // Check against passed options parameters so that the build doesn't blow up
  if (included) {
    if (included === 'all') {
      return all;
    }
    if (!Array.isArray(included)) {
      throw new SilentError('ember-cli-barcode `options` property is not an array, `all` or falsy');
      // return all;
    }
    if (included.length === includedFiles.length && included.every(containsMatchingFile)) {
      // console.log('bad match');
      return all;
    }
    return included.map(f => {
      if (containsMatchingFile(f)) {
        return f;
      }
    });

  }
  return all;
}

function generateJSbarcodePaths(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }
  if (options.includes('all')) {
    return ['JsBarcode.all.min.js']
  }
  return options.map(opt => {
    if (containsMatchingFile(opt)) {
      return `barcodes/JsBarcode.${opt}.min.js`;
    }
  });
}

function generateFiles(options) {
  let included = processOptions(options);
  return generateJSbarcodePaths(included);
}

module.exports = {
  name: 'ember-cli-barcode',

  included() {
    this._super.included.apply(this, arguments);
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);
    let options = Object.assign(defaultOptions, app.options['ember-cli-barcode']);
    let filesToInclude = generateFiles(options);
    filesToInclude.forEach(file => {
      this.import(`vendor/ember-cli-barcode/${file}`);
    });
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
