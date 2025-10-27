import { addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb } from '@dylanjs/utils';
import { defu } from 'defu';

import { DARK_CLASS } from '@/constants/app';
import { overrideThemeSettings, themeSettings } from '@/theme/settings';
import { themeVars } from '@/theme/vars';
import { localStg } from '@/utils/storage';

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`;
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>;
interface NaiveColorAction {
  scene: NaiveColorScene;
  handler: (color: string) => string;
}

export function initThemeSettings() {
  const isProd = import.meta.env.PROD;
  if (!isProd) {
    return themeSettings;
  }
  const localSettings = localStg.get('themeSettings');
  let settings = defu(localSettings, themeSettings);
  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME;
  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings);
    localStg.set('overrideThemeFlag', BUILD_TIME);
  }
  return settings;
}

/**
 * 获取naive主题
 * @param colors 主题颜色
 * @param recommended 使用推荐色 默认为false
 * @returns
 */
export function getNaiveTheme(colors: App.Theme.ThemeColor, recommended = false) {
  const { primary: colorLoading } = colors;
  const theme = {
    common: {
      ...getNaiveThemeColors(colors, recommended),
    },
    LoadingBar: {
      colorLoading,
    },
    Tag: {
      borderRadius: '6px',
    },
  };
  return theme;
}

function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    {
      scene: 'Hover',
      handler: (color) => getPaletteColorByNumber(color, 500, recommended),
    },
    {
      scene: 'Pressed',
      handler: (color) => getPaletteColorByNumber(color, 700, recommended),
    },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) },
  ];

  const themeColors: NaiveThemeColor = {};
  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][];

  colorEntries.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color;
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`;
      themeColors[colorKey] = action.handler(colorValue);
    });
  });

  return themeColors;
}

/**
 * 根据令牌获取css变量
 * @param tokens 令牌
 * @returns
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgb(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * 将主题变量添加到全局
 * @param tokens 主题变量
 * @param darkTokens 暗色主题变量
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
    :root {
      ${cssVarStr}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}

/**
 * 创建主题调色板颜色
 *
 * @param colors 主题颜色
 * @param [recommended=false] 使用推荐颜色。默认为 `false`
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach((key) => {
    const colorMap = getColorPalette(colors[key], recommended);

    colorPaletteVar[key] = colorMap.get(500)!;

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}

/**
 * 根据主题设置创建主题令牌 CSS 变量值
 *
 * @param colors 主题颜色
 * @param tokens 主题设置令牌
 * @param [recommended=false] 使用推荐颜色。默认为 `false`
 */
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false,
) {
  const paletteColors = createThemePaletteColors(colors, recommended);

  const { light, dark } = tokens || themeSettings.tokens;

  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors,
    },
    boxShadow: {
      ...light.boxShadow,
    },
  };

  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors,
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow,
    },
  };

  return {
    themeTokens,
    darkThemeTokens,
  };
}
