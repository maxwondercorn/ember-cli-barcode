// disable lint rules to pass linting
/* eslint-disable ember/no-component-lifecycle-hooks */
/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/no-classic-classes */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { getOwner } from '@ember/application';

/* global JsBarcode */

export default Component.extend({
  // eslint-disable-next-line ember/require-tagless-components
  tagName: 'svg',
  thisId: null,
  defaultText: 'Barcode value',
  altText: null,
  excludeAltValue: false,
  svgns: 'http://www.w3.org/2000/svg',

  // get config from enviroment.js
  // https://stackoverflow.com/questions/42002664/accessing-ember-environment-config-env-from-addon
  config: computed(function () {
    return (
      getOwner(this).resolveRegistration('config:environment')[
        'ember-cli-barcode'
      ] || {}
    );
  }),

  // jsbarcode options
  // https://github.com/lindell/JsBarcode/wiki/Options#format

  defaults: computed(
    'background',
    'config',
    'displayValue',
    'flat',
    'font',
    'fontOptions',
    'fontSize',
    'format',
    'height',
    'lastChar',
    'lineColor',
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'mod43',
    'textAlign',
    'textMargin',
    'textPosition',
    'width',
    
    function () {
      let cfg = this.config;

      return {
        format: this.format || cfg.format || 'CODE128',
        mod43:  this.mod43 || cfg.mod43 || false, // only used with code39 barcodes
        width:  this.width || cfg.width || 2,
        height: this.height || cfg.height || 100,

        displayValue: isBlank(this.displayValue)
          ? isBlank(cfg.displayValue)
            ? true
            : cfg.displayValue
          : true,

        // prettier-ignore
        fontOptions:  this.fontOptions || cfg.fontOptions || '',
        font:         this.font || cfg.font || 'monospace',
        textAlign:    this.textAlign || cfg.textAlign || 'center',
        textPosition: this.textPosition || cfg.textPosition || 'bottom',
        textMargin:   this.textMargin || cfg.textMargin || 2,
        fontSize:     this.fontSize || cfg.fontSize || 20,
        background:   this.background || cfg.background || '#ffffff',
        lineColor:    this.lineColor || cfg.lineColor || '#000000',
        margin:       isBlank(this.margin) ? 10 : this.margin,

        marginTop: isBlank(this.marginTop)
          ? cfg.marginTop || undefined
          : this.marginTop,

        marginBottom: isBlank(this.marginBottom)
          ? cfg.marginBottom || undefined
          : this.marginBottom,

        marginLeft: isBlank(this.marginLeft)
          ? cfg.marginLeft || undefined
          : this.marginLeft,

        marginRight: isBlank(this.marginRight)
          ? cfg.marginRight || undefined
          : this.marginRight,

        flat: this.flat || cfg.flat || false,
        lastChar: this.lastChar || cfg.lastChar || ''
      };
    }
  ),

  didInsertElement() {
    this._super(...arguments);
    this.set('thisId', this.elementId);
  },

  didRender() {
    this._super(...arguments);
    let title;

    // if options object is passed in, use it
    let options = this.options || this.defaults;

    // set the call back on options
    options['valid'] = (status) => this.valid && this.valid(status);

    // now render the barcode
    JsBarcode(`#${this.thisId}`, this.value, options);

    // add accessability to barcode
    // do after render because svg is cleared by jsbarcode
    // https://medium.com/statuscode/getting-started-with-website-accessibility-5586c7febc92

    let cfg = this.config;

    // if they want to hide them, apply and exit
    if (cfg.ariaHidden) {
      this.element.setAttribute('aria-hidden', 'true');
      return;
    }

    let text = `${this.altText || cfg.altText || this.defaultText}`;

    // exclude the value from the alt text?
    if (!cfg.excludeAltValue) text = `${text} ${this.value}`;

    switch (this.element.nodeName) {
      // add alt text attribute
      // http://a11y-style-guide.com/style-guide/section-media.html#kssref-media-images
      case 'IMG':
        this.element.setAttribute('alt', text);
        break;

      // add title and aria-labelledby attritubte
      // http://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs
      case 'svg':
        this.element.setAttribute('aria-labelledby', 'title');
        title = document.createElementNS(this.svgns, 'title');
        title.innerHTML = text;
        this.element.appendChild(title);
        break;

      // what do you do to canvas?
      // https://www.w3.org/Talks/2014/0510-canvas-a11y/#1
      // http://pauljadam.com/demos/canvas.html
      case 'CANVAS':
        this.element.setAttribute('role', 'img');
        this.element.setAttribute('aria-label', text);
        break;
    }
    if (cfg.setTitle) {
      // redundant on svg, but it doens't hurt
      this.element.setAttribute('title', text);
    }
  }
});
