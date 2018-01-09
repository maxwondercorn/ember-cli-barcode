import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from '@ember/object';

/* global JsBarcode */

// used to pass this into callback
let self;

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
      margin:       this.get('margin') || 10,
      marginTop:    this.get('marginTop') || undefined,
      marginBottom: this.get('marginBottom') || undefined,
      marginLeft:   this.get('marginLeft') || undefined,
      marginRight:  this.get('marginRight') || undefined,
      flat:         this.get('flat') || false,
      lastChar:     this.get('lastChar') || ''
    }
  }),

  didInsertElement () {
    this.set('thisId', this.elementId);
  },

  didRender() {
    this._super(...arguments);

    self = this;

    // if options object is passed in, use it
    let options = this.get('options') || this.get('defaults');
  
    // set the call back on options
    options['valid'] = this.cb

    // now render the barcode
    JsBarcode(`#${this.get('thisId')}`, get(this, 'value'), options);
  },

  // call back function with valid status
  cb: function(status) {
    if (self.valid !== undefined)
      self.valid(status)
  },


});
