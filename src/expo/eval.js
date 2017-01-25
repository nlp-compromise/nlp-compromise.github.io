'use strict';
import nlp from '../shared/nlp';

const exec = (obj, callback) => {
  console.log('eval')
  //variables accessable to the eval'd code
  window.myText = obj.text || ''
  window.nlp = nlp
  try {
    let code = obj.code || ''
    code = `(function(){
      ` + code + `
    })()`
    let result = eval(code)
    callback(result, null)
  } catch (e) {
    console.log(e)
    callback(null, e)
  }
}
module.exports = exec
