import React, { Component } from 'react';
import Input from './input';
import Code from './code';
import Output from './output';

class Show extends Component {
  setCSS() {
    let data = this.props.data
    console.log(data.css)
    let style = document.head.getElementsByTagName('style')[0]
    style.appendChild(document.createTextNode(data.css));
  }
  render() {
    let css = {
      box: {
        resize: 'none',
        color: 'darkslategray',
        margin: 'auto',
        marginTop: '10%',
        width: '60%',
        minWidth: 200,
        fontSize: 28,
        textAlign: 'center'
      }
    }
    let data = this.props.data
    this.setCSS()
    return (
      <div >
        <div style={css.box}>
          <Input text=''/>
          <Code data={data}/>
        </div>
        <Output data={data}/>
      </div>
      );
  }
}

export default Show;
