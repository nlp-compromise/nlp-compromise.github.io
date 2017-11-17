import React from 'react';
import nlp from 'compromise';
import styler from 'react-styling';
import Term from './term';

const style = styler`
container
  display:block;
  position:relative;
  padding-top:25px
  padding-left:5px
  padding-right:5px
  marginTop:25
  marginBottom:0
  justify-content: center;
  min-height:200
  text-align:center;
  border-left:5px solid #b3d3c6
inputContainer:
  position:relative;
  text-align:center
  align-self: center;
  text-align:center;
  min-width:300px
input:
  max-width:800px
  text-align:center;
  align-self: center;
  border:1px solid whitesmoke;
  outline:none;
  min-height:30px;
  margin-left:5%
  margin-right:5%
  width:90%
  border-radius:4
  color:dimgrey
  font-size:30
  font-family:Inconsolata
  border-bottom:3px dotted #e0dada
  padding:12
  background-color:#fdfeff
  resize: none;
loader:
  display:block;
  position:relative;
  top:-7
  z-index:2
  background-color:lightsteelblue
  height:3
terms
  display:flex;
  flex-direction: row;
  justify-content: center;
  max-width:100%;
  flex-wrap:wrap;
  marginTop:0
  padding:0
  color:#b4adad
  text-align:center;
  font-family:Inconsolata
  fontSize:27
`;

class Small extends React.Component {
  constructor() {
    super();
    this.duration = 4000;
    this.wait = 3000;
    this.state = {
      text: 'Wee-ooh, i look just like Buddy Holly', //'Wee-ooh, i look just like Buddy Holly',
      started: null,
      index: 0,
      progress: 0,
      dirty: true,
      raf: null
    };
    this.css = style;
    this.tick = this.tick.bind(this);
    this.onType = this.onType.bind(this);
    this.onClick = this.onClick.bind(this);
    this.startTicker = this.startTicker.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  componentDidMount() {
    this.startTicker();
    setTimeout(() => {
      this.refs.input.focus();
    }, 100);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.raf);
  }
  startTicker() {
    setTimeout(() => {
      this.setState({
        started: Date.now(),
        raf: requestAnimationFrame(this.tick)
      });
    }, this.wait);
  }
  changeText() {
    let state = this.state;
    let arr = [
      `Wayne's world! Party time! Excellent!
 Woo woo woo!`,
      'So I tied an onion to my belt, which was the style at the time.',
      'We understand Homer, after all we are from the land of chocolate.',
      'And I say England\'s greatest Prime Minister was Lord Palmerston!',
      'I am the very model of a modern major general.',
      'And how come Batman doesn\'t dance anymore?\n Remember the Batusi?',
      'we should all be more like little Ruttiger',
      'it was the blurst of times?',
      'Marge, is Lisa at Camp Granada?',
      'The Aurora Borealis? At this time of year?',
      'There\'s a 4:30 in the morning now?',
      'You got anything written from the vampire\'s point of view?',
      'Lisa needs braces. Dental plan!',
      'Anytime I hear the wind blow it will whisper the name...Edna',
      'The bong-rattling bass of Mel Schacher? The competent drum work of Don Brewer?',
      'Who controls the British crown? Who keeps the metric system down?',
      'That may not sound impressive, but keep in mind it is a very big canyon.',
      'my name is Otto, and i love to get blotto',
      'staring at my sandals, oh you better believe that\'s a paddlin\'',
      'sex cauldron? I thought they closed that place down.',
      'Careful! They’re RUFFLED!!',
    ];
    this.wait = 6500;
    this.setState({
      index: state.index + 1,
      text: arr[state.index % arr.length]
    });
  }
  tick() {
    let state = this.state;
    let diff = Date.now() - state.started;
    if (state.dirty) {
      cancelAnimationFrame(this.tick)
      return
    }
    if (diff < this.duration) {
      requestAnimationFrame(this.tick);
      let alpha = diff / this.duration;
      this.setState({
        progress: alpha
      });
    } else {
      console.log('done-');
      this.setState({
        progress: 0
      });
      this.changeText();
      this.startTicker();
    }
  }
  onType(e) {
    this.setState({
      dirty: true,
      text: e.target.value,
      progress: 0
    });
  }
  onClick(e) {
    this.setState({
      dirty: true,
      text: e.target.value,
      progress: 0
    });
  }
  render() {
    let {css, state} = this;
    let doc = nlp(state.text);
    let height = 30;
    if (state.text.length > 40) {
      height = 60;
    }
    let terms = []
    doc.list.forEach((ts) => {
      ts.terms.forEach((t) => terms.push(t))
    })
    return (
      <div style={css.container}>
        <div style={css.inputContainer}>
          <textarea className='resizer' spellCheck='false' ref='input' style={{
        ...css.input,
        height: height
      }} value={state.text} onChange={this.onType} onClick={this.onClick}/>
          <div style={{
        ...css.loader,
        width: state.progress * 100 + '%'
      }} />
        </div>
        <div style={{
        fontSize: 35,
        color: '#cc9696'
      }}>{'👇'}</div>
        { /* <svg fill="steelblue" height="40" width="30" viewBox="0 0 40 40" style={{ verticalAlign: 'middle' }}>
          <g>
            <path d="m28.6 29q0.2 0.4-0.1 0.8l-7.9 8.6q-0.2 0.2-0.5 0.2-0.3 0-0.5-0.2l-7.9-8.6q-0.3-0.4-0.1-0.8 0.2-0.4 0.6-0.4h5v-27.9q0-0.3 0.2-0.5t0.5-0.2h4.3q0.3 0 0.5 0.2t0.2 0.5v27.9h5q0.5 0 0.7 0.4z" />
          </g>
        </svg> */ }
        <div style={css.terms}>
          {terms.map((term, i) => <Term key={i} term={term} i={i}/>)}
        </div>
      </div>
      );
  }
}
export default Small;
