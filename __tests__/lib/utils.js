import { encode, convertTemp } from '../../src/lib/utils'

describe('convertTemp', () => {
  const kelvin = 284.042

  test('to/fahrenheit', () => {
    const fahrenheit = 52
    expect(convertTemp(kelvin, 'imperial')).toEqual(fahrenheit)
  })

  test('to/celsius', () => {
    const celsius = 11
    expect(convertTemp(kelvin, 'metric')).toEqual(celsius)
  })
})

test('encode/nosubst', () => {
  const params = { q: 'London', appid: 'bdfadfed' }
  const expected = 'q=London&appid=bdfadfed'
  expect(encode(params)).toEqual(expected)
})

test('encode/subst', () => {
  const params = { q: '(Buenos Aires)', appid: '!~bdfadfed' }
  const expected = 'q=%28Buenos+Aires%29&appid=%21%7Ebdfadfed'
  expect(encode(params)).toEqual(expected)
})
