import React from 'react';
import nlp from 'compromise';
import styler from 'react-styling';
import Terms from './terms';

const style = styler`
container
  display:block;
  position:relative;
  padding:50
  marginTop:25
  marginBottom:50
  min-height:200
  text-align:center;
  border-left:5px solid #b3d3c6
inputContainer:
  position:relative;
  text-align:center
  width:70%
  margin-left:15%
  min-width:600
input:
  text-align:center;
  border:1px solid whitesmoke;
  outline:none;
  height:30px;
  overflow:hidden
  width:100%
  border-radius:4
  color:dimgrey
  font-size:30
  font-family:Inconsolata
  border-bottom:3px dotted #e0dada
  padding:10
  background-color:#fdfeff
  resize: none;
loader:
  display:block;
  position:relative;
  top:-7
  z-index:2
  background-color:lightsteelblue
  height:3
`;

class Small extends React.Component {
  constructor() {
    super();
    this.duration = 4000;
    this.wait = 3000;
    this.state = {
      text: 'Wee-ooh, i like just like Buddy Holly',
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
      'Lisa needs braces. Dental plan!',
      'I am the very model of a modern major general.',
      'sex cauldron? I thought they closed that place down.',
      'And how come Batman doesn\'t dance anymore?\n Remember the Batusi?',
      'it was the blurst of times?',
      'Careful! They’re RUFFLED!!'
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
    return (
      <div style={css.container}>
        <div style={css.inputContainer}>
          <textarea ref='input' style={{
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
      }}>👇</div>
        { /* <svg fill="steelblue" height="40" width="30" viewBox="0 0 40 40" style={{ verticalAlign: 'middle' }}>
          <g>
            <path d="m28.6 29q0.2 0.4-0.1 0.8l-7.9 8.6q-0.2 0.2-0.5 0.2-0.3 0-0.5-0.2l-7.9-8.6q-0.3-0.4-0.1-0.8 0.2-0.4 0.6-0.4h5v-27.9q0-0.3 0.2-0.5t0.5-0.2h4.3q0.3 0 0.5 0.2t0.2 0.5v27.9h5q0.5 0 0.7 0.4z" />
          </g>
        </svg> */ }
        <Terms result={doc} />
      </div>
      );
  }
}
module.exports = Small;
