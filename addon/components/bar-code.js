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
  envConfig: computed(function () {
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
    'envConfig',
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
      let env = this.envConfig;

      return {
        format: this.format || env.format || 'CODE128',
        mod43:  this.mod43 || env.mod43 || false, // only used with code39 barcodes
        width:  this.width || env.width || 2,
        height: this.height || env.height || 100,

        displayValue: isBlank(this.displayValue)
          ? isBlank(env.displayValue)
            ? true
            : env.displayValue
          : true,

        // prettier-ignore
        fontOptions:  this.fontOptions || env.fontOptions || '',
        font:         this.font || env.font || 'monospace',
        textAlign:    this.textAlign || env.textAlign || 'center',
        textPosition: this.textPosition || env.textPosition || 'bottom',
        textMargin:   this.textMargin || env.textMargin || 2,
        fontSize:     this.fontSize || env.fontSize || 20,
        background:   this.background || env.background || '#ffffff',
        lineColor:    this.lineColor || env.lineColor || '#000000',
        margin:       isBlank(this.margin) ? 10 : this.margin,

        marginTop: isBlank(this.marginTop)
          ? env.marginTop || undefined
          : this.marginTop,

        marginBottom: isBlank(this.marginBottom)
          ? env.marginBottom || undefined
          : this.marginBottom,

        marginLeft: isBlank(this.marginLeft)
          ? env.marginLeft || undefined
          : this.marginLeft,

        marginRight: isBlank(this.marginRight)
          ? env.marginRight || undefined
          : this.marginRight,

        flat: this.flat || env.flat || false,
        lastChar: this.lastChar || env.lastChar || ''
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

    let env = this.envConfig;

    // Can only set arria hidden in enviroment file.
    // If they want to hide aria, apply and exit
    if (env.ariaHidden) {
      this.element.setAttribute('aria-hidden', 'true');
      return;
    }

    let text = `${this.altText || env.altText || this.defaultText}`;

    // Exclude the value from the alt text?
    if (!env.excludeAltValue) text = `${text} ${this.value}`;

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
    if (env.setTitle) {
      // redundant on svg, but it doens't hurt
      this.element.setAttribute('title', text);
    }
  }
});
