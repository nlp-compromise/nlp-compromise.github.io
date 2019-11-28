const nlp = require('/Users/spencer/mountain/compromise/builds/compromise.min.js') //TODO:fixme
const getColor = require('./_getColor')
const htm = require('htm')
const vhtml = require('vhtml')
const h = htm.bind(vhtml)

let input = document.querySelector('#tag-demo')
let result = document.querySelector('#tag-result')

const showTags = function() {
  let doc = nlp(input.value)
  let terms = doc.join().json({ terms: { clean: true, bestTag: true } })[0]
    .terms
  terms = terms.map(t => {
    let tag = getColor(t)
    let style = `border-bottom: 4px solid ${tag[1]};  color:#b4adad; text-align:center; font-family:Inconsolata; font-size:27px;`
    let tagStyle = `font-size:10px; text-align:right; margin-top:3px; color: ${tag[1]};`
    return h`<div class="m1 ">
      <div style=${style}>${t.text}</div>
      <div style=${tagStyle}>${tag[0]}</div>
    </div>`
  })
  result.innerHTML = h`${terms.join('')}`
}

// listen for keypress event
if (input.addEventListener) {
  input.addEventListener('input', showTags, false)
} else if (input.attachEvent) {
  input.attachEvent('onpropertychange', showTags)
}

// init
showTags()
console.log('compromise@' + nlp.version)
