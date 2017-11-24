
let dates = {
  Month: true,
  WeekDay: true,
  RelativeDay: true,
  Year: true,
  Duration: true,
  Time: true,
  Holiday: true
};

let adjectives = {
  Comparable: true,
  Comparative: true,
  Superlative: true,
}
let nouns = {
  // - singular
  Singular: {
    Person: {
      FirstName: {
        MaleName: true,
        FemaleName: true,
      },
      LastName: true,
    },
    Place: {
      Country: true,
      City: true,
      Region: true,
      Address: true,
    },
    Organization: {
      SportsTeam: true,
      Company: true,
      School: true
    }
  },
  Plural: true,
  Uncountable: true,
  Honorific: true,
  Pronoun: true,
  Actor: true,
  Activity: true,
  Unit: true,
  Demonym: true,
  Possessive: true,
  AtMention: true
};

let values = {
  Cardinal: {
    RomanNumeral: true
  },
  Ordinal: true,
  Multiple: true,
  Fraction: true,
  TextValue: true,
  NumericValue: true,
  NiceNumber: true,
  Percent: true
};

let verbs = {
  PresentTense: {
    Infinitive: true,
    Gerund: true,
  },
  PastTense: true,
  PerfectTense: true,
  FuturePerfect: true,
  Pluperfect: true,
  Copula: true,
  Modal: true,
  Participle: true,
  Particle: true,
  PhrasalVerb: true
};

let tags = {
  Verb: verbs,
  Date: dates,
  Noun: nouns,
  Value: values,
  Adjective: adjectives,
  Contraction: {
    NumberRange: true
  }
};
let rest = {
  Adverb: true,
  Currency: true,
  Determiner: true,
  Conjunction: true,
  Preposition: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  PhoneNumber: true,
  HashTag: true,
  Emoji: true,
  Condition: true,
  VerbPhrase: true,
  Auxiliary: true,
  Negative: true,
  TitleCase: true,
  CamelCase: true,
  UpperCase: true,
  Hyphenated: true,
  Acronym: true,
  ClauseEnd: true,
  Quotation: true,
  Money: true,
}

module.exports = {
  left: {
    Term: tags
  },
  rest: rest
}
