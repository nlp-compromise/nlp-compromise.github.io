import React from 'react';
import styler from 'react-styling';
const style = styler`
container
	flex:1;
	display:flex;
	flex-direction: column;
	margin-right:50px;
	justify-content:space-around;
	font-family: Raleway,serif;
heading:
	color:steelblue;
	font-size:18px;
input
	border:1px solid whitesmoke;
	outline:none;
	height:20px;
	overflow:hidden
	margin-left:15px;
	width:100%
	border-radius:4
	color:grey
	font-size:19px
	font-family:Inconsolata
	border-bottom:3px solid #e0dada
	padding:10
	background-color:#fdfeff
	resize: none;
result
	color:palevioletred
	text-align:left;
	margin-left:30px;
	margin-top:10px
`;

class Section extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text,
      result: ''
    };
    this.css = style;
    this.onType = this.onType.bind(this)
  }
  onType() {
    let text = this.refs.input.value || ''
    let result = this.props.callback(text)
    this.setState({
      result: result,
      text: text
    })
  }
  componentDidMount() {
    this.onType()
  }
  render() {
    let {css, props, state} = this;
    return (
      <div style={css.container}>
				<div style={css.heading}>{props.header}</div>
				<textarea ref='input' style={css.input} value={state.text} onChange={this.onType}/>
		  	<div style={css.result}>{state.result}</div>
      </div>
      );
  }
}
export default Section;
