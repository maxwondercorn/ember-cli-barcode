import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DownloadController extends Controller {

  @tracked barcodeType = 'jpeg';

  @action
  download(fileType) {
    const canv = document.getElementsByTagName('canvas')[0];
    const png = canv.toDataURL('image/png');
    const jpeg = canv.toDataURL('image/jpeg');

    // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    const svg = document.getElementsByTagName('svg')[0].outerHTML;
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');

    switch (fileType) {
      case 'PNG':
        link.href = png;
      case 'JPEG':
        link.href = jpeg;
      case 'SVG':
        link.href = svgUrl;
    }

    link.download = `barcode.${type}`;
    link.click();

    // Cleanup
    URL.revokeObjectURL(svgUrl);
  }

  @action
  updateType(label, event) {
    const value = event.target.value;

    this.barcodeType = value;
    // debugger
  }
}
