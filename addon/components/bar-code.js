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
  barcode: null,
  defaults: {},

  // get config from enviroment.js
  // https://stackoverflow.com/questions/42002664/accessing-ember-environment-config-env-from-addon
  envConfig: computed(function () {
    return (
      getOwner(this).resolveRegistration('config:environment')[
        'ember-cli-barcode'
      ] || {}
    );
  }),

  init() {
    this._super(...arguments);
    let def = {};
    let env = this.envConfig;

    def.format = this.format || env.format || 'CODE128';
    def.mod43 = this.mod43 || env.mod43 || false; // only used with code39 barcodes
    def.width = this.width || env.width || 2;
    def.height = this.height || env.height || 100;

    def.displayValue = isBlank(this.displayValue)
      ? isBlank(env.displayValue)
        ? true
        : env.displayValue
      : true;

    // prettier-ignore
    def.fontOptions =   this.fontOptions || env.fontOptions || '';
    def.font = this.font || env.font || 'monospace';
    def.textAlign = this.textAlign || env.textAlign || 'center';
    def.textPosition = this.textPosition || env.textPosition || 'bottom';
    def.textMargin = this.textMargin || env.textMargin || 2;
    def.fontSize = this.fontSize || env.fontSize || 20;
    def.background = this.background || env.background || '#ffffff';
    def.lineColor = this.lineColor || env.lineColor || '#000000';
    def.margin = this.margin ?? 10;

    def.marginTop = isBlank(this.marginTop)
      ? env.marginTop || undefined
      : this.marginTop;

    def.marginBottom = isBlank(this.marginBottom)
      ? env.marginBottom || undefined
      : this.marginBottom;

    def.marginLeft = isBlank(this.marginLeft)
      ? env.marginLeft || undefined
      : this.marginLeft;

    def.marginRight = isBlank(this.marginRight)
      ? env.marginRight || undefined
      : this.marginRight;

    def.flat = this.flat || env.flat || false;
    def.lastChar = this.lastChar || env.lastChar || '';

    this.defaults = def;
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('thisId', this.elementId);
  },

  didRender() {
    this._super(...arguments);
    let title;

    // if options object is passed in, use it
    let options = this.options || this.defaults;

    // Set the JsBarcode status option callback.
    options['valid'] = (status) => this.valid && this.valid(status);

    // Render the barcode.
    this.barcode = JsBarcode(`#${this.thisId}`, this.value, options);

    // Private API for testing!
    // provide barcode obj - args is proxy, no optional chaining
    if (this.jsbarcode) this.jsbarcode(this.barcode);

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

    // Private api for testing.
    options['_defaultsTest'] = () => {
      this.defaults;
    };
  },
});
