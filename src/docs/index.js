import Radium from 'radium';
import React from 'react';
import styler from 'react-styling';
import docs from './docs';
const style = styler`
top
	margin-top:60
container
	flex:1;
	margin-left:50
	margin-right:50
	margin-top:10
	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
	text-align:center
	justify-content: center;
list:
	flex-shrink:1
	border:1px solid grey;
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
heading:
	font-size:27px;
	color:darkgrey;
	margin-left:150px
	margin-top:150px
	margin-bottom:5
title:
	text-decoration:underline;
	font-weight:500;
`;

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
    this.makeCol = this.makeCol.bind(this)
  }
  makeCol(obj, title) {
    let {css} = this;
    let list = Object.keys(obj).map((k, i) => {
      return <div key={i} style={css.doc}>{k}</div>
    })
    return (<div style={css.list}>
			<div style={css.title}>{title}</div>
			{list}
		</div>)
  }
  render() {
    let {css} = this;
    return (
      <div style={css.top}>
				<span style={css.heading}>API:</span>
	      <div style={css.container}>
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
      </div>
      );
  }
}

Docs = Radium(Docs);
export default Docs;
