'use strict'
import React from 'react';
import styler from 'react-styling/flat';
import Radium from 'radium';

const sources = {
  weezer: [
    'holiday',
    'inthegarage',
    'buddyholly',
    'mynameisjonus',
    'nooneelse',
    'nootherone',
    'onlyindreams',
    'sayitaintso',
    'surfwaxamerica',
    'sweatersong',
    'worldhasturned'
  ],
  fleetwood_mac: [
    'dontstop',
    'dreams',
    'everywhere',
    'golddustwoman',
    'goyourownway',
    'landslide',
    'rhiannon',
    'sevenwonders',
    'thechain'
  ],
  state_of_the_union: [
    'clinton_1999',
    'clinton_2000',
    'bush_2001',
    'bush_2002',
    'bush_2003',
    'bush_2006',
    'bush_2007',
    'bush_2008',
    'obama_2009',
    'obama_2013',
    'obama_2014',
    'obama_2015'
  ],
  friends: [
    '05-04',
    '05-05',
    '05-06',
    '05-07',
    '05-08',
    '05-09',
    '05-10',
    '05-11',
    '05-12'
  ]
};

const style = styler`
src
  color:steelblue
  cursor:pointer
  text-decoration:underline
  fontSize:18
dots
  marginLeft:15
dot
  display:inline-block
  border-radius:50%
  background-color:lightgrey
  cursor:pointer
  width:5
  height:5
  margin:5
selected_dot
  background-color:steelblue
  height:8
  width:8
choose
  position:relative
  display:block
  width:400
  marginLeft:25
choice
  background-color:white
  color:steelblue
  cursor:pointer
  margin:5
  line-height:130%
  border-bottom:1px dashed lightsteelblue
  :hover
    background-color:steelblue
    color:white
arrow
  border-color:#999 transparent transparent
  border-style:solid
  border-width:5px 5px 0
  content:' '
  display:block
  height:0
  margin-top:-ceil(2.5)
  width:0
arrow_right
  color:#999
  margin:15
  font-size:12
`;

class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.css = style;
    this.makeDots = this.makeDots.bind(this);
    this.choose = this.choose.bind(this);
    this.showOne = this.showOne.bind(this);
  }
  makeChoice(k) {
    this.setState({
      expand: false
    });
    let arr = sources[k];
    let r = parseInt(Math.random() * arr.length - 1, 10);
    let src = k + '/' + arr[r];
    console.log('==' + src);
    this.props.cmp.setText(src);
  }
  choose() {
    let {props, css} = this;
    let choices = Object.keys(sources).map((k, i) => {
      return (
        <div key={i} style={css.choice} onClick={this.makeChoice.bind(this, k)}>
          {k}
          {this.makeDots(k)}
        </div>
        );
    });
    return (
      <div style={css.choose}>
        <span style={[css.arrow, css.up_arrow]} />
        {choices}
      </div>
      );
  }
  makeDots(src) {
    let {props, css} = this;
    let [ns, title] = src.split('/');
    let dots = sources[ns] || [];
    dots = dots.map((d, i) => {
      let more = {};
      if (title === d) {
        more = css.selected_dot;
      }
      return <span key={i} style={[css.dot, more]} onClick={() => props.cmp.setText(ns + '/' + d)} />;
    });
    return <span style={css.dots}>{dots}</span>;
  }
  showOne() {
    let {props, state, css} = this;
    let ns = props.src.replace(/\/.*/, '');
    let title = ns.replace(/_/g, ' ');
    return (
      <div>
        <span onClick={() => this.setState({
        expand: true
      })}>
        <span style={{}}>
          {'▶️'}
        </span>
        <span style={css.src}>
          {'texts/' + title}
        </span>
        </span>
        {this.makeDots(props.src)}
      </div>
      );
  }
  render() {
    let {props, state, css} = this;
    if (!state.expand) {
      return this.showOne();
    }
    return this.choose();
  }

}
Source = Radium(Source);
module.exports = Source;
