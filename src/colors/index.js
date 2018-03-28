// @flow

import adapter from '../lib/adapter'

const palette = {
  primary: '#878D93', // baseText
  secondary: '#B9BCC0', // altText
  accent: '#ffffff', // accentText

  background: '#0F1B27',
  bgTone1: '#2F3B46',
  bgTone2: '#1A2733',

  contrast: '#6D6345',

  divider: '#1E2934',
}

const colors = adapter(palette)

export default colors
