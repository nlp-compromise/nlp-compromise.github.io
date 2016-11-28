import React from 'react';

const color={
  Pronoun:'lavender',
  Plural:'steelblue',
  Singular:'lightsteelblue',
  Verb:'palevioletred',
  Determiner:'lightgrey',
  Preposition:'#9794a8'
}

const word=(str, tag)=>{
  let container={
    position:'relative'
  }
  let tagName={}
  let css={
    color:'dimgrey',
    fontSize:50,
    // margin:20,
    fontFamily:'Inconsolata'
  }
  if(color[tag]){
    css.borderBottom='4px solid '+color[tag]
    tagName={
      position:'absolute',
      bottom:-20,
      right:20,
      color:color[tag],
      fontSize:11
    }
  }
 return (
   <span style={container}>
     <span style={css}>{str.trim()}</span>
     <span style={{fontSize:50}}>{' '}</span>
     <span style={tagName}>{tag}</span>
   </span>
 )
}
module.exports = word
