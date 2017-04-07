import React from 'react';
import Remarkable from 'remarkable'
import styler from 'react-styling';
import hljs from 'highlight.js'

var md = new Remarkable({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

function doc(props) {
  let html = md.render('docs `nlp()`')
  let container = {
    margin: 50
  }
  return (
    <div style={container}>
      <div dangerouslySetInnerHTML={{
      __html: html
    }}
    />
    </div>
  )
}
module.exports = doc
