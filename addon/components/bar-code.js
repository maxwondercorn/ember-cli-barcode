import Component from "@ember/component";
import { get } from "@ember/object";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { getOwner } from "@ember/application";

/* global JsBarcode */

export default Component.extend({
  tagName: "svg",
  thisId: null,
  altText: "barcode value",
  svgns: "http://www.w3.org/2000/svg",

  // get config from enviroment.js
  // https://stackoverflow.com/questions/42002664/accessing-ember-environment-config-env-from-addon
  config: computed(function() {
    return (
      getOwner(this).resolveRegistration("config:environment").barcode || {}
    );
  }),

  // jsbarcode options
  // https://github.com/lindell/JsBarcode/wiki/Options#format

  defaults: computed(function() {
    let c = this.get("config");

    return {
      format: this.get("format") || c.format || "CODE128",
      mod43: this.get("mod43") || c.mod43 || false, // only used with code39 barcodes
      width: this.get("width") || c.width || 2,
      height: this.get("height") || c.height || 100,

      displayValue: isBlank(this.get("displayValue"))
        ? isBlank(c.displayValue)
          ? true
          : c.displayValue
        : true,

      fontOptions: this.get("fontOptions") || c.fontOptions || "",
      font: this.get("font") || c.font || "monospace",
      textAlign: this.get("textAlign") || c.textAlign || "center",
      textPosition: this.get("textPosition") || c.textPosition || "bottom",
      textMargin: this.get("textMargin") || c.textMargin || 2,
      fontSize: this.get("fontSize") || c.fontSize || 20,
      background: this.get("background") || c.background || "#ffffff",
      lineColor: this.get("lineColor") || c.lineColor || "#000000",
      margin: isBlank(this.get("margin")) ? 10 : this.get("margin"),

      marginTop: isBlank(this.get("marginTop"))
        ? c.marginTop || undefined
        : this.get("marginTop"),

      marginBottom: isBlank(this.get("marginBottom"))
        ? c.marginBottom || undefined
        : this.get("marginBottom"),

      marginLeft: isBlank(this.get("marginLeft"))
        ? c.marginLeft || undefined
        : this.get("marginLeft"),

      marginRight: isBlank(this.get("marginRight"))
        ? c.marginRight || undefined
        : this.get("marginRight"),

      flat: this.get("flat") || c.flat || false,
      lastChar: this.get("lastChar") || c.lastChar || ""
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

    let text = `${this.get("config").altText || this.get("altText")} ${this.get(
      "value"
    )}`;

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
  }
});
