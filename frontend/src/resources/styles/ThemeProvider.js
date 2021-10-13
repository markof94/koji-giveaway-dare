import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider, createGlobalStyle } from 'styled-components';

const DefaultTheme = {
  name: 'normal',
  colors: {
    'background.default': '#ffffff',
    'background.default#active': '#fafafa',
    'background.alt': '#f4f4f4',
    'background.alt#active': '#fafafa',
    'background.highlight': '#f5f5f5',
    'background.contrast': '#2d2d2f',

    'foreground.default': '#333333',
    'foreground.secondary': '#757575',
    'foreground.primary': '#007aff',
    'foreground.contrast': '#ffffff',
    'foreground.destructive': '#f44336',

    'border.default': '#999999',
    'border.secondary': '#F2F2F2',

    'input.background': '#ffffff',
    'input.foreground': '#111111',

    'button.background': '#007aff',
    'button.foreground': '#ffffff',
    'button.background#hover': 'rgba(21, 122, 251, 0.03)',
    'button.background#active': '#0067d6',
    'button.text.disabled': '#E5E5E5',

    'modal.background': 'rgba(0,0,0,0.7)',

    'tooltip.shadow': 'rgba(0,0,0,0.25)',

    'contextMenu.background': 'rgba(255,255,255, 0.8)',
    'contextMenu.background#hover': 'rgba(0,0,0,0.04)',
    'contextMenu.background#active': 'rgba(0,0,0,0.06)',
    'contextMenu.border': 'rgba(0,0,0,0.05)',
    'contextMenu.boxShadow': 'rgba(0,0,0,0.1)',
    'rootNav.background': '#FFFFFF',
    'rootNav.iconColor': '#111111',
    'rootNav.textColor': '#333333',
    'textInput.textColor': '#111111',
    'infoitem.textColor': '#333333',
    'infoitem.remixIcon': '#000000',
    'infoitem.svgIcon': '#999999',
    'popup.background': '#ffffff',
    'popup.textColor': '#111111',
    'landing.background': '#F9F9F9',
  },
  mixins: {
    clickable: 'cursor: pointer; user-select: none;',
    passThroughTouches: 'pointer-events: none; user-select: none;',
    'font.defaultFamily': 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
    'contextMenu.border': '',
    hideScrollbar: `
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }`,
  },
  breakpoints: {
    mobile: '(max-width: 479px)',
    popover: '(max-width: 480px)',
    desktop: '(min-width: 700px)',
  },
};

const DarkTheme = {
  ...DefaultTheme,
  name: 'dark',
  colors: {
    ...DefaultTheme.colors,
    'background.default': '#000000',
    'background.default#active': '#111111',
    'background.alt': '#1d1d1f',
    'background.alt#active': '#2d2d2f',
    'background.highlight': '#2d2f30',
    'background.contrast': '#2d2d2f',

    'foreground.default': '#f5f5f7',
    'foreground.secondary': '#a1a1a6',
    'foreground.primary': '#007aff',
    'foreground.contrast': '#f5f5f7',

    'border.default': '#999999',
    'border.secondary': 'rgba(255,255,255,0.2);',

    'input.background': 'rgba(255,255,255,0.1)',
    'input.foreground': '#f5f5f7',

    'button.background': '#007aff',
    'button.foreground': '#ffffff',
    'button.background#hover': 'rgba(21, 122, 251, 0.03)',
    'button.background#active': '#0067d6',

    'modal.background': 'rgba(0,0,0,0.8)',

    'tooltip.shadow': 'rgba(255,255,255,0.25)',

    'contextMenu.background': 'rgba(40,40,40,0.8)',
    'contextMenu.background#hover': 'rgba(255,255,255,0.04)',
    'contextMenu.background#active': 'rgba(255,255,255,0.06)',
    'contextMenu.border': 'rgba(255,255,255,0.05)',
    'contextMenu.boxShadow': 'transparent',
    'rootNav.background': 'rgba(40,40,40,0.8)',
    'rootNav.iconColor': '#ffffff',
    'rootNav.textColor': '#f5f5f7',
    'textInput.textColor': 'rgb(245, 245, 247)',
    'infoitem.textColor': '#f5f5f7',
    'infoitem.remixIcon': '#f5f5f7',
    'infoitem.svgIcon': '#f5f5f7',
    'popup.background': '#000000',
    'popup.textColor': '#f5f5f7',
    'landing.background': '#000000',
  },
  mixins: {
    ...DefaultTheme.mixins,
    'contextMenu.border': 'border: 1px solid #444444;',
  },
};

export const DarkGlobalStyle = createGlobalStyle`
  html, body, #app {
    background-color: #000000;
  }
`;

// Global theme provider
const GlobalTheme = ({ children, style }) => {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const prefersDark = true;
  // const prefersDark = false;
  const theme = (prefersDark) ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      theme={theme}
    >
      {prefersDark && (
        <DarkGlobalStyle />
      )}
      {children}
    </ThemeProvider>
  );
};

GlobalTheme.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default GlobalTheme;
