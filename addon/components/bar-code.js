import Component from "@ember/component";
import { get } from "@ember/object";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { getOwner } from "@ember/application";

/* global JsBarcode */

export default Component.extend({
  tagName: "svg",
  thisId: null,
  defaultText: "Barcode value",
  altText: null,
  excludeAltValue: false,
  svgns: "http://www.w3.org/2000/svg",

  // get config from enviroment.js
  // https://stackoverflow.com/questions/42002664/accessing-ember-environment-config-env-from-addon
  cfg: computed(function() {
    return (
      getOwner(this).resolveRegistration("config:environment")[
        "ember-cli-barcode"
      ] || {}
    );
  }),

  // jsbarcode options
  // https://github.com/lindell/JsBarcode/wiki/Options#format

  defaults: computed(function() {
    let cfg = this.get("cfg");

    return {
      format: this.get("format") || cfg.format || "CODE128",
      mod43: this.get("mod43") || cfg.mod43 || false, // only used with code39 barcodes
      width: this.get("width") || cfg.width || 2,
      height: this.get("height") || cfg.height || 100,

      displayValue: isBlank(this.get("displayValue"))
        ? isBlank(cfg.displayValue)
          ? true
          : cfg.displayValue
        : true,

      fontOptions: this.get("fontOptions") || cfg.fontOptions || "",
      font: this.get("font") || cfg.font || "monospace",
      textAlign: this.get("textAlign") || cfg.textAlign || "center",
      textPosition: this.get("textPosition") || cfg.textPosition || "bottom",
      textMargin: this.get("textMargin") || cfg.textMargin || 2,
      fontSize: this.get("fontSize") || cfg.fontSize || 20,
      background: this.get("background") || cfg.background || "#ffffff",
      lineColor: this.get("lineColor") || cfg.lineColor || "#000000",
      margin: isBlank(this.get("margin")) ? 10 : this.get("margin"),

      marginTop: isBlank(this.get("marginTop"))
        ? cfg.marginTop || undefined
        : this.get("marginTop"),

      marginBottom: isBlank(this.get("marginBottom"))
        ? cfg.marginBottom || undefined
        : this.get("marginBottom"),

      marginLeft: isBlank(this.get("marginLeft"))
        ? cfg.marginLeft || undefined
        : this.get("marginLeft"),

      marginRight: isBlank(this.get("marginRight"))
        ? cfg.marginRight || undefined
        : this.get("marginRight"),

      flat: this.get("flat") || cfg.flat || false,
      lastChar: this.get("lastChar") || cfg.lastChar || ""
    };
  }),

  didInsertElement() {
    this.set("thisId", this.elementId);
  },

  didRender() {
    this._super(...arguments);
    let title;

    // if options object is passed in, use it
    let options = this.get("options") || this.get("defaults");

    // set the call back on options
    options["valid"] = status => this.valid && this.valid(status);

    // now render the barcode
    JsBarcode(`#${this.get("thisId")}`, get(this, "value"), options);

    // add accessability to barcode
    // do after render because svg is cleared by jsbarcode
    // https://medium.com/statuscode/getting-started-with-website-accessibility-5586c7febc92

    let cfg = this.get("cfg");

    // if they want to hide them, apply and exit
    if (cfg.ariaHidden) {
      this.element.setAttribute("aria-hidden", "true");
      return;
    }

    let text = `${this.get("altText") ||
      cfg.altText ||
      this.get("defaultText")}`;

    // exclude the value from the alt text?
    if (!cfg.excludeAltValue) text = `${text} ${this.get("value")}`;

    switch (this.element.nodeName) {
      // add alt text attribute
      // http://a11y-style-guide.com/style-guide/section-media.html#kssref-media-images
      case "IMG":
        this.element.setAttribute("alt", text);
        break;

      // add title and aria-labelledby attritubte
      // http://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs
      case "svg":
        this.element.setAttribute("aria-labelledby", "title");
        title = document.createElementNS(this.get("svgns"), "title");
        title.innerHTML = text;
        this.element.appendChild(title);
        break;

      // what do you do to canvas?
      // https://www.w3.org/Talks/2014/0510-canvas-a11y/#1
      // http://pauljadam.com/demos/canvas.html
      case "CANVAS":
        this.element.setAttribute("role", "img");
        this.element.setAttribute("aria-label", text);
        break;
    }
    if (cfg.setTitle) {
      // redundant on svg, but it doens't hurt
      this.element.setAttribute("title", text);
    }
  }
});
