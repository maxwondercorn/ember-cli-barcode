import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

/* global JsBarcode */

export default Component.extend({
  tagName: 'svg',
  thisId: null,

  // jsbarcode options
  // https://github.com/lindell/JsBarcode/wiki/Options#format

  defaults: computed(function () {
    return {
      format:       this.get('format') || "CODE128",
      mod43:        this.get('mod43') || false,   // only used with code39 barcodes
      width:        this.get('width') || 2,
      height:       this.get('height') || 100,
      displayValue: this.get('displayValue') || true,
      fontOptions:  this.get('fontOptions') || "",
      font:         this.get('font') || "monospace",
      textAlign:    this.get('textAlign') || "center",
      textPosition: this.get('textPosition') || "bottom",
      textMargin:   this.get('textMargin') || 2,
      fontSize:     this.get('fontSize') || 20,
      background:   this.get('background') || "#ffffff",
      lineColor:    this.get('lineColor') || "#000000",
      margin:       isBlank(this.get('margin')) ? 10 : this.get('margin'),
      marginTop:    isBlank(this.get('marginTop')) ? undefined : this.get('marginTop'),
      marginBottom: isBlank(this.get('marginBottom')) ? undefined : this.get('marginBottom'),
      marginLeft:   isBlank(this.get('marginLeft')) ? undefined : this.get('marginLeft'),
      marginRight:  isBlank(this.get('marginRight')) ? undefined : this.get('marginRight'),
      flat:         this.get('flat') || false,
      lastChar:     this.get('lastChar') || ''
    }
  }),

  didInsertElement () {
    this.set('thisId', this.elementId);
  },

  didRender() {
    this._super(...arguments);

    // if options object is passed in, use it
    let options = this.get('options') || this.get('defaults');
  
    // set the call back on options
    options['valid'] = (status) => this.valid && this.valid(status);

    // now render the barcode
    JsBarcode(`#${this.get('thisId')}`, get(this, 'value'), options);
  },

});
