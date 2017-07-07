'use strict';
import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import tags from './tags';

const style = styler`
container:
  display:flex;
`;

class Tags extends React.Component {
  constructor() {
    super();
    this.css = style;
  }
  render() {
    let css = this.css;
    return (
      <div style={css.container}>
        {/* <iframe src="./tags.html" style={{ width: '100%', height: 500 }}> </iframe> */}
      </div>
    );
  }
}

Tags = Radium(Tags);
module.exports = Tags;
