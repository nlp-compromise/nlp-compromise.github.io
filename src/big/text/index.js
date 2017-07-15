import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import texts from './texts';
const style = styler`
container
  display:flex;
  min-width:350
  max-width:900
  text-align:left;
  align-content: flex-start;
  flex:1
  // maxWidth: 480
text:
  position:relative;
  width:100%
  min-height:200
  font-size:12
  border-radius:8
  padding-top:10
  padding-left:10
  padding-bottom:10
  color:grey
  margin-left:5
  padding-right:120
inside:
  position:relative;
  width:150px
  max-width:150px
  left:-120
  z-index:4
  text-align:left
  display:flex
  flex-direction: column;
  border-radius:5px
.choice:
  color:white
  border-bottom:1px solid steelblue
  font-weight:500
  display:block
  padding:7
  border-radius:3
  text-align:left
  cursor:pointer;
  margin-top:10
  margin-left:10
  margin-bottom:0
  background-color:steelblue
  text-transform: capitalize
  user-select: none;
.other:
  color:silver
  margin-top:10
  padding-right:5
  font-size:13
  text-align:right
  cursor:pointer
  user-select: none;
  &:hover
    color:cadetblue

// .tab:
//   font-size:12
//   display:block
//   text-align:center
//   color:lightsteelblue
//   cursor:pointer
//   padding-top:10
//   padding-bottom:10
//   border-bottom:2px solid linen
//   text-transform: capitalize
//   &:hover
//     border-bottom:2px solid lightsteelblue
//     color:steelblue
// .selected:
//   border-radius:0px 5px 5px 0px
//   border:2px solid lightsteelblue
//   color:steelblue
//   &::before
//     ◀️
`;

class Text extends React.Component {
  constructor() {
    super();
    let defaultText = 'fresh_prince';
    this.state = {
      title: defaultText,
      text: texts[defaultText]
    };
    this.css = style;
  }
  makeChoice() {
    let { css, state } = this;
    return (
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 2, top: 17, color: 'steelblue' }}>
          {'◀️ '}
        </span>
        <span style={css.choice}>
          {state.title.replace(/_/g, ' ')}
        </span>
      </div>
    );
  }
  makeOthers() {
    let { css, state } = this;
    return (
      <div style={css.tabs}>
        {Object.keys(texts).map((k, i) => {
          if (k === state.title) {
            return null;
          }
          return (
            <div key={i} style={css.other}>
              <div onClick={() => this.setState({ title: k, text: texts[k] })}>
                {k.replace(/_/g, ' ')}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    let { css, state } = this;
    return (
      <div style={css.container}>
        <textarea style={css.text} value={texts[state.title]} />
        <div style={css.inside}>
          {this.makeChoice()}
          {this.makeOthers()}
        </div>
      </div>
    );
  }
}
// Text = Radium(Text);
module.exports = Text;
