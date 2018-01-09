import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
/* debug: true */

moduleForComponent('bar-code', 'Integration | Component | bar code', {
  integration: true
});

test('it renders, but not displaye', function (assert) {
  assert.expect(1);

  // use if you need to pause during the test
  // const done = assert.async();
  // setTimeout(() => done(), 20000);

  this.set('code', "1234567");

  // will not dispaly - text value not set
  this.render(hbs`{{bar-code}}`);
  assert.equal(this.$('svg').attr('style'), undefined);

});

test('it renders a SVG barcode', function (assert) {
  assert.expect(1);
 
  this.set('code', "1234567");

  // will display - text value is set
  this.render(hbs`{{bar-code value=code}}`);
  assert.equal(this.$('svg').attr('style'), 'transform: translate(0,0)');

});

test('it renders a IMG barcode', function (assert) {
  assert.expect(1);

  this.set('code', "1234567");

  // render barcode as a image
  this.render(hbs`{{bar-code tagName="img" value=code}}`);
  assert.equal((this.$('img').prop('src')).substr(0, 10), 'data:image');

});

test('it renders a CANVAS barcode', function (assert) {
  assert.expect(1);

  this.set('code', "1234567");

  // render barcode as a canvas
  this.render(hbs`{{bar-code tagName="canvas" value=code}}`);
  assert.equal(this.$('canvas').length, 1)

});

test('it renders barcode with red backgound', function (assert) {
  assert.expect(1);

  this.set('code', "1234567");

  // change barcode background to red
  this.render(hbs`{{bar-code value=code background="red"}}`);
  assert.equal(this.$('rect').attr('style'), 'fill:red;');

});

test('it renders a blue colored barcode', function (assert) {
  assert.expect(1);

  this.set('code', "1234567");

  // change barcode color to blue
  this.render(hbs`{{bar-code value=code lineColor="blue"}}`);
  assert.equal(this.$('g').attr('style'), 'fill:blue;');

});

test('it renders with options, not options', function (assert) {
  assert.expect(1);

  this.set('code', "1234567");

  this.set('options', {
    format: "CODE39",
    textPosition: "top",
    lineColor: "#eeeeeee"
  })

  // render using options which overrides other options
  this.render(hbs`{{bar-code value=code options=options lineColor="green"}}`);
  assert.equal(this.$('g').attr('style'), 'fill:#eeeeeee;');

});

test('it sends the valid status to the action', function (assert) {
  assert.expect(1);

  this.set('checkValid', (status) => {
    assert.equal(status, true);
  });

  this.set('code', "1234567");

  this.render(hbs`{{bar-code value=code valid=(action checkValid)}}`);

});

test('it sends false for invalid invalid code', function (assert) {
  assert.expect(1);

  this.set('checkValid', (status) => {
    assert.equal(status, false);
  });

  this.set('code', "1234");

  this.render(hbs`{{bar-code value=code format="EAN8" valid=(action checkValid)}}`);

});
