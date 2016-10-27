import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize'
import Radium from 'radium'
import Firebase from './firebase'
import Bottom from './bottom'
import debounce from './debounce'
// import Output from './output'
import nlp from 'nlp_compromise'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      text: 'his name is John smith',
      result: nlp('')
    }
    this.css = {

    }
    this.db = new Firebase()
    let src = 'sotu/bush_1989'
    this.db.fetchText(src, this)
    this.onType = this.onType.bind(this)
    this.reParse = this.reParse.bind(this)
    this.reParse = debounce(this.reParse, 300)
    this.reParse()
  }
  onType(e) {
    this.setState({
      text: e.target.value
    })
    this.reParse()
  }
  reParse() {
    console.time('parse')
    let state = this.state
    this.setState({
      result: nlp(state.text)
    })
    console.timeEnd('parse')
  }
  render() {
    let state = this.state
    return (
      <div>
        <Textarea
      value={state.text}
      maxRows={8}
      style={{
        width: '80%',
        margin: '9%',
        padding: 8,
        color: 'grey',
        borderRadius: 5
      }}
      onChange={this.onType}/>
      <Bottom result={state.result} cmp={this}/>
    </div>
    )
  }
}
Main = Radium(Main);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
