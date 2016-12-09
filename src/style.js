import styler from 'react-styling/flat';

const style = styler`
container
  marginTop: 50
  padding: 8
headline:
  color:steelblue;
  font-size:34
  marginLeft:20%
headline2
  color:lightgrey
  font-size:30
  marginLeft:25%
headline3
  color:palevioletred
  font-size:30
  marginLeft:25%
  marginTop:25
param:
  color:palevioletred
  font-size:30
  marginLeft:15
demo
  margin:15
  marginLeft:50
  marginBottom:35
  color:dimgrey
  font-size:50
  font-family:Inconsolata
input:
  border:none
  color:dimgrey
  font-size:50
  font-family:Inconsolata
  border-bottom:1px dashed lightgrey
  background-color:#fdfeff
transform
  marginTop:30
  marginBottom:0
  marginLeft:30
  color:steelblue
  font-size:20
  font-weight:500
  font-family:Inconsolata
orange:
  color: #f39c73
freshprince:
  position:relative
  marginTop:100
  marginLeft:200
spacer:
  padding:60
code:
  color:dimgrey
  display:inline
  padding:2
  paddingLeft:7
  paddingRight:7
  position:relative
  marginLeft:90
  top:10
  font-size:22
  background-color:whitesmoke
  border:1px solid lightgrey;
  border-radius:5
install:
  position:relative
  marginTop:50
  display:flex
  flex-flow:center
  padding:25
  margin:125
mode:
  border:1px solid lightgrey
  flexGrow:1
  flex-basis:5
  margin:20
`;
module.exports = style
