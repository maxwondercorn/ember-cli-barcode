import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DownloadController extends Controller {
  @tracked ftype;

  types = [
    { value: 'jpeg' },
    { value: 'png' },
    { value: 'webp (Chrome only)' },
    { value: 'svg', selected: true },
  ];

  save2() {
    window.open(canvas.toDataURL('image/png'));
    var gh = canvas.toDataURL('png');

    var a = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';

    a.click();
    a.remove();
  }

  @action
  download(fileType) {
    const canv = document.getElementsByTagName('canvas')[0];
    const png = canv.toDataURL('image/png');
    const jpeg = canv.toDataURL('image/jpeg', 1);
    const webp = canv.toDataURL('image/webp', 1);

    // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    const svg = document.getElementsByTagName('svg')[0].outerHTML;
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');

    // Default to SVG format,
    a.href = svgUrl;
    a.download = 'image.svg';

    // Determine file type, set href and download name...

    if (fileType == 'jpeg') {
      a.href = jpeg;
      a.download = `image.${fileType}`;
    }

    if (fileType == 'png') {
      a.href = png;
      a.download = `image.${fileType}`;
    }

    if (fileType == 'webp (Chrome only)') {
      a.href = webp;
      a.download = `image.webp`;
    }

    a.click();
    a.remove();

    URL.revokeObjectURL(svgUrl);
  }

  @action
  setFileType(label, event) {
    const type = event.target.value;
    this.ftype = type;
  }
}
