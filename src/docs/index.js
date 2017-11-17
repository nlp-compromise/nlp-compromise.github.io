import Radium from 'radium';
import React from 'react';
import styler from 'react-styling';
import docs from './docs';
const style = styler`
container
	flex:1;
	margin-left:50
	margin-right:50
	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
	text-align:center
	justify-content: center;
list:
	display:flex;
	flex-shrink:1
	border:1px solid grey
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
`;

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
    this.makeCol = this.makeCol.bind(this)
  }
  makeCol(obj) {
    let {css} = this;
    let list = Object.keys(obj).map((k, i) => {
      return <div key={i} style={css.doc}>{k}</div>
    })
    return <div style={css.list}>{list}</div>
  }
  render() {
    let {css} = this;
    return (
      <div >
				<span style={css.heading}>API:</span>
	      <div style={css.container}>
	      	{this.makeCol(docs.match)}
	      	{this.makeCol(docs.array)}
					{this.makeCol(docs.misc)}
	      	{this.makeCol(docs.nouns)}
	      	{this.makeCol(docs.sentences)}
	      	{this.makeCol(docs.values)}
	      	{this.makeCol(docs.verbs)}
	      	{this.makeCol(docs.parts)}
	      	{this.makeCol(docs.others)}
	      </div>
      </div>
      );
  }
}

Docs = Radium(Docs);
export default Docs;
