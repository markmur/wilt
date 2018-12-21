import Vibrant from 'node-vibrant';

export function getPrimaryColor(url, cb = () => {}) {

  Vibrant.from(url).getPalette((err, palette) => {
    if (err) return;

    if (palette.Vibrant && palette.Vibrant.rgb) {
      cb(`rgb(${palette.Vibrant.rgb.join(',')})`);
    }
  });
}
