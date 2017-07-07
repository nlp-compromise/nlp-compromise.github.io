import React from 'react';
import styler from 'react-styling';
const style = styler`
container
  flex:1;
  display:flex;
  width:100%;
  font-size:15
  justify-content:space-around;
  font-family: Raleway,serif;
href:
  text-decoration:none
  color:steelblue
  marginLeft:25
byline:
  marginRight:90
  color:silver
`;

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <span style={css.byline}>
          <img
            alt="beans"
            style={{ width: 20, marginRight: 10, position: 'relative', top: 5 }}
            src="https://twemoji.maxcdn.com/36x36/2728.png"
          />
          {'words 👉 data'}
        </span>
        <a style={css.href} href="https://github.com/nlp-compromise/compromise/wiki">wiki</a>
        <a style={css.href} href="https://github.com/nlp-compromise/compromise">github</a>
      </div>
    );
  }
}
module.exports = Header;
