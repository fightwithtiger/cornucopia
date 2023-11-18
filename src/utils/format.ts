import postcss from 'postcss'
import scss from 'postcss-scss'
import stylefmt from 'stylefmt'

export async function formatScss(text: string) {
  return await postcss([
    stylefmt,
  ]).process(text, {
    from: undefined,
    syntax: scss,
  }).then((res) => {
    return res.css
  })
}
