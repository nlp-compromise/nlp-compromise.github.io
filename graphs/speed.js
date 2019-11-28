const somehow = require('somehow')
let w = somehow()

// 6ms
w.line()
  .set([[-5, 1], [6, 1]])
  .color('rose')
w.text('One sentence - 6ms')
  .set([[0, 0.6]])
  .size(2)
  .color('rose')

// sublime-editor 12ms  - https://pavelfatin.com/typing-with-pleasure/
w.line()
  .set([[0, 2], [12, 2]])
  .color('lightblue')
w.text('Typing latency - 12ms')
  .set([[3, 1.6]])
  .size(2)
  .color('lightblue')

// 60hz - 16ms
w.line()
  .set([[0, 3], [16, 3]])
  .color('lightblue')
w.text('60hz refresh rate - 16ms')
  .set([[8, 2.6]])
  .size(2)
  .color('lightblue')

// packet around the world - 190ms
w.line()
  .set([[0, 4], [190, 4]])
  .color('lightblue')
w.text('One packet around world - 190ms')
  .set([[90, 3.5]])
  .size(2)
  .color('lightblue')

// human blink - 300ms
w.line()
  .set([[0, 5], [300, 5]])
  .color('lightblue')
w.text('human blink - 300ms')
  .set([[200, 4.5]])
  .size(2)
  .color('lightblue')

w.line()
  .set([[0, 6], [400, 6]])
  .color('rose')
w.text('Wikipedia article - 400ms')
  .set([[300, 5.5]])
  .size(2)
  .color('rose')

//
w.line()
  .set([[0, 7], [500, 7]])
  .color('lightblue')
w.text('one beat of a song - 500ms')
  .set([[350, 6.6]])
  .size(2)
  .color('lightblue')

w.fit()
w.xAxis.label('ms latency')
w.y.fit(7, 0)
w.yAxis.remove()
// w.title('Comparisons of Latency')
document.querySelector('#speed-chart').innerHTML = w.build()
