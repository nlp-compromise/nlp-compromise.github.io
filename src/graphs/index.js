import React from 'react';
import styler from 'react-styling';
import Zipf from './zipf';
const style = styler`
container
	flex:1;
	display:flex;
	flex-direction: column;
	position: relative
	color:grey;
	justify-content: center;
	align-items: center;
	margin-top:50px;
	margin-bottom:20px;
	margin-left:5px
	margin-right:5px
hero:
	font-size:30px;
	margin-bottom:50px;
heroNumber:
	font-size:40px;
	color:steelblue;
graph:
	width:50%;
	min-width:250px;
	text-align:center;
	margin-top:10px;
	margin-bottom:15px;
	display:flex;
bigger:
	color:lightsteelblue;
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
darker:
	color:#f7b2b9
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

const graphs = {
  one: [{
    num: 80,
    color: 'steelblue'
  }, {
    num: 20,
    color: 'lightgrey'
  }],
  two: [{
    num: 80,
    color: 'steelblue'
  }, {
    num: 15,
    color: '#f7b2b9'
  }, {
    num: 5,
    color: 'lightgrey'
  }],
  three: [{
    num: 80,
    color: 'lightsteelblue'
  }, {
    num: 10,
    color: 'lightgrey'
  }, {
    num: 10,
    color: '#ff0000'
  }],
  four: [{
    num: 80,
    color: 'steelblue'
  }, {
    num: 12,
    color: '#be82d6'
  }, {
    num: 8,
    color: 'lightgrey'
  }]
}

const makeGraph = function(arr) {
  return (
    <div style={style.graph}>
			{arr.map((o, i) => {
      return <div key={i} style={{
          flex: o.num,
          borderBottom: '6px solid ' + o.color
        }}/>
    })}
		</div>
  )
}

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
            <a target='_parent' style={css.link} href='https://en.wikipedia.org/wiki/Zipf%27s_law'>
              {'easy to forget,'}
            </a>
            {' that'}
          </div>
          <div>
            the top <b style={css.heroNumber}> 1,000 </b> words
          </div>
          <div>
            {' '}
            are
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
            <i style={css.tricky}>( harder stuff )</i>
          </div>
        </div>
				<div style={css.hero}>People get obsessed with that end bit →</div>
				<div>
					<Zipf/>
				</div>
        <div>
          <div
      style={{
        color: 'lightgrey',
        fontSize: 17,
        marginTop: 25,
        marginBottom: 5
      }}
      >
				<i
      style={{
        color: '#afb5bc'
      }}
      >
				{'with clever'}
				<i
      style={{
        color: '#f7b2b9'
      }}
      >
					{' computer science, '}
				</i>
				{'a good '}
            <i
      style={{
        color: '#f7b2b9',
        fontSize: '25px'
      }}
      >
              +15%{' '}
            </i>
              accuracy is possible -
            </i>

          </div>
        </div>

				{makeGraph(graphs.two)}
          <div
      style={{
        color: '#afb5bc',
        marginTop: 5,
        fontSize: 15,
        marginBottom: 45
      }}
      >
            by using <b style={css.darker}>gigabyte</b> models, <b style={css.darker}>linear-algebra</b>, or{' '}
            <b style={css.darker}>lisp</b>! (no offence)
          </div>

				<div style={{
        fontSize: 22,
        marginBottom: 5
      }}>
					Really though,
					<br/>
					{ /* <span style={{
        fontSize: 15,
        color: 'darkgrey'
      }}>{'eg. - '}</span>
					<span style={{
        fontSize: 20,
        color: 'lightgrey'
      }}>{'“The pope\'s baby steps on gays”'}</span> */ }
			<div style={{
        fontSize: 17,
        color: '#afb5bc',
        marginTop: 5
      }}>{'- bout '}
			<b style={{
        fontSize: 21,
        color: '#ff0000'
      }}>~10%</b>
			{' of it is just gonna be hard, even for clever people'}
			</div>
				</div>
				<div style={{
        color: '#afb5bc',
        fontSize: 14
      }}>
					- and most solutions are <i>outside the text</i> -
				</div>
				{makeGraph(graphs.three)}
				<div style={{
        fontSize: 12,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        color: '#f7b2b9',
        fontStyle: 'italic',
        marginTop: 1
      }}>
			{'( locale, slang, subject, typos, sloppiness, time-period, class, audience, innuendo, ESL )'}
		</div>
				{ /* <div style={{
        color: '#afb5bc',
        fontSize: 14
      }}>
					over-fitting for tests just sucks.
				</div> */ }
        <div
      style={{
        textAlign: 'center'
      }}
      >
          <div style={{
        marginTop: 30
      }}>
            <i
      style={{
        color: '#8e96a0'
      }}
      >
              – <span style={{
        fontSize: 25,
        color: 'grey'
      }}>but,</span> if you know <b>at least</b> something about your text –
            </i>
            <br />
            <i
      style={{
        marginTop: 20,
        color: '#afb5bc',
        marginRight: -150,
        textAlign: 'center',
        fontSize: 14
      }}
      >
              that's a big deal.
            </i>
            <br />
						<i
      style={{
        marginTop: 25,
        color: '#8e96a0'
      }}
      >
						- or what your users are expecting -
						</i>
						<br />
						<i
      style={{
        marginTop: 20,
        color: '#afb5bc',
        marginRight: -200,
        textAlign: 'center',
        fontSize: 14
      }}
      >
							(that's an even bigger deal.)
						</i>
            <div
      style={{
        marginTop: 15,
        marginBottom: 10
      }}
      >
              <i
      style={{
        color: '#8e96a0',
        fontSize: '18px'
      }}
      >
                a{' '}
              </i>
              <i
      style={{
        color: '#be82d6',
        fontSize: '25px'
      }}
      >
                10%-12% bump{' '}
              </i>
              <i
      style={{
        color: '#8e96a0',
        fontSize: '22px'
      }}
      >
                in accuracy is realistic.
              </i>
            </div>
						{'using '}
						<a
      href='https://github.com/nlp-compromise/compromise/wiki/plugins'
      style={{
        color: '#be82d6',
        marginBottom: 15,
        textDecoration: 'none'
      }}
      >
	            config, plugins, and customization.
	          </a>
          </div>
        </div>

								{makeGraph(graphs.four)}
        <div
      style={{
        position: 'relative',
        minWidth: 300,
        top: 0,
        color: 'lightgrey'
      }}
      >
          <ul
      style={{
        color: '#8e96a0'
      }}
      >
            and we've taken that part seriously.
          </ul>

					<div style={{
        fontSize: 22,
        marginBottom: 5,
        color: 'grey'
      }}>
						This way, the whole thing is <b>~200kb</b>.
						<div style={{
        fontSize: 15
      }}>(about the same as jQuery)</div>
					</div>
					<div
      style={{
        color: 'darkgrey',
        position: 'relative',
        paddingLeft: 150
      }}
      >
					<i>
					<b
      style={{
        color: 'lightsteelblue'
      }}
      >
						compromise !
					</b>
					</i>
					</div>
        </div>
      </div>
      );
  }
}
export default Graphs;
