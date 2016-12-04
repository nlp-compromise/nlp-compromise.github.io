import styler from 'react-styling/flat';

const style = styler`
container
  marginTop: 9%
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
demo
  margin:50
  marginLeft:10%
  color:dimgrey
  font-size:50
  font-family:Inconsolata
input:
  border:none
  color:dimgrey
  font-size:50
  font-family:Inconsolata
  border-bottom:1px dashed lightgrey
transform
  marginTop:80
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
  left:25%
  top:15
  font-size:22
  background-color:whitesmoke
  border:1px solid lightgrey;
  border-radius:5
`;
module.exports = style
