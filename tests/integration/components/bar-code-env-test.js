import { render } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { getOwner } from "@ember/application";

module("Integration | Component | bar code", function (hooks) {
  setupRenderingTest(hooks);

  // Setup enviroment optons.
  hooks.beforeEach(function () {
    const options = {
      format: "CODE39",
      mod43: false,
      width: 3,
      height: 200,
      displayValue: false,
      fontOptions: "",
      font: "Arial",
      textAlign: "left",
      textPosition: "top",
      textMargin: 11,
      fontSize: 90,
      background: "#ffffee",
      lineColor: "#333",
      margin: 10,
      marginTop: 20,
      marginBottom: 30,
      marginLeft: 5,
      marginRight: 13,
      flat: false,
      lastChar: "Q",
    };

    const env = getOwner(this).resolveRegistration("config:environment");
    env["ember-cli-barcode"] = options;
  });

  test("it uses the corect options, enviroment", async function (assert) {
    assert.expect(21);

    // Action called with barcode options.
    this.getBarcode = async (barcode) => {
      assert.equal(
        barcode._encodings[0][0].text,
        "1234",
        "text value is corrects"
      );
      const enc = barcode._encodings[0][0].options;

      assert.equal(enc.background, "#ffffee", "background is correct");
      assert.equal(enc.displayValue, false, "displayValue is correct");
      assert.equal(enc.flat, false, "flat is correct");
      assert.equal(enc.font, "Arial", "font is correct");
      assert.equal(enc.fontOptions, "", "fontOptions is correct");
      assert.equal(enc.fontSize, 90, "fontSize is correct");
      assert.equal(enc.format, "CODE39", "format is correct");
      assert.equal(enc.height, 200, "height is correct");
      assert.equal(enc.lastChar, "Q", "lastChar is correct");
      assert.equal(enc.lineColor, "#333", "lineColor is correct");
      assert.equal(enc.margin, 10, "margin is correct");
      assert.equal(enc.marginBottom, 30, "marginBottom is correct");
      assert.equal(enc.marginLeft, 5, "marginLeft is correct");
      assert.equal(enc.marginRight, 13, "marginRight is correct");
      assert.equal(enc.marginTop, 20), "marginTop is correct";
      assert.equal(enc.mod43, false, "mod43 is correct");
      assert.equal(enc.text, undefined, "text is correct");
      assert.equal(enc.textAlign, "left", "textAlign is correct");
      assert.equal(enc.textMargin, 11, "textMargin is correct");
      assert.equal(enc.textPosition, "top", "textPosition is correct");
    };

    // Render with default options.
    await render(hbs`<BarCode @value="1234" @jsbarcode={{this.getBarcode}} />`);
  });
});
