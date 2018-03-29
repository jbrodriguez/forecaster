// @flow

const find = /[!'()~]|%20|%00/g
const replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+',
  '%00': '\x00',
}
const replacer = match => replace[match]

const encoder = str => encodeURIComponent(str).replace(find, replacer)

const encode = (dict: { [key: string]: string }) => {
  const query: string[] = []

  Object.keys(dict).forEach((key) => {
    query.push(`${encoder(key)}=${encoder(dict[key])}`)
  })

  return query.join('&')
}

export { encode } // eslint-disable-line import/prefer-default-export
