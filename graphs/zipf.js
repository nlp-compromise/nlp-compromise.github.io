const somehow = require('somehow')
// const somehow = require('/Users/spencer/mountain/somehow/src')

//https://www.britannica.com/topic/Zipfs-law
const zipf = function(r) {
  return 0.1 / r
}
// let points = [[0, 0], [1, 10], [100, 50], [300, 65], [600, 70], [1150, 80]]
const max = 16000
let w = somehow()
let all = [[0, 0]]
let carry = 0
for (let i = 1; i < max; i += 1) {
  let percent = zipf(i)
  carry += percent
  if (carry > 1) {
    carry = 1
  }
  all.push([i, parseInt(carry * 100, 10)])
}

// sample some of them
let points = [all[0], all[1], all[100], all[300], all[600], all[1150]]
for (let i = 1600; i < max; i += 400) {
  points.push(all[i])
}

// console.log(all[9999])

w.line()
  .set(points)
  .soft()

// top
w.line()
  .set([
    [0, 100],
    [max, 100]
  ])
  .color('lightgrey')
  .dotted()
  .width(0.5)

// 1k
w.line()
  .set([
    [1000, 0],
    [1000, 100]
  ])
  .color('lightgrey')
  .dotted()
  .width(0.5)
w.text(['80%', 'coverage', '(1k words)'])
  .set([[1450, 50]])
  .center()
  .color('lightgrey')
  .size(1.8)

// 5k
w.line()
  .set([
    [5000, 0],
    [5000, 100]
  ])
  .color('lightgrey')
  .dotted()
  .width(0.5)
w.text(['90%', '(5k words)'])
  .set([[5600, 40]])
  .center()
  .color('lightgrey')
  .size(1.8)

// 14k
w.line()
  .set([
    [14000, 0],
    [14000, 100]
  ])
  .color('lightgrey')
  .dotted()
  .width(0.5)
w.text(['  compromise', 'lexicon', '(14k', 'words)'])
  .set([[14700, 55]])
  .center()
  .color('lightgrey')
  .size(1.8)

w.title('Vocabulary Size')
w.xAxis.label('# of words →')
// w.yAxis.label('coverage')
// w.yAxis.label('coverage')
w.yAxis.suffix('%')
w.fit()
w.y.fit(0, 100)
document.querySelector('#zipf-chart').innerHTML = w.build()
