import chroma from "chroma-js";

export interface ColorHues {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950': string;
}

export const paletteToArray = (palette: Partial<ColorHues>) => {
  return [
    {
      hueNumber: 50,
      hueHexa: palette['50'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 100,
      hueHexa: palette['100'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 200,
      hueHexa: palette['200'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 300,
      hueHexa: palette['300'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 400,
      hueHexa: palette['400'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 500,
      hueHexa: palette['500'] ?? '#000000',
      reverseHue: palette['950'] ?? '#ffffff'
    },
    {
      hueNumber: 600,
      hueHexa: palette['600'] ?? '#000000',
      reverseHue: palette['50'] ?? '#ffffff'
    },
    {
      hueNumber: 700,
      hueHexa: palette['700'] ?? '#000000',
      reverseHue: palette['50'] ?? '#ffffff'
    },
    {
      hueNumber: 800,
      hueHexa: palette['800'] ?? '#000000',
      reverseHue: palette['50'] ?? '#ffffff'
    },
    {
      hueNumber: 900,
      hueHexa: palette['900'] ?? '#000000',
      reverseHue: palette['50'] ?? '#ffffff'
    },
    {
      hueNumber: 950,
      hueHexa: palette['950'] ?? '#000000',
      reverseHue: palette['50'] ?? '#ffffff'
    },
  ]
}

export const generateTailwindPalette = (baseColor: string, force500: boolean) => {
  const steps = [0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
  const palette: any = {};

  const luminance = chroma(baseColor).hsl()[2];
  // find current huer for color
  let oldStep: number | undefined = undefined;
  let hueFound: number | undefined = undefined;

  const baseHSL = chroma(baseColor).hsl();

  if (force500) {
    return {
      '950': chroma.hsl(baseHSL[0], baseHSL[1], baseHSL[2] * 0.05).hex(),
      '900': chroma.hsl(baseHSL[0], baseHSL[1], baseHSL[2] * 0.2).hex(),
      '800': chroma.hsl(baseHSL[0], baseHSL[1], baseHSL[2] * 0.4).hex(),
      '700': chroma.hsl(baseHSL[0], baseHSL[1], baseHSL[2] * 0.6).hex(),
      '600': chroma.hsl(baseHSL[0], baseHSL[1], baseHSL[2] * 0.8).hex(),
      '500': chroma(baseColor).hex(),
      '400': chroma.hsl(baseHSL[0], baseHSL[1], (1 - baseHSL[2]) * 0.2 + baseHSL[2]).hex(),
      '300': chroma.hsl(baseHSL[0], baseHSL[1], (1 - baseHSL[2]) * 0.4 + baseHSL[2]).hex(),
      '200': chroma.hsl(baseHSL[0], baseHSL[1], (1 - baseHSL[2]) * 0.6 + baseHSL[2]).hex(),
      '100': chroma.hsl(baseHSL[0], baseHSL[1], (1 - baseHSL[2]) * 0.8 + baseHSL[2]).hex(),
      '50': chroma.hsl(baseHSL[0], baseHSL[1], (1 - baseHSL[2]) * 0.95 + baseHSL[2]).hex(),
    }
  } else {
    for (const step of steps) {
      if (hueFound === undefined) {
        if (oldStep === undefined) {
          if (luminance >= step) {
            hueFound = step;
          }
        } else if (oldStep > luminance && luminance >= step) {
          hueFound = oldStep + ((step - oldStep)/ 2) > luminance ? step : oldStep;
        }
      }
      oldStep = step;
    }
    if (hueFound === undefined) {
      hueFound = 0.05;
    }

    for (const step of steps) {
      if (step === hueFound) {
        palette[Math.round((1 - step) * 1000)] = baseColor;
      } else {
        palette[Math.round((1 - step) * 1000)] = chroma.hsl(baseHSL[0], baseHSL[1], step).hex();
      }
    }

    return palette;
  }

}
