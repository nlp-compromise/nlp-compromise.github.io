import React from 'react';
import styler from 'react-styling';
import texts from './texts';
const style = styler`
container
  display:flex;
  position:relative;
  min-width:350
  max-width:700
  text-align:left;
  align-self: flex-start;
  flex:1
  min-height:300px;
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
  color:#C9CBD8;
  margin-left:5
  padding-right:160
inside:
  position:absolute;
  width:150px
  max-width:150px
  right:25
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
    this.onClick = this.onClick.bind(this);
  }
  onClick(k) {
    let {props} = this;
    this.setState({
      title: k,
      text: texts[k]
    });
    props.cmp.eval();
  }
  makeChoice() {
    let {css, state} = this;
    return (
      <div style={{
        position: 'relative'
      }}>
        { /* <span style={{ position: 'absolute', left: 2, top: 17, color: 'steelblue' }}>
          {'◀️ '}
        </span> */ }
        <span style={css.choice}>
          {state.title.replace(/_/g, ' ')}
        </span>
      </div>
      );
  }
  makeOthers() {
    let {css, state} = this;
    return (
      <div style={css.tabs}>
        {Object.keys(texts).map((k, i) => {
        if (k === state.title) {
          return null;
        }
        return (
          <div key={i} style={css.other}>
              <div onClick={() => this.onClick(k)}>
                {k.replace(/_/g, ' ')}
              </div>
            </div>
          );
      })}
      </div>
      );
  }
  render() {
    let {css, state} = this;
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
export default Text;
