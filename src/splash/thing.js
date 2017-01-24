import React, { Component } from 'react';

class Thing extends Component {
  constructor(props) {
    super(props);
    this.css = {
      container:{
        display:'flex',
        height:props.height||15
      }
    }
  }
  render() {
    let {css, props}=this
    let colors=props.colors||[]
    return (
      <div style={css.container}>
        {colors.map((c,i)=>{
          let w=Math.random()*7
          w+=3
          let style={
            flexGrow:w,
            backgroundColor:c,
            height:'100%'
          }
          return <div key={i} style={style}/>
        })}
      </div>
    )
  }
}
module.exports = Thing
