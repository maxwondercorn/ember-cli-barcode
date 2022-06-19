import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { getOwner } from '@ember/application';

module("Integration | Component | bar code", function(hooks) {
  setupRenderingTest(hooks);

  // Clear enviroment options.
  hooks.beforeEach(function () {
    const env = getOwner(this).resolveRegistration("config:environment");
    env["ember-cli-barcode"] = {};
  });

  test("it renders, but not displaye", async function(assert) {
    assert.expect(1);

    // use if you need to pause during the test
    // const done = assert.async();
    // setTimeout(() => done(), 20000);

    this.set("code", "1234567");

    // will not dispaly - text value not set
    await render(hbs`<BarCode />`);
    assert.equal(find("svg").getAttribute("style"), undefined);
  });

  test("it renders a SVG barcode", async function(assert) {
    assert.expect(3);

    this.set("code", "1234567");

    // will display - text value is set
    await render(hbs`<BarCode @value={{this.code}} />`);
    assert.equal(find("svg").getAttribute("style"), "transform: translate(0,0)");

    // verify the aria-labelledby attribute is set
    assert.equal(
      find("svg").getAttribute("aria-labelledby"),
      "title",
      "SVG title attribute is created"
    );

    const title = document.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'title')[0].textContent;

    // verify title element is set to correct text
    assert.equal(
      title,
      "Barcode value 1234567",
      "SVG title element has correct innerHTML"
    );
  });

  test("it renders a IMG barcode", async function(assert) {
    assert.expect(2);

    this.set("code", "1234567");

    // render barcode as a image
    await render(hbs`<BarCode @tagName="img" @value={{this.code}} />`);
    assert.equal(find("img").src.substr(0, 10), "data:image");

    // verify the alt attribute is set
    assert.equal(find("img").getAttribute("alt"), "Barcode value 1234567");
  });

  test("it renders a CANVAS barcode", async function(assert) {
    assert.expect(3);

    this.set("code", "1234567");

    // render barcode as a canvas
    await render(hbs`<BarCode @tagName="canvas" @value={{this.code}} />`);
    assert.equal(findAll("canvas").length, 1);

    // verify canvas attributes are set
    assert.equal(find("canvas").getAttribute("aria-label"), "Barcode value 1234567");
    assert.equal(find("canvas").getAttribute("role"), "img");
  });

  test("it renders barcode with red backgound", async function(assert) {
    assert.expect(1);

    this.set("code", "1234567");

    // change barcode background to red
    await render(hbs`<BarCode @value={{this.code}} @background="red" />`);
    assert.equal(find("rect").getAttribute("style"), "fill:red;");
  });

  test("it renders a blue colored barcode", async function(assert) {
    assert.expect(1);

    this.set("code", "1234567");

    // change barcode color to blue
    await render(hbs`<BarCode @value={{this.code}} @lineColor="blue" />`);
    assert.equal(find("g").getAttribute("style"), "fill:blue;");
  });

  test("it renders with options, not options", async function (assert) {
    assert.expect(1);
    this.set("code", "1234567");

    this.set("options", {
      format: "CODE39",
      textPosition: "top",
      lineColor: "#eeeeeee",
    });

    // render using options which overrides other options
    await render(
      hbs`<BarCode @value={{this.code}} @options={{this.options}} @lineColor="green" />`
    );
    assert.equal(find("g").getAttribute("style"), "fill:#eeeeeee;");
  });

  test("it uses the corect options, defaults", async function (assert) {
    assert.expect(21);

    // Action called with barcode options.
    this.getBarcode = async (barcode) => {

      assert.equal(barcode._encodings[0][0].text, '1234', 'text value is corrects');
      const enc = barcode._encodings[0][0].options;

      assert.equal(enc.background, '#ffffff', 'background is correct');
      assert.equal(enc.displayValue, true, 'displayValue is correct');
      assert.equal(enc.flat, false, 'flat is correct');
      assert.equal(enc.font, 'monospace', 'font is correct');
      assert.equal(enc.fontOptions, '', 'fontOptions is correct');
      assert.equal(enc.fontSize, 20, 'fontSize is correct');
      assert.equal(enc.format, 'CODE128', 'format is correct');
      assert.equal(enc.height, 100, 'height is correct');
      assert.equal(enc.lastChar, '', 'lastChar is correct');
      assert.equal(enc.lineColor, '#000000', 'lineColor is correct');
      assert.equal(enc.margin, 10, 'margin is correct');
      assert.equal(enc.marginBottom, 10, 'marginBottom is correct');
      assert.equal(enc.marginLeft, 10, 'marginLeft is correct');
      assert.equal(enc.marginRight, 10, 'marginRight is correct');
      assert.equal(enc.marginTop, 10), 'marginTop is correct';
      assert.equal(enc.mod43, false, 'mod43 is correct');
      assert.equal(enc.text, undefined, 'text is correct');
      assert.equal(enc.textAlign, 'center', 'textAlign is correct');
      assert.equal(enc.textMargin, 2, 'textMargin is correct');
      assert.equal(enc.textPosition, 'bottom', 'textPosition is correct');
    };

    // Render with default options.
    await render(
      hbs`<BarCode @value="1234" @jsbarcode={{this.getBarcode}} />`
    );
  });

  test("it sends the valid status to the action", async function(assert) {
    assert.expect(1);

    this.set("checkValid", status => {
      assert.equal(status, true);
    });

    this.set("code", "1234567");

    await render(hbs`<BarCode @value={{this.code}} @valid={{this.checkValid}} />`);
  });

  test("it sends false for invalid invalid code", async function(assert) {
    assert.expect(1);

    this.set("checkValid", status => {
      assert.equal(status, false);
    });

    this.set("code", "1234");

    await render(hbs`<BarCode @value={{this.code}} @format="EAN8" @valid={{this.checkValid}} />`);
  });
});
