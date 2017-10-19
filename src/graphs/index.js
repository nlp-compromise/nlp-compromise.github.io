import React from 'react';
import styler from 'react-styling';
const style = styler`
container
	flex:1;
	display:flex;
	flex-direction: column;
	color:grey;
	justify-content: center;
	align-items: center;
	margin-top:80px;
	margin-bottom:80px;
hero:
	font-size:30px;
	margin-bottom:50px;
heroNumber:
	font-size:40px;
	color:steelblue;
graph:
	width:50%;
	text-align:center;
	margin-bottom:50px;
	display:flex;
bigger:
	color:steelblue;
	font-size:30px;
	margin-bottom:5px;
number:
	color:lightgrey;
	font-size:30px;
	margin-bottom:5px;
smaller:
	color:lightgrey;
	font-size:17px;
	margin-bottom:15px;
tricky:
	color:#f7b2b9;
	font-size:15px;
	margin-bottom:5px;
left:
	flex: 80
	display: flex;
	flex-direction: column;
	borderBottom:6px solid steelblue;
right:
	flex: 20
	display: flex
	flex-direction: column;
	justify-content: flex-end;
	borderBottom:6px solid lightgrey;
link:
	color:lightsteelblue;
	text-decoration:none;
`;

class Graphs extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {css} = this;
    return (
      <div style={css.container}>
				<div style={css.hero}>
					<div style={css.smaller}>
						{'it\'s '}
						<a style={css.link} href='https://en.wikipedia.org/wiki/Zipf%27s_law'>
						  {'easy to forget,'}
					  </a>
						 {' that'}
					 </div>
					<div>the top <b style={css.heroNumber}> 1,000 </b> words</div>
					<div> do
						<b style={css.heroNumber}> 80% </b>
						of english
					</div>
				</div>
				<div style={css.graph}>
					<div style={css.left}>
						<div style={css.bigger}> – easy – </div>
						<div style={css.smaller}>unambiguous, common speech</div>
					</div>
					<div style={css.right}>
						<div style={css.number}> 20% </div>
						<i style={css.tricky}>– tricky stuff –</i>
					</div>
				</div>
				<div >
					<div style={css.smaller}>
						<i style={{
        color: '#f7b2b9',
        fontSize: '20px'
      }}>~15% </i>
			<i>have solutions in some </i>
			<i style={{
        color: '#f7b2b9',
      }}>complex computer science 💪</i>
					</div>
				</div>
					<div style={css.graph}>
						<div style={{
        flex: 80,
        borderBottom: '6px solid lightsteelblue'
      }}/>
						<div style={{
        flex: 15,
        borderBottom: '6px solid #DE6169'
      }}/>
						<div style={{
        flex: 5,
        borderBottom: '6px solid lightgrey'
      }}/>
			  </div>
				<div style={{
        color: 'lightgrey',
      }}>
					but that can mean terabytes, or linear-algebra, or prolog.
				</div>
      </div>
      );
  }
}
module.exports = Graphs;

{
  /* <div style={{
  width: '100%',
  borderRadius: 5,
  paddingRight: 5,
  backgroundColor: 'steelblue'
  }}/> */
}
{
  /* <div style={{
  flex: 1,
  borderRadius: 5,
  backgroundColor: 'lightgrey'
  }}/> */
}
