import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';

const style = styler`
container
  width: 80%
  margin: 9%
  padding: 8
`;

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.css = style;

  }
  render() {
    let {css} = this;
    return (
    <div style={css.container}>
      docs!
    </div>
      );
  }
}
Docs = Radium(Docs);
module.exports = Docs
