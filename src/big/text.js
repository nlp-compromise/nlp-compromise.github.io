import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import texts from './texts';
const style = styler`
container
  display:flex;
text:
  width:250px
  min-height:200
  font-size:12
  border-radius:5
  padding:10
  color:grey
  margin-left:5
tabs:
  border:1px solid lightgrey
  text-align:left
  max-width:175px
  display:flex
  flex-direction: column;
  min-height:200
  border-radius:0px 5px 5px 0px;
.tab:
  font-size:17
  display:block
  color:lightsteelblue
  cursor:pointer
  padding:15
  border-bottom:2px solid linen
  &:hover
    border-bottom:2px solid lightsteelblue
    color:steelblue
.selected:
  border-bottom:2px solid lightsteelblue
  color:steelblue
  &::before
    ◀️
`;

class Text extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'freshPrince'
    };
    this.css = style;
  }
  onClick() {}
  render() {
    let { css, state } = this;
    return (
      <div style={css.container}>
        <textarea style={css.text} value={texts[state.text]} />
        <div style={css.tabs}>
          {Object.keys(texts).map((k, i) => {
            let text = k.replace(/_/g, ' ');
            let selected = {};
            if (state.text === k) {
              selected = css.selected;
              text = '◀️ ' + text;
            }
            return (
              <div key={i} onClick={() => this.setState({ text: k })} style={{ ...css.tab, ...selected }}>
                {text}
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}
Text = Radium(Text);
module.exports = Text;
