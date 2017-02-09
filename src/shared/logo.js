import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
const colors = [
  'palevioletred',
  'steelblue',
  '#b3d3c6',
  '#f39c73',
  '#6393b9',
  '#d3c0b3',
  '#c8c9cf',
]
const style = styler`
container:
  position:relative
  width:1210px
  padding:20
  paddingTop:4
  text-align:center
bars:
  display:flex
  flex-direction:row
  flex-wrap:nowrap
  justify-content:stretch
text:
  color:grey
  font-size:15
  font-family:Inconsolata
  display:block
thing:
  height:300
  background-color:steelblue
  transition: flex-basis 1.2s;
`

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [180, 160, 120, 180, 170]
    }
    this.css = style
    this.height = props.height || 300
    this.width = props.width || 1210
    this.makeThings = this.makeThings.bind(this)
  }
  makeThings() {
    let {css, state} = this
    return state.sizes.map((s, i) => {
      let theCss = {
        flexBasis: s,
        backgroundColor: colors[i],
        height: this.height
      }
      return <span key={i} style={[css.thing, theCss]} />
    })
  }
  render() {
    let {css} = this
    return (
      <div style={[css.container, {
        width: this.width
      }]}>
        <div style={css.text}>
        </div>
        <div style={css.bars}>
          {this.makeThings()}
        </div>
      </div>
    )
  }
}
Logo = Radium(Logo);

module.exports = Logo
