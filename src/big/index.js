import React from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import texts from './texts';
// import nlp from 'compromise';
const nlp = window.nlp
const style = styler`
container
	flex:1;
	width:100%;
	text-align:left;
	flex-wrap:wrap;
	display:flex;
	justify-content: center;
choices:
	display:flex;
	flex-direction: column;
choice:
	padding:10px;
	font-size:15
	color:steelblue;
	border-radius:2px;
	cursor:pointer;
	border:1px solid #ededed;
	:hover
		color:palevioletred;
select:
	min-width:50%;
	font-size:17px;
left:
	width:500px
	min-width:400px
	max-width:700px
textarea:
	width:99%;
	max-width:700px
	min-width:200px
	min-height:200px
	font-size:12
	border-radius:8
	color:#C9CBD8;
result:
	min-height:50px
	width:175px;
	max-height:245px
	padding-top:10px
	margin-top:25px;
	overflow:scroll;
	border:1px solid lightgrey;
	font-family:helvetica
	font-size:12
	border-radius:8
	color:palevioletred;
count:
	font-size:15px;
	padding-right:15px;
	color:lightsteelblue;
code:
	font-size:18px;
	color:palevioletred;
	padding:6px;
	border:1px solid palevioletred;
	border-radius:5px;
thing:
	font-size:18px;
	padding-left:10px;
	color:palevioletred;
blue:
	color:#f46979;
`;
const options = [
  {
    label: 'Will Smith Lyrics',
    value: 'will_smith'
  },
  {
    label: 'Friends Episode Transcript',
    value: 'friends'
  },
  {
    label: 'Weezer lyrics',
    value: 'weezer'
  },
  {
    label: 'State of the Union \'05',
    value: 'state_of_the_union'
  },
]

const subsets = [
  {
    label: 'Topics',
    value: 'topics'
  },
  {
    label: 'Noun-phrases',
    value: 'nouns'
  },
  {
    label: 'Dates',
    value: 'dates'
  },
  {
    label: 'People',
    value: 'people'
  },
  {
    label: 'Verb-phrases',
    value: 'verbs'
  },
  {
    label: 'Values',
    value: 'values'
  },
]

class Big extends React.Component {
  constructor() {
    super();
    this.state = {
      text: texts[options[0].value],
      subset: subsets[0].value,
      result: []
    };
    this.css = style;
    this.changeText = this.changeText.bind(this)
    this.changeSubset = this.changeSubset.bind(this)
    this.onType = this.onType.bind(this)
  }
  componentDidMount() {
    this.doit()
  }
  changeText(e) {
    this.setState({
      text: texts[e.target.value] || this.state.text
    }, () => {
      this.doit()
    })
  }
  changeSubset(e) {
    this.setState({
      subset: e.target.id
    }, () => {
      this.doit()
    })
  }
  doit() {
    let {state} = this;
    let doc = nlp(state.text)
    let result = doc[state.subset]().slice(0, 100).out('frequency')
    this.setState({
      result: result
    })
  }
  onType(e) {
    this.setState({
      text: e.target.value,
    });
    this.doit()
  }
  result() {
    let {css, state} = this;
    return (
      <div style={css.result}>
			<table><tbody>{state.result.map((o, i) => {
        let count = o.count
        if (count !== 1) {
          count = 'x' + count
        } else {
          count = ''
        }
        return (<tr key={i}>
				<td style={css.thing}>
					<div>{o.normal}</div>
				</td>
				<td style={css.count}>
					<i>{count}</i>
				</td>
			</tr>)
      })}</tbody></table>
		</div>
    )
  }
  render() {
    let {css, state} = this;
    return (
      <div style={css.container}>
				<div style={css.choices}>
					<div style={{
        fontSize: 14,
        marginTop: 8,
        color: 'lightgrey'
      }}>grab the:</div>
					{subsets.map((o, i) => {
        let style = Object.assign({}, css.choice)
        if (state.subset === o.value) {
          style.color = 'palevioletred'
          style.border = '1px solid palevioletred'
        }
        return <div key={i} style={style} id={o.value} onClick={this.changeSubset}>{o.label}</div>
      })}
				</div>
      <div style={css.left}>
				<select style={css.select} onChange={this.changeText}>
					{options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
				</select>
				<textarea style={css.textarea} onChange={this.onType} value={state.text}/>
				<div style={css.code}>
					{'nlp('}
					<i style={css.blue}>{'\'text\''}</i>
				{').' + state.subset + '().slice('}
				<i style={css.blue}>{'0, 50'}</i>
				{').out('}
					<i style={css.blue}>{'\'frequency\''}</i>
			{')'}
				</div>
			</div>
			{this.result()}

      </div>
      );
  }
}
Big = Radium(Big)
export default Big;
