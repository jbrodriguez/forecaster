// @flow

import adapter from '../lib/adapter'

const palette = {
  primary: '#878D93', // baseText
  secondary: '#B9BCC0', // altText
  accent: '#ffffff', // accentText
  muted: 'rgba(255,255,255,0.7)', // mutedText

  background: '#0F1B27',
  bgTone1: '#2F3B46',
  bgTone2: '#1A2733',

  contrast: '#CBC52A',

  divider: '#1E2934',

  alert: '#BA0B0B',

  transparent: 'transparent',
  white: '#ffffff',
}

const colors = adapter(palette)

export default colors
