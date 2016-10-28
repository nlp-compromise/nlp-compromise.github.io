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
    'bush_2004',
    'bush_2005',
    'bush_2006',
    'bush_2007',
    'bush_2008',
    'obama_2009',
    'obama_2010',
    'obama_2011',
    'obama_2012',
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
`;

class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.css = style;
    this.makeDots = this.makeDots.bind(this);
  }
  makeDots() {
    let {props, css} = this;
    let [ns, title] = props.src.split('/');
    let dots = sources[ns] || [];
    dots = dots.map((d) => {
      let more = {};
      if (title === d) {
        more = css.selected_dot;
      }
      return <span style={[css.dot, more]} onClick={() => props.cmp.setText(ns + '/' + d)}/>;
    });
    return <span style={css.dots}>{dots}</span>;
  }
  render() {
    let {props, css} = this;
    console.log(props.src);
    let ns = props.src.replace(/\/.*/, '');
    let title = ns.replace(/_/g, ' ');
    return (
      <div>
        {'🔽'}
        <span style={css.src}>{title + ':'}</span>
        {this.makeDots(props.src)}
      </div>
      );
  }
}
Source = Radium(Source);
module.exports = Source;
