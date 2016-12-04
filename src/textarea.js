import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';
import Textarea from 'react-textarea-autosize';
import nlp from 'nlp_compromise';
import Down from 'react-icons/lib/go/chevron-down'
import texts from './texts/index'

const style = styler`
container
  position:relative
  margin:50
  marginLeft:10%
  max-width:800
drop:
  position:absolute;
  color:steelblue;
  x-index:4
  background-color:white
  border:1px solid lightgrey
  padding:3
  border-radius:0px 0px 3px 0px
  cursor:pointer
  font-size:14
textarea
  min-width:400
  width:100%
  color:dimgrey
  font-size:14
  // font-family:Inconsolata
  borderRadius: 5
  paddingTop:28
  paddingLeft:20
choices:
  position:absolute
  top:25
  width:300
  background-color:white
  padding:15
  border:1px solid lightgrey
  border-radius:3
choice:
  position:relative
  cursor:pointer
  color:grey
  background-color:white
  font-size:18
  border-bottom:1px solid lightgrey
  padding:5
  margin:15
  :hover:
    color:steelblue
    border-bottom:1px solid steelblue
`;

class TextThing extends React.Component {
  constructor() {
    super();
    this.state = {
      whichText: 'freshPrince',
      text: texts['freshPrince'],
      dropDown:true
    };
    this.state.result = nlp(this.state.text)
    this.css = style;
    this.onType = this.onType.bind(this)
  }
  onType(e) {
    this.setState({
      text: e.target.value,
      whichText:'custom'
    });
    this.reParse();
  }
  reParse() {
    console.time('parse');
    let state = this.state;
    this.setState({
      result: nlp(state.text)
    });
    console.timeEnd('parse');
  }
  dropDown(){
    let {css,state} = this;
    if(!state.dropDown){
      return null
    }
    let choices= Object.keys(texts).map((txt,i)=>{
      return <div style={css.choice} key={i} onClick={()=>{
        this.setState({text:texts[txt], whichText:txt, dropDown:false})
      }}>{txt}</div>
    })
    return <div style={css.choices}>{choices}</div>
  }
  render() {
    let {state, css} = this;
    console.log(css.textarea)
    return (
      <div style={css.container}>
        <div style={css.drop} onClick={()=>{
          this.setState({dropDown:!state.dropDown})
        }}>
          <Down/>
          {' -'+state.whichText+' '}
        </div>
        {this.dropDown()}
        <Textarea
        value={state.text}
        minRows={4}
        maxRows={7}
        style={css.textarea}
        onChange={this.onType}/>
      </div>
    )
  }
}


TextThing = Radium(TextThing);
module.exports = TextThing
