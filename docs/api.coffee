module.exports=
  render:
    plainText:
      desc:'a perfect reproduction of the original input text, with any changes'
    asHtml:
      params:[
        'a list of tags to use as classNames (default to all)'
      ]
      desc:'render each term as a sanitized span element, with tags in `className` attributes. The text\'s whitespace is approximated as html'
  inspect:
    sort:
      params:[
        'array of fields to sort by - *\'alpha\',\'freq\',\'chron\'* '
      ]
      desc:'re-arrange the matches according to alphabetical (default) or given properties'
