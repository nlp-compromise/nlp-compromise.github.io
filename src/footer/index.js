import React from 'react';
import styler from 'react-styling';
const style = styler`
container
  flex:1;
  width:100%;
  text-align:center;
  padding-top:70
  margin-bottom:20
  color:steelblue;
  font-size: 19px;
link
  color:coral
  font-size: 25px;
  text-decoration:none
  border-bottom:3px solid palevioletred
  paddingLeft:6
  paddingRight:6
  cursor:pointer
who
  color:palevioletred
  font-size: 20px;
  text-decoration:none
  cursor:pointer
table:
  display:flex
  justify-content:space-around
  width:100%
  diplay:block
space
  height:30
`;

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <div style={css.table}>
          <a style={css.link} href="https://github.com/nlp-compromise/compromise">
            {' github '}
          </a>
          <a style={css.link} href="https://www.twitter.com/nlp_compromise">
            twitter
          </a>
          <a style={css.link} href="http://slack.compromise.cool">
            slack
          </a>
        </div>
        <p> </p>
        <div style={css.space} />
        <p>
          we're cool!
          <br />
          <a style={{ ...css.link, color: 'palevioletred' }} href="https://github.com/nlp-compromise/compromise/wiki/Contributing">
            Contributing
          </a>
        </p>
        <p> </p>
        <p> </p>
        <div style={css.left}>
          compromise was made by:
          <br />
          <a style={css.who} href="http://spencermounta.in">spencer kelly</a>
          {' and '}
          <a style={css.who} href="https://github.com/nlp-compromise/compromise/graphs/contributors">contributors</a>
        </div>
        <p> </p>
        MIT
      </div>
    );
  }
}
module.exports = Footer;
