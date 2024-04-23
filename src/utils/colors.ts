export const getRandomHex = (size = 6) =>
  [...Array(size)]
    .map(() =>
      Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase(),
    )
    .join('');

export const hexToHSL = (hex: string) => {
  const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex,
  ) as unknown) as [string, string, string, string];

  const [r, g, b] = result.slice(1).map((x) => parseInt(x, 16) / 255);

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  const perceivedLightness = r * 0.299 + g * 0.587 + b * 0.114;

  return { hue: h, saturation: s, lightness: l, perceivedLightness };
};

export type HexColor = `#${string}`;
