import React from 'react';
import styler from 'react-styling';
const style = styler`
container
  flex:1;
  padding-top:200
  padding-bottom:100
  display:flex;
  position:relative;
  font-size:15
  justify-content:space-around;
  border:1px solid red;
  font-family: Raleway,serif;
main:
  color:steelblue;
  white-space:nowrap;
  font-size:34
  line-height:105%
mono:
  letter-spacing: 3px;
small:
  line-height:90%
  font-size:14
  margin-right:-4
name:
  font-size:34
  color:#f39c73;
sub:
  white-space:nowrap;
  font-size:30
  line-height:105%
grey:
  color:lightgrey
  font-size:30
  marginTop:10px
  marginBottom:15px
  marginLeft:25%
orange:
  color:#f39c73
blue:
  color:steelblue;
red:
  color:palevioletred
`;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let { css } = this;
    return (
      <div style={css.container}>
        <div>
          <div style={{ ...css.main }}>
            <span style={css.small}>{'yaknow, '}</span>
            <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
            <br />
            {' language is cѳmplicated.'}
          </div>
          <div style={{ ...css.sub, ...css.grey }}>
            {"and there's a gazillion words."}
          </div>
          <div style={{ ...css.main }}>
            <span style={css.name}>{'compromise'}</span>
            {' is a '}
            <span style={{}}>{'javascript library'}</span>
            <br />
            {' that interprets and '}
            <b style={css.red}>{'pre-parses'}</b>
            {' english.'}
          </div>
          <ul style={{ ...css.main, ...css.orange, fontSize: 20, textAlign: 'center', ...css.mono }}>
            - and makes some reasonable decisions -
          </ul>
          <div style={{ ...css.sub, ...css.red }}>
            {'so things are easier'}
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Main;
