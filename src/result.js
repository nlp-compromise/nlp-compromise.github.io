import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';

const style = styler`
container:
  position:relative
tagName:
  position:absolute
  bottom:-20
  right:20
  fontSize:11
demo
  color:dimgrey
  font-family:Inconsolata
`;

const chooseTag=(t)=>{
  const colors=[
    ['Person','#6393b9'],
    ['Pronoun','#81acce'],
    ['Plural','steelblue'],
    ['Singular','lightsteelblue'],

    ['Verb','palevioletred'],

    ['Adjective','#b3d3c6'],

    ['Determiner','#d3c0b3'],
    ['Preposition','#9794a8'],
    ['Conjunction','#c8c9cf']
  ]
  for(let i=0; i<colors.length; i++){
    if(t.tag[colors[i][0]]){
      return colors[i]
    }
  }
  console.log('no color for:')
  console.log(t.tag)
  return []
}


class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
    this.doTerm=this.doTerm.bind(this)
  }

  doTerm(t,i){
    let {css}=this
    let a=chooseTag(t)
    let tag= a[0]
    let color= a[1] || 'dimgrey'
   return (
     <span style={css.container}>
       <span style={{borderBottom:'4px solid '+color}}>{t.text.trim()}</span>
       <span style={{fontSize:50}}>{' '}</span>
       <span style={[css.tagName, {color:color}]}>{tag}</span>
     </span>
   )
  }

  render(){
    let {props, css}=this
    let terms=props.result.terms()
    return (
      <div style={css.demo}>
       {terms.map(this.doTerm)}
      </div>
    )
  }
}
Result = Radium(Result);
module.exports = Result
