import React from 'react';
import styler from 'react-styling';
import tags from './tags'
import CodeMirror from '../lib/codemirror';
const style = styler`
main
	flex:1;
	display:flex;
	flex-direction: row;
	flex-wrap:wrap;
	margin-left:50
row
	display:flex;
	flex-direction: row;
	align-items: center;
	margin-top:10px;
	margin-bottom:10px;
	// padding-bottom:5px;
	position:relative;
	// border-left:1px solid lightsteelblue;
el:
	color:steelblue;
	// padding-left:5
	// padding-left:5
	margin-bottom:5
	text-align:left;
	min-width:70px;
	font-size:11px
	padding-left:10
	border-bottom:1px solid lightsteelblue;
elOne:
	color:#98b8e0;
	padding-left:5
	padding-top:2
	padding-bottom:2
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
	margin-top:40
	margin-bottom:40
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
byline:
	margin-top:20
	margin-left:20
	color:grey
clever:
	color:lightgrey
	font-size:17px
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
    return Object.keys(obj).map((k, i) => {
      if (obj[k] === true) {
        return <div key={i} style={css.elOne}>{k}</div>
      }
      return (
        <div id='tags' style={css.row}>
					<div style={css.el}>{k}</div>
					<div style={css.elOne}>{this.makeList(obj[k])}</div>
					<svg style={css.svg}>
						<line x1={'80px'} x2={'80px'} y1={'0%'} y2={'100%'} stroke={'lightsteelblue'} />
						<line x1={'80px'} x2={'90px'} y1={'100%'} y2={'100%'} stroke={'lightsteelblue'} />
						<line x1={'80px'} x2={'90px'} y1={'0%'} y2={'0%'} stroke={'lightsteelblue'} />
					</svg>
				</div>
      )
    })
  }
  render() {
    let {css} = this;
    let example = `var doc = nlp('foot')

doc.tag('Foo')
doc.out('tags')
// Noun, Singular, Foo

doc.tag('PresentTense')
doc.out('tags')
// Verb, PresentTense, Foo`
    return (
      <div>
				<div style={css.byline}>These are the things it can figure out on its own:</div>
	      <div style={css.main}>
					{this.makeList(tags.left)}
					<div style={css.right}>
						<div style={css.underline}>Other tags:</div>
						{Object.keys(tags.rest).map((t) => <div style={css.rightOne}>{t}</div>)}
					</div>
					<div style={css.right}>
						<div style={css.clever}>and it's clever about this stuff:</div>
					  <CodeMirror type={'js'} readOnly={true} code={example} />
					</div>
	      </div>
      </div>
      );
  }
}
export default Tagset;
