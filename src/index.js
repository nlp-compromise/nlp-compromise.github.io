import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import nlp_compromise from 'nlp_compromise';
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
  margin:50
  marginLeft:10%
  color:dimgrey
  font-size:50
  font-family:Inconsolata
input:
  fontStyle: 'italic'
  border:none
  width:1000
  color:dimgrey
  font-size:50
  font-family:Inconsolata
transform
  marginTop:80
  marginBottom:0
  marginLeft:30
  color:steelblue
  font-size:20
  font-weight:500
  font-family:Inconsolata
`;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      text:'she sells seashells by the seashore'
    };
    this.css = style;
    this.onChange=this.onChange.bind(this)
  }
  onChange(e){
    this.setState({
      text:e.target.value
    })
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
        <div style={css.demo}>
          {'‘'}
          <input type="text" value={state.text} style={css.input} onChange={this.onChange}/>
          {'’'}
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
          {'and now it\'s much easier'}
        </div>

        <div style={css.transform}>
          {'.toSingular():'}
        </div>
        <div style={[css.demo, {opacity:0.5, marginTop:5}]}>
          {[
            ['she','Pronoun'],
            ['sells','Verb', true],
            ['a','Determiner', true],
            ['seashell','Singular'],
            ['by','Preposition'],
            ['the','Determiner'],
            ['seashore','Singular'],
          ].map((a)=>{
            return word(a[0], a[1])
          })}
        </div>

        <div style={css.transform}>
          {'.toPastTense():'}
        </div>
        <div style={[css.demo, {opacity:0.5, marginTop:5}]}>
          {[
            ['she','Pronoun'],
            ['sold','Verb', true],
            ['seashells','Plural'],
            ['by','Preposition'],
            ['the','Determiner'],
            ['seashore','Singular'],
          ].map((a)=>{
            return word(a[0], a[1])
          })}
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
