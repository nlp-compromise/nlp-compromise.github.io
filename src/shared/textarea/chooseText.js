import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';
import Textarea from 'react-textarea-autosize';
import texts from './texts/index'
import Down from 'react-icons/lib/go/chevron-down'
import nlp from 'compromise';
import debounce from './debounce';

const style = styler`
container
  position:relative
  max-width:700
drop:
  position:absolute;
  color:steelblue;
  z-index:19
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
  borderRadius: 5
  paddingTop:28
  paddingLeft:20
choices:
  position:absolute
  z-index:19
  top:25
  width:220
  background-color:white
  padding:5
  border:1px solid lightgrey
  border-radius:3
choice:
  position:relative
  cursor:pointer
  color:grey
  background-color:white
  font-size:18
  border-bottom:2px solid lightgrey
  padding:5
  margin:15
  :hover:
    color:steelblue
    border-bottom:2px solid steelblue
`;

class ChooseText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichText: 'freshPrince',
      text: texts['freshPrince'],
      dropDown: false,
    };
    this.css = style;
    this.callback = props.callback || function(){}
    this.parse = this.parse.bind(this)
    this.parse = debounce(this.parse, 300);
    this.onType = this.onType.bind(this)
    this.toggleDrop = this.toggleDrop.bind(this)
  }
  onType(e) {
    this.setState({
      text: e.target.value,
      whichText: 'custom'
    });
    this.parse()
  }
  parse(){
    let {state} = this;
    state.result=nlp(state.text)
    this.setState(state)
    this.callback(state)
  }
  toggleDrop(){
    let {state} = this;
    this.setState({
      dropDown: !state.dropDown
    })
  }
  dropDown() {
    let {css, state} = this;
    if (!state.dropDown) {
      return null
    }
    let choices = Object.keys(texts).map((txt, i) => {
      const choice=() => {
        this.setState({
          text: texts[txt],
          whichText: txt,
          dropDown: false
        })
      }
      return <div style={css.choice} key={i} onClick={choice}>{txt}</div>
    })
    return <div style={css.choices}>{choices}</div>
  }
  render() {
    let {state, css} = this;
    return (
      <div style={css.container}>
        <div style={css.drop} onClick={this.toggleDrop}>
         <Down/>
          {' -' + state.whichText + ' '}
        </div>
        {this.dropDown()}
        <Textarea
          value={state.text}
          minRows={4}
          maxRows={7}
          style={css.textarea}
          onChange={this.onType}
          />
      </div>
    )
  }
}


ChooseText = Radium(ChooseText);
module.exports = ChooseText
