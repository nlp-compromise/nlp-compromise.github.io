import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize'
import Radium from 'radium'
import Firebase from './firebase'
import Bottom from './bottom'
// import Output from './output'
// import nlp from 'nlp_compromise'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      text: 'placeholder'
    }
    this.css = {

    }
    this.db = new Firebase()
    let src = 'sotu/bush_1989'
    this.db.fetchText(src, this)
  }
  render() {
    let state = this.state
    // let result = nlp(state.text)
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
      onChange={(e) => this.setState({
        text: e.target.value
      })}/>
      <Bottom/>
    </div>
    )
  }
}
Main = Radium(Main);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
