// @flow

const adapter = (palette: { [string]: string }) => {
  /* colors: background, foreground and border */
  const colors = {}

  Object.keys(palette).forEach((key) => {
    colors[key] = palette[key]
    colors[`g_${key}`] = { backgroundColor: palette[key] }
    colors[`c_${key}`] = { color: palette[key] }
    colors[`b_${key}`] = { borderColor: palette[key] }
  })

  return colors
}

export default adapter
