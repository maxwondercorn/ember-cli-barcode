import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import config from '../config/environment';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  appVersion = config.APP.appVersion;

  @tracked format = 'CODE128';
  @tracked width = 2;
  @tracked height = 100;
  @tracked displayValue = true;
  @tracked fontSize = 20;
  @tracked fontOption = null;
  @tracked font = 'monospace';
  @tracked textAlign = 'center';
  @tracked textPosition = 'bottom';
  @tracked background = '#ffffff';
  @tracked lineColor = '#000000';
  @tracked validCode = false;
  @tracked testValue = '96385074';

  formats = [
    { value: 'CODE128', code: '123456', selected: true },
    { value: 'EAN13', code: '5901234123457' },
    { value: 'UPC', code: '123456789999' },
    { value: 'EAN8', code: '96385074' },
    { value: 'EAN5', code: '54495' },
    { value: 'EAN2', code: '53' },
    { value: 'CODE39', code: 'CODE39' },
    { value: 'ITF14', code: '12345678901231' },
    { value: 'MSI', code: '1234' },
    { value: 'MSI10', code: '1234' },
    { value: 'MSI11', code: '1234' },
    { value: 'MSI1010', code: '1234' },
    { value: 'MSI1110', code: '1234' },
    { value: 'pharmacode', code: '1234' },
    { value: 'codabar', code: '1234567890' }
  ];

  widths = [{ value: '1' }, { value: '2', selected: true }, { value: '3' }];

  heights = [
    { value: '50' },
    { value: '100', selected: true },
    { value: '200' }
  ];

  dispalyValues = [{ value: true, selected: true }, { value: false }];

  fontSizes = [
    { value: '5' },
    { value: '10' },
    { value: '15' },
    { value: '20', selected: true },
    { value: '25' },
    { value: '30' }
  ];

  fontOptions = [
    { value: '', selected: true },
    { value: 'italic' },
    { value: 'bold' },
    { value: 'oblique' },
    { value: 'bold, italic' }
  ];

  fonts = [
    { value: 'monospace', selected: true },
    { value: 'Arial' },
    { value: 'Arial Narrow' },
    { value: 'Helvetica' },
    { value: 'Times New Roman' },
    { value: 'Times' },
    { value: 'Courier New' },
    { value: 'Courier' },
    { value: 'Verdana' },
    { value: 'Georgia' },
    { value: 'Comic Sans MS' }
  ];

  alignOptions = [
    { value: 'center', selected: true },
    { value: 'left' },
    { value: 'right' }
  ];

  positions = [{ value: 'bottom', selected: true }, { value: 'top' }];

  // eslint-disable-next-line ember/require-computed-property-dependencies
  @computed('format')
  get currentValue() {
    let self = this;

    return this.formats.find(function (item) {
      if (item.value === self.get('format')) {
        return item.code;
      }
    }).code;
  }

  @computed(
    'format',
    'width',
    'height',
    'displayValue',
    'fontSize',
    'fontOption',
    'font',
    'textAlign',
    'textPosition',
    'background',
    'lineColor'
  )
  get demoOptions() {
    return {
      format: this.format || 'CODE128',
      width: this.width || 2,
      height: this.height || 100,
      displayValue: this.displayValue || true,
      fontSize: this.fontSize || 20,
      fontOptions: this.fontOption || '',
      font: this.font || 'monospace',
      textAlign: this.textAlign || 'center',
      textPosition: this.textPosition || 'bottom',
      background: this.background || '#ffffff',
      lineColor: this.lineColor || '#000000'
    };
  }

  @action
  checkValid(status) {
    this.set('validCode', status);
  }

  @action
  updateValue(label, event) {
    const value = event.target.value;

    switch (label) {
      case 'Format':
        this.format = value;
        break;

      case 'Width':
        this.width = value;
        break;

      case 'Height':
        this.height = value;
        break;

      case 'Value':
        this.displayValue = value;
        break;

      case 'Font Size':
        this.fontSize = value;
        break;

      case 'Font Opt':
        this.fontOption = value;
        break;

      case 'Font':
        this.font = value;
        break;

      case 'Align':
        this.textAlign = value;
        break;

      case 'Position':
        this.textPosition = value;
        break;
    }
  }
}
