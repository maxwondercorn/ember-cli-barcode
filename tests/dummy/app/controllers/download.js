import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DownloadController extends Controller {
  @tracked ftype;

  types = [
    { value: 'jpeg' },
    { value: 'png' },
    { value: 'svg', selected: true },
    { value: 'webp (Chrome only)' },
  ];

  @action
  download(fileType) {
    let isSvg = false;
    let svgUrl;

    const canv = document.getElementsByTagName('canvas')[0];
    const a = document.createElement('a');

    switch (fileType) {
      case 'jpeg':
        const jpeg = canv.toDataURL('image/jpeg', 1);
        a.href = jpeg;
        a.download = 'image.jpeg';
        break;

      case 'png':
        const png = canv.toDataURL('image/png');
        a.href = png;
        a.download = 'image.png';
        break;

      case 'webp (Chrome only)':
        const webp = canv.toDataURL('image/webp', 1);
        a.href = webp;
        a.download = `image.webp`;
        break;

      // Default to SVG format
      default:
        // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
        const svg = document.getElementsByTagName('svg')[0].outerHTML;
        const svgBlob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8',});
        svgUrl = URL.createObjectURL(svgBlob);
        isSvg = true;

        a.href = svgUrl;
        a.download = 'image.svg';
    }

    a.click();
    a.remove();

    if (isSvg) URL.revokeObjectURL(svgUrl);
  }

  @action
  setFileType(label, event) {
    const type = event.target.value;
    this.ftype = type;
  }
}
