module.exports=

  render:
    plainText:
      _desc:'a perfect reproduction of the original input text, with any changes'
    asHtml:
      _params:[
        'a list of tags to use as classNames (default to all)'
      ]
      _desc:'render each term as a sanitized span element, with tags in `className` attributes. The text\'s whitespace is approximated as html'
    debug:
      _desc:'pretty-print the current matches to console with tags'

  transform:
    match:
      _desc:'return a subset that matches these conditions'
      _params:[
        'a regex-like string to match, using `#Tag, !not, (or|), *all, .any, ^start, end$` syntax.'
      ]
    matchOne:
      _desc:'return the first situation that matches these conditions'
      _params:[
        'a regex-like string to match, using `#Tag, !not, (or|), ^start, end$` syntax.'
      ]
    remove:
      _desc:'delete the current match from the original context'
      _params:[
        'the match string of terms to remove (default is *)'
      ]
    replace:
      _desc:'remove the current match and insert this new text in its place'
      _params:[
        'text to parse, tag, and over-write'
      ]
    normalize:
      _desc:''
      _params:[
        'an object describing which normalization methods to run. defaults to safe-ones.'
      ]
    insertBefore:
      _desc:'prepend this text before each match'
      _params:[
        'text to parse, tag, and insert'
      ]
    insertAfter:
      _desc:'append this text after each match'
      _params:[
        'text to parse, tag, and insert'
      ]
    toUpperCase:
      _desc:'John Smith -> JOHN SMITH'
    toLowerCase:
      _desc:'John Smith -> john smith'
    toTitleCase:
      _desc:'john smith -> John Smith'
    toCamelCase:
      _desc:'john smith -> johnSmith'

    flatten:
      _desc:'turn a list of matches into one match'
    clone:
      _desc:'deepCopy this result, so it no longer effects the original'


  inspect:
    forEach:
      _desc:'run a method on every match'
    map:
      _desc:'run a method on every match, and return a new result'
    filter:
      _desc:'remove matches that do not pass a condition'
    reduce:
      _desc:'run a function on each match, and return a new value'
    first:
      _desc:'select only the first, in a list of matches'
    last:
      _desc:'select only the last, in a list of matches'
    sort:
      _params:[
        'array of fields to sort by - *\'alpha\',\'freq\',\'chron\'* '
      ]
      _desc:'re-arrange the matches according to alphabetical (default) or given properties'
    reverse:
      _desc:'re--arrange the current matches backward'
    unique:
      _desc:'find and remove all duplicate matches'
    splitBefore:
      _desc:'turn each match into two seperate matches, leaving the matching terms at the starting'
    splitAfter:
      _desc:'turn each match into two seperate matches, leaving the matching terms at the ending'
    splitOn:
      _desc:'turn each match into two seperate matches, removing the matching terms'
    tag:
      _desc:'tag each matched term as this tag'
      _params:[
        'the tag to add (can be a custom tag)'
      ]
    unTag:
      _desc:'remove this tag from each term, if it exists'
      _params:[
        'the tag to remove'
      ]
    canBe:
      _desc:'return only terms that are consistent with this tag'
      _params:[
        'the tag to compare'
      ]


  subsets:

    terms:
      normalize:
        _desc:''
      forEach:
        _desc:'run a function on each term'
      map:
        _desc:'run a function and return a new result'
      filter:
        _desc:'remove specific terms from all matches'
      reduce:
        _desc:'transform all terms into a new value'
      parse:
        _desc:''

    sentences:
      normalize:
        _desc:'add a period or question-mark at the end, titlecase first word'
      toSingular:
        _desc:'turn the major nouns in the sentence into singular-form, and correct any of their articles'
      toPlural:
        _desc:'turn the major nouns in the sentence into plural-form, and correct any of their articles'
      toNegative:
        _desc:'make the positively-stated verbs into negative-form'
      toPositive:
        _desc:'turn any negatively-stated verbs into their opposite'
      toPast:
        _desc:'conjugate the sentence to past tense'
      toPresent:
        _desc:'conjugate the sentence to present tense'
      toFuture:
        _desc:'conjugate the sentence to future tense'
      parse:
        _desc:'find the sentence-type, see if the sentence is passive'

    questions:
      normalize:
        _desc:'add a question-mark at the end'
      parse:
        _desc:''
    statements:
      normalize:
        _desc:'add a period to the end'
      parse:
        _desc:''
    fragments:
      normalize:
        _desc:''
      parse:
        _desc:''

    contractions:
      expand:
        _desc:'isn\'t -> \'is not\''
      contract:
        _desc:'is not -> isn\'t'
      normalize:
        _desc:'expand all contractions'
      parse:
        _desc:''


    things:
      parse:
        _desc:''
    subjects:
      parse:
        _desc:''

    people:
      normalize:
        _desc:'try to render `Firstname lastName` form'
      parse:
        _desc:'pull-apart matches into `firstName, middleName, lastName, honorific`'

    places:
      normalize:
        _desc:'try to render `City Country` form'
      parse:
        _desc:'pull-apart matches into `city, country`'

    organizations:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    acronyms:
      normalize:
        _desc:'change to period-delimited format'
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    pronouns:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    adjectives:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    adverbs:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    verbs:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'


    dates:
      normalize:
        _desc:'change to long-format date'
      toShortForm:
        _desc:'Tuesday -> tues, January -> Jan'
      toLongForm:
        _desc:'Tues -> Tuesday, Apr -> April'
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    hashtags:
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    phoneNumbers:
      normalize:
        _desc:'convert to +1(123) 456-7890 format'
      parse:
        _desc:'pull-apart and normalize matches into a structured form'

    urls:
      normalize:
        _desc:'convert to domain.com/path format'
      parse:
        _desc:'pull-apart and normalize matches into a structured form'
    values:
      normalize:
        _desc:'convert to numerical, undashed format'
      toNumber:
        _desc:'turn \'two hundred\' into 200'
      toTextValue:
        _desc:'turn 200 into \'two hundred\''
      toCardinal:
        _desc:'turn 25th to 25'
      toOrdinal:
        _desc:'turn 55 to 55th'
      parse:
        _desc:'pull-apart and normalize matches into a structured form'
