import React from 'react';
import styler from 'react-styling/flat'
import Radium from 'radium'
import Html from './output/html'
import AsArray from './output/asArray'
import Diff from './output/diff'
// import classnames from 'classnames'

const style = styler`
  container
    marginLeft:10%
    marginRight:10%
  tabs
    display: flex
    flex-wrap: nowrap
    justify-content:space-around
  output
    border-top:1px solid lightgrey
    width:100%
  textarea
    width:100%
    height:300
    border-radius:5
    white-space: pre-wrap
    word-wrap: break-word
    color: darkgrey
    marginTop:15
  tab
    color: darkgrey
    cursor:pointer
    paddingLeft:20
    paddingRight:20
    border-bottom: 2px solid darkgrey
    :hover
      color:dimgray
  selected
    color: steelblue
    border-bottom: 2px solid steelblue
`

class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'Plaintext'
    }
    this.css = style
  }
  tabs() {
    let {state, css} = this
    let tabs = [
      'Plaintext',
      'json'
    ]
    return tabs.map((str, i) => {
      let s = {}
      if (state.tab === str) {
        s = css.selected
      }
      const click = () => {
        this.setState({
          tab: str
        })
      }
      return (
        <span key={i} style={[css.tab, s]}  onClick={click} >
          {str}
        </span>
      )
    })
  }
  plaintext() {
    let {props, css} = this
    let r = props.result
    let str = r.out('text')
    return (
      <textarea style={css.textarea} value={str} />
    )
  }
  render() {
    let {state, css, props} = this
    let r = props.result
    const states = {
      Plaintext: () => this.plaintext(),
      Html: () => <Html result={r}/>,
      asArray: () => <AsArray result={r}/>,
      Diff: () => <Diff result={r}/>
    }
    let output = null
    if (r && states[state.tab]) {
      output = states[state.tab]()
    }
    return (
      <div style={css.container}>
        <div style={css.tabs}>
          {this.tabs()}
        </div>
        <div style={css.output}>
          {output}
        </div>
      </div>
    )
  }
}
Bottom = Radium(Bottom);
module.exports = Bottom
