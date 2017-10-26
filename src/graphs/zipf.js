import React from 'react';
import styler from 'react-styling';
import { line, curveMonotoneX } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
const style = styler`
container
	flex:1;
	display:flex;
	width:100%;
	flex-direction: column;
	color:lightgrey;
	margin-top:20px;
	margin-bottom:20px;
darker:
	color:lightsteelblue
pullOver:
	margin-left:-30px;
	margin-bottom:15px;
middle:
	margin-left:75px;
	font-size:15px;
`;

class Zipf extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.css = style;
  }
  render() {
    let {css} = this;
    let width = 550
    let height = 150
    let len = 1200
    let yScale = scaleLinear().range([height, 0]).domain([0, 11])
    let xScale = scaleLinear().range([0, width]).domain([1, len])

    //https://www.britannica.com/topic/Zipfs-law
    const zipf = function(r) {
      return 0.1 / r
    }
    let arr = []
    let sum = 0
    for (let i = 1; i <= len; i += 1) {
      let num = zipf(i) * 100
      sum += num
      arr.push({
        x: xScale(i),
        y: yScale(num),
        sum: sum
      })
    }
    console.log(arr)
    let lines = [
      {
        i: 100,
        percent: 50
      },
      {
        i: 300,
        percent: 63
      },
      {
        i: 600,
        percent: 70
      },
      {
        i: 1150,
        text: '~1,000',
        percent: 80
      }
    ]
    lines = lines.map((o) => {
      let x = xScale(o.i)
      return (<g>
				<text x={x - 10} y={45} fontSize='18' stroke='none' fill='darkgrey' text-anchor='middle'>{o.text || o.i}</text>
				<text x={x - 10} y={57} fontSize='10' stroke='none' fill='darkgrey' text-anchor='middle'>{'words'}</text>
				<text x={x + 5} y={90} fontSize='14' stroke='none' fill='darkgrey' text-anchor='middle'>{o.percent + '%'}</text>
				<text x={x + 8} y={105} fontSize='10' stroke='none' fill='darkgrey' text-anchor='middle'>of english</text>
				<text x={x + 5} y={118} fontSize='12' stroke='none' fill='darkgrey' text-anchor='middle'>{'←'}</text>
				<line stroke='lightgrey' x1={x} y1='42%' x2={x} y2='90%'/>
			</g>
      )
    })

    const path = line().x(d => d.x).y(d => d.y).curve(curveMonotoneX)(arr);
    return (
      <div style={css.container}>
				<i style={css.pullOver}>
					honestly,
					<br/>
					this graph is silly:</i>
				<div>
					<svg width={width} height={height} style={{
        overflow: 'visible'
      }}>
						{lines}
						<line stroke='darkgrey' x1='0' y1='0' x2='0' y2='100%'/>
						<text x={'-33'} y={yScale(9)} fontSize='14' stroke='none' fill='darkgrey'>{'7% -'}</text>
						<text x={'-33'} y={yScale(5)} fontSize='14' stroke='none' fill='darkgrey'>{'5% -'}</text>
						{ /* <text x={'-35'} y={yScale(2.5)} fontSize='14' stroke='none' fill='darkgrey'>{'2.5 %'}</text> */ }
						<path d={path} stroke={'#2ebfe8'} strokeWidth={3} fill='none' shapeRendering='auto' />
						<line stroke='darkgrey' x1='0' y1='100%' x2='100%' y2='100%'/>
					</svg>
				</div>
				<i style={css.middle}>{'← common words'}</i>
  		</div>
      );
  }
}
export default Zipf;
