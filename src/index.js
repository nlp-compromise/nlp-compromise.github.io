import React from 'react';
import ReactDOM from 'react-dom';
// import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import nlp from 'nlp_compromise';
import style from './style'
import Result from './result';
import Logo from './logo';
import AutosizeInput from 'react-input-autosize'
import Textarea from './textarea';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import './lib/codemirror.css';
import './lib/mytheme.css';
import './index.css'

const examples={
  node:`import nlp from 'compromise'

var r = nlp('dinosaur').nouns().toPlural();
var str = r.normal();

console.log(str);
//'dinosaurs'
`,
  html:`<script src="https://unpkg.com/nlp_compromise@latest/builds/nlp_compromise.min.js"></script>
<script>
  var r = window.nlp('dinosaur').nouns().toPlural();

  var str = r.normal();
  document.body.innerHTML= str;
  //'dinosaurs'
</script>
`
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'john is nice and cool'
    };
    this.state.result = nlp(this.state.text)
    this.css = style;
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    let {state} = this;
    state.text = e.target.value || ''
    state.result = nlp(state.text)
    this.setState(state)
  }
  componentDidMount() {
    setTimeout(() => {
      this.refs.input.updateInputWidth()
    }, 50)
  }

  render() {
    let {state, css} = this;
    let pastTense = state.result.clone().verbs().toPast()
    // let negative = state.result.clone().sentences().toNegative()
    // let plural = state.result.clone().sentences().toPlural()
    return (
      <div>
        <Logo />
        <div style={css.container}>
          <div style={css.headline}>
            {'cuz using language is hard'}
          </div>
          <div style={css.headline2}>
            {'\'and there\'s a gazillion words'}
          </div>
          <div style={css.headline}>
            <span style={css.orange}>{'compromise'}</span>
            {' interprets and '}
            <b>{'pre-parses'}</b>
            {' words'}
          </div>
          <div style={css.headline3}>
            {'so that it\'s much nicer.'}
          </div>


          <div style={css.transform}>
            {'so'}
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

          <div style={css.transform}>
            {'becomes:'}
          </div>
          <div style={css.demo}>
            <Result result={state.result}/>
          </div>

<div style={{marginLeft:200}}>
          <div style={[css.transform]}>
            {'to past tense:'}
          </div>
          <div style={[css.demo, {fontSize: 20, marginTop: 0 }]}>
            <Result result={pastTense}/>
          </div>
          <div style={css.transform}>
            {'to negative:'}
          </div>
          <div style={[css.demo, {fontSize: 20, marginTop: 0 }]}>
            <Result result={pastTense}/>
          </div>

      </div>

          <div style={[css.headline, {marginTop:20, fontSize:25, marginLeft:100}]}>
            {'ok'}
            <span style={[css.orange, {marginLeft: 15}]}>
              {'um,'}
            </span>
          </div>
          <div style={css.code}>
            {'npm install compromise'}
          </div>

          <div style={css.install}>
            <div style={css.mode}>
              <Codemirror
                options={{ mode:'javascript', theme:'spencertheme', readOnly:true}}
                value={examples.node}
                />
             </div>
            <div style={css.mode}>
              <Codemirror
                options={{ mode:'htmlmixed', theme:'spencertheme', readOnly:true}}
                value={examples.html}
              />
             </div>
          </div>


          <div style={css.freshprince}>
            <Textarea />
          </div>

          <div style={css.spacer}/>

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
