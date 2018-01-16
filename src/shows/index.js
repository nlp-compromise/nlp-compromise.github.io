import React from 'react';
import styler from 'react-styling';
import Section from './section';
// import nlp from 'compromise';
const nlp = window.nlp
const style = styler`
container
	flex:1;
	display:flex;
	flex-direction: column;
	margin-top:50px;
	width:100%;
	justify-content:space-around;
	font-family: Raleway,serif;
row
	display:flex;
	flex-wrap: wrap;
	justify-content:space-around;
	flex-direction: row;
section
	min-height:140px
	width:400px
`;

class Shows extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  pastTense(txt) {
    let doc = nlp(txt)
    doc.verbs().toPastTense()
    return doc.out('text')
  }
  numberParse(txt) {
    let doc = nlp(txt)
    doc.values().toNice()
    return doc.out('text')
  }
  toNegative(txt) {
    let doc = nlp(txt)
    doc.verbs().toNegative()
    return doc.out('text')
  }
  toPlural(txt) {
    let doc = nlp(txt)
    doc.nouns().toPlural()
    return doc.out('text')
  }
  render() {
    let {css} = this;
    return (
      <div id='demo' style={css.container}>
				<div style={css.row}>
					<div style={css.section}>
						<Section header='Convert to past-tense:' text='I’m lookin’ for Amanda Hugginkiss' callback={this.pastTense}/>
					</div>
					<div style={css.section}>
						<Section header='Parse text numbers:' text='seventeen thousand and forty-two' callback={this.numberParse}/>
					</div>
				</div>
				<div style={css.row}>
					<div style={css.section}>
						<Section header='Change to a negative:' text='keep on rocking in the free world' callback={this.toNegative}/>
					</div>
					<div style={css.section}>
						<Section header='Turn into plural-form:' text='the purple dinosaur' callback={this.toPlural}/>
					</div>
				</div>
      </div>
      );
  }
}
export default Shows;
