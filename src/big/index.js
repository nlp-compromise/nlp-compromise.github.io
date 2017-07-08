import React from 'react';
import Text from './text';
import Code from './code';

import styler from 'react-styling';
const style = styler`
container
  flex:1;
  width:100%;
  display:flex;
  justify-content: flex-end;
`;

class Big extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <Code cmp={this} />
        <Text cmp={this} />
      </div>
    );
  }
}
module.exports = Big;
