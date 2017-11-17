import React from 'react';
import styler from 'react-styling';
const style = styler`
container
  flex:1;
  display:flex;
  width:100%;
  font-size:15
  margin-top:5px;
  justify-content:space-around;
  font-family: Raleway,serif;
href:
  text-decoration:none
  color:steelblue
byline:
  color:silver
img:
  min-width: 20px,
  marginRight: 10px,
  position: relative,
  top: 5px
`;

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {css} = this;
    return (
      <div style={css.container}>
        <span style={css.byline}>
          <img
      alt='beans'
      style={css.img}
      src='https://twemoji.maxcdn.com/36x36/2728.png'
      />
          {'words 👉 data'}
        </span>
        <a style={css.href} href='https://github.com/nlp-compromise/compromise/wiki'> - wiki - </a>
        <a style={css.href} href='https://github.com/nlp-compromise/compromise'>- github -</a>
      </div>
      );
  }
}
export default Header;
