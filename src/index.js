import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import styler from 'react-styling/flat';
import word from './word';
import './index.css'

const style = styler`
container
  marginTop: 9%
  padding: 8
headline:
  color:steelblue;
  font-size:34
  marginLeft:20%
headline2
  color:lightgrey
  font-size:30
  marginLeft:25%
headline3
  color:palevioletred
  font-size:30
  marginLeft:25%
demo
  color:dimgrey
  font-size:50
  margin:50
  marginLeft:10%
  font-family:Inconsolata

`;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {state,css} = this;
    return (
      <div style={css.container}>
        <div style={css.headline}>
          {'using language is hard'}
        </div>
        <div style={css.headline2}>
          {'\'cuz there\'s a gazillion words'}
        </div>
        <div style={[css.demo, { fontStyle: 'italic'}]}>
          {`‘she sells seashells by the seashore’`}
        </div>
        <div style={css.headline}>
          {'but,'}
        </div>
        <div style={css.headline2}>
          {'there\'s just a few types'}
        </div>
        <div style={css.demo}>
          {[
            ['she','Pronoun'],
            ['sells','Verb'],
            ['seashells','Plural'],
            ['by','Preposition'],
            ['the','Determiner'],
            ['seashore','Singular'],
          ].map((a)=>{
            return word(a[0], a[1])
          })}
        </div>
        <div style={css.headline3}>
          {'now it\'s much easier'}
        </div>
      </div>
    );
  }
}
Main = Radium(Main);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
