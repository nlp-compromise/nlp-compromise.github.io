import React from 'react';
import styler from 'react-styling';
import tags from './tags'
const style = styler`
main
	flex:1;
	display:flex;
	flex-direction: row;
	margin-left:50
row
	display:flex;
	flex-direction: row;
	align-items: center;
	margin-top:10px;
	position:relative;
	// border-left:1px solid lightsteelblue;
el:
	color:steelblue;
	padding-left:5
	text-align:left;
	min-width:70px;
	font-size:11px
	padding-left:10
	border-bottom:1px solid lightsteelblue;
elOne:
	color:#98b8e0;
	padding-left:5
	text-align:left;
	min-width:70px;
	font-size:10px
svg:
	position:absolute
	width:100%
	height:100%
right:
	max-width:300px;
	font-size:10px
	margin-left:100
	align-self: center;
	color:steelblue
rightOne:
	margin:5px
	color:#98b8e0
underline:
	width:70px
	font-size:12px
	margin-bottom:10px
	border-bottom:1px solid steelblue
`;

class Tagset extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
    this.makeList = this.makeList.bind(this)
  }
  makeList(obj) {
    let {css} = this;
    return Object.keys(obj).map((k) => {
      if (obj[k] === true) {
        return <div style={css.elOne}>{k}</div>
      }
      return (
        <div style={css.row}>
					<div style={css.el}>{k}</div>
					<div style={css.elOne}>{this.makeList(obj[k])}</div>
					<svg style={css.svg}>
						<line x1={'80px'} x2={'80px'} y1={'0%'} y2={'100%'} stroke={'lightsteelblue'} />
					</svg>
				</div>
      )
    })
  }
  render() {
    let {css} = this;
    return (
      <div style={css.main}>
				{this.makeList(tags.left)}
				<div style={css.right}>
					<div style={css.underline}>Other tags:</div>
					{Object.keys(tags.rest).map((t) => <div style={css.rightOne}>{t}</div>)}
				</div>
      </div>
      );
  }
}
export default Tagset;
