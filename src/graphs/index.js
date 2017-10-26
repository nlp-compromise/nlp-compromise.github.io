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
	margin-top:80px;
	margin-bottom:20px;
hero:
	font-size:30px;
	margin-bottom:50px;
heroNumber:
	font-size:40px;
	color:steelblue;
graph:
	width:50%;
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
			{arr.map((o) => {
      return <div style={{
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
            <a style={css.link} href='https://en.wikipedia.org/wiki/Zipf%27s_law'>
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
				<div>
					<Zipf/>
				</div>
        <div>
					  <div style={css.hero}>People are obsessed with that last bit →</div>
          <div
      style={
      ([css.smaller],
      {
        marginTop: 25,
        marginBottom: 5
      })
      }
      >
				<i
      style={{
        color: '#afb5bc'
      }}
      >
				{'with some clever'}
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
            but with <b style={css.darker}>gigabyte</b> models, doing <b style={css.darker}>linear-algebra</b>, and{' '}
            <b style={css.darker}>lisp!</b> (no offence)
          </div>

				<div style={{
        fontSize: 30,
        marginBottom: 5
      }}>
					Realistically though -
					<br/>
					<span style={{
        fontSize: 15,
        color: 'grey'
      }}>{'eg. - '}</span>
					<span style={{
        fontSize: 25,
        color: 'lightgrey'
      }}>"The pope's baby steps on gays"</span>
			<div style={{
        fontSize: 17,
        color: 'grey',
        marginTop: 5
      }}>{'- '}
			<b style={{
        fontSize: 21,
        color: '#ff0000'
      }}>~10%</b>
			{' of text is just gonna be kinda ambiguous -'}</div>
				</div>
				<div style={{
        fontSize: 12,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        color: '#ff0000',
        marginTop: 5
      }}>{'- context, locale, slang, typos, subject-matter, sloppiness, time-period, class, audience, innuendo, ESL, word-play ... -'}</div>
				{makeGraph(graphs.three)}

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
              – but when you know <b>at least</b> something about your text –
            </i>
            <br />
            <i
      style={{
        marginTop: 20,
        color: '#afb5bc',
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
						- or how your users are instructed -
						</i>
						<br />
						<i
      style={{
        marginTop: 20,
        color: '#afb5bc',
        textAlign: 'center',
        fontSize: 14
      }}
      >
							that's an even bigger deal.
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
                in accuracy is practical.
              </i>
            </div>
						{'with '}
						<a
      href=''
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
        top: 0,
        left: -25,
        color: 'lightgrey'
      }}
      >
          <ul
      style={{
        color: '#8e96a0'
      }}
      >
            we've taken that part seriously.
          </ul>
          <div
      style={{
        color: 'darkgrey',
        'font-size': 14,
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
							<br/>
							{ /* it's not the best! */ }
              </b>
            </i>
          </div>
        </div>
      </div>
      );
  }
}
export default Graphs;

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
