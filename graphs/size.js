const somehow = require('somehow')
let w = somehow()

// react - 144K
w.bar()
  .set([[1, 0], [1, 144]])
  .width(5)
  .opacity(1)
  .color('lightblue')
w.text(['react', '140kb'])
  .set([[1, 144 + 50]])
  .center()
  .size(2)
  .color('grey')

// angular - 566K
w.bar()
  .set([[2, 0], [2, 566]])
  .width(5)
  .color('lightblue')
w.text(['angular', '560kb'])
  .set([[2, 566 + 50]])
  .center()
  .size(2)
  .color('grey')

// compromise - 170kb
w.bar()
  .set([[3, 0], [3, 170]])
  .width(5)
  .color('rose')
w.text(['compromise', '170k'])
  .set([[3, 170 + 50]])
  .center()
  .size(2)
  .color('rose')

// jquery - 84
w.bar()
  .set([[4, 0], [4, 84]])
  .width(5)
  .color('lightblue')
w.text(['jquery v2', '84kb'])
  .set([[4, 84 + 50]])
  .center()
  .size(2)
  .color('grey')

// d3 - 230kb
w.bar()
  .set([[5, 0], [5, 230]])
  .width(5)
  .color('lightblue')
w.text(['d3 v3', '230kb'])
  .set([[5, 230 + 50]])
  .center()
  .size(2)
  .color('grey')

// ember - 435
w.bar()
  .set([[6, 0], [6, 435]])
  .width(5)
  .color('lightblue')
w.text(['ember', '435kb'])
  .set([[6, 435 + 50]])
  .center()
  .size(2)
  .color('grey')

w.x.fit(1, 6.5)
w.y.fit(-10, 800)
w.yAxis.label('kb')
// w.xAxis.remove()
w.xAxis.ticks([])
w.yAxis.remove()
w.title('Filesizes (minified)')
document.querySelector('#size-chart').innerHTML = w.build()