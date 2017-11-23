import Radium from 'radium';
import React from 'react';
import styler from 'react-styling';
import docs from './docs';
import CodeMirror from '../lib/codemirror';
const style = styler`
top
	margin-top:60
container
	display:flex;
	flex-wrap:wrap;
	flex-direction: row;
	justify-content: flex-start;
left
	margin-left:50
	margin-right:50
	margin-top:10
	display:flex;
	flex-direction: column;
	text-align:center
	justify-content: center;
	border:1px solid lightgrey;
	border-radius:5px;
right:
	margin-left:15px;
list:
	flex-shrink:1
	width:160px;
	height:30px
	transition: height 1s;
	border:1px solid lightgrey;
	max-height:260px;
	overflow-y:scroll;
	flex-direction: column;
	flex-wrap: wrap;
	text-align:left
doc:
	margin:10
	font-size:12px;
	max-width:150px
	min-width:150px
	padding-left:15px
	cursor:pointer
	text-decoration:none;
heading:
	font-size:27px;
	color:darkgrey;
	margin-left:150px
	margin-top:150px
	margin-bottom:5
title:
	color:steelblue
	margin-left:10px
	cursor:pointer
	margin-top:5px
	font-weight:600;
`;

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'Matching',
      doc: {
        desc: 'zoom-in to a subset of the text, using a regex-like match statement',
        returns: 'Text',
        example: `var str = 'we understand, we are from the land of chocolate'
nlp(str).match('land of #Noun').out('text')
// 'land of chocolate'`,
        title: 'match()'
      }
    };
    this.css = style;
    this.makeCol = this.makeCol.bind(this)
  // this.onClick = this.onClick.bind(this)
  }
  clickTitle(str) {
    let {state} = this
    if (state.current === str) {
      this.setState({
        current: null
      })
    } else {
      this.setState({
        current: str
      })
    }
  }
  clickMethod(obj, title) {
    obj.title = title
    this.setState({
      doc: obj
    })
  }
  makeCol(obj, title) {
    let {css, state} = this;
    let list = Object.keys(obj).map((k, i) => {
      let s = Object.assign({}, css.doc)
      if (state.doc.title === k) {
        s.color = 'black'
        s.fontWeight = 'bold'
        s.textDecoration = 'underline'
      } else {
        s.textDecoration = 'none'
      }
      return <div key={i} onClick={() => this.clickMethod(obj[k], k)} style={s}>{k}</div>
    })
    let style = Object.assign({}, css.list)
    if (state.current === title) {
      style.height = null
    // style.textDecoration = 'underline'
    }
    return (
      <div style={style}>
				<div style={css.title} onClick={() => this.clickTitle(title)}>{title}</div>
				{list}
			</div>
    )
  }
  render() {
    let {css, state} = this;
    return (
      <div style={css.top}>
				<span style={css.heading}>API:</span>
	      <div style={css.container}>
		      <div style={css.left}>
		      	{this.makeCol(docs.match, 'Matching')}
		      	{this.makeCol(docs.array, 'Array')}
						{this.makeCol(docs.misc, 'Changes')}
		      	{this.makeCol(docs.nouns, 'Nouns')}
		      	{this.makeCol(docs.sentences, 'Sentences')}
		      	{this.makeCol(docs.values, 'Values')}
						{this.makeCol(docs.contractions, 'Contractions')}
		      	{this.makeCol(docs.verbs, 'Verbs')}
		      	{this.makeCol(docs.ngrams, 'Ngrams')}
		      	{this.makeCol(docs.others, 'Others')}
		      </div>
					<div style={css.right}>
						<h2>{'.' + state.doc.title}</h2>
						<div>{state.doc.desc}</div>
            <CodeMirror type={'js'} readOnly={true} code={state.doc.example} />
					</div>
	      </div>
      </div>
      );
  }
}

Docs = Radium(Docs);
export default Docs;
