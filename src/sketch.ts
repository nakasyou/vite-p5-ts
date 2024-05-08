export const setup = () => {
  // Setup code
  createCanvas(640, 480)
}

export const data = {
  x: 1
}
export const draw = () => {
  // Draw code
  background('blue')
  circle(data.x, height / 2, 100)
  data.x += 5
  data.x = 2
  
}
