import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  format: "CODE128",
  width: 2,
  height: 100,
  displayValue: true,
  fontSize: 20,
  fontOption: null,
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  background: '#ffffff',
  lineColor: "#000000",
  validCode: false,
  testValue: "96385074",

  version: "0.3.3",

  demoOptions: computed('format', 'width', 'height', 'displayValue','fontSize','fontOption',
              'font', 'textAlign', 'textPosition', 'background', 'lineColor',
  function () {
    return {
      format:       this.get('format') || "CODE128",
      width:        this.get('width') || 2,
      height:       this.get('height') || 100,
      displayValue: this.get('displayValue') || true,
      fontSize:     this.get('fontSize') || 20,
      fontOptions:  this.get('fontOption') || "",
      font:         this.get('font') || "monospace",
      textAlign:    this.get('textAlign') || "center",
      textPosition: this.get('textPosition') || "bottom",
      background:   this.get('background') || "#ffffff",
      lineColor:    this.get('lineColor') || "#000000",
    }
  }),

  currentValue: computed('format', function () {
    let self = this;

    return this.get('formats').find(function (item) {
      if (item.value === self.get('format')) {
        return item.code
      }
    }).code
  }),

  formats: computed(function () {
    return [
      { value: "CODE128", code: "123456", selected: true },
      { value: "EAN13", code: "5901234123457" },
      { value: "UPC", code: "123456789999" },
      { value: "EAN8", code: "96385074" },
      { value: "EAN5", code: "54495" },
      { value: "EAN2", code: "53" },
      { value: "CODE39", code: "CODE39" },
      { value: "ITF14", code: "12345678901231" },
      { value: "MSI", code: "1234" },
      { value: "MSI10", code: "1234" },
      { value: "MSI11", code: "1234" },
      { value: "MSI1010", code: "1234" },
      { value: "MSI1110", code: "1234" },
      { value: "pharmacode", code: "1234" },
      { value: "codabar", code: "1234567890" }
    ]
  }),

  widths: computed(function () {
    return [
      { value: "1" },
      { value: "2", selected: true },
      { value: "3" }
    ]
  }),

  heights: computed(function () {
    return [
      { value: "50"},
      { value: "100", selected: true },
      { value: "200" }
    ]
  }),

  dispalyValues: computed(function () {
    return [
      { value: true, selected: true },
      { value: false }
    ]
  }),

  fontSizes: computed(function () {
    return [
      { value: "5" },
      { value: "10" },
      { value: "15" },
      { value: "20", selected: true },
      { value: "25" },
      { value: "30" }
    ]
  }),

  fontOptions: computed(function () {
    return [
      { value: "", selected: true },
      { value: "italic" },
      { value: "bold" },
      { value: "oblique" },
      { value: "bold, italic" }
    ]
  }),

  fonts: computed(function () {
    return [
      { value: "monospace", selected: true },
      { value: "Arial" },
      { value: "Arial Narrow" },
      { value: "Helvetica" },
      { value: "Times New Roman" },
      { value: "Times" },
      { value: "Courier New" },
      { value: "Courier" },
      { value: "Verdana" },
      { value: "Georgia" },
      { value: "Comic Sans MS" }
    ]
  }),

  alignOptions: computed(function () {
    return [
      { value: "center", selected: true },
      { value: "left" },
      { value: "right" }
    ]
  }),

  positions: computed(function () {
    return [
      { value: "bottom", selected: true },
      { value: "top" }
    ]
  }),


  actions: {
      checkValid (status) {
        this.set('validCode', status)
      },
  }


});