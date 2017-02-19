import React from 'react';
import Radium from 'radium';
import styler from 'react-styling/flat';
import { docs } from '../shared/nlp';
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import '../shared/codemirror/codemirror.css';
import '../shared/codemirror/mytheme.css';
import ListIcon from 'react-icons/lib/go/list-unordered'
import HomeIcon from 'react-icons/lib/md/home'
import Logo from '../shared/logo';

const style = styler`
container
  width: 90%
  margin: 2%
collection:
  padding: 8
border
  border:1px solid whitesmoke
about
  width:100%;
  display:flex
  flex-flow:space-between
desc:
  flex:2
  flex-basis:80px
  color:grey
  margin-left:20
  padding-right:30
return:
  color:lightgrey
  font-size:12
  flex:1
class:
  color:darkred;
  font-weight:600
method:
  color:steelblue
  text-decoration:none;
  font-weight:600
  font-size:20
each:
  marginLeft:15
  paddingBottom:10
  paddingTop:10
  paddingLeft:25
  borderLeft:2px dotted lightsteelblue
  margin:40
collapse:
  color:darkgrey
  text-decoration:underline
  cursor:pointer
group:
  marginLeft:10
  marginTop:20
expand:
  text-decoration:none
  color:#81acce
fixed:
  position:relative
  width:100%
  height:75
  border-bottom:1px solid lightgrey
subline:
  color:steelblue
  font-size:15
  padding:25
home:
  margin-left:50
  color:grey
  position:relative
  top:-20px
  text-decoration:none
`;

let options = {
  readOnly: true,
  mode: 'javascript',
  theme: 'spencertheme',
  tabSize: 2,
  lint: false
};

class Docs extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: false,
      show: {}
    };
    this.css = style;
    this.renderMethod = this.renderMethod.bind(this)
    this.renderCollection = this.renderCollection.bind(this)
    this.expand = this.expand.bind(this)
    this.showOne = this.showOne.bind(this)
  }
  renderCollection(obj, section, i) {
    let {css, state} = this
    let showGroup = null
    if (state.showAll || state.show[section]) {
      showGroup = (
        <div style={[css.group]}>
          {Object.keys(obj).map((fn, o) => this.renderMethod(obj[fn], fn, o, section))}
        </div>
      )
    }
    return (
      <div key={i} id={section} style={css.collection}>
        <span style={css.collapse} onClick={() => {
        this.showOne(section)
        history.pushState(null, null, '#' + section);
      }}>
          {section + ':'}
        </span>
        {showGroup}
      </div>
    )
  }
  expand() {
    this.setState({
      showAll: !this.state.showAll
    })
  }
  showOne(str) {
    console.log(str)
    this.state.show[str] = !!!this.state.show[str]
    this.setState(this.state)
  }
  renderMethod(obj, k, i, section) {
    let {css} = this
    let id = section + '/' + k
    return (
      <div key={i} id={id} style={css.each}>
        <a href={'#' + id} style={css.method}>{'.' + k + '()'}</a>
        <div style={css.about}>
          <span style={css.desc}>{obj.desc}</span>
          <div style={css.return}>
            {'returns: '}
            <span style={css.class}>{obj.returns}</span>
          </div>
        </div>
        <div style={css.border}>
          <Codemirror style={css.code} value={obj.example} options={options}/>
        </div>
      </div>
    )
  }
  render() {
    let {css} = this;
    let generic = Object.keys(docs.generic).map((k, i) => {
      return this.renderCollection(docs.generic[k], k, i)
    })
    let subsets = Object.keys(docs.subsets).map((k, i) => {
      return this.renderCollection(docs.subsets[k], k, i)
    })
    return (
      <div style={css.container}>
        <div style={css.fixed}>
          <a href='../' style={{
        textDecoration: 'none'
      }}>
            <Logo height={10} width={150}/>
            <span style={css.home}>
              <HomeIcon size={20}/>
              {'compromise'}
            </span>
          </a>
          <br/>
          <span style={css.subline}>{'docs! '}</span>
          <a href='#' style={css.expand} onClick={this.expand}>
            <ListIcon size={22}/>
            {' show all'}
          </a>
        </div>
        <ul>
          {generic}
          {subsets}
        </ul>
      </div>
      );
  }
}
Docs = Radium(Docs);
module.exports = Docs
