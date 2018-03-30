import adapter from '../../src/lib/adapter'

test('palette adapter', () => {
  const palette = {
    background: '#0F1B27',
    bgTone1: '#2F3B46',
    bgTone2: '#1A2733',
  }

  const expected = {
    background: '#0F1B27',
    g_background: { backgroundColor: '#0F1B27' },
    c_background: { color: '#0F1B27' },
    b_background: { borderColor: '#0F1B27' },

    bgTone1: '#2F3B46',
    g_bgTone1: { backgroundColor: '#2F3B46' },
    c_bgTone1: { color: '#2F3B46' },
    b_bgTone1: { borderColor: '#2F3B46' },

    bgTone2: '#1A2733',
    g_bgTone2: { backgroundColor: '#1A2733' },
    c_bgTone2: { color: '#1A2733' },
    b_bgTone2: { borderColor: '#1A2733' },
  }

  expect(adapter(palette)).toEqual(expected)
})
