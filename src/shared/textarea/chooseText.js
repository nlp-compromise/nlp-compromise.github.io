import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';
import Textarea from 'react-textarea-autosize';
import texts from './texts/index'
import Down from 'react-icons/lib/go/chevron-down'
import { nlp } from '../../shared/nlp';
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
  borderRadius: 7px 0px 5px 0px
textarea
  min-width:400
  width:100%
  color:dimgrey
  font-size:14
  borderRadius: 7px 7px 0px 0px
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
    let text = texts['freshPrince']
    this.state = {
      whichText: 'freshPrince',
      text: text,
      dropDown: false,
      result: nlp(text)
    };
    this.css = style;
    // this.db = new Firebase();
    // this.db.fetchText(this.state.src, this);
    this.callback = props.callback || function() {}
    this.onType = this.onType.bind(this)
    this.toggleDrop = this.toggleDrop.bind(this)
  }
  componentDidMount() {
    this.callback(this.state.text)
  }
  onType(e) {
    this.setState({
      text: e.target.value,
      whichText: 'custom'
    }, () => {
      this.callback(this.state.text)
    });
  }
  toggleDrop() {
    let {state} = this;
    this.setState({
      dropDown: !state.dropDown
    })
  }

  // setText(src) {
  //   this.setState({
  //     src: src
  //   });
  //   this.db.fetchText(src, this);
  // }


  dropDown() {
    let {css, state} = this;
    if (!state.dropDown) {
      return null
    }
    let choices = Object.keys(texts).map((txt, i) => {
      const choice = () => {
        let state = {
          text: texts[txt],
          whichText: txt,
          dropDown: false
        }
        this.setState(state)
        this.callback(state.text)
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
      maxRows={6}
      style={css.textarea}
      onChange={this.onType}
      />
      </div>
    )
  }
}


ChooseText = Radium(ChooseText);
module.exports = ChooseText
