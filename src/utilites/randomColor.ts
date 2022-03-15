// https://css-tricks.com/snippets/javascript/random-hex-color/

function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export default randomColor
