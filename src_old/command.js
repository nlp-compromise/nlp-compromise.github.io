const React = require('react')
const hljs = require('highlight.js')
const r = require('r-dom');

class Cmd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmd: `nlp().nouns().toPlural('fun')`
    };
    this.css = {
      cmd: {
        backgroundColor: 'white'
      }
    };
  }
  componentDidUpdate() {
    let el = document.getElementById('cmd');
    hljs.highlightBlock(el);
  }
  render() {
    let css = this.css;
    let state = this.state;
    return r.pre({
      id: 'cmd',
      style: css.cmd
    }, [
      state.cmd
    ])
  }
}
module.exports = Cmd;
