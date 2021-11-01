export function ColorPalette({ onChangeColor }) {
  const palette = ['#bc3354', '#e2445c', '#ff158a', '#ff5bc4', '#ff642f', '#cab641', '#fdab3d', '#ffcb00', '#9cd326',
    '#037f4d', '#784ad1', '#a25ddc', '#0386c0', '#579bfc', '#66ccff', '#c4c4c4']

  return (
    < div className="colors-palette" >
      {palette.map(color =>
        <span style={{ backgroundColor: color }} key={color} onClick={() => onChangeColor(color, 'color')}></span>)}
    </div >
  )
}