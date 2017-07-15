import React from 'react';
import Radium from 'radium';
import CodeMirror from '../../lib/codemirror';
import styler from 'react-styling';
import demos from './demos';
const style = styler`
container
  display:flex;
  flex:0.5
  flex-direction:row
demoList:
  border: '1px solid grey',
  width: 150
  text-align:right
  font-family:helvetica
  color:slategrey
  font-size:12
  marginRight:10
demo:
  marginTop:6
  position:relative;
  cursor:pointer
  display:inline-block
  user-select: none;
  padding: 5
  border-radius:2
  &:hover:
    color:cornflowerblue
chosenTab:
  backgroundColor: steelblue
  color: white
column
  display:flex;
  flex-direction:column
  width:400px
code:
  min-height:60
  outline:none;
  padding:15
  color:grey
  border-radius:7px 7px 0px 0px
runButton:
  height:20
  text-align:center
  background-color:coral
  color:white
  border-radius:0px 0px 7px 7px
`;

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      demo: demos[0],
      code: demos[0].code
    };
    this.css = style;
    this.demoList = this.demoList.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(d) {
    let { props } = this;
    this.setState({ demo: d, code: d.code });
    setTimeout(() => {
      props.cmp.eval();
    }, 100);
  }
  demoList() {
    let { css, state } = this;
    return demos.map((d, i) => {
      let style = {};
      let more = null;
      if (state.demo.title === d.title) {
        style = css.chosenTab;
        more = (
          <span style={{ position: 'absolute', right: -8, color: 'steelblue' }}>
            {'▶'}
          </span>
        );
      }
      return (
        <div onClick={() => this.onClick(d)} style={{ ...css.demo, ...style }} key={i}>
          {d.title}
          {more}
        </div>
      );
    });
  }
  render() {
    let { css, state, props } = this;
    return (
      <div style={css.container}>
        <div style={css.demoList}>
          {this.demoList()}
        </div>
        <div style={css.column}>
          <CodeMirror code={state.demo.code} type={'js'} />
          <i style={css.runButton} onClick={() => props.cmp.eval()}>
            ⚡
          </i>
        </div>
      </div>
    );
  }
}
Code = Radium(Code);
module.exports = Code;
