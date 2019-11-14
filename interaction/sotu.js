const superagent = require('superagent')
const nlp = require('/Users/spencer/mountain/compromise/src')
const htm = require('htm')
const vhtml = require('vhtml')
const h = htm.bind(vhtml)

const titles = {
  Reagan_1988: '1988 (reagan)',
  Bush_1989: '1989 (bush)',
  Bush_1990: '1990 (bush)',
  Bush_1991: '1991 (bush)',
  Bush_1992: '1992 (bush)',
  Clinton_1993: '1993 (clinton)',
  Clinton_1994: '1994 (clinton)',
  Clinton_1995: '1995 (clinton)',
  Clinton_1996: '1996 (clinton)',
  Clinton_1997: '1997 (clinton)',
  Clinton_1998: '1998 (clinton)',
  Clinton_1999: '1999 (clinton)',
  Clinton_2000: '2000 (clinton)',
  Bush_2001: '2001 (bush)',
  Bush_2002: '2002 (bush)',
  Bush_2003: '2003 (bush)',
  Bush_2004: '2004 (bush)',
  Bush_2005: '2005 (bush)',
  Bush_2006: '2006 (bush)',
  Bush_2007: '2007 (bush)',
  Bush_2008: '2008 (bush)',
  Obama_2009: '2009 (obama)',
  Obama_2010: '2010 (obama)',
  Obama_2011: '2011 (obama)',
  Obama_2012: '2012 (obama)',
  Obama_2013: '2013 (obama)',
  Obama_2014: '2014 (obama)',
  Obama_2015: '2015 (obama)'
}

// fetch suto texts
setTimeout(() => {
  superagent.get('./assets/sotu.json').then(res => {
    let size = res.header['content-length'] / 1000
    size = parseInt(size, 10)
    document.getElementById('filesize').innerHTML = '<b>' + size + 'kb</b>'

    window.sotu = res.body
    document.getElementById('run-button').disabled = false
  })
}, 500)

let run = document.getElementById('run-button')
let results = document.getElementById('results')

const appendRow = function(name, words, duration, people, msPerSentence) {
  var tableRef = results.getElementsByTagName('tbody')[0]

  // Insert a row in the table at the last row
  var newRow = tableRef.insertRow()

  var nameNode = document.createTextNode(name)
  newRow.insertCell(0).appendChild(nameNode)

  var timeNode = document.createTextNode(duration.toLocaleString() + 'ms')
  newRow.insertCell(1).appendChild(timeNode)

  var wordNode = document.createTextNode(words.toLocaleString() + ' words')
  window.wordNode = wordNode
  newRow.insertCell(2).appendChild(wordNode)

  var personNode = document.createTextNode(people.toLocaleString() + ' people')
  newRow.insertCell(3).appendChild(personNode)

  var msNode = document.createTextNode(
    msPerSentence.toLocaleString() + 'ms/sentence'
  )
  newRow.insertCell(4).appendChild(msNode)
}

run.onclick = function() {
  let i = 0
  let keys = Object.keys(titles)
  const doit = function() {
    let k = keys[i]
    let name = titles[k]
    let str = window.sotu[k]
    let start = Date.now()
    let doc = nlp(str)
    let duration = Date.now() - start
    let words = doc.wordCount()
    let people = doc.clauses().match('#Person+').length
    let msPerSentence = Math.floor(duration / doc.length)
    appendRow(name, words, duration, people, msPerSentence)
    i += 1
    if (keys[i]) {
      setTimeout(doit, 1)
    }
  }
  doit()
}
