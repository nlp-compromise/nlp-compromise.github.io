import React from 'react';
import ReactDOM from 'react-dom';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import nlp from 'nlp_compromise';
import styler from 'react-styling/flat';
import Result from './result';
import AutosizeInput from 'react-input-autosize'
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
  border:none
  color:dimgrey
  font-size:50
  font-family:Inconsolata
  border-bottom:1px dashed lightgrey
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
      text:'john is nice and cool'
    };
    this.state.result=nlp(this.state.text)
    this.css = style;
    this.onChange=this.onChange.bind(this)
  }
  onChange(e){
    let {state} = this;
    state.text=e.target.value||''
    state.result=nlp(state.text)
    console.log(state.result)
    this.setState(state)
  }
  componentDidMount(){
    setTimeout(()=>{
      this.refs.input.updateInputWidth()
    },50)
  }

  render() {
    let {state,css} = this;
    let pastTense=state.result.clone().verbs().toPast()

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
          <AutosizeInput
            ref={'input'}
            value={state.text}
            inputStyle={css.input}
            onChange={this.onChange}
          />
          {'’'}
        </div>
        <div style={css.headline}>
          {'but,'}
        </div>
        <div style={css.headline2}>
          {'there\'s just a few types'}
        </div>
        <div style={css.demo}>
          <Result result={state.result}/>
        </div>
        <div style={css.headline3}>
          {'and now it\'s much easier'}
        </div>

        <div style={css.transform}>
          {'past tense:'}
        </div>
        <div style={[css.demo, {fontSize:30, marginTop:0}]}>
          <Result result={pastTense}/>
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
