(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).nlp = t();
}(void 0, function () {
  "use strict";

  function e(t) {
    return (e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(t);
  }

  function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function n(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function r(e, t, r) {
    return t && n(e.prototype, t), r && n(e, r), e;
  }

  function a(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && o(e, t);
  }

  function i(e) {
    return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function o(e, t) {
    return (o = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function s(e, t) {
    return !t || "object" != _typeof(t) && "function" != typeof t ? function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }(e) : t;
  }

  var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

  var l = function l(e) {
    for (var t = (e = e || "_") + "-", n = 0; n < 7; n++) {
      t += u[Math.floor(Math.random() * u.length)];
    }

    return t;
  },
      c = {
    "!": "¡",
    "?": "¿Ɂ",
    '"': '“”"❝❞',
    "'": "‘‛❛❜",
    "-": "—–",
    a: "ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАадѦѧӐӑӒӓƛɅæ",
    b: "ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",
    c: "¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾСсєҀҁҪҫ",
    d: "ÐĎďĐđƉƊȡƋƌǷ",
    e: "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ",
    f: "ƑƒϜϝӺӻҒғſ",
    g: "ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",
    h: "ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",
    I: "ÌÍÎÏ",
    i: "ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії",
    j: "ĴĵǰȷɈɉϳЈј",
    k: "ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",
    l: "ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",
    m: "ΜϺϻМмӍӎ",
    n: "ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",
    o: "ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϭϴОФоѲѳӦӧӨөӪӫ",
    p: "ƤƿΡρϷϸϼРрҎҏÞ",
    q: "Ɋɋ",
    r: "ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",
    s: "ŚśŜŝŞşŠšƧƨȘșȿЅѕ",
    t: "ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",
    u: "µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ",
    v: "νѴѵѶѷ",
    w: "ŴŵƜωώϖϢϣШЩшщѡѿ",
    x: "×ΧχϗϰХхҲҳӼӽӾӿ",
    y: "ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",
    z: "ŹźŻżŽžƩƵƶȤȥɀΖζ"
  },
      h = {};

  Object.keys(c).forEach(function (e) {
    c[e].split("").forEach(function (t) {
      h[t] = e;
    });
  });

  var d = function d(e) {
    var t = e.split("");
    return t.forEach(function (e, n) {
      h[e] && (t[n] = h[e]);
    }), t.join("");
  },
      f = /([A-Z]\.)+[A-Z]?,?$/,
      m = /^[A-Z]\.,?$/,
      p = /[A-Z]{2,}('s|,)?$/,
      g = /([a-z]\.){2,}[a-z]\.?$/,
      v = function v(e) {
    return !0 === f.test(e) || !0 === g.test(e) || !0 === m.test(e) || !0 === p.test(e);
  },
      b = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/,
      y = function y(e) {
    var t = e = (e = (e = e || "").toLowerCase()).trim();
    return e = d(e), !0 === b.test(e) && (e = e.replace(/\/.*/, "")), e = (e = (e = (e = (e = (e = e.replace(/^[#@]/, "")).replace(/[,;.!?]+$/, "")).replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'")).replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g, '"')).replace(/\u2026/g, "...")).replace(/\u2013/g, "-"), !0 === /[a-z][^aeiou]in['’]$/.test(e) && (e = e.replace(/in['’]$/, "ing")), !0 === /^(re|un)-?[^aeiou]./.test(e) && (e = e.replace("-", "")), !1 === /^[:;]/.test(e) && (e = (e = (e = e.replace(/\.{3,}$/g, "")).replace(/[",\.!:;\?\)]+$/g, "")).replace(/^['"\(]+/g, "")), "" === (e = e.trim()) && (e = t), v(e) && (e = e.replace(/\./g, "")), e = e.replace(/([0-9]),([0-9])/g, "$1$2");
  },
      A = function A(e) {
    return e = (e = e.replace(/['’]s$/, "")).replace(/s['’]$/, "s");
  },
      w = /^[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·\&*\•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F]+/,
      k = /[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·\&*@\•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E]+$/,
      $ = /\//,
      P = /['’]/,
      G = /^[-+\.][0-9]/,
      E = function E(e) {
    var t = e,
        n = "",
        r = "";
    "" === (e = (e = e.replace(w, function (t) {
      return "-" !== (n = t) && "+" !== n && "." !== n || !G.test(e) ? "" : (n = "", t);
    })).replace(k, function (e) {
      return r = e, P.test(e) && /[sn]['’]$/.test(t) && !1 === P.test(n) ? (r = r.replace(P, ""), "'") : "";
    })) && (t = t.replace(/ *$/, function (e) {
      return r = e || "", "";
    }), e = t, n = "", r = r);
    var a = y(e),
        i = {
      text: e,
      clean: a,
      reduced: A(a),
      pre: n,
      post: r
    };
    return $.test(e) && e.split($).forEach(function (e) {
      i.alias = i.alias || {}, i.alias[e.trim()] = !0;
    }), i;
  };

  function C(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }

  var F = C(function (e, t) {
    var n = /^[A-Z][a-z'\u00C0-\u00FF]/,
        r = /^[A-Z]+s?$/;
    t.toUpperCase = function () {
      return this.text = this.text.toUpperCase(), this;
    }, t.toLowerCase = function () {
      return this.text = this.text.toLowerCase(), this;
    }, t.toTitleCase = function () {
      return this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, function (e) {
        return e.toUpperCase();
      }), this;
    }, t.isUpperCase = function () {
      return r.test(this.text);
    }, t.isTitleCase = function () {
      return n.test(this.text);
    }, t.titleCase = t.isTitleCase;
  }),
      N = (F.toUpperCase, F.toLowerCase, F.toTitleCase, F.isUpperCase, F.isTitleCase, F.titleCase, {
    hasPost: function hasPost(e) {
      return -1 !== this.post.indexOf(e);
    },
    hasPre: function hasPre(e) {
      return -1 !== this.pre.indexOf(e);
    },
    hasQuote: function hasQuote() {
      return "(\"|＂|'|“|‘|‟|‛|„|⹂|‚|«|‹|‵|‶|‷|〝|`|〟)".test(this.pre) || "(\"|＂|'|”|’|”|’|”|”|’|»|›|′|″|‴|〞|´|〞)".test(this.post);
    },
    hasComma: function hasComma() {
      return this.hasPost(",");
    },
    hasPeriod: function hasPeriod() {
      return !0 === this.hasPost(".") && !1 === this.hasPost("...");
    },
    hasExclamation: function hasExclamation() {
      return this.hasPost("!");
    },
    hasQuestionMark: function hasQuestionMark() {
      return this.hasPost("?") || this.hasPost("¿");
    },
    hasEllipses: function hasEllipses() {
      return this.hasPost("..") || this.hasPost("…");
    },
    hasSemicolon: function hasSemicolon() {
      return this.hasPost(";");
    },
    hasSlash: function hasSlash() {
      return /\//.test(this.text);
    },
    hasHyphen: function hasHyphen() {
      var e = /(-|–|—)/;
      return e.test(this.post) || e.test(this.pre);
    },
    hasDash: function hasDash() {
      var e = / (-|–|—) /;
      return e.test(this.post) || e.test(this.pre);
    },
    hasContraction: function hasContraction() {
      return Boolean(this.implicit);
    },
    addPunctuation: function addPunctuation(e) {
      return "," !== e && ";" !== e || (this.post = this.post.replace(e, "")), this.post = e + this.post, this;
    }
  }),
      j = function j() {},
      B = function B(e, t, n, r) {
    return t.id === e.id || !0 === t.anything || (!0 !== t.start || 0 === n) && (!0 !== t.end || n === r - 1) && (void 0 !== t.word ? null !== e.implicit && e.implicit === t.word || !(void 0 === e.alias || !e.alias.hasOwnProperty(t.word)) || !0 === t.soft && t.word === e.root || t.word === e.clean || t.word === e.text || t.word === e.reduced : void 0 !== t.tag ? !0 === e.tags[t.tag] : void 0 !== t.method ? "function" == typeof e[t.method] && !0 === e[t.method]() : void 0 !== t.regex ? t.regex.test(e.clean) : void 0 !== t.choices && ("and" === t.operator ? t.choices.every(function (t) {
      return j(e, t, n, r);
    }) : t.choices.some(function (t) {
      return j(e, t, n, r);
    })));
  },
      x = j = function j(e, t, n, r) {
    var a = B(e, t, n, r);
    return !0 === t.negative ? !a : a;
  },
      D = {},
      O = {
    doesMatch: function doesMatch(e, t, n) {
      return x(this, e, t, n);
    },
    isAcronym: function isAcronym() {
      return v(this.text);
    },
    isImplicit: function isImplicit() {
      return "" === this.text && Boolean(this.implicit);
    },
    isKnown: function isKnown() {
      return Object.keys(this.tags).some(function (e) {
        return !0 !== D[e];
      });
    },
    setRoot: function setRoot(e) {
      var t = e.transforms,
          n = this.implicit || this.clean;

      if (this.tags.Plural && (n = t.toSingular(n, e)), this.tags.Verb && !this.tags.Negative && !this.tags.Infinitive) {
        var r = null;
        this.tags.PastTense ? r = "PastTense" : this.tags.Gerund ? r = "Gerund" : this.tags.PresentTense ? r = "PresentTense" : this.tags.Participle ? r = "Participle" : this.tags.Actor && (r = "Actor"), n = t.toInfinitive(n, e, r);
      }

      this.root = n;
    }
  },
      T = /[\s-]/,
      V = /^[A-Z-]+$/,
      z = {
    textOut: function textOut(e, t, n) {
      e = e || {};
      var r = this.text,
          a = this.pre,
          i = this.post;
      return !0 === e.reduced && (r = this.reduced || ""), !0 === e.root && (r = this.root || ""), !0 === e.implicit && this.implicit && (r = this.implicit || ""), !0 === e.normal && (r = this.clean || this.text || ""), !0 === e.root && (r = this.root || this.reduced || ""), !0 === e.unicode && (r = d(r)), !0 === e.titlecase && (this.tags.ProperNoun && !this.titleCase() || (this.tags.Acronym ? r = r.toUpperCase() : V.test(r) && !this.tags.Acronym && (r = r.toLowerCase()))), !0 === e.lowercase && (r = r.toLowerCase()), !0 === e.acronyms && this.tags.Acronym && (r = r.replace(/\./g, "")), (!0 === e.whitespace || e.root) && (a = "", i = " ", !1 !== T.test(this.post) && !e.last || this.implicit || (i = "")), !0 !== e.punctuation || e.root || (!0 === this.hasPost(".") ? i = "." + i : !0 === this.hasPost("?") ? i = "?" + i : !0 === this.hasPost("!") ? i = "!" + i : !0 === this.hasPost(",") ? i = "," + i : !0 === this.hasEllipses() && (i = "..." + i)), !0 !== t && (a = ""), !0 !== n && (i = ""), !0 === e.abbreviations && this.tags.Abbreviation && (i = i.replace(/^\./, "")), a + r + i;
    }
  },
      H = {
    Auxiliary: 1,
    Possessive: 1
  },
      I = function I(e, t) {
    var n = Object.keys(e.tags),
        r = t.tags;
    return n = n.sort(function (e, t) {
      return H[t] || !r[t] ? -1 : r[t] ? r[e] ? r[e].lineage.length > r[t].lineage.length ? 1 : r[e].isA.length > r[t].isA.length ? -1 : 0 : 0 : 1;
    });
  },
      M = {
    text: !0,
    tags: !0,
    implicit: !0,
    clean: !1,
    id: !1,
    index: !1,
    offset: !1,
    whitespace: !1,
    bestTag: !1
  },
      S = {
    json: function json(e, t) {
      e = e || {};
      var n = {};
      return (e = Object.assign({}, M, e)).text && (n.text = this.text), e.normal && (n.normal = this.normal), e.tags && (n.tags = Object.keys(this.tags)), e.clean && (n.clean = this.clean), (e.id || e.offset) && (n.id = this.id), e.implicit && null !== this.implicit && (n.implicit = this.implicit), e.whitespace && (n.pre = this.pre, n.post = this.post), e.bestTag && (n.bestTag = I(this, t)[0]), n;
    }
  },
      L = Object.assign({}, F, N, O, z, S),
      J = function J(e, t) {
    for (e = e.toString(); e.length < t;) {
      e += " ";
    }

    return e;
  },
      W = function W(e, t, n) {
    var r = "[33m" + J(e.clean, 15) + "[0m + [32m" + t + "[0m ";
    n && (r = J(r, 35) + " " + n), console.log(r);
  },
      _ = function _(e, t, n) {
    var r = "[33m" + J(e.clean, 3) + " [31m - #" + t + "[0m ";
    n && (r = J(r, 35) + " " + n), console.log(r);
  },
      q = function q(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  },
      R = function R(e) {
    return e.charAt(0).toUpperCase() + e.substr(1);
  },
      K = function K(e, t, n, r) {
    var a = r.tags;

    if ("" !== t && "." !== t && "-" !== t && ("#" === t[0] && (t = t.replace(/^#/, "")), t = R(t), !0 !== e.tags[t])) {
      var i = r.isVerbose();
      !0 === i && W(e, t, n), e.tags[t] = !0, !0 === a.hasOwnProperty(t) && (a[t].isA.forEach(function (t) {
        e.tags[t] = !0, !0 === i && W(e, "→ " + t);
      }), e.unTag(a[t].notA, "←", r));
    }
  },
      Q = function Q(e, t, n, r) {
    !0 === q(t) ? t.forEach(function (t) {
      return K(e, t, n, r);
    }) : K(e, t, n, r);
  },
      U = function U(e, t, n, r) {
    var a = r.isVerbose();
    if ("*" === t) return e.tags = {}, e;
    !0 === e.tags[t] && !0 === e.tags.hasOwnProperty(t) && (delete e.tags[t], !0 === a && _(e, t, n));
    var i = r.tags;
    if (i[t]) for (var o = i[t].lineage, s = 0; s < o.length; s++) {
      !0 === e.tags[o[s]] && (delete e.tags[o[s]], !0 === a && _(e, " - " + o[s]));
    }
    return e;
  },
      X = function X(e, t, n, r) {
    !0 === q(t) ? t.forEach(function (t) {
      return U(e, t, n, r);
    }) : U(e, t, n, r);
  },
      Z = function e(t, n, r) {
    var a = r.tags;
    if ("#" === n[0] && (n = n.replace(/^#/, "")), void 0 === a[n]) return !0;

    for (var i = a[n].notA || [], o = 0; o < i.length; o++) {
      if (!0 === t.tags[i[o]]) return !1;
    }

    return void 0 === a[n].isA || e(t, a[n].isA, r);
  },
      Y = {
    tag: function tag(e, t, n) {
      return Q(this, e, t, n), this;
    },
    tagSafe: function tagSafe(e, t, n) {
      return Z(this, e, n) && Q(this, e, t, n), this;
    },
    unTag: function unTag(e, t, n) {
      return X(this, e, t, n), this;
    },
    canBe: function canBe(e, t) {
      return Z(this, e, t);
    }
  },
      ee = function () {
    function e() {
      var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      t(this, e), n = String(n);
      var r = E(n);
      this.text = r.text || "", this.clean = r.clean, this.reduced = r.reduced, this.root = null, this.implicit = null, this.pre = r.pre || "", this.post = r.post || "", this.tags = {}, this.prev = null, this.next = null, this.id = l(r.clean), this.isA = "Term", r.alias && (this.alias = r.alias);
    }

    return r(e, [{
      key: "set",
      value: function value(e) {
        var t = E(e);
        return this.text = t.text, this.clean = t.clean, this;
      }
    }]), e;
  }();

  ee.prototype.clone = function () {
    var e = new ee(this.text);
    return e.pre = this.pre, e.post = this.post, e.tags = Object.assign({}, this.tags), e;
  }, Object.assign(ee.prototype, L), Object.assign(ee.prototype, Y);

  var te = ee,
      ne = {
    terms: function terms(e) {
      var t = [this.pool.get(this.start)];
      if (0 === this.length) return [];

      for (var n = 0; n < this.length - 1; n += 1) {
        var r = t[t.length - 1].next;

        if (null === r) {
          console.error("Compromise error: Linked list broken in phrase '" + this.start + "'");
          break;
        }

        var a = this.pool.get(r);
        if (t.push(a), void 0 !== e && e === n) return t[e];
      }

      return void 0 !== e ? t[e] : t;
    },
    clone: function clone(e) {
      var t = this;
      if (e) return this.buildFrom(this.start, this.length);
      var n = this.terms().map(function (e) {
        return e.clone();
      });
      return n.forEach(function (e, r) {
        t.pool.add(e), n[r + 1] && (e.next = n[r + 1].id), n[r - 1] && (e.prev = n[r - 1].id);
      }), this.buildFrom(n[0].id, n.length);
    },
    lastTerm: function lastTerm() {
      var e = this.terms();
      return e[e.length - 1];
    },
    hasId: function hasId(e) {
      if (0 === this.length || !e) return !1;
      if (this.start === e) return !0;

      for (var t = this.start, n = 0; n < this.length - 1; n += 1) {
        var r = this.pool.get(t);
        if (void 0 === r) return console.error("Compromise error: Linked list broken. Missing term '".concat(t, "' in phrase '").concat(this.start, "'\n")), !1;
        if (r.next === e) return !0;
        t = r.next;
      }

      return !1;
    },
    wordCount: function wordCount() {
      return this.terms().filter(function (e) {
        return "" !== e.text;
      }).length;
    }
  },
      re = function re(e) {
    return e.replace(/ +$/, "");
  },
      ae = {
    text: function text() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 ? arguments[1] : void 0,
          n = arguments.length > 2 ? arguments[2] : void 0;
      "string" == typeof e && (e = "normal" === e ? {
        whitespace: !0,
        unicode: !0,
        lowercase: !0,
        punctuation: !0,
        acronyms: !0,
        abbreviations: !0,
        implicit: !0,
        normal: !0
      } : "clean" === e ? {
        titlecase: !1,
        lowercase: !0,
        punctuation: !0,
        whitespace: !0,
        unicode: !0,
        implicit: !0
      } : "reduced" === e ? {
        titlecase: !1,
        lowercase: !0,
        punctuation: !1,
        whitespace: !0,
        unicode: !0,
        implicit: !0,
        reduced: !0
      } : "root" === e ? {
        titlecase: !1,
        lowercase: !0,
        punctuation: !0,
        whitespace: !0,
        unicode: !0,
        implicit: !0,
        root: !0
      } : {});
      var r = this.terms(),
          a = !1;
      r[0] && null === r[0].prev && null === r[r.length - 1].next && (a = !0);
      var i = r.reduce(function (i, o, s) {
        e.last = n && s === r.length - 1;
        var u = !0,
            l = !0;
        return !1 === a && (0 === s && t && (u = !1), s === r.length - 1 && n && (l = !1)), i + o.textOut(e, u, l);
      }, "");
      return !0 === a && n && (i = re(i)), e.trim && (i = i.trim()), i;
    }
  },
      ie = {
    trim: function trim() {
      var e = this.terms();

      if (e.length > 0) {
        e[0].pre = e[0].pre.replace(/^\s+/, "");
        var t = e[e.length - 1];
        t.post = t.post.replace(/\s+$/, "");
      }

      return this;
    }
  },
      oe = /[.?!]\s*$/,
      se = function se(e, t) {
    t[0].pre = e[0].pre;
    var n,
        r,
        a = e[e.length - 1],
        i = t[t.length - 1];
    i.post = (n = a.post, r = i.post, oe.test(r) ? r + n.match(/\s*$/) : n), a.post = "", "" === a.post && (a.post += " ");
  },
      ue = function ue(e, t, n) {
    var r = e.terms();
    se(r, t.terms()), function (e, t) {
      var n = e.lastTerm().next;
      (e.lastTerm().next = t.start, t.lastTerm().next = n, n) && (e.pool.get(n).prev = t.lastTerm().id);
      var r = e.terms(0).id;
      r && (t.terms(0).prev = r);
    }(e, t);
    var a,
        i = [e],
        o = e.start,
        s = [n];
    return (s = s.concat(n.parents())).forEach(function (e) {
      var t = e.list.filter(function (e) {
        return e.hasId(o);
      });
      i = i.concat(t);
    }), (i = (a = i).filter(function (e, t) {
      return a.indexOf(e) === t;
    })).forEach(function (e) {
      e.length += t.length;
    }), e;
  },
      le = / /,
      ce = function ce(e, t, n) {
    var r = e.start,
        a = t.terms();
    !function (e) {
      var t = e[e.length - 1];
      !1 === le.test(t.post) && (t.post += " ");
    }(a), function (e, t, n) {
      var r = n[n.length - 1];
      r.next = e.start;
      var a = e.pool,
          i = a.get(e.start);
      i.prev && (a.get(i.prev).next = t.start);
      n[0].prev = e.terms(0).prev, e.terms(0).prev = r.id;
    }(e, t, a);
    var i,
        o = [e],
        s = [n];
    return (s = s.concat(n.parents())).forEach(function (e) {
      var n = e.list.filter(function (e) {
        return e.hasId(r) || e.hasId(t.start);
      });
      o = o.concat(n);
    }), (o = (i = o).filter(function (e, t) {
      return i.indexOf(e) === t;
    })).forEach(function (e) {
      e.length += t.length, e.start === r && (e.start = t.start);
    }), e;
  },
      he = function he(e, t) {
    var n = t.pool(),
        r = e.terms(),
        a = n.get(r[0].prev) || {},
        i = n.get(r[r.length - 1].next) || {};
    r[0].implicit && a.implicit && (a.set(a.implicit), a.post += " "), function (e, t, n, r) {
      var a = e.parents();
      a.push(e), a.forEach(function (e) {
        var a = e.list.find(function (e) {
          return e.hasId(t);
        });
        a && (a.length -= n, a.start === t && (a.start = r.id));
      }), e.list = e.list.filter(function (e) {
        return !(!e.start || !e.length);
      });
    }(t, e.start, e.length, i), a && (a.next = i.id), i && (i.prev = a.id);
  },
      de = {
    append: function append(e, t) {
      return ue(this, e, t), this;
    },
    prepend: function prepend(e, t) {
      return ce(this, e, t), this;
    },
    "delete": function _delete(e) {
      return he(this, e), this;
    },
    replace: function replace(e, t) {
      var n = this.length;
      ue(this, e, t);
      var r = this.buildFrom(this.start, this.length);
      r.length = n, he(r, t);
    },
    splitOn: function splitOn(e) {
      var t = this.terms(),
          n = {
        before: null,
        match: null,
        after: null
      },
          r = t.findIndex(function (t) {
        return t.id === e.start;
      });
      if (-1 === r) return n;
      var a = t.slice(0, r);
      a.length > 0 && (n.before = this.buildFrom(a[0].id, a.length));
      var i = t.slice(r, r + e.length);
      i.length > 0 && (n.match = this.buildFrom(i[0].id, i.length));
      var o = t.slice(r + e.length, t.length);
      return o.length > 0 && (n.after = this.buildFrom(o[0].id, o.length, this.pool)), n;
    }
  },
      fe = {
    json: function json() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 ? arguments[1] : void 0,
          n = {};
      return e.text && (n.text = this.text()), e.normal && (n.normal = this.text("normal")), e.clean && (n.clean = this.text("clean")), e.reduced && (n.reduced = this.text("reduced")), e.root && (n.root = this.text("root")), e.trim && (n.text && (n.text = n.text.trim()), n.normal && (n.normal = n.normal.trim()), n.reduced && (n.reduced = n.reduced.trim())), e.terms && (!0 === e.terms && (e.terms = {}), n.terms = this.terms().map(function (n) {
        return n.json(e.terms, t);
      })), n;
    }
  },
      me = {
    lookAhead: function lookAhead(e) {
      e || (e = ".*");
      var t = this.pool,
          n = [],
          r = this.terms();
      return function e(r) {
        var a = t.get(r);
        a && (n.push(a), a.prev && e(a.next));
      }(r[r.length - 1].next), 0 === n.length ? [] : this.buildFrom(n[0].id, n.length).match(e);
    },
    lookBehind: function lookBehind(e) {
      e || (e = ".*");
      var t = this.pool,
          n = [];
      return function e(r) {
        var a = t.get(r);
        a && (n.push(a), a.prev && e(a.prev));
      }(t.get(this.start).prev), 0 === n.length ? [] : this.buildFrom(n[n.length - 1].id, n.length).match(e);
    }
  },
      pe = Object.assign({}, ne, ae, ie, de, fe, me),
      ge = function ge(e, t) {
    if (0 === t.length) return !0;

    for (var n = 0; n < t.length; n += 1) {
      var r = t[n];

      if (!0 !== r.optional && !0 !== r.negative) {
        if (!0 === r.start && n > 0) return !0;
        if (void 0 !== e.cache.words && void 0 !== r.word && !0 !== e.cache.words.hasOwnProperty(r.word)) return !0;
      }

      if (!0 === r.anything && !0 === r.negative) return !0;
    }

    return !1;
  },
      ve = function ve(e, t, n, r, a, i) {
    for (var o = t; t < e.length; t += 1) {
      if (r && e[t].doesMatch(r, a + t, i)) return t;
      var s = t - o + 1;
      if (void 0 !== n.max && s === n.max) return t;
      if (!1 === e[t].doesMatch(n, a + t, i)) return void 0 !== n.min && s < n.min ? null : t;
    }

    return t;
  },
      be = function be(e, t, n, r, a) {
    if (!n) return e.length;

    for (; t < e.length; t += 1) {
      if (!0 === e[t].doesMatch(n, r + t, a)) return t;
    }

    return null;
  },
      ye = function ye(e, t, n, r) {
    for (var a = [], i = 0, o = 0; o < t.length; o += 1) {
      var s = t[o];

      if (!e[i]) {
        if (!1 === t.slice(o).some(function (e) {
          return !e.optional;
        })) break;
        return !1;
      }

      if (!0 !== s.anything || !0 !== s.greedy) {
        if (!0 !== s.anything && !0 !== e[i].doesMatch(s, n + i, r)) {
          if (!0 !== s.optional) {
            if (!(e[i].isImplicit() && t[o - 1] && e[i + 1] && e[i + 1].doesMatch(s, n + i, r))) return !1;
            i += 2;
          }
        } else {
          var u = i;
          if (s.optional && t[o + 1] && !0 === e[i].doesMatch(t[o + 1], n + i, r) && (e[i + 1] && !1 !== e[i + 1].doesMatch(t[o + 1], n + i, r) || (o += 1)), i += 1, !0 === s.end && i !== e.length && !0 !== s.greedy) return !1;
          if (!0 === s.greedy && null === (i = ve(e, i, s, t[o + 1], n, r))) return !1;
          s.capture && (a.push(u), i > 1 && s.greedy && a.push(i - 1));
        }
      } else {
        var l = be(e, i, t[o + 1], s, n);
        if (void 0 !== s.min && l - i < s.min) return !1;

        if (void 0 !== s.max && l - i > s.max) {
          i += s.max;
          continue;
        }

        if (null === l) return !1;
        i = l;
      }
    }

    if (a.length > 0) {
      for (var c = e.slice(a[0], a[a.length - 1] + 1), h = 0; h < i; h++) {
        c[h] = c[h] || null;
      }

      return c;
    }

    return e.slice(0, i);
  },
      Ae = /\{([0-9]+,?[0-9]*)\}/,
      we = /&&/,
      ke = function ke(e) {
    return e[e.length - 1];
  },
      $e = function $e(e) {
    return e[0];
  },
      Pe = function Pe(e) {
    return e.substr(1);
  },
      Ge = function Ge(e) {
    return e.substr(0, e.length - 1);
  },
      Ee = function Ee(e) {
    return e = Pe(e), e = Ge(e);
  },
      Ce = function e(t) {
    for (var n, r = {}, a = 0; a < 2; a += 1) {
      if ("+" === ke(t) && (r.greedy = !0, t = Ge(t)), "*" !== t && "*" === ke(t) && "\\*" !== t && (r.greedy = !0, t = Ge(t)), "?" === ke(t) && (r.optional = !0, t = Ge(t)), "$" === ke(t) && (r.end = !0, t = Ge(t)), "^" === $e(t) && (r.start = !0, t = Pe(t)), "!" === $e(t) && (r.negative = !0, t = Pe(t)), "(" === $e(t) && ")" === ke(t)) {
        we.test(t) ? (r.choices = t.split(we), r.operator = "and") : (r.choices = t.split("|"), r.operator = "or"), r.choices[0] = Pe(r.choices[0]);
        var i = r.choices.length - 1;
        r.choices[i] = Ge(r.choices[i]), r.choices = r.choices.map(function (e) {
          return e.trim();
        }), r.choices = r.choices.filter(function (e) {
          return e;
        }), r.choices = r.choices.map(e), t = "";
      }

      if ("[" !== $e(t) && "]" !== ke(t) || (r.capture = !0, t = (t = t.replace(/^\[/, "")).replace(/\]$/, "")), "/" === $e(t) && "/" === ke(t)) return t = Ee(t), r.regex = new RegExp(t), r;
      if ("~" === $e(t) && "~" === ke(t)) return t = Ee(t), r.soft = !0, r.word = t, r;
    }

    return !0 === Ae.test(t) && (t = t.replace(Ae, function (e, t) {
      var n = t.split(/,/g);
      return 1 === n.length ? (r.min = Number(n[0]), r.max = Number(n[0])) : (r.min = Number(n[0]), r.max = Number(n[1] || 999)), r.greedy = !0, "";
    })), "#" === $e(t) ? (r.tag = Pe(t), r.tag = (n = r.tag).charAt(0).toUpperCase() + n.substr(1), r) : "@" === $e(t) ? (r.method = Pe(t), r) : "." === t ? (r.anything = !0, r) : "*" === t ? (r.anything = !0, r.greedy = !0, r.optional = !0, r) : (t && (t = (t = t.replace("\\*", "*")).replace("\\.", "."), r.word = t.toLowerCase()), r);
  },
      Fe = function Fe(t) {
    if (null == t || "" === t) return [];

    if ("object" === e(t)) {
      if (function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }(t)) {
        if (0 === t.length || !t[0]) return [];
        if ("object" === e(t[0])) return t;
        if ("string" == typeof t[0]) return function (e) {
          return [{
            choices: e.map(function (e) {
              return {
                word: e
              };
            })
          }];
        }(t);
      }

      return t && "Doc" === t.isA ? function (e) {
        if (!e || !e.list || !e.list[0]) return [];
        var t = [];
        return e.list.forEach(function (e) {
          e.terms().forEach(function (e) {
            t.push({
              id: e.id
            });
          });
        }), [{
          choices: t,
          greedy: !0
        }];
      }(t) : [];
    }

    "number" == typeof t && (t = String(t));

    var n = function (e) {
      var t = e.split(/([\^\[\!]*\(.*?\)[?+*]*\]?\$?)/);
      return t = t.map(function (e) {
        return e.trim();
      });
    }(t);

    return n = function (e) {
      if (e.filter(function (e) {
        return !0 === e.capture;
      }).length > 1) for (var t = e.map(function (e) {
        return e.capture;
      }), n = t.indexOf(!0), r = t.length - 1 - t.reverse().indexOf(!0), a = n; a < r; a++) {
        e[a].capture = !0;
      }
      return e;
    }(n = (n = function (e) {
      var t = [];
      return e.forEach(function (e) {
        if (/^[[^_\/]?\(/.test(e[0])) t.push(e);else {
          var n = e.split(" ");
          n = n.filter(function (e) {
            return e;
          }), t = t.concat(n);
        }
      }), t;
    }(n)).map(Ce));
  },
      Ne = function Ne(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if ("string" == typeof t && (t = Fe(t)), !0 === ge(e, t)) return [];
    var r = t.filter(function (e) {
      return !0 !== e.optional;
    }).length,
        a = e.cache.terms || e.terms(),
        i = [];

    if (!0 === t[0].start) {
      var o = ye(a, t, 0, a.length);
      return !1 !== o && o.length > 0 && i.push(o), i = i.map(function (e) {
        return e.filter(function (e) {
          return e;
        });
      });
    }

    for (var s = 0; s < a.length && !(s + r > a.length); s += 1) {
      var u = ye(a.slice(s), t, s, a.length);
      if (!1 !== u && u.length > 0 && (s += u.length - 1, u = u.filter(function (e) {
        return e;
      }), i.push(u), !0 === n)) return i;
    }

    return i;
  },
      je = function je(e, t) {
    var n = {};
    Ne(e, t).forEach(function (e) {
      e.forEach(function (e) {
        n[e.id] = !0;
      });
    });
    var r = e.terms(),
        a = [],
        i = [];
    return r.forEach(function (e) {
      !0 !== n[e.id] ? i.push(e) : i.length > 0 && (a.push(i), i = []);
    }), i.length > 0 && a.push(i), a;
  },
      Be = {
    match: function match(e) {
      var t = this,
          n = Ne(this, e);
      return n = n.map(function (e) {
        return t.buildFrom(e[0].id, e.length);
      });
    },
    has: function has(e) {
      return Ne(this, e, !0).length > 0;
    },
    not: function not(e) {
      var t = this,
          n = je(this, e);
      return n = n.map(function (e) {
        return t.buildFrom(e[0].id, e.length);
      });
    },
    canBe: function canBe(e, t) {
      for (var n = this, r = [], a = this.terms(), i = !1, o = 0; o < a.length; o += 1) {
        var s = a[o].canBe(e, t);
        !0 === s && (!0 === i ? r[r.length - 1].push(a[o]) : r.push([a[o]]), i = s);
      }

      return r = r.filter(function (e) {
        return e.length > 0;
      }).map(function (e) {
        return n.buildFrom(e[0].id, e.length);
      });
    }
  },
      xe = function e(n, r, a) {
    t(this, e), this.start = n, this.length = r, this.isA = "Phrase", Object.defineProperty(this, "pool", {
      enumerable: !1,
      writable: !0,
      value: a
    }), Object.defineProperty(this, "cache", {
      enumerable: !1,
      writable: !0,
      value: {}
    });
  };

  xe.prototype.buildFrom = function (e, t) {
    var n = new xe(e, t, this.pool);
    return this.cache && (n.cache = this.cache, n.cache.terms = null), n;
  }, Object.assign(xe.prototype, Be), Object.assign(xe.prototype, pe);
  var De = {
    term: "terms"
  };
  Object.keys(De).forEach(function (e) {
    return xe.prototype[e] = xe.prototype[De[e]];
  });

  var Oe = xe,
      Te = function () {
    function e() {
      var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e), Object.defineProperty(this, "words", {
        enumerable: !1,
        value: n
      });
    }

    return r(e, [{
      key: "add",
      value: function value(e) {
        return this.words[e.id] = e, this;
      }
    }, {
      key: "get",
      value: function value(e) {
        return this.words[e];
      }
    }, {
      key: "remove",
      value: function value(e) {
        delete this.words[e];
      }
    }, {
      key: "merge",
      value: function value(e) {
        return Object.assign(this.words, e.words), this;
      }
    }, {
      key: "stats",
      value: function value() {
        return {
          words: Object.keys(this.words).length
        };
      }
    }]), e;
  }();

  Te.prototype.clone = function () {
    var e = this,
        t = Object.keys(this.words).reduce(function (t, n) {
      var r = e.words[n].clone();
      return t[r.id] = r, t;
    }, {});
    return new Te(t);
  };

  for (var Ve = Te, ze = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g, He = /\S/, Ie = /[ .][A-Z]\.? *$/i, Me = /(?:\u2026|\.{2,}) *$/, Se = /((?:\r?\n|\r)+)/, Le = /[a-z0-9\u00C0-\u00FF\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/i, Je = /^\s+/, We = function We(e, t) {
    if (!0 === Ie.test(e)) return !1;
    if (!0 === Me.test(e)) return !1;
    if (!1 === Le.test(e)) return !1;
    var n = e.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, "").split(" "),
        r = n[n.length - 1].toLowerCase();
    return !t.hasOwnProperty(r);
  }, _e = function _e(e, t) {
    var n = t.cache.abbreviations;
    e = e || "";
    var r = [],
        a = [];
    if (!(e = String(e)) || "string" != typeof e || !1 === He.test(e)) return r;

    for (var i = function (e) {
      for (var t = [], n = e.split(Se), r = 0; r < n.length; r++) {
        for (var a = n[r].split(ze), i = 0; i < a.length; i++) {
          t.push(a[i]);
        }
      }

      return t;
    }(e), o = 0; o < i.length; o++) {
      var s = i[o];

      if (void 0 !== s && "" !== s) {
        if (!1 === He.test(s)) {
          if (a[a.length - 1]) {
            a[a.length - 1] += s;
            continue;
          }

          if (i[o + 1]) {
            i[o + 1] = s + i[o + 1];
            continue;
          }
        }

        a.push(s);
      }
    }

    for (var u = 0; u < a.length; u++) {
      var l = a[u];
      a[u + 1] && !1 === We(l, n) ? a[u + 1] = l + (a[u + 1] || "") : l && l.length > 0 && (r.push(l), a[u] = "");
    }

    if (0 === r.length) return [e];

    for (var c = 1; c < r.length; c += 1) {
      var h = r[c].match(Je);
      null !== h && (r[c - 1] += h[0], r[c] = r[c].replace(Je, ""));
    }

    return r;
  }, qe = /\S/, Re = /^[!?.]+$/, Ke = /(\S+)/, Qe = /\/\W*$/, Ue = {
    ".": !0,
    "-": !0,
    "–": !0,
    "—": !0,
    "--": !0,
    "...": !0
  }, Xe = function Xe(e) {
    if (!0 === /^(re|un)-?[^aeiou]./.test(e)) return !1;
    return !0 === /^([a-z\u00C0-\u00FF`"'\/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i.test(e);
  }, Ze = function Ze(e) {
    for (var t = [], n = e.split(/[-–—]/), r = 0; r < n.length; r++) {
      r === n.length - 1 ? t.push(n[r]) : t.push(n[r] + "-");
    }

    return t;
  }, Ye = function Ye(e) {
    var t = [],
        n = [];
    "number" == typeof (e = e || "") && (e = String(e));

    for (var r = e.split(Ke), a = 0; a < r.length; a++) {
      !0 !== Xe(r[a]) ? n.push(r[a]) : n = n.concat(Ze(r[a]));
    }

    for (var i = "", o = 0; o < n.length; o++) {
      var s = n[o];
      !0 === qe.test(s) && !1 === Ue.hasOwnProperty(s) && !1 === Re.test(s) ? (t.length > 0 ? (t[t.length - 1] += i, t.push(s)) : t.push(i + s), i = "") : i += s;
    }

    return i && t.length > 0 && (t[t.length - 1] += i), t = (t = function (e) {
      for (var t = 1; t < e.length - 1; t++) {
        Qe.test(e[t]) && (e[t - 1] += e[t] + e[t + 1], e[t] = null, e[t + 1] = null);
      }

      return e;
    }(t)).filter(function (e) {
      return e;
    });
  }, et = function et(e) {
    e.forEach(function (t, n) {
      n > 0 && (t.prev = e[n - 1].id), e[n + 1] && (t.next = e[n + 1].id);
    });
  }, tt = function tt() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = arguments.length > 2 ? arguments[2] : void 0;
    "string" != typeof e && "number" == typeof e && (e = String(e));

    var r = _e(e, t);

    r = r.map(function (e) {
      return Ye(e);
    }), n = n || new Ve();
    var a = r.map(function (e) {
      return e = e.map(function (e) {
        var t = new te(e);
        return n.add(t), t;
      }), et(e), new Oe(e[0].id, e.length, n);
    });
    return a;
  }, nt = function nt(e, t) {
    "string" == typeof e && (e = JSON.parse(e));
    var n = new Ve();
    return e.list.map(function (r) {
      var a = Ye(r[0]),
          i = function (e, t) {
        return e.split("|").map(function (e) {
          var n = e.split(",");
          return (n = n.map(function (e) {
            return parseInt(e, 10);
          })).map(function (e) {
            return t[e] || console.warn("Compromise import: missing tag at index " + e), t[e];
          });
        });
      }(r[1], e.tags);

      return a = a.map(function (e, r) {
        var a = new te(e);
        return i[r].forEach(function (e) {
          return a.tag(e, "", t);
        }), n.add(a), a;
      }), et(a), new Oe(a[0].id, a.length, n);
    });
  }, rt = {
    Comparative: "true¦better",
    Superlative: "true¦earlier",
    PresentTense: "true¦is,sounds",
    Value: "true¦a few",
    Noun: "true¦a8b7c5e3f2here,ie,lit,m1no doubt,p0tce,vs;d,l;a,d;t,y;g,sp,tc,x0;!p;a,ca,o0;l,rp;a,c,l;d,l,rc",
    Copula: "true¦a1is,w0;as,ere;m,re",
    PastTense: "true¦be3came,d2had,meant,sa2taken,w0;as,e0;nt,re;id;en,gan",
    Condition: "true¦if,unless",
    Gerund: "true¦accord0be0develop0go0result0stain0;ing",
    Negative: "true¦n0;ever,o0;!n,t",
    QuestionWord: "true¦how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s",
    Plural: "true¦records",
    Conjunction: "true¦&,aEbAcuz,how8in caDno7o6p4supposing,t1vers5wh0yet;eth8ile;h0o;eref9o0;!uC;l0rovided that;us;r,therwi6; matt1r;!ev0;er;e0ut;cau1f0;ore;se;lthou1nd,s 0;far as,if;gh",
    Pronoun: "true¦'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s",
    Singular: "true¦0:0X;1:10;a0Wb0Kc0Bd04e02fXgShOici1jel0kitty,lNmJnIoHpDquestion mark,rBs7t4u2womW;nc0Rs 2;doll0Dst0F; rex,a3h2ic,ragedy,v show;ere,i1;l0x return;ist0Pky,omeone,t2uper bowl,yst0W;ep3ri1u2;de0Pff;faMmoM;al0i1o2;om,se;a4i0Jr3u2;dLrpoD;erogaVobl0O;rt,te0I;bjSceGthers;othi1umb0E;a4ee04o2;del,m2nopo0th0C;!my;n,yf0;i0unch;ead start,o2;l0me3u2;se;! run;adf0entlem5irlZlaci04od,rand3u2;l0y; slam,fa2mo2;th01;an;a5ella,ly,ol0r3un2;di1;iTo2;ntiWsN;mi0thV;conomy,gg,ner5veWx2;ampQecu7;ad7e4innSo2ragonf0ude;cumentFg2i0l0or;gy;ath,t2;ec2;tive;!dy;a8eili1h6i4o2redit card;ttage,u2;riJsin;ty,vil w2;ar;andeliGocol2;ate;n2rD;ary;aAel0lesHo6r4u2;n2tterf0;ti1;eakfast,o2;!th8;dy,tt4y2;!fri2;end;le;nki1r2;ri2;er;d4l0noma0u2;nt;ly; homin4verti2;si1;ng;em",
    Actor: "true¦aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJoldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt",
    Honorific: "true¦a03b00cSdReQfiLgKhon,jr,king,lJmEoDp8queen,r4s0taoiseach,vice7;e1fc,gt,ir,r,u0;ltTpt,rg;c0nDrgeaL;ond liJretary;abbi,e0;ar1pAs,v0;!erend; admirY;astPhd,r0vt;esideEi1of0;!essN;me mini5nce0;!ss;fficOp,rd;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al",
    SportsTeam: "true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",
    Uncountable: "true¦a1Ib1Ac11d0Ye0Rf0Lg0Hh0Ci08j07knowled1Hl02mUnews,oTpQrLsAt5vi4w0;a2ea05i1oo0;d,l;ldlife,ne;rmth,t17;neg0Yol06tae;e3h2oothpaste,r0una;affPou0;ble,sers,t;ermod1Eund12;a,nnis;a8cene04eri0Oh7il6kittl0Onow,o5p3t1u0;g0Rnshi0H;ati1De0;am,el;ace16e0;ci0Jed;ap,cc0U;k,v0T;eep,ingl0G;d04fe10l0nd;m0St;a3e1ic0;e,ke0D;c0laxa09search;ogni08rea08;bi09in;aJe1hys10last5o0ressV;lit0Zrk,w0J;a0Vtrol;bstetr0Xil,xygen;a5e3ilk,o2u0;mps,s0;ic;nGo0A;a0chan0S;slZt;chine0il,themat0Q; learn05ry;aught08e2i1ogi0Nu0;ck,g0C;ce,ghtn02ngui0LteratH;a0isG;th04;ewel7usti0G;ce,mp0nformaOtself;a0ortan0E;ti0;en0C;a3isto2o0;ck0mework,n0spitali06;ey;ry;ir,libut,ppi7;en01o1r0um,ymna08;a6ound;l0ssip;d,f;i4lour,o1urnit0;ure;od,rgive0uriNwl;ne0;ss;c6sh;conomZduca5lectr4n2quip3thZvery0;body,o0thE;ne;joy0tertain0;ment;iciNonU;tiF;ar1iabet0raugh1;es;ts;a7elcius,h3ivPl2o0urrency;al,ld w0nfusiAttA;ar;assMoth2;aos,e0;e1w0;ing;se;r4sh;a4eef,i1lood,owls,read,utt0;er;lliar1s0;on;ds;g0ss;ga0;ge;c6dvi5ero3ir2mnes1rt,thl0;et7;ty;craft;b4d0naut4;ynam3;ce;id,ou0;st0;ics",
    Infinitive: "true¦0:6H;1:6V;2:55;3:6S;4:6T;5:5W;6:64;7:6R;8:6N;9:6F;A:6P;B:6M;C:6A;D:6W;a67b5Wc4Yd46e3Qf3Dg37h30i2Nj2Lk2Jl2Am20n1Xo1Tp1Eques3Er0Ms01tTuPvMwFyE;awn,ield;aHe1Thist6iGoEre60;nd0rE;k,ry;pe,sh,th0;lk,nFrEsh,tCve;n,raD;d0t;aFiEo7;ew,sB;l68ry;nFpEr3se;gra4Jli3W;dEi7lo5O;er47o;aKeJhIoHrFuEwi8;ne,rn;aEe0Ki5Ku8y;de,in,nsf0p,v5C;r2VuC;ank,reat2L;nd,st;lk,rg1Ms7;aXcUeThRi48kip,lQmPnee3Ho4WpOtHuEwitC;bmBck,ff0gge8ppFrEspe5;ge,pri1rou4Tvi4;ly,o32;aJeIoHrFuE;dy,mb6;a4NeEi4;ngth2Bss,tC;p,re;m,p;in,ke,r0Oy;la50oil,rink6;e1Vi6o3F;am,ip;a2iv0oE;ck,ut;arCem,le5n1r4tt6;aFo2rE;atCew;le,re;il,ve;a03eGisk,oFuE;in,le,sh;am,ll;aZcXdu9fWgVje5lSmRnt,pOquNsItHvEwa5L;eEiew,o32;al,l,rE;se,t;a41i2u3Y;eHi8oGtE;!o2rE;i5uc1W;l4rt;mb6nt,r4;e8i2;air,eFlEo3XreseD;a9y;at;a3Remb0i3To4;aFeEi4y;a1nt;te,x;a53r0F;act1Uer,le5u1;a0Zei4k5FoEyc6;gni28nci6rd;ch,li27s5D;i1nE;ge,k;aRerQiPlMoKrGuE;b1Xll,mp,rEsh;cha1s4G;ai1eGiDoE;cEdu9greAhibBmi1te8vi2R;eAlaim;di5pa2ss,veD;iDp,rtr3WsEur;e,t;aFuE;g,n3;n,y;ck,le;fo2YmBsi8;ck,iDrt4Css,u1;bGccur,ff0pera7utweFverEwe;co3Xlap,ta1Yu1whelm;igh;ser4ta2Y;eFotE;e,i9;ed,gle5;aJeIiGoFuE;ltip3Ard0;nit10ve;nErr0Z;d,g6us;asu2lt,n0Mr3ssa3;inta2Ona3rFtE;ch,t0;ch,kEry;et;aKeJiGoEu1A;aEck,ok,ve;d,n;ft,ke,mBnFstEve;!en;e,k;a2Bc0Ct;b0Lck,uE;gh,nC;iEno2W;ck,ll,ss;am,o29uE;d3mp;gno2mOnEss39;cMdica7flu0KhLsItGvE;eEol4;nt,st;erErodu9;a5fe2;i8tE;aEru5;ll;abBibB;lu1Cr1A;agi20pE;lemeDo1Yro4;aIeGi2oFuE;nt,rry;n00pe,st;aElp;d,t;nd6ppErm,te;en;aIloAove1KrGuE;arEeAi11;ant30d;aEip,umb6;b,sp;in,th0ze;aOeaNiLlJoGracFuncE;ti3A;tu2;cus,lFrE;ce,eca8m,s2S;d,l1W;a1ToE;at,od,w;gu2lEni1Rx;e,l;r,tu2;il,vE;or;a11cho,le5mQnNstLvalua7xE;a08cJerIi8pEte15;a14eFla12oEreA;rt,se;ct,riE;en9;ci1t;el,han3;abEima7;li1D;ab6couVdFfor9ga3han9j01riCsu2t0vE;isi2Ny;!u2;body,er3pE;hasiEow0;ze;a04eSiJoIrFuE;mp;aFeAiE;ft;g,in;d3ubt;ff0p,re5sFvE;iWor9;aIcFliEmiApl13tingui0Y;ke;oEuA;uEv0;ra3;gr1QppE;ear,ro4;cLem,fJliv0ma0Bny,pIsFterE;mi0C;cribe,er4iFtrE;oy;gn,re;a07e06i5osB;eEi07y;at,ct;iGlFrE;ea1;a2i03;de;ma3n9re,te;a08e07h04i7l02oHrE;aFeEoAu0Dy;a7dB;ck,ve;llXmQnFok,py,uEv0;gh,nt;ceNdu5fKsItGvE;eEin9;rt,y;aNin0PrE;a8ibu7ol;iEtitu7;d0st;iFoEroD;rm;gu2rm;rn;biJfoImaHpE;a2laE;in;re;nd;rt;ne;ap1e5;aEip,o1;im,w;aFeE;at,ck,w;llen3n3r3se;a1nt0;ll,ncFrEt0u1;e,ry;el;aNeKloJoHruGuE;lEry;ly;sh;a8mb,o8rrEth0un9;ow;ck;ar,lFnefBtrE;ay;ie4ong;ng,se;band0Hc09d04ffo03gr02id,lZmu1nWppRrOsIttEvoid,waB;acGeFra5;ct;m0Dnd;h,k;k,sE;eGiFocia7uE;me;gn,st;mb6rt;le;chFgEri4;ue;!i4;eaHlGroE;aCve;ch;aud,y;l,r;noun9sw0tE;icipa7;ce;lFt0;er;e3ow;ee;rd;aPdGju8mBoP;it;st;!reA;ss;cHhie4knowled3tiva7;te;ge;ve;eGouDu1;se;nt;pt;on",
    Unit: "true¦0:16;a11b0Zc0Ld0Ke0If0Dg09h06in0Ejoule0k00lYmNnMoLpIqHsqCt7volts,w6y4z3°2µ1;g,s;c,f,n;b,e2;a0Kb,d0Qears old,o1;tt0E;att0b;able4b3e2on1sp;!ne0;a2r0A;!l,sp;spo01; ft,uare 1;c0Fd0Ef3i0Ckilo0Gm1ya0B;e0Jil1;e0li0E;eet0o0A;t,uart0;ascals,e2i1ou0Mt;c0Jnt0;rcent,tZ;hms,uVz;an0GewtQ;/s,b,e7g,i3l,m2p1²,³;h,s;!²;!/h,cro3l1;e1li05;! DsC²;g05s0A;gPter1;! 2s1;! 1;per second;b,iZm,u1x;men0x0;b,elvin0g,ilo2m1nQ;!/h,ph,²;byYgWmeter1;! 2s1;! 1;per hour;e1g,z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;²,³; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!²,³;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s",
    Organization: "true¦0:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",
    Demonym: "true¦0:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an",
    Possessive: "true¦anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne",
    Currency: "true¦$,aud,bScQdLeurKfJgbp,hkd,iIjpy,kGlEp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotySł;en,uanR;af,of;h0t5;e0il5;k0q0;elM;iel,oubleLp,upeeL;e2ound st0;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",
    City: "true¦a2Wb26c1Wd1Re1Qf1Og1Ih1Ai18jakar2Hk0Zl0Tm0Gn0Co0ApZquiYrVsLtCuBv8w3y1z0;agreb,uri1Z;ang1Te0okohama;katerin1Hrev34;ars3e2i0rocl3;ckl0Vn0;nipeg,terth0W;llingt1Oxford;aw;a1i0;en2Hlni2Z;lenc2Uncouv0Gr2G;lan bat0Dtrecht;a6bilisi,e5he4i3o2rondheim,u0;nVr0;in,ku;kyo,ronIulouC;anj23l13miso2Jra2A; haJssaloni0X;gucigalpa,hr2Ol av0L;i0llinn,mpe2Bngi07rtu;chu22n2MpT;a3e2h1kopje,t0ydney;ockholm,uttga12;angh1Fenzh1X;o0KvZ;int peters0Ul3n0ppo1F; 0ti1B;jo0salv2;se;v0z0Q;adU;eykjavik,i1o0;me,sario,t25;ga,o de janei17;to;a8e6h5i4o2r0ueb1Qyongya1N;a0etor24;gue;rt0zn24; elizabe3o;ls1Grae24;iladelph1Znom pe07oenix;r0tah tik19;th;lerJr0tr10;is;dessa,s0ttawa;a1Hlo;a2ew 0is;delTtaip0york;ei;goya,nt0Upl0Uv1R;a5e4i3o1u0;mb0Lni0I;nt0scH;evideo,real;l1Mn01skolc;dellín,lbour0S;drid,l5n3r0;ib1se0;ille;or;chest0dalWi0Z;er;mo;a4i1o0vAy01;nd00s angel0F;ege,ma0nz,sbZverpo1;!ss0;ol; pla0Iusan0F;a5hark4i3laipeda,o1rak0uala lump2;ow;be,pavog0sice;ur;ev,ng8;iv;b3mpa0Kndy,ohsiu0Hra0un03;c0j;hi;ncheMstanb0̇zmir;ul;a5e3o0; chi mi1ms,u0;stI;nh;lsin0rakliG;ki;ifa,m0noi,va0A;bu0SiltD;alw4dan3en2hent,iza,othen1raz,ua0;dalaj0Gngzhou;bu0P;eUoa;sk;ay;es,rankfu0;rt;dmont4indhovU;a1ha01oha,u0;blRrb0Eshanbe;e0kar,masc0FugavpiJ;gu,je0;on;a7ebu,h2o0raioJuriti01;lo0nstanJpenhagNrk;gFmbo;enn3i1ristchur0;ch;ang m1c0ttagoL;ago;ai;i0lgary,pe town,rac4;ro;aHeBirminghWogoAr5u0;char3dap3enos air2r0sZ;g0sa;as;es;est;a2isba1usse0;ls;ne;silPtisla0;va;ta;i3lgrade,r0;g1l0n;in;en;ji0rut;ng;ku,n3r0sel;celo1ranquil0;la;na;g1ja lu0;ka;alo0kok;re;aBb9hmedabad,l7m4n2qa1sh0thens,uckland;dod,gabat;ba;k0twerp;ara;m5s0;terd0;am;exandr0maty;ia;idj0u dhabi;an;lbo1rh0;us;rg",
    Abbreviation: "true¦a08b05cZdXeUfSgRhQiPjNkanMlKmGnEoDpCque,rAs6t4u3v2w0;is0y00;!c;a,s,t;niv,safa,t;ce,e0;nn,x;ask,e1fc,gt,ir,r,t,u0;pt,rg;nDp0;!t;d,e0;pAs,v;a,d,ennGhd,l,rof,vt;ct,kla,nt,p,rd;eb0ov;!r;a2d,essrs,i1lle,me,r5s0t;!tr;nn,ster;!j,r;it,lb,t0;!d;!s;an,r,u0;l,n;a,da,e,nc;on,wy;a,en,ov;eb,l0t,y;!a;g,s1tc,x0;!p;p,q;ak,e0ist,r;c,pt,t;a3ca,l,m2o0pl,res,t;!l0m1nn,rp;!o;dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d3l2pr,r1ss0tty,ug,ve;n,t;c,iz;!ta;!j,m,v",
    Place: "true¦a07b05cZdYeXfVgRhQiOjfk,kMlKmHneEoDp9que,rd,s8t5u4v3w0yyz;is1y0;!o;!c;a,t;pYsafa,t;e1he 0;bronx,hamptons;nn,x;ask,fo,oho,t,under6yd;a2e1h0;l,x;k,nnK;!cifX;kla,nt;b1w eng0;land;!r;a1co,i0t,uc;dKnn;libu,nhattS;a0gw,hr;s,x;an0ul;!s;a0cn,da,ndianMst;!x;arlem,kg,nd,wy;a2re0;at 0enwich;britain,lak6;!y village;co,l0ra;!a;urope,verglad2;ak,en,fw,ist,own4xb;al4dg,gk,hina3l2o1r0t;es;lo,nn;!t;town;!if;cn,e0kk,lvd,rooklyn;l air,verly hills;frica,lta,m5ntarct2r1sia,tl0ve;!ant1;ct0iz;ic0; oce0;an;ericas,s",
    Country: "true¦0:38;1:2L;a2Wb2Dc21d1Xe1Rf1Lg1Bh19i13j11k0Zl0Um0Gn05om3CpZqat1JrXsKtCu6v4wal3yemTz2;a24imbabwe;es,lis and futu2X;a2enezue31ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2X;k.,s.2; 27a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Xs and caic1T; and 2-2;toba1J;go,kel0Ynga;iw2Vji2nz2R;ki2T;aCcotl1eBi8lov7o5pa2Bri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Qriname;lomon1Vmal0uth 2;afr2IkLsud2O;ak0en0;erra leoEn2;gapo1Wt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele24luc0mart1Z;epublic of ir0Com2Cuss0w2;an25;a3eHhilippinTitcairn1Ko2uerto riM;l1rtugE;ki2Bl3nama,pua new0Tra2;gu6;au,esti2;ne;aAe8i6or2;folk1Gth3w2;ay; k2ern mariana1B;or0M;caragua,ger2ue;!ia;p2ther18w zeal1;al;mib0u2;ru;a6exi5icro09o2yanm04;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagascZl6r4urit3yot2;te;an0i14;shall0Vtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed00;a5e4i2uxembourg;b2echtenste10thu1E;er0ya;ban0Gsotho;os,tv0;azakh1De2iriba02osovo,uwait,yrgyz1D;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an",
    Region: "true¦0:1U;a20b1Sc1Id1Des1Cf19g13h10i0Xj0Vk0Tl0Qm0FnZoXpSqPrMsDtAut9v6w3y1zacatec22;o05u1;cat18kZ;a1est vi4isconsin,yomi14;rwick0shington1;! dc;er2i1;rgin1S;acruz,mont;ah,tar pradesh;a2e1laxca1DuscaA;nnessee,x1R;bas0Kmaulip1QsmJ;a6i4o2taf0Ou1ylh13;ffVrr00s0Y;me10no1Auth 1;cSdR;ber1Ic1naloa;hu0Sily;n2skatchew0Rxo1;ny; luis potosi,ta catari1I;a1hode7;j1ngp02;asth0Mshahi;inghai,u1;e1intana roo;bec,ensWreta0E;ara4e2rince edward1; isU;i,nnsylv1rnambu02;an14;!na;axa0Ndisha,h1klaho1Bntar1reg4x04;io;ayarit,eBo3u1;evo le1nav0L;on;r1tt0Rva scot0X;f6mandy,th1; 1ampton0;c3d2yo1;rk0;ako0Y;aroli0V;olk;bras0Xva01w1; 2foundland1;! and labrador;brunswick,hamp0jers1mexiJyork state;ey;a6i2o1;nta0Nrelos;ch3dlanBn2ss1;issippi,ouri;as geraGneso0M;igQoacQ;dhya,harasht04ine,ni3r1ssachusetts;anhao,y1;land;p1toba;ur;anca0e1incoln0ouis8;e1iH;ds;a1entucky,hul0A;ns08rnata0Dshmir;alis1iangxi;co;daho,llino2nd1owa;ia05;is;a2ert1idalEunA;ford0;mp0waii;ansu,eorgWlou5u1;an2erre1izhou,jarat;ro;ajuato,gdo1;ng;cester0;lori2uji1;an;da;sex;e4o2uran1;go;rs1;et;lawaErby0;a8ea7hi6o1umbrH;ahui4l3nnectic2rsi1ventry;ca;ut;iMorado;la;apEhuahua;ra;l8m1;bridge0peche;a5r4uck1;ingham0;shi1;re;emen,itish columb3;h2ja cal1sque,var2;iforn1;ia;guascalientes,l4r1;izo2kans1;as;na;a2ber1;ta;ba2s1;ka;ma",
    FemaleName: "true¦0:FY;1:G2;2:FR;3:FD;4:FC;5:EP;6:ER;7:FS;8:GF;9:EZ;A:GB;B:E5;C:FO;D:FL;E:G8;F:EG;aE2bD4cB8dAIe9Gf91g8Hh83i7Sj6Uk60l4Om38n2To2Qp2Fqu2Er1Os0Qt04ursu6vUwOyLzG;aJeHoG;e,la,ra;lGna;da,ma;da,ra;as7EeHol1TvG;et5onB9;le0sen3;an9endBNhiB4iG;lInG;if3AniGo0;e,f39;a,helmi0lGma;a,ow;aMeJiG;cHviG;an9XenG1;kCZtor3;da,l8Vnus,rG;a,nGoniD2;a,iDC;leGnesEC;nDLrG;i1y;aSePhNiMoJrGu6y4;acG3iGu0E;c3na,sG;h9Mta;nHrG;a,i;i9Jya;a5IffaCGna,s7;al3eGomasi0;a,l8Go6Xres1;g7Uo6WrHssG;!a,ie;eFi,ri8;bNliMmKnIrHs7tGwa0;ia0um;a,yn;iGya;a,ka,s7;a4e4iGmCAra;!ka;a,t7;at7it7;a05carlet2Ye04hUiSkye,oQtMuHyG;bFJlvi1;e,sHzG;an2Tet5ie,y;anGi8;!a,e,nG;aDe;aIeG;fGl3DphG;an2;cF8r6;f3nGphi1;d4ia,ja,ya;er4lv3mon1nGobh75;dy;aKeGirlBLo0y6;ba,e0i6lIrG;iGrBPyl;!d70;ia,lBV;ki4nIrHu0w0yG;la,na;i,leAon,ron;a,da,ia,nGon;a,on;l5Yre0;bMdLi9lKmIndHrGs7vannaD;aDi0;ra,y;aGi4;nt7ra;lBNome;e,ie;in1ri0;a02eXhViToHuG;by,thBK;bQcPlOnNsHwe0xG;an94ie,y;aHeGie,lE;ann8ll1marBFtB;!lGnn1;iGyn;e,nG;a,d7W;da,i,na;an9;hel53io;bin,erByn;a,cGkki,na,ta;helBZki;ea,iannDXoG;da,n12;an0bIgi0i0nGta,y0;aGee;!e,ta;a,eG;cARkaD;chGe,i0mo0n5EquCDvCy0;aCCelGi9;!e,le;een2ia0;aMeLhJoIrG;iGudenAW;scil1Uyamva9;lly,rt3;ilome0oebe,ylG;is,lis;arl,ggy,nelope,r6t4;ige,m0Fn4Oo6rvaBBtHulG;a,et5in1;ricGsy,tA8;a,e,ia;ctav3deHfAWlGphAW;a,ga,iv3;l3t5;aQePiJoGy6;eHrG;aDeCma;ll1mi;aKcIkGla,na,s7ta;iGki;!ta;hoB2k8BolG;a,eBH;!mh;l7Tna,risF;dIi5PnHo23taG;li1s7;cy,et5;eAiCO;a01ckenz2eViLoIrignayani,uriBGyG;a,rG;a,na,tAS;i4ll9XnG;a,iG;ca,ka,qB4;a,chOkaNlJmi,nIrGtzi;aGiam;!n9;a,dy,erva,h,n2;a,dIi9JlG;iGy;cent,e;red;!e6;ae6el3G;ag4KgKi,lHrG;edi61isFyl;an2iGliF;nGsAM;a,da;!an,han;b08c9Ed06e,g04i03l01nZrKtJuHv6Sx87yGz2;a,bell,ra;de,rG;a,eC;h75il9t2;a,cSgOiJjor2l6In2s7tIyG;!aGbe5QjaAlou;m,n9S;a,ha,i0;!aIbALeHja,lEna,sGt53;!a,ol,sa;!l06;!h,m,nG;!a,e,n1;arIeHie,oGr3Kueri5;!t;!ry;et3IiB;elGi61y;a,l1;dGon,ue6;akranBy;iGlo36;a,ka,n9;a,re,s2;daGg2;!l2W;alEd2elGge,isBGon0;eiAin1yn;el,le;a0Ie08iWoQuKyG;d3la,nG;!a,dHe9SnGsAQ;!a,e9R;a,sAO;aB1cJelIiFlHna,pGz;e,iB;a,u;a,la;iGy;a2Ae,l25n9;is,l1GrHtt2uG;el6is1;aIeHi8na,rG;a6Zi8;lei,n1tB;!in1;aQbPd3lLnIsHv3zG;!a,be4Ket5z2;a,et5;a,dG;a,sGy;ay,ey,i,y;a,iaIlG;iGy;a8Ge;!n4F;b7Terty;!n5R;aNda,e0iLla,nKoIslARtGx2;iGt2;c3t3;la,nGra;a,ie,o4;a,or1;a,gh,laG;!ni;!h,nG;a,d4e,n4N;cNdon7Si6kes7na,rMtKurIvHxGy6;mi;ern1in3;a,eGie,yn;l,n;as7is7oG;nya,ya;a,isF;ey,ie,y;aZeUhadija,iMoLrIyG;lGra;a,ee,ie;istGy5B;a,en,iGy;!e,n48;ri,urtn9A;aMerLl99mIrGzzy;a,stG;en,in;!berlG;eGi,y;e,y;a,stC;!na,ra;el6PiJlInHrG;a,i,ri;d4na;ey,i,l9Qs2y;ra,s7;c8Wi5XlOma6nyakumari,rMss5LtJviByG;!e,lG;a,eG;e,i78;a5EeHhGi3PlEri0y;ar5Cer5Cie,leCr9Fy;!lyn73;a,en,iGl4Uyn;!ma,n31sF;ei72i,l2;a04eVilToMuG;anKdJliGst56;aHeGsF;!nAt0W;!n8X;i2Ry;a,iB;!anLcelEd5Vel71han6IlJni,sHva0yG;a,ce;eGie;fi0lEph4X;eGie;en,n1;!a,e,n36;!i10lG;!i0Z;anLle0nIrHsG;i5Qsi5Q;i,ri;!a,el6Pif1RnG;a,et5iGy;!e,f1P;a,e72iHnG;a,e71iG;e,n1;cLd1mi,nHqueliAsmin2Uvie4yAzG;min8;a8eHiG;ce,e,n1s;!lGsFt06;e,le;inHk2lEquelG;in1yn;da,ta;lPmNnMo0rLsHvaG;!na;aHiGob6U;do4;!belGdo4;!a,e,l2G;en1i0ma;a,di4es,gr5R;el9ogG;en1;a,eAia0o0se;aNeKilHoGyacin1N;ll2rten1H;aHdGlaH;a,egard;ry;ath0WiHlGnrietBrmiAst0W;en24ga;di;il75lKnJrGtt2yl75z6D;iGmo4Fri4G;etG;!te;aDnaD;ey,l2;aYeTiOlMold12rIwG;enGyne18;!dolE;acHetGisel9;a,chC;e,ieG;!la;adys,enGor3yn1Y;a,da,na;aJgi,lHna,ov71selG;a,e,le;da,liG;an;!n0;mYnIorgHrG;ald35i,m2Stru73;et5i5T;a,eGna;s1Nvieve;briel3Fil,le,rnet,yle;aReOio0loMrG;anHe9iG;da,e9;!cG;esHiGoi0G;n1s3V;!ca;!rG;a,en43;lHrnG;!an9;ec3ic3;rHtiGy8;ma;ah,rah;d0FileCkBl00mUn4ArRsMtLuKvG;aIelHiG;e,ta;in0Ayn;!ngel2H;geni1la,ni3R;h52ta;meral9peranJtG;eHhGrel6;er;l2Pr;za;iGma,nest29yn;cGka,n;a,ka;eJilImG;aGie,y;!liA;ee,i1y;lGrald;da,y;aTeRiMlLma,no4oJsIvG;a,iG;na,ra;a,ie;iGuiG;se;a,en,ie,y;a0c3da,nJsGzaH;aGe;!beG;th;!a,or;anor,nG;!a;in1na;en,iGna,wi0;e,th;aWeKiJoGul2U;lor51miniq3Yn30rGtt2;a,eCis,la,othGthy;ea,y;an09naDonAx2;anPbOde,eNiLja,lImetr3nGsir4U;a,iG;ce,se;a,iHla,orGphiA;es,is;a,l5J;dGrdG;re;!d4Mna;!b2CoraDra;a,d4nG;!a,e;hl3i0mMnKphn1rHvi1WyG;le,na;a,by,cHia,lG;a,en1;ey,ie;a,et5iG;!ca,el1Aka;arGia;is;a0Qe0Mh04i02lUoJrHynG;di,th3;istGy04;al,i0;lOnLrHurG;tn1D;aId28iGn28riA;!nG;a,e,n1;!l1S;n2sG;tanGuelo;ce,za;eGleC;en,t5;aIeoHotG;il4B;!pat4;ir8rIudG;et5iG;a,ne;a,e,iG;ce,sX;a4er4ndG;i,y;aPeMloe,rG;isHyG;stal;sy,tG;aHen,iGy;!an1e,n1;!l;lseHrG;!i8yl;a,y;nLrG;isJlHmG;aiA;a,eGot5;n1t5;!sa;d4el1PtG;al,el1O;cHlG;es5i3F;el3ilG;e,ia,y;iYlXmilWndVrNsLtGy6;aJeIhGri0;erGleCrEy;in1;ri0;li0ri0;a2GsG;a2Fie;a,iMlKmeIolHrG;ie,ol;!e,in1yn;lGn;!a,la;a,eGie,y;ne,y;na,sF;a0Di0D;a,e,l1;isBl2;tlG;in,yn;arb0CeYianXlVoTrG;andRePiIoHyG;an0nn;nwEok8;an2NdgKg0ItG;n27tG;!aHnG;ey,i,y;ny;etG;!t8;an0e,nG;da,na;i8y;bbi8nG;iBn2;ancGossom,ythe;a,he;ca;aRcky,lin9niBrNssMtIulaDvG;!erlG;ey,y;hHsy,tG;e,i0Zy8;!anG;ie,y;!ie;nGt7yl;adHiG;ce;et5iA;!triG;ce,z;a4ie,ra;aliy29b24d1Lg1Hi19l0Sm0Nn01rWsNthe0uJvIyG;anGes7;a,na;a,r25;drIgusHrG;el3;ti0;a,ey,i,y;hHtrG;id;aKlGt1P;eHi8yG;!n;e,iGy;gh;!nG;ti;iIleHpiB;ta;en,n1t5;an19elG;le;aYdWeUgQiOja,nHtoGya;inet5n3;!aJeHiGmI;e,ka;!mGt5;ar2;!belHliFmT;sa;!le;ka,sGta;a,sa;elGie;a,iG;a,ca,n1qG;ue;!t5;te;je6rea;la;!bHmGstas3;ar3;el;aIberHel3iGy;e,na;!ly;l3n9;da;aTba,eNiKlIma,yG;a,c3sG;a,on,sa;iGys0J;e,s0I;a,cHna,sGza;a,ha,on,sa;e,ia;c3is7jaIna,ssaIxG;aGia;!nd4;nd4;ra;ia;i0nHyG;ah,na;a,is,naD;c7da,leCmLnslKsG;haDlG;inGyW;g,n;!h;ey;ee;en;at7g2nG;es;ie;ha;aVdiSelLrG;eIiG;anLenG;a,e,ne;an0;na;aKeJiHyG;nn;a,n1;a,e;!ne;!iG;de;e,lEsG;on;yn;!lG;iAyn;ne;agaJbHiG;!gaI;ey,i8y;!e;il;ah",
    WeekDay: "true¦fri4mon4s2t1wed0;!nesd4;hurs2ues2;at0un1;!urd1;!d0;ay0;!s",
    Month: "true¦aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il",
    FirstName: "true¦aEblair,cCdevBj8k6lashawn,m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g1ne;ar1el,org0;an;ion,lo;as8e0r9;ls7nyatta,rry;am0ess1ude;ie,m0;ie;an,on;as0heyenne;ey,sidy;lex1ndra,ubr0;ey;is",
    LastName: "true¦0:34;1:39;2:3B;3:2Y;4:2E;5:30;a3Bb31c2Od2Ee2Bf25g1Zh1Pi1Kj1Ek17l0Zm0Nn0Jo0Gp05rYsMtHvFwCxBy8zh6;a6ou,u;ng,o;a6eun2Uoshi1Kun;ma6ng;da,guc1Zmo27sh21zaR;iao,u;a7eb0il6o3right,u;li3Bs1;gn0lk0ng,tanabe;a6ivaldi;ssilj37zqu2;a9h8i2Go7r6sui,urn0;an,ynisJ;lst0Prr1Uth;at1Uomps1;kah0Vnaka,ylor;aEchDeChimizu,iBmiAo9t7u6zabo;ar2lliv2AzuE;a6ein0;l23rm0;sa,u3;rn4th;lva,mmo24ngh;mjon4rrano;midt,neid0ulz;ito,n7sa6to;ki;ch2dLtos,z;amBeag1Zi9o7u6;bio,iz,sD;b6dri1MgIj0Tme24osevelt,ssi,ux;erts,ins1;c6ve0F;ci,hards1;ir2os;aEeAh8ic6ow20;as6hl0;so;a6illips;m,n1T;ders5et8r7t6;e0Nr4;ez,ry;ers;h21rk0t6vl4;el,te0J;baBg0Blivei01r6;t6w1O;ega,iz;a6eils1guy5ix1owak,ym1E;gy,ka6var1K;ji6muW;ma;aEeCiBo8u6;ll0n6rr0Bssolini,ñ6;oz;lina,oKr6zart;al0Me6r0U;au,no;hhail4ll0;rci0ssi6y0;!er;eWmmad4r6tsu07;in6tin2;!o;aCe8i6op2uo;!n6u;coln,dholm;fe7n0Qr6w0J;oy;bv6v6;re;mmy,rs5u;aBennedy,imuAle0Lo8u7wo6;k,n;mar,znets4;bay6vacs;asY;ra;hn,rl9to,ur,zl4;aAen9ha3imen2o6u3;h6nYu3;an6ns1;ss1;ki0Es5;cks1nsse0D;glesi9ke8noue,shik7to,vano6;u,v;awa;da;as;aBe8itchcock,o7u6;!a3b0ghNynh;a3ffmann,rvat;mingw7nde6rN;rs1;ay;ns5rrQs7y6;asDes;an4hi6;moJ;a9il,o8r7u6;o,tierr2;ayli3ub0;m2nzal2;nd6o,rcia;hi;erAis9lor8o7uj6;ita;st0urni0;es;ch0;nand2;d7insteHsposi6vaL;to;is1wards;aCeBi9omin8u6;bo6rand;is;gu2;az,mitr4;ov;lgado,vi;nkula,rw7vi6;es,s;in;aFhBlarkAo6;h5l6op0rbyn,x;em7li6;ns;an;!e;an8e7iu,o6ristens5u3we;i,ng,u3w,y;!n,on6u3;!g;mpb7rt0st6;ro;ell;aBe8ha3lanco,oyko,r6yrne;ooks,yant;ng;ck7ethov5nnett;en;er,ham;ch,h8iley,rn6;es,i0;er;k,ng;dDl9nd6;ers6rA;en,on,s1;on;eks7iy8var2;ez;ej6;ev;ams",
    MaleName: "true¦0:CE;1:BL;2:C2;3:BT;4:B5;5:9V;6:BZ;7:AT;8:BD;9:AX;A:AO;aB4bA8c97d87e7Gf6Yg6Gh5Wi5Ij4Lk4Bl3Rm2Pn2Eo28p22qu20r1As0Qt06u05v00wNxavi3yGzB;aBor0;cBh8Ine;hCkB;!aB1;ar51eB0;ass2i,oCuB;sDu25;nEsDusB;oBsC;uf;ef;at0g;aJeHiCoByaAP;lfgang,odrow;lBn1O;bDey,frBJlB;aA5iB;am,e,s;e89ur;i,nde5sB;!l7t1;de,lCrr6yB;l1ne;lBt3;a93y;aEern1iB;cCha0nceBrg9Bva0;!nt;ente,t5A;lentin49n8Yughn;lyss4Msm0;aTeOhKiIoErCyB;!l3ro8s1;av9QeBist0oy,um0;nt9Iv54y;bDd7XmBny;!as,mBoharu;aAYie,y;i83y;mBt9;!my,othy;adDeoCia7DomB;!as;!do7M;!de9;dErB;en8HrB;an8GeBy;ll,n8F;!dy;dgh,ic9Tnn3req,ts45;aRcotPeNhJiHoFpenc3tBur1Oylve8Hzym1;anDeBua7B;f0phAFvBwa7A;e57ie;!islaw,l7;lom1nA3uB;leyma8ta;dBl7Jm1;!n7;aDeB;lBrm0;d1t1;h6Sne,qu0Uun,wn,y8;aBbasti0k1Xl41rg40th,ymo9I;m9n;!tB;!ie,y;lCmBnti21q4Iul;!mAu4;ik,vato6V;aWeShe92iOoFuCyB;an,ou;b6LdCf9pe6QssB;!elAI;ol2Uy;an,bIcHdGel,geFh0landA9mEnDry,sCyB;!ce;coe,s;!a95nA;an,eo;l3Jr;e4Qg3n7olfo,ri68;co,ky;bAe9U;cBl7;ar5Oc5NhCkBo;!ey,ie,y;a85ie;gCid,ub6x,yBza;ansh,nS;g8WiB;na8Ss;ch5Yfa4lDmCndBpha4sh6Uul,ymo70;al9Yol2By;i9Ion;f,ph;ent2inB;cy,t1;aFeDhilCier62ol,reB;st1;!ip,lip;d9Brcy,tB;ar,e2V;b3Sdra6Ft44ul;ctav2Vliv3m96rFsCtBum8Uw6;is,to;aCc8SvB;al52;ma;i,l49vJ;athJeHiDoB;aBel,l0ma0r2X;h,m;cCg4i3IkB;h6Uola;hol5XkBol5X;!ol5W;al,d,il,ls1vB;il50;anBy;!a4i4;aWeTiKoFuCyB;l21r1;hamCr5ZstaB;fa,p4G;ed,mF;dibo,e,hamDis1XntCsBussa;es,he;e,y;ad,ed,mB;ad,ed;cGgu4kElDnCtchB;!e5;a78ik;house,o03t1;e,olB;aj;ah,hBk7;a4eB;al,l;hClv2rB;le,ri5v2;di,met;ck,hNlLmOnu4rHs1tDuricCxB;!imilian8Cwe5;e,io;eo,hCi52tB;!eo,hew,ia;eBis;us,w;cDio,k86lCqu6Gsha5tBv2;i2Hy;in,on;!el,oKus;achBcolm,ik;ai,y;amBdi,moud;adB;ou;aReNiMlo2RoIuCyB;le,nd1;cEiDkBth3;aBe;!s;gi,s;as,iaB;no;g0nn6RrenDuBwe5;!iB;e,s;!zo;am,on4;a7Bevi,la4SnDoBst3vi;!nB;!a60el;!ny;mCnBr67ur4Twr4T;ce,d1;ar,o4N;aIeDhaled,iBrist4Vu48y3B;er0p,rB;by,k,ollos;en0iEnBrmit,v2;!dCnBt5C;e0Yy;a5ri4N;r,th;na68rBthem;im,l;aYeQiOoDuB;an,liBst2;an,o,us;aqu2eJhnInGrEsB;eChBi7Bue;!ua;!ph;dBge;an,i,on;!aBny;h,s,th4X;!ath4Wie,nA;!l,sBy;ph;an,e,mB;!mA;d,ffGrDsB;sBus;!e;a5JemCmai8oBry;me,ni0O;i6Uy;!e58rB;ey,y;cHd6kGmFrDsCvi3yB;!d6s1;on,p3;ed,od,rBv4M;e4Zod;al,es,is1;e,ob,ub;k,ob,quB;es;aNbrahMchika,gKkeJlija,nuIrGsDtBv0;ai,sB;uki;aBha0i6Fma4sac;ac,iaB;h,s;a,vinBw2;!g;k,nngu52;!r;nacBor;io;im;in,n;aJeFina4VoDuByd56;be25gBmber4CsD;h,o;m3ra33sBwa3X;se2;aDctCitCn4ErB;be20m0;or;th;bKlJmza,nIo,rDsCyB;a43d6;an,s0;lEo4FrDuBv7;hi40ki,tB;a,o;is1y;an,ey;k,s;!im;ib;aQeMiLlenKoIrEuB;illerCsB;!tavo;mo;aDegBov3;!g,orB;io,y;dy,h57nt;nzaBrd1;lo;!n;lbe4Qno,ovan4R;ne,oDrB;aBry;ld,rd4U;ffr7rge;bri4l6rBv2;la1Zr3Eth,y;aReNiLlJorr0IrB;anDedBitz;!dAeBri24;ri23;cDkB;!ie,lB;in,yn;esJisB;!co,zek;etch3oB;yd;d4lBonn;ip;deriDliCng,rnB;an01;pe,x;co;bi0di;arZdUfrTit0lNmGnFo2rCsteb0th0uge8vBym6zra;an,ere2V;gi,iCnBrol,v2w2;est45ie;c07k;och,rique,zo;aGerFiCmB;aFe2P;lCrB;!h0;!io;s1y;nu4;be09d1iEliDmCt1viBwood;n,s;er,o;ot1Ts;!as,j43sB;ha;a2en;!dAg32mEuCwB;a25in;arB;do;o0Su0S;l,nB;est;aYeOiLoErDuCwByl0;ay8ight;a8dl7nc0st2;ag0ew;minFnDri0ugCyB;le;!l03;!a29nBov0;e5ie,y;go,icB;!k;armuCeBll1on,rk;go;id;anIj0lbeHmetri9nFon,rEsDvCwBxt3;ay8ey;en,in;hawn,mo08;ek,ri0F;is,nBv3;is,y;rt;!dB;re;lKmInHrDvB;e,iB;!d;en,iDne5rByl;eBin,yl;l2Vn;n,o,us;!e,i4ny;iBon;an,en,on;e,lB;as;a06e04hWiar0lLoGrEuCyrB;il,us;rtB;!is;aBistobal;ig;dy,lEnCrB;ey,neli9y;or,rB;ad;by,e,in,l2t1;aGeDiByI;fBnt;fo0Ct1;meCt9velaB;nd;nt;rDuCyB;!t1;de;enB;ce;aFeErisCuB;ck;!tB;i0oph3;st3;d,rlBs;eBie;s,y;cBdric,s11;il;lEmer1rB;ey,lCro5y;ll;!os,t1;eb,v2;ar02eUilTlaSoPrCuByr1;ddy,rtI;aJeEiDuCyB;an,ce,on;ce,no;an,ce;nCtB;!t;dCtB;!on;an,on;dCndB;en,on;!foBl7y;rd;bCrByd;is;!by;i8ke;al,lA;nFrBshoi;at,nCtB;!r10;aBie;rd0S;!edict,iCjam2nA;ie,y;to;n7rBt;eBy;tt;ey;ar0Xb0Nd0Jgust2hm0Gid6ja0ElZmXnPputsiOrFsaEuCveBya0ziz;ry;gust9st2;us;hi;aIchHi4jun,maFnDon,tBy0;hBu06;ur;av,oB;ld;an,nd0A;el;ie;ta;aq;dGgel05tB;hoEoB;i8nB;!i02y;ne;ny;reBy;!as,s,w;ir,mBos;ar;an,beOd6eIfFi,lEonDphonHt1vB;aMin;on;so,zo;an,en;onCrB;edP;so;c,jaEksandDssaExB;!and3;er;ar,er;ndB;ro;rtH;ni;en;ad,eB;d,t;in;aColfBri0vik;!o;mBn;!a;dFeEraCuB;!bakr,lfazl;hBm;am;!l;allEel,oulaye,ulB;!lCrahm0;an;ah,o;ah;av,on",
    Person: "true¦ashton kutchSbRcMdKeIgastNhGinez,jEkDleCmBnettJoAp8r4s3t2v0;a0irgin maG;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussain,carlett johanssJlobodan milosevic,uB;ay romano,eese witherspoIo1ush limbau0;gh;d stewart,nald0;inho,o;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0ruz;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",
    Verb: "true¦awak9born,cannot,fr8g7h5k3le2m1s0wors9;e8h3;ake sure,sg;ngth6ss6;eep tabs,n0;own;as0e2;!t2;iv1onna;ight0;en",
    PhrasalVerb: "true¦0:71;1:6P;2:7D;3:73;4:6I;5:7G;6:75;7:6O;8:6B;9:6C;A:5H;B:70;C:6Z;a7Gb62c5Cd59e57f45g3Nh37iron0j33k2Yl2Km2Bn29o27p1Pr1Es09tQuOvacuum 1wGyammerCzD;eroAip EonD;e0k0;by,up;aJeGhFiEorDrit52;d 1k2Q;mp0n49pe0r8s8;eel Bip 7K;aEiD;gh 06rd0;n Br 3C;it 5Jk8lk6rm 0Qsh 73t66v4O;rgeCsD;e 9herA;aRePhNiJoHrFuDype 0N;ckArn D;d2in,o3Fup;ade YiDot0y 32;ckle67p 79;ne66p Ds4C;d2o6Kup;ck FdEe Dgh5Sme0p o0Dre0;aw3ba4d2in,up;e5Jy 1;by,o6U;ink Drow 5U;ba4ov7up;aDe 4Hll4N;m 1r W;ckCke Elk D;ov7u4N;aDba4d2in,o30up;ba4ft7p4Sw3;a0Gc0Fe09h05i02lYmXnWoVpSquare RtJuHwD;earFiD;ngEtch D;aw3ba4o6O; by;ck Dit 1m 1ss0;in,up;aIe0RiHoFrD;aigh1LiD;ke 5Xn2X;p Drm1O;by,in,o6A;n2Yr 1tc3H;c2Xmp0nd Dr6Gve6y 1;ba4d2up;d2o66up;ar2Uell0ill4TlErDurC;ingCuc8;a32it 3T;be4Brt0;ap 4Dow B;ash 4Yoke0;eep EiDow 9;c3Mp 1;in,oD;ff,v7;gn Eng2Yt Dz8;d2o5up;in,o5up;aFoDu4E;ot Dut0w 5W;aw3ba4f36o5Q;c2EdeAk4Rve6;e Hll0nd GtD; Dtl42;d2in,o5upD;!on;aw3ba4d2in,o1Xup;o5to;al4Kout0rap4K;il6v8;at0eKiJoGuD;b 4Dle0n Dstl8;aDba4d2in52o3Ft2Zu3D;c1Ww3;ot EuD;g2Jnd6;a1Wf2Qo5;ng 4Np6;aDel6inAnt0;c4Xd D;o2Su0C;aQePiOlMoKrHsyc29uD;ll Ft D;aDba4d2in,o1Gt33up;p38w3;ap37d2in,o5t31up;attleCess EiGoD;p 1;ah1Gon;iDp 52re3Lur44wer 52;nt0;ay3YuD;gAmp 9;ck 52g0leCn 9p3V;el 46ncilA;c3Oir 2Hn0ss FtEy D;ba4o4Q; d2c1X;aw3ba4o11;pDw3J;e3It B;arrow3Serd0oD;d6te3R;aJeHiGoEuD;ddl8ll36;c16p 1uth6ve D;al3Ad2in,o5up;ss0x 1;asur8lt 9ss D;a19up;ke Dn 9r2Zs1Kx0;do,o3Xup;aOeMiHoDuck0;a16c36g 0AoDse0;k Dse34;aft7ba4d2forw2Ain3Vov7uD;nd7p;e GghtFnEsDv1T;ten 4D;e 1k 1; 1e2Y;ar43d2;av1Ht 2YvelD; o3L;p 1sh DtchCugh6y1U;in3Lo5;eEick6nock D;d2o3H;eDyA;l2Hp D;aw3ba4d2fSin,o05to,up;aFoEuD;ic8mpA;ke2St2W;c31zz 1;aPeKiHoEuD;nker2Ts0U;lDneArse2O;d De 1;ba4d2fast,oZup;de Et D;ba4on,up;aw3o5;aDlp0;d Fr Dt 1;fDof;rom;in,oO;cZm 1nDve it;d Dg 27kerF;d2in,o5;aReLive Jloss1VoFrEunD; f0M;in39ow 23; Dof 0U;aEb17it,oDr35t0Ou12;ff,n,v7;bo5ft7hJw3;aw3ba4d2in,oDup,w3;ff,n,ut;a17ek0t D;aEb11d2oDr2Zup;ff,n,ut,v7;cEhDl1Pr2Xt,w3;ead;ross;d aEnD;g 1;bo5;a08e01iRlNoJrFuD;cDel 1;k 1;eEighten DownCy 1;aw3o2L;eDshe1G; 1z8;lFol D;aDwi19;bo5r2I;d 9;aEeDip0;sh0;g 9ke0mDrD;e 2K;gLlJnHrFsEzzD;le0;h 2H;e Dm 1;aw3ba4up;d0isD;h 1;e Dl 11;aw3fI;ht ba4ure0;eInEsD;s 1;cFd D;fDo1X;or;e B;dQl 1;cHll Drm0t0O;apYbFd2in,oEtD;hrough;ff,ut,v7;a4ehi1S;e E;at0dge0nd Dy8;o1Mup;o09rD;ess 9op D;aw3bNin,o15;aShPlean 9oDross But 0T;me FoEuntD; o1M;k 1l6;aJbIforGin,oFtEuD;nd7;ogeth7;ut,v7;th,wD;ard;a4y;pDr19w3;art;eDipA;ck BeD;r 1;lJncel0rGsFtch EveA; in;o16up;h Bt6;ry EvD;e V;aw3o12;l Dm02;aDba4d2o10up;r0Vw3;a0He08l01oSrHuD;bbleFcklTilZlEndlTrn 05tDy 10zz6;t B;k 9; ov7;anMeaKiDush6;ghHng D;aEba4d2forDin,o5up;th;bo5lDr0Lw3;ong;teD;n 1;k D;d2in,o5up;ch0;arKgJil 9n8oGssFttlEunce Dx B;aw3ba4;e 9; ar0B;k Bt 1;e 1;d2up; d2;d 1;aIeed0oDurt0;cFw D;aw3ba4d2o5up;ck;k D;in,oK;ck0nk0st6; oJaGef 1nd D;d2ov7up;er;up;r0t D;d2in,oDup;ff,ut;ff,nD;to;ck Jil0nFrgEsD;h B;ainCe B;g BkC; on;in,o5; o5;aw3d2o5up;ay;cMdIsk Fuction6; oD;ff;arDo5;ouD;nd;d D;d2oDup;ff,n;own;t D;o5up;ut",
    Modal: "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to;ay,ight,ust;an,o0;uld",
    Adjective: "true¦0:75;1:7K;2:7Q;3:7J;4:7C;5:5C;6:48;7:49;8:4S;9:61;A:7H;B:70;C:6Z;D:73;E:5X;a6Jb65c5Rd57e4Tf49g41h3Qi35j33k32l2Rm2Gn27o1Rp1Aquack,r10s0Gt09uQvNwFyear5;arp0eJholeIiHoF;man5oFu6C;d6Ezy;despr75s5G;!sa7;eGlFste26;co1Il o4L;!k5;aGiFola4B;b7Tce versa,ol55;ca2gabo63nilla;ltWnJpGrb5Asu4tterF;!moC; f34b1OpGsFti1H;ca7et,ide dMtairs;er,i3N;aPbeco6Rconvin27deMeLfair,ivers4knKprecedYrIsGwF;iel20ritt5Z;i1VuF;pervis0specti3;eFu5;cognLgul6Hl6H;own;ndi3v5Txpect0;cid0rF;!grou5OsF;iz0tood;b7ppeaLssu6GuthorF;iz0;i24ra;aJeHhough4PoGrF;i1oubl0;geth8p,rpB;en5QlFm50rr2Ust0;li3;boo,lFn;ent0;aXcWeUhTiRmug,nobbi3EoPpOqueami3EtJuFymb64;bHi gener55pFrprisi3;erFre0L;! dup8b,i29;du0seq4U;anda6UeIi0PrFy38;aightFip0; fFfF;or5B;adfaCreotyp0;aEec2Gir1JlendBot on; call0le,mb8phist1XrFu0Xvi42;dBry;gnifica2nF;ceEg7;am2Pe8ocki3ut;cFda1em5lfi2Yni1Wpa69re6;o1Gr3W;at58ient28reec58;cr0me,ns serif;aMeIiGoF;buCtt4UuSy4;ghtFv4;!-29f9;ar,bel,condi1du63fres52lHpublic3WsFtard0;is48oF;lu1na2;e1Euc46;bBciF;al,st;aQeOicayu6lacBopuliCrGuF;bl5Amp0;eJiGoF;!b0AfuDmi32p8;mGor,sFva1;ti6;a4We;ciDmF;a0IiF;er,um;ac20rFti1;feAma2Uplexi3v34;rFst;allelHtF;-tiFi4;me;!ed;bQffOkNld fashion0nMpLrg1Hth8utKvF;al,erF;!aHniGt,wF;eiFrouF;ght;ll;do0Ver,g2Msi46;en,posi1; boa5Gg2Kli6;!ay; gua5EbFli6;eat;eHsF;cFer0Hole1;e6uE;d2Tse;ak0eMiLoFua4P;nJrGtF;ab7;thF;!eF;rn;chala2descri50stop;ght5;arby,cessa3Xighbor5xt;aNeLiIoFultip7;bi7derGlFnth5ot,st;dy;a1n;nFx0;iaFor;tuE;di4FnaFre;ci3;cFgenta,in,j03keshift,le,mmoth,ny,sculi6;abEho;aOeJiGoFu13;uti12vi3;mGteraF;l,te;it0;ftIgFth4;al,eGitiF;ma1;nda3D;!-0C;nguBst,tt8;ap1Tind5no0A;agg0uF;niOstifi0veni7;de4gno4Clleg4mSnHpso 1WrF;a1releF;va2; NaMbr0corLdJfluenTiTnIsHtF;aAenDoxF;ic37;a6i2S;a1er,oce2;iGoF;or;reA;deq3Kppr2Z;fFsitu,vitro;ro2;mJpF;arHerfeAoFrop8;li1rtF;a2ed;ti4;eFi0R;d2RnD;aKelJiHoFumdr3C;neCok0rrFs07ur5;if2T;ghfalut1PspF;an2R;liZpf9;lInHrF;d05roF;wi3;dy,gi3;f,low0;ainf9ener2Kiga23lLoKraHuF;ilFng ho;ty;cGtF;ef9is;ef9;ne,od;ea2Eob4;aUeOinNlMoHrF;a1UeFoz1L;e2Eq13tf9;oHrF; keeps,eFm8tuna1;g05ign;liF;sh;ag30ue2;al,i1;dJmGrF;ti7;a7ini6;ne;le; up;bl0i2lDr Gux,voF;ri1uri1;oFreac1F;ff;aOfficie2lNmiMnKreAthere4veJxF;aAcess,peHtraGuF;be2Ml0I;!va1E;ct0rt;n,ryday; Fcouragi3tiE;rou1sui1;ne2;abo23dQe18i1;g8sF;t,ygF;oi3;er;aVeNiHoFrea15ue;mina2ne,ubF;le,tf9;dact1Bfficu1OsGvF;erD;creHeas0gruntl0honeCordGtF;a2ress0;er5;et; LadpKfJgene1PliHrang0spe1PtGvoF;ut;ail0ermin0;be1Mca1ghF;tf9;ia2;an;facto;i5magFngeroZs0I;ed,i3;ly;ertaRhief,ivil,oHrF;aFowd0u0H;mp0v02z0;loNmLnGoi3rrFve0P;eAu1I;cre1grIsHtF;emFra0F;po0D;ta2;ue2;mer08pleF;te,x;ni4ss4;in;aPeLizarElJoGrF;and new,isk,okP;gGna fiWttom,urgeoF;is;us;ank,iI;re;autif9hiGlov0nFst,yoG;eVt;nd;ul;ckGnkru0XrrF;en;!wards; priori,b0Nc0Kd0AfraBg05h04lZma06ntiquYpUrOsMttracti07utheLvIwF;aGkF;wa0U;ke,re;ant garGerF;age;de;ntV;leep,tonisF;hi3;ab,bitIroHtiF;fiF;ci4;ga2;raF;ry;pFt;are2etiPrF;oprF;ia1;at0;arIcohGeFiMl,oof;rt;olF;ic;mi3;ead;ainCgressiGoniF;zi3;ve;st;id; MeKuJvF;aGerD;se;nc0;ed;lt;pt,qF;ua1;hoc,infinitF;um;cuGtu4u1;al;ra1;erPlOoMruLsGuF;nda2;e2oGtraA;ct;lu1rbi3;ng;te;pt;aFve;rd;aze,e;ra2;nt",
    Comparable: "true¦0:40;1:4H;2:44;3:4A;4:2X;5:3W;a4Nb43c3Nd3Ce34f2Qg2Eh23i1Uj1Tk1Ql1Hm1Bn15o13p0Tqu0Rr0IsRtKuIvFw7y6za11;ell26ou3;aBe9hi1Xi7r6;o3y;ck0Mde,l6n1ry,se;d,y;a6i4Lt;k,ry;n1Sr6sI;m,y;a7e6ulgar;nge5rda2xi3;gue,in,st;g0n6pco3Lse5;like0ti1;aAen9hi8i7ough,r6;anqu2Pen1ue;dy,g3Tme0ny,r09;ck,n,rs2Q;d41se;ll,me,rt,s6wd46;te5;aVcarUeThRiQkin0FlMmKoHpGqua1GtAu7w6;eet,ift;b7dd14per0Gr6;e,re2I;sta2Gt4;aAe9iff,r7u6;pXr1;a6ict,o3;ig3Gn0V;a1ep,rn;le,rk;e23i3Gright0;ci29ft,l7o6re,ur;n,thi3;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g36m6;!y;ek,nd3E;ck,l0mp4;a6iTort,rill,y;dy,ll0Yrp;cu0Sve0Sxy;ce,ed,y;d,fe,int0l1Wv15;aBe9i8o6ude;mantic,o1Jsy,u6;gh,nd;ch,pe,tzy;a6d,mo0I;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1RlCoBr8u6;ny,r6;e,p4;egna2ic7o6;fouZud;ey,k0;li05or,te1C;ain,easa2;ny;in5le;dd,f6i0ld,ranR;fi11;aAe8i7o6;b4isy,rm16sy;ce,mb4;a6w;r,t;ive,rr02;aAe8ild,o7u6;nda1Ate;ist,o1;a6ek,llY;n,s0ty;d,tuR;aCeBi9o6ucky;f0Vn7o1Eu6ve0w18y0U;d,sy;e0g;g1Uke0tt4v6;e0i3;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti3;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b4id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te5;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t4uiY;u1y;aIeeb4iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get5mG;my;erce8n6rm,t;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi3;gey,lm8r6;e5i3;ful;!i3;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i3;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd",
    TextValue: "true¦bMeIfChundredNmMnin9one,qu8s6t0zeroN;enMh3rLw0;e0o;l0ntC;fGve;ir0ousandIree;d,t5;e0ix7;cond,ptEven6xtE;adrDintD;e0th;!t0;e9ie8y;i3o0;rt1ur0;!t2;ie4y;ft0rst,ve;e3h,ie2y;ight0lev2;!e1h,ie0y;th;en1;illion0;!th",
    Ordinal: "true¦bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th",
    Cardinal: "true¦bGeDf7hundred,mGnine9one,qu6s4t0zero;en,h2rFw0;e0o;lve,n7;irt8ousand,ree;e0ix4;ptAven3xtA;adr9int9;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion",
    Expression: "true¦a02b01dXeVfuck,gShLlImHnGoDpBshAu7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",
    Adverb: "true¦a07by 05d01eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,w0Bye0;p,s; to,wards5;h1o0wiO;o,t6ward;en,us;everal,o0uch;!me1rt0; of;hXtimes,w07;a1e0;alS;ndomRthN;ar excellDer0oint blank; Mhaps;f3n0;ce0ly;! 0;ag00moU; courHten;ewJo0; longEt 0;onHwithstanding;aybe,eanwhiAore0;!ovB;! aboS;deed,steT;en0;ce;or2u0;l9rther0;!moH; 0ev3;examp0good,suF;le;n mas1v0;er;se;e0irect1; 1finite0;ly;ju7trop;far,n0;ow; CbroBd nauseam,gAl5ny2part,side,t 0w3;be5l0mo5wor5;arge,ea4;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori",
    Preposition: "true¦'o,-,aKbHcGdFexcept,fEinDmidPnotwithstandiQoBpRqua,sAt6u3vi2w0;/o,hereMith0;!in,oQ;a,s-a-vis;n1p0;!on;like,til;h0ill,owards;an,r0;ough0u;!oI;ans,ince,o that;',f0n1ut;!f;!to;or,rom;espite,own,u3;hez,irca;ar1e0oAy;low,sides,tween;ri6;',bo7cross,ft6lo5m3propos,round,s1t0;!op;! long 0;as;id0ong0;!st;ng;er;ut",
    Determiner: "true¦aAboth,d8e5few,l3mu7neiCown,plenty,some,th2various,wh0;at0ich0;evB;at,e3is,ose;a,e0;!ast,s;a1i6l0nough,very;!se;ch;e0u;!s;!n0;!o0y;th0;er"
  }, at = ["Person", "Place", "Organization"], it = {
    Noun: {
      notA: ["Verb", "Adjective", "Adverb"]
    },
    Singular: {
      isA: "Noun",
      notA: "Plural"
    },
    ProperNoun: {
      isA: "Noun"
    },
    Person: {
      isA: ["ProperNoun", "Singular"],
      notA: ["Place", "Organization"]
    },
    FirstName: {
      isA: "Person"
    },
    MaleName: {
      isA: "FirstName",
      notA: ["FemaleName", "LastName"]
    },
    FemaleName: {
      isA: "FirstName",
      notA: ["MaleName", "LastName"]
    },
    LastName: {
      isA: "Person",
      notA: ["FirstName"]
    },
    Honorific: {
      isA: "Noun",
      notA: ["FirstName", "LastName"]
    },
    Place: {
      isA: "Singular",
      notA: ["Person", "Organization"]
    },
    Country: {
      isA: ["Place", "ProperNoun"],
      notA: ["City"]
    },
    City: {
      isA: ["Place", "ProperNoun"],
      notA: ["Country"]
    },
    Region: {
      isA: ["Place", "ProperNoun"]
    },
    Address: {
      isA: "Place"
    },
    Organization: {
      isA: ["Singular", "ProperNoun"],
      notA: ["Person", "Place"]
    },
    SportsTeam: {
      isA: "Organization"
    },
    School: {
      isA: "Organization"
    },
    Company: {
      isA: "Organization"
    },
    Plural: {
      isA: "Noun",
      notA: ["Singular"]
    },
    Uncountable: {
      isA: "Noun"
    },
    Pronoun: {
      isA: "Noun",
      notA: at
    },
    Actor: {
      isA: "Noun",
      notA: at
    },
    Activity: {
      isA: "Noun",
      notA: ["Person", "Place"]
    },
    Unit: {
      isA: "Noun",
      notA: at
    },
    Demonym: {
      isA: ["Noun", "ProperNoun"],
      notA: at
    },
    Possessive: {
      isA: "Noun"
    }
  }, ot = {
    Verb: {
      notA: ["Noun", "Adjective", "Adverb", "Value"]
    },
    PresentTense: {
      isA: "Verb",
      notA: ["PastTense", "Copula", "FutureTense"]
    },
    Infinitive: {
      isA: "PresentTense",
      notA: ["PastTense", "Gerund"]
    },
    Gerund: {
      isA: "PresentTense",
      notA: ["PastTense", "Copula", "FutureTense"]
    },
    PastTense: {
      isA: "Verb",
      notA: ["FutureTense"]
    },
    FutureTense: {
      isA: "Verb"
    },
    Copula: {
      isA: "Verb"
    },
    Modal: {
      isA: "Verb",
      notA: ["Infinitive"]
    },
    PerfectTense: {
      isA: "Verb",
      notA: "Gerund"
    },
    Pluperfect: {
      isA: "Verb"
    },
    Participle: {
      isA: "Verb"
    },
    PhrasalVerb: {
      isA: "Verb"
    },
    Particle: {
      isA: "PhrasalVerb"
    }
  }, st = {
    Value: {
      notA: ["Verb", "Adjective", "Adverb"]
    },
    Ordinal: {
      isA: "Value",
      notA: ["Cardinal"]
    },
    Cardinal: {
      isA: "Value",
      notA: ["Ordinal"]
    },
    RomanNumeral: {
      isA: "Cardinal",
      notA: ["Ordinal", "TextValue"]
    },
    TextValue: {
      isA: "Value",
      notA: ["NumericValue"]
    },
    NumericValue: {
      isA: "Value",
      notA: ["TextValue"]
    },
    Money: {
      isA: "Cardinal"
    },
    Percent: {
      isA: "Value"
    }
  }, ut = ["Noun", "Verb", "Adjective", "Adverb", "Value"], lt = {
    Adjective: {
      notA: ["Noun", "Verb", "Adverb", "Value"]
    },
    Comparable: {
      isA: ["Adjective"]
    },
    Comparative: {
      isA: ["Adjective"]
    },
    Superlative: {
      isA: ["Adjective"],
      notA: ["Comparative"]
    },
    NumberRange: {
      isA: ["Contraction"]
    },
    Adverb: {
      notA: ["Noun", "Verb", "Adjective", "Value"]
    },
    Date: {
      notA: ["Verb", "Conjunction", "Adverb", "Preposition", "Adjective"]
    },
    Month: {
      isA: ["Date", "Singular"],
      notA: ["Year", "WeekDay", "Time"]
    },
    WeekDay: {
      isA: ["Date", "Noun"]
    },
    Determiner: {
      notA: ut
    },
    Conjunction: {
      notA: ut
    },
    Preposition: {
      notA: ut
    },
    QuestionWord: {
      notA: ["Determiner"]
    },
    Currency: {},
    Expression: {
      notA: ["Noun", "Adjective", "Verb", "Adverb"]
    },
    Abbreviation: {},
    Url: {
      notA: ["HashTag", "PhoneNumber", "Verb", "Adjective", "Value", "AtMention", "Email"]
    },
    PhoneNumber: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "Email"]
    },
    HashTag: {},
    AtMention: {
      isA: ["Noun"],
      notA: ["HashTag", "Verb", "Adjective", "Value", "Email"]
    },
    Emoji: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Emoticon: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Email: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Auxiliary: {
      notA: ["Noun", "Adjective", "Value"]
    },
    Acronym: {
      notA: ["Plural", "RomanNumeral"]
    },
    Negative: {
      notA: ["Noun", "Adjective", "Value"]
    },
    Condition: {
      notA: ["Verb", "Adjective", "Noun", "Value"]
    }
  }, ct = {
    Noun: "blue",
    Verb: "green",
    Negative: "green",
    Date: "red",
    Value: "red",
    Adjective: "magenta",
    Preposition: "cyan",
    Conjunction: "cyan",
    Determiner: "cyan",
    Adverb: "cyan"
  }, ht = function ht(e) {
    return Object.keys(e).forEach(function (t) {
      ct[t] ? e[t].color = ct[t] : e[t].isA.some(function (n) {
        return !!ct[n] && (e[t].color = ct[n], !0);
      });
    }), e;
  }, dt = function dt(e) {
    return Object.keys(e).forEach(function (t) {
      for (var n = e[t], r = n.isA.length, a = 0; a < r; a++) {
        var i = n.isA[a];
        e[i] && (n.isA = n.isA.concat(e[i].isA));
      }

      n.isA = function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      }(n.isA);
    }), e;
  }, ft = function ft(e) {
    var t = Object.keys(e);
    return t.forEach(function (n) {
      var r = e[n];
      r.notA = r.notA || [], r.isA.forEach(function (t) {
        if (e[t] && e[t].notA) {
          var n = "string" == typeof e[t].notA ? [e[t].isA] : e[t].notA || [];
          r.notA = r.notA.concat(n);
        }
      });

      for (var a = 0; a < t.length; a++) {
        var i = t[a];
        -1 !== e[i].notA.indexOf(n) && r.notA.push(i);
      }

      r.notA = function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      }(r.notA);
    }), e;
  }, mt = function mt(e) {
    var t = Object.keys(e);
    return t.forEach(function (n) {
      var r = e[n];
      r.lineage = [];

      for (var a = 0; a < t.length; a++) {
        -1 !== e[t[a]].isA.indexOf(n) && r.lineage.push(t[a]);
      }
    }), e;
  }, pt = function pt(e) {
    return e = function (e) {
      return Object.keys(e).forEach(function (t) {
        var n = e[t];
        n.isA = n.isA || [], "string" == typeof n.isA && (n.isA = [n.isA]), n.notA = n.notA || [], "string" == typeof n.notA && (n.notA = [n.notA]);
      }), e;
    }(e), e = dt(e), e = ft(e), e = ht(e), e = mt(e);
  }, gt = function gt(e, t) {
    Object.keys(e).forEach(function (n) {
      t[n] = e[n];
    });
  }, vt = function () {
    var e = {};
    return gt(it, e), gt(ot, e), gt(st, e), gt(lt, e), e = pt(e);
  }(), bt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", yt = bt.split("").reduce(function (e, t, n) {
    return e[t] = n, e;
  }, {}), At = function At(e) {
    if (void 0 !== yt[e]) return yt[e];

    for (var t = 0, n = 1, r = 36, a = 1; n < e.length; t += r, n++, r *= 36) {
      ;
    }

    for (var i = e.length - 1; i >= 0; i--, a *= 36) {
      var o = e.charCodeAt(i) - 48;
      o > 10 && (o -= 7), t += o * a;
    }

    return t;
  }, wt = function wt(e, t, n) {
    var r = At(t);
    return r < e.symCount ? e.syms[r] : n + r + 1 - e.symCount;
  }, kt = function kt(e) {
    var t = {
      nodes: e.split(";"),
      syms: [],
      symCount: 0
    };
    return e.match(":") && function (e) {
      for (var t = new RegExp("([0-9A-Z]+):([0-9A-Z]+)"), n = 0; n < e.nodes.length; n++) {
        var r = t.exec(e.nodes[n]);

        if (!r) {
          e.symCount = n;
          break;
        }

        e.syms[At(r[1])] = At(r[2]);
      }

      e.nodes = e.nodes.slice(e.symCount, e.nodes.length);
    }(t), function (e) {
      var t = [];
      return function n(r, a) {
        var i = e.nodes[r];
        "!" === i[0] && (t.push(a), i = i.slice(1));

        for (var o = i.split(/([A-Z0-9,]+)/g), s = 0; s < o.length; s += 2) {
          var u = o[s],
              l = o[s + 1];

          if (u) {
            var c = a + u;
            if ("," !== l && void 0 !== l) n(wt(e, l, r), c);else t.push(c);
          }
        }
      }(0, ""), t;
    }(t);
  }, $t = function $t(e) {
    var t = e.split("|").reduce(function (e, t) {
      var n = t.split("¦");
      return e[n[0]] = n[1], e;
    }, {}),
        n = {};
    return Object.keys(t).forEach(function (e) {
      var r = kt(t[e]);
      "true" === e && (e = !0);

      for (var a = 0; a < r.length; a++) {
        var i = r[a];
        !0 === n.hasOwnProperty(i) ? !1 === Array.isArray(n[i]) ? n[i] = [n[i], e] : n[i].push(e) : n[i] = e;
      }
    }), n;
  }, Pt = function Pt(e, t, n) {
    void 0 !== n[e] ? ("string" == typeof n[e] && (n[e] = [n[e]]), n[e].push(t)) : n[e] = t;
  }, Gt = Pt, Et = function Et(e, t, n) {
    var r = n.words,
        a = n.transforms,
        i = e.split(" ");

    if (i.length > 1 && (n.hasCompound[i[0]] = !0), "Singular" === t) {
      var o = a.toPlural(e, n);
      r[o] = r[o] || "Plural";
    }

    if ("Infinitive" === t) for (var s = a.conjugate(e, n), u = Object.keys(s), l = 0; l < u.length; l++) {
      var c = s[u[l]];
      r[c] = r[c] || u[l];
    }
    if ("Comparable" === t) for (var h = a.adjectives(e), d = Object.keys(h), f = 0; f < d.length; f++) {
      var m = h[d[f]];
      r[m] = r[m] || d[f];
    }

    if ("PhrasalVerb" === t) {
      Pt(e, "Infinitive", r);

      for (var p = a.conjugate(i[0], n), g = Object.keys(p), v = 0; v < g.length; v++) {
        n.hasCompound[p[g[v]]] = !0;
        var b = p[g[v]] + " " + i[1];
        Pt(b, g[v], r), Pt(b, "PhrasalVerb", r);
      }
    }

    if ("Demonym" === t) {
      var y = a.toPlural(e, n);
      r[y] = r[y] || ["Demonym", "Plural"];
    }
  }, Ct = function Ct(e) {
    for (var t = e.irregulars.nouns, n = Object.keys(t), r = 0; r < n.length; r++) {
      var a = n[r];
      e.words[a] = "Singular", e.words[t[a]] = "Plural";
    }

    for (var i = e.irregulars.verbs, o = Object.keys(i), s = function s(t) {
      var n = o[t];
      e.words[n] = e.words[n] || "Infinitive";
      var r = e.transforms.conjugate(n, e);
      r = Object.assign(r, i[n]), Object.keys(r).forEach(function (t) {
        e.words[r[t]] = e.words[r[t]] || t;
      });
    }, u = 0; u < o.length; u++) {
      s(u);
    }
  }, Ft = {
    "20th century fox": "Organization",
    "7 eleven": "Organization",
    "7-eleven": "Organization",
    g8: "Organization",
    "motel 6": "Organization",
    vh1: "Organization",
    q1: "Date",
    q2: "Date",
    q3: "Date",
    q4: "Date"
  }, Nt = {
    g: "Gerund",
    prt: "Participle",
    perf: "PerfectTense",
    pst: "PastTense",
    fut: "FuturePerfect",
    pres: "PresentTense",
    pluperf: "Pluperfect",
    a: "Actor"
  }, jt = {
    act: {
      a: "_or"
    },
    age: {
      g: "ageing",
      pst: "aged",
      pres: "ages"
    },
    aim: {
      a: "_er",
      g: "_ing",
      pst: "_ed"
    },
    arise: {
      prt: "_n",
      pst: "arose"
    },
    babysit: {
      a: "_ter",
      pst: "babysat"
    },
    ban: {
      a: "",
      g: "_ning",
      pst: "_ned"
    },
    be: {
      a: "",
      g: "am",
      prt: "been",
      pst: "was",
      pres: "is"
    },
    beat: {
      a: "_er",
      g: "_ing",
      prt: "_en"
    },
    become: {
      prt: "_"
    },
    begin: {
      g: "_ning",
      prt: "begun",
      pst: "began"
    },
    being: {
      g: "are",
      pst: "were",
      pres: "are"
    },
    bend: {
      prt: "bent"
    },
    bet: {
      a: "_ter",
      prt: "_"
    },
    bind: {
      pst: "bound"
    },
    bite: {
      g: "biting",
      prt: "bitten",
      pst: "bit"
    },
    bleed: {
      prt: "bled",
      pst: "bled"
    },
    blow: {
      prt: "_n",
      pst: "blew"
    },
    boil: {
      a: "_er"
    },
    brake: {
      prt: "broken"
    },
    "break": {
      pst: "broke"
    },
    breed: {
      pst: "bred"
    },
    bring: {
      prt: "brought",
      pst: "brought"
    },
    broadcast: {
      pst: "_"
    },
    budget: {
      pst: "_ed"
    },
    build: {
      prt: "built",
      pst: "built"
    },
    burn: {
      prt: "_ed"
    },
    burst: {
      prt: "_"
    },
    buy: {
      prt: "bought",
      pst: "bought"
    },
    can: {
      a: "",
      fut: "_",
      g: "",
      pst: "could",
      perf: "could",
      pluperf: "could",
      pres: "_"
    },
    "catch": {
      pst: "caught"
    },
    choose: {
      g: "choosing",
      prt: "chosen",
      pst: "chose"
    },
    cling: {
      prt: "clung"
    },
    come: {
      prt: "_",
      pst: "came"
    },
    compete: {
      a: "competitor",
      g: "competing",
      pst: "_d"
    },
    cost: {
      pst: "_"
    },
    creep: {
      prt: "crept"
    },
    cut: {
      prt: "_"
    },
    deal: {
      prt: "_t",
      pst: "_t"
    },
    develop: {
      a: "_er",
      g: "_ing",
      pst: "_ed"
    },
    die: {
      g: "dying",
      pst: "_d"
    },
    dig: {
      g: "_ging",
      prt: "dug",
      pst: "dug"
    },
    dive: {
      prt: "_d"
    },
    "do": {
      pst: "did",
      pres: "_es"
    },
    draw: {
      prt: "_n",
      pst: "drew"
    },
    dream: {
      prt: "_t"
    },
    drink: {
      prt: "drunk",
      pst: "drank"
    },
    drive: {
      g: "driving",
      prt: "_n",
      pst: "drove"
    },
    drop: {
      g: "_ping",
      pst: "_ped"
    },
    eat: {
      a: "_er",
      g: "_ing",
      prt: "_en",
      pst: "ate"
    },
    edit: {
      g: "_ing"
    },
    egg: {
      pst: "_ed"
    },
    fall: {
      prt: "_en",
      pst: "fell"
    },
    feed: {
      prt: "fed",
      pst: "fed"
    },
    feel: {
      a: "_er",
      pst: "felt"
    },
    fight: {
      prt: "fought",
      pst: "fought"
    },
    find: {
      pst: "found"
    },
    flee: {
      g: "_ing",
      prt: "fled"
    },
    fling: {
      prt: "flung"
    },
    fly: {
      prt: "flown",
      pst: "flew"
    },
    forbid: {
      pst: "forbade"
    },
    forget: {
      g: "_ing",
      prt: "forgotten",
      pst: "forgot"
    },
    forgive: {
      g: "forgiving",
      prt: "_n",
      pst: "forgave"
    },
    free: {
      a: "",
      g: "_ing"
    },
    freeze: {
      g: "freezing",
      prt: "frozen",
      pst: "froze"
    },
    get: {
      pst: "got",
      prt: "gotten"
    },
    give: {
      g: "giving",
      prt: "_n",
      pst: "gave"
    },
    go: {
      prt: "_ne",
      pst: "went",
      pres: "goes"
    },
    grow: {
      prt: "_n"
    },
    hang: {
      prt: "hung",
      pst: "hung"
    },
    have: {
      g: "having",
      prt: "had",
      pst: "had",
      pres: "has"
    },
    hear: {
      prt: "_d",
      pst: "_d"
    },
    hide: {
      prt: "hidden",
      pst: "hid"
    },
    hit: {
      prt: "_"
    },
    hold: {
      prt: "held",
      pst: "held"
    },
    hurt: {
      prt: "_",
      pst: "_"
    },
    ice: {
      g: "icing",
      pst: "_d"
    },
    imply: {
      pst: "implied",
      pres: "implies"
    },
    is: {
      a: "",
      g: "being",
      pst: "was",
      pres: "_"
    },
    keep: {
      prt: "kept"
    },
    kneel: {
      prt: "knelt"
    },
    know: {
      prt: "_n"
    },
    lay: {
      prt: "laid",
      pst: "laid"
    },
    lead: {
      prt: "led",
      pst: "led"
    },
    leap: {
      prt: "_t"
    },
    leave: {
      prt: "left",
      pst: "left"
    },
    lend: {
      prt: "lent"
    },
    lie: {
      g: "lying",
      pst: "lay"
    },
    light: {
      prt: "lit",
      pst: "lit"
    },
    log: {
      g: "_ging",
      pst: "_ged"
    },
    loose: {
      prt: "lost"
    },
    lose: {
      g: "losing",
      pst: "lost"
    },
    make: {
      prt: "made",
      pst: "made"
    },
    mean: {
      prt: "_t",
      pst: "_t"
    },
    meet: {
      a: "_er",
      g: "_ing",
      prt: "met",
      pst: "met"
    },
    miss: {
      pres: "_"
    },
    pay: {
      prt: "paid",
      pst: "paid"
    },
    prove: {
      prt: "_n"
    },
    puke: {
      g: "puking"
    },
    put: {
      prt: "_"
    },
    quit: {
      prt: "_"
    },
    read: {
      prt: "_",
      pst: "_"
    },
    ride: {
      prt: "ridden"
    },
    ring: {
      prt: "rung",
      pst: "rang"
    },
    rise: {
      fut: "will have _n",
      g: "rising",
      prt: "_n",
      pst: "rose",
      pluperf: "had _n"
    },
    rub: {
      g: "_bing",
      pst: "_bed"
    },
    run: {
      g: "_ning",
      prt: "_",
      pst: "ran"
    },
    say: {
      prt: "said",
      pst: "said",
      pres: "_s"
    },
    seat: {
      prt: "sat"
    },
    see: {
      g: "_ing",
      prt: "_n",
      pst: "saw"
    },
    seek: {
      prt: "sought"
    },
    sell: {
      prt: "sold",
      pst: "sold"
    },
    send: {
      prt: "sent"
    },
    set: {
      prt: "_"
    },
    sew: {
      prt: "_n"
    },
    shake: {
      prt: "_n"
    },
    shave: {
      prt: "_d"
    },
    shed: {
      g: "_ding",
      pst: "_",
      pres: "_s"
    },
    shine: {
      prt: "shone",
      pst: "shone"
    },
    shoot: {
      prt: "shot",
      pst: "shot"
    },
    show: {
      pst: "_ed"
    },
    shut: {
      prt: "_"
    },
    sing: {
      prt: "sung",
      pst: "sang"
    },
    sink: {
      pst: "sank",
      pluperf: "had sunk"
    },
    sit: {
      pst: "sat"
    },
    ski: {
      pst: "_ied"
    },
    slay: {
      prt: "slain"
    },
    sleep: {
      prt: "slept"
    },
    slide: {
      prt: "slid",
      pst: "slid"
    },
    smash: {
      pres: "_es"
    },
    sneak: {
      prt: "snuck"
    },
    speak: {
      fut: "will have spoken",
      prt: "spoken",
      pst: "spoke",
      perf: "have spoken",
      pluperf: "had spoken"
    },
    speed: {
      prt: "sped"
    },
    spend: {
      prt: "spent"
    },
    spill: {
      prt: "_ed",
      pst: "spilt"
    },
    spin: {
      g: "_ning",
      prt: "spun",
      pst: "spun"
    },
    spit: {
      prt: "spat"
    },
    split: {
      prt: "_"
    },
    spread: {
      pst: "_"
    },
    spring: {
      prt: "sprung"
    },
    stand: {
      pst: "stood"
    },
    steal: {
      a: "_er",
      pst: "stole"
    },
    stick: {
      pst: "stuck"
    },
    sting: {
      pst: "stung"
    },
    stink: {
      prt: "stunk",
      pst: "stunk"
    },
    stream: {
      a: "_er"
    },
    strew: {
      prt: "_n"
    },
    strike: {
      g: "striking",
      pst: "struck"
    },
    suit: {
      a: "_er",
      g: "_ing",
      pst: "_ed"
    },
    sware: {
      prt: "sworn"
    },
    swear: {
      pst: "swore"
    },
    sweep: {
      prt: "swept"
    },
    swim: {
      g: "_ming",
      pst: "swam"
    },
    swing: {
      pst: "swung"
    },
    take: {
      fut: "will have _n",
      pst: "took",
      perf: "have _n",
      pluperf: "had _n"
    },
    teach: {
      pst: "taught",
      pres: "_es"
    },
    tear: {
      pst: "tore"
    },
    tell: {
      pst: "told"
    },
    think: {
      pst: "thought"
    },
    thrive: {
      prt: "_d"
    },
    tie: {
      g: "tying",
      pst: "_d"
    },
    undergo: {
      prt: "_ne"
    },
    understand: {
      pst: "understood"
    },
    upset: {
      prt: "_"
    },
    wait: {
      a: "_er",
      g: "_ing",
      pst: "_ed"
    },
    wake: {
      pst: "woke"
    },
    wear: {
      pst: "wore"
    },
    weave: {
      prt: "woven"
    },
    weep: {
      prt: "wept"
    },
    win: {
      g: "_ning",
      pst: "won"
    },
    wind: {
      prt: "wound"
    },
    withdraw: {
      pst: "withdrew"
    },
    wring: {
      prt: "wrung"
    },
    write: {
      g: "writing",
      prt: "written",
      pst: "wrote"
    }
  }, Bt = Object.keys(jt), xt = function xt(e) {
    var t = Bt[e],
        n = {};
    Object.keys(jt[t]).forEach(function (e) {
      var r = jt[t][e];
      r = r.replace("_", t), n[Nt[e]] = r;
    }), jt[t] = n;
  }, Dt = 0; Dt < Bt.length; Dt++) {
    xt(Dt);
  }

  var Ot = jt,
      Tt = {
    b: [{
      reg: /([^aeiou][aeiou])b$/i,
      repl: {
        pr: "$1bs",
        pa: "$1bbed",
        gr: "$1bbing"
      }
    }],
    d: [{
      reg: /(end)$/i,
      repl: {
        pr: "$1s",
        pa: "ent",
        gr: "$1ing",
        ar: "$1er"
      }
    }, {
      reg: /(eed)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing",
        ar: "$1er"
      }
    }, {
      reg: /(ed)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ded",
        ar: "$1der",
        gr: "$1ding"
      }
    }, {
      reg: /([^aeiou][ou])d$/i,
      repl: {
        pr: "$1ds",
        pa: "$1dded",
        gr: "$1dding"
      }
    }],
    e: [{
      reg: /(eave)$/i,
      repl: {
        pr: "$1s",
        pa: "$1d",
        gr: "eaving",
        ar: "$1r"
      }
    }, {
      reg: /(ide)$/i,
      repl: {
        pr: "$1s",
        pa: "ode",
        gr: "iding",
        ar: "ider"
      }
    }, {
      reg: /(ake)$/i,
      repl: {
        pr: "$1s",
        pa: "ook",
        gr: "aking",
        ar: "$1r"
      }
    }, {
      reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
      repl: {
        pr: "$1es",
        pa: "$1ed",
        gr: "$1ing",
        prt: "$1en"
      }
    }, {
      reg: /([bd]l)e$/i,
      repl: {
        pr: "$1es",
        pa: "$1ed",
        gr: "$1ing"
      }
    }, {
      reg: /(om)e$/i,
      repl: {
        pr: "$1es",
        pa: "ame",
        gr: "$1ing"
      }
    }],
    g: [{
      reg: /([^aeiou][ou])g$/i,
      repl: {
        pr: "$1gs",
        pa: "$1gged",
        gr: "$1gging"
      }
    }],
    h: [{
      reg: /(..)([cs]h)$/i,
      repl: {
        pr: "$1$2es",
        pa: "$1$2ed",
        gr: "$1$2ing"
      }
    }],
    k: [{
      reg: /(ink)$/i,
      repl: {
        pr: "$1s",
        pa: "unk",
        gr: "$1ing",
        ar: "$1er"
      }
    }],
    m: [{
      reg: /([^aeiou][aeiou])m$/i,
      repl: {
        pr: "$1ms",
        pa: "$1mmed",
        gr: "$1mming"
      }
    }],
    n: [{
      reg: /(en)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing"
      }
    }],
    p: [{
      reg: /(e)(ep)$/i,
      repl: {
        pr: "$1$2s",
        pa: "$1pt",
        gr: "$1$2ing",
        ar: "$1$2er"
      }
    }, {
      reg: /([^aeiou][aeiou])p$/i,
      repl: {
        pr: "$1ps",
        pa: "$1pped",
        gr: "$1pping"
      }
    }, {
      reg: /([aeiu])p$/i,
      repl: {
        pr: "$1ps",
        pa: "$1p",
        gr: "$1pping"
      }
    }],
    r: [{
      reg: /([td]er)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing"
      }
    }, {
      reg: /(er)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing"
      }
    }],
    s: [{
      reg: /(ish|tch|ess)$/i,
      repl: {
        pr: "$1es",
        pa: "$1ed",
        gr: "$1ing"
      }
    }],
    t: [{
      reg: /(ion|end|e[nc]t)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing"
      }
    }, {
      reg: /(.eat)$/i,
      repl: {
        pr: "$1s",
        pa: "$1ed",
        gr: "$1ing"
      }
    }, {
      reg: /([aeiu])t$/i,
      repl: {
        pr: "$1ts",
        pa: "$1t",
        gr: "$1tting"
      }
    }, {
      reg: /([^aeiou][aeiou])t$/i,
      repl: {
        pr: "$1ts",
        pa: "$1tted",
        gr: "$1tting"
      }
    }],
    w: [{
      reg: /(..)(ow)$/i,
      repl: {
        pr: "$1$2s",
        pa: "$1ew",
        gr: "$1$2ing",
        prt: "$1$2n"
      }
    }],
    y: [{
      reg: /([i|f|rr])y$/i,
      repl: {
        pr: "$1ies",
        pa: "$1ied",
        gr: "$1ying"
      }
    }],
    z: [{
      reg: /([aeiou]zz)$/i,
      repl: {
        pr: "$1es",
        pa: "$1ed",
        gr: "$1ing"
      }
    }]
  },
      Vt = {
    pr: "PresentTense",
    pa: "PastTense",
    gr: "Gerund",
    prt: "Participle",
    ar: "Actor"
  },
      zt = function zt(e, t) {
    for (var n = {}, r = Object.keys(t.repl), a = 0; a < r.length; a += 1) {
      var i = r[a];
      n[Vt[i]] = e.replace(t.reg, t.repl[i]);
    }

    return n;
  },
      Ht = function Ht() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = e[e.length - 1];
    if (!0 === Tt.hasOwnProperty(t)) for (var n = 0; n < Tt[t].length; n += 1) {
      var r = Tt[t][n].reg;
      if (!0 === r.test(e)) return zt(e, Tt[t][n]);
    }
    return {};
  },
      It = /[bcdfghjklmnpqrstvwxz]y$/,
      Mt = {
    Gerund: function Gerund(e) {
      return "e" === e.charAt(e.length - 1) ? e.replace(/e$/, "ing") : e + "ing";
    },
    PresentTense: function PresentTense(e) {
      return "s" === e.charAt(e.length - 1) ? e + "es" : !0 === It.test(e) ? e.slice(0, -1) + "ies" : e + "s";
    },
    PastTense: function PastTense(e) {
      return "e" === e.charAt(e.length - 1) ? e + "d" : "ed" === e.substr(-2) ? e : !0 === It.test(e) ? e.slice(0, -1) + "ied" : e + "ed";
    }
  },
      St = function St() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = {};
    return t && t.irregulars && !0 === t.irregulars.verbs.hasOwnProperty(e) && (n = Object.assign({}, t.irregulars.verbs[e])), void 0 === (n = Object.assign({}, Ht(e), n)).Gerund && (n.Gerund = Mt.Gerund(e)), void 0 === n.PastTense && (n.PastTense = Mt.PastTense(e)), void 0 === n.PresentTense && (n.PresentTense = Mt.PresentTense(e)), n;
  },
      Lt = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/],
      Jt = [/ary$/],
      Wt = {
    nice: "nicest",
    late: "latest",
    hard: "hardest",
    inner: "innermost",
    outer: "outermost",
    far: "furthest",
    worse: "worst",
    bad: "worst",
    good: "best",
    big: "biggest",
    large: "largest"
  },
      _t = [{
    reg: /y$/i,
    repl: "iest"
  }, {
    reg: /([aeiou])t$/i,
    repl: "$1ttest"
  }, {
    reg: /([aeou])de$/i,
    repl: "$1dest"
  }, {
    reg: /nge$/i,
    repl: "ngest"
  }, {
    reg: /([aeiou])te$/i,
    repl: "$1test"
  }],
      qt = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/],
      Rt = [/ary$/, /ous$/],
      Kt = {
    grey: "greyer",
    gray: "grayer",
    green: "greener",
    yellow: "yellower",
    red: "redder",
    good: "better",
    well: "better",
    bad: "worse",
    sad: "sadder",
    big: "bigger"
  },
      Qt = [{
    reg: /y$/i,
    repl: "ier"
  }, {
    reg: /([aeiou])t$/i,
    repl: "$1tter"
  }, {
    reg: /([aeou])de$/i,
    repl: "$1der"
  }, {
    reg: /nge$/i,
    repl: "nger"
  }],
      Ut = {
    toSuperlative: function toSuperlative(e) {
      if (Wt.hasOwnProperty(e)) return Wt[e];

      for (var t = 0; t < _t.length; t++) {
        if (_t[t].reg.test(e)) return e.replace(_t[t].reg, _t[t].repl);
      }

      for (var n = 0; n < Jt.length; n++) {
        if (!0 === Jt[n].test(e)) return null;
      }

      for (var r = 0; r < Lt.length; r++) {
        if (!0 === Lt[r].test(e)) return "e" === e.charAt(e.length - 1) ? e + "st" : e + "est";
      }

      return e + "est";
    },
    toComparative: function toComparative(e) {
      if (Kt.hasOwnProperty(e)) return Kt[e];

      for (var t = 0; t < Qt.length; t++) {
        if (!0 === Qt[t].reg.test(e)) return e.replace(Qt[t].reg, Qt[t].repl);
      }

      for (var n = 0; n < Rt.length; n++) {
        if (!0 === Rt[n].test(e)) return null;
      }

      for (var r = 0; r < qt.length; r++) {
        if (!0 === qt[r].test(e)) return e + "er";
      }

      return !0 === /e$/.test(e) ? e + "r" : e + "er";
    }
  },
      Xt = function Xt(e) {
    var t = {},
        n = Ut.toSuperlative(e);
    n && (t.Superlative = n);
    var r = Ut.toComparative(e);
    return r && (t.Comparative = r), t;
  },
      Zt = {
    a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"], [/([ti])a$/i, "$1a"]],
    e: [[/(kn|l|w)ife$/i, "$1ives"], [/(hive)$/i, "$1s"], [/([m|l])ouse$/i, "$1ice"], [/([m|l])ice$/i, "$1ice"]],
    f: [[/^(dwar|handkerchie|hoo|scar|whar)f$/i, "$1ves"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, "$1ves"]],
    i: [[/(octop|vir)i$/i, "$1i"]],
    m: [[/([ti])um$/i, "$1a"]],
    n: [[/^(oxen)$/i, "$1"]],
    o: [[/(al|ad|at|er|et|ed|ad)o$/i, "$1oes"]],
    s: [[/(ax|test)is$/i, "$1es"], [/(alias|status)$/i, "$1es"], [/sis$/i, "ses"], [/(bu)s$/i, "$1ses"], [/(sis)$/i, "ses"], [/^(?!talis|.*hu)(.*)man$/i, "$1men"], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"]],
    x: [[/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"], [/^(ox)$/i, "$1en"]],
    y: [[/([^aeiouy]|qu)y$/i, "$1ies"]],
    z: [[/(quiz)$/i, "$1zes"]]
  },
      Yt = /(x|ch|sh|s|z)$/,
      en = function en(e) {
    var t = e[e.length - 1];
    if (!0 === Zt.hasOwnProperty(t)) for (var n = 0; n < Zt[t].length; n += 1) {
      var r = Zt[t][n][0];
      if (!0 === r.test(e)) return e.replace(r, Zt[t][n][1]);
    }
    return null;
  },
      tn = function tn() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0,
        n = t.irregulars.nouns;
    if (n.hasOwnProperty(e)) return n[e];
    var r = en(e);
    return null !== r ? r : Yt.test(e) ? e + "es" : e + "s";
  },
      nn = [[/([^v])ies$/i, "$1y"], [/ises$/i, "isis"], [/(kn|[^o]l|w)ives$/i, "$1ife"], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, "$1f"], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, "$1f"], [/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"], [/(buffal|tomat|tornad)(oes)$/i, "$1o"], [/(..[aeiou]s)es$/i, "$1"], [/(vert|ind|cort)(ices)$/i, "$1ex"], [/(matr|append)(ices)$/i, "$1ix"], [/(x|ch|ss|sh|z|o)es$/i, "$1"], [/men$/i, "man"], [/(n)ews$/i, "$1ews"], [/([ti])a$/i, "$1um"], [/([^aeiouy]|qu)ies$/i, "$1y"], [/(s)eries$/i, "$1eries"], [/(m)ovies$/i, "$1ovie"], [/([m|l])ice$/i, "$1ouse"], [/(cris|ax|test)es$/i, "$1is"], [/(alias|status)es$/i, "$1"], [/(ss)$/i, "$1"], [/(ics)$/i, "$1"], [/s$/i, ""]],
      rn = function rn(e, t) {
    var n,
        r = t.irregulars.nouns,
        a = (n = r, Object.keys(n).reduce(function (e, t) {
      return e[n[t]] = t, e;
    }, {}));
    if (a.hasOwnProperty(e)) return a[e];

    for (var i = 0; i < nn.length; i++) {
      if (!0 === nn[i][0].test(e)) return e = e.replace(nn[i][0], nn[i][1]);
    }

    return e;
  },
      an = {
    Participle: [{
      reg: /own$/i,
      to: "ow"
    }, {
      reg: /(.)un([g|k])$/i,
      to: "$1in$2"
    }],
    Actor: [{
      reg: /(er)er$/i,
      to: "$1"
    }],
    PresentTense: [{
      reg: /(..)(ies)$/i,
      to: "$1y"
    }, {
      reg: /(tch|sh)es$/i,
      to: "$1"
    }, {
      reg: /(ss|zz)es$/i,
      to: "$1"
    }, {
      reg: /([tzlshicgrvdnkmu])es$/i,
      to: "$1e"
    }, {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      to: "$1"
    }, {
      reg: /(ow)s$/i,
      to: "$1"
    }, {
      reg: /(op)s$/i,
      to: "$1"
    }, {
      reg: /([eirs])ts$/i,
      to: "$1t"
    }, {
      reg: /(ll)s$/i,
      to: "$1"
    }, {
      reg: /(el)s$/i,
      to: "$1"
    }, {
      reg: /(ip)es$/i,
      to: "$1e"
    }, {
      reg: /ss$/i,
      to: "ss"
    }, {
      reg: /s$/i,
      to: ""
    }],
    Gerund: [{
      reg: /pping$/i,
      to: "p"
    }, {
      reg: /lling$/i,
      to: "ll"
    }, {
      reg: /tting$/i,
      to: "t"
    }, {
      reg: /dding$/i,
      to: "d"
    }, {
      reg: /ssing$/i,
      to: "ss"
    }, {
      reg: /(..)gging$/i,
      to: "$1g"
    }, {
      reg: /([^aeiou])ying$/i,
      to: "$1y"
    }, {
      reg: /([^ae]i.)ing$/i,
      to: "$1e"
    }, {
      reg: /(ea.)ing$/i,
      to: "$1"
    }, {
      reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      to: "$1e"
    }, {
      reg: /(ch|sh)ing$/i,
      to: "$1"
    }, {
      reg: /(..)ing$/i,
      to: "$1"
    }],
    PastTense: [{
      reg: /(ued)$/i,
      to: "ue"
    }, {
      reg: /a([^aeiouy])ed$/i,
      to: "a$1e"
    }, {
      reg: /([aeiou]zz)ed$/i,
      to: "$1"
    }, {
      reg: /(e|i)lled$/i,
      to: "$1ll"
    }, {
      reg: /(.)(sh|ch)ed$/i,
      to: "$1$2"
    }, {
      reg: /(tl|gl)ed$/i,
      to: "$1e"
    }, {
      reg: /(um?pt?)ed$/i,
      to: "$1"
    }, {
      reg: /(ss)ed$/i,
      to: "$1"
    }, {
      reg: /pped$/i,
      to: "p"
    }, {
      reg: /tted$/i,
      to: "t"
    }, {
      reg: /(..)gged$/i,
      to: "$1g"
    }, {
      reg: /(..)lked$/i,
      to: "$1lk"
    }, {
      reg: /([^aeiouy][aeiou])ked$/i,
      to: "$1ke"
    }, {
      reg: /(.[aeiou])led$/i,
      to: "$1l"
    }, {
      reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: "$1$2"
    }, {
      reg: /(.ut)ed$/i,
      to: "$1e"
    }, {
      reg: /(.pt)ed$/i,
      to: "$1"
    }, {
      reg: /(us)ed$/i,
      to: "$1e"
    }, {
      reg: /(..[^aeiouy])ed$/i,
      to: "$1e"
    }, {
      reg: /(..)ied$/i,
      to: "$1y"
    }, {
      reg: /(.o)ed$/i,
      to: "$1o"
    }, {
      reg: /(..i)ed$/i,
      to: "$1"
    }, {
      reg: /(.a[^aeiou])ed$/i,
      to: "$1"
    }, {
      reg: /([rl])ew$/i,
      to: "$1ow"
    }, {
      reg: /([pl])t$/i,
      to: "$1t"
    }]
  },
      on = {
    Gerund: ["ing"],
    Actor: ["erer"],
    Infinitive: ["ate", "ize", "tion", "rify", "then", "ress", "ify", "age", "nce", "ect", "ise", "ine", "ish", "ace", "ash", "ure", "tch", "end", "ack", "and", "ute", "ade", "ock", "ite", "ase", "ose", "use", "ive", "int", "nge", "lay", "est", "ain", "ant", "ent", "eed", "er", "le", "own", "unk", "ung", "en"],
    PastTense: ["ed", "lt", "nt", "pt", "ew", "ld"],
    PresentTense: ["rks", "cks", "nks", "ngs", "mps", "tes", "zes", "ers", "les", "acks", "ends", "ands", "ocks", "lays", "eads", "lls", "els", "ils", "ows", "nds", "ays", "ams", "ars", "ops", "ffs", "als", "urs", "lds", "ews", "ips", "es", "ts", "ns"]
  },
      sn = on = Object.keys(on).reduce(function (e, t) {
    return on[t].forEach(function (n) {
      return e[n] = t;
    }), e;
  }, {}),
      un = {
    nouns: {
      addendum: "addenda",
      alga: "algae",
      alumna: "alumnae",
      alumnus: "alumni",
      analysis: "analyses",
      antenna: "antennae",
      appendix: "appendices",
      avocado: "avocados",
      axis: "axes",
      bacillus: "bacilli",
      barracks: "barracks",
      beau: "beaux",
      bus: "buses",
      cactus: "cacti",
      chateau: "chateaux",
      child: "children",
      circus: "circuses",
      clothes: "clothes",
      corpus: "corpora",
      criterion: "criteria",
      curriculum: "curricula",
      database: "databases",
      deer: "deer",
      diagnosis: "diagnoses",
      echo: "echoes",
      embargo: "embargoes",
      epoch: "epochs",
      foot: "feet",
      formula: "formulae",
      fungus: "fungi",
      genus: "genera",
      goose: "geese",
      halo: "halos",
      hippopotamus: "hippopotami",
      index: "indices",
      larva: "larvae",
      leaf: "leaves",
      libretto: "libretti",
      loaf: "loaves",
      man: "men",
      matrix: "matrices",
      memorandum: "memoranda",
      modulus: "moduli",
      mosquito: "mosquitoes",
      mouse: "mice",
      move: "moves",
      nebula: "nebulae",
      nucleus: "nuclei",
      octopus: "octopi",
      opus: "opera",
      ovum: "ova",
      ox: "oxen",
      parenthesis: "parentheses",
      person: "people",
      phenomenon: "phenomena",
      prognosis: "prognoses",
      quiz: "quizzes",
      radius: "radii",
      referendum: "referenda",
      rodeo: "rodeos",
      sex: "sexes",
      shoe: "shoes",
      sombrero: "sombreros",
      stimulus: "stimuli",
      stomach: "stomachs",
      syllabus: "syllabi",
      synopsis: "synopses",
      tableau: "tableaux",
      thesis: "theses",
      thief: "thieves",
      tooth: "teeth",
      tornado: "tornados",
      tuxedo: "tuxedos",
      vertebra: "vertebrae"
    },
    verbs: Ot
  },
      ln = {
    conjugate: St,
    adjectives: Xt,
    toPlural: tn,
    toSingular: rn,
    toInfinitive: function toInfinitive(e, t, n) {
      if (!e) return "";
      if (!0 === t.words.hasOwnProperty(e)) for (var r = t.irregulars.verbs, a = Object.keys(r), i = 0; i < a.length; i++) {
        for (var o = Object.keys(r[a[i]]), s = 0; s < o.length; s++) {
          if (e === r[a[i]][o[s]]) return a[i];
        }
      }
      if ((n = n || function (e) {
        var t = e.substr(e.length - 3);
        if (!0 === sn.hasOwnProperty(t)) return sn[t];
        var n = e.substr(e.length - 2);
        return !0 === sn.hasOwnProperty(n) ? sn[n] : "s" === e.substr(e.length - 1) ? "PresentTense" : null;
      }(e)) && an[n]) for (var u = 0; u < an[n].length; u++) {
        var l = an[n][u];
        if (!0 === l.reg.test(e)) return e.replace(l.reg, l.to);
      }
      return e;
    }
  },
      cn = !1,
      hn = function () {
    function e() {
      t(this, e), Object.defineProperty(this, "words", {
        enumerable: !1,
        value: Ft,
        writable: !0
      }), Object.defineProperty(this, "hasCompound", {
        enumerable: !1,
        value: {},
        writable: !0
      }), Object.defineProperty(this, "irregulars", {
        enumerable: !1,
        value: un,
        writable: !0
      }), Object.defineProperty(this, "tags", {
        enumerable: !1,
        value: Object.assign({}, vt),
        writable: !0
      }), Object.defineProperty(this, "transforms", {
        enumerable: !1,
        value: ln,
        writable: !0
      }), Object.defineProperty(this, "taggers", {
        enumerable: !1,
        value: [],
        writable: !0
      }), this.unpackWords(rt), this.addIrregulars(), Object.defineProperty(this, "cache", {
        enumerable: !1,
        value: {
          abbreviations: this.getByTag("Abbreviation")
        }
      });
    }

    return r(e, [{
      key: "verbose",
      value: function value(e) {
        return cn = e, this;
      }
    }, {
      key: "isVerbose",
      value: function value() {
        return cn;
      }
    }, {
      key: "getByTag",
      value: function value(e) {
        for (var t = this.words, n = {}, r = Object.keys(t), a = 0; a < r.length; a++) {
          "string" == typeof t[r[a]] ? t[r[a]] === e && (n[r[a]] = !0) : t[r[a]].some(function (t) {
            return t === e;
          }) && (n[r[a]] = !0);
        }

        return n;
      }
    }, {
      key: "unpackWords",
      value: function value(e) {
        for (var t = Object.keys(e), n = 0; n < t.length; n++) {
          for (var r = Object.keys($t(e[t[n]])), a = 0; a < r.length; a++) {
            Gt(r[a], t[n], this.words), Et(r[a], t[n], this);
          }
        }
      }
    }, {
      key: "addWords",
      value: function value(e) {
        for (var t = Object.keys(e), n = 0; n < t.length; n++) {
          var r = t[n].toLowerCase();
          Gt(r, e[t[n]], this.words), Et(r, e[t[n]], this);
        }
      }
    }, {
      key: "addIrregulars",
      value: function value() {
        return Ct(this), this;
      }
    }, {
      key: "addTags",
      value: function value(e) {
        return e = Object.assign({}, e), this.tags = Object.assign(this.tags, e), this.tags = pt(this.tags), this;
      }
    }, {
      key: "postProcess",
      value: function value(e) {
        return this.taggers.push(e), this;
      }
    }, {
      key: "stats",
      value: function value() {
        return {
          words: Object.keys(this.words).length,
          plurals: Object.keys(this.irregular.plurals).length,
          conjugations: Object.keys(this.irregular.conjugations).length,
          compounds: Object.keys(this.hasCompound).length,
          postProcessors: this.taggers.length
        };
      }
    }]), e;
  }(),
      dn = function dn(e) {
    return JSON.parse(JSON.stringify(e));
  };

  hn.prototype.clone = function () {
    var e = new hn();
    return e.words = Object.assign({}, this.words), e.hasCompound = Object.assign({}, this.hasCompound), e.irregulars = dn(this.irregulars), e.tags = dn(this.tags), e.transforms = this.transforms, e.taggers = this.taggers, e;
  };

  var fn = hn,
      mn = C(function (e, t) {
    t.all = function () {
      return this.parents()[0] || this;
    }, t.parent = function () {
      return this.from ? this.from : this;
    }, t.parents = function (e) {
      var t = [];
      return function e(n) {
        n.from && (t.push(n.from), e(n.from));
      }(this), t = t.reverse(), "number" == typeof e ? t[e] : t;
    }, t.clone = function (e) {
      var t = this.list.map(function (t) {
        return t.clone(e);
      });
      return this.buildFrom(t);
    }, t.wordCount = function () {
      return this.list.reduce(function (e, t) {
        return e += t.wordCount();
      }, 0);
    }, t.wordcount = t.wordCount, t.cache = function (e) {
      var t = this;
      return e = e || {}, this.list.forEach(function (n) {
        var r = {};
        n.cache = n.cache || {}, n.cache.terms = n.cache.terms || n.terms(), n.cache.terms.forEach(function (n) {
          r[n.clean] = !0, r[n.reduced] = !0, r[n.text.toLowerCase()] = !0, n.implicit && (r[n.implicit] = !0), n.root && (r[n.root] = !0), void 0 !== n.alias && (r = Object.assign(r, n.alias)), e.root && (n.setRoot(t.world), r[n.root] = !0);
        }), delete r[""], n.cache.words = r;
      }), this;
    }, t.uncache = function () {
      return this.list.forEach(function (e) {
        e.cache = {};
      }), this.parents().forEach(function (e) {
        e.list.forEach(function (e) {
          e.cache = {};
        });
      }), this;
    };
  }),
      pn = (mn.all, mn.parent, mn.parents, mn.clone, mn.wordCount, mn.wordcount, mn.cache, mn.uncache, C(function (e, t) {
    t.first = function (e) {
      return void 0 === e ? this.get(0) : this.slice(0, e);
    }, t.last = function (e) {
      if (void 0 === e) return this.get(this.list.length - 1);
      var t = this.list.length;
      return this.slice(t - e, t);
    }, t.slice = function (e, t) {
      var n = this.list.slice(e, t);
      return this.buildFrom(n);
    }, t.eq = function (e) {
      var t = this.list[e];
      return void 0 === t ? this.buildFrom([]) : this.buildFrom([t]);
    }, t.get = t.eq, t.firstTerm = function () {
      return this.match("^.");
    }, t.lastTerm = function () {
      return this.match(".$");
    }, t.termList = function (e) {
      for (var t = [], n = 0; n < this.list.length; n++) {
        for (var r = this.list[n].terms(), a = 0; a < r.length; a++) {
          if (t.push(r[a]), void 0 !== e && void 0 !== t[e]) return t[e];
        }
      }

      return t;
    };
  })),
      gn = (pn.first, pn.last, pn.slice, pn.eq, pn.get, pn.firstTerm, pn.lastTerm, pn.termList, C(function (e, t) {
    t.match = function (e) {
      var t = Fe(e);
      if (0 === t.length) return this.buildFrom([]);
      var n = this.list.reduce(function (e, n) {
        return e.concat(n.match(t));
      }, []);
      return this.buildFrom(n);
    }, t.not = function (e) {
      var t = Fe(e);
      if (0 === t.length) return this;
      var n = this.list.reduce(function (e, n) {
        return e.concat(n.not(t));
      }, []);
      return this.buildFrom(n);
    }, t.matchOne = function (e) {
      for (var t = Fe(e), n = 0; n < this.list.length; n++) {
        var r = this.list[n].match(t);
        return this.buildFrom(r);
      }

      return this.buildFrom([]);
    }, t["if"] = function (e) {
      var t = Fe(e),
          n = this.list.filter(function (e) {
        return e.match(t).length > 0;
      });
      return this.buildFrom(n);
    }, t.ifNo = function (e) {
      var t = Fe(e),
          n = this.list.filter(function (e) {
        return 0 === e.match(t).length;
      });
      return this.buildFrom(n);
    }, t.has = function (e) {
      var t = Fe(e);
      return this.list.some(function (e) {
        return !0 === e.has(t);
      });
    }, t.lookAhead = function (e) {
      e || (e = ".*");
      var t = Fe(e),
          n = [];
      return this.list.forEach(function (e) {
        n = n.concat(e.lookAhead(t));
      }), n = n.filter(function (e) {
        return e;
      }), this.buildFrom(n);
    }, t.lookAfter = t.lookAhead, t.lookBehind = function (e) {
      e || (e = ".*");
      var t = Fe(e),
          n = [];
      return this.list.forEach(function (e) {
        n = n.concat(e.lookBehind(t));
      }), n = n.filter(function (e) {
        return e;
      }), this.buildFrom(n);
    }, t.lookBefore = t.lookBehind, t.before = function (e) {
      var t = Fe(e),
          n = this["if"](t).list.map(function (e) {
        var n = e.terms().map(function (e) {
          return e.id;
        }),
            r = e.match(t)[0],
            a = n.indexOf(r.start);
        return 0 === a || -1 === a ? null : e.buildFrom(e.start, a);
      });
      return n = n.filter(function (e) {
        return null !== e;
      }), this.buildFrom(n);
    }, t.after = function (e) {
      var t = Fe(e),
          n = this["if"](t).list.map(function (e) {
        var n = e.terms(),
            r = n.map(function (e) {
          return e.id;
        }),
            a = e.match(t)[0],
            i = r.indexOf(a.start);
        if (-1 === i || !n[i + a.length]) return null;
        var o = n[i + a.length].id,
            s = e.length - i - a.length;
        return e.buildFrom(o, s);
      });
      return n = n.filter(function (e) {
        return null !== e;
      }), this.buildFrom(n);
    };
  })),
      vn = (gn.match, gn.not, gn.matchOne, gn.ifNo, gn.has, gn.lookAhead, gn.lookAfter, gn.lookBehind, gn.lookBefore, gn.before, gn.after, function (e, t, n, r) {
    var a = [];
    "string" == typeof e && (a = e.split(" ")), t.list.forEach(function (i) {
      var o = i.terms();
      !0 === n && (o = o.filter(function (n) {
        return n.canBe(e, t.world);
      })), o.forEach(function (n, i) {
        a.length > 1 ? a[i] && "." !== a[i] && n.tag(a[i], r, t.world) : n.tag(e, r, t.world);
      });
    });
  }),
      bn = {
    tag: function tag(e, t) {
      return e ? (vn(e, this, !1, t), this) : this;
    },
    tagSafe: function tagSafe(e, t) {
      return e ? (vn(e, this, !0, t), this) : this;
    },
    unTag: function unTag(e, t) {
      var n = this;
      return this.list.forEach(function (r) {
        r.terms().forEach(function (r) {
          return r.unTag(e, t, n.world);
        });
      }), this;
    },
    canBe: function canBe(e) {
      if (!e) return this;
      var t = this.world,
          n = this.list.reduce(function (n, r) {
        return n.concat(r.canBe(e, t));
      }, []);
      return this.buildFrom(n);
    }
  },
      yn = {
    map: function map(t) {
      var n = this;
      if (!t) return this;
      var r = this.list.map(function (e, r) {
        var a = n.buildFrom([e]);
        a.from = null;
        var i = t(a, r);
        return i.list && i.list[0] ? i.list[0] : i;
      });
      return 0 === r.length ? this.buildFrom(r) : "object" !== e(r[0]) || "Phrase" !== r[0].isA ? r : this.buildFrom(r);
    },
    forEach: function forEach(e, t) {
      var n = this;
      return e ? (this.list.forEach(function (r, a) {
        var i = n.buildFrom([r]);
        !0 === t && (i.from = null), e(i, a);
      }), this) : this;
    },
    filter: function filter(e) {
      var t = this;
      if (!e) return this;
      var n = this.list.filter(function (n, r) {
        var a = t.buildFrom([n]);
        return a.from = null, e(a, r);
      });
      return this.buildFrom(n);
    },
    find: function find(e) {
      var t = this;
      if (!e) return this;
      var n = this.list.find(function (n, r) {
        var a = t.buildFrom([n]);
        return a.from = null, e(a, r);
      });
      return n ? this.buildFrom([n]) : void 0;
    },
    some: function some(e) {
      var t = this;
      return e ? this.list.some(function (n, r) {
        var a = t.buildFrom([n]);
        return a.from = null, e(a, r);
      }) : this;
    },
    random: function random(e) {
      if (!this.found) return this;
      var t = Math.floor(Math.random() * this.list.length);

      if (void 0 === e) {
        var n = [this.list[t]];
        return this.buildFrom(n);
      }

      return t + e > this.length && (t = (t = this.length - e) < 0 ? 0 : t), this.slice(t, t + e);
    }
  },
      An = function An(e, t) {
    return "" !== t && (e.reduced === t || e.implicit === t || e.root === t || e.text.toLowerCase() === t);
  },
      wn = {
    lookup: function lookup(t) {
      var n = this;
      "string" == typeof t && (t = [t]);
      var r = t.map(function (e) {
        e = e.toLowerCase();
        var t = Ye(e);
        return t = t.map(function (e) {
          return e.trim();
        });
      });
      this.cache();
      var a = [];
      return r.forEach(function (t) {
        n.list.forEach(function (n) {
          if (!0 === n.cache.words[t[0]]) {
            var r = n.terms(),
                i = function (t, n) {
              for (var r = function r(e) {
                if (An(n[e], t[0]) && t.every(function (t, r) {
                  return !0 === An(n[e + r], t);
                })) return {
                  v: n[e].id
                };
              }, a = 0; a < n.length; a++) {
                var i = r(a);
                if ("object" === e(i)) return i.v;
              }

              return !1;
            }(t, r);

            if (!1 === i) ;else {
              var o = n.buildFrom(i, t.length);
              a.push(o);
            }
          }
        });
      }), this.buildFrom(a);
    }
  },
      kn = {
    replaceWith: function replaceWith(t, n, r) {
      var a = this;
      return t ? (this.uncache(), this.list.forEach(function (i) {
        var o,
            s,
            u = t;
        if ("function" == typeof t && (u = t(i)), u && "object" === e(u) && "Doc" === u.isA) o = u.list, a.pool().merge(u.pool());else {
          if ("string" != typeof u) return;
          !0 === r && i.terms(0).isTitleCase() && (u = (s = u).charAt(0).toUpperCase() + s.substr(1)), o = tt(u, a.world, a.pool()), a.buildFrom(o).tagger();
        }

        if (!0 === n) {
          var l = i.json({
            terms: {
              tags: !0
            }
          }).terms;
          o[0].terms().forEach(function (e, t) {
            l[t] && e.tagSafe(l[t].tags, "keptTag", a.world);
          });
        }

        i.replace(o[0], a);
      }), this) : this["delete"]();
    },
    replace: function replace(e, t, n, r) {
      return void 0 === t ? this.replaceWith(e) : (this.match(e).replaceWith(t, n, r), this);
    }
  },
      $n = C(function (e, t) {
    t.append = function (e) {
      var t = this;
      return e ? (this.uncache(), this.list.forEach(function (n) {
        var r = tt(e, t.world, t.pool())[0];
        t.buildFrom([r]).tagger(), n.append(r, t);
      }), this) : this;
    }, t.insertAfter = t.append, t.insertAt = t.append, t.prepend = function (e) {
      var t = this;
      return e ? (this.uncache(), this.list.forEach(function (n) {
        var r = tt(e, t.world, t.pool())[0];
        t.buildFrom([r]).tagger(), n.prepend(r, t);
      }), this) : this;
    }, t.insertBefore = t.prepend, t.concat = function () {
      this.uncache();

      for (var e = this.list.slice(0), t = 0; t < arguments.length; t++) {
        var n = arguments[t];

        if ("string" == typeof n) {
          var r = tt(n, this.world);
          e = e.concat(r);
        } else "Doc" === n.isA ? e = e.concat(n.list) : "Phrase" === n.isA && e.push(n);
      }

      return this.buildFrom(e);
    }, t["delete"] = function (e) {
      var t = this;
      this.uncache();
      var n = this;
      return e && (n = this.match(e)), n.list.forEach(function (e) {
        return e["delete"](t);
      }), this;
    }, t.remove = t["delete"];
  }),
      Pn = ($n.append, $n.insertAfter, $n.insertAt, $n.prepend, $n.insertBefore, $n.concat, $n.remove, {
    text: function text(t) {
      var n = this;
      t = t || {};
      var r = !1;
      return 0 === this.parents().length && (r = !0), ("root" === t || "object" === e(t) && t.root) && this.list.forEach(function (e) {
        e.terms().forEach(function (e) {
          null === e.root && e.setRoot(n.world);
        });
      }), this.list.reduce(function (e, a, i) {
        var o = !r && 0 === i,
            s = !r && i === n.list.length - 1;
        return e + a.text(t, o, s);
      }, "");
    }
  }),
      Gn = C(function (t, n) {
    var r = {
      text: !0,
      terms: !0,
      trim: !0
    },
        a = function a(e) {
      var t = 0,
          n = 0,
          r = {};
      return e.termList().forEach(function (e) {
        r[e.id] = {
          index: n,
          start: t + e.pre.length,
          length: e.text.length
        }, t += e.pre.length + e.text.length + e.post.length, n += 1;
      }), r;
    };

    n.json = function () {
      var t = this,
          n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      if ("number" == typeof n && this.list[n]) return this.list[n].json(r);
      ("root" === (n = Object.assign({}, r, n)) || "object" === e(n) && n.root) && this.list.forEach(function (e) {
        e.terms().forEach(function (e) {
          null === e.root && e.setRoot(t.world);
        });
      }), n.unique && (n.reduced = !0), n.offset && (n.terms = !0 === n.terms ? {} : n.terms, n.terms.offset = !0), (n.index || n.terms.index) && (n.terms = !0 === n.terms ? {} : n.terms, n.terms.id = !0);
      var i = this.list.map(function (e) {
        return e.json(n, t.world);
      });

      if (n.terms.offset || n.offset || n.terms.index || n.index) {
        var o = a(this.all());
        (n.terms.index || n.index) && i.forEach(function (e) {
          e.terms.forEach(function (e) {
            e.index = o[e.id].index;
          }), e.index = e.terms[0].index;
        }), (n.terms.offset || n.offset) && i.forEach(function (e) {
          e.terms.forEach(function (e) {
            e.offset = o[e.id] || {};
          });
          var t = e.terms.reduce(function (e, t) {
            return e += t.offset.length || 0;
          }, 0);
          e.offset = e.terms[0].offset, e.offset.length = t;
        });
      }

      if (n.frequency || n.freq || n.count) {
        var s = {};
        this.list.forEach(function (e) {
          var t = e.text("reduced");
          s[t] = s[t] || 0, s[t] += 1;
        }), this.list.forEach(function (e, t) {
          i[t].count = s[e.text("reduced")];
        });
      }

      if (n.unique) {
        var u = {};
        i = i.filter(function (e) {
          return !0 !== u[e.reduced] && (u[e.reduced] = !0, !0);
        });
      }

      return i;
    }, n.data = n.json;
  }),
      En = (Gn.json, Gn.data, ["Person", "Place", "Organization"]),
      Cn = {
    Noun: {
      notA: ["Verb", "Adjective", "Adverb"]
    },
    Singular: {
      isA: "Noun",
      notA: "Plural"
    },
    ProperNoun: {
      isA: "Noun"
    },
    Person: {
      isA: ["ProperNoun", "Singular"],
      notA: ["Place", "Organization"]
    },
    FirstName: {
      isA: "Person"
    },
    MaleName: {
      isA: "FirstName",
      notA: ["FemaleName", "LastName"]
    },
    FemaleName: {
      isA: "FirstName",
      notA: ["MaleName", "LastName"]
    },
    LastName: {
      isA: "Person",
      notA: ["FirstName"]
    },
    Honorific: {
      isA: "Noun",
      notA: ["FirstName", "LastName"]
    },
    Place: {
      isA: "Singular",
      notA: ["Person", "Organization"]
    },
    Country: {
      isA: ["Place", "ProperNoun"],
      notA: ["City"]
    },
    City: {
      isA: ["Place", "ProperNoun"],
      notA: ["Country"]
    },
    Region: {
      isA: ["Place", "ProperNoun"]
    },
    Address: {
      isA: "Place"
    },
    Organization: {
      isA: ["Singular", "ProperNoun"],
      notA: ["Person", "Place"]
    },
    SportsTeam: {
      isA: "Organization"
    },
    School: {
      isA: "Organization"
    },
    Company: {
      isA: "Organization"
    },
    Plural: {
      isA: "Noun",
      notA: ["Singular"]
    },
    Uncountable: {
      isA: "Noun"
    },
    Pronoun: {
      isA: "Noun",
      notA: En
    },
    Actor: {
      isA: "Noun",
      notA: En
    },
    Activity: {
      isA: "Noun",
      notA: ["Person", "Place"]
    },
    Unit: {
      isA: "Noun",
      notA: En
    },
    Demonym: {
      isA: ["Noun", "ProperNoun"],
      notA: En
    },
    Possessive: {
      isA: "Noun"
    }
  },
      Fn = {
    Verb: {
      notA: ["Noun", "Adjective", "Adverb", "Value"]
    },
    PresentTense: {
      isA: "Verb",
      notA: ["PastTense", "Copula", "FutureTense"]
    },
    Infinitive: {
      isA: "PresentTense",
      notA: ["PastTense", "Gerund"]
    },
    Gerund: {
      isA: "PresentTense",
      notA: ["PastTense", "Copula", "FutureTense"]
    },
    PastTense: {
      isA: "Verb",
      notA: ["FutureTense"]
    },
    FutureTense: {
      isA: "Verb"
    },
    Copula: {
      isA: "Verb"
    },
    Modal: {
      isA: "Verb",
      notA: ["Infinitive"]
    },
    PerfectTense: {
      isA: "Verb",
      notA: "Gerund"
    },
    Pluperfect: {
      isA: "Verb"
    },
    Participle: {
      isA: "Verb"
    },
    PhrasalVerb: {
      isA: "Verb"
    },
    Particle: {
      isA: "PhrasalVerb"
    }
  },
      Nn = {
    Value: {
      notA: ["Verb", "Adjective", "Adverb"]
    },
    Ordinal: {
      isA: "Value",
      notA: ["Cardinal"]
    },
    Cardinal: {
      isA: "Value",
      notA: ["Ordinal"]
    },
    RomanNumeral: {
      isA: "Cardinal",
      notA: ["Ordinal", "TextValue"]
    },
    TextValue: {
      isA: "Value",
      notA: ["NumericValue"]
    },
    NumericValue: {
      isA: "Value",
      notA: ["TextValue"]
    },
    Money: {
      isA: "Cardinal"
    },
    Percent: {
      isA: "Value"
    }
  },
      jn = ["Noun", "Verb", "Adjective", "Adverb", "Value"],
      Bn = {
    Adjective: {
      notA: ["Noun", "Verb", "Adverb", "Value"]
    },
    Comparable: {
      isA: ["Adjective"]
    },
    Comparative: {
      isA: ["Adjective"]
    },
    Superlative: {
      isA: ["Adjective"],
      notA: ["Comparative"]
    },
    NumberRange: {
      isA: ["Contraction"]
    },
    Adverb: {
      notA: ["Noun", "Verb", "Adjective", "Value"]
    },
    Date: {
      notA: ["Verb", "Conjunction", "Adverb", "Preposition", "Adjective"]
    },
    Month: {
      isA: ["Date", "Singular"],
      notA: ["Year", "WeekDay", "Time"]
    },
    WeekDay: {
      isA: ["Date", "Noun"]
    },
    Determiner: {
      notA: jn
    },
    Conjunction: {
      notA: jn
    },
    Preposition: {
      notA: jn
    },
    QuestionWord: {
      notA: ["Determiner"]
    },
    Currency: {},
    Expression: {
      notA: ["Noun", "Adjective", "Verb", "Adverb"]
    },
    Abbreviation: {},
    Url: {
      notA: ["HashTag", "PhoneNumber", "Verb", "Adjective", "Value", "AtMention", "Email"]
    },
    PhoneNumber: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "Email"]
    },
    HashTag: {},
    AtMention: {
      isA: ["Noun"],
      notA: ["HashTag", "Verb", "Adjective", "Value", "Email"]
    },
    Emoji: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Emoticon: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Email: {
      notA: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
    },
    Auxiliary: {
      notA: ["Noun", "Adjective", "Value"]
    },
    Acronym: {
      notA: ["Plural", "RomanNumeral"]
    },
    Negative: {
      notA: ["Noun", "Adjective", "Value"]
    },
    Condition: {
      notA: ["Verb", "Adjective", "Noun", "Value"]
    }
  },
      xn = {
    Noun: "blue",
    Verb: "green",
    Negative: "green",
    Date: "red",
    Value: "red",
    Adjective: "magenta",
    Preposition: "cyan",
    Conjunction: "cyan",
    Determiner: "cyan",
    Adverb: "cyan"
  },
      Dn = function Dn(e) {
    return Object.keys(e).forEach(function (t) {
      xn[t] ? e[t].color = xn[t] : e[t].isA.some(function (n) {
        return !!xn[n] && (e[t].color = xn[n], !0);
      });
    }), e;
  },
      On = function On(e) {
    return Object.keys(e).forEach(function (t) {
      for (var n = e[t], r = n.isA.length, a = 0; a < r; a++) {
        var i = n.isA[a];
        e[i] && (n.isA = n.isA.concat(e[i].isA));
      }

      n.isA = function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      }(n.isA);
    }), e;
  },
      Tn = function Tn(e) {
    var t = Object.keys(e);
    return t.forEach(function (n) {
      var r = e[n];
      r.notA = r.notA || [], r.isA.forEach(function (t) {
        if (e[t] && e[t].notA) {
          var n = "string" == typeof e[t].notA ? [e[t].isA] : e[t].notA || [];
          r.notA = r.notA.concat(n);
        }
      });

      for (var a = 0; a < t.length; a++) {
        var i = t[a];
        -1 !== e[i].notA.indexOf(n) && r.notA.push(i);
      }

      r.notA = function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      }(r.notA);
    }), e;
  },
      Vn = function Vn(e) {
    var t = Object.keys(e);
    return t.forEach(function (n) {
      var r = e[n];
      r.lineage = [];

      for (var a = 0; a < t.length; a++) {
        -1 !== e[t[a]].isA.indexOf(n) && r.lineage.push(t[a]);
      }
    }), e;
  },
      zn = function zn(e) {
    return e = function (e) {
      return Object.keys(e).forEach(function (t) {
        var n = e[t];
        n.isA = n.isA || [], "string" == typeof n.isA && (n.isA = [n.isA]), n.notA = n.notA || [], "string" == typeof n.notA && (n.notA = [n.notA]);
      }), e;
    }(e), e = On(e), e = Tn(e), e = Dn(e), e = Vn(e);
  },
      Hn = function Hn(e, t) {
    Object.keys(e).forEach(function (n) {
      t[n] = e[n];
    });
  },
      In = function () {
    var e = {};
    return Hn(Cn, e), Hn(Fn, e), Hn(Nn, e), Hn(Bn, e), e = zn(e);
  }(),
      Mn = C(function (e) {
    var t = {
      green: function green(e) {
        return "[32m" + e + "[0m";
      },
      red: function red(e) {
        return "[31m" + e + "[0m";
      },
      blue: function blue(e) {
        return "[34m" + e + "[0m";
      },
      magenta: function magenta(e) {
        return "[35m" + e + "[0m";
      },
      cyan: function cyan(e) {
        return "[36m" + e + "[0m";
      },
      yellow: function yellow(e) {
        return "[33m" + e + "[0m";
      },
      black: function black(e) {
        return "[30m" + e + "[0m";
      }
    };

    e.exports = function (e) {
      return console.log(t.blue("=====")), e.list.forEach(function (e) {
        console.log(t.blue("  -----")), e.terms().forEach(function (e) {
          var n = Object.keys(e.tags),
              r = e.text || "-";
          e.implicit && (r = "[" + e.implicit + "]");
          var a = "'" + (r = t.yellow(r)) + "'";

          a = function (e, t) {
            for (e = e.toString(); e.length < t;) {
              e += " ";
            }

            return e;
          }(a, 18);

          var i = t.blue("  ｜ ") + a + "  - " + function (e) {
            return (e = e.map(function (e) {
              if (!In.hasOwnProperty(e)) return e;
              var n = In[e].color || "blue";
              return t[n](e);
            })).join(", ");
          }(n);

          console.log(i);
        });
      }), console.log(""), e;
    };
  }),
      Sn = function Sn(e) {
    var t = e.json({
      text: !1,
      terms: !1,
      reduced: !0
    }),
        n = {};
    t.forEach(function (e) {
      n[e.reduced] || (e.count = 0, n[e.reduced] = e), n[e.reduced].count += 1;
    });
    var r = Object.keys(n).map(function (e) {
      return n[e];
    });
    return r.sort(function (e, t) {
      return e.count > t.count ? -1 : e.count < t.count ? 1 : 0;
    }), r;
  },
      Ln = {
    debug: function debug() {
      return Mn(this), this;
    },
    out: function out(e) {
      if ("text" === e) return this.text();
      if ("normal" === e) return this.text("normal");
      if ("json" === e) return this.json();
      if ("offset" === e || "offsets" === e) return this.json({
        offset: !0
      });
      if ("array" === e) return this.json({
        terms: !1
      }).map(function (e) {
        return e.text;
      });
      if ("freq" === e || "frequency" === e) return Sn(this);

      if ("terms" === e) {
        var t = [];
        return this.json({
          text: !1,
          terms: {
            text: !0
          }
        }).forEach(function (e) {
          var n = e.terms.map(function (e) {
            return e.text;
          });
          n = n.filter(function (e) {
            return e;
          }), t = t.concat(n);
        }), t;
      }

      return "tags" === e ? this.list.map(function (e) {
        return e.terms().reduce(function (e, t) {
          return e[t.clean || t.implicit] = Object.keys(t.tags), e;
        }, {});
      }) : "debug" === e ? (Mn(this), this) : this.text();
    }
  },
      Jn = function Jn(e, t) {
    var n = t.tags,
        r = [];
    return e.forEach(function (e) {
      n[e] && n[e].isA && (r = r.concat(n[e].isA));
    }), r = r.reduce(function (e, t) {
      return e[t] = !0, e;
    }, {}), e = e.filter(function (e) {
      return !r[e];
    });
  },
      Wn = {
    "export": function _export() {
      var e = this,
          t = this.json({
        text: !0,
        trim: !1,
        terms: {
          tags: !0,
          whitespace: !0
        }
      }),
          n = [];
      t.forEach(function (t) {
        t.terms.forEach(function (t) {
          var r = Jn(t.tags, e.world);
          n = n.concat(r);
        });
      }), n = function (e) {
        var t = {};
        e.forEach(function (e) {
          t[e] = t[e] || 0, t[e] += 1;
        });
        var n = Object.keys(t);
        return (n = n.sort(function (e, n) {
          return t[e] > t[n] ? -1 : 1;
        })).map(function (e) {
          return [e, t[e]];
        });
      }(n);
      var r = {};
      return n.forEach(function (e, t) {
        r[e[0]] = t;
      }), t = t.map(function (t) {
        var n = t.terms.map(function (t) {
          var n = t.tags;
          return n = (n = (n = Jn(n, e.world)).map(function (e) {
            return r[e];
          })).join(",");
        });
        return n = n.join("|"), [t.text, n];
      }), {
        tags: Object.keys(r),
        list: t
      };
    }
  },
      _n = {
    alpha: function alpha(e, t) {
      var n = e.text("clean"),
          r = t.text("clean");
      return n < r ? -1 : n > r ? 1 : 0;
    },
    length: function length(e, t) {
      var n = e.text().trim().length,
          r = t.text().trim().length;
      return n < r ? 1 : n > r ? -1 : 0;
    },
    wordCount: function wordCount(e, t) {
      var n = e.wordCount(),
          r = t.wordCount();
      return n < r ? 1 : n > r ? -1 : 0;
    }
  };

  _n.alphabetical = _n.alpha, _n.wordcount = _n.wordCount;
  var qn = {
    index: !0,
    sequence: !0,
    seq: !0,
    sequential: !0,
    chron: !0,
    chronological: !0
  },
      Rn = {
    sort: function sort(e) {
      return "freq" === (e = e || "alpha") || "frequency" === e || "topk" === e ? (n = {}, r = {
        "case": !0,
        punctuation: !1,
        whitespace: !0,
        unicode: !0
      }, (t = this).list.forEach(function (e) {
        var t = e.text(r);
        n[t] = n[t] || 0, n[t] += 1;
      }), t.list.sort(function (e, t) {
        var a = n[e.text(r)],
            i = n[t.text(r)];
        return a < i ? 1 : a > i ? -1 : 0;
      }), t) : qn.hasOwnProperty(e) ? function (e) {
        var t = {};
        return e.json({
          terms: {
            offset: !0
          }
        }).forEach(function (e) {
          t[e.terms[0].id] = e.terms[0].offset.start;
        }), e.list = e.list.sort(function (e, n) {
          return t[e.start] > t[n.start] ? 1 : t[e.start] < t[n.start] ? -1 : 0;
        }), e;
      }(this) : "function" == typeof (e = _n[e] || e) ? (this.list = this.list.sort(e), this) : this;
      var t, n, r;
    },
    reverse: function reverse() {
      var e = [].concat(this.list);
      return e = e.reverse(), this.buildFrom(e);
    },
    unique: function unique() {
      var e = [].concat(this.list),
          t = {};
      return e = e.filter(function (e) {
        var n = e.text("reduced").trim();
        return !0 !== t.hasOwnProperty(n) && (t[n] = !0, !0);
      }), this.buildFrom(e);
    }
  },
      Kn = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g,
      Qn = /['‘’“”"′″‴]+/g,
      Un = {
    whitespace: function whitespace(e) {
      var t = e.list.map(function (e) {
        return e.terms();
      });
      t.forEach(function (e, n) {
        e.forEach(function (r, a) {
          !0 !== r.hasDash() ? (r.pre = r.pre.replace(/\s/g, ""), r.post = r.post.replace(/\s/g, ""), (e.length - 1 !== a || t[n + 1]) && (r.implicit && !0 === Boolean(r.text) || !0 !== r.hasHyphen() && (r.post += " "))) : r.post = " - ";
        });
      });
    },
    punctuation: function punctuation(e) {
      e.forEach(function (e) {
        !0 === e.hasHyphen() && (e.post = " "), e.pre = e.pre.replace(Kn, ""), e.post = e.post.replace(Kn, ""), e.post = e.post.replace(/\.\.\./, ""), !0 === /!/.test(e.post) && (e.post = e.post.replace(/!/g, ""), e.post = "!" + e.post), !0 === /\?/.test(e.post) && (e.post = e.post.replace(/[\?!]*/, ""), e.post = "?" + e.post);
      });
    },
    unicode: function unicode(e) {
      e.forEach(function (e) {
        !0 !== e.isImplicit() && (e.text = d(e.text));
      });
    },
    quotations: function quotations(e) {
      e.forEach(function (e) {
        e.post = e.post.replace(Qn, ""), e.pre = e.pre.replace(Qn, "");
      });
    },
    adverbs: function adverbs(e) {
      e.match("#Adverb").not("(not|nary|seldom|never|barely|almost|basically|so)").remove();
    },
    abbreviations: function abbreviations(e) {
      e.list.forEach(function (e) {
        var t = e.terms();
        t.forEach(function (e, n) {
          !0 === e.tags.Abbreviation && t[n + 1] && (e.post = e.post.replace(/^\./, ""));
        });
      });
    }
  },
      Xn = {
    whitespace: !0,
    unicode: !0,
    punctuation: !0,
    emoji: !0,
    acronyms: !0,
    abbreviations: !0,
    "case": !1,
    contractions: !1,
    parentheses: !1,
    quotations: !1,
    adverbs: !1,
    possessives: !1,
    verbs: !1,
    nouns: !1,
    honorifics: !1
  },
      Zn = {
    light: {},
    medium: {
      "case": !0,
      contractions: !0,
      parentheses: !0,
      quotations: !0,
      adverbs: !0
    }
  };
  Zn.heavy = Object.assign({}, Zn.medium, {
    possessives: !0,
    verbs: !0,
    nouns: !0,
    honorifics: !0
  });

  var Yn = {
    normalize: function normalize(e) {
      "string" == typeof (e = e || {}) && (e = Zn[e] || {}), e = Object.assign({}, Xn, e), this.uncache();
      var t = this.termList();
      return e["case"] && this.toLowerCase(), e.whitespace && Un.whitespace(this), e.unicode && Un.unicode(t), e.punctuation && Un.punctuation(t), e.emoji && this.remove("(#Emoji|#Emoticon)"), e.acronyms && this.acronyms().strip(), e.abbreviations && Un.abbreviations(this), (e.contraction || e.contractions) && this.contractions().expand(), e.parentheses && this.parentheses().unwrap(), (e.quotations || e.quotes) && Un.quotations(t), e.adverbs && Un.adverbs(this), (e.possessive || e.possessives) && this.possessives().strip(), e.verbs && this.verbs().toInfinitive(), (e.nouns || e.plurals) && this.nouns().toSingular(), e.honorifics && this.remove("#Honorific"), this;
    }
  },
      er = C(function (e, t) {
    t.splitOn = function (e) {
      if (!e) return this.parent().splitOn(this);
      var t = Fe(e),
          n = [];
      return this.list.forEach(function (e) {
        var r = e.match(t);

        if (0 !== r.length) {
          var a = e;
          r.forEach(function (e) {
            var t = a.splitOn(e);
            t.before && n.push(t.before), t.match && n.push(t.match), a = t.after;
          }), a && n.push(a);
        } else n.push(e);
      }), this.buildFrom(n);
    }, t.splitAfter = function (e) {
      if (!e) return this.parent().splitAfter(this);
      var t = Fe(e),
          n = [];
      return this.list.forEach(function (e) {
        var r = e.match(t);

        if (0 !== r.length) {
          var a = e;
          r.forEach(function (e) {
            var t = a.splitOn(e);
            t.before && t.match ? (t.before.length += t.match.length, n.push(t.before)) : t.match && n.push(t.match), a = t.after;
          }), a && n.push(a);
        } else n.push(e);
      }), this.buildFrom(n);
    }, t.split = t.splitAfter, t.splitBefore = function (e) {
      if (!e) return this.parent().splitBefore(this);
      var t = Fe(e),
          n = [];
      return this.list.forEach(function (e) {
        var r = e.match(t);

        if (0 !== r.length) {
          var a = e;
          r.forEach(function (e) {
            var t = a.splitOn(e);
            t.before && n.push(t.before), t.match && t.after && (t.match.length += t.after.length), a = t.match;
          }), a && n.push(a);
        } else n.push(e);
      }), this.buildFrom(n);
    }, t.segment = function (e, t) {
      e = e || {}, t = t || {
        text: !0
      };
      var n = this,
          r = Object.keys(e);
      return r.forEach(function (e) {
        n = n.splitOn(e);
      }), n.list.forEach(function (t) {
        for (var n = 0; n < r.length; n += 1) {
          if (t.has(r[n])) return void (t.segment = e[r[n]]);
        }
      }), n.list.map(function (e) {
        var n = e.json(t);
        return n.segment = e.segment || null, n;
      });
    };
  }),
      tr = (er.splitOn, er.splitAfter, er.split, er.splitBefore, er.segment, function (e, t) {
    var n = e.world;
    return e.list.forEach(function (e) {
      e.terms().forEach(function (e) {
        return e[t](n);
      });
    }), e;
  }),
      nr = {
    toLowerCase: function toLowerCase() {
      return tr(this, "toLowerCase");
    },
    toUpperCase: function toUpperCase() {
      return tr(this, "toUpperCase");
    },
    toTitleCase: function toTitleCase() {
      return this.tag("TitleCase"), tr(this, "toTitleCase");
    },
    toCamelCase: function toCamelCase() {
      return this.list.forEach(function (e) {
        var t = e.terms();
        t.forEach(function (e, n) {
          0 !== n && e.toTitleCase(), n !== t.length - 1 && (e.post = "");
        });
      }), this;
    }
  },
      rr = C(function (e, t) {
    t.pre = function (e) {
      return void 0 === e ? this.list[0].terms(0).pre : (this.list.forEach(function (t) {
        t.terms(0).pre = e;
      }), this);
    }, t.post = function (e) {
      return void 0 === e ? this.list.map(function (e) {
        var t = e.terms();
        return t[t.length - 1].post;
      }) : (this.list.forEach(function (t) {
        var n = t.terms();
        n[n.length - 1].post = e;
      }), this);
    }, t.trim = function () {
      return this.list = this.list.map(function (e) {
        return e.trim();
      }), this;
    }, t.hyphenate = function () {
      return this.list.forEach(function (e) {
        var t = e.terms();
        t.forEach(function (e, n) {
          0 !== n && (e.pre = ""), t[n + 1] && (e.post = "-");
        });
      }), this;
    }, t.dehyphenate = function () {
      var e = /(-|–|—)/;
      return this.list.forEach(function (t) {
        t.terms().forEach(function (t) {
          e.test(t.post) && (t.post = " ");
        });
      }), this;
    }, t.deHyphenate = t.dehyphenate, t.toQuotations = function (e, t) {
      return e = e || '"', t = t || '"', this.list.forEach(function (n) {
        var r = n.terms();
        r[0].pre = e + r[0].pre;
        var a = r[r.length - 1];
        a.post = t + a.post;
      }), this;
    }, t.toQuotation = t.toQuotations, t.toParentheses = function (e, t) {
      return e = e || "(", t = t || ")", this.list.forEach(function (n) {
        var r = n.terms();
        r[0].pre = e + r[0].pre;
        var a = r[r.length - 1];
        a.post = t + a.post;
      }), this;
    };
  }),
      ar = (rr.pre, rr.post, rr.trim, rr.hyphenate, rr.dehyphenate, rr.deHyphenate, rr.toQuotations, rr.toQuotation, rr.toParentheses, {
    join: function join(e) {
      this.uncache();

      for (var t = this.list[0], n = t.length, r = {}, a = 1; a < this.list.length; a++) {
        var i = this.list[a];
        r[i.start] = !0;
        var o = t.lastTerm();
        e && (o.post += e), o.next = i.start, i.terms(0).prev = o.id, t.length += i.length;
      }

      var s = t.length - n;
      return this.parents().forEach(function (e) {
        e.list.forEach(function (e) {
          for (var n = e.terms(), r = 0; r < n.length; r++) {
            if (n[r].id === t.start) {
              e.length += s;
              break;
            }
          }
        }), e.list = e.list.filter(function (e) {
          return !0 !== r[e.start];
        });
      }), this.buildFrom([t]);
    }
  }),
      ir = /[,\)"';:\-–—\.…]/,
      or = function or(e, t) {
    if (e.found) {
      for (var n = e.termList(), r = 0; r < n.length - 1; r++) {
        var a = n[r];
        if (ir.test(a.post)) return;
      }

      n.forEach(function (e) {
        e.implicit = e.clean;
      }), n[0].text += t, n.slice(1).forEach(function (e) {
        e.text = "";
      });

      for (var i = 0; i < n.length - 1; i++) {
        var o = n[i];
        o.post = o.post.replace(/ /, "");
      }
    }
  },
      sr = {
    contract: function contract() {
      var e = this.not("@hasContraction"),
          t = e.match("(we|they|you) are");
      return or(t, "'re"), t = e.match("(he|she|they|it|we|you) will"), or(t, "'ll"), t = e.match("(he|she|they|it|we) is"), or(t, "'s"), t = e.match("#Person is"), or(t, "'s"), t = e.match("#Person would"), or(t, "'d"), t = e.match("(is|was|had|would|should|could|do|does|have|has|can) not"), or(t, "n't"), t = e.match("(i|we|they) have"), or(t, "'ve"), t = e.match("(would|should|could) have"), or(t, "'ve"), t = e.match("i am"), or(t, "'m"), t = e.match("going to"), this;
    }
  },
      ur = Object.assign({}, mn, pn, gn, bn, yn, wn, kn, $n, Pn, Gn, Ln, Wn, Rn, Yn, er, nr, rr, ar, sr),
      lr = {};

  [["terms", "."], ["hyphenated", "@hasHyphen ."], ["adjectives", "#Adjective"], ["hashTags", "#HashTag"], ["emails", "#Email"], ["emoji", "#Emoji"], ["emoticons", "#Emoticon"], ["atMentions", "#AtMention"], ["urls", "#Url"], ["adverbs", "#Adverb"], ["pronouns", "#Pronoun"], ["money", "#Money"], ["conjunctions", "#Conjunction"], ["prepositions", "#Preposition"]].forEach(function (e) {
    lr[e[0]] = function (t) {
      var n = this.match(e[1]);
      return "number" == typeof t && (n = n.get(t)), n;
    };
  }), lr.emojis = lr.emoji, lr.atmentions = lr.atMentions, lr.words = lr.terms, lr.phoneNumbers = function (e) {
    var t = this.splitAfter("@hasComma");
    return t = t.match("#PhoneNumber+"), "number" == typeof e && (t = t.get(e)), t;
  }, lr.places = function (e) {
    var t = this.match("(#City && @hasComma) (#Region|#Country)"),
        n = this.not(t).splitAfter("@hasComma");
    return (n = n.concat(t)).sort("index"), n = n.match("#Place+"), "number" == typeof e && (n = n.get(e)), n;
  }, lr.organizations = function (e) {
    var t = this.clauses();
    return t = t.match("#Organization+"), "number" == typeof e && (t = t.get(e)), t;
  }, lr.entities = function (e) {
    var t = this.clauses(),
        n = t.people();
    return (n = (n = (n = n.concat(t.places())).concat(t.organizations())).not(["someone", "man", "woman", "mother", "brother", "sister", "father"])).sort("sequence"), "number" == typeof e && (n = n.get(e)), n;
  }, lr.things = lr.entities, lr.topics = lr.entities, lr.sentences = function () {
    return this.all();
  };

  var cr = lr,
      hr = function hr(e, t, n) {
    var r = n.words,
        a = e[t].reduced + " " + e[t + 1].reduced;
    return void 0 !== r[a] && !0 === r.hasOwnProperty(a) ? (e[t].tag(r[a], "lexicon-two", n), e[t + 1].tag(r[a], "lexicon-two", n), 1) : t + 2 < e.length && void 0 !== r[a += " " + e[t + 2].reduced] && !0 === r.hasOwnProperty(a) ? (e[t].tag(r[a], "lexicon-three", n), e[t + 1].tag(r[a], "lexicon-three", n), e[t + 2].tag(r[a], "lexicon-three", n), 2) : t + 3 < e.length && void 0 !== r[a += " " + e[t + 3].reduced] && !0 === r.hasOwnProperty(a) ? (e[t].tag(r[a], "lexicon-four", n), e[t + 1].tag(r[a], "lexicon-four", n), e[t + 2].tag(r[a], "lexicon-four", n), e[t + 3].tag(r[a], "lexicon-four", n), 3) : 0;
  },
      dr = function dr(e, t) {
    for (var n = t.words, r = t.hasCompound, a = 0; a < e.length; a += 1) {
      var i = e[a].clean;

      if (!0 === r[i] && a + 1 < e.length) {
        var o = hr(e, a, t);

        if (o > 0) {
          a += o;
          continue;
        }
      }

      void 0 !== n[i] && !0 === n.hasOwnProperty(i) && e[a].tag(n[i], "lexicon", t), i !== e[a].reduced && !0 === n.hasOwnProperty(e[a].reduced) && e[a].tag(n[e[a].reduced], "lexicon", t);
    }

    return e;
  },
      fr = /[\'‘’‛‵′`´]$/,
      mr = /^[A-Z]('s|,)?$/,
      pr = {
    I: !0,
    A: !0
  },
      gr = function gr(e, t, n) {
    var r = e[t];

    if (fr.test(r.text) && !fr.test(r.pre) && !fr.test(r.post) && r.clean.length > 2) {
      var a = r.clean[r.clean.length - 2];
      if ("s" === a) return void r.tag(["Possessive", "Noun"], "end-tick", n);
      "n" === a && r.tag(["Gerund"], "chillin", n);
    }

    !function (e, t) {
      var n = e.reduced;
      return !!e.tags.Acronym || !(n.length > 4 && t.words[n]) && e.isAcronym();
    }(r, n) ? !pr.hasOwnProperty(r.text) && mr.test(r.text) && (r.tag("Acronym", "one-letter-acronym", n), r.tag("Noun", "one-letter-infer", n)) : (r.tag("Acronym", "acronym-step", n), r.tag("Noun", "acronym-infer", n));
  },
      vr = [[/^[0-9]{3}-[0-9]{4}$/, "PhoneNumber"], [/^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, "PhoneNumber"], [/^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?([a-z]{1,4})?$/, ["Money", "Value"]], [/^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$/, ["Money", "Value"]], [/^[-+]?[0-9]([0-9,.]+)?(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ["Money", "Value"]], [/^\w+@\w+\.[a-z]{2,3}$/, "Email"], [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, "HashTag"], [/^@\w{2,}$/, "AtMention"], [/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, "Url"], [/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/, "Url"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, "Time"], [/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/, "Time"], [/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/, "Time"], [/^[PMCE]ST$/, "Time"], [/^utc ?[+-]?[0-9]+?$/, "Time"], [/^[a-z0-9]*? o\'?clock$/, "Time"], [/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, "Date"], [/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, "Date"], [/^ma?c\'.*/, "LastName"], [/^o\'[drlkn].*/, "LastName"], [/^ma?cd[aeiou]/, "LastName"], [/^(lol)+[sz]$/, "Expression"], [/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, "Verb"], [/^[\-\+]?[0-9]+(\.[0-9])*$/, ["Cardinal", "NumericValue"]], [/^(over|under)[a-z]{2,}/, "Adjective"], [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, "Date"], [/^[\-\+]?[0-9][0-9,]*(\.[0-9])*$/, ["Cardinal", "NumericValue"]], [/^[-+]?[0-9]+(.[0-9]+)?$/, ["Cardinal", "NumericValue"]], [/^[0-9\.]{1,4}(st|nd|rd|th)?[-–][0-9\.]{1,4}(st|nd|rd|th)?$/, "NumberRange"], [/^[-+]?[0-9.,]{1,3}(,[0-9.,]{3})+(.[0-9]+)?$/, "NumericValue"], [/^.?[0-9]+([0-9,.]+)?%$/, ["Percent", "Cardinal", "NumericValue"]], [/^[0-9]{1,4}\/[0-9]{1,4}$/, "Fraction"], [/^[0-9\.]{1,2}[-–][0-9]{1,2}$/, ["Value", "NumberRange"]], [/^[0-9][0-9,\.]*(st|nd|rd|r?th)$/, ["NumericValue", "Ordinal"]], [/[0-9]\+$/, ["Cardinal", "NumericValue"]], [/^[0-9]+(st|nd|rd|th)$/, "Ordinal"], [/^[0-9\.]+([a-z]{1,4})$/, "Value"]],
      br = /^[IVXLCDM]{2,}$/,
      yr = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
      Ar = "Adjective",
      wr = "Infinitive",
      kr = "Singular",
      $r = "PastTense",
      Pr = "Expression",
      Gr = "LastName",
      Er = {
    a: [[/.[aeiou]na$/, "Noun"], [/.[oau][wvl]ska$/, Gr], [/.[^aeiou]ica$/, kr], [/^([hyj]a)+$/, Pr]],
    c: [[/.[^aeiou]ic$/, Ar]],
    d: [[/.[ia]sed$/, Ar], [/.[gt]led$/, Ar], [/.[td]ed$/, $r], [/.[aeiou]red$/, $r], [/.[^aeiou]led$/, $r], [/[^aeiou]ard$/, kr], [/[aeiou][^aeiou]id$/, Ar], [/[aeiou]c?ked$/, $r], [/[^aeiou][aeiou][tvx]ed$/, $r], [/.[vrl]id$/, Ar]],
    e: [[/.[lnr]ize$/, wr], [/.[^aeiou]ise$/, wr], [/.[aeiou]te$/, wr], [/.[^aeiou][ai]ble$/, Ar], [/.[^aeiou]eable$/, Ar], [/.[ts]ive$/, Ar]],
    h: [[/.[^aeiouf]ish$/, Ar], [/.v[iy]ch$/, Gr], [/^ug?h+$/, Pr], [/^uh[ -]?oh$/, Pr]],
    i: [[/.[oau][wvl]ski$/, Gr]],
    k: [[/^(k)+$/, Pr]],
    l: [[/.[gl]ial$/, Ar], [/.[^aeiou]ful$/, Ar], [/.[nrtumcd]al$/, Ar], [/.[^aeiou][ei]al$/, Ar]],
    m: [[/.[^aeiou]ium$/, kr], [/[^aeiou]ism$/, kr], [/^h*u*m+$/, Pr], [/^\d+ ?[ap]m$/, "Date"]],
    n: [[/.[lsrnpb]ian$/, Ar], [/[^aeiou]ician$/, "Actor"]],
    o: [[/^no+$/, Pr], [/^(yo)+$/, Pr], [/^woo+[pt]?$/, Pr]],
    r: [[/.[bdfklmst]ler$/, "Noun"], [/.[ilk]er$/, "Comparative"], [/[aeiou][pns]er$/, kr], [/[^i]fer$/, wr], [/.[^aeiou][ao]pher$/, "Actor"]],
    t: [[/.[di]est$/, "Superlative"], [/.[icldtgrv]ent$/, Ar], [/[aeiou].*ist$/, Ar], [/^[a-z]et$/, "Verb"]],
    s: [[/.[rln]ates$/, "PresentTense"], [/.[^z]ens$/, "Verb"], [/.[lstrn]us$/, kr], [/[aeiou][^aeiou]is$/, kr], [/[a-z]\'s$/, "Noun"], [/^yes+$/, Pr]],
    v: [[/.[^aeiou][ai][kln]ov$/, Gr]],
    y: [[/.[cts]hy$/, Ar], [/.[st]ty$/, Ar], [/.[gk]y$/, Ar], [/.[tnl]ary$/, Ar], [/.[oe]ry$/, kr], [/[rdntkbhs]ly$/, "Adverb"], [/...lly$/, "Adverb"], [/[bszmp]{2}y$/, Ar], [/.(gg|bb|zz)ly$/, Ar], [/.[aeiou]my$/, Ar], [/[ea]{2}zy$/, Ar], [/.[^aeiou]ity$/, kr]]
  },
      Cr = "Adjective",
      Fr = "Infinitive",
      Nr = "PresentTense",
      jr = "Singular",
      Br = "PastTense",
      xr = "Adverb",
      Dr = "Plural",
      Or = "Verb",
      Tr = "LastName",
      Vr = [null, null, {
    ea: jr,
    ia: "Noun",
    ic: Cr,
    ly: xr,
    "'n": Or,
    "'t": Or
  }, {
    que: Cr,
    lar: Cr,
    ffy: Cr,
    nny: Cr,
    rmy: Cr,
    azy: Cr,
    oid: Cr,
    mum: Cr,
    ous: Cr,
    end: Or,
    sis: jr,
    rol: jr,
    ize: Fr,
    ify: Fr,
    zes: Nr,
    nes: Nr,
    ing: "Gerund",
    " so": xr,
    "'ll": "Modal",
    "'re": "Copula"
  }, {
    teen: "Value",
    tors: "Noun",
    amed: Br,
    ched: Br,
    ends: Or,
    oses: Nr,
    fies: Nr,
    ects: Nr,
    nded: Br,
    cede: Fr,
    tage: Fr,
    gate: Fr,
    vice: jr,
    tion: jr,
    cted: Br,
    ette: jr,
    some: Cr,
    llen: Cr,
    ried: Cr,
    gone: Cr,
    made: Cr,
    fore: xr,
    less: xr,
    ices: Dr,
    ions: Dr,
    ints: Dr,
    aped: Br,
    lked: Br,
    ould: "Modal",
    tive: "Actor",
    sson: Tr,
    czyk: Tr,
    chuk: Tr,
    enko: Tr,
    akis: Tr,
    nsen: Tr
  }, {
    fully: xr,
    where: xr,
    wards: xr,
    urned: Br,
    tized: Br,
    eased: Br,
    ances: Dr,
    tures: Dr,
    ports: Dr,
    ettes: Dr,
    ities: Dr,
    rough: Cr,
    ology: "Noun",
    bound: Cr,
    tieth: "Ordinal",
    ishes: Nr,
    tches: Nr,
    nssen: Tr,
    marek: Tr
  }, {
    keeper: "Actor",
    logist: "Actor",
    auskas: Tr,
    teenth: "Value"
  }, {
    sdottir: Tr,
    opoulos: Tr
  }],
      zr = {
    ":(": !0,
    ":)": !0,
    ":P": !0,
    ":p": !0,
    ":O": !0,
    ":3": !0,
    ":|": !0,
    ":/": !0,
    ":\\": !0,
    ":$": !0,
    ":*": !0,
    ":@": !0,
    ":-(": !0,
    ":-)": !0,
    ":-P": !0,
    ":-p": !0,
    ":-O": !0,
    ":-3": !0,
    ":-|": !0,
    ":-/": !0,
    ":-\\": !0,
    ":-$": !0,
    ":-*": !0,
    ":-@": !0,
    ":^(": !0,
    ":^)": !0,
    ":^P": !0,
    ":^p": !0,
    ":^O": !0,
    ":^3": !0,
    ":^|": !0,
    ":^/": !0,
    ":^\\": !0,
    ":^$": !0,
    ":^*": !0,
    ":^@": !0,
    "):": !0,
    "(:": !0,
    "$:": !0,
    "*:": !0,
    ")-:": !0,
    "(-:": !0,
    "$-:": !0,
    "*-:": !0,
    ")^:": !0,
    "(^:": !0,
    "$^:": !0,
    "*^:": !0,
    "<3": !0,
    "</3": !0,
    "<\\3": !0
  },
      Hr = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
      Ir = {
    lexicon: dr,
    punctuation: gr,
    regex: function regex(e, t) {
      for (var n = e.text, r = 0; r < vr.length; r += 1) {
        if (!0 === vr[r][0].test(n)) {
          e.tagSafe(vr[r][1], "regex #" + r, t);
          break;
        }
      }

      e.text.length >= 2 && br.test(n) && yr.test(n) && e.tag("RomanNumeral", "xvii", t);
    },
    suffix: function suffix(e, t) {
      !function (e, t) {
        var n = e.clean.length,
            r = 7;
        n <= r && (r = n - 1);

        for (var a = r; a > 1; a -= 1) {
          var i = e.clean.substr(n - a, n);

          if (!0 === Vr[i.length].hasOwnProperty(i)) {
            var o = Vr[i.length][i];
            e.tagSafe(o, "suffix -" + i, t);
            break;
          }
        }
      }(e, t), function (e, t) {
        var n = e.clean,
            r = n[n.length - 1];
        if (!0 === Er.hasOwnProperty(r)) for (var a = Er[r], i = 0; i < a.length; i += 1) {
          if (!0 === a[i][0].test(n)) {
            e.tagSafe(a[i][1], "endReg ".concat(r, " #").concat(i), t);
            break;
          }
        }
      }(e, t);
    },
    emoji: function emoji(e, t) {
      var n,
          r = e.pre + e.text + e.post;
      !0 === function (e) {
        return ":" === e.charAt(0) && null !== e.match(/:.?$/) && !e.match(" ") && !(e.length > 35);
      }(r = r.trim()) && (e.tag("Emoji", "comma-emoji", t), e.text = r, e.pre = e.pre.replace(":", ""), e.post = e.post.replace(":", "")), e.text.match(Hr) && (e.tag("Emoji", "unicode-emoji", t), e.text = r), !0 === (n = (n = r).replace(/^[:;]/, ":"), zr.hasOwnProperty(n)) && (e.tag("Emoticon", "emoticon-emoji", t), e.text = r);
    }
  },
      Mr = function Mr(e) {
    var t = e.termList(),
        n = e.world;
    Ir.lexicon(t, n);

    for (var r = 0; r < t.length; r += 1) {
      var a = t[r];
      Ir.punctuation(t, r, n), Ir.regex(a, n), Ir.suffix(a, n), Ir.emoji(a, n);
    }

    return e;
  },
      Sr = {
    beforeThisWord: {
      there: "Verb",
      me: "Verb",
      man: "Adjective",
      only: "Verb",
      him: "Verb",
      were: "Noun",
      took: "Noun",
      himself: "Verb",
      went: "Noun",
      who: "Noun",
      jr: "Person"
    },
    afterThisWord: {
      i: "Verb",
      first: "Noun",
      it: "Verb",
      there: "Verb",
      not: "Verb",
      because: "Noun",
      "if": "Noun",
      but: "Noun",
      who: "Verb",
      "this": "Noun",
      his: "Noun",
      when: "Noun",
      you: "Verb",
      very: "Adjective",
      old: "Noun",
      never: "Verb",
      before: "Noun"
    },
    beforeThisPos: {
      Copula: "Noun",
      PastTense: "Noun",
      Conjunction: "Noun",
      Modal: "Noun",
      Pluperfect: "Noun",
      PerfectTense: "Verb"
    },
    afterThisPos: {
      Adjective: "Noun",
      Possessive: "Noun",
      Determiner: "Noun",
      Adverb: "Verb",
      Pronoun: "Verb",
      Value: "Noun",
      Ordinal: "Noun",
      Modal: "Verb",
      Superlative: "Noun",
      Demonym: "Noun",
      Honorific: "Person"
    }
  },
      Lr = Object.keys(Sr.afterThisPos),
      Jr = Object.keys(Sr.beforeThisPos),
      Wr = function Wr(e, t) {
    for (var n = function n(_n2) {
      var r = e[_n2];
      if (!0 === r.isKnown()) return "continue";
      var a = e[_n2 - 1];

      if (a) {
        if (!0 === Sr.afterThisWord.hasOwnProperty(a.clean)) {
          var i = Sr.afterThisWord[a.clean];
          return r.tag(i, "after-" + a.clean, t), "continue";
        }

        var o = Lr.find(function (e) {
          return a.tags[e];
        });

        if (void 0 !== o) {
          var s = Sr.afterThisPos[o];
          return r.tag(s, "after-" + o, t), "continue";
        }
      }

      var u = e[_n2 + 1];

      if (u) {
        if (!0 === Sr.beforeThisWord.hasOwnProperty(u.clean)) {
          var l = Sr.beforeThisWord[u.clean];
          return r.tag(l, "before-" + u.clean, t), "continue";
        }

        var c = Jr.find(function (e) {
          return u.tags[e];
        });

        if (void 0 !== c) {
          var h = Sr.beforeThisPos[c];
          return r.tag(h, "before-" + c, t), "continue";
        }
      }
    }, r = 0; r < e.length; r += 1) {
      n(r);
    }
  },
      _r = /^[A-Z][a-z'\u00C0-\u00FF]/,
      qr = /[0-9]/,
      Rr = function Rr(e, t) {
    e.forEach(function (e, n) {
      !0 === _r.test(e.text) && !1 === qr.test(e.text) && (0 !== n ? e.tag("TitleCase", "case", t) : (e.tags.Person || e.tags.Organization || e.tags.Place) && e.tag("TitleCase", "case-person", t), 0 !== n && e.tag("ProperNoun", "case-noun", t));
    });
  },
      Kr = /^(re|un)-?[a-z\u00C0-\u00FF]/,
      Qr = /^(re|un)-?/,
      Ur = function Ur(e, t) {
    var n = t.words;
    e.forEach(function (e) {
      if (!0 !== e.isKnown() && !0 === Kr.test(e.clean)) {
        var r = e.clean.replace(Qr, "");
        r && r.length > 3 && void 0 !== n[r] && !0 === n.hasOwnProperty(r) && e.tag(n[r], "stem-" + r, t);
      }
    });
  },
      Xr = {
    isSingular: [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /s[aeiou]+ns$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i],
    isPlural: [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /is$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i]
  },
      Zr = ["Uncountable", "Pronoun", "Place", "Value", "Person", "Month", "WeekDay", "Holiday"],
      Yr = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/],
      ea = [/i$/, /ae$/],
      ta = function ta(e, t) {
    if (e.tags.Noun && !e.tags.Acronym) {
      var n = e.clean;
      if (e.tags.Singular || e.tags.Plural) return;
      if (n.length <= 3) return void e.tag("Singular", "short-singular", t);
      if (Zr.find(function (t) {
        return e.tags[t];
      })) return;
      if (Xr.isPlural.find(function (e) {
        return e.test(n);
      })) return void e.tag("Plural", "plural-rules", t);
      if (Xr.isSingular.find(function (e) {
        return e.test(n);
      })) return void e.tag("Singular", "singular-rules", t);

      if (!0 === /s$/.test(n)) {
        if (Yr.find(function (e) {
          return e.test(n);
        })) return;
        return void e.tag("Plural", "plural-fallback", t);
      }

      if (ea.find(function (e) {
        return e.test(n);
      })) return;
      e.tag("Singular", "singular-fallback", t);
    }
  },
      na = ["academy", "administration", "agence", "agences", "agencies", "agency", "airlines", "airways", "army", "assoc", "associates", "association", "assurance", "authority", "autorite", "aviation", "bank", "banque", "board", "boys", "brands", "brewery", "brotherhood", "brothers", "building society", "bureau", "cafe", "caisse", "capital", "care", "cathedral", "center", "central bank", "centre", "chemicals", "choir", "chronicle", "church", "circus", "clinic", "clinique", "club", "co", "coalition", "coffee", "collective", "college", "commission", "committee", "communications", "community", "company", "comprehensive", "computers", "confederation", "conference", "conseil", "consulting", "containers", "corporation", "corps", "corp", "council", "crew", "daily news", "data", "departement", "department", "department store", "departments", "design", "development", "directorate", "division", "drilling", "education", "eglise", "electric", "electricity", "energy", "ensemble", "enterprise", "enterprises", "entertainment", "estate", "etat", "evening news", "faculty", "federation", "financial", "fm", "foundation", "fund", "gas", "gazette", "girls", "government", "group", "guild", "health authority", "herald", "holdings", "hospital", "hotel", "hotels", "inc", "industries", "institut", "institute", "institute of technology", "institutes", "insurance", "international", "interstate", "investment", "investments", "investors", "journal", "laboratory", "labs", "liberation army", "limited", "local authority", "local health authority", "machines", "magazine", "management", "marine", "marketing", "markets", "media", "memorial", "mercantile exchange", "ministere", "ministry", "military", "mobile", "motor", "motors", "musee", "museum", "news", "news service", "observatory", "office", "oil", "optical", "orchestra", "organization", "partners", "partnership", "people's party", "petrol", "petroleum", "pharmacare", "pharmaceutical", "pharmaceuticals", "pizza", "plc", "police", "polytechnic", "post", "power", "press", "productions", "quartet", "radio", "regional authority", "regional health authority", "reserve", "resources", "restaurant", "restaurants", "savings", "school", "securities", "service", "services", "social club", "societe", "society", "sons", "standard", "state police", "state university", "stock exchange", "subcommittee", "syndicat", "systems", "telecommunications", "telegraph", "television", "times", "tribunal", "tv", "union", "university", "utilities", "workers"].reduce(function (e, t) {
    return e[t] = "Noun", e;
  }, {}),
      ra = function ra(e) {
    return !!e.tags.Noun && !(e.tags.Pronoun || e.tags.Comma || e.tags.Possessive) && !!(e.tags.Organization || e.tags.Acronym || e.tags.Place || e.titleCase());
  },
      aa = {
    neighbours: Wr,
    "case": Rr,
    stem: Ur,
    plural: ta,
    organizations: function organizations(e, t) {
      for (var n = 0; n < e.length; n += 1) {
        var r = e[n];

        if (void 0 !== na[r.clean] && !0 === na.hasOwnProperty(r.clean)) {
          var a = e[n - 1];

          if (void 0 !== a && !0 === ra(a)) {
            a.tagSafe("Organization", "org-word-1", t), r.tagSafe("Organization", "org-word-2", t);
            continue;
          }

          var i = e[n + 1];

          if (void 0 !== i && "of" === i.clean && e[n + 2] && ra(e[n + 2])) {
            r.tagSafe("Organization", "org-of-word-1", t), i.tagSafe("Organization", "org-of-word-2", t), e[n + 2].tagSafe("Organization", "org-of-word-3", t);
            continue;
          }
        }
      }
    }
  },
      ia = function ia(e) {
    var t = e.termList(),
        n = e.world;
    return aa.neighbours(t, n), aa["case"](t, n), aa.stem(t, n), t.forEach(function (t) {
      !1 === t.isKnown() && t.tag("Noun", "noun-fallback", e.world);
    }), aa.organizations(t, n), t.forEach(function (t) {
      aa.plural(t, e.world);
    }), e;
  },
      oa = /n't$/,
      sa = {
    "won't": ["will", "not"],
    wont: ["will", "not"],
    "can't": ["can", "not"],
    cant: ["can", "not"],
    cannot: ["can", "not"],
    "shan't": ["should", "not"],
    dont: ["do", "not"],
    dun: ["do", "not"]
  },
      ua = function ua(e) {
    return !0 === sa.hasOwnProperty(e.clean) ? sa[e.clean] : !0 === oa.test(e.clean) ? [e.clean.replace(oa, ""), "not"] : null;
  },
      la = /([a-z\u00C0-\u00FF]+)'([a-z]{1,2})$/i,
      ca = {
    ll: "will",
    ve: "have",
    re: "are",
    m: "am",
    "n't": "not"
  },
      ha = function ha(e) {
    var t = e.text.match(la);
    return null === t ? null : ca.hasOwnProperty(t[2]) ? [t[1], ca[t[2]]] : null;
  },
      da = {
    wanna: ["want", "to"],
    gonna: ["going", "to"],
    im: ["i", "am"],
    alot: ["a", "lot"],
    ive: ["i", "have"],
    imma: ["I", "will"],
    "where'd": ["where", "did"],
    whered: ["where", "did"],
    "when'd": ["when", "did"],
    whend: ["when", "did"],
    "how'd": ["how", "did"],
    howd: ["how", "did"],
    "what'd": ["what", "did"],
    whatd: ["what", "did"],
    dunno: ["do", "not", "know"],
    brb: ["be", "right", "back"],
    gtg: ["got", "to", "go"],
    irl: ["in", "real", "life"],
    tbh: ["to", "be", "honest"],
    imo: ["in", "my", "opinion"],
    til: ["today", "i", "learned"],
    rn: ["right", "now"],
    twas: ["it", "was"],
    "@": ["at"]
  },
      fa = function fa(e, t) {
    return "ain't" === e.clean || "aint" === e.clean ? function (e, t) {
      var n = t.terms(),
          r = n.indexOf(e),
          a = n.slice(0, r).find(function (e) {
        return e.tags.Noun;
      });
      return a && a.tags.Plural ? ["are", "not"] : ["is", "not"];
    }(e, t) : da.hasOwnProperty(e.clean) ? da[e.clean] : null;
  },
      ma = /([a-z\u00C0-\u00FF]+)'s$/i,
      pa = {
    that: !0,
    there: !0
  },
      ga = function ga(e, t, n) {
    var r = e.text.match(ma);

    if (null !== r) {
      if (!0 === function (e, t) {
        if (e.tags.Possessive) return !0;
        if (e.tags.Pronoun || e.tags.QuestionWord) return !1;
        if (pa.hasOwnProperty(e.clean)) return !1;
        var n = t.get(e.next);
        if (!n) return !0;
        if (n.tags.Verb) return !!n.tags.Infinitive;
        if (n.tags.Noun) return !0;
        var r = t.get(n.next);
        return !(!r || !r.tags.Noun || r.tags.Pronoun) || (n.tags.Adjective || n.tags.Adverb || n.tags.Verb, !1);
      }(e, t.pool)) return e.tag("#Possessive", "isPossessive", n), null;
      if (null !== r) return function (e, t) {
        var n = t.terms(),
            r = n.indexOf(e);
        return n.slice(r + 1, r + 3).find(function (e) {
          return e.tags.PastTense;
        });
      }(e, t) ? [r[1], "has"] : [r[1], "is"];
    }

    return null;
  },
      va = /[a-z\u00C0-\u00FF]'d$/,
      ba = function ba(e, t) {
    if (va.test(e.clean)) {
      for (var n = e.clean.replace(/'d$/, ""), r = t.terms(), a = r.indexOf(e), i = r.slice(a + 1, a + 4), o = 0; o < i.length; o++) {
        var s = i[o];
        if (s.tags.Verb) return s.tags.PastTense ? [n, "had"] : [n, "would"];
      }

      return [n, "would"];
    }

    return null;
  },
      ya = /^([0-9]+)[-–—]([0-9]+)$/i,
      Aa = function Aa(e) {
    if (!0 === e.tags.PhoneNumber) return null;
    var t = e.text.match(ya);
    return null !== t ? [t[1], "to", t[2]] : null;
  },
      wa = /^[0-9]+$/,
      ka = function ka(e, t) {
    var n = tt(e.join(" "), t.world, t.pool())[0],
        r = n.terms();
    return dr(r, t.world), r.forEach(function (e) {
      e.implicit = e.text, e.text = "", e.clean = "", e.pre = "", e.post = "", wa.test(e.implicit) && (e.tags.Number = !0, e.tags.Cardinal = !0);
    }), n;
  },
      $a = function $a(e) {
    var t = e.world;
    return e.list.forEach(function (n) {
      for (var r = n.terms(), a = 0; a < r.length; a += 1) {
        var i = r[a],
            o = ua(i);

        if (null !== (o = (o = (o = (o = (o = o || ha(i)) || fa(i, n)) || ga(i, n, t)) || ba(i, n)) || Aa(i))) {
          var s = ka(o, e);
          s.terms(0).text = i.text, n.buildFrom(i.id, 1, e.pool()).replace(s, e, !0);
        }
      }
    }), e;
  },
      Pa = function Pa(e) {
    e.match("(foot|feet)").tag("Noun", "foot-noun"), e.match("(#Noun && @hasComma) #Noun (and|or) [#PresentTense]").tag("#Noun", "noun-list"), e.match("#Value [(foot|feet)]").tag("Unit", "foot-unit"), e.match("#Conjunction [u]").tag("Pronoun", "u-pronoun-2"), e.match("#Holiday (day|eve)").tag("Holiday", "holiday-day"), e.match("#Noun [(who|whom)]").tag("Determiner", "captain-who"), e.match("(standard|daylight|summer|eastern|pacific|central|mountain) standard? time").tag("Time", "timezone"), e.match("#Demonym #Currency").tag("Currency", "demonym-currency"), e.match("[about to] #Adverb? #Verb").tag(["Auxiliary", "Verb"], "about-to"), e.match("(right|rights) of .").tag("Noun", "right-of"), e.match("[much] #Adjective").tag("Adverb", "bit-1"), e.match("a [bit]").tag("Noun", "bit-2"), e.match("a bit much").tag("Determiner Adverb Adjective", "bit-3"), e.match("too much").tag("Adverb Adjective", "bit-4"), e.match("u r").tag("Pronoun #Copula", "u r"), e.match("^(well|so|okay)").tag("Expression", "well-");
    var t = e.clauses();
    t.match("^had #Noun+ #PastTense").firstTerm().tag("Condition", "had-he"), t.match("^were #Noun+ to #Infinitive").firstTerm().tag("Condition", "were-he"), e.match("holy (shit|fuck|hell)").tag("Expression", "swears-expression"), e.match("#Determiner [(shit|damn|hell)]").tag("Noun", "swears-noun"), e.match("[(shit|damn|fuck)] (#Determiner|#Possessive|them)").tag("Verb", "swears-verb"), e.match("#Copula fucked up?").not("#Copula").tag("Adjective", "swears-adjective");
    var n = e["if"]("so");
    !0 === n.found && (n.match("[so] #Adjective").tag("Adverb", "so-adv"), n.match("[so] #Noun").tag("Conjunction", "so-conj"), n.match("do [so]").tag("Noun", "so-noun"));
    var r = e["if"]("all");
    !0 === r.found && (r.match("[all] #Determiner? #Noun").tag("Adjective", "all-noun"), r.match("[all] #Verb").tag("Adverb", "all-verb"));
    var a = e["if"]("which");
    !0 === a.found && (a.match("#Verb #Adverb? #Noun [(that|which)]").tag("Preposition", "that-prep"), a.match("that #Noun [#Verb]").tag("Determiner", "that-determiner"), a.match("@hasComma [which] (#Pronoun|#Verb)").tag("Preposition", "which-copula"));
    var i = e["if"]("like");
    !0 === i.found && (i.match("just [like]").tag("Preposition", "like-preposition"), i.match("#Noun [like] #Noun").tag("Preposition", "noun-like"), i.match("#Verb [like]").tag("Adverb", "verb-like"), i.match("#Adverb like").notIf("(really|generally|typically|usually|sometimes|often) [like]").tag("Adverb", "adverb-like"));
    var o = e["if"]("@titleCase");
    !0 === o.found && (o.match("@titleCase (ltd|co|inc|dept|assn|bros)").tag("Organization", "org-abbrv"), o.match("@titleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)").tag("Region", "foo-district"), o.match("(district|region|province|municipality|territory|burough|state) of @titleCase").tag("Region", "district-of-Foo"));
    var s = e["if"]("@hasHyphen");
    !0 === s.found && (s.match("@hasHyphen .").match("#Noun #Verb").tag("Noun", "hyphen-verb"), s["if"]("#Expression").match("@hasHyphen+").tag("Expression", "ooh-wee"));
    var u = e["if"]("#Place");
    return !0 === u.found && (u.match("(west|north|south|east|western|northern|southern|eastern)+ #Place").tag("Region", "west-norfolk"), u.match("#City [#Acronym]").match("(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)").tag("Region", "us-state")), e;
  },
      Ga = function Ga(e) {
    var t = e["if"]("#Determiner");

    if (!0 === t.found) {
      var n = t["if"]("#Adjective");
      n.found && (n.match("(the|this|those|these) #Adjective [#Verb]").tag("Noun", "the-adj-verb"), n.match("(the|this|those|these) #Adverb #Adjective [#Verb]").tag("Noun", "correction-determiner4"), n.match("#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)").tag("Noun", "the-adj-2"), n.match("#Determiner #Adjective$").notIf("(#Comparative|#Superlative)").terms(1).tag("Noun", "the-adj-1"));
      var r = t["if"]("#Infinitive");
      r.found && (r.match("(the|this|a|an) [#Infinitive] #Adverb? #Verb").tag("Noun", "correction-determiner5"), r.match("#Determiner [#Infinitive] #Noun").tag("Noun", "correction-determiner7"), r.match("#Determiner [#Infinitive]$").tag("Noun", "a-inf")), t.match("(the|this) [#Verb] #Preposition .").tag("Noun", "correction-determiner1"), t.match("#Determiner [#Verb] of").tag("Noun", "the-verb-of"), t.match("#Determiner #Noun of [#Verb]").tag("Noun", "noun-of-noun"), t.match("#Determiner #Adverb? [close]").tag("Adjective", "a-close"), t.match("#Determiner [(western|eastern|northern|southern|central)] #Noun").tag("Noun", "western-line"), t.match("(the|those|these) [(#Infinitive|#PresentTense|#PastTense)]").tag("Noun", "correction-determiner2");
    }

    var a = e["if"]("(a|an)");
    return !0 === a.found && (a.match("(a|an) [#Gerund]").tag("Adjective", "correction-a|an"), a.match("#Verb (a|an) [#Value]").tag("Singular", "a-value"), a.match("(a|an) #Noun [#Infinitive]").tag("Noun", "a-noun-inf"), a.match("(a|an) #Adjective (#Infinitive|#PresentTense)").terms(2).tag("Noun", "correction-a|an2"), a.match("[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)").ifNo("#Plural").tag("Value", "a-is-one")), e;
  },
      Ea = function Ea(e) {
    var t = e["if"]("#Noun");

    if (!0 === t.found) {
      t.match("more #Noun").tag("Noun", "more-noun"), t.match("#Noun #Adverb [#Noun]").tag("Verb", "quickly-foo"), t.match("#Noun [#Particle]").tag("Preposition", "repair-noPhrasal"), t.match("#Noun (&|n) #Noun").tag("Organization", "Noun-&-Noun"), t.match("#Noun #Actor").tag("Actor", "thing-doer"), e.match("#Noun van der? #Noun").tagSafe("#Person", "von der noun"), e.match("(king|queen|prince|saint|lady) of? #Noun").tagSafe("#Person", "king-of-noun"), e.match("#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)").tag("Address"), e.match("#Noun+ (public|private) school").tag("School"), t.match("[second] #Noun").notIf("#Honorific").unTag("Unit").tag("Ordinal", "second-noun"), t.match("(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun").tag("Noun", "technical-noun");
      var n = t["if"]("#Organization");
      !0 === n.found && (n.match("#Organization of the? @titleCase").tagSafe("Organization", "org-of-place"), n.match("#Organization #Country").tag("Organization", "org-country"), n.match("(world|global|international|national|#Demonym) #Organization").tag("Organization", "global-org"), n.match("#TitleCase #Organization").ifNo("@hasComma").tag("Organization", "titlecase-org"));
      var r = t["if"]("#Plural");
      !0 === r.found && (r.match("some [#Verb] #Plural").tag("Noun", "correction-determiner6"), t.match("(this|that) [#Plural]").tag("PresentTense", "this-verbs"));
    }

    var a = e["if"]("#Acronym");
    !0 === a.found && (a.match("the [#Acronym]").notIf("(iou|fomo|yolo|diy|dui|nimby)").tag("Organization", "the-acronym"), a.match("#Acronym").match("#Possessive").tag("Organization", "possessive-acronym"));
    var i = e["if"]("#Possessive");
    return !0 === i.found && (i.match("#Possessive [#FirstName]").unTag("Person", "possessive-name"), i.match("#FirstName #Acronym? #Possessive").ifNo("@hasComma").match("#FirstName #Acronym? #LastName").tag("Possessive"), i.match("#Organization+ #Possessive").ifNo("@hasComma").tag("Possessive"), i.match("#Place+ #Possessive").ifNo("@hasComma").tag("Possessive"), i.match("#Possessive [#Verb]").tag("Noun", "correction-possessive")), e;
  },
      Ca = "(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)",
      Fa = "(pat|wade|ollie|will|rob|buck|bob|mark|jack)",
      Na = "(misty|rusty|dusty|rich|randy)",
      ja = "(april|june|may|jan|august|eve)",
      Ba = "(paris|alexandria|houston|kobe|salvador|sydney)",
      xa = function xa(e) {
    var t = e["if"]("#Honorific");
    !0 === t.found && (e.match("(mr|mrs|ms|dr) (#TitleCase|#Possessive)+").tag("#Person", "mr-putin"), t.match("#Honorific #Acronym").tag("Person", "Honorific-TitleCase"), t.match("^#Honorific$").unTag("Person", "single-honorific"), t.match("[(1st|2nd|first|second)] #Honorific").tag("Honorific", "ordinal-honorific"));
    var n = e["if"]("#TitleCase");
    !0 === n.found && (n.match("#Acronym #TitleCase").tagSafe("#Person", "acronym-titlecase"), n.match("#TitleCase (van|al|bin) #TitleCase").tagSafe("Person", "titlecase-van-titlecase"), n.match("#TitleCase (de|du) la? #TitleCase").tagSafe("Person", "titlecase-van-titlecase"), n.match("(lady|queen|sister) #TitleCase").ifNo("#Date").ifNo("#Honorific").tag("#FemaleName", "lady-titlecase"), n.match("(king|pope|father) #TitleCase").ifNo("#Date").tag("#MaleName", "poe"), n.match(Ca + " #Acronym? #TitleCase").tagSafe("Person", "ray-smith"), n.match(Fa + " #Acronym? #TitleCase").tag("Person", "rob-smith"), n.match(Na + " #Acronym? #TitleCase").tag("Person", "rusty-smith"), n.match(ja + " #Acronym? (#TitleCase && !#Month)").tagSafe("Person", "june-smith"));
    var r = e["if"]("#Person");

    if (!0 === r.found) {
      r.match("#Person (jr|sr|md)").tag("Person", "person-honorific"), r.match("#Person #Person the? #RomanNumeral").tag("Person", "roman-numeral"), r.match("#Honorific #Person").tag("Person", "Honorific-Person"), r.match("#FirstName [/^[^aiurck]$/]").tag(["Acronym", "Person"], "john-e"), r.match("#Honorific #Person").tag("Person", "honorific-person"), r.match("[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person").tag("Honorific", "ambg-honorifics"), n.match("#Person #TitleCase").match("#TitleCase #Noun").tagSafe("Person", "person-titlecase");
      var a = r["if"](Ca);
      !0 === a.found && a.match(Ca + " #Person").tagSafe("Person", "ray-smith");
      var i = r["if"](Fa);
      !0 === i && (i.match("(#Modal|#Adverb) [" + Fa + "]").tag("Verb", "would-mark"), i.match(Fa + " #Person").tag("Person", "rob-smith"));
      var o = r["if"](Na);
      !0 === o.found && (o.match("#Adverb [" + Na + "]").tag("Adjective", "really-rich"), o.match(Na + " #Person").tag("Person", "randy-smith"));
      var s = r["if"](ja);
      !0 === s.found && (s.match(String(ja) + " #Person").tagSafe("Person", "june-smith"), s.match("(in|during|on|by|before|#Date) [" + ja + "]").tagSafe("Date", "in-june"), s.match(ja + " (#Date|#Value)").tagSafe("Date", "june-5th"));
      var u = r["if"](Ba);
      !0 === u.found && (u.match("(in|near|at|from|to|#Place) [" + Ba + "]").tagSafe("Place", "in-paris"), u.match("[" + Ba + "] #Place").tagSafe("Place", "paris-france"));
      var l = r["if"]("al");
      !0 === l.found && (l.match("al (#Person|#TitleCase)").tagSafe("#Person", "al-borlen"), l.match("#TitleCase al #TitleCase").tagSafe("#Person", "arabic-al-arabic"));
      var c = r["if"]("#FirstName");
      if (!0 === c.found) c.match("#FirstName de #Noun").tag("#Person", "firstname-de-noun"), c.match("#FirstName (bin|al) #Noun").tag("#Person", "firstname-al-noun"), c.match("#FirstName #Acronym #TitleCase").tag("Person", "firstname-acronym-titlecase"), c.match("#FirstName #FirstName #TitleCase").tag("Person", "firstname-firstname-titlecase"), c.match("#Honorific #FirstName? #TitleCase").tag("Person", "Honorific-TitleCase"), c.match("#FirstName the #Adjective").tag("Person", "determiner5"), c.match("#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)").tag("#Person", "firstname-maybe"), c.match("#FirstName #TitleCase #TitleCase?").match("#Noun+").tag("Person", "firstname-titlecase"), c.match("#FirstName #Acronym #Noun").ifNo("#Date").tag("#Person", "n-acro-noun").lastTerm().tag("#LastName", "n-acro-noun"), c.match("#FirstName [#Determiner #Noun] #LastName").tag("#NickName", "first-noun-last").tag("#Person", "first-noun-last"), c.match("#FirstName (#Singular|#Possessive)").ifNo("(#Date|#Pronoun|#NickName)").tag("#Person", "first-possessive").lastTerm().tag("#LastName", "first-possessive"), c.match("#FirstName (#Noun|#TitleCase)").ifNo("^#Possessive").ifNo("#ClauseEnd .").ifNo("#Pronoun").lastTerm().tag("#LastName", "firstname-noun");
      var h = r["if"]("#LastName");
      !0 === h.found && (h.match("#Copula [(#Noun|#PresentTense)] #LastName").tag("#FirstName", "copula-noun-lastname"), h.match("[#Noun] #LastName").canBe("#FirstName").tag("#FirstName", "noun-lastname"), h.match("[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName").tag("#FirstName", "maybe-lastname"), h.match("(#TitleCase|#Singular) #Acronym? #LastName").ifNo("#Date").tag("#Person", "title-acro-noun").lastTerm().tag("#LastName", "title-acro-noun"));
    }

    return e;
  },
      Da = "(#Adverb|not)+?",
      Oa = function Oa(e) {
    var t = e["if"]("#Verb");

    if (t.found) {
      t.match("[(do|does|will|have|had)] (not|#Adverb)? #Verb").tag("Auxiliary", "have-had"), t.match("[still] #Verb").tag("Adverb", "still-verb"), t.match("[u] #Verb").tag("Pronoun", "u-pronoun-1"), t.match("is no [#Verb]").tag("Noun", "is-no-verb"), t.match("[#Verb] than").tag("Noun", "correction"), t.match("[#PastTense] #Singular is").tag("#Adjective", "smoked-poutine"), t.match("[#PastTense] #Plural are").tag("#Adjective", "baked-onions"), t.match("(go|goes|went) to [#Infinitive]").tag("#Noun", "goes-to-verb"), t.match("there (are|were) #Adjective? [#PresentTense]").tag("Plural", "there-are"), t.match("#Singular (seems|appears) #Adverb? [#PastTense$]").tag("Adjective", "seems-filled"), t.match("#PhrasalVerb [#PhrasalVerb]").tag("Particle", "phrasal-particle"), t.match("(be|been) ".concat(Da, " #Gerund")).not("#Verb$").tag("Auxiliary", "be-walking"), t.match("(try|use|attempt|build|make) #Verb").ifNo("(@hasComma|#Negative|#Copula|will|be)").lastTerm().tag("#Noun", "do-verb");
      var n = t["if"]("(#Modal|did|had|has)");
      !0 === n.found && (n.match("(has|had) ".concat(Da, " #PastTense")).not("#Verb$").tag("Auxiliary", "had-walked"), n.match("(#Modal|did) ".concat(Da, " #Verb")).not("#Verb$").tag("Auxiliary", "modal-verb"), n.match("#Modal ".concat(Da, " have ").concat(Da, " had ").concat(Da, " #Verb")).not("#Verb$").tag("Auxiliary", "would-have"), n.match("#Modal ".concat(Da, " be ").concat(Da, " #Verb")).not("#Verb$").tag("Auxiliary", "would-be"), n.match("(#Modal|had|has) ".concat(Da, " been ").concat(Da, " #Verb")).not("#Verb$").tag("Auxiliary", "would-be"));
      var r = t["if"]("#Copula");
      !0 === r.found && (r.match("#Copula ".concat(Da, " #Gerund")).not("#Verb$").tag("Auxiliary", "copula-walking"), r.match("#Copula [#Infinitive] #Noun").tag("Noun", "is-pres-noun"), r.match("[#Infinitive] #Copula").tag("Noun", "inf-copula"), r.match("#Copula [(just|alone)]$").tag("Adjective", "not-adverb"), r.match("#Singular is #Adverb? [#PastTense$]").tag("Adjective", "is-filled"), r.match("#Copula [#Adjective to] #Verb").tag("Verb", "adj-to"), r.match("#Copula (pretty|dead|full|well) (#Adjective|#Noun)").ifNo("@hasComma").tag("#Copula #Adverb #Adjective", "sometimes-adverb"));
      var a = t["if"]("#Gerund");
      !0 === a.found && (a.match("[#Gerund] #Adverb? not? #Copula").tag("Activity", "gerund-copula"), a.match("[#Gerund] #Modal").tag("Activity", "gerund-modal"), a.match("#Gerund #Determiner [#Infinitive]").tag("Noun", "running-a-show"));
      var i = t["if"]("will #Adverb? not? #Adverb? be");
      !0 === i.found && !1 === i.has("will #Adverb? not? #Adverb? be #Gerund") && (i.match("will not? be").tag("Copula", "will-be-copula"), i.match("will #Adverb? not? #Adverb? be #Adjective").match("be").tag("Copula", "be-copula"));
    }

    var o = e["if"]("(who|what|where|why|how|when)");
    return o.found && (o.match("^how").tag("QuestionWord", "how-question"), o.match("[how] (#Determiner|#Copula|#Modal|#PastTense)").tag("QuestionWord", "how-is"), o.match("^which").tag("QuestionWord", "which-question"), o.match("[which] . (#Noun)+ #Pronoun").tag("QuestionWord", "which-question2"), o.match("which").tag("QuestionWord", "which-question3"), o.match("[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)").unTag("QuestionWord").tag("Conjunction", "how-he-is-x"), o.match("#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund").unTag("QuestionWord").tag("Conjunction", "when i go fishing")), e;
  },
      Ta = function Ta(e) {
    var t = e["if"]("#Adjective");
    return t.found && (t.match("[still] #Adjective").tag("Adverb", "still-advb"), t.match("(barely|hardly) even").tag("#Adverb", "barely-even"), t.match("#Adjective [#PresentTense]").tag("Noun", "adj-presentTense"), t.match("will [#Adjective]").tag("Verb", "will-adj"), t.match("#PresentTense [(hard|quick|long|bright|slow)]").tag("Adverb", "lazy-ly"), t.match("(his|her|its) [#Adjective]").tag("Noun", "his-fine"), t.match("#Noun #Adverb? [left]").tag("PastTense", "left-verb"), t.match("#Pronoun [#Adjective] #Determiner #Adjective? #Noun").tag("Verb", "he-adj-the")), e;
  },
      Va = "(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)",
      za = function za(e) {
    var t = e["if"]("#Value");
    !0 === t.found && (t.match("1 #Value #PhoneNumber").tag("PhoneNumber", "1-800-Value"), t.match("#NumericValue #PhoneNumber").tag("PhoneNumber", "(800) PhoneNumber"), t.match("#Value [#PresentTense]").tag("Plural", "value-presentTense"), t.match("#Value+ #Currency").tag("Money", "value-currency").lastTerm().tag("Unit", "money-unit")), t.match("#Value #Abbreviation").tag("Value", "value-abbr"), t.match("#Value (point|decimal) #Value").tag("Value", "value-point-value"), t.match("(minus|negative) #Value").tag("Value", "minus-value"), t.match("#Value grand").tag("Value", "value-grand"), t.match("(a|the) [(half|quarter)] #Ordinal").tag("Value", "half-ordinal");
    var n = t["if"](Va);
    return !0 === n.found && (n.match("a #Value").tag("Value", "a-value"), n.match("".concat(Va, " and #Value")).tag("Value", "magnitude-and-value")), e;
  },
      Ha = "(in|by|before|during|on|until|after|of|within|all)",
      Ia = "(january|april|may|june|summer|autumn|jan|sep)",
      Ma = "(may|march)",
      Sa = function Sa(e) {
    var t = e["if"](Ia);
    !0 === t.found && (t.match("#Infinitive #Determiner? #Adjective? #Noun? (to|for) [".concat(Ia, "]")).tag("Person", "ambig-person"), t.match("#Infinitive [".concat(Ia, "]")).tag("Person", "infinitive-person"), t.match("[".concat(Ia, "] #PresentTense (to|for)")).tag("Person", "ambig-active"), t.match("[".concat(Ia, "] #Modal")).tag("Person", "ambig-modal"), t.match("#Modal [".concat(Ia, "]")).tag("Person", "modal-ambig"), t.match("(that|with|for) [".concat(Ia, "]")).tag("Person", "that-month"), t.match("#Copula [".concat(Ia, "]")).tag("Person", "is-may"), t.match("[".concat(Ia, "] #Copula")).tag("Person", "may-is"), t.match("[".concat(Ia, "] the? #Value")).tag("Month", "person-value"), t.match("#Date [".concat(Ia, "]")).tag("Month", "correction-may"), t.match("[".concat(Ia, "] the? #Value")).tag("Month", "may-5th"), t.match("#Value of [".concat(Ia, "]")).tag("Month", "5th-of-may"), t.match("".concat(Ha, " [").concat(Ia, "]")).ifNo("#Holiday").tag("Month", "preps-month"), t.match("(next|this|last) [".concat(Ia, "]")).tag("Month", "correction-may"));
    var n = e["if"](Ma);

    if (!0 === n.found) {
      n.match("#Adverb [".concat(Ma, "]")).tag("Infinitive", "ambig-verb"), n.match("".concat(Ma, " [#Adverb]")).tag("Infinitive", "ambig-verb"), n.match("".concat(Ha, " [").concat(Ma, "]")).tag("Month", "in-month"), n.match("(next|this|last) [".concat(Ma, "]")).tag("Month", "this-month"), n.match("[".concat(Ma, "] the? #Value")).tag("Month", "march-5th"), n.match("#Value of? [".concat(Ma, "]")).tag("Month", "5th-of-march"), n.match("[".concat(Ma, "] .? #Date")).tag("Month", "march-and-feb"), n.match("#Date .? [".concat(Ma, "]")).tag("Month", "feb-and-march");
      var r = e["if"]("march");
      !0 === r.found && (r.match("[march] (up|down|back|to|toward)").tag("Infinitive", "march-to"), r.match("#Modal [march]").tag("Infinitive", "must-march"));
    }

    var a = e["if"]("sun");
    !0 === a.found && (a.match("[sun] #Date").tag("WeekDay", "sun-feb"), a.match("sun the #Ordinal").tag("Date").firstTerm().tag("WeekDay", "sun-the-5th"), a.match("#Determiner [sun]").tag("Singular", "the-sun"));
    var i = e["if"]("sat");
    i.found && (i.match("[sat] #Date").tag("WeekDay", "sat-feb"), i.match("".concat(Ha, " [sat]")).tag("WeekDay", "sat"));
    var o = e["if"]("#Month");
    !0 === o.found && (o.match("#Month #DateRange+").tag("Date", "correction-numberRange"), o.match("#Value of #Month").tag("Date", "value-of-month"), o.match("#Cardinal #Month").tag("Date", "cardinal-month"), o.match("#Month #Value to #Value").tag("Date", "value-to-value"), o.match("#Month the #Value").tag("Date", "month-the-value"));
    var s = e["if"]("#Value");
    return !0 === s.found && (s.match("#Value #Abbreviation").tag("Value", "value-abbr"), s.match("#Value (point|decimal) #Value").tag("Value", "value-point-value"), s.match("(minus|negative) #Value").tag("Value", "minus-value"), s.match("#Value grand").tag("Value", "value-grand"), s.match("(a|the) [(half|quarter)] #Ordinal").tag("Value", "half-ordinal"), s.match("(#WeekDay|#Month) #Value").ifNo("#Money").tag("Date", "date-value"), s.match("#Value (#WeekDay|#Month)").ifNo("#Money").tag("Date", "value-date"), s.match("#TextValue #TextValue")["if"]("#Date").tag("#Date", "textvalue-date")), e;
  },
      La = function La(e) {
    return Ga(e), Ea(e), xa(e), Oa(e), Ta(e), za(e), Sa(e), Pa(e), e;
  },
      Ja = function Ja(e) {
    e.termList();
    return e = Mr(e), e = ia(e), (e = $a(e)).cache(), (e = La(e)).world.taggers.forEach(function (t) {
      t(e);
    }), e;
  },
      Wa = function Wa(e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), r(n, [{
        key: "stripPeriods",
        value: function value() {
          return this.termList().forEach(function (e) {
            !0 === e.tags.Abbreviation && e.next && (e.post = e.post.replace(/^\./, ""));
            var t = e.text.replace(/\./, "");
            e.set(t);
          }), this;
        }
      }, {
        key: "addPeriods",
        value: function value() {
          return this.termList().forEach(function (e) {
            e.post = e.post.replace(/^\./, ""), e.post = "." + e.post;
          }), this;
        }
      }]), n;
    }(e);

    return n.prototype.unwrap = n.prototype.stripPeriods, e.prototype.abbreviations = function (e) {
      var t = this.match("#Abbreviation");
      return "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e;
  },
      _a = function _a(e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), r(n, [{
        key: "stripPeriods",
        value: function value() {
          return this.termList().forEach(function (e) {
            var t = e.text.replace(/\./g, "");
            e.set(t);
          }), this;
        }
      }, {
        key: "addPeriods",
        value: function value() {
          return this.termList().forEach(function (e) {
            var t = e.text.replace(/\./g, "");
            t = t.split("").join("."), e.set(t);
          }), this;
        }
      }]), n;
    }(e);

    return n.prototype.unwrap = n.prototype.stripPeriods, n.prototype.strip = n.prototype.stripPeriods, e.prototype.acronyms = function (e) {
      var t = this.match("#Acronym");
      return "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e;
  },
      qa = function qa(e) {
    return e.prototype.clauses = function (t) {
      var n = this["if"]("@hasComma").notIf("@hasComma @hasComma").notIf("@hasComma . .? (and|or) .").notIf("(#City && @hasComma) #Country").notIf("(#Date && @hasComma) #Year").notIf("@hasComma (too|also)$").match("@hasComma"),
          r = this.splitAfter(n),
          a = r.quotations(),
          i = (r = r.splitOn(a)).parentheses(),
          o = (r = r.splitOn(i))["if"]("#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb").match("#Conjunction"),
          s = (r = r.splitBefore(o))["if"]("if .{2,9} then .").match("then"),
          u = (r = (r = (r = (r = (r = (r = r.splitBefore(s)).splitBefore("as well as .")).splitBefore("such as .")).splitBefore("in addition to .")).splitAfter("@hasSemicolon")).splitAfter("@hasDash")).filter(function (e) {
        return e.wordCount() > 5 && e.match("#Verb+").length >= 2;
      });

      if (u.found) {
        var l = u.splitAfter("#Noun .* #Verb .* #Noun+");
        r = r.splitOn(l.eq(0));
      }

      return "number" == typeof t && (r = r.get(t)), new e(r.list, this, this.world);
    }, e;
  },
      Ra = function Ra(e) {
    var n = function (e) {
      function n(e, r, a) {
        var o;
        return t(this, n), (o = s(this, i(n).call(this, e, r, a))).contracted = null, o;
      }

      return a(n, e), r(n, [{
        key: "expand",
        value: function value() {
          return this.list.forEach(function (e) {
            var t = e.terms(),
                n = t[0].isTitleCase();
            t.forEach(function (e, n) {
              e.set(e.implicit || e.text), e.implicit = void 0, n < t.length - 1 && "" === e.post && (e.post += " ");
            }), n && t[0].toTitleCase();
          }), this;
        }
      }]), n;
    }(e);

    return e.prototype.contractions = function (e) {
      var t = this.match("@hasContraction+");
      return "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e.prototype.expanded = e.prototype.isExpanded, e.prototype.contracted = e.prototype.isContracted, e;
  },
      Ka = function Ka(e) {
    var n = function n(e) {
      var t = e.splitAfter("@hasComma").not("(and|or) not?"),
          n = e.match("[.] (and|or)");
      return {
        things: t,
        conjunction: e.match("(and|or) not?"),
        beforeLast: n,
        hasOxford: n.has("@hasComma")
      };
    },
        o = function (e) {
      function o() {
        return t(this, o), s(this, i(o).apply(this, arguments));
      }

      return a(o, e), r(o, [{
        key: "conjunctions",
        value: function value() {
          return this.match("(and|or)");
        }
      }, {
        key: "parts",
        value: function value() {
          return this.splitAfter("(@hasComma|#Conjunction)");
        }
      }, {
        key: "items",
        value: function value() {
          return this.parts().notIf("#Conjunction");
        }
      }, {
        key: "add",
        value: function value(e) {
          return this.forEach(function (t) {
            var r = n(t).beforeLast;
            r.append(e), r.termList(0).addPunctuation(",");
          }), this;
        }
      }, {
        key: "remove",
        value: function value() {
          return this;
        }
      }, {
        key: "hasOxfordComma",
        value: function value() {
          return this.filter(function (e) {
            return n(e).hasOxford;
          });
        }
      }, {
        key: "addOxfordComma",
        value: function value() {
          return this;
        }
      }, {
        key: "removeOxfordComma",
        value: function value() {
          return this;
        }
      }]), o;
    }(e);

    return o.prototype.things = o.prototype.items, e.prototype.lists = function (e) {
      var t = this["if"]("@hasComma+ .? (and|or) not? ."),
          n = t.match("(#Noun|#Adjective)+ #Conjunction not? #Adjective? #Noun+"),
          r = t.match("(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+"),
          a = t.match("(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+"),
          i = n.concat(r);
      return i = (i = i.concat(a))["if"]("@hasComma"), "number" == typeof e && (i = t.get(e)), new o(i.list, this, this.world);
    }, e;
  },
      Qa = function Qa(e) {
    return !0 === e.has("#Plural") || !0 !== e.has("(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)");
  },
      Ua = {
    hour: "an",
    heir: "an",
    heirloom: "an",
    honest: "an",
    honour: "an",
    honor: "an",
    uber: "an"
  },
      Xa = {
    a: !0,
    e: !0,
    f: !0,
    h: !0,
    i: !0,
    l: !0,
    m: !0,
    n: !0,
    o: !0,
    r: !0,
    s: !0,
    x: !0
  },
      Za = [/^onc?e/i, /^u[bcfhjkqrstn][aeiou]/i, /^eul/i],
      Ya = function Ya(e) {
    if (e.has("#Person") || e.has("#Place")) return "";
    if (e.has("#Plural")) return "the";
    var t = e.text("normal").trim();
    if (Ua.hasOwnProperty(t)) return Ua[t];
    var n = t.substr(0, 1);
    if (e.has("^@isAcronym") && Xa.hasOwnProperty(n)) return "an";

    for (var r = 0; r < Za.length; r++) {
      if (Za[r].test(t)) return "a";
    }

    return /^[aeiou]/i.test(t) ? "an" : "a";
  },
      ei = {
    isSingular: [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i],
    isPlural: [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]
  },
      ti = /s$/,
      ni = function ni(e) {
    return !ei.isSingular.find(function (t) {
      return t.test(e);
    }) && (!0 === ti.test(e) || !!ei.isPlural.find(function (t) {
      return t.test(e);
    }) || null);
  },
      ri = {
    he: "his",
    she: "hers",
    they: "theirs",
    we: "ours",
    i: "mine",
    you: "yours",
    her: "hers",
    their: "theirs",
    our: "ours",
    my: "mine",
    your: "yours"
  },
      ai = function ai(e) {
    var t = e.text("text").trim();
    return ri.hasOwnProperty(t) ? (e.replaceWith(ri[t], !0, !0), void e.tag("Possessive", "toPossessive")) : /s$/.test(t) ? (t += "'", e.replaceWith(t, !0, !0), void e.tag("Possessive", "toPossessive")) : (t += "'s", e.replaceWith(t, !0, !0), void e.tag("Possessive", "toPossessive"));
  },
      ii = function ii(e) {
    var t = {
      main: e
    };

    if (e.has("#Noun (of|by|for) .")) {
      var n = e.splitAfter("[#Noun+]");
      t.main = n.eq(0), t.post = n.eq(1);
    }

    return t;
  },
      oi = {
    json: function json(e) {
      var t = null;
      "number" == typeof e && (t = e, e = null), e = e || {
        text: !0,
        normal: !0,
        trim: !0,
        terms: !0
      };
      var n = [];
      return this.forEach(function (t) {
        var r = t.json(e)[0];
        r.article = Ya(t), n.push(r);
      }), null !== t ? n[t] : n;
    },
    isPlural: function isPlural() {
      return this["if"]("#Plural");
    },
    hasPlural: function hasPlural() {
      return this.filter(function (e) {
        return Qa(e);
      });
    },
    toPlural: function toPlural() {
      var e = this,
          t = this.world.transforms.toPlural;
      return this.forEach(function (n) {
        if (!n.has("#Plural") && !1 !== Qa(n)) {
          var r = ii(n).main,
              a = r.text();
          (r.has("#Singular") || !0 !== ni(a)) && (a = t(a, e.world), r.replace(a).tag("#Plural"));
        }
      }), this;
    },
    toSingular: function toSingular() {
      var e = this,
          t = this.world.transforms.toSingular;
      return this.forEach(function (n) {
        if (!n.has("#Singular") && !1 !== Qa(n)) {
          var r = ii(n).main,
              a = r.text();
          (r.has("#Plural") || !0 === ni(a)) && (a = t(a, e.world), r.replace(a).tag("#Singular"));
        }
      }), this;
    },
    toPossessive: function toPossessive() {
      return this.forEach(function (e) {
        ai(e);
      }), this;
    }
  },
      si = function si(e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), n;
    }(e);

    return Object.assign(n.prototype, oi), e.prototype.nouns = function (e) {
      var t = this.clauses();
      return t = (t = (t = (t = (t = (t = t.match("#Noun+ (of|by)? the? #Noun+?")).not("#Pronoun")).not("(there|these)")).not("(#Month|#WeekDay)")).not("(my|our|your|their|her|his)")).not("(of|for|by|the)$"), "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e;
  },
      ui = /\(/,
      li = /\)/,
      ci = function ci(e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), r(n, [{
        key: "unwrap",
        value: function value() {
          return this.list.forEach(function (e) {
            var t = e.terms(0);
            t.pre = t.pre.replace(ui, "");
            var n = e.lastTerm();
            n.post = n.post.replace(li, "");
          }), this;
        }
      }]), n;
    }(e);

    return e.prototype.parentheses = function (e) {
      var t = [];
      return this.list.forEach(function (e) {
        for (var n = e.terms(), r = 0; r < n.length; r += 1) {
          var a = n[r];
          if (ui.test(a.pre)) for (var i = r; i < n.length; i += 1) {
            if (li.test(n[i].post)) {
              var o = i - r + 1;
              t.push(e.buildFrom(a.id, o)), r = i;
              break;
            }
          }
        }
      }), "number" == typeof e ? (t = t[e] ? [t[e]] : [], new n(t, this, this.world)) : new n(t, this, this.world);
    }, e;
  },
      hi = function hi(e) {
    var n = function (e) {
      function n(e, r, a) {
        var o;
        return t(this, n), (o = s(this, i(n).call(this, e, r, a))).contracted = null, o;
      }

      return a(n, e), r(n, [{
        key: "strip",
        value: function value() {
          return this.list.forEach(function (e) {
            e.terms().forEach(function (e) {
              var t = e.text.replace(/'s$/, "");
              e.set(t || e.text);
            });
          }), this;
        }
      }]), n;
    }(e);

    return e.prototype.possessives = function (e) {
      var t = this.match("#Noun+? #Possessive");
      return "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e;
  },
      di = {
    '"': '"',
    "＂": "＂",
    "'": "'",
    "“": "”",
    "‘": "’",
    "‟": "”",
    "‛": "’",
    "„": "”",
    "⹂": "”",
    "‚": "’",
    "«": "»",
    "‹": "›",
    "‵": "′",
    "‶": "″",
    "‷": "‴",
    "〝": "〞",
    "`": "´",
    "〟": "〞"
  },
      fi = RegExp("(" + Object.keys(di).join("|") + ")"),
      mi = function mi(e, t) {
    var n = e.verb,
        r = n.text("normal");
    if (n.has("#Infinitive")) return r;
    var a = null;
    return n.has("#PastTense") ? a = "PastTense" : n.has("#Gerund") ? a = "Gerund" : n.has("#PresentTense") ? a = "PresentTense" : n.has("#Participle") ? a = "Participle" : n.has("#Actor") && (a = "Actor"), t.transforms.toInfinitive(r, t, a);
  },
      pi = function pi(e) {
    var t = e.verb;
    if (t.has("(are|were|does)") || e.auxiliary.has("(are|were|does)")) return !0;
    if (t.has("(is|am|do|was)") || e.auxiliary.has("(is|am|do|was)")) return !1;

    var n = function (e) {
      return e.lookBehind("#Noun+").last();
    }(t);

    return !!n.has("(we|they|you)") || !!n.has("#Plural") || !n.has("#Singular") && null;
  },
      gi = function gi(e, t) {
    var n = e.verb;
    if (!e.negative.found) if (e.auxiliary.found) e.auxiliary.eq(0).append("not");else if (n.has("(#Copula|will|has|had|do)")) n.append("not");else {
      if (n.has("#PastTense")) {
        var r = mi(e, t);
        return n.replaceWith(r, !0, !0), void n.prepend("did not");
      }

      if (n.has("#PresentTense")) {
        var a = mi(e, t);
        return n.replaceWith(a, !0, !0), void (pi(e) ? n.prepend("do not") : n.prepend("does not"));
      }

      if (n.has("#Gerund")) {
        var i = mi(e, t);
        return n.replaceWith(i, !0, !0), void n.prepend("not");
      }

      pi(e) ? n.prepend("does not") : n.prepend("do not");
    }
  },
      vi = function vi(e) {
    var t = {
      adverb: e.match("#Adverb+"),
      negative: e.match("#Negative"),
      auxiliary: e.match("#Auxiliary").not("(#Negative|#Adverb)"),
      particle: e.match("#Particle"),
      verb: e.match("#Verb").not("(#Adverb|#Negative|#Auxiliary|#Particle)")
    };
    if (!t.verb.found) return Object.keys(t).forEach(function (e) {
      t[e] = t[e].not(".");
    }), t.verb = e, t;

    if (t.adverb && t.adverb.found) {
      var n = t.adverb.text("reduced") + "$";
      e.has(n) && (t.adverbAfter = !0);
    }

    return t;
  },
      bi = function bi(e) {
    var t = !1,
        n = pi(e),
        r = e.negative.found;
    e.verb.lookBehind("(i|we) (#Adverb|#Verb)?$").found && (t = !0);
    var a = {
      PastTense: "was",
      PresentTense: "is",
      FutureTense: "will be",
      Infinitive: "is",
      Gerund: "being",
      Actor: "",
      PerfectTense: "been",
      Pluperfect: "been"
    };
    return !0 === t && (a.PresentTense = "am", a.Infinitive = "am"), n && (a.PastTense = "were", a.PresentTense = "are", a.Infinitive = "are"), r && (a.PastTense += " not", a.PresentTense += " not", a.FutureTense = "will not be", a.Infinitive += " not", a.PerfectTense = "not " + a.PerfectTense, a.Pluperfect = "not " + a.Pluperfect, a.Gerund = "not " + a.Gerund), a;
  },
      yi = function yi(e, t) {
    var n = e.verb;
    if (n.has("#Copula") || "be" === n.out("normal") && e.auxiliary.has("will")) return bi(e);
    var r = mi(e, t);
    if (!r) return {};
    var a = t.transforms.conjugate(r, t);

    if (a.Infinitive = r, e.particle.found) {
      var i = e.particle.text();
      Object.keys(a).forEach(function (e) {
        return a[e] += " " + i;
      });
    }

    if (e.adverb.found) {
      var o = e.adverb.text();
      !0 === e.adverbAfter ? Object.keys(a).forEach(function (e) {
        return a[e] += " " + o;
      }) : Object.keys(a).forEach(function (e) {
        return a[e] = o + " " + a[e];
      });
    }

    var s = e.negative.found;
    return s && (a.PastTense = "did not " + a.Infinitive, a.PresentTense = "does not " + a.Infinitive, a.Gerund = "not " + a.Gerund), a.FutureTense || (a.FutureTense = s ? "will not " + a.Infinitive : "will " + a.Infinitive), s && (a.Infinitive = "not " + a.Infinitive), a;
  },
      Ai = {
    json: function json(e) {
      var t = this,
          n = null;
      "number" == typeof e && (n = e, e = null), e = e || {
        text: !0,
        normal: !0,
        trim: !0,
        terms: !0
      };
      var r = [];
      return this.forEach(function (n) {
        var a = n.json(e)[0],
            i = vi(n);
        a.parts = {}, Object.keys(i).forEach(function (e) {
          a.parts[e] = i[e].text("normal");
        }), a.isNegative = n.has("#Negative"), a.conjugations = yi(i, t.world), r.push(a);
      }), null !== n ? r[n] : r;
    },
    adverbs: function adverbs() {
      var e = [];
      this.forEach(function (t) {
        var n = vi(t).adverb;
        n.found && (e = e.concat(n.list));
      });
      var t = this.lookBehind("#Adverb$");
      return t.found && (e = t.list.concat(e)), (t = this.lookAhead("^#Adverb")).found && (e = e.concat(t.list)), this.buildFrom(e);
    },
    isPlural: function isPlural() {
      var e = this,
          t = [];
      return this.forEach(function (n) {
        var r = vi(n);
        !0 === pi(r, e.world) && t.push(n.list[0]);
      }), this.buildFrom(t);
    },
    isSingular: function isSingular() {
      var e = this,
          t = [];
      return this.forEach(function (n) {
        var r = vi(n);
        !1 === pi(r, e.world) && t.push(n.list[0]);
      }), this.buildFrom(t);
    },
    conjugate: function conjugate() {
      var e = this,
          t = [];
      return this.forEach(function (n) {
        var r = vi(n),
            a = yi(r, e.world);
        t.push(a);
      }), t;
    },
    toPastTense: function toPastTense() {
      var e = this;
      return this.forEach(function (t) {
        var n = vi(t),
            r = yi(n, e.world).PastTense;
        r && t.replaceWith(r, !1, !0);
      }), this;
    },
    toPresentTense: function toPresentTense() {
      var e = this;
      return this.forEach(function (t) {
        var n = vi(t),
            r = yi(n, e.world),
            a = r.PresentTense;
        t.lookBehind("(i|we) (#Adverb|#Verb)?$").found && (a = r.Infinitive), a && (t.replaceWith(a, !1, !0), t.tag("PresentTense"));
      }), this;
    },
    toFutureTense: function toFutureTense() {
      var e = this;
      return this.forEach(function (t) {
        var n = vi(t),
            r = yi(n, e.world).FutureTense;
        r && (t.replaceWith(r, !1, !0), t.tag("FutureTense"));
      }), this;
    },
    toInfinitive: function toInfinitive() {
      var e = this;
      return this.forEach(function (t) {
        var n = vi(t),
            r = mi(n, e.world);
        r && (t.replaceWith(r, !1, !0), t.tag("Infinitive"));
      }), this;
    },
    toGerund: function toGerund() {
      var e = this;
      return this.forEach(function (t) {
        var n = vi(t),
            r = yi(n, e.world).Gerund;
        r && (t.replaceWith(r, !1, !0), t.tag("Gerund"));
      }), this;
    },
    isNegative: function isNegative() {
      return this["if"]("#Negative");
    },
    isPositive: function isPositive() {
      return this.ifNo("#Negative");
    },
    toNegative: function toNegative() {
      var e = this;
      return this.list.forEach(function (t) {
        var n = e.buildFrom([t]),
            r = vi(n);
        gi(r, n.world);
      }), this;
    },
    toPositive: function toPositive() {
      var e = this.match("do not #Verb");
      return e.found && e.remove("do not"), this.remove("#Negative");
    }
  },
      wi = [Wa, _a, qa, Ra, Ka, si, ci, hi, function (e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), r(n, [{
        key: "unwrap",
        value: function value() {
          return this;
        }
      }]), n;
    }(e);

    return e.prototype.quotations = function (e) {
      var t = [];
      return this.list.forEach(function (e) {
        for (var n = e.terms(), r = 0; r < n.length; r += 1) {
          var a = n[r];
          if (fi.test(a.pre)) for (var i = (a.pre.match(fi) || [])[0], o = di[i], s = r; s < n.length; s += 1) {
            if (-1 !== n[s].post.indexOf(o)) {
              var u = s - r + 1;
              t.push(e.buildFrom(a.id, u)), r = s;
              break;
            }
          }
        }
      }), "number" == typeof e ? (t = t[e] ? [t[e]] : [], new n(t, this, this.world)) : new n(t, this, this.world);
    }, e.prototype.quotes = e.prototype.quotations, e;
  }, function (e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), n;
    }(e);

    return Object.assign(n.prototype, Ai), n.prototype.negate = n.prototype.toNegative, e.prototype.verbs = function (e) {
      var t = this.match("(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+"),
          r = (t = (t = t.not("^#Adverb+")).not("#Adverb+$")).match("(#Adverb && @hasComma) #Adverb"),
          a = t.not(r).splitAfter("@hasComma");
      return (a = a.concat(r)).sort("index"), a = a["if"]("#Verb"), "number" == typeof e && (a = a.get(e)), new n(a.list, this, this.world);
    }, e;
  }, function (e) {
    var n = function (e) {
      function n() {
        return t(this, n), s(this, i(n).apply(this, arguments));
      }

      return a(n, e), n;
    }(e);

    return e.prototype.people = function (e) {
      var t = this.splitAfter("@hasComma");
      return t = t.match("#Person+"), "number" == typeof e && (t = t.get(e)), new n(t.list, this, this.world);
    }, e;
  }],
      ki = function ki(e) {
    return Object.keys(cr).forEach(function (t) {
      return e.prototype[t] = cr[t];
    }), wi.forEach(function (t) {
      return t(e);
    }), e;
  },
      $i = {
    misc: ur,
    selections: cr
  },
      Pi = function () {
    function e(n, r, a) {
      var i = this;
      t(this, e), this.list = n, Object.defineProperty(this, "from", {
        enumerable: !1,
        value: r,
        writable: !0
      }), void 0 === a && void 0 !== r && (a = r.world), Object.defineProperty(this, "world", {
        enumerable: !1,
        value: a
      }), Object.defineProperty(this, "found", {
        get: function get() {
          return i.list.length > 0;
        }
      }), Object.defineProperty(this, "length", {
        get: function get() {
          return i.list.length;
        }
      }), Object.defineProperty(this, "isA", {
        get: function get() {
          return "Doc";
        }
      });
    }

    return r(e, [{
      key: "tagger",
      value: function value() {
        return Ja(this);
      }
    }, {
      key: "pool",
      value: function value() {
        return this.list.length > 0 ? this.list[0].pool : this.all().list[0].pool;
      }
    }]), e;
  }();

  Pi.prototype.buildFrom = function (e) {
    return e = e.map(function (e) {
      return e.clone(!0);
    }), new Pi(e, this, this.world);
  }, Pi.prototype.fromText = function (e) {
    var t = tt(e, this.world, this.pool());
    return this.buildFrom(t);
  }, Object.assign(Pi.prototype, $i.misc), Object.assign(Pi.prototype, $i.selections), ki(Pi);
  var Gi = {
    untag: "unTag",
    and: "match",
    notIf: "ifNo",
    only: "if",
    onlyIf: "if"
  };
  Object.keys(Gi).forEach(function (e) {
    return Pi.prototype[e] = Pi.prototype[Gi[e]];
  });

  var Ei = Pi,
      Ci = new fn(),
      Fi = function Fi() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0;
    t && Ci.addWords(t);
    var n = tt(e, Ci),
        r = new Ei(n, null, Ci);
    return r.tagger(), r;
  };

  return Fi.tokenize = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 ? arguments[1] : void 0;
    t && Ci.addWords(t);
    var n = tt(e, Ci),
        r = new Ei(n, null, Ci);
    return r;
  }, Fi.extend = function (e) {
    return e(Ei, Ci), this;
  }, Fi.clone = function () {
    return Ci = Ci.clone(), this;
  }, Fi.load = function (e) {
    var t = nt(e, Ci);
    return new Ei(t, null, Ci);
  }, Fi.verbose = function () {
    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    return Ci.verbose(e), this;
  }, Fi.version = "12.0.0-rc3", Fi["import"] = Fi.load, Fi;
});

},{}],2:[function(_dereq_,module,exports){
"use strict";const BASE=36,seq="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",cache=seq.split("").reduce(function(n,o,e){return n[o]=e,n},{}),toAlphaCode=function(n){if(void 0!==seq[n])return seq[n];let o=1,e=36,t="";for(;n>=e;n-=e,o++,e*=36);for(;o--;){const o=n%36;t=String.fromCharCode((o<10?48:55)+o)+t,n=(n-o)/36}return t},fromAlphaCode=function(n){if(void 0!==cache[n])return cache[n];let o=0,e=1,t=36,r=1;for(;e<n.length;o+=t,e++,t*=36);for(let e=n.length-1;e>=0;e--,r*=36){let t=n.charCodeAt(e)-48;t>10&&(t-=7),o+=t*r}return o};var encoding={toAlphaCode:toAlphaCode,fromAlphaCode:fromAlphaCode},symbols=function(n){const o=new RegExp("([0-9A-Z]+):([0-9A-Z]+)");for(let e=0;e<n.nodes.length;e++){const t=o.exec(n.nodes[e]);if(!t){n.symCount=e;break}n.syms[encoding.fromAlphaCode(t[1])]=encoding.fromAlphaCode(t[2])}n.nodes=n.nodes.slice(n.symCount,n.nodes.length)};const indexFromRef=function(n,o,e){const t=encoding.fromAlphaCode(o);return t<n.symCount?n.syms[t]:e+t+1-n.symCount},toArray=function(n){const o=[],e=(t,r)=>{let s=n.nodes[t];"!"===s[0]&&(o.push(r),s=s.slice(1));const c=s.split(/([A-Z0-9,]+)/g);for(let s=0;s<c.length;s+=2){const u=c[s],i=c[s+1];if(!u)continue;const l=r+u;if(","===i||void 0===i){o.push(l);continue}const f=indexFromRef(n,i,t);e(f,l)}};return e(0,""),o},unpack=function(n){const o={nodes:n.split(";"),syms:[],symCount:0};return n.match(":")&&symbols(o),toArray(o)};var unpack_1=unpack,unpack_1$1=function(n){const o=n.split("|").reduce((n,o)=>{const e=o.split("¦");return n[e[0]]=e[1],n},{}),e={};return Object.keys(o).forEach(function(n){const t=unpack_1(o[n]);"true"===n&&(n=!0);for(let o=0;o<t.length;o++){const r=t[o];!0===e.hasOwnProperty(r)?!1===Array.isArray(e[r])?e[r]=[e[r],n]:e[r].push(n):e[r]=n}}),e};module.exports=unpack_1$1;

},{}],3:[function(_dereq_,module,exports){
"use strict";

//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2017 MIT
//proper nouns with exclamation marks
// const blacklist = {
//   yahoo: true,
//   joomla: true,
//   jeopardy: true,
// }
//regs-
var initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s+|$)/g;
var hasSomething = /\S/;
var isAcronym = /[ .][A-Z]\.? *$/i;
var hasEllipse = /(?:\u2026|\.{2,}) *$/;
var newLine = /((?:\r?\n|\r)+)/; // Match different new-line formats

var hasLetter = /[a-z0-9\u00C0-\u00FF\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/i;
var startWhitespace = /^\s+/; // Start with a regex:

var naiive_split = function naiive_split(text) {
  var all = []; //first, split by newline

  var lines = text.split(newLine);

  for (var i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    var arr = lines[i].split(initSplit);

    for (var o = 0; o < arr.length; o++) {
      all.push(arr[o]);
    }
  }

  return all;
};
/** does this look like a sentence? */


var isSentence = function isSentence(str, abbrevs) {
  // check for 'F.B.I.'
  if (isAcronym.test(str) === true) {
    return false;
  } //check for '...'


  if (hasEllipse.test(str) === true) {
    return false;
  } // must have a letter


  if (hasLetter.test(str) === false) {
    return false;
  }

  var txt = str.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, '');
  var words = txt.split(' ');
  var lastWord = words[words.length - 1].toLowerCase(); // check for 'Mr.'

  if (abbrevs.hasOwnProperty(lastWord)) {
    return false;
  } // //check for jeopardy!
  // if (blacklist.hasOwnProperty(lastWord)) {
  //   return false
  // }


  return true;
};

var splitSentences = function splitSentences(text, world) {
  var abbrevs = world.cache.abbreviations;
  text = text || '';
  text = String(text);
  var sentences = []; // First do a greedy-split..

  var chunks = []; // Ensure it 'smells like' a sentence

  if (!text || typeof text !== 'string' || hasSomething.test(text) === false) {
    return sentences;
  } // Start somewhere:


  var splits = naiive_split(text); // Filter-out the crap ones

  for (var i = 0; i < splits.length; i++) {
    var s = splits[i];

    if (s === undefined || s === '') {
      continue;
    } //this is meaningful whitespace


    if (hasSomething.test(s) === false) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) {
        //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    } //else, only whitespace, no terms, no sentence


    chunks.push(s);
  } //detection of non-sentence chunks:
  //loop through these chunks, and join the non-sentence chunks back together..


  for (var _i = 0; _i < chunks.length; _i++) {
    var c = chunks[_i]; //should this chunk be combined with the next one?

    if (chunks[_i + 1] && isSentence(c, abbrevs) === false) {
      chunks[_i + 1] = c + (chunks[_i + 1] || '');
    } else if (c && c.length > 0) {
      //&& hasLetter.test(c)
      //this chunk is a proper sentence..
      sentences.push(c);
      chunks[_i] = '';
    }
  } //if we never got a sentence, return the given text


  if (sentences.length === 0) {
    return [text];
  } //move whitespace to the ends of sentences, when possible
  //['hello',' world'] -> ['hello ','world']


  for (var _i2 = 1; _i2 < sentences.length; _i2 += 1) {
    var ws = sentences[_i2].match(startWhitespace);

    if (ws !== null) {
      sentences[_i2 - 1] += ws[0];
      sentences[_i2] = sentences[_i2].replace(startWhitespace, '');
    }
  }

  return sentences;
};

module.exports = splitSentences; // console.log(sentence_parser('john f. kennedy'));

},{}],4:[function(_dereq_,module,exports){
"use strict";

var wordlike = /\S/;
var isBoundary = /^[!?.]+$/;
var naiiveSplit = /(\S+)/;
var isSlash = /\/\W*$/;
var notWord = {
  '.': true,
  '-': true,
  //dash
  '–': true,
  //en-dash
  '—': true,
  //em-dash
  '--': true,
  '...': true // '/': true, // 'one / two'

};

var hasHyphen = function hasHyphen(str) {
  //dont split 're-do'
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    return false;
  } //letter-number


  var reg = /^([a-z\u00C0-\u00FF`"'/]+)(-|–|—)([a-z0-9\u00C0-\u00FF].*)/i;

  if (reg.test(str) === true) {
    return true;
  } //support weird number-emdash combo '2010–2011'
  // let reg2 = /^([0-9]+)(–|—)([0-9].*)/i
  // if (reg2.test(str)) {
  //   return true
  // }


  return false;
}; // 'he / she' should be one word


var combineSlashes = function combineSlashes(arr) {
  for (var i = 1; i < arr.length - 1; i++) {
    if (isSlash.test(arr[i])) {
      arr[i - 1] += arr[i] + arr[i + 1];
      arr[i] = null;
      arr[i + 1] = null;
    }
  }

  return arr;
};

var splitHyphens = function splitHyphens(word) {
  var arr = []; //support multiple-hyphenated-terms

  var hyphens = word.split(/[-–—]/);

  for (var o = 0; o < hyphens.length; o++) {
    if (o === hyphens.length - 1) {
      arr.push(hyphens[o]);
    } else {
      arr.push(hyphens[o] + '-');
    }
  }

  return arr;
}; //turn a string into an array of terms (naiive for now, lumped later)


var splitWords = function splitWords(str) {
  var result = [];
  var arr = []; //start with a naiive split

  str = str || '';

  if (typeof str === 'number') {
    str = String(str);
  }

  var words = str.split(naiiveSplit);

  for (var i = 0; i < words.length; i++) {
    //split 'one-two'
    if (hasHyphen(words[i]) === true) {
      arr = arr.concat(splitHyphens(words[i]));
      continue;
    }

    arr.push(words[i]);
  } //greedy merge whitespace+arr to the right


  var carry = '';

  for (var _i = 0; _i < arr.length; _i++) {
    var word = arr[_i]; //if it's more than a whitespace

    if (wordlike.test(word) === true && notWord.hasOwnProperty(word) === false && isBoundary.test(word) === false) {
      //put whitespace on end of previous term, if possible
      if (result.length > 0) {
        result[result.length - 1] += carry;
        result.push(word);
      } else {
        //otherwise, but whitespace before
        result.push(carry + word);
      }

      carry = '';
    } else {
      carry += word;
    }
  } //handle last one


  if (carry && result.length > 0) {
    result[result.length - 1] += carry; //put it on the end
  } // combine 'one / two'


  result = combineSlashes(result); // remove empty results

  result = result.filter(function (s) {
    return s;
  });
  return result;
};

module.exports = splitWords;

},{}],5:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** a key-value store of all terms in our Document */
var Pool =
/*#__PURE__*/
function () {
  function Pool() {
    var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pool);

    //quiet this property in console.logs
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: words
    });
  }
  /** throw a new term object in */


  _createClass(Pool, [{
    key: "add",
    value: function add(term) {
      this.words[term.id] = term;
      return this;
    }
    /** find a term by it's id */

  }, {
    key: "get",
    value: function get(id) {
      return this.words[id];
    }
    /** find a term by it's id */

  }, {
    key: "remove",
    value: function remove(id) {
      delete this.words[id];
    }
  }, {
    key: "merge",
    value: function merge(pool) {
      Object.assign(this.words, pool.words);
      return this;
    }
    /** helper method */

  }, {
    key: "stats",
    value: function stats() {
      return {
        words: Object.keys(this.words).length
      };
    }
  }]);

  return Pool;
}();
/** make a deep-copy of all terms */


Pool.prototype.clone = function () {
  var _this = this;

  var keys = Object.keys(this.words);
  var words = keys.reduce(function (h, k) {
    var t = _this.words[k].clone();

    h[t.id] = t;
    return h;
  }, {});
  return new Pool(words);
};

module.exports = Pool;

},{}],6:[function(_dereq_,module,exports){
"use strict";

var Term = _dereq_('../Term/Term');

var Phrase = _dereq_('../Phrase/Phrase');

var Pool = _dereq_('./Pool');

var splitSentences = _dereq_('./01-sentences');

var splitTerms = _dereq_('./02-words'); //add forward/backward 'linked-list' prev/next ids


var addLinks = function addLinks(terms) {
  terms.forEach(function (term, i) {
    if (i > 0) {
      term.prev = terms[i - 1].id;
    }

    if (terms[i + 1]) {
      term.next = terms[i + 1].id;
    }
  });
};
/** turn a string into an array of Phrase objects */


var fromText = function fromText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var pool = arguments.length > 2 ? arguments[2] : undefined;

  //a bit of validation, first
  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text);
    }
  } //tokenize into words


  var sentences = splitSentences(text, world);
  sentences = sentences.map(function (str) {
    return splitTerms(str);
  }); //turn them into proper objects

  pool = pool || new Pool();
  var phrases = sentences.map(function (terms) {
    terms = terms.map(function (str) {
      var term = new Term(str);
      pool.add(term);
      return term;
    }); //add next/previous ids

    addLinks(terms); //return phrase objects

    return new Phrase(terms[0].id, terms.length, pool);
  }); //return them ready for a Document object

  return phrases;
}; // parse the compressed format '3,2|2,4'


var parseTags = function parseTags(text, tagList) {
  return text.split('|').map(function (str) {
    var numList = str.split(',');
    numList = numList.map(function (n) {
      return parseInt(n, 10);
    }); // convert a list pf numbers into an array of tag names

    return numList.map(function (num) {
      if (!tagList[num]) {
        console.warn('Compromise import: missing tag at index ' + num);
      }

      return tagList[num];
    });
  });
};
/** create a word-pool and Phrase objects from .export() json*/


var fromJSON = function fromJSON(json, world) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  var pool = new Pool(); //create Phrase objects

  var phrases = json.list.map(function (o) {
    // tokenize words from sentence text
    var terms = splitTerms(o[0]); // unpack the tag data for each term

    var tagArr = parseTags(o[1], json.tags); //create Term objects

    terms = terms.map(function (str, i) {
      var term = new Term(str);
      tagArr[i].forEach(function (tag) {
        return term.tag(tag, '', world);
      });
      pool.add(term);
      return term;
    }); //add prev/next links

    addLinks(terms); // return a proper Phrase object

    return new Phrase(terms[0].id, terms.length, pool);
  });
  return phrases;
};

module.exports = {
  fromText: fromText,
  fromJSON: fromJSON
};

},{"../Phrase/Phrase":70,"../Term/Term":113,"./01-sentences":3,"./02-words":4,"./Pool":5}],7:[function(_dereq_,module,exports){
"use strict";

/** match a word-sequence, like 'super bowl' in the lexicon */
var tryMultiple = function tryMultiple(terms, t, world) {
  var lex = world.words; //try a two-word version

  var txt = terms[t].reduced + ' ' + terms[t + 1].reduced;

  if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
    terms[t].tag(lex[txt], 'lexicon-two', world);
    terms[t + 1].tag(lex[txt], 'lexicon-two', world);
    return 1;
  } //try a three-word version?


  if (t + 2 < terms.length) {
    txt += ' ' + terms[t + 2].reduced;

    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-three', world);
      terms[t + 1].tag(lex[txt], 'lexicon-three', world);
      terms[t + 2].tag(lex[txt], 'lexicon-three', world);
      return 2;
    }
  } //try a four-word version?


  if (t + 3 < terms.length) {
    txt += ' ' + terms[t + 3].reduced;

    if (lex[txt] !== undefined && lex.hasOwnProperty(txt) === true) {
      terms[t].tag(lex[txt], 'lexicon-four', world);
      terms[t + 1].tag(lex[txt], 'lexicon-four', world);
      terms[t + 2].tag(lex[txt], 'lexicon-four', world);
      terms[t + 3].tag(lex[txt], 'lexicon-four', world);
      return 3;
    }
  }

  return 0;
};
/** look at each word in our list of known-words */


var checkLexicon = function checkLexicon(terms, world) {
  var lex = world.words;
  var hasCompound = world.hasCompound; // use reduced?
  //go through each term, and check the lexicon

  for (var t = 0; t < terms.length; t += 1) {
    var str = terms[t].clean; //is it the start of a compound word, like 'super bowl'?

    if (hasCompound[str] === true && t + 1 < terms.length) {
      var foundWords = tryMultiple(terms, t, world);

      if (foundWords > 0) {
        t += foundWords; //skip any already-found words

        continue;
      }
    } //try one-word lexicon


    if (lex[str] !== undefined && lex.hasOwnProperty(str) === true) {
      terms[t].tag(lex[str], 'lexicon', world);
    } // look at reduced version of term, too


    if (str !== terms[t].reduced && lex.hasOwnProperty(terms[t].reduced) === true) {
      terms[t].tag(lex[terms[t].reduced], 'lexicon', world);
    }
  }

  return terms;
};

module.exports = checkLexicon;

},{}],8:[function(_dereq_,module,exports){
"use strict";

var apostrophes = /[\'‘’‛‵′`´]$/;
var oneLetterAcronym = /^[A-Z]('s|,)?$/;
var oneLetterWord = {
  I: true,
  A: true
};

var isAcronym = function isAcronym(term, world) {
  var str = term.reduced; // a known acronym like fbi

  if (term.tags.Acronym) {
    return true;
  } // if (term.tags.Adverb || term.tags.Verb || term.tags.Value || term.tags.Plural) {
  // return false
  // }
  // 'PIZZA' is not an acronym.


  if (str.length > 4 && world.words[str]) {
    return false;
  }

  return term.isAcronym();
}; //


var checkPunctuation = function checkPunctuation(terms, i, world) {
  var term = terms[i]; //check hyphenation
  // if (term.post.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].pre === '') {
  //   term.tag('Hyphenated', 'has-hyphen', world)
  // }
  //an end-tick (trailing apostrophe) - flanders', or Carlos'

  if (apostrophes.test(term.text)) {
    if (!apostrophes.test(term.pre) && !apostrophes.test(term.post) && term.clean.length > 2) {
      var endChar = term.clean[term.clean.length - 2]; //flanders'

      if (endChar === 's') {
        term.tag(['Possessive', 'Noun'], 'end-tick', world);
        return;
      } //chillin'


      if (endChar === 'n') {
        term.tag(['Gerund'], 'chillin', world);
      }
    }
  } // 'NASA' is, but not 'i REALLY love it.'


  if (isAcronym(term, world)) {
    term.tag('Acronym', 'acronym-step', world);
    term.tag('Noun', 'acronym-infer', world);
  } else if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
    term.tag('Acronym', 'one-letter-acronym', world);
    term.tag('Noun', 'one-letter-infer', world);
  }
};

module.exports = checkPunctuation;

},{}],9:[function(_dereq_,module,exports){
"use strict";

var regex = _dereq_('./data/startsWith');

var romanNumeral = /^[IVXLCDM]{2,}$/;
var romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/; //  https://stackoverflow.com/a/267405/168877
//try each of the ^regexes in our list

var checkRegex = function checkRegex(term, world) {
  var str = term.text; // do them all!

  for (var r = 0; r < regex.length; r += 1) {
    if (regex[r][0].test(str) === true) {
      term.tagSafe(regex[r][1], 'regex #' + r, world);
      break;
    }
  } // do some more!
  //roman numberals - XVII


  if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
    term.tag('RomanNumeral', 'xvii', world);
  }
};

module.exports = checkRegex;

},{"./data/startsWith":14}],10:[function(_dereq_,module,exports){
"use strict";

var endsWith = _dereq_('./data/endsWith');

var suffixMap = _dereq_('./data/suffixMap');

var endRegexs = function endRegexs(term, world) {
  var str = term.clean;
  var _char = str[str.length - 1];

  if (endsWith.hasOwnProperty(_char) === true) {
    var regs = endsWith[_char];

    for (var r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        term.tagSafe(regs[r][1], "endReg ".concat(_char, " #").concat(r), world);
        break;
      }
    }
  }
}; //sweep-through all suffixes


var knownSuffixes = function knownSuffixes(term, world) {
  var len = term.clean.length;
  var max = 7;

  if (len <= max) {
    max = len - 1;
  }

  for (var i = max; i > 1; i -= 1) {
    var str = term.clean.substr(len - i, len);

    if (suffixMap[str.length].hasOwnProperty(str) === true) {
      var tag = suffixMap[str.length][str];
      term.tagSafe(tag, 'suffix -' + str, world);
      break;
    }
  }
}; //all-the-way-down!


var checkRegex = function checkRegex(term, world) {
  knownSuffixes(term, world);
  endRegexs(term, world);
};

module.exports = checkRegex;

},{"./data/endsWith":13,"./data/suffixMap":15}],11:[function(_dereq_,module,exports){
"use strict";

//from https://www.regextester.com/106421
var emojiReg = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

var emoticon = _dereq_('./data/emoticons'); //for us, there's three types -
// * ;) - emoticons
// * 🌵 - unicode emoji
// * :smiling_face: - asci-represented emoji
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js


var isCommaEmoji = function isCommaEmoji(raw) {
  if (raw.charAt(0) === ':') {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (raw.match(/:.?$/) === null) {
      return false;
    } //ensure no spaces


    if (raw.match(' ')) {
      return false;
    } //reasonably sized


    if (raw.length > 35) {
      return false;
    }

    return true;
  }

  return false;
}; //check against emoticon whitelist


var isEmoticon = function isEmoticon(str) {
  str = str.replace(/^[:;]/, ':'); //normalize the 'eyes'

  return emoticon.hasOwnProperty(str);
};

var tagEmoji = function tagEmoji(term, world) {
  var raw = term.pre + term.text + term.post;
  raw = raw.trim(); //test for :keyword: emojis

  if (isCommaEmoji(raw) === true) {
    term.tag('Emoji', 'comma-emoji', world);
    term.text = raw;
    term.pre = term.pre.replace(':', '');
    term.post = term.post.replace(':', '');
  } //test for unicode emojis


  if (term.text.match(emojiReg)) {
    term.tag('Emoji', 'unicode-emoji', world);
    term.text = raw;
  } //test for emoticon ':)' emojis


  if (isEmoticon(raw) === true) {
    term.tag('Emoticon', 'emoticon-emoji', world);
    term.text = raw;
  }
};

module.exports = tagEmoji;

},{"./data/emoticons":12}],12:[function(_dereq_,module,exports){
"use strict";

//just some of the most common emoticons
//faster than
//http://stackoverflow.com/questions/28077049/regex-matching-emoticons
module.exports = {
  ':(': true,
  ':)': true,
  ':P': true,
  ':p': true,
  ':O': true,
  ':3': true,
  ':|': true,
  ':/': true,
  ':\\': true,
  ':$': true,
  ':*': true,
  ':@': true,
  ':-(': true,
  ':-)': true,
  ':-P': true,
  ':-p': true,
  ':-O': true,
  ':-3': true,
  ':-|': true,
  ':-/': true,
  ':-\\': true,
  ':-$': true,
  ':-*': true,
  ':-@': true,
  ':^(': true,
  ':^)': true,
  ':^P': true,
  ':^p': true,
  ':^O': true,
  ':^3': true,
  ':^|': true,
  ':^/': true,
  ':^\\': true,
  ':^$': true,
  ':^*': true,
  ':^@': true,
  '):': true,
  '(:': true,
  '$:': true,
  '*:': true,
  ')-:': true,
  '(-:': true,
  '$-:': true,
  '*-:': true,
  ')^:': true,
  '(^:': true,
  '$^:': true,
  '*^:': true,
  '<3': true,
  '</3': true,
  '<\\3': true
};

},{}],13:[function(_dereq_,module,exports){
"use strict";

//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.
//this mapping shrinks-down the uglified build
var Adj = 'Adjective';
var Inf = 'Infinitive';
var Pres = 'PresentTense';
var Sing = 'Singular';
var Past = 'PastTense';
var Adverb = 'Adverb';
var Exp = 'Expression';
var Actor = 'Actor';
var Verb = 'Verb';
var Noun = 'Noun';
var Last = 'LastName'; //the order here matters.
//regexes indexed by mandated last-character

module.exports = {
  a: [[/.[aeiou]na$/, Noun], [/.[oau][wvl]ska$/, Last], //polish (female)
  [/.[^aeiou]ica$/, Sing], [/^([hyj]a)+$/, Exp] //hahah
  ],
  c: [[/.[^aeiou]ic$/, Adj]],
  d: [[/.[ia]sed$/, Adj], [/.[gt]led$/, Adj], [/.[td]ed$/, Past], [/.[aeiou]red$/, Past], [/.[^aeiou]led$/, Past], //rumbled
  [/[^aeiou]ard$/, Sing], [/[aeiou][^aeiou]id$/, Adj], [/[aeiou]c?ked$/, Past], //hooked
  [/[^aeiou][aeiou][tvx]ed$/, Past], //boxed
  [/.[vrl]id$/, Adj]],
  e: [[/.[lnr]ize$/, Inf], [/.[^aeiou]ise$/, Inf], [/.[aeiou]te$/, Inf], [/.[^aeiou][ai]ble$/, Adj], [/.[^aeiou]eable$/, Adj], [/.[ts]ive$/, Adj]],
  h: [[/.[^aeiouf]ish$/, Adj], [/.v[iy]ch$/, Last], //east-europe
  [/^ug?h+$/, Exp], //uhh
  [/^uh[ -]?oh$/, Exp] //uhoh
  ],
  i: [[/.[oau][wvl]ski$/, Last] //polish (male)
  ],
  k: [[/^(k)+$/, Exp] //kkkk
  ],
  l: [[/.[gl]ial$/, Adj], [/.[^aeiou]ful$/, Adj], [/.[nrtumcd]al$/, Adj], [/.[^aeiou][ei]al$/, Adj]],
  m: [[/.[^aeiou]ium$/, Sing], [/[^aeiou]ism$/, Sing], [/^h*u*m+$/, Exp], //mmmmmmm / ummmm / huuuuuummmmmm
  [/^\d+ ?[ap]m$/, 'Date']],
  n: [[/.[lsrnpb]ian$/, Adj], [/[^aeiou]ician$/, Actor]],
  o: [[/^no+$/, Exp], //noooo
  [/^(yo)+$/, Exp], //yoyo
  [/^woo+[pt]?$/, Exp] //woo
  ],
  r: [[/.[bdfklmst]ler$/, 'Noun'], [/.[ilk]er$/, 'Comparative'], [/[aeiou][pns]er$/, Sing], [/[^i]fer$/, Inf], [/.[^aeiou][ao]pher$/, Actor]],
  t: [[/.[di]est$/, 'Superlative'], [/.[icldtgrv]ent$/, Adj], [/[aeiou].*ist$/, Adj], [/^[a-z]et$/, Verb]],
  s: [[/.[rln]ates$/, Pres], [/.[^z]ens$/, Verb], [/.[lstrn]us$/, Sing], [/[aeiou][^aeiou]is$/, Sing], [/[a-z]\'s$/, Noun], [/^yes+$/, Exp] //yessss
  ],
  v: [[/.[^aeiou][ai][kln]ov$/, Last] //east-europe
  ],
  y: [[/.[cts]hy$/, Adj], [/.[st]ty$/, Adj], [/.[gk]y$/, Adj], [/.[tnl]ary$/, Adj], [/.[oe]ry$/, Sing], [/[rdntkbhs]ly$/, Adverb], [/...lly$/, Adverb], [/[bszmp]{2}y$/, Adj], [/.(gg|bb|zz)ly$/, Adj], [/.[aeiou]my$/, Adj], [/[ea]{2}zy$/, Adj], [/.[^aeiou]ity$/, Sing]]
};

},{}],14:[function(_dereq_,module,exports){
"use strict";

//these are regexes applied to t.text, instead of t.clean
// order matters.
module.exports = [//phone numbers
[/^[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //589-3809
[/^[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, 'PhoneNumber'], //632-589-3809
//money
[/^[-+]?[$€¥£][0-9]+(.[0-9]{1,2})?([a-z]{1,4})?$/, ['Money', 'Value']], //like $5.30
[/^[-+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(.[0-9]{1,2})?$/, ['Money', 'Value']], //like $5,231.30
[/^[-+]?[0-9]([0-9,.]+)?(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ['Money', 'Value']], //like 400usd
//web tags
[/^\w+@\w+\.[a-z]{2,3}$/, 'Email'], //not fancy
[/^#[a-z0-9_\u00C0-\u00FF]{2,}$/, 'HashTag'], [/^@\w{2,}$/, 'AtMention'], [/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/, 'Url'], //with http/www
[/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/, 'Url'], //http://mostpopularwebsites.net/top-level-domain
//dates/times
[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, 'Time'], //4:32:32
[/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/, 'Time'], //4pm
[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/, 'Time'], //4:00pm
[/^[PMCE]ST$/, 'Time'], //PST, time zone abbrevs
[/^utc ?[+-]?[0-9]+?$/, 'Time'], //UTC 8+
[/^[a-z0-9]*? o\'?clock$/, 'Time'], //3 oclock
[/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, 'Date'], // 03-02-89
[/^[0-9]{1,4}\/[0-9]{1,2}\/[0-9]{1,4}$/, 'Date'], // 03/02/89
//names
[/^ma?c\'.*/, 'LastName'], //mc'adams
[/^o\'[drlkn].*/, 'LastName'], //o'douggan
[/^ma?cd[aeiou]/, 'LastName'], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes
//slang things
[/^(lol)+[sz]$/, 'Expression'], //lol
[/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, 'Verb'], [/^[\-\+]?[0-9]+(\.[0-9])*$/, ['Cardinal', 'NumericValue']], [/^(over|under)[a-z]{2,}/, 'Adjective'], [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89
//numbers
[/^[\-\+]?[0-9][0-9,]*(\.[0-9])*$/, ['Cardinal', 'NumericValue']], //like 5
[/^[-+]?[0-9]+(.[0-9]+)?$/, ['Cardinal', 'NumericValue']], //like +5.0
[/^[0-9\.]{1,4}(st|nd|rd|th)?[-–][0-9\.]{1,4}(st|nd|rd|th)?$/, 'NumberRange'], //5-7
[/^[-+]?[0-9.,]{1,3}(,[0-9.,]{3})+(.[0-9]+)?$/, 'NumericValue'], //like 5,999.0
[/^.?[0-9]+([0-9,.]+)?%$/, ['Percent', 'Cardinal', 'NumericValue']], //7%  ..
[/^[0-9]{1,4}\/[0-9]{1,4}$/, 'Fraction'], //3/2ths
[/^[0-9\.]{1,2}[-–][0-9]{1,2}$/, ['Value', 'NumberRange']], //7-8
[/^[0-9][0-9,\.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
[/[0-9]\+$/, ['Cardinal', 'NumericValue']], //10+
[/^[0-9]+(st|nd|rd|th)$/, 'Ordinal'], //like 5th
[/^[0-9\.]+([a-z]{1,4})$/, 'Value'] //like 5tbsp
];

},{}],15:[function(_dereq_,module,exports){
"use strict";

//just a foolish lookup of known suffixes
var Adj = 'Adjective';
var Inf = 'Infinitive';
var Pres = 'PresentTense';
var Sing = 'Singular';
var Past = 'PastTense';
var Avb = 'Adverb';
var Plrl = 'Plural';
var Actor = 'Actor';
var Vb = 'Verb';
var Noun = 'Noun';
var Last = 'LastName';
var Modal = 'Modal'; // find any issues - https://observablehq.com/@spencermountain/suffix-word-lookup

module.exports = [null, //0
null, //1
{
  //2-letter
  ea: Sing,
  ia: Noun,
  ic: Adj,
  ly: Avb,
  "'n": Vb,
  "'t": Vb
}, {
  //3-letter
  que: Adj,
  lar: Adj,
  ffy: Adj,
  nny: Adj,
  rmy: Adj,
  azy: Adj,
  oid: Adj,
  mum: Adj,
  ous: Adj,
  end: Vb,
  sis: Sing,
  rol: Sing,
  ize: Inf,
  ify: Inf,
  zes: Pres,
  nes: Pres,
  ing: 'Gerund',
  //likely to be converted to Adj after lexicon pass
  ' so': Avb,
  "'ll": Modal,
  "'re": 'Copula'
}, {
  //4-letter
  teen: 'Value',
  tors: Noun,
  amed: Past,
  ched: Past,
  ends: Vb,
  oses: Pres,
  fies: Pres,
  ects: Pres,
  nded: Past,
  cede: Inf,
  tage: Inf,
  gate: Inf,
  vice: Sing,
  tion: Sing,
  cted: Past,
  ette: Sing,
  some: Adj,
  llen: Adj,
  ried: Adj,
  gone: Adj,
  made: Adj,
  fore: Avb,
  less: Avb,
  ices: Plrl,
  ions: Plrl,
  ints: Plrl,
  aped: Past,
  lked: Past,
  ould: Modal,
  tive: Actor,
  sson: Last,
  //swedish male
  czyk: Last,
  //polish (male)
  chuk: Last,
  //east-europe
  enko: Last,
  //east-europe
  akis: Last,
  //greek
  nsen: Last //norway

}, {
  //5-letter
  fully: Avb,
  where: Avb,
  wards: Avb,
  urned: Past,
  tized: Past,
  eased: Past,
  ances: Plrl,
  tures: Plrl,
  ports: Plrl,
  ettes: Plrl,
  ities: Plrl,
  rough: Adj,
  ology: Noun,
  bound: Adj,
  tieth: 'Ordinal',
  ishes: Pres,
  tches: Pres,
  nssen: Last,
  //norway
  marek: Last //polish (male)

}, {
  //6-letter
  keeper: Actor,
  logist: Actor,
  auskas: Last,
  //lithuania
  teenth: 'Value'
}, {
  //7-letter
  sdottir: Last,
  //swedish female
  opoulos: Last //greek

}];

},{}],16:[function(_dereq_,module,exports){
"use strict";

var steps = {
  lexicon: _dereq_('./01-lexicon'),
  punctuation: _dereq_('./02-punctuation'),
  regex: _dereq_('./03-prefixes'),
  suffix: _dereq_('./04-suffixes'),
  emoji: _dereq_('./05-emoji')
}; //'lookups' look at a term by itself

var lookups = function lookups(doc) {
  var terms = doc.termList();
  var world = doc.world; //our list of known-words

  steps.lexicon(terms, world); //try these other methods

  for (var i = 0; i < terms.length; i += 1) {
    var term = terms[i]; //or maybe some helpful punctuation

    steps.punctuation(terms, i, world); //mostly prefix checks

    steps.regex(term, world); //maybe we can guess

    steps.suffix(term, world); //emoji and emoticons

    steps.emoji(term, world);
  }

  return doc;
};

module.exports = lookups;

},{"./01-lexicon":7,"./02-punctuation":8,"./03-prefixes":9,"./04-suffixes":10,"./05-emoji":11}],17:[function(_dereq_,module,exports){
"use strict";

var markov = _dereq_('./data/markov');

var afterKeys = Object.keys(markov.afterThisPos);
var beforeKeys = Object.keys(markov.beforeThisPos);

var checkNeighbours = function checkNeighbours(terms, world) {
  var _loop = function _loop(i) {
    var term = terms[i]; //do we still need a tag?

    if (term.isKnown() === true) {
      return "continue";
    } //ok, this term needs a tag.
    //look at previous word for clues..


    var lastTerm = terms[i - 1];

    if (lastTerm) {
      // 'foobar term'
      if (markov.afterThisWord.hasOwnProperty(lastTerm.clean) === true) {
        var tag = markov.afterThisWord[lastTerm.clean];
        term.tag(tag, 'after-' + lastTerm.clean, world);
        return "continue";
      } // 'Tag term'
      // (look at previous POS tags for clues..)


      var foundTag = afterKeys.find(function (tag) {
        return lastTerm.tags[tag];
      });

      if (foundTag !== undefined) {
        var _tag = markov.afterThisPos[foundTag];
        term.tag(_tag, 'after-' + foundTag, world);
        return "continue";
      }
    } //look at next word for clues..


    var nextTerm = terms[i + 1];

    if (nextTerm) {
      // 'term foobar'
      if (markov.beforeThisWord.hasOwnProperty(nextTerm.clean) === true) {
        var _tag2 = markov.beforeThisWord[nextTerm.clean];
        term.tag(_tag2, 'before-' + nextTerm.clean, world);
        return "continue";
      } // 'term Tag'
      // (look at next POS tags for clues..)


      var _foundTag = beforeKeys.find(function (tag) {
        return nextTerm.tags[tag];
      });

      if (_foundTag !== undefined) {
        var _tag3 = markov.beforeThisPos[_foundTag];
        term.tag(_tag3, 'before-' + _foundTag, world);
        return "continue";
      }
    }
  };

  for (var i = 0; i < terms.length; i += 1) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
};

module.exports = checkNeighbours;

},{"./data/markov":23}],18:[function(_dereq_,module,exports){
"use strict";

var titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
var hasNumber = /[0-9]/;
/** look for any grammar signals based on capital/lowercase */

var checkCase = function checkCase(terms, world) {
  terms.forEach(function (term, i) {
    //is it a titlecased word?
    if (titleCase.test(term.text) === true && hasNumber.test(term.text) === false) {
      // tag it as titlecase, if possible
      if (i !== 0) {
        term.tag('TitleCase', 'case', world);
      } else if (term.tags.Person || term.tags.Organization || term.tags.Place) {
        term.tag('TitleCase', 'case-person', world);
      } // can we call it a noun?


      if (i !== 0) {
        //sure!
        term.tag('ProperNoun', 'case-noun', world);
      }
    }
  });
};

module.exports = checkCase;

},{}],19:[function(_dereq_,module,exports){
"use strict";

var hasPrefix = /^(re|un)-?[a-z\u00C0-\u00FF]/;
var prefix = /^(re|un)-?/;
/** check 'rewatch' in lexicon as 'watch' */

var checkPrefix = function checkPrefix(terms, world) {
  var lex = world.words;
  terms.forEach(function (term) {
    // skip if we have a good tag already
    if (term.isKnown() === true) {
      return;
    } //does it start with 'un|re'


    if (hasPrefix.test(term.clean) === true) {
      // look for the root word in the lexicon:
      var stem = term.clean.replace(prefix, '');

      if (stem && stem.length > 3 && lex[stem] !== undefined && lex.hasOwnProperty(stem) === true) {
        term.tag(lex[stem], 'stem-' + stem, world);
      }
    }
  });
};

module.exports = checkPrefix;

},{}],20:[function(_dereq_,module,exports){
"use strict";

//these tags don't have plurals
var noPlurals = ['Uncountable', 'Pronoun', 'Place', 'Value', 'Person', 'Month', 'WeekDay', 'Holiday'];

var rules = _dereq_('./data/isPlural');

var notPlural = [/ss$/, /sis$/, /[^aeiou][uo]s$/, /'s$/];
var notSingular = [/i$/, /ae$/];
/** turn nouns into singular/plural */

var checkPlural = function checkPlural(t, world) {
  if (t.tags.Noun && !t.tags.Acronym) {
    var str = t.clean; //skip existing tags, fast

    if (t.tags.Singular || t.tags.Plural) {
      return;
    } //too short


    if (str.length <= 3) {
      t.tag('Singular', 'short-singular', world);
      return;
    } //is it impossible to be plural?


    if (noPlurals.find(function (tag) {
      return t.tags[tag];
    })) {
      return;
    } // isPlural suffix rules


    if (rules.isPlural.find(function (reg) {
      return reg.test(str);
    })) {
      t.tag('Plural', 'plural-rules', world);
      return;
    } // isSingular suffix rules


    if (rules.isSingular.find(function (reg) {
      return reg.test(str);
    })) {
      t.tag('Singular', 'singular-rules', world);
      return;
    } // finally, fallback 'looks plural' rules..


    if (/s$/.test(str) === true) {
      //avoid anything too sketchy to be plural
      if (notPlural.find(function (reg) {
        return reg.test(str);
      })) {
        return;
      }

      t.tag('Plural', 'plural-fallback', world);
      return;
    } //avoid anything too sketchy to be singular


    if (notSingular.find(function (reg) {
      return reg.test(str);
    })) {
      return;
    }

    t.tag('Singular', 'singular-fallback', world);
  }
};

module.exports = checkPlural;

},{"./data/isPlural":22}],21:[function(_dereq_,module,exports){
"use strict";

var orgWords = _dereq_('./data/organizations'); //could this word be an organization


var maybeOrg = function maybeOrg(t) {
  //must be a noun
  if (!t.tags.Noun) {
    return false;
  } //can't be these things


  if (t.tags.Pronoun || t.tags.Comma || t.tags.Possessive) {
    return false;
  } //must be one of these


  if (t.tags.Organization || t.tags.Acronym || t.tags.Place || t.titleCase()) {
    return true;
  }

  return false;
};

var tagOrgs = function tagOrgs(terms, world) {
  for (var i = 0; i < terms.length; i += 1) {
    var t = terms[i];

    if (orgWords[t.clean] !== undefined && orgWords.hasOwnProperty(t.clean) === true) {
      // look-backward - eg. 'Toronto University'
      var lastTerm = terms[i - 1];

      if (lastTerm !== undefined && maybeOrg(lastTerm) === true) {
        lastTerm.tagSafe('Organization', 'org-word-1', world);
        t.tagSafe('Organization', 'org-word-2', world);
        continue;
      } //look-forward - eg. University of Toronto


      var nextTerm = terms[i + 1];

      if (nextTerm !== undefined && nextTerm.clean === 'of') {
        if (terms[i + 2] && maybeOrg(terms[i + 2])) {
          t.tagSafe('Organization', 'org-of-word-1', world);
          nextTerm.tagSafe('Organization', 'org-of-word-2', world);
          terms[i + 2].tagSafe('Organization', 'org-of-word-3', world);
          continue;
        }
      }
    }
  }
};

module.exports = tagOrgs;

},{"./data/organizations":24}],22:[function(_dereq_,module,exports){
"use strict";

//similar to plural/singularize rules, but not the same
var isPlural = [/(^v)ies$/i, /ises$/i, /ives$/i, /(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /(buffal|tomat|tornad)oes$/i, /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i, /(vert|ind|cort)ices$/i, /(matr|append)ices$/i, /(x|ch|ss|sh|s|z|o)es$/i, /is$/i, /men$/i, /news$/i, /.tia$/i, /(^f)ves$/i, /(lr)ves$/i, /(^aeiouy|qu)ies$/i, /(m|l)ice$/i, /(cris|ax|test)es$/i, /(alias|status)es$/i, /ics$/i]; //similar to plural/singularize rules, but not the same

var isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /s[aeiou]+ns$/i, // sans, siens
/(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  isSingular: isSingular,
  isPlural: isPlural
};

},{}],23:[function(_dereq_,module,exports){
"use strict";

//markov-like stats about co-occurance, for hints about unknown terms
//basically, a little-bit better than the noun-fallback
//just top n-grams from nlp tags, generated from nlp-corpus
//after this word, here's what happens usually
var afterThisWord = {
  i: 'Verb',
  //44% //i walk..
  first: 'Noun',
  //50% //first principles..
  it: 'Verb',
  //33%
  there: 'Verb',
  //35%
  not: 'Verb',
  //33%
  because: 'Noun',
  //31%
  "if": 'Noun',
  //32%
  but: 'Noun',
  //26%
  who: 'Verb',
  //40%
  "this": 'Noun',
  //37%
  his: 'Noun',
  //48%
  when: 'Noun',
  //33%
  you: 'Verb',
  //35%
  very: 'Adjective',
  // 39%
  old: 'Noun',
  //51%
  never: 'Verb',
  //42%
  before: 'Noun' //28%

}; //in advance of this word, this is what happens usually

var beforeThisWord = {
  there: 'Verb',
  //23% // be there
  me: 'Verb',
  //31% //see me
  man: 'Adjective',
  // 80% //quiet man
  only: 'Verb',
  //27% //sees only
  him: 'Verb',
  //32% //show him
  were: 'Noun',
  //48% //we were
  took: 'Noun',
  //38% //he took
  himself: 'Verb',
  //31% //see himself
  went: 'Noun',
  //43% //he went
  who: 'Noun',
  //47% //person who
  jr: 'Person'
}; //following this POS, this is likely

var afterThisPOS = {
  Adjective: 'Noun',
  //36% //blue dress
  Possessive: 'Noun',
  //41% //his song
  Determiner: 'Noun',
  //47%
  Adverb: 'Verb',
  //20%
  Pronoun: 'Verb',
  //40%
  Value: 'Noun',
  //47%
  Ordinal: 'Noun',
  //53%
  Modal: 'Verb',
  //35%
  Superlative: 'Noun',
  //43%
  Demonym: 'Noun',
  //38%
  Honorific: 'Person' //

}; //in advance of this POS, this is likely

var beforeThisPOS = {
  Copula: 'Noun',
  //44% //spencer is
  PastTense: 'Noun',
  //33% //spencer walked
  Conjunction: 'Noun',
  //36%
  Modal: 'Noun',
  //38%
  Pluperfect: 'Noun',
  //40%
  PerfectTense: 'Verb' //32%

};
module.exports = {
  beforeThisWord: beforeThisWord,
  afterThisWord: afterThisWord,
  beforeThisPos: beforeThisPOS,
  afterThisPos: afterThisPOS
};

},{}],24:[function(_dereq_,module,exports){
"use strict";

//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
var orgWords = ['academy', 'administration', 'agence', 'agences', 'agencies', 'agency', 'airlines', 'airways', 'army', 'assoc', 'associates', 'association', 'assurance', 'authority', 'autorite', 'aviation', 'bank', 'banque', 'board', 'boys', 'brands', 'brewery', 'brotherhood', 'brothers', 'building society', 'bureau', 'cafe', 'caisse', 'capital', 'care', 'cathedral', 'center', 'central bank', 'centre', 'chemicals', 'choir', 'chronicle', 'church', 'circus', 'clinic', 'clinique', 'club', 'co', 'coalition', 'coffee', 'collective', 'college', 'commission', 'committee', 'communications', 'community', 'company', 'comprehensive', 'computers', 'confederation', 'conference', 'conseil', 'consulting', 'containers', 'corporation', 'corps', 'corp', 'council', 'crew', 'daily news', 'data', 'departement', 'department', 'department store', 'departments', 'design', 'development', 'directorate', 'division', 'drilling', 'education', 'eglise', 'electric', 'electricity', 'energy', 'ensemble', 'enterprise', 'enterprises', 'entertainment', 'estate', 'etat', 'evening news', 'faculty', 'federation', 'financial', 'fm', 'foundation', 'fund', 'gas', 'gazette', 'girls', 'government', 'group', 'guild', 'health authority', 'herald', 'holdings', 'hospital', 'hotel', 'hotels', 'inc', 'industries', 'institut', 'institute', 'institute of technology', 'institutes', 'insurance', 'international', 'interstate', 'investment', 'investments', 'investors', 'journal', 'laboratory', 'labs', // 'law',
'liberation army', 'limited', 'local authority', 'local health authority', 'machines', 'magazine', 'management', 'marine', 'marketing', 'markets', 'media', 'memorial', 'mercantile exchange', 'ministere', 'ministry', 'military', 'mobile', 'motor', 'motors', 'musee', 'museum', // 'network',
'news', 'news service', 'observatory', 'office', 'oil', 'optical', 'orchestra', 'organization', 'partners', 'partnership', // 'party',
"people's party", 'petrol', 'petroleum', 'pharmacare', 'pharmaceutical', 'pharmaceuticals', 'pizza', 'plc', 'police', 'polytechnic', 'post', 'power', 'press', 'productions', 'quartet', 'radio', 'regional authority', 'regional health authority', 'reserve', 'resources', 'restaurant', 'restaurants', 'savings', 'school', 'securities', 'service', 'services', 'social club', 'societe', 'society', 'sons', 'standard', 'state police', 'state university', 'stock exchange', 'subcommittee', 'syndicat', 'systems', 'telecommunications', 'telegraph', 'television', 'times', 'tribunal', 'tv', 'union', 'university', 'utilities', 'workers'];
module.exports = orgWords.reduce(function (h, str) {
  h[str] = 'Noun';
  return h;
}, {});

},{}],25:[function(_dereq_,module,exports){
"use strict";

var step = {
  neighbours: _dereq_('./01-neighbours'),
  "case": _dereq_('./02-case'),
  stem: _dereq_('./03-stem'),
  plural: _dereq_('./04-plurals'),
  organizations: _dereq_('./05-organizations')
}; //

var fallbacks = function fallbacks(doc) {
  var terms = doc.termList();
  var world = doc.world; // if it's empty, consult it's neighbours, first

  step.neighbours(terms, world); // is there a case-sensitive clue?

  step["case"](terms, world); // check 'rewatch' as 'watch'

  step.stem(terms, world); // ... fallback to a noun!

  terms.forEach(function (t) {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world);
    }
  }); // turn 'Foo University' into an Org

  step.organizations(terms, world); //are the nouns singular or plural?

  terms.forEach(function (t) {
    step.plural(t, doc.world);
  });
  return doc;
};

module.exports = fallbacks;

},{"./01-neighbours":17,"./02-case":18,"./03-stem":19,"./04-plurals":20,"./05-organizations":21}],26:[function(_dereq_,module,exports){
"use strict";

var hasNegative = /n't$/;
var irregulars = {
  "won't": ['will', 'not'],
  wont: ['will', 'not'],
  "can't": ['can', 'not'],
  cant: ['can', 'not'],
  cannot: ['can', 'not'],
  "shan't": ['should', 'not'],
  dont: ['do', 'not'],
  dun: ['do', 'not'] // "ain't" is ambiguous for is/was

};

var checkNegative = function checkNegative(term) {
  //check named-ones
  if (irregulars.hasOwnProperty(term.clean) === true) {
    return irregulars[term.clean];
  } //try it normally


  if (hasNegative.test(term.clean) === true) {
    var main = term.clean.replace(hasNegative, '');
    return [main, 'not'];
  }

  return null;
};

module.exports = checkNegative;

},{}],27:[function(_dereq_,module,exports){
"use strict";

var contraction = /([a-z\u00C0-\u00FF]+)'([a-z]{1,2})$/i; //these ones don't seem to be ambiguous

var easy = {
  ll: 'will',
  ve: 'have',
  re: 'are',
  m: 'am',
  "n't": 'not'
}; //

var checkApostrophe = function checkApostrophe(term) {
  var parts = term.text.match(contraction);

  if (parts === null) {
    return null;
  }

  if (easy.hasOwnProperty(parts[2])) {
    return [parts[1], easy[parts[2]]];
  }

  return null;
};

module.exports = checkApostrophe;

},{}],28:[function(_dereq_,module,exports){
"use strict";

var irregulars = {
  wanna: ['want', 'to'],
  gonna: ['going', 'to'],
  im: ['i', 'am'],
  alot: ['a', 'lot'],
  ive: ['i', 'have'],
  imma: ['I', 'will'],
  "where'd": ['where', 'did'],
  whered: ['where', 'did'],
  "when'd": ['when', 'did'],
  whend: ['when', 'did'],
  "how'd": ['how', 'did'],
  howd: ['how', 'did'],
  "what'd": ['what', 'did'],
  whatd: ['what', 'did'],
  // "let's": ['let', 'us'], //too weird
  //multiple word contractions
  dunno: ['do', 'not', 'know'],
  brb: ['be', 'right', 'back'],
  gtg: ['got', 'to', 'go'],
  irl: ['in', 'real', 'life'],
  tbh: ['to', 'be', 'honest'],
  imo: ['in', 'my', 'opinion'],
  til: ['today', 'i', 'learned'],
  rn: ['right', 'now'],
  twas: ['it', 'was'],
  '@': ['at']
}; // either 'is not' or 'are not'

var doAint = function doAint(term, phrase) {
  var terms = phrase.terms();
  var index = terms.indexOf(term);
  var before = terms.slice(0, index); //look for the preceding noun

  var noun = before.find(function (t) {
    return t.tags.Noun;
  });

  if (noun && noun.tags.Plural) {
    return ['are', 'not'];
  }

  return ['is', 'not'];
}; //


var checkIrregulars = function checkIrregulars(term, phrase) {
  //this word needs it's own logic:
  if (term.clean === "ain't" || term.clean === 'aint') {
    return doAint(term, phrase);
  } //check white-list


  if (irregulars.hasOwnProperty(term.clean)) {
    return irregulars[term.clean];
  }

  return null;
};

module.exports = checkIrregulars;

},{}],29:[function(_dereq_,module,exports){
"use strict";

var hasApostropheS = /([a-z\u00C0-\u00FF]+)'s$/i;
var blacklist = {
  that: true,
  there: true
};

var isPossessive = function isPossessive(term, pool) {
  // if we already know it
  if (term.tags.Possessive) {
    return true;
  } //a pronoun can't be possessive - "he's house"


  if (term.tags.Pronoun || term.tags.QuestionWord) {
    return false;
  }

  if (blacklist.hasOwnProperty(term.clean)) {
    return false;
  } //if end of sentence, it is possessive - "was spencer's"


  var nextTerm = pool.get(term.next);

  if (!nextTerm) {
    return true;
  } //a gerund suggests 'is walking'


  if (nextTerm.tags.Verb) {
    //fix 'jamie's bite'
    if (nextTerm.tags.Infinitive) {
      return true;
    }

    return false;
  } //spencer's house


  if (nextTerm.tags.Noun) {
    return true;
  } //rocket's red glare


  var twoTerm = pool.get(nextTerm.next);

  if (twoTerm && twoTerm.tags.Noun && !twoTerm.tags.Pronoun) {
    return true;
  } //othwerwise, an adjective suggests 'is good'


  if (nextTerm.tags.Adjective || nextTerm.tags.Adverb || nextTerm.tags.Verb) {
    return false;
  }

  return false;
};

var isHas = function isHas(term, phrase) {
  var terms = phrase.terms();
  var index = terms.indexOf(term);
  var after = terms.slice(index + 1, index + 3); //look for a past-tense verb

  return after.find(function (t) {
    return t.tags.PastTense;
  });
};

var checkPossessive = function checkPossessive(term, phrase, world) {
  //the rest of 's
  var found = term.text.match(hasApostropheS);

  if (found !== null) {
    //spencer's thing vs spencer-is
    if (isPossessive(term, phrase.pool) === true) {
      term.tag('#Possessive', 'isPossessive', world);
      return null;
    } //'spencer is'


    if (found !== null) {
      if (isHas(term, phrase)) {
        return [found[1], 'has'];
      }

      return [found[1], 'is'];
    }
  }

  return null;
};

module.exports = checkPossessive;

},{}],30:[function(_dereq_,module,exports){
"use strict";

var hasPerfect = /[a-z\u00C0-\u00FF]'d$/;
/** split `i'd` into 'i had', or 'i would' */

var checkPerfect = function checkPerfect(term, phrase) {
  if (hasPerfect.test(term.clean)) {
    var root = term.clean.replace(/'d$/, ''); //look at the next few words

    var terms = phrase.terms();
    var index = terms.indexOf(term);
    var after = terms.slice(index + 1, index + 4); //is it before a past-tense verb? - 'i'd walked'

    for (var i = 0; i < after.length; i++) {
      var t = after[i];

      if (t.tags.Verb) {
        if (t.tags.PastTense) {
          return [root, 'had'];
        }

        return [root, 'would'];
      }
    } //otherwise, 'i'd walk'


    return [root, 'would'];
  }

  return null;
};

module.exports = checkPerfect;

},{}],31:[function(_dereq_,module,exports){
"use strict";

var isRange = /^([0-9]+)[-–—]([0-9]+)$/i; //split '2-4' into '2 to 4'

var checkRange = function checkRange(term) {
  if (term.tags.PhoneNumber === true) {
    return null;
  }

  var parts = term.text.match(isRange);

  if (parts !== null) {
    return [parts[1], 'to', parts[2]];
  }

  return null;
};

module.exports = checkRange;

},{}],32:[function(_dereq_,module,exports){
"use strict";

var checkLexicon = _dereq_('../01-init/01-lexicon');

var tokenize = _dereq_('../../01-tokenizer');

var checkNegative = _dereq_('./01-negative');

var checkApostrophe = _dereq_('./02-simple');

var checkIrregulars = _dereq_('./03-irregulars');

var checkPossessive = _dereq_('./04-possessive');

var checkPerfect = _dereq_('./05-perfectTense');

var checkRange = _dereq_('./06-ranges');

var isNumber = /^[0-9]+$/;

var createPhrase = function createPhrase(found, doc) {
  //create phrase from ['would', 'not']
  var phrase = tokenize.fromText(found.join(' '), doc.world, doc.pool())[0]; //tag it

  var terms = phrase.terms();
  checkLexicon(terms, doc.world); //make these terms implicit

  terms.forEach(function (t) {
    t.implicit = t.text;
    t.text = '';
    t.clean = ''; // remove whitespace for implicit terms

    t.pre = '';
    t.post = ''; // tag number-ranges

    if (isNumber.test(t.implicit)) {
      t.tags.Number = true;
      t.tags.Cardinal = true;
    }
  });
  return phrase;
};

var contractions = function contractions(doc) {
  var world = doc.world;
  doc.list.forEach(function (p) {
    var terms = p.terms();

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      var found = checkNegative(term);
      found = found || checkApostrophe(term);
      found = found || checkIrregulars(term, p);
      found = found || checkPossessive(term, p, world);
      found = found || checkPerfect(term, p);
      found = found || checkRange(term, p); //add them in

      if (found !== null) {
        var newPhrase = createPhrase(found, doc); //set text as contraction

        var firstTerm = newPhrase.terms(0);
        firstTerm.text = term.text; //grab sub-phrase to remove

        var match = p.buildFrom(term.id, 1, doc.pool());
        match.replace(newPhrase, doc, true);
      }
    }
  });
  return doc;
};

module.exports = contractions;

},{"../../01-tokenizer":6,"../01-init/01-lexicon":7,"./01-negative":26,"./02-simple":27,"./03-irregulars":28,"./04-possessive":29,"./05-perfectTense":30,"./06-ranges":31}],33:[function(_dereq_,module,exports){
"use strict";

//
var fixAdjective = function fixAdjective(doc) {
  var adj = doc["if"]('#Adjective');

  if (adj.found) {
    //still good
    adj.match('[still] #Adjective').tag('Adverb', 'still-advb'); //barely even walk

    adj.match('(barely|hardly) even').tag('#Adverb', 'barely-even'); //big dreams, critical thinking

    adj.match('#Adjective [#PresentTense]').tag('Noun', 'adj-presentTense'); //will secure our

    adj.match('will [#Adjective]').tag('Verb', 'will-adj'); //cheering hard - dropped -ly's

    adj.match('#PresentTense [(hard|quick|long|bright|slow)]').tag('Adverb', 'lazy-ly'); //his fine

    adj.match('(his|her|its) [#Adjective]').tag('Noun', 'his-fine'); //he left

    adj.match('#Noun #Adverb? [left]').tag('PastTense', 'left-verb'); //he disguised the thing

    adj.match('#Pronoun [#Adjective] #Determiner #Adjective? #Noun').tag('Verb', 'he-adj-the');
  }

  return doc;
};

module.exports = fixAdjective;

},{}],34:[function(_dereq_,module,exports){
"use strict";

var preps = '(in|by|before|during|on|until|after|of|within|all)'; //6

var people = '(january|april|may|june|summer|autumn|jan|sep)'; //ambiguous month-names

var verbs = '(may|march)'; //ambiguous month-verbs

var fixDates = function fixDates(doc) {
  //ambiguous month - person forms
  var person = doc["if"](people);

  if (person.found === true) {
    //give to april
    person.match("#Infinitive #Determiner? #Adjective? #Noun? (to|for) [".concat(people, "]")).tag('Person', 'ambig-person'); //remind june

    person.match("#Infinitive [".concat(people, "]")).tag('Person', 'infinitive-person'); //may waits for

    person.match("[".concat(people, "] #PresentTense (to|for)")).tag('Person', 'ambig-active'); //april will

    person.match("[".concat(people, "] #Modal")).tag('Person', 'ambig-modal'); //would april

    person.match("#Modal [".concat(people, "]")).tag('Person', 'modal-ambig'); //with april

    person.match("(that|with|for) [".concat(people, "]")).tag('Person', 'that-month'); //it is may

    person.match("#Copula [".concat(people, "]")).tag('Person', 'is-may'); //may is

    person.match("[".concat(people, "] #Copula")).tag('Person', 'may-is'); //april the 5th

    person.match("[".concat(people, "] the? #Value")).tag('Month', 'person-value'); //wednesday april

    person.match("#Date [".concat(people, "]")).tag('Month', 'correction-may'); //may 5th

    person.match("[".concat(people, "] the? #Value")).tag('Month', 'may-5th'); //5th of may

    person.match("#Value of [".concat(people, "]")).tag('Month', '5th-of-may'); //by april

    person.match("".concat(preps, " [").concat(people, "]")).ifNo('#Holiday').tag('Month', 'preps-month'); //this april

    person.match("(next|this|last) [".concat(people, "]")).tag('Month', 'correction-may'); //maybe not 'this'
  } //ambiguous month - verb-forms


  var verb = doc["if"](verbs);

  if (verb.found === true) {
    //quickly march
    verb.match("#Adverb [".concat(verbs, "]")).tag('Infinitive', 'ambig-verb');
    verb.match("".concat(verbs, " [#Adverb]")).tag('Infinitive', 'ambig-verb'); //all march

    verb.match("".concat(preps, " [").concat(verbs, "]")).tag('Month', 'in-month'); //this march

    verb.match("(next|this|last) [".concat(verbs, "]")).tag('Month', 'this-month'); //with date

    verb.match("[".concat(verbs, "] the? #Value")).tag('Month', 'march-5th');
    verb.match("#Value of? [".concat(verbs, "]")).tag('Month', '5th-of-march'); //nearby

    verb.match("[".concat(verbs, "] .? #Date")).tag('Month', 'march-and-feb');
    verb.match("#Date .? [".concat(verbs, "]")).tag('Month', 'feb-and-march');
    var march = doc["if"]('march');

    if (march.found === true) {
      //march to
      march.match('[march] (up|down|back|to|toward)').tag('Infinitive', 'march-to'); //must march

      march.match('#Modal [march]').tag('Infinitive', 'must-march');
    }
  } //sun 5th


  var sun = doc["if"]('sun');

  if (sun.found === true) {
    //sun feb 2
    sun.match('[sun] #Date').tag('WeekDay', 'sun-feb'); //sun the 5th

    sun.match('sun the #Ordinal').tag('Date').firstTerm().tag('WeekDay', 'sun-the-5th'); //the sun

    sun.match('#Determiner [sun]').tag('Singular', 'the-sun');
  } //sat, nov 5th


  var sat = doc["if"]('sat');

  if (sat.found) {
    //sat november
    sat.match('[sat] #Date').tag('WeekDay', 'sat-feb'); //this sat

    sat.match("".concat(preps, " [sat]")).tag('WeekDay', 'sat');
  } //months:


  var month = doc["if"]('#Month');

  if (month.found === true) {
    //June 5-7th
    month.match("#Month #DateRange+").tag('Date', 'correction-numberRange'); //5th of March

    month.match('#Value of #Month').tag('Date', 'value-of-month'); //5 March

    month.match('#Cardinal #Month').tag('Date', 'cardinal-month'); //march 5 to 7

    month.match('#Month #Value to #Value').tag('Date', 'value-to-value'); //march the 12th

    month.match('#Month the #Value').tag('Date', 'month-the-value');
  } //months:


  var val = doc["if"]('#Value');

  if (val.found === true) {
    //values
    val.match('#Value #Abbreviation').tag('Value', 'value-abbr'); //seven point five

    val.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value'); //minus 7

    val.match('(minus|negative) #Value').tag('Value', 'minus-value'); // ten grand

    val.match('#Value grand').tag('Value', 'value-grand'); //quarter million

    val.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal'); //june 7

    val.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value'); //7 june

    val.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date'); //may twenty five

    val.match('#TextValue #TextValue')["if"]('#Date').tag('#Date', 'textvalue-date');
  }

  return doc;
};

module.exports = fixDates;

},{}],35:[function(_dereq_,module,exports){
"use strict";

//mostly pos-corections here
var miscCorrection = function miscCorrection(doc) {
  //misc:
  //foot/feet
  doc.match('(foot|feet)').tag('Noun', 'foot-noun'); // blood, sweat, and tears

  doc.match('(#Noun && @hasComma) #Noun (and|or) [#PresentTense]').tag('#Noun', 'noun-list'); //3 feet

  doc.match('#Value [(foot|feet)]').tag('Unit', 'foot-unit'); //'u' as pronoun

  doc.match('#Conjunction [u]').tag('Pronoun', 'u-pronoun-2'); //6 am

  doc.match('#Holiday (day|eve)').tag('Holiday', 'holiday-day'); // the captain who

  doc.match('#Noun [(who|whom)]').tag('Determiner', 'captain-who'); //timezones

  doc.match('(standard|daylight|summer|eastern|pacific|central|mountain) standard? time').tag('Time', 'timezone'); //Brazilian pesos

  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency'); //about to go

  doc.match('[about to] #Adverb? #Verb').tag(['Auxiliary', 'Verb'], 'about-to'); //right of way

  doc.match('(right|rights) of .').tag('Noun', 'right-of'); // a bit

  doc.match('[much] #Adjective').tag('Adverb', 'bit-1');
  doc.match('a [bit]').tag('Noun', 'bit-2');
  doc.match('a bit much').tag('Determiner Adverb Adjective', 'bit-3');
  doc.match('too much').tag('Adverb Adjective', 'bit-4'); // u r cool

  doc.match('u r').tag('Pronoun #Copula', 'u r'); // well, ...

  doc.match('^(well|so|okay)').tag('Expression', 'well-'); // some conditional statements

  var m = doc.clauses(); // had he survived,

  m.match('^had #Noun+ #PastTense').firstTerm().tag('Condition', 'had-he'); // were he to survive

  m.match('^were #Noun+ to #Infinitive').firstTerm().tag('Condition', 'were-he'); //swear-words as non-expression POS
  //nsfw

  doc.match('holy (shit|fuck|hell)').tag('Expression', 'swears-expression');
  doc.match('#Determiner [(shit|damn|hell)]').tag('Noun', 'swears-noun');
  doc.match('[(shit|damn|fuck)] (#Determiner|#Possessive|them)').tag('Verb', 'swears-verb');
  doc.match('#Copula fucked up?').not('#Copula').tag('Adjective', 'swears-adjective'); //ambig prepositions/conjunctions

  var so = doc["if"]('so');

  if (so.found === true) {
    //so funny
    so.match('[so] #Adjective').tag('Adverb', 'so-adv'); //so the

    so.match('[so] #Noun').tag('Conjunction', 'so-conj'); //do so

    so.match('do [so]').tag('Noun', 'so-noun');
  }

  var all = doc["if"]('all');

  if (all.found === true) {
    //all students
    all.match('[all] #Determiner? #Noun').tag('Adjective', 'all-noun'); //it all fell apart

    all.match('[all] #Verb').tag('Adverb', 'all-verb');
  } //the ambiguous word 'that' and 'which'


  var which = doc["if"]('which');

  if (which.found === true) {
    //remind john that
    which.match('#Verb #Adverb? #Noun [(that|which)]').tag('Preposition', 'that-prep'); //that car goes

    which.match('that #Noun [#Verb]').tag('Determiner', 'that-determiner'); //work, which has been done.

    which.match('@hasComma [which] (#Pronoun|#Verb)').tag('Preposition', 'which-copula');
  } //like


  var like = doc["if"]('like');

  if (like.found === true) {
    like.match('just [like]').tag('Preposition', 'like-preposition'); //folks like her

    like.match('#Noun [like] #Noun').tag('Preposition', 'noun-like'); //look like

    like.match('#Verb [like]').tag('Adverb', 'verb-like'); //exactly like

    like.match('#Adverb like').notIf('(really|generally|typically|usually|sometimes|often) [like]').tag('Adverb', 'adverb-like');
  }

  var title = doc["if"]('@titleCase');

  if (title.found === true) {
    //FitBit Inc
    title.match('@titleCase (ltd|co|inc|dept|assn|bros)').tag('Organization', 'org-abbrv'); //Foo District

    title.match('@titleCase+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)').tag('Region', 'foo-district'); //District of Foo

    title.match('(district|region|province|municipality|territory|burough|state) of @titleCase').tag('Region', 'district-of-Foo');
  }

  var hyph = doc["if"]('@hasHyphen');

  if (hyph.found === true) {
    //air-flow
    hyph.match('@hasHyphen .').match('#Noun #Verb').tag('Noun', 'hyphen-verb'); //connect hyphenated expressions - 'ooh-wee'

    hyph["if"]('#Expression').match('@hasHyphen+').tag('Expression', 'ooh-wee');
  }

  var place = doc["if"]('#Place');

  if (place.found === true) {
    //West Norforlk
    place.match('(west|north|south|east|western|northern|southern|eastern)+ #Place').tag('Region', 'west-norfolk'); //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)

    place.match('#City [#Acronym]').match('(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)').tag('Region', 'us-state');
  }

  return doc;
};

module.exports = miscCorrection;

},{}],36:[function(_dereq_,module,exports){
"use strict";

//
var fixNouns = function fixNouns(doc) {
  var noun = doc["if"]('#Noun');

  if (noun.found === true) {
    //'more' is not always an adverb
    noun.match('more #Noun').tag('Noun', 'more-noun'); //he quickly foo

    noun.match('#Noun #Adverb [#Noun]').tag('Verb', 'quickly-foo'); //fix for busted-up phrasalVerbs

    noun.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal'); //John & Joe's

    noun.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun'); //Aircraft designer

    noun.match('#Noun #Actor').tag('Actor', 'thing-doer'); //j.k Rowling

    doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun'); //king of spain

    doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun'); // addresses

    doc.match('#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)').tag('Address'); // schools

    doc.match('#Noun+ (public|private) school').tag('School'); //the word 'second'

    noun.match('[second] #Noun').notIf('#Honorific').unTag('Unit').tag('Ordinal', 'second-noun'); //linear algebra

    noun.match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun').tag('Noun', 'technical-noun'); //organization

    var org = noun["if"]('#Organization');

    if (org.found === true) {
      org.match('#Organization of the? @titleCase').tagSafe('Organization', 'org-of-place');
      org.match('#Organization #Country').tag('Organization', 'org-country');
      org.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org');
      org.match('#TitleCase #Organization').ifNo('@hasComma').tag('Organization', 'titlecase-org');
    }

    var plural = noun["if"]('#Plural');

    if (plural.found === true) {
      //some pressing issues
      plural.match('some [#Verb] #Plural').tag('Noun', 'correction-determiner6'); //this rocks

      noun.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs');
    }
  } //acronyms


  var acronym = doc["if"]('#Acronym');

  if (acronym.found === true) {
    acronym.match('the [#Acronym]').notIf('(iou|fomo|yolo|diy|dui|nimby)').tag('Organization', 'the-acronym');
    acronym.match('#Acronym').match('#Possessive').tag('Organization', 'possessive-acronym');
  } //possessives


  var poss = doc["if"]('#Possessive');

  if (poss.found === true) {
    //my buddy
    poss.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name'); //spencer kelly's

    poss.match('#FirstName #Acronym? #Possessive').ifNo('@hasComma').match('#FirstName #Acronym? #LastName').tag('Possessive'); //Super Corp's fundraiser

    poss.match('#Organization+ #Possessive').ifNo('@hasComma').tag('Possessive'); //Los Angeles's fundraiser

    poss.match('#Place+ #Possessive').ifNo('@hasComma').tag('Possessive'); //her polling

    poss.match('#Possessive [#Verb]').tag('Noun', 'correction-possessive');
  }

  return doc;
};

module.exports = fixNouns;

},{}],37:[function(_dereq_,module,exports){
"use strict";

var maybeNoun = '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)';
var maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)';
var maybeAdj = '(misty|rusty|dusty|rich|randy)';
var maybeDate = '(april|june|may|jan|august|eve)';
var maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)';

var fixPerson = function fixPerson(doc) {
  // clues from honorifics
  var hon = doc["if"]('#Honorific');

  if (hon.found === true) {
    //mr Putin
    doc.match('(mr|mrs|ms|dr) (#TitleCase|#Possessive)+').tag('#Person', 'mr-putin'); //mr X

    hon.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase'); //remove single 'mr'

    hon.match('^#Honorific$').unTag('Person', 'single-honorific'); //first general..

    hon.match('[(1st|2nd|first|second)] #Honorific').tag('Honorific', 'ordinal-honorific');
  } //methods requiring a titlecase


  var title = doc["if"]('#TitleCase');

  if (title.found === true) {
    title.match('#Acronym #TitleCase').tagSafe('#Person', 'acronym-titlecase'); //ludwig van beethovan

    title.match('#TitleCase (van|al|bin) #TitleCase').tagSafe('Person', 'titlecase-van-titlecase'); //jose de Sucre

    title.match('#TitleCase (de|du) la? #TitleCase').tagSafe('Person', 'titlecase-van-titlecase'); //pope francis

    title.match('(lady|queen|sister) #TitleCase').ifNo('#Date').ifNo('#Honorific').tag('#FemaleName', 'lady-titlecase');
    title.match('(king|pope|father) #TitleCase').ifNo('#Date').tag('#MaleName', 'poe'); // jean Foobar

    title.match(maybeNoun + ' #Acronym? #TitleCase').tagSafe('Person', 'ray-smith'); // rob Foobar

    title.match(maybeVerb + ' #Acronym? #TitleCase').tag('Person', 'rob-smith'); // rusty Foobar

    title.match(maybeAdj + ' #Acronym? #TitleCase').tag('Person', 'rusty-smith'); // june Foobar

    title.match(maybeDate + ' #Acronym? (#TitleCase && !#Month)').tagSafe('Person', 'june-smith');
  }

  var person = doc["if"]('#Person');

  if (person.found === true) {
    //Frank jr
    person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific'); //peter II

    person.match('#Person #Person the? #RomanNumeral').tag('Person', 'roman-numeral'); //'Professor Fink', 'General McCarthy'

    person.match('#Honorific #Person').tag('Person', 'Honorific-Person'); // 'john E rockefeller'

    person.match('#FirstName [/^[^aiurck]$/]').tag(['Acronym', 'Person'], 'john-e'); //Doctor john smith jr

    person.match('#Honorific #Person').tag('Person', 'honorific-person'); //general pearson

    person.match('[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person').tag('Honorific', 'ambg-honorifics'); //Morgan Shlkjsfne

    title.match('#Person #TitleCase').match('#TitleCase #Noun').tagSafe('Person', 'person-titlecase'); //a bunch of ambiguous first names
    //Nouns: 'viola' or 'sky'

    var ambigNoun = person["if"](maybeNoun);

    if (ambigNoun.found === true) {
      // ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']').tag('Noun', 'the-ray')
      ambigNoun.match(maybeNoun + ' #Person').tagSafe('Person', 'ray-smith');
    } //Verbs: 'pat' or 'wade'


    var ambigVerb = person["if"](maybeVerb);

    if (ambigVerb === true) {
      ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']').tag('Verb', 'would-mark');
      ambigVerb.match(maybeVerb + ' #Person').tag('Person', 'rob-smith');
    } //Adjectives: 'rusty' or 'rich'


    var ambigAdj = person["if"](maybeAdj);

    if (ambigAdj.found === true) {
      ambigAdj.match('#Adverb [' + maybeAdj + ']').tag('Adjective', 'really-rich');
      ambigAdj.match(maybeAdj + ' #Person').tag('Person', 'randy-smith');
    } //Dates: 'june' or 'may'


    var ambigDate = person["if"](maybeDate);

    if (ambigDate.found === true) {
      ambigDate.match(String(maybeDate) + ' #Person').tagSafe('Person', 'june-smith');
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']').tagSafe('Date', 'in-june');
      ambigDate.match(maybeDate + ' (#Date|#Value)').tagSafe('Date', 'june-5th');
    } //Places: paris or syndey


    var ambigPlace = person["if"](maybePlace);

    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']').tagSafe('Place', 'in-paris');
      ambigPlace.match('[' + maybePlace + '] #Place').tagSafe('Place', 'paris-france'); // ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    } //this one is tricky


    var al = person["if"]('al');

    if (al.found === true) {
      al.match('al (#Person|#TitleCase)').tagSafe('#Person', 'al-borlen');
      al.match('#TitleCase al #TitleCase').tagSafe('#Person', 'arabic-al-arabic');
    }

    var firstName = person["if"]('#FirstName');

    if (firstName.found === true) {
      //ferdinand de almar
      firstName.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun'); //Osama bin Laden

      firstName.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun'); //John L. Foo

      firstName.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase'); //Andrew Lloyd Webber

      firstName.match('#FirstName #FirstName #TitleCase').tag('Person', 'firstname-firstname-titlecase'); //Mr Foo

      firstName.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase'); //peter the great

      firstName.match('#FirstName the #Adjective').tag('Person', 'determiner5'); //very common-but-ambiguous lastnames

      firstName.match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)').tag('#Person', 'firstname-maybe'); //John Foo

      firstName.match('#FirstName #TitleCase #TitleCase?').match('#Noun+').tag('Person', 'firstname-titlecase'); //Joe K. Sombrero

      firstName.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', 'n-acro-noun').lastTerm().tag('#LastName', 'n-acro-noun'); // Dwayne 'the rock' Johnson

      firstName.match('#FirstName [#Determiner #Noun] #LastName').tag('#NickName', 'first-noun-last').tag('#Person', 'first-noun-last'); //john bodego's

      firstName.match('#FirstName (#Singular|#Possessive)').ifNo('(#Date|#Pronoun|#NickName)').tag('#Person', 'first-possessive').lastTerm().tag('#LastName', 'first-possessive'); // Firstname x (dangerous)

      var tmp = firstName.match('#FirstName (#Noun|#TitleCase)').ifNo('^#Possessive').ifNo('#ClauseEnd .').ifNo('#Pronoun');
      tmp.lastTerm().tag('#LastName', 'firstname-noun');
    }

    var lastName = person["if"]('#LastName');

    if (lastName.found === true) {
      //is foo Smith
      lastName.match('#Copula [(#Noun|#PresentTense)] #LastName').tag('#FirstName', 'copula-noun-lastname'); // x Lastname

      lastName.match('[#Noun] #LastName').canBe('#FirstName').tag('#FirstName', 'noun-lastname'); //ambiguous-but-common firstnames

      lastName.match('[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName').tag('#FirstName', 'maybe-lastname'); //Jani K. Smith

      lastName.match('(#TitleCase|#Singular) #Acronym? #LastName').ifNo('#Date').tag('#Person', 'title-acro-noun').lastTerm().tag('#LastName', 'title-acro-noun');
    }
  }

  return doc;
};

module.exports = fixPerson;

},{}],38:[function(_dereq_,module,exports){
"use strict";

//Determiner-signals
var fixThe = function fixThe(doc) {
  var det = doc["if"]('#Determiner');

  if (det.found === true) {
    var adj = det["if"]('#Adjective');

    if (adj.found) {
      //the nice swim
      adj.match('(the|this|those|these) #Adjective [#Verb]').tag('Noun', 'the-adj-verb'); // the truly nice swim

      adj.match('(the|this|those|these) #Adverb #Adjective [#Verb]').tag('Noun', 'correction-determiner4'); //the orange is

      adj.match('#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)').tag('Noun', 'the-adj-2'); //the orange.

      adj.match('#Determiner #Adjective$').notIf('(#Comparative|#Superlative)').terms(1).tag('Noun', 'the-adj-1');
    }

    var inf = det["if"]('#Infinitive');

    if (inf.found) {
      // a stream runs
      inf.match('(the|this|a|an) [#Infinitive] #Adverb? #Verb').tag('Noun', 'correction-determiner5'); //the test string

      inf.match('#Determiner [#Infinitive] #Noun').tag('Noun', 'correction-determiner7'); //by a bear.

      inf.match('#Determiner [#Infinitive]$').tag('Noun', 'a-inf');
    } //the wait to vote


    det.match('(the|this) [#Verb] #Preposition .').tag('Noun', 'correction-determiner1'); //a sense of

    det.match('#Determiner [#Verb] of').tag('Noun', 'the-verb-of'); //the threat of force

    det.match('#Determiner #Noun of [#Verb]').tag('Noun', 'noun-of-noun'); //a close

    det.match('#Determiner #Adverb? [close]').tag('Adjective', 'a-close'); //the western line

    det.match('#Determiner [(western|eastern|northern|southern|central)] #Noun').tag('Noun', 'western-line'); //the swim

    det.match('(the|those|these) [(#Infinitive|#PresentTense|#PastTense)]').tag('Noun', 'correction-determiner2');
  }

  var an = doc["if"]('(a|an)');

  if (an.found === true) {
    //a staggering cost
    an.match('(a|an) [#Gerund]').tag('Adjective', 'correction-a|an'); //did a 900, paid a 20

    an.match('#Verb (a|an) [#Value]').tag('Singular', 'a-value'); //a tv show

    an.match('(a|an) #Noun [#Infinitive]').tag('Noun', 'a-noun-inf'); //a great run

    an.match('(a|an) #Adjective (#Infinitive|#PresentTense)').terms(2).tag('Noun', 'correction-a|an2'); //'a/an' can mean 1 - "a hour"

    an.match('[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)').ifNo('#Plural').tag('Value', 'a-is-one');
  }

  return doc;
};

module.exports = fixThe;

},{}],39:[function(_dereq_,module,exports){
"use strict";

var units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'; //

var fixValue = function fixValue(doc) {
  var val = doc["if"]('#Value');

  if (val.found === true) {
    //1 800 PhoneNumber
    val.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value'); //(454) 232-9873

    val.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber'); //three trains

    val.match('#Value [#PresentTense]').tag('Plural', 'value-presentTense'); //money

    val.match('#Value+ #Currency').tag('Money', 'value-currency').lastTerm().tag('Unit', 'money-unit');
  } //5 kg.


  val.match('#Value #Abbreviation').tag('Value', 'value-abbr'); //seven point five

  val.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value'); //minus 7

  val.match('(minus|negative) #Value').tag('Value', 'minus-value'); // ten grand

  val.match('#Value grand').tag('Value', 'value-grand'); //quarter million

  val.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal'); //eg 'trillion'

  var mult = val["if"](units);

  if (mult.found === true) {
    mult.match('a #Value').tag('Value', 'a-value'); //?
    // mult.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready

    mult.match("".concat(units, " and #Value")).tag('Value', 'magnitude-and-value');
  }

  return doc;
};

module.exports = fixValue;

},{}],40:[function(_dereq_,module,exports){
"use strict";

var advb = '(#Adverb|not)+?'; //

var fixVerb = function fixVerb(doc) {
  var vb = doc["if"]('#Verb');

  if (vb.found) {
    vb.match('[(do|does|will|have|had)] (not|#Adverb)? #Verb').tag('Auxiliary', 'have-had'); //still make

    vb.match('[still] #Verb').tag('Adverb', 'still-verb'); //'u' as pronoun

    vb.match('[u] #Verb').tag('Pronoun', 'u-pronoun-1'); //is no walk

    vb.match('is no [#Verb]').tag('Noun', 'is-no-verb'); //different views than

    vb.match('[#Verb] than').tag('Noun', 'correction'); // smoked poutine is

    vb.match('[#PastTense] #Singular is').tag('#Adjective', 'smoked-poutine'); // baked onions are

    vb.match('[#PastTense] #Plural are').tag('#Adjective', 'baked-onions'); // goes to sleep

    vb.match('(go|goes|went) to [#Infinitive]').tag('#Noun', 'goes-to-verb'); //there are reasons

    vb.match('there (are|were) #Adjective? [#PresentTense]').tag('Plural', 'there-are'); //jack seems guarded

    vb.match('#Singular (seems|appears) #Adverb? [#PastTense$]').tag('Adjective', 'seems-filled'); //fall over

    vb.match('#PhrasalVerb [#PhrasalVerb]').tag('Particle', 'phrasal-particle'); //went to sleep
    // vb.match('#Verb to #Verb').lastTerm().tag('Noun', 'verb-to-verb');
    //been walking

    vb.match("(be|been) ".concat(advb, " #Gerund")).not('#Verb$').tag('Auxiliary', 'be-walking'); // directive verb - 'use reverse'

    vb.match('(try|use|attempt|build|make) #Verb').ifNo('(@hasComma|#Negative|#Copula|will|be)').lastTerm().tag('#Noun', 'do-verb'); //infinitive verbs suggest plural nouns - 'XYZ walk to the store'
    // r.match(`#Singular+ #Infinitive`).match('#Singular+').tag('Plural', 'infinitive-make-plural');

    var modal = vb["if"]('(#Modal|did|had|has)');

    if (modal.found === true) {
      //support a splattering of auxillaries before a verb
      modal.match("(has|had) ".concat(advb, " #PastTense")).not('#Verb$').tag('Auxiliary', 'had-walked'); //would walk

      modal.match("(#Modal|did) ".concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'modal-verb'); //would have had

      modal.match("#Modal ".concat(advb, " have ").concat(advb, " had ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-have'); //would be walking

      modal.match("#Modal ".concat(advb, " be ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-be'); //would been walking

      modal.match("(#Modal|had|has) ".concat(advb, " been ").concat(advb, " #Verb")).not('#Verb$').tag('Auxiliary', 'would-be');
    }

    var copula = vb["if"]('#Copula');

    if (copula.found === true) {
      //was walking
      copula.match("#Copula ".concat(advb, " #Gerund")).not('#Verb$').tag('Auxiliary', 'copula-walking'); //is mark hughes

      copula.match('#Copula [#Infinitive] #Noun').tag('Noun', 'is-pres-noun'); //

      copula.match('[#Infinitive] #Copula').tag('Noun', 'inf-copula'); //sometimes not-adverbs

      copula.match('#Copula [(just|alone)]$').tag('Adjective', 'not-adverb'); //jack is guarded

      copula.match('#Singular is #Adverb? [#PastTense$]').tag('Adjective', 'is-filled'); //is eager to go

      copula.match('#Copula [#Adjective to] #Verb').tag('Verb', 'adj-to'); //sometimes adverbs - 'pretty good','well above'

      copula.match('#Copula (pretty|dead|full|well) (#Adjective|#Noun)').ifNo('@hasComma').tag('#Copula #Adverb #Adjective', 'sometimes-adverb');
    } //Gerund - 'walking'


    var gerund = vb["if"]('#Gerund');

    if (gerund.found === true) {
      //walking is cool
      gerund.match('[#Gerund] #Adverb? not? #Copula').tag('Activity', 'gerund-copula'); //walking should be fun

      gerund.match('[#Gerund] #Modal').tag('Activity', 'gerund-modal'); //running-a-show

      gerund.match('#Gerund #Determiner [#Infinitive]').tag('Noun', 'running-a-show'); //setting records
      // doc.match('#Gerund [#PresentTense]').tag('Plural', 'setting-records');
    } //'will be'


    var willBe = vb["if"]('will #Adverb? not? #Adverb? be');

    if (willBe.found === true) {
      //will be running (not copula
      if (willBe.has('will #Adverb? not? #Adverb? be #Gerund') === false) {
        //tag it all
        willBe.match('will not? be').tag('Copula', 'will-be-copula'); //for more complex forms, just tag 'be'

        willBe.match('will #Adverb? not? #Adverb? be #Adjective').match('be').tag('Copula', 'be-copula');
      }
    }
  } //question words


  var m = doc["if"]('(who|what|where|why|how|when)');

  if (m.found) {
    //the word 'how'
    m.match('^how').tag('QuestionWord', 'how-question');
    m.match('[how] (#Determiner|#Copula|#Modal|#PastTense)').tag('QuestionWord', 'how-is'); // //the word 'which'

    m.match('^which').tag('QuestionWord', 'which-question');
    m.match('[which] . (#Noun)+ #Pronoun').tag('QuestionWord', 'which-question2');
    m.match('which').tag('QuestionWord', 'which-question3'); //how he is driving

    m.match('[#QuestionWord] #Noun #Copula #Adverb? (#Verb|#Adjective)').unTag('QuestionWord').tag('Conjunction', 'how-he-is-x'); //when i go fishing

    m.match('#QuestionWord #Noun #Adverb? #Infinitive not? #Gerund').unTag('QuestionWord').tag('Conjunction', 'when i go fishing');
  }

  return doc;
};

module.exports = fixVerb;

},{}],41:[function(_dereq_,module,exports){
"use strict";

var fixMisc = _dereq_('./fixMisc');

var fixDeterminer = _dereq_('./fixThe');

var fixNouns = _dereq_('./fixNouns');

var fixPerson = _dereq_('./fixPerson');

var fixVerb = _dereq_('./fixVerb');

var fixAdjective = _dereq_('./fixAdjective');

var fixValue = _dereq_('./fixValue');

var fixDates = _dereq_('./fixDates'); // det: 131.338ms
// verb: 100.828ms
// dates: 80.874ms
// person: 66.054ms
// nouns: 51.340ms
// adj: 19.760ms
// value: 12.950ms
// misc: 43.359ms
//sequence of match-tag statements to correct mis-tags


var corrections = function corrections(doc) {
  // console.time('det')
  fixDeterminer(doc); //27
  // console.timeEnd('det')
  // console.time('nouns')

  fixNouns(doc); //30
  // // console.timeEnd('nouns')
  // // console.time('person')

  fixPerson(doc); //58
  // // console.timeEnd('person')
  // // console.time('verb')

  fixVerb(doc); //50
  // // console.timeEnd('verb')
  // // console.time('adj')

  fixAdjective(doc); //8
  // // console.timeEnd('adj')
  // // console.time('value')

  fixValue(doc); //12
  // // console.timeEnd('value')
  // // console.time('dates')

  fixDates(doc); //92
  // // console.timeEnd('dates')
  // // console.time('misc')

  fixMisc(doc); //43
  // console.timeEnd('misc')

  return doc;
};

module.exports = corrections;

},{"./fixAdjective":33,"./fixDates":34,"./fixMisc":35,"./fixNouns":36,"./fixPerson":37,"./fixThe":38,"./fixValue":39,"./fixVerb":40}],42:[function(_dereq_,module,exports){
"use strict";

var init = _dereq_('./01-init');

var fallbacks = _dereq_('./02-fallbacks');

var contractions = _dereq_('./03-contractions');

var corrections = _dereq_('./04-correction');
/** POS-tag all terms in this document */


var tagger = function tagger(doc) {
  var terms = doc.termList(); // check against any known-words

  doc = init(doc, terms); // everything has gotta be something. ¯\_(:/)_/¯

  doc = fallbacks(doc, terms); // support "didn't" & "spencer's"

  doc = contractions(doc); //set our cache, to speed things up

  doc.cache(); // wiggle-around the results, so they make more sense

  doc = corrections(doc); //remove our cache
  // doc.uncache()
  // run any user-given tagger functions

  doc.world.taggers.forEach(function (fn) {
    fn(doc);
  });
  return doc;
};

module.exports = tagger;

},{"./01-init":16,"./02-fallbacks":25,"./03-contractions":32,"./04-correction":41}],43:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var methods = {
  misc: _dereq_('./methods'),
  selections: _dereq_('../Subset/_simple')
};

var _tagger = _dereq_('../02-tagger');

var tokenize = _dereq_('../01-tokenizer');

var extend = _dereq_('../Subset');
/** a parsed text object */


var Doc =
/*#__PURE__*/
function () {
  function Doc(list, from, world) {
    var _this = this;

    _classCallCheck(this, Doc);

    this.list = list; //quiet these properties in console.logs

    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from,
      writable: true
    }); //borrow some missing data from parent

    if (world === undefined && from !== undefined) {
      world = from.world;
    } //'world' getter


    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world // writable: true, //todo: add me?

    }); //fast-scans for our data
    //'found' getter

    Object.defineProperty(this, 'found', {
      get: function get() {
        return _this.list.length > 0;
      }
    }); //'length' getter

    Object.defineProperty(this, 'length', {
      get: function get() {
        return _this.list.length;
      }
    }); // this is way easier than .constructor.name...

    Object.defineProperty(this, 'isA', {
      get: function get() {
        return 'Doc';
      }
    });
  }
  /** run part-of-speech tagger on all results*/


  _createClass(Doc, [{
    key: "tagger",
    value: function tagger() {
      return _tagger(this);
    }
    /** pool is stored on phrase objects */

  }, {
    key: "pool",
    value: function pool() {
      if (this.list.length > 0) {
        return this.list[0].pool;
      }

      return this.all().list[0].pool;
    }
  }]);

  return Doc;
}();
/** create a new Document object */


Doc.prototype.buildFrom = function (list) {
  list = list.map(function (p) {
    return p.clone(true);
  }); // new this.constructor()

  var doc = new Doc(list, this, this.world);
  return doc;
};
/** create a new Document from plaintext. */


Doc.prototype.fromText = function (str) {
  var list = tokenize.fromText(str, this.world, this.pool());
  return this.buildFrom(list);
};

Object.assign(Doc.prototype, methods.misc);
Object.assign(Doc.prototype, methods.selections); //add sub-classes

extend(Doc); //aliases

var aliases = {
  untag: 'unTag',
  and: 'match',
  notIf: 'ifNo',
  only: 'if',
  onlyIf: 'if'
};
Object.keys(aliases).forEach(function (k) {
  return Doc.prototype[k] = Doc.prototype[aliases[k]];
});
module.exports = Doc;

},{"../01-tokenizer":6,"../02-tagger":42,"../Subset":112,"../Subset/_simple":111,"./methods":54}],44:[function(_dereq_,module,exports){
"use strict";

/* break-down a match expression into this:
{
  word:'',
  tag:'',
  regex:'',

  start:false,
  end:false,
  negative:false,
  anything:false,
  greedy:false,
  optional:false,

  capture:false,
  choices:[],
}
*/
var hasMinMax = /\{([0-9]+,?[0-9]*)\}/;
var andSign = /&&/;

var titleCase = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var end = function end(str) {
  return str[str.length - 1];
};

var start = function start(str) {
  return str[0];
};

var stripStart = function stripStart(str) {
  return str.substr(1);
};

var stripEnd = function stripEnd(str) {
  return str.substr(0, str.length - 1);
};

var stripBoth = function stripBoth(str) {
  str = stripStart(str);
  str = stripEnd(str);
  return str;
}; //


var parseToken = function parseToken(w) {
  var obj = {}; //collect any flags (do it twice)

  for (var i = 0; i < 2; i += 1) {
    //back-flags
    if (end(w) === '+') {
      obj.greedy = true;
      w = stripEnd(w);
    }

    if (w !== '*' && end(w) === '*' && w !== '\\*') {
      obj.greedy = true;
      w = stripEnd(w);
    }

    if (end(w) === '?') {
      obj.optional = true;
      w = stripEnd(w);
    }

    if (end(w) === '$') {
      obj.end = true;
      w = stripEnd(w);
    } //front-flags


    if (start(w) === '^') {
      obj.start = true;
      w = stripStart(w);
    }

    if (start(w) === '!') {
      obj.negative = true;
      w = stripStart(w);
    } //wrapped-flags


    if (start(w) === '(' && end(w) === ')') {
      // support (one && two)
      if (andSign.test(w)) {
        obj.choices = w.split(andSign);
        obj.operator = 'and';
      } else {
        obj.choices = w.split('|');
        obj.operator = 'or';
      } //remove '(' and ')'


      obj.choices[0] = stripStart(obj.choices[0]);
      var last = obj.choices.length - 1;
      obj.choices[last] = stripEnd(obj.choices[last]); // clean up the results

      obj.choices = obj.choices.map(function (s) {
        return s.trim();
      });
      obj.choices = obj.choices.filter(function (s) {
        return s;
      }); //recursion alert!

      obj.choices = obj.choices.map(parseToken);
      w = '';
    } //capture group (this one can span multiple-terms)


    if (start(w) === '[' || end(w) === ']') {
      obj.capture = true;
      w = w.replace(/^\[/, '');
      w = w.replace(/\]$/, '');
    } //regex


    if (start(w) === '/' && end(w) === '/') {
      w = stripBoth(w);
      obj.regex = new RegExp(w);
      return obj;
    } //soft-match


    if (start(w) === '~' && end(w) === '~') {
      w = stripBoth(w);
      obj.soft = true;
      obj.word = w;
      return obj;
    }
  } // support #Tag{0,9}


  if (hasMinMax.test(w) === true) {
    w = w.replace(hasMinMax, function (a, b) {
      var arr = b.split(/,/g);

      if (arr.length === 1) {
        // '{3}'	Exactly three times
        obj.min = Number(arr[0]);
        obj.max = Number(arr[0]);
      } else {
        // '{2,4}' Two to four times
        // '{3,}' Three or more times
        obj.min = Number(arr[0]);
        obj.max = Number(arr[1] || 999);
      }

      obj.greedy = true;
      return '';
    });
  } //do the actual token content


  if (start(w) === '#') {
    obj.tag = stripStart(w);
    obj.tag = titleCase(obj.tag);
    return obj;
  } //dynamic function on a term object


  if (start(w) === '@') {
    obj.method = stripStart(w);
    return obj;
  }

  if (w === '.') {
    obj.anything = true;
    return obj;
  } //support alone-astrix


  if (w === '*') {
    obj.anything = true;
    obj.greedy = true;
    obj.optional = true;
    return obj;
  }

  if (w) {
    //somehow handle encoded-chars?
    w = w.replace('\\*', '*');
    w = w.replace('\\.', '.');
    obj.word = w.toLowerCase();
  }

  return obj;
};

module.exports = parseToken;

},{}],45:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var parseToken = _dereq_('./parseToken');

var isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}; //split-up by (these things)


var byParentheses = function byParentheses(str) {
  var arr = str.split(/([\^\[\!]*\(.*?\)[?+*]*\]?\$?)/);
  arr = arr.map(function (s) {
    return s.trim();
  });
  return arr;
};

var byWords = function byWords(arr) {
  var words = [];
  arr.forEach(function (a) {
    //keep brackets lumped together
    if (/^[[^_/]?\(/.test(a[0])) {
      words.push(a);
      return;
    }

    var list = a.split(' ');
    list = list.filter(function (w) {
      return w;
    });
    words = words.concat(list);
  });
  return words;
}; //turn an array into a 'choices' list


var byArray = function byArray(arr) {
  return [{
    choices: arr.map(function (s) {
      return {
        word: s
      };
    })
  }];
};

var postProcess = function postProcess(tokens) {
  //ensure there's only one consecutive capture group.
  var count = tokens.filter(function (t) {
    return t.capture === true;
  }).length;

  if (count > 1) {
    var captureArr = tokens.map(function (t) {
      return t.capture;
    });
    var first = captureArr.indexOf(true);
    var last = captureArr.length - 1 - captureArr.reverse().indexOf(true); //'fill in' capture groups between start-end

    for (var i = first; i < last; i++) {
      tokens[i].capture = true;
    }
  }

  return tokens;
};

var fromDoc = function fromDoc(doc) {
  if (!doc || !doc.list || !doc.list[0]) {
    return [];
  }

  var ids = [];
  doc.list.forEach(function (p) {
    p.terms().forEach(function (t) {
      ids.push({
        id: t.id
      });
    });
  });
  return [{
    choices: ids,
    greedy: true
  }];
};
/** parse a match-syntax string into json */


var syntax = function syntax(input) {
  // fail-fast
  if (input === null || input === undefined || input === '') {
    return [];
  } //try to support a ton of different formats:


  if (_typeof(input) === 'object') {
    if (isArray(input)) {
      if (input.length === 0 || !input[0]) {
        return [];
      } //is it a pre-parsed reg-list?


      if (_typeof(input[0]) === 'object') {
        return input;
      } //support a flat array of normalized words


      if (typeof input[0] === 'string') {
        return byArray(input);
      }
    } //support passing-in a compromise object as a match


    if (input && input.isA === 'Doc') {
      return fromDoc(input);
    }

    return [];
  }

  if (typeof input === 'number') {
    input = String(input); //go for it?
  }

  var tokens = byParentheses(input);
  tokens = byWords(tokens);
  tokens = tokens.map(parseToken); //clean up anything weird

  tokens = postProcess(tokens); // console.log(JSON.stringify(tokens, null, 2))

  return tokens;
};

module.exports = syntax;

},{"./parseToken":44}],46:[function(_dereq_,module,exports){
"use strict";

// const cache = require('./_setCache')

/** return the root, first document */
exports.all = function () {
  return this.parents()[0] || this;
};
/** return the previous result */


exports.parent = function () {
  if (this.from) {
    return this.from;
  }

  return this;
};
/**  return a list of all previous results */


exports.parents = function (n) {
  var arr = [];

  var addParent = function addParent(doc) {
    if (doc.from) {
      arr.push(doc.from);
      addParent(doc.from);
    }
  };

  addParent(this);
  arr = arr.reverse();

  if (typeof n === 'number') {
    return arr[n];
  }

  return arr;
};
/** deep-copy the document, so that no references remain */


exports.clone = function (doShallow) {
  var list = this.list.map(function (ts) {
    return ts.clone(doShallow);
  });
  var tmp = this.buildFrom(list);
  return tmp;
};
/** how many seperate terms does the document have? */


exports.wordCount = function () {
  return this.list.reduce(function (count, p) {
    count += p.wordCount();
    return count;
  }, 0);
};

exports.wordcount = exports.wordCount;
/** turn on logging for decision-debugging */
// exports.verbose = function(bool) {
//   if (bool === undefined) {
//     bool = true
//   }
//   this.world.verbose = bool
// }

/** freeze the current state of the document, for speed-purposes*/

exports.cache = function (options) {
  var _this = this;

  options = options || {};
  this.list.forEach(function (p) {
    var words = {};
    p.cache = p.cache || {};
    p.cache.terms = p.cache.terms || p.terms(); // cache all the terms

    p.cache.terms.forEach(function (t) {
      words[t.clean] = true;
      words[t.reduced] = true;
      words[t.text.toLowerCase()] = true;

      if (t.implicit) {
        words[t.implicit] = true;
      }

      if (t.root) {
        words[t.root] = true;
      }

      if (t.alias !== undefined) {
        words = Object.assign(words, t.alias);
      }

      if (options.root) {
        t.setRoot(_this.world);
        words[t.root] = true;
      }
    });
    delete words[''];
    p.cache.words = words;
  });
  return this;
};
/** un-freezes the current state of the document, so it may be transformed */


exports.uncache = function () {
  this.list.forEach(function (p) {
    p.cache = {};
  }); // do parents too?

  this.parents().forEach(function (doc) {
    doc.list.forEach(function (p) {
      p.cache = {};
    });
  });
  return this;
};

},{}],47:[function(_dereq_,module,exports){
"use strict";

/** use only the first result(s) */
exports.first = function (n) {
  if (n === undefined) {
    return this.get(0);
  }

  return this.slice(0, n);
};
/** use only the last result(s) */


exports.last = function (n) {
  if (n === undefined) {
    return this.get(this.list.length - 1);
  }

  var end = this.list.length;
  return this.slice(end - n, end);
};
/** grab a given subset of the results*/


exports.slice = function (start, end) {
  var list = this.list.slice(start, end);
  return this.buildFrom(list);
};
/* grab nth result */


exports.eq = function (n) {
  var p = this.list[n];

  if (p === undefined) {
    return this.buildFrom([]);
  }

  return this.buildFrom([p]);
};

exports.get = exports.eq;
/** grab term[0] for every match */

exports.firstTerm = function () {
  return this.match('^.');
};
/** grab the last term for every match  */


exports.lastTerm = function () {
  return this.match('.$');
};
/** return a flat array of term objects */


exports.termList = function (num) {
  var arr = []; //'reduce' but faster

  for (var i = 0; i < this.list.length; i++) {
    var terms = this.list[i].terms();

    for (var o = 0; o < terms.length; o++) {
      arr.push(terms[o]); //support .termList(4)

      if (num !== undefined && arr[num] !== undefined) {
        return arr[num];
      }
    }
  }

  return arr;
};

},{}],48:[function(_dereq_,module,exports){
"use strict";

var parseSyntax = _dereq_('../match/syntax');
/** return a new Doc, with this one as a parent */


exports.match = function (reg) {
  //parse-up the input expression
  var regs = parseSyntax(reg);

  if (regs.length === 0) {
    return this.buildFrom([]);
  } //try expression on each phrase


  var matches = this.list.reduce(function (arr, p) {
    return arr.concat(p.match(regs));
  }, []);
  return this.buildFrom(matches);
};
/** return all results except for this */


exports.not = function (reg) {
  //parse-up the input expression
  var regs = parseSyntax(reg); //if it's empty, return them all!

  if (regs.length === 0) {
    return this;
  } //try expression on each phrase


  var matches = this.list.reduce(function (arr, p) {
    return arr.concat(p.not(regs));
  }, []);
  return this.buildFrom(matches);
};
/** return only the first match */


exports.matchOne = function (reg) {
  var regs = parseSyntax(reg);

  for (var i = 0; i < this.list.length; i++) {
    var match = this.list[i].match(regs);
    return this.buildFrom(match);
  }

  return this.buildFrom([]);
};
/** return each current phrase, only if it contains this match */


exports["if"] = function (reg) {
  var regs = parseSyntax(reg);
  var found = this.list.filter(function (p) {
    return p.match(regs).length > 0;
  });
  return this.buildFrom(found);
};
/** Filter-out any current phrases that have this match*/


exports.ifNo = function (reg) {
  var regs = parseSyntax(reg);
  var found = this.list.filter(function (p) {
    return p.match(regs).length === 0;
  });
  return this.buildFrom(found);
};
/**Return a boolean if this match exists */


exports.has = function (reg) {
  var regs = parseSyntax(reg);
  return this.list.some(function (p) {
    return p.has(regs) === true;
  });
};
/** match any terms after our matches, within the sentence */


exports.lookAhead = function (reg) {
  // find everything afterwards, by default
  if (!reg) {
    reg = '.*';
  }

  var regs = parseSyntax(reg);
  var matches = [];
  this.list.forEach(function (p) {
    matches = matches.concat(p.lookAhead(regs));
  });
  matches = matches.filter(function (p) {
    return p;
  });
  return this.buildFrom(matches);
};

exports.lookAfter = exports.lookAhead;
/** match any terms before our matches, within the sentence */

exports.lookBehind = function (reg) {
  // find everything afterwards, by default
  if (!reg) {
    reg = '.*';
  }

  var regs = parseSyntax(reg);
  var matches = [];
  this.list.forEach(function (p) {
    matches = matches.concat(p.lookBehind(regs));
  });
  matches = matches.filter(function (p) {
    return p;
  });
  return this.buildFrom(matches);
};

exports.lookBefore = exports.lookBehind;
/** return all terms before a match, in each phrase */

exports.before = function (reg) {
  var regs = parseSyntax(reg); //only the phrases we care about

  var phrases = this["if"](regs).list;
  var befores = phrases.map(function (p) {
    var ids = p.terms().map(function (t) {
      return t.id;
    }); //run the search again

    var m = p.match(regs)[0];
    var index = ids.indexOf(m.start); //nothing is before a first-term match

    if (index === 0 || index === -1) {
      return null;
    }

    return p.buildFrom(p.start, index);
  });
  befores = befores.filter(function (p) {
    return p !== null;
  });
  return this.buildFrom(befores);
};
/** return all terms after a match, in each phrase */


exports.after = function (reg) {
  var regs = parseSyntax(reg); //only the phrases we care about

  var phrases = this["if"](regs).list;
  var befores = phrases.map(function (p) {
    var terms = p.terms();
    var ids = terms.map(function (t) {
      return t.id;
    }); //run the search again

    var m = p.match(regs)[0];
    var index = ids.indexOf(m.start); //skip if nothing is after it

    if (index === -1 || !terms[index + m.length]) {
      return null;
    } //create the new phrase, after our match.


    var id = terms[index + m.length].id;
    var len = p.length - index - m.length;
    return p.buildFrom(id, len);
  });
  befores = befores.filter(function (p) {
    return p !== null;
  });
  return this.buildFrom(befores);
};

},{"../match/syntax":45}],49:[function(_dereq_,module,exports){
"use strict";

var setTag = _dereq_('./_setTag');
/** Give all terms the given tag */


exports.tag = function (tags, why) {
  if (!tags) {
    return this;
  }

  setTag(tags, this, false, why);
  return this;
};
/** Only apply tag to terms if it is consistent with current tags */


exports.tagSafe = function (tags, why) {
  if (!tags) {
    return this;
  }

  setTag(tags, this, true, why);
  return this;
};
/** Remove this term from the given terms */


exports.unTag = function (tags, why) {
  var _this = this;

  this.list.forEach(function (p) {
    p.terms().forEach(function (t) {
      return t.unTag(tags, why, _this.world);
    });
  });
  return this;
};
/** return only the terms that can be this tag*/


exports.canBe = function (tag) {
  if (!tag) {
    return this;
  }

  var world = this.world;
  var matches = this.list.reduce(function (arr, p) {
    return arr.concat(p.canBe(tag, world));
  }, []);
  return this.buildFrom(matches);
};

},{"./_setTag":53}],50:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* run each phrase through a function, and create a new document */
exports.map = function (fn) {
  var _this = this;

  if (!fn) {
    return this;
  }

  var list = this.list.map(function (p, i) {
    var doc = _this.buildFrom([p]);

    doc.from = null; //it's not a child/parent

    var res = fn(doc, i);

    if (res.list && res.list[0]) {
      return res.list[0];
    }

    return res;
  });

  if (list.length === 0) {
    return this.buildFrom(list);
  } // if it is not a list of Phrase objects, then don't try to make a Doc object


  if (_typeof(list[0]) !== 'object' || list[0].isA !== 'Phrase') {
    return list;
  }

  return this.buildFrom(list);
};
/** run a function on each phrase */


exports.forEach = function (fn, detachParent) {
  var _this2 = this;

  if (!fn) {
    return this;
  }

  this.list.forEach(function (p, i) {
    var sub = _this2.buildFrom([p]); // if we're doing fancy insertions, we may want to skip updating the parent each time.


    if (detachParent === true) {
      sub.from = null; //
    } // let len
    // console.log(sub.from.list[0].text())


    fn(sub, i); // console.log(sub.from.list[0].text())
  });
  return this;
};
/** return only the phrases that return true */


exports.filter = function (fn) {
  var _this3 = this;

  if (!fn) {
    return this;
  }

  var list = this.list.filter(function (p, i) {
    var doc = _this3.buildFrom([p]);

    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });
  return this.buildFrom(list);
};
/** return a document with only the first phrase that matches */


exports.find = function (fn) {
  var _this4 = this;

  if (!fn) {
    return this;
  }

  var phrase = this.list.find(function (p, i) {
    var doc = _this4.buildFrom([p]);

    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });

  if (phrase) {
    return this.buildFrom([phrase]);
  }

  return undefined;
};
/** return true or false if there is one matching phrase */


exports.some = function (fn) {
  var _this5 = this;

  if (!fn) {
    return this;
  }

  return this.list.some(function (p, i) {
    var doc = _this5.buildFrom([p]);

    doc.from = null; //it's not a child/parent

    return fn(doc, i);
  });
};
/** sample a subset of the results */


exports.random = function (n) {
  if (!this.found) {
    return this;
  }

  var r = Math.floor(Math.random() * this.list.length);

  if (n === undefined) {
    var list = [this.list[r]];
    return this.buildFrom(list);
  } //prevent it from going over the end


  if (r + n > this.length) {
    r = this.length - n;
    r = r < 0 ? 0 : r;
  }

  return this.slice(r, r + n);
};
/** combine each phrase into a new data-structure */
// exports.reduce = function(fn, h) {
//   let list = this.list.reduce((_h, ts) => {
//     let doc = this.buildFrom([ts])
//     doc.from = null //it's not a child/parent
//     return fn(_h, doc)
//   }, h)
//   return this.buildFrom(list)
// }

},{}],51:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var tokenize = _dereq_('../../01-tokenizer/02-words'); // compare one term and one match


var doesMatch = function doesMatch(term, str) {
  if (str === '') {
    return false;
  }

  return term.reduced === str || term.implicit === str || term.root === str || term.text.toLowerCase() === str;
}; // is this lookup found in these terms?


var findStart = function findStart(arr, terms) {
  var _loop = function _loop(i) {
    if (doesMatch(terms[i], arr[0])) {
      if (arr.every(function (a, n) {
        return doesMatch(terms[i + n], a) === true;
      })) {
        return {
          v: terms[i].id
        };
      }
    }
  };

  //find the start
  for (var i = 0; i < terms.length; i++) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return false;
};
/** lookup an array of words or phrases */


exports.lookup = function (arr) {
  var _this = this;

  if (typeof arr === 'string') {
    arr = [arr];
  }

  var lookups = arr.map(function (str) {
    str = str.toLowerCase();
    var words = tokenize(str);
    words = words.map(function (s) {
      return s.trim();
    });
    return words;
  });
  this.cache();
  var found = []; // try each lookup

  lookups.forEach(function (a) {
    //try each phrase
    _this.list.forEach(function (p) {
      // cache-miss, skip.
      if (p.cache.words[a[0]] !== true) {
        return;
      } //we found a potential match


      var terms = p.terms();
      var id = findStart(a, terms);

      if (id !== false) {
        // create the actual phrase
        var phrase = p.buildFrom(id, a.length);
        found.push(phrase);
        return;
      }
    });
  });
  return this.buildFrom(found);
};

},{"../../01-tokenizer/02-words":4}],52:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var tagset = _dereq_('../../world/tags'); // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color


var reset = '\x1b[0m';

var padEnd = function padEnd(str, width) {
  str = str.toString();

  while (str.length < width) {
    str += ' ';
  }

  return str;
}; //cheaper than requiring chalk


var cli = {
  green: function green(str) {
    return '\x1b[32m' + str + reset;
  },
  red: function red(str) {
    return '\x1b[31m' + str + reset;
  },
  blue: function blue(str) {
    return '\x1b[34m' + str + reset;
  },
  magenta: function magenta(str) {
    return '\x1b[35m' + str + reset;
  },
  cyan: function cyan(str) {
    return '\x1b[36m' + str + reset;
  },
  yellow: function yellow(str) {
    return '\x1b[33m' + str + reset;
  },
  black: function black(str) {
    return '\x1b[30m' + str + reset;
  }
};

var tagString = function tagString(tags) {
  tags = tags.map(function (tag) {
    if (!tagset.hasOwnProperty(tag)) {
      return tag;
    }

    var c = tagset[tag].color || 'blue';
    return cli[c](tag);
  });
  return tags.join(', ');
}; //output some helpful stuff to the console


var debug = function debug(doc) {
  console.log(cli.blue('====='));
  doc.list.forEach(function (p) {
    console.log(cli.blue('  -----'));
    p.terms().forEach(function (t) {
      var tags = Object.keys(t.tags);
      var text = t.text || '-';

      if (t.implicit) {
        text = '[' + t.implicit + ']';
      }

      if ((typeof module === "undefined" ? "undefined" : _typeof(module)) !== undefined) {
        text = cli.yellow(text);
      }

      var word = "'" + text + "'";
      word = padEnd(word, 18);
      var str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags);
      console.log(str);
    });
  });
  console.log('');
  return doc;
};

module.exports = debug;

},{"../../world/tags":166}],53:[function(_dereq_,module,exports){
"use strict";

/** apply a tag, or tags to all terms */
var tagTerms = function tagTerms(tag, doc, safe, reason) {
  var tagList = [];

  if (typeof tag === 'string') {
    tagList = tag.split(' ');
  } // console.log(doc.parents().length)
  //do indepenent tags for each term:


  doc.list.forEach(function (p) {
    var terms = p.terms(); // tagSafe - apply only to fitting terms

    if (safe === true) {
      terms = terms.filter(function (t) {
        return t.canBe(tag, doc.world);
      });
    }

    terms.forEach(function (t, i) {
      //fancy version:
      if (tagList.length > 1) {
        if (tagList[i] && tagList[i] !== '.') {
          t.tag(tagList[i], reason, doc.world);
        }
      } else {
        //non-fancy version (same tag for all terms)
        t.tag(tag, reason, doc.world);
      }
    });
  });
  return;
};

module.exports = tagTerms;

},{}],54:[function(_dereq_,module,exports){
"use strict";

module.exports = Object.assign({}, _dereq_('./01-utils'), _dereq_('./02-accessors'), _dereq_('./03-match'), _dereq_('./04-tag'), _dereq_('./05-loops'), _dereq_('./06-lookup'), _dereq_('./insert/01-replace'), _dereq_('./insert/02-insert'), _dereq_('./output/01-text'), _dereq_('./output/02-json'), _dereq_('./output/03-out'), _dereq_('./output/04-export'), _dereq_('./transform/01-sort'), _dereq_('./transform/02-normalize'), _dereq_('./transform/03-split'), _dereq_('./transform/04-case'), _dereq_('./transform/05-whitespace'), _dereq_('./transform/06-join'), _dereq_('./transform/07-contract'));

},{"./01-utils":46,"./02-accessors":47,"./03-match":48,"./04-tag":49,"./05-loops":50,"./06-lookup":51,"./insert/01-replace":55,"./insert/02-insert":56,"./output/01-text":57,"./output/02-json":58,"./output/03-out":59,"./output/04-export":60,"./transform/01-sort":62,"./transform/02-normalize":63,"./transform/03-split":64,"./transform/04-case":65,"./transform/05-whitespace":66,"./transform/06-join":67,"./transform/07-contract":68}],55:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var tokenize = _dereq_('../../../01-tokenizer');

var titleCase = function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};
/** substitute-in new content */


exports.replaceWith = function (replace, keepTags, keepCase) {
  var _this = this;

  if (!replace) {
    return this["delete"]();
  } // clear the cache


  this.uncache(); // return this

  this.list.forEach(function (p) {
    var input = replace; // accept a function for replace

    if (typeof replace === 'function') {
      input = replace(p);
    }

    var newPhrases; // accept a Doc object to replace

    if (input && _typeof(input) === 'object' && input.isA === 'Doc') {
      newPhrases = input.list;

      _this.pool().merge(input.pool());
    } else if (typeof input === 'string') {
      //input is a string
      if (keepCase === true && p.terms(0).isTitleCase()) {
        input = titleCase(input);
      }

      newPhrases = tokenize.fromText(input, _this.world, _this.pool()); //tag the new phrases

      var tmpDoc = _this.buildFrom(newPhrases);

      tmpDoc.tagger();
    } else {
      return; //don't even bother
    } // try to keep its old tags, if appropriate


    if (keepTags === true) {
      var oldTags = p.json({
        terms: {
          tags: true
        }
      }).terms;
      newPhrases[0].terms().forEach(function (t, i) {
        if (oldTags[i]) {
          t.tagSafe(oldTags[i].tags, 'keptTag', _this.world);
        }
      });
    }

    p.replace(newPhrases[0], _this); //Oneday: support multi-sentence replacements
  });
  return this;
};
/** search and replace match with new content */


exports.replace = function (match, replace, keepTags, keepCase) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match);
  }

  this.match(match).replaceWith(replace, keepTags, keepCase);
  return this;
};

},{"../../../01-tokenizer":6}],56:[function(_dereq_,module,exports){
"use strict";

var tokenize = _dereq_('../../../01-tokenizer');
/** add these new terms to the end*/


exports.append = function (str) {
  var _this = this;

  if (!str) {
    return this;
  } // clear the cache


  this.uncache(); //add it to end of every phrase

  this.list.forEach(function (p) {
    //build it
    var phrase = tokenize.fromText(str, _this.world, _this.pool())[0]; //assume it's one sentence, for now
    //tag it

    var tmpDoc = _this.buildFrom([phrase]);

    tmpDoc.tagger(); // push it onto the end

    p.append(phrase, _this);
  });
  return this;
};

exports.insertAfter = exports.append;
exports.insertAt = exports.append;
/** add these new terms to the front*/

exports.prepend = function (str) {
  var _this2 = this;

  if (!str) {
    return this;
  } // clear the cache


  this.uncache(); //add it to start of every phrase

  this.list.forEach(function (p) {
    //build it
    var phrase = tokenize.fromText(str, _this2.world, _this2.pool())[0]; //assume it's one sentence, for now
    //tag it

    var tmpDoc = _this2.buildFrom([phrase]);

    tmpDoc.tagger(); // add it to the start

    p.prepend(phrase, _this2);
  });
  return this;
};

exports.insertBefore = exports.prepend;
/** add these new things to the end*/

exports.concat = function () {
  // clear the cache
  this.uncache();
  var list = this.list.slice(0); //repeat for any number of params

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]; //support a fresh string

    if (typeof arg === 'string') {
      var arr = tokenize.fromText(arg, this.world); //TODO: phrase.tagger()?

      list = list.concat(arr);
    } else if (arg.isA === 'Doc') {
      list = list.concat(arg.list);
    } else if (arg.isA === 'Phrase') {
      list.push(arg);
    }
  }

  return this.buildFrom(list);
};
/** fully remove these terms from the document */


exports["delete"] = function (match) {
  var _this3 = this;

  // clear the cache
  this.uncache();
  var toRemove = this;

  if (match) {
    toRemove = this.match(match);
  }

  toRemove.list.forEach(function (phrase) {
    return phrase["delete"](_this3);
  });
  return this;
}; // aliases


exports.remove = exports["delete"];

},{"../../../01-tokenizer":6}],57:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** return the document as text */
exports.text = function (options) {
  var _this = this;

  options = options || {}; //are we showing every phrase?

  var showFull = false;

  if (this.parents().length === 0) {
    showFull = true;
  } // cache roots, if necessary


  if (options === 'root' || _typeof(options) === 'object' && options.root) {
    this.list.forEach(function (p) {
      p.terms().forEach(function (t) {
        if (t.root === null) {
          t.setRoot(_this.world);
        }
      });
    });
  }

  return this.list.reduce(function (str, p, i) {
    var trimPre = !showFull && i === 0;
    var trimPost = !showFull && i === _this.list.length - 1;
    return str + p.text(options, trimPre, trimPost);
  }, '');
};

},{}],58:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var jsonDefaults = {
  text: true,
  terms: true,
  trim: true
}; // get all character startings in doc

var termOffsets = function termOffsets(doc) {
  var elapsed = 0;
  var index = 0;
  var offsets = {};
  doc.termList().forEach(function (term) {
    offsets[term.id] = {
      index: index,
      start: elapsed + term.pre.length,
      length: term.text.length
    };
    elapsed += term.pre.length + term.text.length + term.post.length;
    index += 1;
  });
  return offsets;
};
/** pull out desired metadata from the document */


exports.json = function () {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  //support json(3) format
  if (typeof options === 'number' && this.list[options]) {
    return this.list[options].json(jsonDefaults);
  }

  options = Object.assign({}, jsonDefaults, options); // cache roots, if necessary

  if (options === 'root' || _typeof(options) === 'object' && options.root) {
    this.list.forEach(function (p) {
      p.terms().forEach(function (t) {
        if (t.root === null) {
          t.setRoot(_this.world);
        }
      });
    });
  }

  if (options.unique) {
    options.reduced = true;
  }

  if (options.offset) {
    options.terms = options.terms === true ? {} : options.terms;
    options.terms.offset = true;
  }

  if (options.index || options.terms.index) {
    options.terms = options.terms === true ? {} : options.terms;
    options.terms.id = true;
  }

  var result = this.list.map(function (p) {
    return p.json(options, _this.world);
  }); // add offset and index data for each term

  if (options.terms.offset || options.offset || options.terms.index || options.index) {
    // calculate them, (from beginning of doc)
    var offsets = termOffsets(this.all()); // add index values

    if (options.terms.index || options.index) {
      result.forEach(function (o) {
        o.terms.forEach(function (t) {
          t.index = offsets[t.id].index;
        });
        o.index = o.terms[0].index;
      });
    } // add offset values


    if (options.terms.offset || options.offset) {
      result.forEach(function (o) {
        o.terms.forEach(function (t) {
          t.offset = offsets[t.id] || {};
        });
        var len = o.terms.reduce(function (n, t) {
          n += t.offset.length || 0;
          return n;
        }, 0);
        o.offset = o.terms[0].offset;
        o.offset.length = len;
      });
    }
  } // add frequency #s


  if (options.frequency || options.freq || options.count) {
    var obj = {};
    this.list.forEach(function (p) {
      var str = p.text('reduced');
      obj[str] = obj[str] || 0;
      obj[str] += 1;
    });
    this.list.forEach(function (p, i) {
      result[i].count = obj[p.text('reduced')];
    });
  } // remove duplicates


  if (options.unique) {
    var already = {};
    result = result.filter(function (o) {
      if (already[o.reduced] === true) {
        return false;
      }

      already[o.reduced] = true;
      return true;
    });
  }

  return result;
}; //aliases


exports.data = exports.json;

},{}],59:[function(_dereq_,module,exports){
"use strict";

var debug = _dereq_('../_debug');

var topk = _dereq_('./_topk');
/** pretty-print the current document and its tags */


exports.debug = function () {
  debug(this);
  return this;
};
/** some named output formats */


exports.out = function (method) {
  if (method === 'text') {
    return this.text();
  }

  if (method === 'normal') {
    return this.text('normal');
  }

  if (method === 'json') {
    return this.json();
  }

  if (method === 'offset' || method === 'offsets') {
    return this.json({
      offset: true
    });
  }

  if (method === 'array') {
    return this.json({
      terms: false
    }).map(function (obj) {
      return obj.text;
    });
  }

  if (method === 'freq' || method === 'frequency') {
    return topk(this);
  }

  if (method === 'terms') {
    var list = [];
    this.json({
      text: false,
      terms: {
        text: true
      }
    }).forEach(function (obj) {
      var terms = obj.terms.map(function (t) {
        return t.text;
      });
      terms = terms.filter(function (t) {
        return t;
      });
      list = list.concat(terms);
    });
    return list;
  }

  if (method === 'tags') {
    return this.list.map(function (p) {
      return p.terms().reduce(function (h, t) {
        h[t.clean || t.implicit] = Object.keys(t.tags);
        return h;
      }, {});
    });
  }

  if (method === 'debug') {
    debug(this);
    return this;
  }

  return this.text();
};

},{"../_debug":52,"./_topk":61}],60:[function(_dereq_,module,exports){
"use strict";

// compress a list of things by frequency
var topk = function topk(list) {
  var counts = {};
  list.forEach(function (a) {
    counts[a] = counts[a] || 0;
    counts[a] += 1;
  });
  var arr = Object.keys(counts);
  arr = arr.sort(function (a, b) {
    if (counts[a] > counts[b]) {
      return -1;
    } else {
      return 1;
    }
  }); // arr = arr.filter(a => counts[a] > 1)

  return arr.map(function (a) {
    return [a, counts[a]];
  });
}; // remove implied tags, like 'Noun' when we have 'Plural'


var reduceTags = function reduceTags(tags, world) {
  var tagset = world.tags;
  var implied = [];
  tags.forEach(function (tag) {
    if (tagset[tag] && tagset[tag].isA) {
      implied = implied.concat(tagset[tag].isA);
    }
  });
  implied = implied.reduce(function (h, tag) {
    h[tag] = true;
    return h;
  }, {});
  tags = tags.filter(function (tag) {
    return !implied[tag];
  }); // tags

  return tags;
};
/** store a parsed document for later use */


exports["export"] = function () {
  var _this = this;

  var phraseList = this.json({
    text: true,
    trim: false,
    terms: {
      tags: true,
      whitespace: true
    }
  }); // let phraseList = json.map(p => p.terms)

  var allTags = [];
  phraseList.forEach(function (p) {
    p.terms.forEach(function (t) {
      // reduce redundant tags
      var tags = reduceTags(t.tags, _this.world);
      allTags = allTags.concat(tags);
    });
  }); // compress the top tags

  allTags = topk(allTags);
  var tagMap = {};
  allTags.forEach(function (a, i) {
    tagMap[a[0]] = i;
  }); //use index numbers instead of redundant tag-names

  phraseList = phraseList.map(function (p) {
    var terms = p.terms.map(function (term) {
      var tags = term.tags;
      tags = reduceTags(tags, _this.world);
      tags = tags.map(function (tag) {
        return tagMap[tag];
      });
      tags = tags.join(',');
      return tags;
    });
    terms = terms.join('|');
    return [p.text, terms];
  });
  return {
    tags: Object.keys(tagMap),
    // words: {},
    list: phraseList
  };
};

},{}],61:[function(_dereq_,module,exports){
"use strict";

var topk = function topk(doc) {
  var list = doc.json({
    text: false,
    terms: false,
    reduced: true
  }); // combine them

  var obj = {};
  list.forEach(function (o) {
    if (!obj[o.reduced]) {
      o.count = 0;
      obj[o.reduced] = o;
    }

    obj[o.reduced].count += 1;
  });
  var arr = Object.keys(obj).map(function (k) {
    return obj[k];
  }); // sort them

  arr.sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    }

    return 0;
  });
  return arr;
};

module.exports = topk;

},{}],62:[function(_dereq_,module,exports){
"use strict";

var methods = {
  /** alphabetical order */
  alpha: function alpha(a, b) {
    var left = a.text('clean');
    var right = b.text('clean');

    if (left < right) {
      return -1;
    }

    if (left > right) {
      return 1;
    }

    return 0;
  },

  /** count the # of characters of each match */
  length: function length(a, b) {
    var left = a.text().trim().length;
    var right = b.text().trim().length;

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  },

  /** count the # of terms in each match */
  wordCount: function wordCount(a, b) {
    var left = a.wordCount();
    var right = b.wordCount();

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  }
};
/** sort by # of duplicates in the document*/

var byFreq = function byFreq(doc) {
  var counts = {};
  var options = {
    "case": true,
    punctuation: false,
    whitespace: true,
    unicode: true
  };
  doc.list.forEach(function (p) {
    var str = p.text(options);
    counts[str] = counts[str] || 0;
    counts[str] += 1;
  }); // sort by freq

  doc.list.sort(function (a, b) {
    var left = counts[a.text(options)];
    var right = counts[b.text(options)];

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  });
  return doc;
}; // order results 'chronologically', or document-order


var sortSequential = function sortSequential(doc) {
  var order = {};
  doc.json({
    terms: {
      offset: true
    }
  }).forEach(function (o) {
    order[o.terms[0].id] = o.terms[0].offset.start;
  });
  doc.list = doc.list.sort(function (a, b) {
    if (order[a.start] > order[b.start]) {
      return 1;
    } else if (order[a.start] < order[b.start]) {
      return -1;
    }

    return 0;
  });
  return doc;
}; //aliases


methods.alphabetical = methods.alpha;
methods.wordcount = methods.wordCount; // aliases for sequential ordering

var seqNames = {
  index: true,
  sequence: true,
  seq: true,
  sequential: true,
  chron: true,
  chronological: true
};
/** re-arrange the order of the matches (in place) */

exports.sort = function (input) {
  input = input || 'alpha'; //do this one up-front

  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this);
  }

  if (seqNames.hasOwnProperty(input)) {
    return sortSequential(this);
  }

  input = methods[input] || input; // apply sort method on each phrase

  if (typeof input === 'function') {
    this.list = this.list.sort(input);
    return this;
  }

  return this;
};
/** reverse the order of the matches, but not the words */


exports.reverse = function () {
  var list = [].concat(this.list);
  list = list.reverse();
  return this.buildFrom(list);
};
/** remove any duplicate matches */


exports.unique = function () {
  var list = [].concat(this.list);
  var obj = {};
  list = list.filter(function (p) {
    var str = p.text('reduced').trim();

    if (obj.hasOwnProperty(str) === true) {
      return false;
    }

    obj[str] = true;
    return true;
  });
  return this.buildFrom(list);
};

},{}],63:[function(_dereq_,module,exports){
"use strict";

var methods = _dereq_('./_methods');

var defaults = {
  // light
  whitespace: true,
  unicode: true,
  punctuation: true,
  emoji: true,
  acronyms: true,
  abbreviations: true,
  // medium
  "case": false,
  contractions: false,
  parentheses: false,
  quotations: false,
  adverbs: false,
  // heavy (loose legibility)
  possessives: false,
  verbs: false,
  nouns: false,
  honorifics: false // pronouns: true,

};
var mapping = {
  light: {},
  medium: {
    "case": true,
    contractions: true,
    parentheses: true,
    quotations: true,
    adverbs: true
  }
};
mapping.heavy = Object.assign({}, mapping.medium, {
  possessives: true,
  verbs: true,
  nouns: true,
  honorifics: true
});
/** common ways to clean-up the document, and reduce noise */

exports.normalize = function (options) {
  options = options || {}; // support named forms

  if (typeof options === 'string') {
    options = mapping[options] || {};
  } // set defaults


  options = Object.assign({}, defaults, options); // clear the cache

  this.uncache();
  var termList = this.termList(); // lowercase things

  if (options["case"]) {
    this.toLowerCase();
  } //whitespace


  if (options.whitespace) {
    methods.whitespace(this);
  } // unicode: é -> e


  if (options.unicode) {
    methods.unicode(termList);
  } //punctuation - keep sentence punctation, quotes, parenths


  if (options.punctuation) {
    methods.punctuation(termList);
  } // remove ':)'


  if (options.emoji) {
    this.remove('(#Emoji|#Emoticon)');
  } // 'f.b.i.' -> 'FBI'


  if (options.acronyms) {
    this.acronyms().strip(); // .toUpperCase()
  } // remove period from abbreviations


  if (options.abbreviations) {
    methods.abbreviations(this);
  } // --Medium methods--
  // `isn't` -> 'is not'


  if (options.contraction || options.contractions) {
    this.contractions().expand();
  } // '(word)' -> 'word'


  if (options.parentheses) {
    this.parentheses().unwrap();
  } // remove "" punctuation


  if (options.quotations || options.quotes) {
    methods.quotations(termList);
  } // remove any un-necessary adverbs


  if (options.adverbs) {
    methods.adverbs(this);
  } // --Heavy methods--
  // `cory hart's -> cory hart'


  if (options.possessive || options.possessives) {
    this.possessives().strip();
  } // 'he walked' -> 'he walk'


  if (options.verbs) {
    this.verbs().toInfinitive();
  } // 'three dogs' -> 'three dog'


  if (options.nouns || options.plurals) {
    this.nouns().toSingular();
  } // remove 'Mr.' from 'Mr John Smith'


  if (options.honorifics) {
    this.remove('#Honorific');
  }

  return this;
};

},{"./_methods":69}],64:[function(_dereq_,module,exports){
"use strict";

var parseSyntax = _dereq_('../../match/syntax');
/** return a Document with three parts for every match
 * seperate everything before the word, as a new phrase
 */


exports.splitOn = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    var parent = this.parent();
    return parent.splitOn(this);
  } //start looking for a match..


  var regs = parseSyntax(reg);
  var matches = [];
  this.list.forEach(function (p) {
    var foundEm = p.match(regs); //no match here, add full sentence

    if (foundEm.length === 0) {
      matches.push(p);
      return;
    } // we found something here.


    var carry = p;
    foundEm.forEach(function (found) {
      var parts = carry.splitOn(found); // add em in

      if (parts.before) {
        matches.push(parts.before);
      }

      if (parts.match) {
        matches.push(parts.match);
      } // start matching now on the end


      carry = parts.after;
    }); // add that last part

    if (carry) {
      matches.push(carry);
    }
  });
  return this.buildFrom(matches);
};
/** return a Document with two parts for every match
 * seperate everything after the word, as a new phrase
 */


exports.splitAfter = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    var parent = this.parent();
    return parent.splitAfter(this);
  } // start looking for our matches


  var regs = parseSyntax(reg);
  var matches = [];
  this.list.forEach(function (p) {
    var foundEm = p.match(regs); //no match here, add full sentence

    if (foundEm.length === 0) {
      matches.push(p);
      return;
    } // we found something here.


    var carry = p;
    foundEm.forEach(function (found) {
      var parts = carry.splitOn(found); // add em in

      if (parts.before && parts.match) {
        // merge these two together
        parts.before.length += parts.match.length;
        matches.push(parts.before);
      } else if (parts.match) {
        matches.push(parts.match);
      } // start matching now on the end


      carry = parts.after;
    }); // add that last part

    if (carry) {
      matches.push(carry);
    }
  });
  return this.buildFrom(matches);
};

exports.split = exports.splitAfter; //i guess?

/** return a Document with two parts for every match */

exports.splitBefore = function (reg) {
  // if there's no match, split parent, instead
  if (!reg) {
    var parent = this.parent();
    return parent.splitBefore(this);
  } //start looking for a match..


  var regs = parseSyntax(reg);
  var matches = [];
  this.list.forEach(function (p) {
    var foundEm = p.match(regs); //no match here, add full sentence

    if (foundEm.length === 0) {
      matches.push(p);
      return;
    } // we found something here.


    var carry = p;
    foundEm.forEach(function (found) {
      var parts = carry.splitOn(found); // add before part in

      if (parts.before) {
        matches.push(parts.before);
      } // merge match+after


      if (parts.match && parts.after) {
        parts.match.length += parts.after.length;
      } // start matching now on the end


      carry = parts.match;
    }); // add that last part

    if (carry) {
      matches.push(carry);
    }
  });
  return this.buildFrom(matches);
};
/** split a document into labeled sections */


exports.segment = function (regs, options) {
  regs = regs || {};
  options = options || {
    text: true
  };
  var doc = this;
  var keys = Object.keys(regs); // split em

  keys.forEach(function (k) {
    doc = doc.splitOn(k);
  }); //add labels for each section

  doc.list.forEach(function (p) {
    for (var i = 0; i < keys.length; i += 1) {
      if (p.has(keys[i])) {
        p.segment = regs[keys[i]];
        return;
      }
    }
  });
  return doc.list.map(function (p) {
    var res = p.json(options);
    res.segment = p.segment || null;
    return res;
  });
};

},{"../../match/syntax":45}],65:[function(_dereq_,module,exports){
"use strict";

var eachTerm = function eachTerm(doc, fn) {
  var world = doc.world;
  doc.list.forEach(function (p) {
    p.terms().forEach(function (t) {
      return t[fn](world);
    });
  });
  return doc;
};
/** turn every letter of every term to lower-cse */


exports.toLowerCase = function () {
  return eachTerm(this, 'toLowerCase');
};
/** turn every letter of every term to upper case */


exports.toUpperCase = function () {
  return eachTerm(this, 'toUpperCase');
};
/** upper-case the first letter of each term */


exports.toTitleCase = function () {
  this.tag('TitleCase');
  return eachTerm(this, 'toTitleCase');
};
/** remove whitespace and title-case each term */


exports.toCamelCase = function () {
  this.list.forEach(function (p) {
    //remove whitespace
    var terms = p.terms();
    terms.forEach(function (t, i) {
      if (i !== 0) {
        t.toTitleCase();
      }

      if (i !== terms.length - 1) {
        t.post = '';
      }
    });
  }); // this.tag('#CamelCase', 'toCamelCase')

  return this;
};

},{}],66:[function(_dereq_,module,exports){
"use strict";

/** add this punctuation or whitespace before each match: */
exports.pre = function (str) {
  if (str === undefined) {
    return this.list[0].terms(0).pre;
  }

  this.list.forEach(function (p) {
    var term = p.terms(0);
    term.pre = str;
  });
  return this;
};
/** add this punctuation or whitespace after each match: */


exports.post = function (str) {
  // return array of post strings
  if (str === undefined) {
    return this.list.map(function (p) {
      var terms = p.terms();
      var term = terms[terms.length - 1];
      return term.post;
    });
  } // set post string on all ends


  this.list.forEach(function (p) {
    var terms = p.terms();
    var term = terms[terms.length - 1];
    term.post = str;
  });
  return this;
};
/** remove start and end whitespace */


exports.trim = function () {
  this.list = this.list.map(function (p) {
    return p.trim();
  });
  return this;
};
/** connect words with hyphen, and remove whitespace */


exports.hyphenate = function () {
  this.list.forEach(function (p) {
    var terms = p.terms(); //remove whitespace

    terms.forEach(function (t, i) {
      if (i !== 0) {
        t.pre = '';
      }

      if (terms[i + 1]) {
        t.post = '-';
      }
    });
  });
  return this;
};
/** remove hyphens between words, and set whitespace */


exports.dehyphenate = function () {
  var hasHyphen = /(-|–|—)/;
  this.list.forEach(function (p) {
    var terms = p.terms(); //remove whitespace

    terms.forEach(function (t) {
      if (hasHyphen.test(t.post)) {
        t.post = ' ';
      }
    });
  });
  return this;
};

exports.deHyphenate = exports.dehyphenate;
/** add quotations around these matches */

exports.toQuotations = function (start, end) {
  start = start || "\"";
  end = end || "\"";
  this.list.forEach(function (p) {
    var terms = p.terms();
    terms[0].pre = start + terms[0].pre;
    var last = terms[terms.length - 1];
    last.post = end + last.post;
  });
  return this;
};

exports.toQuotation = exports.toQuotations;
/** add brackets around these matches */

exports.toParentheses = function (start, end) {
  start = start || "(";
  end = end || ")";
  this.list.forEach(function (p) {
    var terms = p.terms();
    terms[0].pre = start + terms[0].pre;
    var last = terms[terms.length - 1];
    last.post = end + last.post;
  });
  return this;
};

},{}],67:[function(_dereq_,module,exports){
"use strict";

/** make all phrases into one phrase */
exports.join = function (str) {
  // clear the cache
  this.uncache(); // make one large phrase - 'main'

  var main = this.list[0];
  var before = main.length;
  var removed = {};

  for (var i = 1; i < this.list.length; i++) {
    var p = this.list[i];
    removed[p.start] = true;
    var term = main.lastTerm(); // add whitespace between them

    if (str) {
      term.post += str;
    } //  main -> p


    term.next = p.start; // main <- p

    p.terms(0).prev = term.id;
    main.length += p.length;
  } // parents are bigger than than their children.
  // when we increase a child, we increase their parent too.


  var increase = main.length - before;
  this.parents().forEach(function (doc) {
    // increase length on each effected phrase
    doc.list.forEach(function (p) {
      var terms = p.terms();

      for (var _i = 0; _i < terms.length; _i++) {
        if (terms[_i].id === main.start) {
          p.length += increase;
          break;
        }
      }
    }); // remove redundant phrases now

    doc.list = doc.list.filter(function (p) {
      return removed[p.start] !== true;
    });
  }); // return one major phrase

  return this.buildFrom([main]);
};

},{}],68:[function(_dereq_,module,exports){
"use strict";

var postPunct = /[,\)"';:\-–—\.…]/; // const irregulars = {
//   'will not': `won't`,
//   'i am': `i'm`,
// }

var setContraction = function setContraction(m, suffix) {
  if (!m.found) {
    return;
  }

  var terms = m.termList(); //avoid any problematic punctuation

  for (var i = 0; i < terms.length - 1; i++) {
    var t = terms[i];

    if (postPunct.test(t.post)) {
      return;
    }
  } // set them as implict


  terms.forEach(function (t) {
    t.implicit = t.clean;
  }); // perform the contraction

  terms[0].text += suffix; // clean-up the others

  terms.slice(1).forEach(function (t) {
    t.text = '';
  });

  for (var _i = 0; _i < terms.length - 1; _i++) {
    var _t = terms[_i];
    _t.post = _t.post.replace(/ /, '');
  }
};
/** turn 'i am' into i'm */


exports.contract = function () {
  var doc = this.not('@hasContraction'); // we are -> we're

  var m = doc.match('(we|they|you) are');
  setContraction(m, "'re"); // they will -> they'll

  m = doc.match('(he|she|they|it|we|you) will');
  setContraction(m, "'ll"); // she is -> she's

  m = doc.match('(he|she|they|it|we) is');
  setContraction(m, "'s"); // spencer is -> spencer's

  m = doc.match('#Person is');
  setContraction(m, "'s"); // spencer would -> spencer'd

  m = doc.match('#Person would');
  setContraction(m, "'d"); // would not -> wouldn't

  m = doc.match('(is|was|had|would|should|could|do|does|have|has|can) not');
  setContraction(m, "n't"); // i have -> i've

  m = doc.match('(i|we|they) have');
  setContraction(m, "'ve"); // would have -> would've

  m = doc.match('(would|should|could) have');
  setContraction(m, "'ve"); // i am -> i'm

  m = doc.match('i am');
  setContraction(m, "'m"); // going to -> gonna

  m = doc.match('going to');
  return this;
};

},{}],69:[function(_dereq_,module,exports){
"use strict";

var killUnicode = _dereq_('../../../Term/normalize/unicode');

var isPunct = /[\[\]{}⟨⟩:,،、‒–—―…‹›«»‐\-;\/⁄·*\•^†‡°¡¿※№÷×ºª%‰=‱¶§~|‖¦©℗®℠™¤₳฿]/g;
var quotes = /['‘’“”"′″‴]+/g;
var methods = {
  // cleanup newlines and extra spaces
  whitespace: function whitespace(doc) {
    var termArr = doc.list.map(function (ts) {
      return ts.terms();
    });
    termArr.forEach(function (terms, o) {
      terms.forEach(function (t, i) {
        // keep dashes between words
        if (t.hasDash() === true) {
          t.post = ' - ';
          return;
        } // remove existing spaces


        t.pre = t.pre.replace(/\s/g, '');
        t.post = t.post.replace(/\s/g, ''); //last word? ensure there's a next sentence.

        if (terms.length - 1 === i && !termArr[o + 1]) {
          return;
        } // no extra spaces for contractions


        if (t.implicit && Boolean(t.text) === true) {
          return;
        } // no extra spaces for hyphenated words


        if (t.hasHyphen() === true) {
          return;
        }

        t.post += ' ';
      });
    });
  },
  punctuation: function punctuation(termList) {
    termList.forEach(function (t) {
      // space between hyphenated words
      if (t.hasHyphen() === true) {
        t.post = ' ';
      }

      t.pre = t.pre.replace(isPunct, '');
      t.post = t.post.replace(isPunct, ''); // elipses

      t.post = t.post.replace(/\.\.\./, ''); // only allow one exclamation

      if (/!/.test(t.post) === true) {
        t.post = t.post.replace(/!/g, '');
        t.post = '!' + t.post;
      } // only allow one question mark


      if (/\?/.test(t.post) === true) {
        t.post = t.post.replace(/[\?!]*/, '');
        t.post = '?' + t.post;
      }
    });
  },
  unicode: function unicode(termList) {
    termList.forEach(function (t) {
      if (t.isImplicit() === true) {
        return;
      }

      t.text = killUnicode(t.text);
    });
  },
  quotations: function quotations(termList) {
    termList.forEach(function (t) {
      t.post = t.post.replace(quotes, '');
      t.pre = t.pre.replace(quotes, '');
    });
  },
  adverbs: function adverbs(doc) {
    doc.match('#Adverb').not('(not|nary|seldom|never|barely|almost|basically|so)').remove();
  },
  // remove the '.' from 'Mrs.' (safely)
  abbreviations: function abbreviations(doc) {
    doc.list.forEach(function (ts) {
      var terms = ts.terms();
      terms.forEach(function (t, i) {
        if (t.tags.Abbreviation === true && terms[i + 1]) {
          t.post = t.post.replace(/^\./, '');
        }
      });
    });
  }
};
module.exports = methods;

},{"../../../Term/normalize/unicode":126}],70:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = _dereq_('./methods');

var matchMethods = _dereq_('./match'); // const tokenize = require('../01-tokenizer')


var Phrase = function Phrase(id, length, pool) {
  _classCallCheck(this, Phrase);

  this.start = id;
  this.length = length;
  this.isA = 'Phrase'; // easier than .constructor...

  Object.defineProperty(this, 'pool', {
    enumerable: false,
    writable: true,
    value: pool
  });
  Object.defineProperty(this, 'cache', {
    enumerable: false,
    writable: true,
    value: {}
  });
};
/** create a new Phrase object from an id and length */


Phrase.prototype.buildFrom = function (id, length) {
  var p = new Phrase(id, length, this.pool);

  if (this.cache) {
    p.cache = this.cache;
    p.cache.terms = null;
  }

  return p;
}; // Phrase.prototype.fromString = function(str) {
//   console.log(tokenize)
//   return tokenize.fromText(str)
// }
//apply methods


Object.assign(Phrase.prototype, matchMethods);
Object.assign(Phrase.prototype, methods); //apply aliases

var aliases = {
  term: 'terms'
};
Object.keys(aliases).forEach(function (k) {
  return Phrase.prototype[k] = Phrase.prototype[aliases[k]];
});
module.exports = Phrase;

},{"./match":77,"./methods":85}],71:[function(_dereq_,module,exports){
"use strict";

var endOfSentence = /[.?!]\s*$/; // replacing a 'word.' with a 'word!'

var combinePost = function combinePost(before, after) {
  //only transfer the whitespace
  if (endOfSentence.test(after)) {
    var whitespace = before.match(/\s*$/);
    return after + whitespace;
  }

  return before;
}; //add whitespace to the start of the second bit


var addWhitespace = function addWhitespace(beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre;
  var lastTerm = beforeTerms[beforeTerms.length - 1]; //add any existing punctuation to end of our new terms

  var newTerm = newTerms[newTerms.length - 1];
  newTerm.post = combinePost(lastTerm.post, newTerm.post); // remove existing punctuation

  lastTerm.post = ''; //before ←[space]  - after

  if (lastTerm.post === '') {
    lastTerm.post += ' ';
  }
}; //insert this segment into the linked-list


var stitchIn = function stitchIn(main, newPhrase) {
  // console.log(main.text(), newPhrase.text())
  var afterId = main.lastTerm().next; //connect ours in (main → newPhrase)

  main.lastTerm().next = newPhrase.start; //stich the end in  (newPhrase → after)

  newPhrase.lastTerm().next = afterId; //do it backwards, too

  if (afterId) {
    // newPhrase ← after
    var afterTerm = main.pool.get(afterId);
    afterTerm.prev = newPhrase.lastTerm().id;
  } // before ← newPhrase


  var beforeId = main.terms(0).id;

  if (beforeId) {
    var newTerm = newPhrase.terms(0);
    newTerm.prev = beforeId;
  }
}; // avoid stretching a phrase twice.


var unique = function unique(list) {
  return list.filter(function (o, i) {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another.


var appendPhrase = function appendPhrase(before, newPhrase, doc) {
  var beforeTerms = before.terms(); //spruce-up the whitespace issues

  addWhitespace(beforeTerms, newPhrase.terms()); //insert this segment into the linked-list

  stitchIn(before, newPhrase); // stretch!
  // make each effected phrase longer

  var toStretch = [before];
  var hasId = before.start;
  var docs = [doc];
  docs = docs.concat(doc.parents()); // find them all!

  docs.forEach(function (parent) {
    // only the phrases that should change
    var shouldChange = parent.list.filter(function (p) {
      return p.hasId(hasId);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count a phrase

  toStretch = unique(toStretch); // console.log(toStretch)

  toStretch.forEach(function (p) {
    p.length += newPhrase.length;
  });
  return before;
};

module.exports = appendPhrase;

},{}],72:[function(_dereq_,module,exports){
"use strict";

//recursively decrease the length of all the parent phrases
var shrinkAll = function shrinkAll(doc, id, deleteLength, after) {
  var arr = doc.parents();
  arr.push(doc);
  arr.forEach(function (d) {
    //find our phrase to shrink
    var phrase = d.list.find(function (p) {
      return p.hasId(id);
    });

    if (!phrase) {
      return;
    }

    phrase.length -= deleteLength; // does it start with this soon-removed word?

    if (phrase.start === id) {
      phrase.start = after.id;
    }
  }); // cleanup empty phrase objects

  doc.list = doc.list.filter(function (p) {
    if (!p.start || !p.length) {
      return false;
    }

    return true;
  });
};
/** wrap the linked-list around these terms
 * so they don't appear any more
 */


var deletePhrase = function deletePhrase(phrase, doc) {
  var pool = doc.pool();
  var terms = phrase.terms(); //grab both sides of the chain,

  var prev = pool.get(terms[0].prev) || {};
  var after = pool.get(terms[terms.length - 1].next) || {};

  if (terms[0].implicit && prev.implicit) {
    prev.set(prev.implicit);
    prev.post += ' ';
  } // //first, change phrase lengths


  shrinkAll(doc, phrase.start, phrase.length, after); // connect [prev]->[after]

  if (prev) {
    prev.next = after.id;
  } // connect [prev]<-[after]


  if (after) {
    after.prev = prev.id;
  } // lastly, actually delete the terms from the pool?
  // for (let i = 0; i < terms.length; i++) {
  //   pool.remove(terms[i].id)
  // }

};

module.exports = deletePhrase;

},{}],73:[function(_dereq_,module,exports){
"use strict";

var hasSpace = / /; //a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'

var addWhitespace = function addWhitespace(newTerms) {
  //add a space before our new text?
  // add a space after our text
  var lastTerm = newTerms[newTerms.length - 1];

  if (hasSpace.test(lastTerm.post) === false) {
    lastTerm.post += ' ';
  } // let term = original.pool.get(original.start)
  // if (term.prev) {
  //   //add our space ahead of our new terms
  //   let firstWord = newTerms[0]
  //   if (hasSpace.test(firstWord.post) === false) {
  //     firstWord.post += ' '
  //   }
  //   return
  // }
  //otherwise, add our space to the start of original
  // if (hasSpace.test(term.pre) === false) {
  //   term.pre = ' ' + term.pre
  // }


  return;
}; //insert this segment into the linked-list


var stitchIn = function stitchIn(main, newPhrase, newTerms) {
  // [newPhrase] → [main]
  var lastTerm = newTerms[newTerms.length - 1];
  lastTerm.next = main.start; // [before] → [main]

  var pool = main.pool;
  var start = pool.get(main.start);

  if (start.prev) {
    var before = pool.get(start.prev);
    before.next = newPhrase.start;
  } //do it backwards, too
  // before ← newPhrase


  newTerms[0].prev = main.terms(0).prev; // newPhrase ← main

  main.terms(0).prev = lastTerm.id;
}; //recursively increase the length of all parent phrases
// const stretchAll = function(doc, oldStart, newPhrase) {
//   //find our phrase to stretch
//   let phrase = doc.list.find(p => p.hasId(oldStart) || p.hasId(newPhrase.start))
//   if (phrase === undefined) {
//     console.error('compromise error: Prepend missing start - ' + oldStart)
//     return
//   }
//   //should we update the phrase's starting?
//   if (phrase.start === oldStart) {
//     phrase.start = newPhrase.start
//   }
//   // console.log(newPhrase)
//   phrase.length += newPhrase.length
//   if (doc.from) {
//     stretchAll(doc.from, oldStart, newPhrase)
//   }
// }


var unique = function unique(list) {
  return list.filter(function (o, i) {
    return list.indexOf(o) === i;
  });
}; //append one phrase onto another


var joinPhrase = function joinPhrase(original, newPhrase, doc) {
  var starterId = original.start;
  var newTerms = newPhrase.terms(); //spruce-up the whitespace issues

  addWhitespace(newTerms, original); //insert this segment into the linked-list

  stitchIn(original, newPhrase, newTerms); //increase the length of our phrases

  var toStretch = [original];
  var docs = [doc];
  docs = docs.concat(doc.parents());
  docs.forEach(function (d) {
    // only the phrases that should change
    var shouldChange = d.list.filter(function (p) {
      return p.hasId(starterId) || p.hasId(newPhrase.start);
    });
    toStretch = toStretch.concat(shouldChange);
  }); // don't double-count

  toStretch = unique(toStretch); // stretch these phrases

  toStretch.forEach(function (p) {
    p.length += newPhrase.length; // change the start too, if necessary

    if (p.start === starterId) {
      p.start = newPhrase.start;
    }
  });
  return original;
};

module.exports = joinPhrase;

},{}],74:[function(_dereq_,module,exports){
"use strict";

var failFast = _dereq_('./02-failFast');

var tryMatch = _dereq_('./03-tryMatch');

var syntax = _dereq_('../../Doc/match/syntax');
/**  returns a simple array of arrays */


var matchAll = function matchAll(p, regs) {
  var matchOne = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  //if we forgot to parse it..
  if (typeof regs === 'string') {
    regs = syntax(regs);
  } //try to dismiss it, at-once


  if (failFast(p, regs) === true) {
    return [];
  } //any match needs to be this long, at least


  var minLength = regs.filter(function (r) {
    return r.optional !== true;
  }).length;
  var terms = p.cache.terms || p.terms();
  var matches = []; //optimisation for '^' start logic

  if (regs[0].start === true) {
    var match = tryMatch(terms, regs, 0, terms.length);

    if (match !== false && match.length > 0) {
      matches.push(match);
    } // remove (intentional) null results


    matches = matches.map(function (arr) {
      return arr.filter(function (t) {
        return t;
      });
    });
    return matches;
  } //try starting, from every term


  for (var i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      break;
    } //try it!


    var _match = tryMatch(terms.slice(i), regs, i, terms.length);

    if (_match !== false && _match.length > 0) {
      //zoom forward!
      i += _match.length - 1; //[capture-groups] return some null responses

      _match = _match.filter(function (m) {
        return m;
      });
      matches.push(_match); //ok, maybe that's enough?

      if (matchOne === true) {
        return matches;
      }
    }
  }

  return matches;
};

module.exports = matchAll;

},{"../../Doc/match/syntax":45,"./02-failFast":75,"./03-tryMatch":76}],75:[function(_dereq_,module,exports){
"use strict";

// try to avoid doing the match
var failFast = function failFast(p, regs) {
  if (regs.length === 0) {
    return true;
  }

  for (var i = 0; i < regs.length; i += 1) {
    var reg = regs[i]; //   //logical quick-ones

    if (reg.optional !== true && reg.negative !== true) {
      //start/end impossibilites
      if (reg.start === true && i > 0) {
        return true;
      } // has almost no effect


      if (p.cache.words !== undefined && reg.word !== undefined && p.cache.words.hasOwnProperty(reg.word) !== true) {
        // console.log('skip')
        return true;
      }
    } //this is not possible


    if (reg.anything === true && reg.negative === true) {
      return true;
    }
  }

  return false;
};

module.exports = failFast;

},{}],76:[function(_dereq_,module,exports){
"use strict";

// i formally apologize for how complicated this is.
//found a match? it's greedy? keep going!
var getGreedy = function getGreedy(terms, t, reg, until, index, length) {
  var start = t;

  for (; t < terms.length; t += 1) {
    //stop for next-reg match
    if (until && terms[t].doesMatch(until, index + t, length)) {
      return t;
    }

    var count = t - start + 1; // is it max-length now?

    if (reg.max !== undefined && count === reg.max) {
      return t;
    } //stop here


    if (terms[t].doesMatch(reg, index + t, length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null;
      }

      return t;
    }
  }

  return t;
}; //'unspecific greedy' is a weird situation.


var greedyTo = function greedyTo(terms, t, nextReg, index, length) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length;
  } //otherwise, we're looking for the next one


  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg, index + t, length) === true) {
      return t;
    }
  } //guess it doesn't exist, then.


  return null;
};
/** tries to match a sequence of terms, starting from here */


var tryHere = function tryHere(terms, regs, index, length) {
  var captures = [];
  var t = 0; // we must satisfy each rule in 'regs'

  for (var r = 0; r < regs.length; r += 1) {
    var reg = regs[r]; //should we fail here?

    if (!terms[t]) {
      //are all remaining regs optional?
      var hasNeeds = regs.slice(r).some(function (remain) {
        return !remain.optional;
      });

      if (hasNeeds === false) {
        break;
      } // have unmet needs


      return false;
    } //support 'unspecific greedy' .* properly


    if (reg.anything === true && reg.greedy === true) {
      var skipto = greedyTo(terms, t, regs[r + 1], reg, index, length); // ensure it's long enough

      if (reg.min !== undefined && skipto - t < reg.min) {
        return false;
      } // reduce it back, if it's too long


      if (reg.max !== undefined && skipto - t > reg.max) {
        t = t + reg.max;
        continue;
      } //TODO: support [*] properly


      if (skipto === null) {
        return false; //couldn't find it
      }

      t = skipto;
      continue;
    } //if it looks like a match, continue


    if (reg.anything === true || terms[t].doesMatch(reg, index + t, length) === true) {
      var startAt = t; // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?

      if (reg.optional && regs[r + 1]) {
        // does the next reg match it too?
        if (terms[t].doesMatch(regs[r + 1], index + t, length) === true) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          if (!terms[t + 1] || terms[t + 1].doesMatch(regs[r + 1], index + t, length) === false) {
            r += 1;
          }
        }
      } //advance to the next term!


      t += 1; //check any ending '$' flags

      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (t !== terms.length && reg.greedy !== true) {
          return false;
        }
      } //try keep it going!


      if (reg.greedy === true) {
        t = getGreedy(terms, t, reg, regs[r + 1], index, length);

        if (t === null) {
          return false; //greedy was too short
        }
      }

      if (reg.capture) {
        captures.push(startAt); //add greedy-end to capture

        if (t > 1 && reg.greedy) {
          captures.push(t - 1);
        }
      }

      continue;
    } //bah, who cares, keep going


    if (reg.optional === true) {
      continue;
    } // should we skip-over an implicit word?


    if (terms[t].isImplicit() && regs[r - 1] && terms[t + 1]) {
      // does the next one match?
      if (terms[t + 1].doesMatch(reg, index + t, length)) {
        t += 2;
        continue;
      }
    } // console.log('   ❌\n\n')


    return false;
  } //we got to the end of the regs, and haven't failed!
  //try to only return our [captured] segment


  if (captures.length > 0) {
    //make sure the array is the full-length we'd return anyways
    var arr = terms.slice(captures[0], captures[captures.length - 1] + 1); //make sure the array is t-length (so we skip ahead full-length)

    for (var tmp = 0; tmp < t; tmp++) {
      arr[tmp] = arr[tmp] || null; //these get cleaned-up after
    }

    return arr;
  } //return our result


  return terms.slice(0, t);
};

module.exports = tryHere;

},{}],77:[function(_dereq_,module,exports){
"use strict";

var matchAll = _dereq_('./01-matchAll');

var notMatch = _dereq_('./not');
/** return an array of matching phrases */


exports.match = function (str) {
  var _this = this;

  var matches = matchAll(this, str); //make them phrase objects

  matches = matches.map(function (list) {
    return _this.buildFrom(list[0].id, list.length);
  });
  return matches;
};
/** return boolean if one match is found */


exports.has = function (str) {
  var matches = matchAll(this, str, true);
  return matches.length > 0;
};
/** remove all matches from the result */


exports.not = function (str) {
  var _this2 = this;

  var matches = notMatch(this, str); //make them phrase objects

  matches = matches.map(function (list) {
    return _this2.buildFrom(list[0].id, list.length);
  });
  return matches;
};
/** return a list of phrases that can have this tag */


exports.canBe = function (tag, world) {
  var _this3 = this;

  var results = [];
  var terms = this.terms();
  var previous = false;

  for (var i = 0; i < terms.length; i += 1) {
    var can = terms[i].canBe(tag, world);

    if (can === true) {
      if (previous === true) {
        //add it to the end
        results[results.length - 1].push(terms[i]);
      } else {
        results.push([terms[i]]); //make a new one
      }

      previous = can;
    }
  } //turn them into Phrase objects


  results = results.filter(function (a) {
    return a.length > 0;
  }).map(function (arr) {
    return _this3.buildFrom(arr[0].id, arr.length);
  });
  return results;
};

},{"./01-matchAll":74,"./not":78}],78:[function(_dereq_,module,exports){
"use strict";

var matchAll = _dereq_('./01-matchAll');
/** return anything that doesn't match.
 * returns a simple array of arrays
 */


var notMatch = function notMatch(p, regs) {
  var found = {};
  var arr = matchAll(p, regs);
  arr.forEach(function (ts) {
    ts.forEach(function (t) {
      found[t.id] = true;
    });
  }); //return anything not found

  var terms = p.terms();
  var result = [];
  var current = [];
  terms.forEach(function (t) {
    if (found[t.id] === true) {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }

      return;
    }

    current.push(t);
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
};

module.exports = notMatch;

},{"./01-matchAll":74}],79:[function(_dereq_,module,exports){
"use strict";

/** return a flat array of Term objects */
exports.terms = function (n) {
  var terms = [this.pool.get(this.start)];

  if (this.length === 0) {
    return [];
  }

  for (var i = 0; i < this.length - 1; i += 1) {
    var id = terms[terms.length - 1].next;

    if (id === null) {
      // throw new Error('linked-list broken')
      console.error("Compromise error: Linked list broken in phrase '" + this.start + "'");
      break;
    }

    var term = this.pool.get(id);
    terms.push(term); //return this one?

    if (n !== undefined && n === i) {
      return terms[n];
    }
  }

  if (n !== undefined) {
    return terms[n];
  }

  return terms;
};
/** return a shallow or deep copy of this phrase  */


exports.clone = function (isShallow) {
  var _this = this;

  if (isShallow) {
    return this.buildFrom(this.start, this.length);
  } //how do we clone part of the pool?


  var terms = this.terms();
  var newTerms = terms.map(function (t) {
    return t.clone();
  }); //connect these new ids up

  newTerms.forEach(function (t, i) {
    //add it to the pool..
    _this.pool.add(t);

    if (newTerms[i + 1]) {
      t.next = newTerms[i + 1].id;
    }

    if (newTerms[i - 1]) {
      t.prev = newTerms[i - 1].id;
    }
  });
  return this.buildFrom(newTerms[0].id, newTerms.length);
};
/** return last term object */


exports.lastTerm = function () {
  var terms = this.terms();
  return terms[terms.length - 1];
};
/** quick lookup for a term id */


exports.hasId = function (wantId) {
  if (this.length === 0 || !wantId) {
    return false;
  }

  if (this.start === wantId) {
    return true;
  }

  var lastId = this.start;

  for (var i = 0; i < this.length - 1; i += 1) {
    var term = this.pool.get(lastId);

    if (term === undefined) {
      console.error("Compromise error: Linked list broken. Missing term '".concat(lastId, "' in phrase '").concat(this.start, "'\n")); // throw new Error('linked List error')

      return false;
    }

    if (term.next === wantId) {
      return true;
    }

    lastId = term.next;
  }

  return false;
};
/** how many seperate, non-empty words is it? */


exports.wordCount = function () {
  return this.terms().filter(function (t) {
    return t.text !== '';
  }).length;
};

},{}],80:[function(_dereq_,module,exports){
"use strict";

var trimEnd = function trimEnd(str) {
  return str.replace(/ +$/, '');
};
/** produce output in the given format */


exports.text = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isFirst = arguments.length > 1 ? arguments[1] : undefined;
  var isLast = arguments.length > 2 ? arguments[2] : undefined;

  if (typeof options === 'string') {
    if (options === 'normal') {
      options = {
        whitespace: true,
        unicode: true,
        lowercase: true,
        punctuation: true,
        acronyms: true,
        abbreviations: true,
        implicit: true,
        normal: true
      };
    } else if (options === 'clean') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true
      };
    } else if (options === 'reduced') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: false,
        //FIXME: reversed
        whitespace: true,
        unicode: true,
        implicit: true,
        reduced: true
      };
    } else if (options === 'root') {
      options = {
        titlecase: false,
        lowercase: true,
        punctuation: true,
        whitespace: true,
        unicode: true,
        implicit: true,
        root: true
      };
    } else {
      options = {};
    }
  }

  var terms = this.terms(); //this this phrase a complete sentence?

  var isFull = false;

  if (terms[0] && terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true;
  }

  var text = terms.reduce(function (str, t, i) {
    options.last = isLast && i === terms.length - 1;
    var showPre = true;
    var showPost = true;

    if (isFull === false) {
      // dont show beginning whitespace
      if (i === 0 && isFirst) {
        showPre = false;
      } // dont show end-whitespace


      if (i === terms.length - 1 && isLast) {
        showPost = false;
      }
    }

    var txt = t.textOut(options, showPre, showPost); // if (options.titlecase && i === 0) {
    // txt = titleCase(txt)
    // }

    return str + txt;
  }, ''); //full-phrases show punctuation, but not whitespace

  if (isFull === true && isLast) {
    text = trimEnd(text);
  }

  if (options.trim) {
    text = text.trim();
  }

  return text;
};

},{}],81:[function(_dereq_,module,exports){
"use strict";

/** remove start and end whitespace */
exports.trim = function () {
  var terms = this.terms();

  if (terms.length > 0) {
    //trim starting
    terms[0].pre = terms[0].pre.replace(/^\s+/, ''); //trim ending

    var lastTerm = terms[terms.length - 1];
    lastTerm.post = lastTerm.post.replace(/\s+$/, '');
  }

  return this;
};

},{}],82:[function(_dereq_,module,exports){
"use strict";

var append = _dereq_('../insert/append');

var prepend = _dereq_('../insert/prepend');

var deletePhrase = _dereq_('../insert/delete'); // const tokenize = require('../../01-tokenizer')

/** put this text at the end */


exports.append = function (newPhrase, doc) {
  append(this, newPhrase, doc);
  return this;
};
/** add this text to the beginning */


exports.prepend = function (newPhrase, doc) {
  prepend(this, newPhrase, doc);
  return this;
};

exports["delete"] = function (doc) {
  deletePhrase(this, doc);
  return this;
}; // stich-in newPhrase, stretch 'doc' + parents


exports.replace = function (newPhrase, doc) {
  // doc.debug()
  //add it do the end
  var firstLength = this.length;
  append(this, newPhrase, doc); //delete original terms

  var tmp = this.buildFrom(this.start, this.length);
  tmp.length = firstLength; // console.log(tmp)

  deletePhrase(tmp, doc); // return doc
};
/**
 * Turn this phrase object into 3 phrase objects
 */


exports.splitOn = function (p) {
  var terms = this.terms();
  var result = {
    before: null,
    match: null,
    after: null
  };
  var index = terms.findIndex(function (t) {
    return t.id === p.start;
  });

  if (index === -1) {
    return result;
  } //make all three sections into phrase-objects


  var start = terms.slice(0, index);

  if (start.length > 0) {
    result.before = this.buildFrom(start[0].id, start.length);
  }

  var match = terms.slice(index, index + p.length);

  if (match.length > 0) {
    result.match = this.buildFrom(match[0].id, match.length);
  }

  var end = terms.slice(index + p.length, terms.length);

  if (end.length > 0) {
    result.after = this.buildFrom(end[0].id, end.length, this.pool);
  }

  return result;
};

},{"../insert/append":71,"../insert/delete":72,"../insert/prepend":73}],83:[function(_dereq_,module,exports){
"use strict";

/** return json metadata for this phrase */
exports.json = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var res = {}; // text data

  if (options.text) {
    res.text = this.text();
  }

  if (options.normal) {
    res.normal = this.text('normal');
  }

  if (options.clean) {
    res.clean = this.text('clean');
  }

  if (options.reduced) {
    res.reduced = this.text('reduced');
  }

  if (options.root) {
    res.root = this.text('root');
  }

  if (options.trim) {
    if (res.text) {
      res.text = res.text.trim();
    }

    if (res.normal) {
      res.normal = res.normal.trim();
    }

    if (res.reduced) {
      res.reduced = res.reduced.trim();
    }
  } // terms data


  if (options.terms) {
    if (options.terms === true) {
      options.terms = {};
    }

    res.terms = this.terms().map(function (t) {
      return t.json(options.terms, world);
    });
  }

  return res;
};

},{}],84:[function(_dereq_,module,exports){
"use strict";

/** match any terms after this phrase */
exports.lookAhead = function (regs) {
  // if empty match string, return everything after
  if (!regs) {
    regs = '.*';
  }

  var pool = this.pool; // get a list of all terms preceding our start

  var terms = [];

  var getAfter = function getAfter(id) {
    var term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getAfter(term.next); //recursion
    }
  };

  var all = this.terms();
  var lastTerm = all[all.length - 1];
  getAfter(lastTerm.next);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  var p = this.buildFrom(terms[0].id, terms.length);
  return p.match(regs);
};
/** match any terms before this phrase */


exports.lookBehind = function (regs) {
  // if empty match string, return everything before
  if (!regs) {
    regs = '.*';
  }

  var pool = this.pool; // get a list of all terms preceding our start

  var terms = [];

  var getBefore = function getBefore(id) {
    var term = pool.get(id);

    if (!term) {
      return;
    }

    terms.push(term);

    if (term.prev) {
      getBefore(term.prev); //recursion
    }
  };

  var term = pool.get(this.start);
  getBefore(term.prev);

  if (terms.length === 0) {
    return [];
  } // got the terms, make a phrase from them


  var p = this.buildFrom(terms[terms.length - 1].id, terms.length);
  return p.match(regs);
};

},{}],85:[function(_dereq_,module,exports){
"use strict";

module.exports = Object.assign({}, _dereq_('./01-utils'), _dereq_('./02-text'), _dereq_('./03-change'), _dereq_('./04-insert'), _dereq_('./05-json'), _dereq_('./06-lookahead'));

},{"./01-utils":79,"./02-text":80,"./03-change":81,"./04-insert":82,"./05-json":83,"./06-lookahead":84}],86:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  /**  */
  var Abbreviations =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Abbreviations, _Doc);

    function Abbreviations() {
      _classCallCheck(this, Abbreviations);

      return _possibleConstructorReturn(this, _getPrototypeOf(Abbreviations).apply(this, arguments));
    }

    _createClass(Abbreviations, [{
      key: "stripPeriods",
      value: function stripPeriods() {
        this.termList().forEach(function (t) {
          if (t.tags.Abbreviation === true && t.next) {
            t.post = t.post.replace(/^\./, '');
          }

          var str = t.text.replace(/\./, '');
          t.set(str);
        });
        return this;
      }
    }, {
      key: "addPeriods",
      value: function addPeriods() {
        this.termList().forEach(function (t) {
          t.post = t.post.replace(/^\./, '');
          t.post = '.' + t.post;
        });
        return this;
      }
    }]);

    return Abbreviations;
  }(Doc);

  Abbreviations.prototype.unwrap = Abbreviations.prototype.stripPeriods;

  Doc.prototype.abbreviations = function (n) {
    var match = this.match('#Abbreviation');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Abbreviations(match.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],87:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  /**  */
  var Acronyms =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Acronyms, _Doc);

    function Acronyms() {
      _classCallCheck(this, Acronyms);

      return _possibleConstructorReturn(this, _getPrototypeOf(Acronyms).apply(this, arguments));
    }

    _createClass(Acronyms, [{
      key: "stripPeriods",
      value: function stripPeriods() {
        this.termList().forEach(function (t) {
          var str = t.text.replace(/\./g, '');
          t.set(str);
        });
        return this;
      }
    }, {
      key: "addPeriods",
      value: function addPeriods() {
        this.termList().forEach(function (t) {
          var str = t.text.replace(/\./g, '');
          str = str.split('').join('.');
          t.set(str);
        });
        return this;
      }
    }]);

    return Acronyms;
  }(Doc);

  Acronyms.prototype.unwrap = Acronyms.prototype.stripPeriods;
  Acronyms.prototype.strip = Acronyms.prototype.stripPeriods;

  Doc.prototype.acronyms = function (n) {
    var match = this.match('#Acronym');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Acronyms(match.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],88:[function(_dereq_,module,exports){
"use strict";

var addMethod = function addMethod(Doc) {
  /** split into approximate sub-sentence phrases */
  Doc.prototype.clauses = function (n) {
    // an awkward way to disambiguate a comma use
    var commas = this["if"]('@hasComma').notIf('@hasComma @hasComma') //fun, cool...
    .notIf('@hasComma . .? (and|or) .') //cool, and fun
    .notIf('(#City && @hasComma) #Country') //'toronto, canada'
    .notIf('(#Date && @hasComma) #Year') //'july 6, 1992'
    .notIf('@hasComma (too|also)$') //at end of sentence
    .match('@hasComma');
    var found = this.splitAfter(commas);
    var quotes = found.quotations();
    found = found.splitOn(quotes);
    var parentheses = found.parentheses();
    found = found.splitOn(parentheses); // it is cool and it is ..

    var conjunctions = found["if"]('#Copula #Adjective #Conjunction (#Pronoun|#Determiner) #Verb').match('#Conjunction');
    found = found.splitBefore(conjunctions); // if it is this then that

    var condition = found["if"]('if .{2,9} then .').match('then');
    found = found.splitBefore(condition); // misc clause partitions

    found = found.splitBefore('as well as .');
    found = found.splitBefore('such as .');
    found = found.splitBefore('in addition to .'); // semicolons, dashes

    found = found.splitAfter('@hasSemicolon');
    found = found.splitAfter('@hasDash'); // does there appear to have relative/subordinate clause still?

    var tooLong = found.filter(function (d) {
      return d.wordCount() > 5 && d.match('#Verb+').length >= 2;
    });

    if (tooLong.found) {
      var m = tooLong.splitAfter('#Noun .* #Verb .* #Noun+');
      found = found.splitOn(m.eq(0));
    }

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Doc(found.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],89:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  /**  */
  var Contractions =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Contractions, _Doc);

    function Contractions(list, from, world) {
      var _this;

      _classCallCheck(this, Contractions);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Contractions).call(this, list, from, world));
      _this.contracted = null;
      return _this;
    }
    /** turn didn't into 'did not' */


    _createClass(Contractions, [{
      key: "expand",
      value: function expand() {
        this.list.forEach(function (p) {
          var terms = p.terms(); //change the case?

          var isTitlecase = terms[0].isTitleCase();
          terms.forEach(function (t, i) {
            //use the implicit text
            // console.log(t.clean)
            t.set(t.implicit || t.text);
            t.implicit = undefined; //add whitespace

            if (i < terms.length - 1 && t.post === '') {
              t.post += ' ';
            }
          }); //set titlecase

          if (isTitlecase) {
            terms[0].toTitleCase();
          }
        });
        return this;
      }
    }]);

    return Contractions;
  }(Doc); //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }


  Doc.prototype.contractions = function (n) {
    //find currently-contracted
    var found = this.match('@hasContraction+'); //(may want to split these up)
    //todo: split consecutive contractions

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Contractions(found.list, this, this.world);
  }; //aliases


  Doc.prototype.expanded = Doc.prototype.isExpanded;
  Doc.prototype.contracted = Doc.prototype.isContracted;
  return Doc;
};

module.exports = addMethod;

},{}],90:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  //pull it apart..
  var parse = function parse(doc) {
    var things = doc.splitAfter('@hasComma').not('(and|or) not?');
    var beforeLast = doc.match('[.] (and|or)');
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma')
    };
  };
  /** cool, fun, and nice */


  var Lists =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Lists, _Doc);

    function Lists() {
      _classCallCheck(this, Lists);

      return _possibleConstructorReturn(this, _getPrototypeOf(Lists).apply(this, arguments));
    }

    _createClass(Lists, [{
      key: "conjunctions",

      /** coordinating conjunction */
      value: function conjunctions() {
        return this.match('(and|or)');
      }
      /** split-up by list object */

    }, {
      key: "parts",
      value: function parts() {
        return this.splitAfter('(@hasComma|#Conjunction)');
      }
      /** remove the conjunction */

    }, {
      key: "items",
      value: function items() {
        return this.parts().notIf('#Conjunction');
      }
      /** add a new unit to the list */

    }, {
      key: "add",
      value: function add(str) {
        this.forEach(function (p) {
          var beforeLast = parse(p).beforeLast;
          beforeLast.append(str); //add a comma to it

          beforeLast.termList(0).addPunctuation(',');
        });
        return this;
      }
      /** remove any matching unit from the list */

    }, {
      key: "remove",
      value: function remove() {
        return this;
      }
      /** return only lists that use a serial comma */

    }, {
      key: "hasOxfordComma",
      value: function hasOxfordComma() {
        return this.filter(function (doc) {
          return parse(doc).hasOxford;
        });
      }
    }, {
      key: "addOxfordComma",
      value: function addOxfordComma() {
        return this;
      }
    }, {
      key: "removeOxfordComma",
      value: function removeOxfordComma() {
        return this;
      }
    }]);

    return Lists;
  }(Doc); // aliases


  Lists.prototype.things = Lists.prototype.items;

  Doc.prototype.lists = function (n) {
    var m = this["if"]('@hasComma+ .? (and|or) not? .'); // person-list

    var nounList = m.match('(#Noun|#Adjective)+ #Conjunction not? #Adjective? #Noun+');
    var adjList = m.match('(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+');
    var verbList = m.match('(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+');
    var result = nounList.concat(adjList);
    result = result.concat(verbList);
    result = result["if"]('@hasComma');

    if (typeof n === 'number') {
      result = m.get(n);
    }

    return new Lists(result.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],91:[function(_dereq_,module,exports){
'use strict'; //chooses an indefinite aricle 'a/an' for a word

var irregulars = {
  hour: 'an',
  heir: 'an',
  heirloom: 'an',
  honest: 'an',
  honour: 'an',
  honor: 'an',
  uber: 'an' //german u

}; //pronounced letters of acronyms that get a 'an'

var an_acronyms = {
  a: true,
  e: true,
  f: true,
  h: true,
  i: true,
  l: true,
  m: true,
  n: true,
  o: true,
  r: true,
  s: true,
  x: true
}; //'a' regexes

var a_regexs = [/^onc?e/i, //'wu' sound of 'o'
/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
/^eul/i];

var makeArticle = function makeArticle(doc) {
  //no 'the john smith', but 'a london hotel'
  if (doc.has('#Person') || doc.has('#Place')) {
    return '';
  } //no a/an if it's plural


  if (doc.has('#Plural')) {
    return 'the';
  }

  var str = doc.text('normal').trim(); //explicit irregular forms

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //spelled-out acronyms


  var firstLetter = str.substr(0, 1);

  if (doc.has('^@isAcronym') && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an';
  } //'a' regexes


  for (var i = 0; i < a_regexs.length; i++) {
    if (a_regexs[i].test(str)) {
      return 'a';
    }
  } //basic vowel-startings


  if (/^[aeiou]/i.test(str)) {
    return 'an';
  }

  return 'a';
};

module.exports = makeArticle;

},{}],92:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var methods = _dereq_('./methods');

var addMethod = function addMethod(Doc) {
  /**  */
  var Nouns =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Nouns, _Doc);

    function Nouns() {
      _classCallCheck(this, Nouns);

      return _possibleConstructorReturn(this, _getPrototypeOf(Nouns).apply(this, arguments));
    }

    return Nouns;
  }(Doc); // add-in our methods


  Object.assign(Nouns.prototype, methods);

  Doc.prototype.nouns = function (n) {
    var match = this.clauses();
    match = match.match('#Noun+ (of|by)? the? #Noun+?'); //nouns that we don't want in these results, for weird reasons

    match = match.not('#Pronoun');
    match = match.not('(there|these)');
    match = match.not('(#Month|#WeekDay)'); //allow Durations, Holidays
    // //allow possessives like "spencer's", but not generic ones like,

    match = match.not('(my|our|your|their|her|his)');
    match = match.not('(of|for|by|the)$');

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new Nouns(match.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{"./methods":93}],93:[function(_dereq_,module,exports){
"use strict";

var _hasPlural = _dereq_('./plural/hasPlural');

var getArticle = _dereq_('./getArticle');

var isPlural = _dereq_('./plural/isPlural');

var _toPossessive = _dereq_('./toPossessive');

var parse = _dereq_('./parse');

var methods = {
  /** overload the original json with noun information */
  json: function json(options) {
    var n = null;

    if (typeof options === 'number') {
      n = options;
      options = null;
    }

    options = options || {
      text: true,
      normal: true,
      trim: true,
      terms: true
    };
    var res = [];
    this.forEach(function (doc) {
      var json = doc.json(options)[0];
      json.article = getArticle(doc);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },
  isPlural: function isPlural() {
    return this["if"]('#Plural'); //assume tagger has run?
  },
  hasPlural: function hasPlural() {
    return this.filter(function (d) {
      return _hasPlural(d);
    });
  },
  toPlural: function toPlural() {
    var _this = this;

    var toPlural = this.world.transforms.toPlural;
    this.forEach(function (doc) {
      if (doc.has('#Plural') || _hasPlural(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      var main = parse(doc).main;
      var str = main.text();

      if (!main.has('#Singular') && isPlural(str) === true) {
        return;
      }

      str = toPlural(str, _this.world);
      main.replace(str).tag('#Plural');
    });
    return this;
  },
  toSingular: function toSingular() {
    var _this2 = this;

    var toSingular = this.world.transforms.toSingular;
    this.forEach(function (doc) {
      if (doc.has('#Singular') || _hasPlural(doc) === false) {
        return;
      } // double-check it isn't an un-tagged plural


      var main = parse(doc).main;
      var str = main.text();

      if (!main.has('#Plural') && isPlural(str) !== true) {
        return;
      }

      str = toSingular(str, _this2.world);
      main.replace(str).tag('#Singular');
    });
    return this;
  },
  toPossessive: function toPossessive() {
    this.forEach(function (d) {
      _toPossessive(d);
    });
    return this;
  }
};
module.exports = methods;

},{"./getArticle":91,"./parse":94,"./plural/hasPlural":95,"./plural/isPlural":97,"./toPossessive":98}],94:[function(_dereq_,module,exports){
"use strict";

// .nouns() supports some noun-phrase-ish groupings
// pull these apart, if necessary
var parse = function parse(doc) {
  var res = {
    main: doc
  }; //support 'mayor of chicago' as one noun-phrase

  if (doc.has('#Noun (of|by|for) .')) {
    var m = doc.splitAfter('[#Noun+]');
    res.main = m.eq(0);
    res.post = m.eq(1);
  }

  return res;
};

module.exports = parse;

},{}],95:[function(_dereq_,module,exports){
"use strict";

var noPlural = '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)'; //certain words can't be plural, like 'peace'

var hasPlural = function hasPlural(doc) {
  if (doc.has('#Plural') === true) {
    return true;
  } // these can't be plural


  if (doc.has(noPlural) === true) {
    return false;
  }

  return true;
};

module.exports = hasPlural;

},{}],96:[function(_dereq_,module,exports){
"use strict";

//similar to plural/singularize rules, but not the same
var isPlural = [/(antenn|formul|nebul|vertebr|vit)ae$/i, /(octop|vir|radi|nucle|fung|cact|stimul)i$/i, /men$/i, /.tia$/i, /(m|l)ice$/i]; //similar to plural/singularize rules, but not the same

var isSingular = [/(ax|test)is$/i, /(octop|vir|radi|nucle|fung|cact|stimul)us$/i, /(octop|vir)i$/i, /(rl)f$/i, /(alias|status)$/i, /(bu)s$/i, /(al|ad|at|er|et|ed|ad)o$/i, /(ti)um$/i, /(ti)a$/i, /sis$/i, /(?:(^f)fe|(lr)f)$/i, /hive$/i, /(^aeiouy|qu)y$/i, /(x|ch|ss|sh|z)$/i, /(matr|vert|ind|cort)(ix|ex)$/i, /(m|l)ouse$/i, /(m|l)ice$/i, /(antenn|formul|nebul|vertebr|vit)a$/i, /.sis$/i, /^(?!talis|.*hu)(.*)man$/i];
module.exports = {
  isSingular: isSingular,
  isPlural: isPlural
};

},{}],97:[function(_dereq_,module,exports){
"use strict";

var rules = _dereq_('./_rules');

var endS = /s$/; // double-check this term, if it is not plural, or singular.
// (this is a partial copy of ./tagger/fallbacks/plural)
// fallback plural if it ends in an 's'.

var isPlural = function isPlural(str) {
  // isSingular suffix rules
  if (rules.isSingular.find(function (reg) {
    return reg.test(str);
  })) {
    return false;
  } // does it end in an s?


  if (endS.test(str) === true) {
    return true;
  } // is it a plural like 'fungi'?


  if (rules.isPlural.find(function (reg) {
    return reg.test(str);
  })) {
    return true;
  }

  return null;
};

module.exports = isPlural;

},{"./_rules":96}],98:[function(_dereq_,module,exports){
"use strict";

var exceptions = {
  he: 'his',
  she: 'hers',
  they: 'theirs',
  we: 'ours',
  i: 'mine',
  you: 'yours',
  her: 'hers',
  their: 'theirs',
  our: 'ours',
  my: 'mine',
  your: 'yours'
}; // turn "David" to "David's"

var toPossessive = function toPossessive(doc) {
  var str = doc.text('text').trim(); // exceptions

  if (exceptions.hasOwnProperty(str)) {
    doc.replaceWith(exceptions[str], true, true);
    doc.tag('Possessive', 'toPossessive');
    return;
  } // flanders'


  if (/s$/.test(str)) {
    str += "'";
    doc.replaceWith(str, true, true);
    doc.tag('Possessive', 'toPossessive');
    return;
  } //normal form:


  str += "'s";
  doc.replaceWith(str, true, true);
  doc.tag('Possessive', 'toPossessive');
  return;
};

module.exports = toPossessive;

},{}],99:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var open = /\(/;
var close = /\)/;

var addMethod = function addMethod(Doc) {
  /** anything between (these things) */
  var Parentheses =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Parentheses, _Doc);

    function Parentheses() {
      _classCallCheck(this, Parentheses);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parentheses).apply(this, arguments));
    }

    _createClass(Parentheses, [{
      key: "unwrap",

      /** remove the parentheses characters */
      value: function unwrap() {
        this.list.forEach(function (p) {
          var first = p.terms(0);
          first.pre = first.pre.replace(open, '');
          var last = p.lastTerm();
          last.post = last.post.replace(close, '');
        });
        return this;
      }
    }]);

    return Parentheses;
  }(Doc);

  Doc.prototype.parentheses = function (n) {
    var list = [];
    this.list.forEach(function (p) {
      var terms = p.terms(); //look for opening brackets

      for (var i = 0; i < terms.length; i += 1) {
        var t = terms[i];

        if (open.test(t.pre)) {
          //look for the closing bracket..
          for (var o = i; o < terms.length; o += 1) {
            if (close.test(terms[o].post)) {
              var len = o - i + 1;
              list.push(p.buildFrom(t.id, len));
              i = o;
              break;
            }
          }
        }
      }
    }); //support nth result

    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]];
      } else {
        list = [];
      }

      return new Parentheses(list, this, this.world);
    }

    return new Parentheses(list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],100:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  /**  */
  var People =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(People, _Doc);

    function People() {
      _classCallCheck(this, People);

      return _possibleConstructorReturn(this, _getPrototypeOf(People).apply(this, arguments));
    }

    return People;
  }(Doc);

  Doc.prototype.people = function (n) {
    var match = this.splitAfter('@hasComma');
    match = match.match('#Person+'); //grab (n)th result

    if (typeof n === 'number') {
      match = match.get(n);
    }

    return new People(match.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],101:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var addMethod = function addMethod(Doc) {
  /**  */
  var Possessives =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Possessives, _Doc);

    function Possessives(list, from, world) {
      var _this;

      _classCallCheck(this, Possessives);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Possessives).call(this, list, from, world));
      _this.contracted = null;
      return _this;
    }
    /** turn didn't into 'did not' */


    _createClass(Possessives, [{
      key: "strip",
      value: function strip() {
        this.list.forEach(function (p) {
          var terms = p.terms();
          terms.forEach(function (t) {
            var str = t.text.replace(/'s$/, '');
            t.set(str || t.text);
          });
        });
        return this;
      }
    }]);

    return Possessives;
  }(Doc); //find contractable, expanded-contractions
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }


  Doc.prototype.possessives = function (n) {
    //find currently-contracted
    var found = this.match('#Noun+? #Possessive'); //todo: split consecutive contractions

    if (typeof n === 'number') {
      found = found.get(n);
    }

    return new Possessives(found.list, this, this.world);
  };

  return Doc;
};

module.exports = addMethod;

},{}],102:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var pairs = {
  "\"": "\"",
  // 'StraightDoubleQuotes'
  "\uFF02": "\uFF02",
  // 'StraightDoubleQuotesWide'
  "'": "'",
  // 'StraightSingleQuotes'
  "\u201C": "\u201D",
  // 'CommaDoubleQuotes'
  "\u2018": "\u2019",
  // 'CommaSingleQuotes'
  "\u201F": "\u201D",
  // 'CurlyDoubleQuotesReversed'
  "\u201B": "\u2019",
  // 'CurlySingleQuotesReversed'
  "\u201E": "\u201D",
  // 'LowCurlyDoubleQuotes'
  "\u2E42": "\u201D",
  // 'LowCurlyDoubleQuotesReversed'
  "\u201A": "\u2019",
  // 'LowCurlySingleQuotes'
  "\xAB": "\xBB",
  // 'AngleDoubleQuotes'
  "\u2039": "\u203A",
  // 'AngleSingleQuotes'
  // Prime 'non quotation'
  "\u2035": "\u2032",
  // 'PrimeSingleQuotes'
  "\u2036": "\u2033",
  // 'PrimeDoubleQuotes'
  "\u2037": "\u2034",
  // 'PrimeTripleQuotes'
  // Prime 'quotation' variation
  "\u301D": "\u301E",
  // 'PrimeDoubleQuotes'
  "`": "\xB4",
  // 'PrimeSingleQuotes'
  "\u301F": "\u301E" // 'LowPrimeDoubleQuotesReversed'

};
var hasOpen = RegExp('(' + Object.keys(pairs).join('|') + ')');

var addMethod = function addMethod(Doc) {
  /** "these things" */
  var Quotations =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Quotations, _Doc);

    function Quotations() {
      _classCallCheck(this, Quotations);

      return _possibleConstructorReturn(this, _getPrototypeOf(Quotations).apply(this, arguments));
    }

    _createClass(Quotations, [{
      key: "unwrap",

      /** remove the quote characters */
      value: function unwrap() {
        return this;
      }
    }]);

    return Quotations;
  }(Doc);

  Doc.prototype.quotations = function (n) {
    var list = [];
    this.list.forEach(function (p) {
      var terms = p.terms(); //look for opening quotes

      for (var i = 0; i < terms.length; i += 1) {
        var t = terms[i];

        if (hasOpen.test(t.pre)) {
          var _char = (t.pre.match(hasOpen) || [])[0];
          var want = pairs[_char]; // if (!want) {
          //   console.warn('missing quote char ' + char)
          // }
          //look for the closing bracket..

          for (var o = i; o < terms.length; o += 1) {
            if (terms[o].post.indexOf(want) !== -1) {
              var len = o - i + 1;
              list.push(p.buildFrom(t.id, len));
              i = o;
              break;
            }
          }
        }
      }
    }); //support nth result

    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]];
      } else {
        list = [];
      }

      return new Quotations(list, this, this.world);
    }

    return new Quotations(list, this, this.world);
  }; // alias


  Doc.prototype.quotes = Doc.prototype.quotations;
  return Doc;
};

module.exports = addMethod;

},{}],103:[function(_dereq_,module,exports){
"use strict";

var toInfinitive = _dereq_('../toInfinitive');

var toBe = _dereq_('./toBe');

var conjugate = function conjugate(parsed, world) {
  var verb = parsed.verb; //special handling of 'is', 'will be', etc.

  if (verb.has('#Copula') || verb.out('normal') === 'be' && parsed.auxiliary.has('will')) {
    return toBe(parsed, world);
  }

  var infinitive = toInfinitive(parsed, world);

  if (!infinitive) {
    return {};
  } // console.log(infinitive)


  var forms = world.transforms.conjugate(infinitive, world);
  forms.Infinitive = infinitive; // add particle to phrasal verbs ('fall over')

  if (parsed.particle.found) {
    var particle = parsed.particle.text();
    Object.keys(forms).forEach(function (k) {
      return forms[k] += ' ' + particle;
    });
  } //put the adverb at the end?


  if (parsed.adverb.found) {
    var adverb = parsed.adverb.text();

    if (parsed.adverbAfter === true) {
      Object.keys(forms).forEach(function (k) {
        return forms[k] += ' ' + adverb;
      });
    } else {
      Object.keys(forms).forEach(function (k) {
        return forms[k] = adverb + ' ' + forms[k];
      });
    }
  } //apply negative


  var isNegative = parsed.negative.found;

  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive;
    forms.PresentTense = 'does not ' + forms.Infinitive;
    forms.Gerund = 'not ' + forms.Gerund;
  } //future Tense is pretty straightforward


  if (!forms.FutureTense) {
    if (isNegative) {
      forms.FutureTense = 'will not ' + forms.Infinitive;
    } else {
      forms.FutureTense = 'will ' + forms.Infinitive;
    }
  }

  if (isNegative) {
    forms.Infinitive = 'not ' + forms.Infinitive;
  }

  return forms;
};

module.exports = conjugate;

},{"../toInfinitive":109,"./toBe":104}],104:[function(_dereq_,module,exports){
"use strict";

var isPlural = _dereq_('../isPlural');
/** too many special cases for is/was/will be*/


var toBe = function toBe(parsed) {
  var isI = false;
  var plural = isPlural(parsed);
  var isNegative = parsed.negative.found; //account for 'i is' -> 'i am' irregular
  // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
  //   isI = true;
  // }
  // 'i look', not 'i looks'

  if (parsed.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
    isI = true;
  }

  var obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been'
  }; //"i is" -> "i am"

  if (isI === true) {
    obj.PresentTense = 'am';
    obj.Infinitive = 'am';
  }

  if (plural) {
    obj.PastTense = 'were';
    obj.PresentTense = 'are';
    obj.Infinitive = 'are';
  }

  if (isNegative) {
    obj.PastTense += ' not';
    obj.PresentTense += ' not';
    obj.FutureTense = 'will not be';
    obj.Infinitive += ' not';
    obj.PerfectTense = 'not ' + obj.PerfectTense;
    obj.Pluperfect = 'not ' + obj.Pluperfect;
    obj.Gerund = 'not ' + obj.Gerund;
  }

  return obj;
};

module.exports = toBe;

},{"../isPlural":106}],105:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var methods = _dereq_('./methods');

var addMethod = function addMethod(Doc) {
  /**  */
  var Verbs =
  /*#__PURE__*/
  function (_Doc) {
    _inherits(Verbs, _Doc);

    function Verbs() {
      _classCallCheck(this, Verbs);

      return _possibleConstructorReturn(this, _getPrototypeOf(Verbs).apply(this, arguments));
    }

    return Verbs;
  }(Doc); // add-in our methods


  Object.assign(Verbs.prototype, methods); // aliases

  Verbs.prototype.negate = Verbs.prototype.toNegative;

  Doc.prototype.verbs = function (n) {
    var match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+'); // try to ignore leading and trailing adverbs

    match = match.not('^#Adverb+');
    match = match.not('#Adverb+$'); // handle commas:
    // don't split 'really, really'

    var keep = match.match('(#Adverb && @hasComma) #Adverb'); // // but split the other commas

    var m = match.not(keep).splitAfter('@hasComma'); // // combine them back together

    m = m.concat(keep);
    m.sort('index'); //handle slashes?
    //ensure there's actually a verb

    m = m["if"]('#Verb'); //grab (n)th result

    if (typeof n === 'number') {
      m = m.get(n);
    }

    var vb = new Verbs(m.list, this, this.world);
    return vb;
  };

  return Doc;
};

module.exports = addMethod;

},{"./methods":107}],106:[function(_dereq_,module,exports){
"use strict";

// spencer walks -> singular
// we walk -> plural
// the most-recent noun-phrase, before this verb.
var findNoun = function findNoun(vb) {
  var noun = vb.lookBehind('#Noun+').last();
  return noun;
}; //sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
// othertimes you need its subject 'we walk' vs 'i walk'


var isPlural = function isPlural(parsed) {
  var vb = parsed.verb;

  if (vb.has('(are|were|does)') || parsed.auxiliary.has('(are|were|does)')) {
    return true;
  }

  if (vb.has('(is|am|do|was)') || parsed.auxiliary.has('(is|am|do|was)')) {
    return false;
  } //consider its prior noun


  var noun = findNoun(vb);

  if (noun.has('(we|they|you)')) {
    return true;
  }

  if (noun.has('#Plural')) {
    return true;
  }

  if (noun.has('#Singular')) {
    return false;
  }

  return null;
};

module.exports = isPlural;

},{}],107:[function(_dereq_,module,exports){
"use strict";

var _toNegative = _dereq_('./toNegative');

var parseVerb = _dereq_('./parse');

var _isPlural = _dereq_('./isPlural');

var _conjugate = _dereq_('./conjugate');

var _toInfinitive = _dereq_('./toInfinitive');

module.exports = {
  /** overload the original json with verb information */
  json: function json(options) {
    var _this = this;

    var n = null;

    if (typeof options === 'number') {
      n = options;
      options = null;
    }

    options = options || {
      text: true,
      normal: true,
      trim: true,
      terms: true
    };
    var res = [];
    this.forEach(function (p) {
      var json = p.json(options)[0];
      var parsed = parseVerb(p);
      json.parts = {};
      Object.keys(parsed).forEach(function (k) {
        json.parts[k] = parsed[k].text('normal');
      });
      json.isNegative = p.has('#Negative');
      json.conjugations = _conjugate(parsed, _this.world);
      res.push(json);
    });

    if (n !== null) {
      return res[n];
    }

    return res;
  },

  /** grab the adverbs describing these verbs */
  adverbs: function adverbs() {
    var list = []; // look at internal adverbs

    this.forEach(function (vb) {
      var advb = parseVerb(vb).adverb;

      if (advb.found) {
        list = list.concat(advb.list);
      }
    }); // look for leading adverbs

    var m = this.lookBehind('#Adverb$');

    if (m.found) {
      list = m.list.concat(list);
    } // look for trailing adverbs


    m = this.lookAhead('^#Adverb');

    if (m.found) {
      list = list.concat(m.list);
    }

    return this.buildFrom(list);
  },

  /**return verbs like 'we walk' and not 'spencer walks' */
  isPlural: function isPlural() {
    var _this2 = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      if (_isPlural(parsed, _this2.world) === true) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },

  /** return verbs like 'spencer walks' and not 'we walk' */
  isSingular: function isSingular() {
    var _this3 = this;

    var list = [];
    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      if (_isPlural(parsed, _this3.world) === false) {
        list.push(vb.list[0]);
      }
    });
    return this.buildFrom(list);
  },

  /**  */
  conjugate: function conjugate() {
    var _this4 = this;

    var result = [];
    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var forms = _conjugate(parsed, _this4.world);

      result.push(forms);
    });
    return result;
  },

  /** */
  toPastTense: function toPastTense() {
    var _this5 = this;

    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var str = _conjugate(parsed, _this5.world).PastTense;

      if (str) {
        vb.replaceWith(str, false, true); // vb.tag('PastTense')
      }
    });
    return this;
  },

  /** */
  toPresentTense: function toPresentTense() {
    var _this6 = this;

    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var obj = _conjugate(parsed, _this6.world);

      var str = obj.PresentTense; // 'i look', not 'i looks'

      if (vb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
        str = obj.Infinitive;
      }

      if (str) {
        vb.replaceWith(str, false, true);
        vb.tag('PresentTense');
      }
    });
    return this;
  },

  /** */
  toFutureTense: function toFutureTense() {
    var _this7 = this;

    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var str = _conjugate(parsed, _this7.world).FutureTense;

      if (str) {
        vb.replaceWith(str, false, true);
        vb.tag('FutureTense');
      }
    });
    return this;
  },

  /** */
  toInfinitive: function toInfinitive() {
    var _this8 = this;

    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var str = _toInfinitive(parsed, _this8.world);

      if (str) {
        vb.replaceWith(str, false, true);
        vb.tag('Infinitive');
      }
    });
    return this;
  },

  /** */
  toGerund: function toGerund() {
    var _this9 = this;

    this.forEach(function (vb) {
      var parsed = parseVerb(vb);

      var str = _conjugate(parsed, _this9.world).Gerund;

      if (str) {
        vb.replaceWith(str, false, true);
        vb.tag('Gerund');
      }
    });
    return this;
  },

  /** return only verbs with 'not'*/
  isNegative: function isNegative() {
    return this["if"]('#Negative');
  },

  /**  return only verbs without 'not'*/
  isPositive: function isPositive() {
    return this.ifNo('#Negative');
  },

  /** add a 'not' to these verbs */
  toNegative: function toNegative() {
    var _this10 = this;

    this.list.forEach(function (p) {
      var doc = _this10.buildFrom([p]);

      var parsed = parseVerb(doc);

      _toNegative(parsed, doc.world);
    });
    return this;
  },

  /** remove 'not' from these verbs */
  toPositive: function toPositive() {
    var m = this.match('do not #Verb');

    if (m.found) {
      m.remove('do not');
    }

    return this.remove('#Negative');
  }
};

},{"./conjugate":103,"./isPlural":106,"./parse":108,"./toInfinitive":109,"./toNegative":110}],108:[function(_dereq_,module,exports){
"use strict";

// turn 'would not really walk up' into parts
var parseVerb = function parseVerb(vb) {
  var parsed = {
    adverb: vb.match('#Adverb+'),
    // 'really'
    negative: vb.match('#Negative'),
    // 'not'
    auxiliary: vb.match('#Auxiliary').not('(#Negative|#Adverb)'),
    // 'will' of 'will go'
    particle: vb.match('#Particle'),
    // 'up' of 'pull up'
    verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)')
  }; // fallback, if no verb found

  if (!parsed.verb.found) {
    // blank-everything
    Object.keys(parsed).forEach(function (k) {
      parsed[k] = parsed[k].not('.');
    }); // it's all the verb

    parsed.verb = vb;
    return parsed;
  } //


  if (parsed.adverb && parsed.adverb.found) {
    var match = parsed.adverb.text('reduced') + '$';

    if (vb.has(match)) {
      parsed.adverbAfter = true;
    }
  } // console.log(parsed.adverb.json({ index: true })[0])


  return parsed;
};

module.exports = parseVerb;

},{}],109:[function(_dereq_,module,exports){
"use strict";

// walked => walk  - turn a verb into it's root form
var toInfinitive = function toInfinitive(parsed, world) {
  var verb = parsed.verb; //1. if it's already infinitive

  var str = verb.text('normal');

  if (verb.has('#Infinitive')) {
    return str;
  } // 2. world transform does the heavy-lifting


  var tense = null;

  if (verb.has('#PastTense')) {
    tense = 'PastTense';
  } else if (verb.has('#Gerund')) {
    tense = 'Gerund';
  } else if (verb.has('#PresentTense')) {
    tense = 'PresentTense';
  } else if (verb.has('#Participle')) {
    tense = 'Participle';
  } else if (verb.has('#Actor')) {
    tense = 'Actor';
  }

  return world.transforms.toInfinitive(str, world, tense);
};

module.exports = toInfinitive;

},{}],110:[function(_dereq_,module,exports){
"use strict";

var toInfinitive = _dereq_('./toInfinitive');

var isPlural = _dereq_('./isPlural'); // #Modal : would walk    -> 'would not walk'
// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk


var toNegative = function toNegative(parsed, world) {
  var vb = parsed.verb; // if it's already negative...

  if (parsed.negative.found) {
    return;
  } // would walk -> would not walk


  if (parsed.auxiliary.found) {
    parsed.auxiliary.eq(0).append('not');
    return;
  } // is walking -> is not walking


  if (vb.has('(#Copula|will|has|had|do)')) {
    vb.append('not');
    return;
  } // walked -> did not walk


  if (vb.has('#PastTense')) {
    var inf = toInfinitive(parsed, world);
    vb.replaceWith(inf, true, true);
    vb.prepend('did not');
    return;
  } // walks -> does not walk


  if (vb.has('#PresentTense')) {
    var _inf = toInfinitive(parsed, world);

    vb.replaceWith(_inf, true, true);

    if (isPlural(parsed, world)) {
      vb.prepend('do not');
    } else {
      vb.prepend('does not');
    }

    return;
  } //walking -> not walking


  if (vb.has('#Gerund')) {
    var _inf2 = toInfinitive(parsed, world);

    vb.replaceWith(_inf2, true, true);
    vb.prepend('not');
    return;
  } //fallback 1:  walk -> does not walk


  if (isPlural(parsed, world)) {
    vb.prepend('does not');
    return;
  } //fallback 2:  walk -> do not walk


  vb.prepend('do not');
  return;
};

module.exports = toNegative;

},{"./isPlural":106,"./toInfinitive":109}],111:[function(_dereq_,module,exports){
"use strict";

var methods = {}; // allow helper methods like .adjectives() and .adverbs()

var arr = [['terms', '.'], ['hyphenated', '@hasHyphen .'], ['adjectives', '#Adjective'], ['hashTags', '#HashTag'], ['emails', '#Email'], ['emoji', '#Emoji'], ['emoticons', '#Emoticon'], ['atMentions', '#AtMention'], ['urls', '#Url'], ['adverbs', '#Adverb'], ['pronouns', '#Pronoun'], ['money', '#Money'], ['conjunctions', '#Conjunction'], ['prepositions', '#Preposition']];
arr.forEach(function (a) {
  methods[a[0]] = function (n) {
    var m = this.match(a[1]);

    if (typeof n === 'number') {
      m = m.get(n);
    }

    return m;
  };
}); // aliases

methods.emojis = methods.emoji;
methods.atmentions = methods.atMentions;
methods.words = methods.terms;
/** return anything tagged as a phone number */

methods.phoneNumbers = function (n) {
  var m = this.splitAfter('@hasComma');
  m = m.match('#PhoneNumber+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** return all cities, countries, addresses, and regions */


methods.places = function (n) {
  // don't split 'paris, france'
  var keep = this.match('(#City && @hasComma) (#Region|#Country)'); // but split the other commas

  var m = this.not(keep).splitAfter('@hasComma'); // combine them back together

  m = m.concat(keep);
  m.sort('index');
  m = m.match('#Place+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
};
/** return all schools, businesses and institutions */


methods.organizations = function (n) {
  var m = this.clauses();
  m = m.match('#Organization+');

  if (typeof n === 'number') {
    m = m.get(n);
  }

  return m;
}; //combine them with .topics() method


methods.entities = function (n) {
  var r = this.clauses(); // Find people, places, and organizations

  var yup = r.people();
  yup = yup.concat(r.places());
  yup = yup.concat(r.organizations());
  var ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
  yup = yup.not(ignore); //return them to normal ordering

  yup.sort('sequence'); // yup.unique() //? not sure

  if (typeof n === 'number') {
    yup = yup.get(n);
  }

  return yup;
}; //aliases


methods.things = methods.entities;
methods.topics = methods.entities;
/** alias for .all() until it gets overloaded by plugin */

methods.sentences = function () {
  return this.all();
};

module.exports = methods;

},{}],112:[function(_dereq_,module,exports){
"use strict";

var subsets = _dereq_('./_simple');

var subclass = [_dereq_('./Abbreviations'), _dereq_('./Acronyms'), _dereq_('./Clauses'), _dereq_('./Contractions'), _dereq_('./Lists'), _dereq_('./Nouns'), _dereq_('./Parentheses'), _dereq_('./Possessives'), _dereq_('./Quotations'), _dereq_('./Verbs'), _dereq_('./People')];

var extend = function extend(Doc) {
  // add basic methods
  Object.keys(subsets).forEach(function (k) {
    return Doc.prototype[k] = subsets[k];
  }); // add subclassed methods

  subclass.forEach(function (addFn) {
    return addFn(Doc);
  });
  return Doc;
};

module.exports = extend;

},{"./Abbreviations":86,"./Acronyms":87,"./Clauses":88,"./Contractions":89,"./Lists":90,"./Nouns":92,"./Parentheses":99,"./People":100,"./Possessives":101,"./Quotations":102,"./Verbs":105,"./_simple":111}],113:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var makeId = _dereq_('./_id');

var parseTerm = _dereq_('./parse');

var methods = _dereq_('./methods');

var tagMethods = _dereq_('./tag');

var Term =
/*#__PURE__*/
function () {
  function Term() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, Term);

    text = String(text);
    var obj = parseTerm(text); // the various forms of our text

    this.text = obj.text || '';
    this.clean = obj.clean;
    this.reduced = obj.reduced;
    this.root = obj.root || null;
    this.implicit = obj.implicit || null;
    this.pre = obj.pre || '';
    this.post = obj.post || '';
    this.tags = {};
    this.prev = null;
    this.next = null;
    this.id = makeId(obj.clean);
    this.isA = 'Term'; // easier than .constructor...
    // support alternative matches

    if (obj.alias) {
      this.alias = obj.alias;
    }
  }
  /** set the text of the Term to something else*/


  _createClass(Term, [{
    key: "set",
    value: function set(str) {
      var obj = parseTerm(str);
      this.text = obj.text;
      this.clean = obj.clean;
      return this;
    }
  }]);

  return Term;
}();
/** create a deep-copy of this term */


Term.prototype.clone = function () {
  var term = new Term(this.text);
  term.pre = this.pre;
  term.post = this.post;
  term.tags = Object.assign({}, this.tags); //use the old id, so it can be matched with .match(doc)
  // term.id = this.id

  return term;
};

Object.assign(Term.prototype, methods);
Object.assign(Term.prototype, tagMethods);
module.exports = Term;

},{"./_id":114,"./methods":122,"./parse":127,"./tag":131}],114:[function(_dereq_,module,exports){
"use strict";

//this is a not-well-thought-out way to reduce our dependence on `object===object` stuff
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''); //generates a unique id for this term

function makeId(str) {
  str = str || '_';
  var text = str + '-';

  for (var i = 0; i < 7; i++) {
    text += chars[Math.floor(Math.random() * chars.length)];
  }

  return text;
}

module.exports = makeId;

},{}],115:[function(_dereq_,module,exports){
"use strict";

var titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/;
var upperCase = /^[A-Z]+s?$/;
/** convert all text to uppercase */

exports.toUpperCase = function () {
  this.text = this.text.toUpperCase();
  return this;
};
/** convert all text to lowercase */


exports.toLowerCase = function () {
  this.text = this.text.toLowerCase();
  return this;
};
/** only set the first letter to uppercase
 * leave any existing uppercase alone
 */


exports.toTitleCase = function () {
  this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, function (x) {
    return x.toUpperCase();
  }); //support unicode?

  return this;
};
/** if all letters are uppercase */


exports.isUpperCase = function () {
  return upperCase.test(this.text);
};
/** if the first letter is uppercase, and the rest are lowercase */


exports.isTitleCase = function () {
  return titleCase.test(this.text);
};

exports.titleCase = exports.isTitleCase;

},{}],116:[function(_dereq_,module,exports){
"use strict";

// these methods are called with '@hasComma' in the match syntax
// various unicode quotation-mark formats
var startQuote = "(\"|\uFF02|'|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\xAB|\u2039|\u2035|\u2036|\u2037|\u301D|`|\u301F)";
var endQuote = "(\"|\uFF02|'|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\xBB|\u203A|\u2032|\u2033|\u2034|\u301E|\xB4|\u301E)";
/** search the term's 'post' punctuation  */

exports.hasPost = function (punct) {
  return this.post.indexOf(punct) !== -1;
};
/** search the term's 'pre' punctuation  */


exports.hasPre = function (punct) {
  return this.pre.indexOf(punct) !== -1;
};
/** does it have a quotation symbol?  */


exports.hasQuote = function () {
  return startQuote.test(this.pre) || endQuote.test(this.post);
};
/** does it have a comma?  */


exports.hasComma = function () {
  return this.hasPost(',');
};
/** does it end in a period? */


exports.hasPeriod = function () {
  return this.hasPost('.') === true && this.hasPost('...') === false;
};
/** does it end in an exclamation */


exports.hasExclamation = function () {
  return this.hasPost('!');
};
/** does it end with a question mark? */


exports.hasQuestionMark = function () {
  return this.hasPost('?') || this.hasPost('¿');
};
/** is there a ... at the end? */


exports.hasEllipses = function () {
  return this.hasPost('..') || this.hasPost('…');
};
/** is there a semicolon after this word? */


exports.hasSemicolon = function () {
  return this.hasPost(';');
};
/** is there a slash '/' in this word? */


exports.hasSlash = function () {
  return /\//.test(this.text);
};
/** a hyphen connects two words like-this */


exports.hasHyphen = function () {
  var hyphen = /(-|–|—)/;
  return hyphen.test(this.post) || hyphen.test(this.pre);
};
/** a dash separates words - like that */


exports.hasDash = function () {
  var hyphen = / (-|–|—) /;
  return hyphen.test(this.post) || hyphen.test(this.pre);
};
/** is it multiple words combinded */


exports.hasContraction = function () {
  return Boolean(this.implicit);
};
/** try to sensibly put this punctuation mark into the term */


exports.addPunctuation = function (punct) {
  // dont add doubles
  if (punct === ',' || punct === ';') {
    this.post = this.post.replace(punct, '');
  }

  this.post = punct + this.post;
  return this;
};

},{}],117:[function(_dereq_,module,exports){
"use strict";

var doesMatch = _dereq_('./_doesMatch');

var isAcronym = _dereq_('../normalize/isAcronym'); // these tags aren't juicy-enough


var boring = {};
/** check a match object against this term */

exports.doesMatch = function (reg, index, length) {
  return doesMatch(this, reg, index, length);
};
/** does this term look like an acronym? */


exports.isAcronym = function () {
  return isAcronym(this.text);
};
/** is this term implied by a contraction? */


exports.isImplicit = function () {
  return this.text === '' && Boolean(this.implicit);
};
/** does the term have at least one good tag? */


exports.isKnown = function () {
  return Object.keys(this.tags).some(function (t) {
    return boring[t] !== true;
  });
};
/** cache the root property of the term */


exports.setRoot = function (world) {
  var transform = world.transforms;
  var str = this.implicit || this.clean;

  if (this.tags.Plural) {
    str = transform.toSingular(str, world);
  }

  if (this.tags.Verb && !this.tags.Negative && !this.tags.Infinitive) {
    var tense = null;

    if (this.tags.PastTense) {
      tense = 'PastTense';
    } else if (this.tags.Gerund) {
      tense = 'Gerund';
    } else if (this.tags.PresentTense) {
      tense = 'PresentTense';
    } else if (this.tags.Participle) {
      tense = 'Participle';
    } else if (this.tags.Actor) {
      tense = 'Actor';
    }

    str = transform.toInfinitive(str, world, tense);
  }

  this.root = str;
};

},{"../normalize/isAcronym":124,"./_doesMatch":121}],118:[function(_dereq_,module,exports){
"use strict";

var killUnicode = _dereq_('../normalize/unicode');

var hasSpace = /[\s-]/;
var isUpperCase = /^[A-Z-]+$/; // const titleCase = str => {
//   return str.charAt(0).toUpperCase() + str.substr(1)
// }

/** return various text formats of this term */

exports.textOut = function (options, showPre, showPost) {
  options = options || {};
  var word = this.text;
  var before = this.pre;
  var after = this.post; // -word-

  if (options.reduced === true) {
    word = this.reduced || '';
  }

  if (options.root === true) {
    word = this.root || '';
  }

  if (options.implicit === true && this.implicit) {
    word = this.implicit || '';
  }

  if (options.normal === true) {
    word = this.clean || this.text || '';
  }

  if (options.root === true) {
    word = this.root || this.reduced || '';
  }

  if (options.unicode === true) {
    word = killUnicode(word);
  } // cleanup case


  if (options.titlecase === true) {
    if (this.tags.ProperNoun && !this.titleCase()) {// word = titleCase(word)
    } else if (this.tags.Acronym) {
      word = word.toUpperCase(); //uppercase acronyms
    } else if (isUpperCase.test(word) && !this.tags.Acronym) {
      // lowercase everything else
      word = word.toLowerCase();
    }
  }

  if (options.lowercase === true) {
    word = word.toLowerCase();
  } // remove the '.'s from 'F.B.I.' (safely)


  if (options.acronyms === true && this.tags.Acronym) {
    word = word.replace(/\./g, '');
  } // -before/after-


  if (options.whitespace === true || options.root) {
    before = '';
    after = ' ';

    if ((hasSpace.test(this.post) === false || options.last) && !this.implicit) {
      after = '';
    }
  }

  if (options.punctuation === true && !options.root) {
    //normalized end punctuation
    if (this.hasPost('.') === true) {
      after = '.' + after;
    } else if (this.hasPost('?') === true) {
      after = '?' + after;
    } else if (this.hasPost('!') === true) {
      after = '!' + after;
    } else if (this.hasPost(',') === true) {
      after = ',' + after;
    } else if (this.hasEllipses() === true) {
      after = '...' + after;
    }
  }

  if (showPre !== true) {
    before = '';
  }

  if (showPost !== true) {
    // let keep = after.match(/\)/) || ''
    after = ''; //keep //after.replace(/[ .?!,]+/, '')
  } // remove the '.' from 'Mrs.' (safely)


  if (options.abbreviations === true && this.tags.Abbreviation) {
    after = after.replace(/^\./, '');
  }

  return before + word + after;
};

},{"../normalize/unicode":126}],119:[function(_dereq_,module,exports){
"use strict";

var rankTags = _dereq_('./_bestTag');

var jsonDefault = {
  text: true,
  tags: true,
  implicit: true,
  clean: false,
  id: false,
  index: false,
  offset: false,
  whitespace: false,
  bestTag: false
};
/** return various metadata for this term */

exports.json = function (options, world) {
  options = options || {};
  options = Object.assign({}, jsonDefault, options);
  var result = {}; // default on

  if (options.text) {
    result.text = this.text;
  }

  if (options.normal) {
    result.normal = this.normal;
  }

  if (options.tags) {
    result.tags = Object.keys(this.tags);
  } // default off


  if (options.clean) {
    result.clean = this.clean;
  }

  if (options.id || options.offset) {
    result.id = this.id;
  }

  if (options.implicit && this.implicit !== null) {
    result.implicit = this.implicit;
  }

  if (options.whitespace) {
    result.pre = this.pre;
    result.post = this.post;
  }

  if (options.bestTag) {
    result.bestTag = rankTags(this, world)[0];
  }

  return result;
};

},{"./_bestTag":120}],120:[function(_dereq_,module,exports){
"use strict";

var boringTags = {
  Auxiliary: 1,
  Possessive: 1
};
/** a subjective ranking of tags kinda tfidf-based */

var rankTags = function rankTags(term, world) {
  var tags = Object.keys(term.tags);
  var tagSet = world.tags;
  tags = tags.sort(function (a, b) {
    //bury the tags we dont want
    if (boringTags[b] || !tagSet[b]) {
      return -1;
    } // unknown tags are interesting


    if (!tagSet[b]) {
      return 1;
    }

    if (!tagSet[a]) {
      return 0;
    } // then sort by #of parent tags (most-specific tags first)


    if (tagSet[a].lineage.length > tagSet[b].lineage.length) {
      return 1;
    }

    if (tagSet[a].isA.length > tagSet[b].isA.length) {
      return -1;
    }

    return 0;
  });
  return tags;
};

module.exports = rankTags;

},{}],121:[function(_dereq_,module,exports){
"use strict";

//declare it up here
var wrapMatch = function wrapMatch() {};
/** ignore optional/greedy logic, straight-up term match*/


var doesMatch = function doesMatch(t, reg, index, length) {
  // support id matches
  if (reg.id === t.id) {
    return true;
  } // support '.'


  if (reg.anything === true) {
    return true;
  } // support '^' (in parentheses)


  if (reg.start === true && index !== 0) {
    return false;
  } // support '$' (in parentheses)


  if (reg.end === true && index !== length - 1) {
    return false;
  } //support a text match


  if (reg.word !== undefined) {
    //match contractions
    if (t.implicit !== null && t.implicit === reg.word) {
      return true;
    } // term aliases for slashes and things


    if (t.alias !== undefined && t.alias.hasOwnProperty(reg.word)) {
      return true;
    } // support ~ match


    if (reg.soft === true && reg.word === t.root) {
      return true;
    } //match either .clean or .text


    return reg.word === t.clean || reg.word === t.text || reg.word === t.reduced;
  } //support #Tag


  if (reg.tag !== undefined) {
    return t.tags[reg.tag] === true;
  } //support @method


  if (reg.method !== undefined) {
    if (typeof t[reg.method] === 'function' && t[reg.method]() === true) {
      return true;
    }

    return false;
  } //support /reg/


  if (reg.regex !== undefined) {
    return reg.regex.test(t.clean);
  } //support (one|two)


  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(function (r) {
        return wrapMatch(t, r, index, length);
      });
    } // or must match one


    return reg.choices.some(function (r) {
      return wrapMatch(t, r, index, length);
    });
  }

  return false;
}; // wrap result for !negative match logic


wrapMatch = function wrapMatch(t, reg, index, length) {
  var result = doesMatch(t, reg, index, length);

  if (reg.negative === true) {
    return !result;
  }

  return result;
};

module.exports = wrapMatch;

},{}],122:[function(_dereq_,module,exports){
"use strict";

module.exports = Object.assign({}, _dereq_('./01-case'), _dereq_('./02-punctuation'), _dereq_('./03-misc'), _dereq_('./04-text'), _dereq_('./05-json'));

},{"./01-case":115,"./02-punctuation":116,"./03-misc":117,"./04-text":118,"./05-json":119}],123:[function(_dereq_,module,exports){
"use strict";

var killUnicode = _dereq_('./unicode');

var isAcronym = _dereq_('./isAcronym');

var hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/;
/** some basic operations on a string to reduce noise */

var clean = function clean(str) {
  str = str || '';
  str = str.toLowerCase();
  str = str.trim();
  var original = str; //(very) rough ASCII transliteration -  bjŏrk -> bjork

  str = killUnicode(str); //rough handling of slashes - 'see/saw'

  if (hasSlash.test(str) === true) {
    str = str.replace(/\/.*/, '');
  } //#tags, @mentions


  str = str.replace(/^[#@]/, ''); //punctuation

  str = str.replace(/[,;.!?]+$/, ''); // coerce single curly quotes

  str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'"); // coerce double curly quotes

  str = str.replace(/[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g, '"'); //coerce Unicode ellipses

  str = str.replace(/\u2026/g, '...'); //en-dash

  str = str.replace(/\u2013/g, '-'); //lookin'->looking (make it easier for conjugation)

  if (/[a-z][^aeiou]in['’]$/.test(str) === true) {
    str = str.replace(/in['’]$/, 'ing');
  } //turn re-enactment to reenactment


  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '');
  } //strip leading & trailing grammatical punctuation


  if (/^[:;]/.test(str) === false) {
    str = str.replace(/\.{3,}$/g, '');
    str = str.replace(/[",\.!:;\?\)]+$/g, '');
    str = str.replace(/^['"\(]+/g, '');
  } //do this again..


  str = str.trim(); //oh shucks,

  if (str === '') {
    str = original;
  } //compact acronyms


  if (isAcronym(str)) {
    str = str.replace(/\./g, '');
  } //nice-numbers


  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  return str;
};

module.exports = clean; // console.log(normalize('Dr. V Cooper'));

},{"./isAcronym":124,"./unicode":126}],124:[function(_dereq_,module,exports){
"use strict";

var periodAcronym = /([A-Z]\.)+[A-Z]?,?$/;
var oneLetterAcronym = /^[A-Z]\.,?$/;
var noPeriodAcronym = /[A-Z]{2,}('s|,)?$/;
var lowerCaseAcronym = /([a-z]\.){2,}[a-z]\.?$/;

var isAcronym = function isAcronym(str) {
  //like N.D.A
  if (periodAcronym.test(str) === true) {
    return true;
  } //like c.e.o


  if (lowerCaseAcronym.test(str) === true) {
    return true;
  } //like 'F.'


  if (oneLetterAcronym.test(str) === true) {
    return true;
  } //like NDA


  if (noPeriodAcronym.test(str) === true) {
    return true;
  }

  return false;
};

module.exports = isAcronym;

},{}],125:[function(_dereq_,module,exports){
"use strict";

/** reduced is one step further than clean */
var reduced = function reduced(str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '');
  str = str.replace(/s['’]$/, 's');
  return str;
};

module.exports = reduced;

},{}],126:[function(_dereq_,module,exports){
"use strict";

//a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
var compact = {
  '!': '¡',
  '?': '¿Ɂ',
  '"': '“”"❝❞',
  "'": '‘‛❛❜',
  '-': '—–',
  a: 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАадѦѧӐӑӒӓƛɅæ',
  b: 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ',
  c: '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾСсєҀҁҪҫ',
  d: 'ÐĎďĐđƉƊȡƋƌǷ',
  e: 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ',
  f: 'ƑƒϜϝӺӻҒғſ',
  g: 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
  h: 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
  I: 'ÌÍÎÏ',
  i: 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
  j: 'ĴĵǰȷɈɉϳЈј',
  k: 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
  l: 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
  m: 'ΜϺϻМмӍӎ',
  n: 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
  o: 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϭϴОФоѲѳӦӧӨөӪӫ',
  p: 'ƤƿΡρϷϸϼРрҎҏÞ',
  q: 'Ɋɋ',
  r: 'ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ',
  s: 'ŚśŜŝŞşŠšƧƨȘșȿЅѕ',
  t: 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт',
  u: 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύ',
  v: 'νѴѵѶѷ',
  w: 'ŴŵƜωώϖϢϣШЩшщѡѿ',
  x: '×ΧχϗϰХхҲҳӼӽӾӿ',
  y: 'ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
  z: 'ŹźŻżŽžƩƵƶȤȥɀΖζ'
}; //decompress data into two hashes

var unicode = {};
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    unicode[s] = k;
  });
});

var killUnicode = function killUnicode(str) {
  var chars = str.split('');
  chars.forEach(function (s, i) {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('');
};

module.exports = killUnicode; // console.log(killUnicode('bjŏȒk—Ɏó'));

},{}],127:[function(_dereq_,module,exports){
"use strict";

var normalize = _dereq_('./normalize/clean');

var reduce = _dereq_('./normalize/reduce'); // basically, tokenize for terms.
//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.


var startings = /^[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·\&*\•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F]+/;
var endings = /[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·\&*@\•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E]+$/; //money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥

var hasSlash = /\//;
var hasApostrophe = /['’]/;
var minusNumber = /^[-+\.][0-9]/;
/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */

var parseTerm = function parseTerm(str) {
  var original = str;
  var pre = '';
  var post = '';
  str = str.replace(startings, function (found) {
    pre = found; // support '-40'

    if ((pre === '-' || pre === '+' || pre === '.') && minusNumber.test(str)) {
      pre = '';
      return found;
    }

    return '';
  });
  str = str.replace(endings, function (found) {
    post = found; // keep s-apostrophe - "flanders'" or "chillin'"

    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '');
      return "'";
    }

    return '';
  }); //we went too far..

  if (str === '') {
    // do a very mild parse, and hope for the best.
    original = original.replace(/ *$/, function (after) {
      post = after || '';
      return '';
    });
    str = original;
    pre = '';
    post = post;
  } // create the various forms of our text,


  var clean = normalize(str);
  var parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post
  }; // support aliases for slashes

  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(function (word) {
      parsed.alias = parsed.alias || {};
      parsed.alias[word.trim()] = true;
    });
  }

  return parsed;
};

module.exports = parseTerm;

},{"./normalize/clean":123,"./normalize/reduce":125}],128:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('./fns');
/** add a tag, and its descendents, to a term */


var addTag = function addTag(t, tag, reason, world) {
  var tagset = world.tags; //support '.' or '-' notation for skipping the tag

  if (tag === '' || tag === '.' || tag === '-') {
    return;
  }

  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  }

  tag = fns.titleCase(tag); //if we already got this one

  if (t.tags[tag] === true) {
    return;
  } // log it?


  var isVerbose = world.isVerbose();

  if (isVerbose === true) {
    fns.logTag(t, tag, reason);
  } //add tag


  t.tags[tag] = true; //whee!
  //check tagset for any additional things to do...

  if (tagset.hasOwnProperty(tag) === true) {
    //add parent Tags
    tagset[tag].isA.forEach(function (down) {
      t.tags[down] = true;

      if (isVerbose === true) {
        fns.logTag(t, '→ ' + down);
      }
    }); //remove any contrary tags

    t.unTag(tagset[tag].notA, '←', world);
  }
};
/** support an array of tags */


var addTags = function addTags(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(function (tag) {
      return addTag(term, tag, reason, world);
    });
  } else {
    addTag(term, tags, reason, world);
  }
};

module.exports = addTags;

},{"./fns":130}],129:[function(_dereq_,module,exports){
'use strict'; //recursively-check compatibility of this tag and term

var canBe = function canBe(term, tag, world) {
  var tagset = world.tags; // cleanup tag

  if (tag[0] === '#') {
    tag = tag.replace(/^#/, '');
  } //fail-fast


  if (tagset[tag] === undefined) {
    return true;
  } //loop through tag's contradictory tags


  var enemies = tagset[tag].notA || [];

  for (var i = 0; i < enemies.length; i++) {
    if (term.tags[enemies[i]] === true) {
      return false;
    }
  }

  if (tagset[tag].isA !== undefined) {
    return canBe(term, tagset[tag].isA, world); //recursive
  }

  return true;
};

module.exports = canBe;

},{}],130:[function(_dereq_,module,exports){
"use strict";

/** add spaces at the end */
var padEnd = function padEnd(str, width) {
  str = str.toString();

  while (str.length < width) {
    str += ' ';
  }

  return str;
};
/** output for verbose-mode */


exports.logTag = function (t, tag, reason) {
  var log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + '';
  }

  console.log(log);
};
/** output for verbose mode  */


exports.logUntag = function (t, tag, reason) {
  var log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m ';

  if (reason) {
    log = padEnd(log, 35) + ' ' + reason;
  }

  console.log(log);
};

exports.isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

exports.titleCase = function (str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

},{}],131:[function(_dereq_,module,exports){
"use strict";

var add = _dereq_('./add');

var unTag = _dereq_('./unTag');

var canBe = _dereq_('./canBe');
/** add a tag or tags, and their descendents to this term
 * @param  {string | string[]} tags - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */


exports.tag = function (tags, reason, world) {
  add(this, tags, reason, world);
  return this;
};
/** only tag this term if it's consistent with it's current tags */


exports.tagSafe = function (tags, reason, world) {
  if (canBe(this, tags, world)) {
    add(this, tags, reason, world);
  }

  return this;
};
/** remove a tag or tags, and their descendents from this term
 * @param {string | string[]} tags  - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */


exports.unTag = function (tags, reason, world) {
  unTag(this, tags, reason, world);
  return this;
};
/** is this tag consistent with the word's current tags?
 * @param {string | string[]} tags - a tag or tags
 * @returns {boolean}
 */


exports.canBe = function (tags, world) {
  return canBe(this, tags, world);
};

},{"./add":128,"./canBe":129,"./unTag":132}],132:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('./fns');
/** remove this tag, and its descentents from the term */


var unTag = function unTag(t, tag, reason, world) {
  var isVerbose = world.isVerbose(); //support '*' for removing all tags

  if (tag === '*') {
    t.tags = {};
    return t;
  } // remove the tag


  if (t.tags[tag] === true && t.tags.hasOwnProperty(tag) === true) {
    delete t.tags[tag]; //log in verbose-mode

    if (isVerbose === true) {
      fns.logUntag(t, tag, reason);
    }
  } //delete downstream tags too


  var tagset = world.tags;

  if (tagset[tag]) {
    var lineage = tagset[tag].lineage;

    for (var i = 0; i < lineage.length; i++) {
      // unTag(t, also[i], ' - -   - ', world) //recursive
      if (t.tags[lineage[i]] === true) {
        delete t.tags[lineage[i]];

        if (isVerbose === true) {
          fns.logUntag(t, ' - ' + lineage[i]);
        }
      }
    }
  }

  return t;
}; //handle an array of tags


var untagAll = function untagAll(term, tags, reason, world) {
  if (fns.isArray(tags) === true) {
    tags.forEach(function (tag) {
      return unTag(term, tag, reason, world);
    });
  } else {
    unTag(term, tags, reason, world);
  }
};

module.exports = untagAll;

},{"./fns":130}],133:[function(_dereq_,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var lexData = _dereq_('./_data');

var defaultTags = _dereq_('./tags');

var unpack = _dereq_('efrt-unpack');

var addLex = _dereq_('./addWords');

var _addIrregulars = _dereq_('./addIrregulars');

var inferTagSet = _dereq_('./tags/inference');

var misc = _dereq_('./data/misc'); //these let users change inflection / verb conjugation


var irregulars = {
  nouns: _dereq_('./data/plurals'),
  verbs: _dereq_('./data/conjugations')
}; //these behaviours are configurable & shared across some plugins

var transforms = {
  conjugate: _dereq_('../transforms/conjugate'),
  adjectives: _dereq_('../transforms/adjectives'),
  toPlural: _dereq_('../transforms/toPlural'),
  toSingular: _dereq_('../transforms/toSingular'),
  toInfinitive: _dereq_('../transforms/toInfinitive')
};
var _isVerbose = false;
/** all configurable linguistic data */

var World =
/*#__PURE__*/
function () {
  function World() {
    _classCallCheck(this, World);

    // quiet these properties from a console.log
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: misc,
      writable: true
    });
    Object.defineProperty(this, 'hasCompound', {
      enumerable: false,
      value: {},
      writable: true
    });
    Object.defineProperty(this, 'irregulars', {
      enumerable: false,
      value: irregulars,
      writable: true
    });
    Object.defineProperty(this, 'tags', {
      enumerable: false,
      value: Object.assign({}, defaultTags),
      writable: true
    });
    Object.defineProperty(this, 'transforms', {
      enumerable: false,
      value: transforms,
      writable: true
    });
    Object.defineProperty(this, 'taggers', {
      enumerable: false,
      value: [],
      writable: true
    }); // add our compressed data to lexicon

    this.unpackWords(lexData); // add our irregulars to lexicon

    this.addIrregulars(); // cache our abbreviations for our sentence-parser

    Object.defineProperty(this, 'cache', {
      enumerable: false,
      value: {
        abbreviations: this.getByTag('Abbreviation')
      }
    });
  }
  /** more logs for debugging */


  _createClass(World, [{
    key: "verbose",
    value: function verbose(bool) {
      _isVerbose = bool;
      return this;
    }
  }, {
    key: "isVerbose",
    value: function isVerbose() {
      return _isVerbose;
    }
    /** get all terms in our lexicon with this tag */

  }, {
    key: "getByTag",
    value: function getByTag(tag) {
      var lex = this.words;
      var res = {};
      var words = Object.keys(lex);

      for (var i = 0; i < words.length; i++) {
        if (typeof lex[words[i]] === 'string') {
          if (lex[words[i]] === tag) {
            res[words[i]] = true;
          }
        } else if (lex[words[i]].some(function (t) {
          return t === tag;
        })) {
          res[words[i]] = true;
        }
      }

      return res;
    }
    /** augment our lingustic data with new data */

  }, {
    key: "unpackWords",
    value: function unpackWords(lex) {
      var tags = Object.keys(lex);

      for (var i = 0; i < tags.length; i++) {
        var words = Object.keys(unpack(lex[tags[i]]));

        for (var w = 0; w < words.length; w++) {
          addLex.addWord(words[w], tags[i], this.words); // do some fancier stuff

          addLex.addMore(words[w], tags[i], this);
        }
      }
    }
    /** put new words into our lexicon, properly */

  }, {
    key: "addWords",
    value: function addWords(obj) {
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var word = keys[i].toLowerCase();
        addLex.addWord(word, obj[keys[i]], this.words); // do some fancier stuff

        addLex.addMore(word, obj[keys[i]], this);
      }
    }
  }, {
    key: "addIrregulars",
    value: function addIrregulars() {
      _addIrregulars(this);

      return this;
    }
    /** extend the compromise tagset */

  }, {
    key: "addTags",
    value: function addTags(tags) {
      tags = Object.assign({}, tags);
      this.tags = Object.assign(this.tags, tags); // calculate graph implications for the new tags

      this.tags = inferTagSet(this.tags);
      return this;
    }
    /** call methods after tagger runs */

  }, {
    key: "postProcess",
    value: function postProcess(fn) {
      this.taggers.push(fn);
      return this;
    }
    /** helper method for logging + debugging */

  }, {
    key: "stats",
    value: function stats() {
      return {
        words: Object.keys(this.words).length,
        plurals: Object.keys(this.irregular.plurals).length,
        conjugations: Object.keys(this.irregular.conjugations).length,
        compounds: Object.keys(this.hasCompound).length,
        postProcessors: this.taggers.length
      };
    }
  }]);

  return World;
}(); //  ¯\_(:/)_/¯


var clone = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};
/** produce a deep-copy of all lingustic data */


World.prototype.clone = function () {
  var w2 = new World(); // these are simple to copy:

  w2.words = Object.assign({}, this.words);
  w2.hasCompound = Object.assign({}, this.hasCompound); //these ones are nested:

  w2.irregulars = clone(this.irregulars);
  w2.tags = clone(this.tags); // these are functions

  w2.transforms = this.transforms;
  w2.taggers = this.taggers;
  return w2;
};

module.exports = World;

},{"../transforms/adjectives":152,"../transforms/conjugate":157,"../transforms/toInfinitive":161,"../transforms/toPlural":163,"../transforms/toSingular":165,"./_data":134,"./addIrregulars":135,"./addWords":136,"./data/conjugations":137,"./data/misc":138,"./data/plurals":139,"./tags":140,"./tags/inference":145,"efrt-unpack":2}],134:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  "Comparative": "true¦better",
  "Superlative": "true¦earlier",
  "PresentTense": "true¦is,sounds",
  "Value": "true¦a few",
  "Noun": "true¦a8b7c5e3f2here,ie,lit,m1no doubt,p0tce,vs;d,l;a,d;t,y;g,sp,tc,x0;!p;a,ca,o0;l,rp;a,c,l;d,l,rc",
  "Copula": "true¦a1is,w0;as,ere;m,re",
  "PastTense": "true¦be3came,d2had,meant,sa2taken,w0;as,e0;nt,re;id;en,gan",
  "Condition": "true¦if,unless",
  "Gerund": "true¦accord0be0develop0go0result0stain0;ing",
  "Negative": "true¦n0;ever,o0;!n,t",
  "QuestionWord": "true¦how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s",
  "Plural": "true¦records",
  "Conjunction": "true¦&,aEbAcuz,how8in caDno7o6p4supposing,t1vers5wh0yet;eth8ile;h0o;eref9o0;!uC;l0rovided that;us;r,therwi6; matt1r;!ev0;er;e0ut;cau1f0;ore;se;lthou1nd,s 0;far as,if;gh",
  "Pronoun": "true¦'em,elle,h4i3me,ourselves,she5th1us,we,you0;!rself;e0ou;m,y;!l,t;e0im;!'s",
  "Singular": "true¦0:0X;1:10;a0Wb0Kc0Bd04e02fXgShOici1jel0kitty,lNmJnIoHpDquestion mark,rBs7t4u2womW;nc0Rs 2;doll0Dst0F; rex,a3h2ic,ragedy,v show;ere,i1;l0x return;ist0Pky,omeone,t2uper bowl,yst0W;ep3ri1u2;de0Pff;faMmoM;al0i1o2;om,se;a4i0Jr3u2;dLrpoD;erogaVobl0O;rt,te0I;bjSceGthers;othi1umb0E;a4ee04o2;del,m2nopo0th0C;!my;n,yf0;i0unch;ead start,o2;l0me3u2;se;! run;adf0entlem5irlZlaci04od,rand3u2;l0y; slam,fa2mo2;th01;an;a5ella,ly,ol0r3un2;di1;iTo2;ntiWsN;mi0thV;conomy,gg,ner5veWx2;ampQecu7;ad7e4innSo2ragonf0ude;cumentFg2i0l0or;gy;ath,t2;ec2;tive;!dy;a8eili1h6i4o2redit card;ttage,u2;riJsin;ty,vil w2;ar;andeliGocol2;ate;n2rD;ary;aAel0lesHo6r4u2;n2tterf0;ti1;eakfast,o2;!th8;dy,tt4y2;!fri2;end;le;nki1r2;ri2;er;d4l0noma0u2;nt;ly; homin4verti2;si1;ng;em",
  "Actor": "true¦aJbGcFdCengineIfAgardenIh9instructPjournalLlawyIm8nurse,opeOp5r3s1t0;echnCherapK;ailNcientJoldiGu0;pervKrgeon;e0oofE;ceptionGsearC;hotographClumbColi1r0sychologF;actitionBogrammB;cem6t5;echanic,inist9us4;airdress8ousekeep8;arm7ire0;fight6m2;eputy,iet0;ici0;an;arpent2lerk;ricklay1ut0;ch0;er;ccoun6d2ge7r0ssis6ttenda7;chitect,t0;ist;minist1v0;is1;rat0;or;ta0;nt",
  "Honorific": "true¦a03b00cSdReQfiLgKhon,jr,king,lJmEoDp8queen,r4s0taoiseach,vice7;e1fc,gt,ir,r,u0;ltTpt,rg;c0nDrgeaL;ond liJretary;abbi,e0;ar1pAs,v0;!erend; admirY;astPhd,r0vt;esideEi1of0;!essN;me mini5nce0;!ss;fficOp,rd;a3essrs,i2lle,me,r1s0;!tr;!s;stK;gistrate,j,r6yF;i3lb,t;en,ov;eld mar3rst l0;ady,i0;eutena0;nt;shG;sq,xcellency;et,oct6r,utchess;apt6hance4mdr,o0pl;lonel,m2ngress0unci3;m0wom0;an;dr,mand5;ll0;or;!ain;ldg,rig0;!adi0;er;d0sst,tty,yatullah;j,m0v;!ir0;al",
  "SportsTeam": "true¦0:1A;1:1H;2:1G;a1Eb16c0Td0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Bm01newToQpJqueens parkIreal salt lake,sAt5utah jazz,vancouver whitecaps,w3yW;ashington 3est ham0Rh10;natio1Oredski2wizar0W;ampa bay 6e5o3;ronto 3ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasC;buccanee0ra0K;a7eattle 5heffield0Kporting kansas0Wt3;. louis 3oke0V;c1Frams;marine0s3;eah15ounG;cramento Rn 3;antonio spu0diego 3francisco gJjose earthquak1;char08paA; ran07;a8h5ittsburgh 4ortland t3;imbe0rail blaze0;pirat1steele0;il3oenix su2;adelphia 3li1;eagl1philNunE;dr1;akland 3klahoma city thunder,rlando magic;athle0Mrai3;de0; 3castle01;england 7orleans 6york 3;city fc,g4je0FknXme0Fred bul0Yy3;anke1;ian0D;pelica2sain0C;patrio0Brevolut3;ion;anchester Be9i3ontreal impact;ami 7lwaukee b6nnesota 3;t4u0Fvi3;kings;imberwolv1wi2;rewe0uc0K;dolphi2heat,marli2;mphis grizz3ts;li1;cXu08;a4eicesterVos angeles 3;clippe0dodDla9; galaxy,ke0;ansas city 3nE;chiefs,roya0E; pace0polis colU;astr06dynamo,rockeTtexa2;olden state warrio0reen bay pac3;ke0;.c.Aallas 7e3i05od5;nver 5troit 3;lio2pisto2ti3;ge0;broncZnuggeM;cowbo4maver3;ic00;ys; uQ;arCelKh8incinnati 6leveland 5ol3;orado r3umbus crew sc;api5ocki1;brow2cavalie0india2;bengaWre3;ds;arlotte horAicago 3;b4cubs,fire,wh3;iteB;ea0ulR;diff3olina panthe0; c3;ity;altimore 9lackburn rove0oston 5rooklyn 3uffalo bilN;ne3;ts;cel4red3; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 3;brav1falco2h4u3;nited;aw9;ns;es;on villa,r3;os;c5di3;amondbac3;ks;ardi3;na3;ls",
  "Uncountable": "true¦a1Ib1Ac11d0Ye0Rf0Lg0Hh0Ci08j07knowled1Hl02mUnews,oTpQrLsAt5vi4w0;a2ea05i1oo0;d,l;ldlife,ne;rmth,t17;neg0Yol06tae;e3h2oothpaste,r0una;affPou0;ble,sers,t;ermod1Eund12;a,nnis;a8cene04eri0Oh7il6kittl0Onow,o5p3t1u0;g0Rnshi0H;ati1De0;am,el;ace16e0;ci0Jed;ap,cc0U;k,v0T;eep,ingl0G;d04fe10l0nd;m0St;a3e1ic0;e,ke0D;c0laxa09search;ogni08rea08;bi09in;aJe1hys10last5o0ressV;lit0Zrk,w0J;a0Vtrol;bstetr0Xil,xygen;a5e3ilk,o2u0;mps,s0;ic;nGo0A;a0chan0S;slZt;chine0il,themat0Q; learn05ry;aught08e2i1ogi0Nu0;ck,g0C;ce,ghtn02ngui0LteratH;a0isG;th04;ewel7usti0G;ce,mp0nformaOtself;a0ortan0E;ti0;en0C;a3isto2o0;ck0mework,n0spitali06;ey;ry;ir,libut,ppi7;en01o1r0um,ymna08;a6ound;l0ssip;d,f;i4lour,o1urnit0;ure;od,rgive0uriNwl;ne0;ss;c6sh;conomZduca5lectr4n2quip3thZvery0;body,o0thE;ne;joy0tertain0;ment;iciNonU;tiF;ar1iabet0raugh1;es;ts;a7elcius,h3ivPl2o0urrency;al,ld w0nfusiAttA;ar;assMoth2;aos,e0;e1w0;ing;se;r4sh;a4eef,i1lood,owls,read,utt0;er;lliar1s0;on;ds;g0ss;ga0;ge;c6dvi5ero3ir2mnes1rt,thl0;et7;ty;craft;b4d0naut4;ynam3;ce;id,ou0;st0;ics",
  "Infinitive": "true¦0:6H;1:6V;2:55;3:6S;4:6T;5:5W;6:64;7:6R;8:6N;9:6F;A:6P;B:6M;C:6A;D:6W;a67b5Wc4Yd46e3Qf3Dg37h30i2Nj2Lk2Jl2Am20n1Xo1Tp1Eques3Er0Ms01tTuPvMwFyE;awn,ield;aHe1Thist6iGoEre60;nd0rE;k,ry;pe,sh,th0;lk,nFrEsh,tCve;n,raD;d0t;aFiEo7;ew,sB;l68ry;nFpEr3se;gra4Jli3W;dEi7lo5O;er47o;aKeJhIoHrFuEwi8;ne,rn;aEe0Ki5Ku8y;de,in,nsf0p,v5C;r2VuC;ank,reat2L;nd,st;lk,rg1Ms7;aXcUeThRi48kip,lQmPnee3Ho4WpOtHuEwitC;bmBck,ff0gge8ppFrEspe5;ge,pri1rou4Tvi4;ly,o32;aJeIoHrFuE;dy,mb6;a4NeEi4;ngth2Bss,tC;p,re;m,p;in,ke,r0Oy;la50oil,rink6;e1Vi6o3F;am,ip;a2iv0oE;ck,ut;arCem,le5n1r4tt6;aFo2rE;atCew;le,re;il,ve;a03eGisk,oFuE;in,le,sh;am,ll;aZcXdu9fWgVje5lSmRnt,pOquNsItHvEwa5L;eEiew,o32;al,l,rE;se,t;a41i2u3Y;eHi8oGtE;!o2rE;i5uc1W;l4rt;mb6nt,r4;e8i2;air,eFlEo3XreseD;a9y;at;a3Remb0i3To4;aFeEi4y;a1nt;te,x;a53r0F;act1Uer,le5u1;a0Zei4k5FoEyc6;gni28nci6rd;ch,li27s5D;i1nE;ge,k;aRerQiPlMoKrGuE;b1Xll,mp,rEsh;cha1s4G;ai1eGiDoE;cEdu9greAhibBmi1te8vi2R;eAlaim;di5pa2ss,veD;iDp,rtr3WsEur;e,t;aFuE;g,n3;n,y;ck,le;fo2YmBsi8;ck,iDrt4Css,u1;bGccur,ff0pera7utweFverEwe;co3Xlap,ta1Yu1whelm;igh;ser4ta2Y;eFotE;e,i9;ed,gle5;aJeIiGoFuE;ltip3Ard0;nit10ve;nErr0Z;d,g6us;asu2lt,n0Mr3ssa3;inta2Ona3rFtE;ch,t0;ch,kEry;et;aKeJiGoEu1A;aEck,ok,ve;d,n;ft,ke,mBnFstEve;!en;e,k;a2Bc0Ct;b0Lck,uE;gh,nC;iEno2W;ck,ll,ss;am,o29uE;d3mp;gno2mOnEss39;cMdica7flu0KhLsItGvE;eEol4;nt,st;erErodu9;a5fe2;i8tE;aEru5;ll;abBibB;lu1Cr1A;agi20pE;lemeDo1Yro4;aIeGi2oFuE;nt,rry;n00pe,st;aElp;d,t;nd6ppErm,te;en;aIloAove1KrGuE;arEeAi11;ant30d;aEip,umb6;b,sp;in,th0ze;aOeaNiLlJoGracFuncE;ti3A;tu2;cus,lFrE;ce,eca8m,s2S;d,l1W;a1ToE;at,od,w;gu2lEni1Rx;e,l;r,tu2;il,vE;or;a11cho,le5mQnNstLvalua7xE;a08cJerIi8pEte15;a14eFla12oEreA;rt,se;ct,riE;en9;ci1t;el,han3;abEima7;li1D;ab6couVdFfor9ga3han9j01riCsu2t0vE;isi2Ny;!u2;body,er3pE;hasiEow0;ze;a04eSiJoIrFuE;mp;aFeAiE;ft;g,in;d3ubt;ff0p,re5sFvE;iWor9;aIcFliEmiApl13tingui0Y;ke;oEuA;uEv0;ra3;gr1QppE;ear,ro4;cLem,fJliv0ma0Bny,pIsFterE;mi0C;cribe,er4iFtrE;oy;gn,re;a07e06i5osB;eEi07y;at,ct;iGlFrE;ea1;a2i03;de;ma3n9re,te;a08e07h04i7l02oHrE;aFeEoAu0Dy;a7dB;ck,ve;llXmQnFok,py,uEv0;gh,nt;ceNdu5fKsItGvE;eEin9;rt,y;aNin0PrE;a8ibu7ol;iEtitu7;d0st;iFoEroD;rm;gu2rm;rn;biJfoImaHpE;a2laE;in;re;nd;rt;ne;ap1e5;aEip,o1;im,w;aFeE;at,ck,w;llen3n3r3se;a1nt0;ll,ncFrEt0u1;e,ry;el;aNeKloJoHruGuE;lEry;ly;sh;a8mb,o8rrEth0un9;ow;ck;ar,lFnefBtrE;ay;ie4ong;ng,se;band0Hc09d04ffo03gr02id,lZmu1nWppRrOsIttEvoid,waB;acGeFra5;ct;m0Dnd;h,k;k,sE;eGiFocia7uE;me;gn,st;mb6rt;le;chFgEri4;ue;!i4;eaHlGroE;aCve;ch;aud,y;l,r;noun9sw0tE;icipa7;ce;lFt0;er;e3ow;ee;rd;aPdGju8mBoP;it;st;!reA;ss;cHhie4knowled3tiva7;te;ge;ve;eGouDu1;se;nt;pt;on",
  "Unit": "true¦0:16;a11b0Zc0Ld0Ke0If0Dg09h06in0Ejoule0k00lYmNnMoLpIqHsqCt7volts,w6y4z3°2µ1;g,s;c,f,n;b,e2;a0Kb,d0Qears old,o1;tt0E;att0b;able4b3e2on1sp;!ne0;a2r0A;!l,sp;spo01; ft,uare 1;c0Fd0Ef3i0Ckilo0Gm1ya0B;e0Jil1;e0li0E;eet0o0A;t,uart0;ascals,e2i1ou0Mt;c0Jnt0;rcent,tZ;hms,uVz;an0GewtQ;/s,b,e7g,i3l,m2p1²,³;h,s;!²;!/h,cro3l1;e1li05;! DsC²;g05s0A;gPter1;! 2s1;! 1;per second;b,iZm,u1x;men0x0;b,elvin0g,ilo2m1nQ;!/h,ph,²;byYgWmeter1;! 2s1;! 1;per hour;e1g,z;ct1rtz0;aXogQ;al2b,igAra1;in0m0;!l1;on0;a4emtPl2t1;²,³; oz,uid ou1;nce0;hrenheit0rad0;b,x1;abyH;eciCg,l,mA;arat0eAg,m9oulomb0u1;bic 1p0;c5d4fo3i2meAya1;rd0;nch0;ot0;eci2;enti1;me4;!²,³;lsius0nti1;g2li1me1;ter0;ram0;bl,y1;te0;c4tt1;os1;eco1;nd0;re0;!s",
  "Organization": "true¦0:46;a3Ab2Qc2Ad21e1Xf1Tg1Lh1Gi1Dj19k17l13m0Sn0Go0Dp07qu06rZsStFuBv8w3y1;amaha,m0Xou1w0X;gov,tu2S;a3e1orld trade organizati41;lls fargo,st1;fie22inghou16;l1rner br3D;-m11gree31l street journ25m11;an halNeriz3Wisa,o1;dafo2Gl1;kswagLvo;bs,kip,n2ps,s1;a tod2Rps;es35i1;lev2Xted natio2Uv; mobi2Kaco bePd bMeAgi frida9h3im horto2Tmz,o1witt2W;shiba,y1;ota,s r Y;e 1in lizzy;b3carpen33daily ma2Xguess w2holli0rolling st1Ms1w2;mashing pumpki2Ouprem0;ho;ea1lack eyed pe3Fyrds;ch bo1tl0;ys;l2s1;co,la m12;efoni07us;a6e4ieme2Gnp,o2pice gir5ta1ubaru;rbucks,to2N;ny,undgard1;en;a2Rx pisto1;ls;few25insbu26msu1X;.e.m.,adiohead,b6e3oyal 1yan2X;b1dutch she4;ank;/max,aders dige1Ed 1vl32;bu1c1Uhot chili peppe2Klobst28;ll;c,s;ant2Vizno2F;an5bs,e3fiz24hilip morrBi2r1;emier27octer & gamb1Rudenti14;nk floyd,zza hut;psi28tro1uge08;br2Qchina,n2Q; 2ason1Xda2G;ld navy,pec,range juli2xf1;am;us;a9b8e5fl,h4i3o1sa,wa;kia,tre dame,vart1;is;ke,ntendo,ss0K;l,s;c,st1Etflix,w1; 1sweek;kids on the block,york08;a,c;nd1Us2t1;ional aca2Fo,we0Q;a,cYd0O;aAcdonald9e5i3lb,o1tv,yspace;b1Nnsanto,ody blu0t1;ley crue,or0O;crosoft,t1;as,subisO;dica3rcedes2talli1;ca;!-benz;id,re;'s,s;c's milk,tt13z1Y;'ore09a3e1g,ittle caesa1Ktd;novo,x1;is,mark; pres5-z-boy,bour party;atv,fc,kk,m1od1K;art;iffy lu0Lo3pmorgan1sa;! cha1;se;hnson & johns1Sy d1R;bm,hop,n1tv;c,g,te1;l,rpol; & m,asbro,ewlett-packaTi3o1sbc,yundai;me dep1n1J;ot;tac1zbollah;hi;eneral 6hq,l5mb,o2reen d0Iu1;cci,ns n ros0;ldman sachs,o1;dye1g0B;ar;axo smith kliZencore;electr0Im1;oto0V;a3bi,da,edex,i1leetwood mac,oGrito-l0A;at,nancial1restoV; tim0;cebook,nnie mae;b06sa,u3xxon1; m1m1;ob0H;!rosceptics;aiml0Ae5isney,o3u1;nkin donuts,po0Wran dur1;an;j,w j1;on0;a,f leppa3ll,p2r spiegZstiny's chi1;ld;eche mode,t;rd;aEbc,hBi9nn,o3r1;aigsli5eedence clearwater reviv1ossra05;al;!ca c5l4m1o0Ast05;ca2p1;aq;st;dplMgate;ola;a,sco1tigroup;! systems;ev2i1;ck fil-a,na daily;r0Hy;dbury,pital o1rl's jr;ne;aGbc,eCfAl6mw,ni,o2p,r1;exiteeWos;ei3mbardiJston 1;glo1pizza;be;ng;ack & deckFo2ue c1;roX;ckbuster video,omingda1;le; g1g1;oodriN;cht3e ge0n & jer2rkshire hathaw1;ay;ryH;el;nana republ3s1xt5y5;f,kin robbi1;ns;ic;bXcSdidRerosmith,ig,lLmFnheuser-busEol,ppleAr7s3t&t,v2y1;er;is,on;hland2s1;n,ociated F; o1;il;by4g2m1;co;os; compu2bee1;'s;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 4catel2t1;air;!-luce1;nt;jazeera,qae1;da;as;/dc,a3er,t1;ivisi1;on;demy of scienc0;es;ba,c",
  "Demonym": "true¦0:16;1:13;a0Wb0Nc0Cd0Ae09f07g04h02iYjVkTlPmLnIomHpDqatari,rBs7t5u4v3wel0Rz2;am0Fimbabwe0;enezuel0ietnam0H;g9krai1;aiwThai,rinida0Iu2;ni0Qrkmen;a4cot0Ke3ingapoOlovak,oma0Tpa05udRw2y0X;edi0Kiss;negal0Br08;mo0uU;o6us0Lw2;and0;a3eru0Hhilipp0Po2;li0Ertugu06;kist3lesti1na2raguay0;ma1;ani;amiZi2orweP;caragu0geri2;an,en;a3ex0Mo2;ngo0Erocc0;cedo1la2;gasy,y08;a4eb9i2;b2thua1;e0Dy0;o,t02;azakh,eny0o2uwaiti;re0;a2orda1;ma0Bp2;anN;celandic,nd4r2sraeli,ta02vo06;a2iT;ni0qi;i0oneV;aiDin2ondur0unN;di;amDe2hanai0reek,uatemal0;or2rm0;gi0;i2ren7;lipino,n4;cuadoVgyp6ngliJsto1thiopi0urope0;a2ominXut4;niH;a9h6o4roa3ub0ze2;ch;ti0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el8o6r3ul2;gaG;aziBi2;ti2;sh;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;gent2me1;ine;ba1ge2;ri0;ni0;gh0r2;ic0;an",
  "Possessive": "true¦anyAh5its,m3noCo1sometBthe0yo1;ir1mselves;ur0;!s;i8y0;!se4;er1i0;mse2s;!s0;!e0;lf;o1t0;hing;ne",
  "Currency": "true¦$,aud,bScQdLeurKfJgbp,hkd,iIjpy,kGlEp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotySł;en,uanR;af,of;h0t5;e0il5;k0q0;elM;iel,oubleLp,upeeL;e2ound st0;er0;lingI;n0soH;ceGn0;ies,y;e0i8;i,mpi7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!o8;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;ad,e0ny;nt1;aht,itcoin0;!s",
  "City": "true¦a2Wb26c1Wd1Re1Qf1Og1Ih1Ai18jakar2Hk0Zl0Tm0Gn0Co0ApZquiYrVsLtCuBv8w3y1z0;agreb,uri1Z;ang1Te0okohama;katerin1Hrev34;ars3e2i0rocl3;ckl0Vn0;nipeg,terth0W;llingt1Oxford;aw;a1i0;en2Hlni2Z;lenc2Uncouv0Gr2G;lan bat0Dtrecht;a6bilisi,e5he4i3o2rondheim,u0;nVr0;in,ku;kyo,ronIulouC;anj23l13miso2Jra2A; haJssaloni0X;gucigalpa,hr2Ol av0L;i0llinn,mpe2Bngi07rtu;chu22n2MpT;a3e2h1kopje,t0ydney;ockholm,uttga12;angh1Fenzh1X;o0KvZ;int peters0Ul3n0ppo1F; 0ti1B;jo0salv2;se;v0z0Q;adU;eykjavik,i1o0;me,sario,t25;ga,o de janei17;to;a8e6h5i4o2r0ueb1Qyongya1N;a0etor24;gue;rt0zn24; elizabe3o;ls1Grae24;iladelph1Znom pe07oenix;r0tah tik19;th;lerJr0tr10;is;dessa,s0ttawa;a1Hlo;a2ew 0is;delTtaip0york;ei;goya,nt0Upl0Uv1R;a5e4i3o1u0;mb0Lni0I;nt0scH;evideo,real;l1Mn01skolc;dellín,lbour0S;drid,l5n3r0;ib1se0;ille;or;chest0dalWi0Z;er;mo;a4i1o0vAy01;nd00s angel0F;ege,ma0nz,sbZverpo1;!ss0;ol; pla0Iusan0F;a5hark4i3laipeda,o1rak0uala lump2;ow;be,pavog0sice;ur;ev,ng8;iv;b3mpa0Kndy,ohsiu0Hra0un03;c0j;hi;ncheMstanb0̇zmir;ul;a5e3o0; chi mi1ms,u0;stI;nh;lsin0rakliG;ki;ifa,m0noi,va0A;bu0SiltD;alw4dan3en2hent,iza,othen1raz,ua0;dalaj0Gngzhou;bu0P;eUoa;sk;ay;es,rankfu0;rt;dmont4indhovU;a1ha01oha,u0;blRrb0Eshanbe;e0kar,masc0FugavpiJ;gu,je0;on;a7ebu,h2o0raioJuriti01;lo0nstanJpenhagNrk;gFmbo;enn3i1ristchur0;ch;ang m1c0ttagoL;ago;ai;i0lgary,pe town,rac4;ro;aHeBirminghWogoAr5u0;char3dap3enos air2r0sZ;g0sa;as;es;est;a2isba1usse0;ls;ne;silPtisla0;va;ta;i3lgrade,r0;g1l0n;in;en;ji0rut;ng;ku,n3r0sel;celo1ranquil0;la;na;g1ja lu0;ka;alo0kok;re;aBb9hmedabad,l7m4n2qa1sh0thens,uckland;dod,gabat;ba;k0twerp;ara;m5s0;terd0;am;exandr0maty;ia;idj0u dhabi;an;lbo1rh0;us;rg",
  "Abbreviation": "true¦a08b05cZdXeUfSgRhQiPjNkanMlKmGnEoDpCque,rAs6t4u3v2w0;is0y00;!c;a,s,t;niv,safa,t;ce,e0;nn,x;ask,e1fc,gt,ir,r,t,u0;pt,rg;nDp0;!t;d,e0;pAs,v;a,d,ennGhd,l,rof,vt;ct,kla,nt,p,rd;eb0ov;!r;a2d,essrs,i1lle,me,r5s0t;!tr;nn,ster;!j,r;it,lb,t0;!d;!s;an,r,u0;l,n;a,da,e,nc;on,wy;a,en,ov;eb,l0t,y;!a;g,s1tc,x0;!p;p,q;ak,e0ist,r;c,pt,t;a3ca,l,m2o0pl,res,t;!l0m1nn,rp;!o;dr;!l0pt;!if;a,c,l1r0;ig,os;!dg,vd;d3l2pr,r1ss0tty,ug,ve;n,t;c,iz;!ta;!j,m,v",
  "Place": "true¦a07b05cZdYeXfVgRhQiOjfk,kMlKmHneEoDp9que,rd,s8t5u4v3w0yyz;is1y0;!o;!c;a,t;pYsafa,t;e1he 0;bronx,hamptons;nn,x;ask,fo,oho,t,under6yd;a2e1h0;l,x;k,nnK;!cifX;kla,nt;b1w eng0;land;!r;a1co,i0t,uc;dKnn;libu,nhattS;a0gw,hr;s,x;an0ul;!s;a0cn,da,ndianMst;!x;arlem,kg,nd,wy;a2re0;at 0enwich;britain,lak6;!y village;co,l0ra;!a;urope,verglad2;ak,en,fw,ist,own4xb;al4dg,gk,hina3l2o1r0t;es;lo,nn;!t;town;!if;cn,e0kk,lvd,rooklyn;l air,verly hills;frica,lta,m5ntarct2r1sia,tl0ve;!ant1;ct0iz;ic0; oce0;an;ericas,s",
  "Country": "true¦0:38;1:2L;a2Wb2Dc21d1Xe1Rf1Lg1Bh19i13j11k0Zl0Um0Gn05om3CpZqat1JrXsKtCu6v4wal3yemTz2;a24imbabwe;es,lis and futu2X;a2enezue31ietnam;nuatu,tican city;.5gTkraiZnited 3ruXs2zbeE;a,sr;arab emirat0Kkingdom,states2;! of am2X;k.,s.2; 27a.;a7haBimor-les0Bo6rinidad4u2;nis0rk2valu;ey,me2Xs and caic1T; and 2-2;toba1J;go,kel0Ynga;iw2Vji2nz2R;ki2T;aCcotl1eBi8lov7o5pa2Bri lanka,u4w2yr0;az2ed9itzerl1;il1;d2Qriname;lomon1Vmal0uth 2;afr2IkLsud2O;ak0en0;erra leoEn2;gapo1Wt maart2;en;negKrb0ychellY;int 2moa,n marino,udi arab0;hele24luc0mart1Z;epublic of ir0Com2Cuss0w2;an25;a3eHhilippinTitcairn1Ko2uerto riM;l1rtugE;ki2Bl3nama,pua new0Tra2;gu6;au,esti2;ne;aAe8i6or2;folk1Gth3w2;ay; k2ern mariana1B;or0M;caragua,ger2ue;!ia;p2ther18w zeal1;al;mib0u2;ru;a6exi5icro09o2yanm04;ldova,n2roc4zamb9;a3gol0t2;enegro,serrat;co;c9dagascZl6r4urit3yot2;te;an0i14;shall0Vtin2;ique;a3div2i,ta;es;wi,ys0;ao,ed00;a5e4i2uxembourg;b2echtenste10thu1E;er0ya;ban0Gsotho;os,tv0;azakh1De2iriba02osovo,uwait,yrgyz1D;eling0Jnya;a2erF;ma15p1B;c6nd5r3s2taly,vory coast;le of m19rael;a2el1;n,q;ia,oI;el1;aiSon2ungary;dur0Mg kong;aAermany,ha0Pibralt9re7u2;a5ern4inea2ya0O;!-biss2;au;sey;deloupe,m,tema0P;e2na0M;ce,nl1;ar;bTmb0;a6i5r2;ance,ench 2;guia0Dpoly2;nes0;ji,nl1;lklandTroeT;ast tim6cu5gypt,l salv5ngl1quatorial3ritr4st2thiop0;on0; guin2;ea;ad2;or;enmark,jibou4ominica3r con2;go;!n B;ti;aAentral african 9h7o4roat0u3yprQzech2; 8ia;ba,racao;c3lo2morPngo-brazzaville,okFsta r03te d'ivoiK;mb0;osD;i2ristmasF;le,na;republic;m2naTpe verde,yman9;bod0ero2;on;aFeChut00o8r4u2;lgar0r2;kina faso,ma,undi;azil,itish 2unei;virgin2; is2;lands;liv0nai4snia and herzegoviGtswaGuvet2; isl1;and;re;l2n7rmuF;ar2gium,ize;us;h3ngladesh,rbad2;os;am3ra2;in;as;fghaFlCmAn5r3ustr2zerbaijH;al0ia;genti2men0uba;na;dorra,g4t2;arct6igua and barbu2;da;o2uil2;la;er2;ica;b2ger0;an0;ia;ni2;st2;an",
  "Region": "true¦0:1U;a20b1Sc1Id1Des1Cf19g13h10i0Xj0Vk0Tl0Qm0FnZoXpSqPrMsDtAut9v6w3y1zacatec22;o05u1;cat18kZ;a1est vi4isconsin,yomi14;rwick0shington1;! dc;er2i1;rgin1S;acruz,mont;ah,tar pradesh;a2e1laxca1DuscaA;nnessee,x1R;bas0Kmaulip1QsmJ;a6i4o2taf0Ou1ylh13;ffVrr00s0Y;me10no1Auth 1;cSdR;ber1Ic1naloa;hu0Sily;n2skatchew0Rxo1;ny; luis potosi,ta catari1I;a1hode7;j1ngp02;asth0Mshahi;inghai,u1;e1intana roo;bec,ensWreta0E;ara4e2rince edward1; isU;i,nnsylv1rnambu02;an14;!na;axa0Ndisha,h1klaho1Bntar1reg4x04;io;ayarit,eBo3u1;evo le1nav0L;on;r1tt0Rva scot0X;f6mandy,th1; 1ampton0;c3d2yo1;rk0;ako0Y;aroli0V;olk;bras0Xva01w1; 2foundland1;! and labrador;brunswick,hamp0jers1mexiJyork state;ey;a6i2o1;nta0Nrelos;ch3dlanBn2ss1;issippi,ouri;as geraGneso0M;igQoacQ;dhya,harasht04ine,ni3r1ssachusetts;anhao,y1;land;p1toba;ur;anca0e1incoln0ouis8;e1iH;ds;a1entucky,hul0A;ns08rnata0Dshmir;alis1iangxi;co;daho,llino2nd1owa;ia05;is;a2ert1idalEunA;ford0;mp0waii;ansu,eorgWlou5u1;an2erre1izhou,jarat;ro;ajuato,gdo1;ng;cester0;lori2uji1;an;da;sex;e4o2uran1;go;rs1;et;lawaErby0;a8ea7hi6o1umbrH;ahui4l3nnectic2rsi1ventry;ca;ut;iMorado;la;apEhuahua;ra;l8m1;bridge0peche;a5r4uck1;ingham0;shi1;re;emen,itish columb3;h2ja cal1sque,var2;iforn1;ia;guascalientes,l4r1;izo2kans1;as;na;a2ber1;ta;ba2s1;ka;ma",
  "FemaleName": "true¦0:FY;1:G2;2:FR;3:FD;4:FC;5:EP;6:ER;7:FS;8:GF;9:EZ;A:GB;B:E5;C:FO;D:FL;E:G8;F:EG;aE2bD4cB8dAIe9Gf91g8Hh83i7Sj6Uk60l4Om38n2To2Qp2Fqu2Er1Os0Qt04ursu6vUwOyLzG;aJeHoG;e,la,ra;lGna;da,ma;da,ra;as7EeHol1TvG;et5onB9;le0sen3;an9endBNhiB4iG;lInG;if3AniGo0;e,f39;a,helmi0lGma;a,ow;aMeJiG;cHviG;an9XenG1;kCZtor3;da,l8Vnus,rG;a,nGoniD2;a,iDC;leGnesEC;nDLrG;i1y;aSePhNiMoJrGu6y4;acG3iGu0E;c3na,sG;h9Mta;nHrG;a,i;i9Jya;a5IffaCGna,s7;al3eGomasi0;a,l8Go6Xres1;g7Uo6WrHssG;!a,ie;eFi,ri8;bNliMmKnIrHs7tGwa0;ia0um;a,yn;iGya;a,ka,s7;a4e4iGmCAra;!ka;a,t7;at7it7;a05carlet2Ye04hUiSkye,oQtMuHyG;bFJlvi1;e,sHzG;an2Tet5ie,y;anGi8;!a,e,nG;aDe;aIeG;fGl3DphG;an2;cF8r6;f3nGphi1;d4ia,ja,ya;er4lv3mon1nGobh75;dy;aKeGirlBLo0y6;ba,e0i6lIrG;iGrBPyl;!d70;ia,lBV;ki4nIrHu0w0yG;la,na;i,leAon,ron;a,da,ia,nGon;a,on;l5Yre0;bMdLi9lKmIndHrGs7vannaD;aDi0;ra,y;aGi4;nt7ra;lBNome;e,ie;in1ri0;a02eXhViToHuG;by,thBK;bQcPlOnNsHwe0xG;an94ie,y;aHeGie,lE;ann8ll1marBFtB;!lGnn1;iGyn;e,nG;a,d7W;da,i,na;an9;hel53io;bin,erByn;a,cGkki,na,ta;helBZki;ea,iannDXoG;da,n12;an0bIgi0i0nGta,y0;aGee;!e,ta;a,eG;cARkaD;chGe,i0mo0n5EquCDvCy0;aCCelGi9;!e,le;een2ia0;aMeLhJoIrG;iGudenAW;scil1Uyamva9;lly,rt3;ilome0oebe,ylG;is,lis;arl,ggy,nelope,r6t4;ige,m0Fn4Oo6rvaBBtHulG;a,et5in1;ricGsy,tA8;a,e,ia;ctav3deHfAWlGphAW;a,ga,iv3;l3t5;aQePiJoGy6;eHrG;aDeCma;ll1mi;aKcIkGla,na,s7ta;iGki;!ta;hoB2k8BolG;a,eBH;!mh;l7Tna,risF;dIi5PnHo23taG;li1s7;cy,et5;eAiCO;a01ckenz2eViLoIrignayani,uriBGyG;a,rG;a,na,tAS;i4ll9XnG;a,iG;ca,ka,qB4;a,chOkaNlJmi,nIrGtzi;aGiam;!n9;a,dy,erva,h,n2;a,dIi9JlG;iGy;cent,e;red;!e6;ae6el3G;ag4KgKi,lHrG;edi61isFyl;an2iGliF;nGsAM;a,da;!an,han;b08c9Ed06e,g04i03l01nZrKtJuHv6Sx87yGz2;a,bell,ra;de,rG;a,eC;h75il9t2;a,cSgOiJjor2l6In2s7tIyG;!aGbe5QjaAlou;m,n9S;a,ha,i0;!aIbALeHja,lEna,sGt53;!a,ol,sa;!l06;!h,m,nG;!a,e,n1;arIeHie,oGr3Kueri5;!t;!ry;et3IiB;elGi61y;a,l1;dGon,ue6;akranBy;iGlo36;a,ka,n9;a,re,s2;daGg2;!l2W;alEd2elGge,isBGon0;eiAin1yn;el,le;a0Ie08iWoQuKyG;d3la,nG;!a,dHe9SnGsAQ;!a,e9R;a,sAO;aB1cJelIiFlHna,pGz;e,iB;a,u;a,la;iGy;a2Ae,l25n9;is,l1GrHtt2uG;el6is1;aIeHi8na,rG;a6Zi8;lei,n1tB;!in1;aQbPd3lLnIsHv3zG;!a,be4Ket5z2;a,et5;a,dG;a,sGy;ay,ey,i,y;a,iaIlG;iGy;a8Ge;!n4F;b7Terty;!n5R;aNda,e0iLla,nKoIslARtGx2;iGt2;c3t3;la,nGra;a,ie,o4;a,or1;a,gh,laG;!ni;!h,nG;a,d4e,n4N;cNdon7Si6kes7na,rMtKurIvHxGy6;mi;ern1in3;a,eGie,yn;l,n;as7is7oG;nya,ya;a,isF;ey,ie,y;aZeUhadija,iMoLrIyG;lGra;a,ee,ie;istGy5B;a,en,iGy;!e,n48;ri,urtn9A;aMerLl99mIrGzzy;a,stG;en,in;!berlG;eGi,y;e,y;a,stC;!na,ra;el6PiJlInHrG;a,i,ri;d4na;ey,i,l9Qs2y;ra,s7;c8Wi5XlOma6nyakumari,rMss5LtJviByG;!e,lG;a,eG;e,i78;a5EeHhGi3PlEri0y;ar5Cer5Cie,leCr9Fy;!lyn73;a,en,iGl4Uyn;!ma,n31sF;ei72i,l2;a04eVilToMuG;anKdJliGst56;aHeGsF;!nAt0W;!n8X;i2Ry;a,iB;!anLcelEd5Vel71han6IlJni,sHva0yG;a,ce;eGie;fi0lEph4X;eGie;en,n1;!a,e,n36;!i10lG;!i0Z;anLle0nIrHsG;i5Qsi5Q;i,ri;!a,el6Pif1RnG;a,et5iGy;!e,f1P;a,e72iHnG;a,e71iG;e,n1;cLd1mi,nHqueliAsmin2Uvie4yAzG;min8;a8eHiG;ce,e,n1s;!lGsFt06;e,le;inHk2lEquelG;in1yn;da,ta;lPmNnMo0rLsHvaG;!na;aHiGob6U;do4;!belGdo4;!a,e,l2G;en1i0ma;a,di4es,gr5R;el9ogG;en1;a,eAia0o0se;aNeKilHoGyacin1N;ll2rten1H;aHdGlaH;a,egard;ry;ath0WiHlGnrietBrmiAst0W;en24ga;di;il75lKnJrGtt2yl75z6D;iGmo4Fri4G;etG;!te;aDnaD;ey,l2;aYeTiOlMold12rIwG;enGyne18;!dolE;acHetGisel9;a,chC;e,ieG;!la;adys,enGor3yn1Y;a,da,na;aJgi,lHna,ov71selG;a,e,le;da,liG;an;!n0;mYnIorgHrG;ald35i,m2Stru73;et5i5T;a,eGna;s1Nvieve;briel3Fil,le,rnet,yle;aReOio0loMrG;anHe9iG;da,e9;!cG;esHiGoi0G;n1s3V;!ca;!rG;a,en43;lHrnG;!an9;ec3ic3;rHtiGy8;ma;ah,rah;d0FileCkBl00mUn4ArRsMtLuKvG;aIelHiG;e,ta;in0Ayn;!ngel2H;geni1la,ni3R;h52ta;meral9peranJtG;eHhGrel6;er;l2Pr;za;iGma,nest29yn;cGka,n;a,ka;eJilImG;aGie,y;!liA;ee,i1y;lGrald;da,y;aTeRiMlLma,no4oJsIvG;a,iG;na,ra;a,ie;iGuiG;se;a,en,ie,y;a0c3da,nJsGzaH;aGe;!beG;th;!a,or;anor,nG;!a;in1na;en,iGna,wi0;e,th;aWeKiJoGul2U;lor51miniq3Yn30rGtt2;a,eCis,la,othGthy;ea,y;an09naDonAx2;anPbOde,eNiLja,lImetr3nGsir4U;a,iG;ce,se;a,iHla,orGphiA;es,is;a,l5J;dGrdG;re;!d4Mna;!b2CoraDra;a,d4nG;!a,e;hl3i0mMnKphn1rHvi1WyG;le,na;a,by,cHia,lG;a,en1;ey,ie;a,et5iG;!ca,el1Aka;arGia;is;a0Qe0Mh04i02lUoJrHynG;di,th3;istGy04;al,i0;lOnLrHurG;tn1D;aId28iGn28riA;!nG;a,e,n1;!l1S;n2sG;tanGuelo;ce,za;eGleC;en,t5;aIeoHotG;il4B;!pat4;ir8rIudG;et5iG;a,ne;a,e,iG;ce,sX;a4er4ndG;i,y;aPeMloe,rG;isHyG;stal;sy,tG;aHen,iGy;!an1e,n1;!l;lseHrG;!i8yl;a,y;nLrG;isJlHmG;aiA;a,eGot5;n1t5;!sa;d4el1PtG;al,el1O;cHlG;es5i3F;el3ilG;e,ia,y;iYlXmilWndVrNsLtGy6;aJeIhGri0;erGleCrEy;in1;ri0;li0ri0;a2GsG;a2Fie;a,iMlKmeIolHrG;ie,ol;!e,in1yn;lGn;!a,la;a,eGie,y;ne,y;na,sF;a0Di0D;a,e,l1;isBl2;tlG;in,yn;arb0CeYianXlVoTrG;andRePiIoHyG;an0nn;nwEok8;an2NdgKg0ItG;n27tG;!aHnG;ey,i,y;ny;etG;!t8;an0e,nG;da,na;i8y;bbi8nG;iBn2;ancGossom,ythe;a,he;ca;aRcky,lin9niBrNssMtIulaDvG;!erlG;ey,y;hHsy,tG;e,i0Zy8;!anG;ie,y;!ie;nGt7yl;adHiG;ce;et5iA;!triG;ce,z;a4ie,ra;aliy29b24d1Lg1Hi19l0Sm0Nn01rWsNthe0uJvIyG;anGes7;a,na;a,r25;drIgusHrG;el3;ti0;a,ey,i,y;hHtrG;id;aKlGt1P;eHi8yG;!n;e,iGy;gh;!nG;ti;iIleHpiB;ta;en,n1t5;an19elG;le;aYdWeUgQiOja,nHtoGya;inet5n3;!aJeHiGmI;e,ka;!mGt5;ar2;!belHliFmT;sa;!le;ka,sGta;a,sa;elGie;a,iG;a,ca,n1qG;ue;!t5;te;je6rea;la;!bHmGstas3;ar3;el;aIberHel3iGy;e,na;!ly;l3n9;da;aTba,eNiKlIma,yG;a,c3sG;a,on,sa;iGys0J;e,s0I;a,cHna,sGza;a,ha,on,sa;e,ia;c3is7jaIna,ssaIxG;aGia;!nd4;nd4;ra;ia;i0nHyG;ah,na;a,is,naD;c7da,leCmLnslKsG;haDlG;inGyW;g,n;!h;ey;ee;en;at7g2nG;es;ie;ha;aVdiSelLrG;eIiG;anLenG;a,e,ne;an0;na;aKeJiHyG;nn;a,n1;a,e;!ne;!iG;de;e,lEsG;on;yn;!lG;iAyn;ne;agaJbHiG;!gaI;ey,i8y;!e;il;ah",
  "WeekDay": "true¦fri4mon4s2t1wed0;!nesd4;hurs2ues2;at0un1;!urd1;!d0;ay0;!s",
  "Month": "true¦aBdec9feb7j2mar,nov9oct1sep0;!t8;!o8;an3u0;l1n0;!e;!y;!u1;!ru0;ary;!em0;ber;pr1ug0;!ust;!il",
  "FirstName": "true¦aEblair,cCdevBj8k6lashawn,m3nelly,quinn,re2sh0;ay,e0iloh;a,lby;g1ne;ar1el,org0;an;ion,lo;as8e0r9;ls7nyatta,rry;am0ess1ude;ie,m0;ie;an,on;as0heyenne;ey,sidy;lex1ndra,ubr0;ey;is",
  "LastName": "true¦0:34;1:39;2:3B;3:2Y;4:2E;5:30;a3Bb31c2Od2Ee2Bf25g1Zh1Pi1Kj1Ek17l0Zm0Nn0Jo0Gp05rYsMtHvFwCxBy8zh6;a6ou,u;ng,o;a6eun2Uoshi1Kun;ma6ng;da,guc1Zmo27sh21zaR;iao,u;a7eb0il6o3right,u;li3Bs1;gn0lk0ng,tanabe;a6ivaldi;ssilj37zqu2;a9h8i2Go7r6sui,urn0;an,ynisJ;lst0Prr1Uth;at1Uomps1;kah0Vnaka,ylor;aEchDeChimizu,iBmiAo9t7u6zabo;ar2lliv2AzuE;a6ein0;l23rm0;sa,u3;rn4th;lva,mmo24ngh;mjon4rrano;midt,neid0ulz;ito,n7sa6to;ki;ch2dLtos,z;amBeag1Zi9o7u6;bio,iz,sD;b6dri1MgIj0Tme24osevelt,ssi,ux;erts,ins1;c6ve0F;ci,hards1;ir2os;aEeAh8ic6ow20;as6hl0;so;a6illips;m,n1T;ders5et8r7t6;e0Nr4;ez,ry;ers;h21rk0t6vl4;el,te0J;baBg0Blivei01r6;t6w1O;ega,iz;a6eils1guy5ix1owak,ym1E;gy,ka6var1K;ji6muW;ma;aEeCiBo8u6;ll0n6rr0Bssolini,ñ6;oz;lina,oKr6zart;al0Me6r0U;au,no;hhail4ll0;rci0ssi6y0;!er;eWmmad4r6tsu07;in6tin2;!o;aCe8i6op2uo;!n6u;coln,dholm;fe7n0Qr6w0J;oy;bv6v6;re;mmy,rs5u;aBennedy,imuAle0Lo8u7wo6;k,n;mar,znets4;bay6vacs;asY;ra;hn,rl9to,ur,zl4;aAen9ha3imen2o6u3;h6nYu3;an6ns1;ss1;ki0Es5;cks1nsse0D;glesi9ke8noue,shik7to,vano6;u,v;awa;da;as;aBe8itchcock,o7u6;!a3b0ghNynh;a3ffmann,rvat;mingw7nde6rN;rs1;ay;ns5rrQs7y6;asDes;an4hi6;moJ;a9il,o8r7u6;o,tierr2;ayli3ub0;m2nzal2;nd6o,rcia;hi;erAis9lor8o7uj6;ita;st0urni0;es;ch0;nand2;d7insteHsposi6vaL;to;is1wards;aCeBi9omin8u6;bo6rand;is;gu2;az,mitr4;ov;lgado,vi;nkula,rw7vi6;es,s;in;aFhBlarkAo6;h5l6op0rbyn,x;em7li6;ns;an;!e;an8e7iu,o6ristens5u3we;i,ng,u3w,y;!n,on6u3;!g;mpb7rt0st6;ro;ell;aBe8ha3lanco,oyko,r6yrne;ooks,yant;ng;ck7ethov5nnett;en;er,ham;ch,h8iley,rn6;es,i0;er;k,ng;dDl9nd6;ers6rA;en,on,s1;on;eks7iy8var2;ez;ej6;ev;ams",
  "MaleName": "true¦0:CE;1:BL;2:C2;3:BT;4:B5;5:9V;6:BZ;7:AT;8:BD;9:AX;A:AO;aB4bA8c97d87e7Gf6Yg6Gh5Wi5Ij4Lk4Bl3Rm2Pn2Eo28p22qu20r1As0Qt06u05v00wNxavi3yGzB;aBor0;cBh8Ine;hCkB;!aB1;ar51eB0;ass2i,oCuB;sDu25;nEsDusB;oBsC;uf;ef;at0g;aJeHiCoByaAP;lfgang,odrow;lBn1O;bDey,frBJlB;aA5iB;am,e,s;e89ur;i,nde5sB;!l7t1;de,lCrr6yB;l1ne;lBt3;a93y;aEern1iB;cCha0nceBrg9Bva0;!nt;ente,t5A;lentin49n8Yughn;lyss4Msm0;aTeOhKiIoErCyB;!l3ro8s1;av9QeBist0oy,um0;nt9Iv54y;bDd7XmBny;!as,mBoharu;aAYie,y;i83y;mBt9;!my,othy;adDeoCia7DomB;!as;!do7M;!de9;dErB;en8HrB;an8GeBy;ll,n8F;!dy;dgh,ic9Tnn3req,ts45;aRcotPeNhJiHoFpenc3tBur1Oylve8Hzym1;anDeBua7B;f0phAFvBwa7A;e57ie;!islaw,l7;lom1nA3uB;leyma8ta;dBl7Jm1;!n7;aDeB;lBrm0;d1t1;h6Sne,qu0Uun,wn,y8;aBbasti0k1Xl41rg40th,ymo9I;m9n;!tB;!ie,y;lCmBnti21q4Iul;!mAu4;ik,vato6V;aWeShe92iOoFuCyB;an,ou;b6LdCf9pe6QssB;!elAI;ol2Uy;an,bIcHdGel,geFh0landA9mEnDry,sCyB;!ce;coe,s;!a95nA;an,eo;l3Jr;e4Qg3n7olfo,ri68;co,ky;bAe9U;cBl7;ar5Oc5NhCkBo;!ey,ie,y;a85ie;gCid,ub6x,yBza;ansh,nS;g8WiB;na8Ss;ch5Yfa4lDmCndBpha4sh6Uul,ymo70;al9Yol2By;i9Ion;f,ph;ent2inB;cy,t1;aFeDhilCier62ol,reB;st1;!ip,lip;d9Brcy,tB;ar,e2V;b3Sdra6Ft44ul;ctav2Vliv3m96rFsCtBum8Uw6;is,to;aCc8SvB;al52;ma;i,l49vJ;athJeHiDoB;aBel,l0ma0r2X;h,m;cCg4i3IkB;h6Uola;hol5XkBol5X;!ol5W;al,d,il,ls1vB;il50;anBy;!a4i4;aWeTiKoFuCyB;l21r1;hamCr5ZstaB;fa,p4G;ed,mF;dibo,e,hamDis1XntCsBussa;es,he;e,y;ad,ed,mB;ad,ed;cGgu4kElDnCtchB;!e5;a78ik;house,o03t1;e,olB;aj;ah,hBk7;a4eB;al,l;hClv2rB;le,ri5v2;di,met;ck,hNlLmOnu4rHs1tDuricCxB;!imilian8Cwe5;e,io;eo,hCi52tB;!eo,hew,ia;eBis;us,w;cDio,k86lCqu6Gsha5tBv2;i2Hy;in,on;!el,oKus;achBcolm,ik;ai,y;amBdi,moud;adB;ou;aReNiMlo2RoIuCyB;le,nd1;cEiDkBth3;aBe;!s;gi,s;as,iaB;no;g0nn6RrenDuBwe5;!iB;e,s;!zo;am,on4;a7Bevi,la4SnDoBst3vi;!nB;!a60el;!ny;mCnBr67ur4Twr4T;ce,d1;ar,o4N;aIeDhaled,iBrist4Vu48y3B;er0p,rB;by,k,ollos;en0iEnBrmit,v2;!dCnBt5C;e0Yy;a5ri4N;r,th;na68rBthem;im,l;aYeQiOoDuB;an,liBst2;an,o,us;aqu2eJhnInGrEsB;eChBi7Bue;!ua;!ph;dBge;an,i,on;!aBny;h,s,th4X;!ath4Wie,nA;!l,sBy;ph;an,e,mB;!mA;d,ffGrDsB;sBus;!e;a5JemCmai8oBry;me,ni0O;i6Uy;!e58rB;ey,y;cHd6kGmFrDsCvi3yB;!d6s1;on,p3;ed,od,rBv4M;e4Zod;al,es,is1;e,ob,ub;k,ob,quB;es;aNbrahMchika,gKkeJlija,nuIrGsDtBv0;ai,sB;uki;aBha0i6Fma4sac;ac,iaB;h,s;a,vinBw2;!g;k,nngu52;!r;nacBor;io;im;in,n;aJeFina4VoDuByd56;be25gBmber4CsD;h,o;m3ra33sBwa3X;se2;aDctCitCn4ErB;be20m0;or;th;bKlJmza,nIo,rDsCyB;a43d6;an,s0;lEo4FrDuBv7;hi40ki,tB;a,o;is1y;an,ey;k,s;!im;ib;aQeMiLlenKoIrEuB;illerCsB;!tavo;mo;aDegBov3;!g,orB;io,y;dy,h57nt;nzaBrd1;lo;!n;lbe4Qno,ovan4R;ne,oDrB;aBry;ld,rd4U;ffr7rge;bri4l6rBv2;la1Zr3Eth,y;aReNiLlJorr0IrB;anDedBitz;!dAeBri24;ri23;cDkB;!ie,lB;in,yn;esJisB;!co,zek;etch3oB;yd;d4lBonn;ip;deriDliCng,rnB;an01;pe,x;co;bi0di;arZdUfrTit0lNmGnFo2rCsteb0th0uge8vBym6zra;an,ere2V;gi,iCnBrol,v2w2;est45ie;c07k;och,rique,zo;aGerFiCmB;aFe2P;lCrB;!h0;!io;s1y;nu4;be09d1iEliDmCt1viBwood;n,s;er,o;ot1Ts;!as,j43sB;ha;a2en;!dAg32mEuCwB;a25in;arB;do;o0Su0S;l,nB;est;aYeOiLoErDuCwByl0;ay8ight;a8dl7nc0st2;ag0ew;minFnDri0ugCyB;le;!l03;!a29nBov0;e5ie,y;go,icB;!k;armuCeBll1on,rk;go;id;anIj0lbeHmetri9nFon,rEsDvCwBxt3;ay8ey;en,in;hawn,mo08;ek,ri0F;is,nBv3;is,y;rt;!dB;re;lKmInHrDvB;e,iB;!d;en,iDne5rByl;eBin,yl;l2Vn;n,o,us;!e,i4ny;iBon;an,en,on;e,lB;as;a06e04hWiar0lLoGrEuCyrB;il,us;rtB;!is;aBistobal;ig;dy,lEnCrB;ey,neli9y;or,rB;ad;by,e,in,l2t1;aGeDiByI;fBnt;fo0Ct1;meCt9velaB;nd;nt;rDuCyB;!t1;de;enB;ce;aFeErisCuB;ck;!tB;i0oph3;st3;d,rlBs;eBie;s,y;cBdric,s11;il;lEmer1rB;ey,lCro5y;ll;!os,t1;eb,v2;ar02eUilTlaSoPrCuByr1;ddy,rtI;aJeEiDuCyB;an,ce,on;ce,no;an,ce;nCtB;!t;dCtB;!on;an,on;dCndB;en,on;!foBl7y;rd;bCrByd;is;!by;i8ke;al,lA;nFrBshoi;at,nCtB;!r10;aBie;rd0S;!edict,iCjam2nA;ie,y;to;n7rBt;eBy;tt;ey;ar0Xb0Nd0Jgust2hm0Gid6ja0ElZmXnPputsiOrFsaEuCveBya0ziz;ry;gust9st2;us;hi;aIchHi4jun,maFnDon,tBy0;hBu06;ur;av,oB;ld;an,nd0A;el;ie;ta;aq;dGgel05tB;hoEoB;i8nB;!i02y;ne;ny;reBy;!as,s,w;ir,mBos;ar;an,beOd6eIfFi,lEonDphonHt1vB;aMin;on;so,zo;an,en;onCrB;edP;so;c,jaEksandDssaExB;!and3;er;ar,er;ndB;ro;rtH;ni;en;ad,eB;d,t;in;aColfBri0vik;!o;mBn;!a;dFeEraCuB;!bakr,lfazl;hBm;am;!l;allEel,oulaye,ulB;!lCrahm0;an;ah,o;ah;av,on",
  "Person": "true¦ashton kutchSbRcMdKeIgastNhGinez,jEkDleCmBnettJoAp8r4s3t2v0;a0irgin maG;lentino rossi,n go3;heresa may,iger woods,yra banks;addam hussain,carlett johanssJlobodan milosevic,uB;ay romano,eese witherspoIo1ush limbau0;gh;d stewart,nald0;inho,o;a0ipJ;lmIris hiltD;prah winfrFra;essiaen,itt romnEubarek;bron james,e;anye west,iefer sutherland,obe bryant;aime,effers8k rowli0;ng;alle ber0itlBulk hogan;ry;ff0meril lagasse,zekiel;ie;a0enzel washingt2ick wolf;lt1nte;ar1lint0ruz;on;dinal wols1son0;! palm2;ey;arack obama,rock;er",
  "Verb": "true¦awak9born,cannot,fr8g7h5k3le2m1s0wors9;e8h3;ake sure,sg;ngth6ss6;eep tabs,n0;own;as0e2;!t2;iv1onna;ight0;en",
  "PhrasalVerb": "true¦0:71;1:6P;2:7D;3:73;4:6I;5:7G;6:75;7:6O;8:6B;9:6C;A:5H;B:70;C:6Z;a7Gb62c5Cd59e57f45g3Nh37iron0j33k2Yl2Km2Bn29o27p1Pr1Es09tQuOvacuum 1wGyammerCzD;eroAip EonD;e0k0;by,up;aJeGhFiEorDrit52;d 1k2Q;mp0n49pe0r8s8;eel Bip 7K;aEiD;gh 06rd0;n Br 3C;it 5Jk8lk6rm 0Qsh 73t66v4O;rgeCsD;e 9herA;aRePhNiJoHrFuDype 0N;ckArn D;d2in,o3Fup;ade YiDot0y 32;ckle67p 79;ne66p Ds4C;d2o6Kup;ck FdEe Dgh5Sme0p o0Dre0;aw3ba4d2in,up;e5Jy 1;by,o6U;ink Drow 5U;ba4ov7up;aDe 4Hll4N;m 1r W;ckCke Elk D;ov7u4N;aDba4d2in,o30up;ba4ft7p4Sw3;a0Gc0Fe09h05i02lYmXnWoVpSquare RtJuHwD;earFiD;ngEtch D;aw3ba4o6O; by;ck Dit 1m 1ss0;in,up;aIe0RiHoFrD;aigh1LiD;ke 5Xn2X;p Drm1O;by,in,o6A;n2Yr 1tc3H;c2Xmp0nd Dr6Gve6y 1;ba4d2up;d2o66up;ar2Uell0ill4TlErDurC;ingCuc8;a32it 3T;be4Brt0;ap 4Dow B;ash 4Yoke0;eep EiDow 9;c3Mp 1;in,oD;ff,v7;gn Eng2Yt Dz8;d2o5up;in,o5up;aFoDu4E;ot Dut0w 5W;aw3ba4f36o5Q;c2EdeAk4Rve6;e Hll0nd GtD; Dtl42;d2in,o5upD;!on;aw3ba4d2in,o1Xup;o5to;al4Kout0rap4K;il6v8;at0eKiJoGuD;b 4Dle0n Dstl8;aDba4d2in52o3Ft2Zu3D;c1Ww3;ot EuD;g2Jnd6;a1Wf2Qo5;ng 4Np6;aDel6inAnt0;c4Xd D;o2Su0C;aQePiOlMoKrHsyc29uD;ll Ft D;aDba4d2in,o1Gt33up;p38w3;ap37d2in,o5t31up;attleCess EiGoD;p 1;ah1Gon;iDp 52re3Lur44wer 52;nt0;ay3YuD;gAmp 9;ck 52g0leCn 9p3V;el 46ncilA;c3Oir 2Hn0ss FtEy D;ba4o4Q; d2c1X;aw3ba4o11;pDw3J;e3It B;arrow3Serd0oD;d6te3R;aJeHiGoEuD;ddl8ll36;c16p 1uth6ve D;al3Ad2in,o5up;ss0x 1;asur8lt 9ss D;a19up;ke Dn 9r2Zs1Kx0;do,o3Xup;aOeMiHoDuck0;a16c36g 0AoDse0;k Dse34;aft7ba4d2forw2Ain3Vov7uD;nd7p;e GghtFnEsDv1T;ten 4D;e 1k 1; 1e2Y;ar43d2;av1Ht 2YvelD; o3L;p 1sh DtchCugh6y1U;in3Lo5;eEick6nock D;d2o3H;eDyA;l2Hp D;aw3ba4d2fSin,o05to,up;aFoEuD;ic8mpA;ke2St2W;c31zz 1;aPeKiHoEuD;nker2Ts0U;lDneArse2O;d De 1;ba4d2fast,oZup;de Et D;ba4on,up;aw3o5;aDlp0;d Fr Dt 1;fDof;rom;in,oO;cZm 1nDve it;d Dg 27kerF;d2in,o5;aReLive Jloss1VoFrEunD; f0M;in39ow 23; Dof 0U;aEb17it,oDr35t0Ou12;ff,n,v7;bo5ft7hJw3;aw3ba4d2in,oDup,w3;ff,n,ut;a17ek0t D;aEb11d2oDr2Zup;ff,n,ut,v7;cEhDl1Pr2Xt,w3;ead;ross;d aEnD;g 1;bo5;a08e01iRlNoJrFuD;cDel 1;k 1;eEighten DownCy 1;aw3o2L;eDshe1G; 1z8;lFol D;aDwi19;bo5r2I;d 9;aEeDip0;sh0;g 9ke0mDrD;e 2K;gLlJnHrFsEzzD;le0;h 2H;e Dm 1;aw3ba4up;d0isD;h 1;e Dl 11;aw3fI;ht ba4ure0;eInEsD;s 1;cFd D;fDo1X;or;e B;dQl 1;cHll Drm0t0O;apYbFd2in,oEtD;hrough;ff,ut,v7;a4ehi1S;e E;at0dge0nd Dy8;o1Mup;o09rD;ess 9op D;aw3bNin,o15;aShPlean 9oDross But 0T;me FoEuntD; o1M;k 1l6;aJbIforGin,oFtEuD;nd7;ogeth7;ut,v7;th,wD;ard;a4y;pDr19w3;art;eDipA;ck BeD;r 1;lJncel0rGsFtch EveA; in;o16up;h Bt6;ry EvD;e V;aw3o12;l Dm02;aDba4d2o10up;r0Vw3;a0He08l01oSrHuD;bbleFcklTilZlEndlTrn 05tDy 10zz6;t B;k 9; ov7;anMeaKiDush6;ghHng D;aEba4d2forDin,o5up;th;bo5lDr0Lw3;ong;teD;n 1;k D;d2in,o5up;ch0;arKgJil 9n8oGssFttlEunce Dx B;aw3ba4;e 9; ar0B;k Bt 1;e 1;d2up; d2;d 1;aIeed0oDurt0;cFw D;aw3ba4d2o5up;ck;k D;in,oK;ck0nk0st6; oJaGef 1nd D;d2ov7up;er;up;r0t D;d2in,oDup;ff,ut;ff,nD;to;ck Jil0nFrgEsD;h B;ainCe B;g BkC; on;in,o5; o5;aw3d2o5up;ay;cMdIsk Fuction6; oD;ff;arDo5;ouD;nd;d D;d2oDup;ff,n;own;t D;o5up;ut",
  "Modal": "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to;ay,ight,ust;an,o0;uld",
  "Adjective": "true¦0:75;1:7K;2:7Q;3:7J;4:7C;5:5C;6:48;7:49;8:4S;9:61;A:7H;B:70;C:6Z;D:73;E:5X;a6Jb65c5Rd57e4Tf49g41h3Qi35j33k32l2Rm2Gn27o1Rp1Aquack,r10s0Gt09uQvNwFyear5;arp0eJholeIiHoF;man5oFu6C;d6Ezy;despr75s5G;!sa7;eGlFste26;co1Il o4L;!k5;aGiFola4B;b7Tce versa,ol55;ca2gabo63nilla;ltWnJpGrb5Asu4tterF;!moC; f34b1OpGsFti1H;ca7et,ide dMtairs;er,i3N;aPbeco6Rconvin27deMeLfair,ivers4knKprecedYrIsGwF;iel20ritt5Z;i1VuF;pervis0specti3;eFu5;cognLgul6Hl6H;own;ndi3v5Txpect0;cid0rF;!grou5OsF;iz0tood;b7ppeaLssu6GuthorF;iz0;i24ra;aJeHhough4PoGrF;i1oubl0;geth8p,rpB;en5QlFm50rr2Ust0;li3;boo,lFn;ent0;aXcWeUhTiRmug,nobbi3EoPpOqueami3EtJuFymb64;bHi gener55pFrprisi3;erFre0L;! dup8b,i29;du0seq4U;anda6UeIi0PrFy38;aightFip0; fFfF;or5B;adfaCreotyp0;aEec2Gir1JlendBot on; call0le,mb8phist1XrFu0Xvi42;dBry;gnifica2nF;ceEg7;am2Pe8ocki3ut;cFda1em5lfi2Yni1Wpa69re6;o1Gr3W;at58ient28reec58;cr0me,ns serif;aMeIiGoF;buCtt4UuSy4;ghtFv4;!-29f9;ar,bel,condi1du63fres52lHpublic3WsFtard0;is48oF;lu1na2;e1Euc46;bBciF;al,st;aQeOicayu6lacBopuliCrGuF;bl5Amp0;eJiGoF;!b0AfuDmi32p8;mGor,sFva1;ti6;a4We;ciDmF;a0IiF;er,um;ac20rFti1;feAma2Uplexi3v34;rFst;allelHtF;-tiFi4;me;!ed;bQffOkNld fashion0nMpLrg1Hth8utKvF;al,erF;!aHniGt,wF;eiFrouF;ght;ll;do0Ver,g2Msi46;en,posi1; boa5Gg2Kli6;!ay; gua5EbFli6;eat;eHsF;cFer0Hole1;e6uE;d2Tse;ak0eMiLoFua4P;nJrGtF;ab7;thF;!eF;rn;chala2descri50stop;ght5;arby,cessa3Xighbor5xt;aNeLiIoFultip7;bi7derGlFnth5ot,st;dy;a1n;nFx0;iaFor;tuE;di4FnaFre;ci3;cFgenta,in,j03keshift,le,mmoth,ny,sculi6;abEho;aOeJiGoFu13;uti12vi3;mGteraF;l,te;it0;ftIgFth4;al,eGitiF;ma1;nda3D;!-0C;nguBst,tt8;ap1Tind5no0A;agg0uF;niOstifi0veni7;de4gno4Clleg4mSnHpso 1WrF;a1releF;va2; NaMbr0corLdJfluenTiTnIsHtF;aAenDoxF;ic37;a6i2S;a1er,oce2;iGoF;or;reA;deq3Kppr2Z;fFsitu,vitro;ro2;mJpF;arHerfeAoFrop8;li1rtF;a2ed;ti4;eFi0R;d2RnD;aKelJiHoFumdr3C;neCok0rrFs07ur5;if2T;ghfalut1PspF;an2R;liZpf9;lInHrF;d05roF;wi3;dy,gi3;f,low0;ainf9ener2Kiga23lLoKraHuF;ilFng ho;ty;cGtF;ef9is;ef9;ne,od;ea2Eob4;aUeOinNlMoHrF;a1UeFoz1L;e2Eq13tf9;oHrF; keeps,eFm8tuna1;g05ign;liF;sh;ag30ue2;al,i1;dJmGrF;ti7;a7ini6;ne;le; up;bl0i2lDr Gux,voF;ri1uri1;oFreac1F;ff;aOfficie2lNmiMnKreAthere4veJxF;aAcess,peHtraGuF;be2Ml0I;!va1E;ct0rt;n,ryday; Fcouragi3tiE;rou1sui1;ne2;abo23dQe18i1;g8sF;t,ygF;oi3;er;aVeNiHoFrea15ue;mina2ne,ubF;le,tf9;dact1Bfficu1OsGvF;erD;creHeas0gruntl0honeCordGtF;a2ress0;er5;et; LadpKfJgene1PliHrang0spe1PtGvoF;ut;ail0ermin0;be1Mca1ghF;tf9;ia2;an;facto;i5magFngeroZs0I;ed,i3;ly;ertaRhief,ivil,oHrF;aFowd0u0H;mp0v02z0;loNmLnGoi3rrFve0P;eAu1I;cre1grIsHtF;emFra0F;po0D;ta2;ue2;mer08pleF;te,x;ni4ss4;in;aPeLizarElJoGrF;and new,isk,okP;gGna fiWttom,urgeoF;is;us;ank,iI;re;autif9hiGlov0nFst,yoG;eVt;nd;ul;ckGnkru0XrrF;en;!wards; priori,b0Nc0Kd0AfraBg05h04lZma06ntiquYpUrOsMttracti07utheLvIwF;aGkF;wa0U;ke,re;ant garGerF;age;de;ntV;leep,tonisF;hi3;ab,bitIroHtiF;fiF;ci4;ga2;raF;ry;pFt;are2etiPrF;oprF;ia1;at0;arIcohGeFiMl,oof;rt;olF;ic;mi3;ead;ainCgressiGoniF;zi3;ve;st;id; MeKuJvF;aGerD;se;nc0;ed;lt;pt,qF;ua1;hoc,infinitF;um;cuGtu4u1;al;ra1;erPlOoMruLsGuF;nda2;e2oGtraA;ct;lu1rbi3;ng;te;pt;aFve;rd;aze,e;ra2;nt",
  "Comparable": "true¦0:40;1:4H;2:44;3:4A;4:2X;5:3W;a4Nb43c3Nd3Ce34f2Qg2Eh23i1Uj1Tk1Ql1Hm1Bn15o13p0Tqu0Rr0IsRtKuIvFw7y6za11;ell26ou3;aBe9hi1Xi7r6;o3y;ck0Mde,l6n1ry,se;d,y;a6i4Lt;k,ry;n1Sr6sI;m,y;a7e6ulgar;nge5rda2xi3;gue,in,st;g0n6pco3Lse5;like0ti1;aAen9hi8i7ough,r6;anqu2Pen1ue;dy,g3Tme0ny,r09;ck,n,rs2Q;d41se;ll,me,rt,s6wd46;te5;aVcarUeThRiQkin0FlMmKoHpGqua1GtAu7w6;eet,ift;b7dd14per0Gr6;e,re2I;sta2Gt4;aAe9iff,r7u6;pXr1;a6ict,o3;ig3Gn0V;a1ep,rn;le,rk;e23i3Gright0;ci29ft,l7o6re,ur;n,thi3;emn,id;a6el0ooth;ll,rt;e8i6ow,y;ck,g36m6;!y;ek,nd3E;ck,l0mp4;a6iTort,rill,y;dy,ll0Yrp;cu0Sve0Sxy;ce,ed,y;d,fe,int0l1Wv15;aBe9i8o6ude;mantic,o1Jsy,u6;gh,nd;ch,pe,tzy;a6d,mo0I;dy,l;gg7ndom,p6re,w;id;ed;ai2i6;ck,et;aEhoDi1RlCoBr8u6;ny,r6;e,p4;egna2ic7o6;fouZud;ey,k0;li05or,te1C;ain,easa2;ny;in5le;dd,f6i0ld,ranR;fi11;aAe8i7o6;b4isy,rm16sy;ce,mb4;a6w;r,t;ive,rr02;aAe8ild,o7u6;nda1Ate;ist,o1;a6ek,llY;n,s0ty;d,tuR;aCeBi9o6ucky;f0Vn7o1Eu6ve0w18y0U;d,sy;e0g;g1Uke0tt4v6;e0i3;an,wd;me,r6te;ge;e7i6;nd;en;ol0ui1P;cy,ll,n6;sBt6;e6ima8;llege2r6;es7media6;te;ti3;ecu6ta2;re;aEeBiAo8u6;ge,m6ng1R;b4id;ll6me0t;ow;gh,l0;a6f04sita2;dy,v6;en0y;nd1Hppy,r6te5;d,sh;aGenFhDiClBoofy,r6;a9e8is0o6ue1E;o6ss;vy;at,en,y;nd,y;ad,ib,ooI;a2d1;a6o6;st0;t4uiY;u1y;aIeeb4iDlat,oAr8u6;ll,n6r14;!ny;aHe6iend0;e,sh;a7r6ul;get5mG;my;erce8n6rm,t;an6e;ciC;! ;le;ir,ke,n0Fr,st,t,ulA;aAerie,mp9sse7v6xtre0Q;il;nti6;al;ty;r7s6;tern,y;ly,th0;aFeCi9r7u6;ll,mb;u6y;nk;r7vi6;ne;e,ty;a6ep,nD;d6f,r;!ly;mp,pp03rk;aHhDlAo8r7u6;dd0r0te;isp,uel;ar6ld,mmon,ol,st0ward0zy;se;e6ou1;a6vW;n,r;ar8e6il0;ap,e6;sy;mi3;gey,lm8r6;e5i3;ful;!i3;aNiLlIoEr8u6;r0sy;ly;aAi7o6;ad,wn;ef,g7llia2;nt;ht;sh,ve;ld,r7un6;cy;ed,i3;ng;a7o6ue;nd,o1;ck,nd;g,tt6;er;d,ld,w1;dy;bsu9ng8we6;so6;me;ry;rd",
  "TextValue": "true¦bMeIfChundredNmMnin9one,qu8s6t0zeroN;enMh3rLw0;e0o;l0ntC;fGve;ir0ousandIree;d,t5;e0ix7;cond,ptEven6xtE;adrDintD;e0th;!t0;e9ie8y;i3o0;rt1ur0;!t2;ie4y;ft0rst,ve;e3h,ie2y;ight0lev2;!e1h,ie0y;th;en1;illion0;!th",
  "Ordinal": "true¦bGeDf9hundredHmGnin7qu6s4t0zeroH;enGh1rFwe0;lfFn9;ir0ousandE;d,t4;e0ixt9;cond,ptAvent8xtA;adr9int9;et0th;e6ie8;i2o0;r0urt3;tie5;ft1rst;ight0lev1;e0h,ie2;en1;illion0;th",
  "Cardinal": "true¦bGeDf7hundred,mGnine9one,qu6s4t0zero;en,h2rFw0;e0o;lve,n7;irt8ousand,ree;e0ix4;ptAven3xtA;adr9int9;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illion",
  "Expression": "true¦a02b01dXeVfuck,gShLlImHnGoDpBshAu7voi04w3y0;a1eLu0;ck,p;!a,hoo,y;h1ow,t0;af,f;e0oa;e,w;gh,h0;! 0h,m;huh,oh;eesh,hh,it;ff,hew,l0sst;ease,z;h1o0w,y;h,o,ps;!h;ah,ope;eh,mm;m1ol0;!s;ao,fao;a4e2i,mm,oly1urr0;ah;! mo6;e,ll0y;!o;ha0i;!ha;ah,ee,o0rr;l0odbye;ly;e0h,t cetera,ww;k,p;'oh,a0uh;m0ng;mit,n0;!it;ah,oo,ye; 1h0rgh;!em;la",
  "Adverb": "true¦a07by 05d01eYfShQinPjustOkinda,mMnJoEpCquite,r9s5t2up1very,w0Bye0;p,s; to,wards5;h1o0wiO;o,t6ward;en,us;everal,o0uch;!me1rt0; of;hXtimes,w07;a1e0;alS;ndomRthN;ar excellDer0oint blank; Mhaps;f3n0;ce0ly;! 0;ag00moU; courHten;ewJo0; longEt 0;onHwithstanding;aybe,eanwhiAore0;!ovB;! aboS;deed,steT;en0;ce;or2u0;l9rther0;!moH; 0ev3;examp0good,suF;le;n mas1v0;er;se;e0irect1; 1finite0;ly;ju7trop;far,n0;ow; CbroBd nauseam,gAl5ny2part,side,t 0w3;be5l0mo5wor5;arge,ea4;mo1w0;ay;re;l 1mo0one,ready,so,ways;st;b1t0;hat;ut;ain;ad;lot,posteriori",
  "Preposition": "true¦'o,-,aKbHcGdFexcept,fEinDmidPnotwithstandiQoBpRqua,sAt6u3vi2w0;/o,hereMith0;!in,oQ;a,s-a-vis;n1p0;!on;like,til;h0ill,owards;an,r0;ough0u;!oI;ans,ince,o that;',f0n1ut;!f;!to;or,rom;espite,own,u3;hez,irca;ar1e0oAy;low,sides,tween;ri6;',bo7cross,ft6lo5m3propos,round,s1t0;!op;! long 0;as;id0ong0;!st;ng;er;ut",
  "Determiner": "true¦aAboth,d8e5few,l3mu7neiCown,plenty,some,th2various,wh0;at0ich0;evB;at,e3is,ose;a,e0;!ast,s;a1i6l0nough,very;!se;ch;e0u;!s;!n0;!o0y;th0;er"
};

},{}],135:[function(_dereq_,module,exports){
"use strict";

// add words from plurals and conjugations data
var addIrregulars = function addIrregulars(world) {
  //add irregular plural nouns
  var nouns = world.irregulars.nouns;
  var words = Object.keys(nouns);

  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    world.words[w] = 'Singular';
    world.words[nouns[w]] = 'Plural';
  } // add irregular verb conjugations


  var verbs = world.irregulars.verbs;
  var keys = Object.keys(verbs);

  var _loop = function _loop(_i) {
    var inf = keys[_i]; //add only if it it's safe...

    world.words[inf] = world.words[inf] || 'Infinitive';
    var forms = world.transforms.conjugate(inf, world);
    forms = Object.assign(forms, verbs[inf]); //add the others

    Object.keys(forms).forEach(function (tag) {
      world.words[forms[tag]] = world.words[forms[tag]] || tag;
    });
  };

  for (var _i = 0; _i < keys.length; _i++) {
    _loop(_i);
  }
};

module.exports = addIrregulars;

},{}],136:[function(_dereq_,module,exports){
"use strict";

//safely add it to the lexicon
var addWord = function addWord(word, tag, lex) {
  if (lex[word] !== undefined) {
    if (typeof lex[word] === 'string') {
      lex[word] = [lex[word]];
    }

    lex[word].push(tag);
  } else {
    lex[word] = tag;
  }
}; // blast-out more forms for some given words


var addMore = function addMore(word, tag, world) {
  var lexicon = world.words;
  var transform = world.transforms; // cache multi-words

  var words = word.split(' ');

  if (words.length > 1) {
    //cache the beginning word
    world.hasCompound[words[0]] = true;
  } // inflect our nouns


  if (tag === 'Singular') {
    var plural = transform.toPlural(word, world);
    lexicon[plural] = lexicon[plural] || 'Plural'; // only if it's safe
  } //conjugate our verbs


  if (tag === 'Infinitive') {
    var conj = transform.conjugate(word, world);
    var tags = Object.keys(conj);

    for (var i = 0; i < tags.length; i++) {
      var w = conj[tags[i]];
      lexicon[w] = lexicon[w] || tags[i]; // only if it's safe
    }
  } //derive more adjective forms


  if (tag === 'Comparable') {
    var _conj = transform.adjectives(word);

    var _tags = Object.keys(_conj);

    for (var _i = 0; _i < _tags.length; _i++) {
      var _w = _conj[_tags[_i]];
      lexicon[_w] = lexicon[_w] || _tags[_i]; // only if it's safe
    }
  } //conjugate phrasal-verbs


  if (tag === 'PhrasalVerb') {
    //add original form
    addWord(word, 'Infinitive', lexicon); //conjugate first word

    var _conj2 = transform.conjugate(words[0], world);

    var _tags2 = Object.keys(_conj2);

    for (var _i2 = 0; _i2 < _tags2.length; _i2++) {
      //add it to our cache
      world.hasCompound[_conj2[_tags2[_i2]]] = true; //first + last words

      var _w2 = _conj2[_tags2[_i2]] + ' ' + words[1];

      addWord(_w2, _tags2[_i2], lexicon);
      addWord(_w2, 'PhrasalVerb', lexicon);
    }
  } // inflect our demonyms - 'germans'


  if (tag === 'Demonym') {
    var _plural = transform.toPlural(word, world);

    lexicon[_plural] = lexicon[_plural] || ['Demonym', 'Plural']; // only if it's safe
  }
}; // throw a bunch of words in our lexicon
// const doWord = function(words, tag, world) {
//   let lexicon = world.words
//   for (let i = 0; i < words.length; i++) {
//     addWord(words[i], tag, lexicon)
//     // do some fancier stuff
//     addMore(words[i], tag, world)
//   }
// }


module.exports = {
  addWord: addWord,
  addMore: addMore
};

},{}],137:[function(_dereq_,module,exports){
"use strict";

// a list of irregular verb conjugations
// used in verbs().conjugate()
// but also added to our lexicon
//use shorter key-names
var mapping = {
  g: 'Gerund',
  prt: 'Participle',
  perf: 'PerfectTense',
  pst: 'PastTense',
  fut: 'FuturePerfect',
  pres: 'PresentTense',
  pluperf: 'Pluperfect',
  a: 'Actor'
}; // '_' in conjugations is the infinitive form

var conjugations = {
  act: {
    a: '_or'
  },
  age: {
    g: 'ageing',
    pst: 'aged',
    pres: 'ages'
  },
  aim: {
    a: '_er',
    g: '_ing',
    pst: '_ed'
  },
  arise: {
    prt: '_n',
    pst: 'arose'
  },
  babysit: {
    a: '_ter',
    pst: 'babysat'
  },
  ban: {
    a: '',
    g: '_ning',
    pst: '_ned'
  },
  be: {
    a: '',
    g: 'am',
    prt: 'been',
    pst: 'was',
    pres: 'is'
  },
  beat: {
    a: '_er',
    g: '_ing',
    prt: '_en'
  },
  become: {
    prt: '_'
  },
  begin: {
    g: '_ning',
    prt: 'begun',
    pst: 'began'
  },
  being: {
    g: 'are',
    pst: 'were',
    pres: 'are'
  },
  bend: {
    prt: 'bent'
  },
  bet: {
    a: '_ter',
    prt: '_'
  },
  bind: {
    pst: 'bound'
  },
  bite: {
    g: 'biting',
    prt: 'bitten',
    pst: 'bit'
  },
  bleed: {
    prt: 'bled',
    pst: 'bled'
  },
  blow: {
    prt: '_n',
    pst: 'blew'
  },
  boil: {
    a: '_er'
  },
  brake: {
    prt: 'broken'
  },
  "break": {
    pst: 'broke'
  },
  breed: {
    pst: 'bred'
  },
  bring: {
    prt: 'brought',
    pst: 'brought'
  },
  broadcast: {
    pst: '_'
  },
  budget: {
    pst: '_ed'
  },
  build: {
    prt: 'built',
    pst: 'built'
  },
  burn: {
    prt: '_ed'
  },
  burst: {
    prt: '_'
  },
  buy: {
    prt: 'bought',
    pst: 'bought'
  },
  can: {
    a: '',
    fut: '_',
    g: '',
    pst: 'could',
    perf: 'could',
    pluperf: 'could',
    pres: '_'
  },
  "catch": {
    pst: 'caught'
  },
  choose: {
    g: 'choosing',
    prt: 'chosen',
    pst: 'chose'
  },
  cling: {
    prt: 'clung'
  },
  come: {
    prt: '_',
    pst: 'came'
  },
  compete: {
    a: 'competitor',
    g: 'competing',
    pst: '_d'
  },
  cost: {
    pst: '_'
  },
  creep: {
    prt: 'crept'
  },
  cut: {
    prt: '_'
  },
  deal: {
    prt: '_t',
    pst: '_t'
  },
  develop: {
    a: '_er',
    g: '_ing',
    pst: '_ed'
  },
  die: {
    g: 'dying',
    pst: '_d'
  },
  dig: {
    g: '_ging',
    prt: 'dug',
    pst: 'dug'
  },
  dive: {
    prt: '_d'
  },
  "do": {
    pst: 'did',
    pres: '_es'
  },
  draw: {
    prt: '_n',
    pst: 'drew'
  },
  dream: {
    prt: '_t'
  },
  drink: {
    prt: 'drunk',
    pst: 'drank'
  },
  drive: {
    g: 'driving',
    prt: '_n',
    pst: 'drove'
  },
  drop: {
    g: '_ping',
    pst: '_ped'
  },
  eat: {
    a: '_er',
    g: '_ing',
    prt: '_en',
    pst: 'ate'
  },
  edit: {
    g: '_ing'
  },
  egg: {
    pst: '_ed'
  },
  fall: {
    prt: '_en',
    pst: 'fell'
  },
  feed: {
    prt: 'fed',
    pst: 'fed'
  },
  feel: {
    a: '_er',
    pst: 'felt'
  },
  fight: {
    prt: 'fought',
    pst: 'fought'
  },
  find: {
    pst: 'found'
  },
  flee: {
    g: '_ing',
    prt: 'fled'
  },
  fling: {
    prt: 'flung'
  },
  fly: {
    prt: 'flown',
    pst: 'flew'
  },
  forbid: {
    pst: 'forbade'
  },
  forget: {
    g: '_ing',
    prt: 'forgotten',
    pst: 'forgot'
  },
  forgive: {
    g: 'forgiving',
    prt: '_n',
    pst: 'forgave'
  },
  free: {
    a: '',
    g: '_ing'
  },
  freeze: {
    g: 'freezing',
    prt: 'frozen',
    pst: 'froze'
  },
  get: {
    pst: 'got',
    prt: 'gotten'
  },
  give: {
    g: 'giving',
    prt: '_n',
    pst: 'gave'
  },
  go: {
    prt: '_ne',
    pst: 'went',
    pres: 'goes'
  },
  grow: {
    prt: '_n'
  },
  hang: {
    prt: 'hung',
    pst: 'hung'
  },
  have: {
    g: 'having',
    prt: 'had',
    pst: 'had',
    pres: 'has'
  },
  hear: {
    prt: '_d',
    pst: '_d'
  },
  hide: {
    prt: 'hidden',
    pst: 'hid'
  },
  hit: {
    prt: '_'
  },
  hold: {
    prt: 'held',
    pst: 'held'
  },
  hurt: {
    prt: '_',
    pst: '_'
  },
  ice: {
    g: 'icing',
    pst: '_d'
  },
  imply: {
    pst: 'implied',
    pres: 'implies'
  },
  is: {
    a: '',
    g: 'being',
    pst: 'was',
    pres: '_'
  },
  keep: {
    prt: 'kept'
  },
  kneel: {
    prt: 'knelt'
  },
  know: {
    prt: '_n'
  },
  lay: {
    prt: 'laid',
    pst: 'laid'
  },
  lead: {
    prt: 'led',
    pst: 'led'
  },
  leap: {
    prt: '_t'
  },
  leave: {
    prt: 'left',
    pst: 'left'
  },
  lend: {
    prt: 'lent'
  },
  lie: {
    g: 'lying',
    pst: 'lay'
  },
  light: {
    prt: 'lit',
    pst: 'lit'
  },
  log: {
    g: '_ging',
    pst: '_ged'
  },
  loose: {
    prt: 'lost'
  },
  lose: {
    g: 'losing',
    pst: 'lost'
  },
  make: {
    prt: 'made',
    pst: 'made'
  },
  mean: {
    prt: '_t',
    pst: '_t'
  },
  meet: {
    a: '_er',
    g: '_ing',
    prt: 'met',
    pst: 'met'
  },
  miss: {
    pres: '_'
  },
  pay: {
    prt: 'paid',
    pst: 'paid'
  },
  prove: {
    prt: '_n'
  },
  puke: {
    g: 'puking'
  },
  put: {
    prt: '_'
  },
  quit: {
    prt: '_'
  },
  read: {
    prt: '_',
    pst: '_'
  },
  ride: {
    prt: 'ridden'
  },
  ring: {
    prt: 'rung',
    pst: 'rang'
  },
  rise: {
    fut: 'will have _n',
    g: 'rising',
    prt: '_n',
    pst: 'rose',
    pluperf: 'had _n'
  },
  rub: {
    g: '_bing',
    pst: '_bed'
  },
  run: {
    g: '_ning',
    prt: '_',
    pst: 'ran'
  },
  say: {
    prt: 'said',
    pst: 'said',
    pres: '_s'
  },
  seat: {
    prt: 'sat'
  },
  see: {
    g: '_ing',
    prt: '_n',
    pst: 'saw'
  },
  seek: {
    prt: 'sought'
  },
  sell: {
    prt: 'sold',
    pst: 'sold'
  },
  send: {
    prt: 'sent'
  },
  set: {
    prt: '_'
  },
  sew: {
    prt: '_n'
  },
  shake: {
    prt: '_n'
  },
  shave: {
    prt: '_d'
  },
  shed: {
    g: '_ding',
    pst: '_',
    pres: '_s'
  },
  shine: {
    prt: 'shone',
    pst: 'shone'
  },
  shoot: {
    prt: 'shot',
    pst: 'shot'
  },
  show: {
    pst: '_ed'
  },
  shut: {
    prt: '_'
  },
  sing: {
    prt: 'sung',
    pst: 'sang'
  },
  sink: {
    pst: 'sank',
    pluperf: 'had sunk'
  },
  sit: {
    pst: 'sat'
  },
  ski: {
    pst: '_ied'
  },
  slay: {
    prt: 'slain'
  },
  sleep: {
    prt: 'slept'
  },
  slide: {
    prt: 'slid',
    pst: 'slid'
  },
  smash: {
    pres: '_es'
  },
  sneak: {
    prt: 'snuck'
  },
  speak: {
    fut: 'will have spoken',
    prt: 'spoken',
    pst: 'spoke',
    perf: 'have spoken',
    pluperf: 'had spoken'
  },
  speed: {
    prt: 'sped'
  },
  spend: {
    prt: 'spent'
  },
  spill: {
    prt: '_ed',
    pst: 'spilt'
  },
  spin: {
    g: '_ning',
    prt: 'spun',
    pst: 'spun'
  },
  spit: {
    prt: 'spat'
  },
  split: {
    prt: '_'
  },
  spread: {
    pst: '_'
  },
  spring: {
    prt: 'sprung'
  },
  stand: {
    pst: 'stood'
  },
  steal: {
    a: '_er',
    pst: 'stole'
  },
  stick: {
    pst: 'stuck'
  },
  sting: {
    pst: 'stung'
  },
  stink: {
    prt: 'stunk',
    pst: 'stunk'
  },
  stream: {
    a: '_er'
  },
  strew: {
    prt: '_n'
  },
  strike: {
    g: 'striking',
    pst: 'struck'
  },
  suit: {
    a: '_er',
    g: '_ing',
    pst: '_ed'
  },
  sware: {
    prt: 'sworn'
  },
  swear: {
    pst: 'swore'
  },
  sweep: {
    prt: 'swept'
  },
  swim: {
    g: '_ming',
    pst: 'swam'
  },
  swing: {
    pst: 'swung'
  },
  take: {
    fut: 'will have _n',
    pst: 'took',
    perf: 'have _n',
    pluperf: 'had _n'
  },
  teach: {
    pst: 'taught',
    pres: '_es'
  },
  tear: {
    pst: 'tore'
  },
  tell: {
    pst: 'told'
  },
  think: {
    pst: 'thought'
  },
  thrive: {
    prt: '_d'
  },
  tie: {
    g: 'tying',
    pst: '_d'
  },
  undergo: {
    prt: '_ne'
  },
  understand: {
    pst: 'understood'
  },
  upset: {
    prt: '_'
  },
  wait: {
    a: '_er',
    g: '_ing',
    pst: '_ed'
  },
  wake: {
    pst: 'woke'
  },
  wear: {
    pst: 'wore'
  },
  weave: {
    prt: 'woven'
  },
  weep: {
    prt: 'wept'
  },
  win: {
    g: '_ning',
    pst: 'won'
  },
  wind: {
    prt: 'wound'
  },
  withdraw: {
    pst: 'withdrew'
  },
  wring: {
    prt: 'wrung'
  },
  write: {
    g: 'writing',
    prt: 'written',
    pst: 'wrote'
  }
}; //uncompress our ad-hoc compression scheme

var keys = Object.keys(conjugations);

var _loop = function _loop(i) {
  var inf = keys[i];
  var _final = {};
  Object.keys(conjugations[inf]).forEach(function (key) {
    var str = conjugations[inf][key]; //swap-in infinitives for '_'

    str = str.replace('_', inf);
    var full = mapping[key];
    _final[full] = str;
  }); //over-write original

  conjugations[inf] = _final;
};

for (var i = 0; i < keys.length; i++) {
  _loop(i);
}

module.exports = conjugations;

},{}],138:[function(_dereq_,module,exports){
"use strict";

//words that can't be compressed, for whatever reason
module.exports = {
  // numbers
  '20th century fox': 'Organization',
  // '3m': 'Organization',
  '7 eleven': 'Organization',
  '7-eleven': 'Organization',
  g8: 'Organization',
  'motel 6': 'Organization',
  vh1: 'Organization',
  q1: 'Date',
  q2: 'Date',
  q3: 'Date',
  q4: 'Date'
};

},{}],139:[function(_dereq_,module,exports){
"use strict";

//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
module.exports = {
  addendum: 'addenda',
  alga: 'algae',
  alumna: 'alumnae',
  alumnus: 'alumni',
  analysis: 'analyses',
  antenna: 'antennae',
  appendix: 'appendices',
  avocado: 'avocados',
  axis: 'axes',
  bacillus: 'bacilli',
  barracks: 'barracks',
  beau: 'beaux',
  bus: 'buses',
  cactus: 'cacti',
  chateau: 'chateaux',
  child: 'children',
  circus: 'circuses',
  clothes: 'clothes',
  corpus: 'corpora',
  criterion: 'criteria',
  curriculum: 'curricula',
  database: 'databases',
  deer: 'deer',
  diagnosis: 'diagnoses',
  echo: 'echoes',
  embargo: 'embargoes',
  epoch: 'epochs',
  foot: 'feet',
  formula: 'formulae',
  fungus: 'fungi',
  genus: 'genera',
  goose: 'geese',
  halo: 'halos',
  hippopotamus: 'hippopotami',
  index: 'indices',
  larva: 'larvae',
  leaf: 'leaves',
  libretto: 'libretti',
  loaf: 'loaves',
  man: 'men',
  matrix: 'matrices',
  memorandum: 'memoranda',
  modulus: 'moduli',
  mosquito: 'mosquitoes',
  mouse: 'mice',
  move: 'moves',
  nebula: 'nebulae',
  nucleus: 'nuclei',
  octopus: 'octopi',
  opus: 'opera',
  ovum: 'ova',
  ox: 'oxen',
  parenthesis: 'parentheses',
  person: 'people',
  phenomenon: 'phenomena',
  prognosis: 'prognoses',
  quiz: 'quizzes',
  radius: 'radii',
  referendum: 'referenda',
  rodeo: 'rodeos',
  sex: 'sexes',
  shoe: 'shoes',
  sombrero: 'sombreros',
  stimulus: 'stimuli',
  stomach: 'stomachs',
  syllabus: 'syllabi',
  synopsis: 'synopses',
  tableau: 'tableaux',
  thesis: 'theses',
  thief: 'thieves',
  tooth: 'teeth',
  tornado: 'tornados',
  tuxedo: 'tuxedos',
  vertebra: 'vertebrae' // virus: 'viri',
  // zero: 'zeros',

};

},{}],140:[function(_dereq_,module,exports){
"use strict";

var nouns = _dereq_('./tags/nouns');

var verbs = _dereq_('./tags/verbs');

var values = _dereq_('./tags/values');

var misc = _dereq_('./tags/misc');

var inferTags = _dereq_('./inference/index'); //extend tagset with new tags


var addIn = function addIn(obj, tags) {
  Object.keys(obj).forEach(function (k) {
    tags[k] = obj[k];
  });
};

var build = function build() {
  var tags = {};
  addIn(nouns, tags);
  addIn(verbs, tags);
  addIn(values, tags);
  addIn(misc, tags); // do the graph-stuff

  tags = inferTags(tags);
  return tags;
};

module.exports = build();

},{"./inference/index":145,"./tags/misc":146,"./tags/nouns":147,"./tags/values":148,"./tags/verbs":149}],141:[function(_dereq_,module,exports){
"use strict";

// i just made these up
var colorMap = {
  Noun: 'blue',
  Verb: 'green',
  Negative: 'green',
  Date: 'red',
  Value: 'red',
  Adjective: 'magenta',
  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan'
};
/** add a debug color to some tags */

var addColors = function addColors(tags) {
  Object.keys(tags).forEach(function (k) {
    if (colorMap[k]) {
      tags[k].color = colorMap[k];
      return;
    }

    tags[k].isA.some(function (t) {
      if (colorMap[t]) {
        tags[k].color = colorMap[t];
        return true;
      }

      return false;
    });
  });
  return tags;
};

module.exports = addColors;

},{}],142:[function(_dereq_,module,exports){
"use strict";

var unique = function unique(arr) {
  return arr.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}; //add 'downward' tags (that immediately depend on this one)


var inferIsA = function inferIsA(tags) {
  Object.keys(tags).forEach(function (k) {
    var tag = tags[k];
    var len = tag.isA.length;

    for (var i = 0; i < len; i++) {
      var down = tag.isA[i];

      if (tags[down]) {
        tag.isA = tag.isA.concat(tags[down].isA);
      }
    } // clean it up


    tag.isA = unique(tag.isA);
  });
  return tags;
};

module.exports = inferIsA;

},{}],143:[function(_dereq_,module,exports){
"use strict";

// a lineage is all 'incoming' tags that have this as 'isA'
var inferLineage = function inferLineage(tags) {
  var keys = Object.keys(tags);
  keys.forEach(function (k) {
    var tag = tags[k];
    tag.lineage = []; // find all tags with it in their 'isA' set

    for (var i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA.indexOf(k) !== -1) {
        tag.lineage.push(keys[i]);
      }
    }
  });
  return tags;
};

module.exports = inferLineage;

},{}],144:[function(_dereq_,module,exports){
"use strict";

var unique = function unique(arr) {
  return arr.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}; // crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time


var inferNotA = function inferNotA(tags) {
  var keys = Object.keys(tags);
  keys.forEach(function (k) {
    var tag = tags[k];
    tag.notA = tag.notA || [];
    tag.isA.forEach(function (down) {
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        var notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || [];
        tag.notA = tag.notA.concat(notA);
      }
    }); // any tag that lists us as a conflict, we conflict it back.

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (tags[key].notA.indexOf(k) !== -1) {
        tag.notA.push(key);
      }
    } // clean it up


    tag.notA = unique(tag.notA);
  });
  return tags;
};

module.exports = inferNotA;

},{}],145:[function(_dereq_,module,exports){
"use strict";

var inferColor = _dereq_('./_color');

var inferIsA = _dereq_('./_isA');

var inferNotA = _dereq_('./_notA');

var lineage = _dereq_('./_lineage');

var validate = function validate(tags) {
  // cleanup format
  Object.keys(tags).forEach(function (k) {
    var tag = tags[k]; // ensure isA is an array

    tag.isA = tag.isA || [];

    if (typeof tag.isA === 'string') {
      tag.isA = [tag.isA];
    } // ensure notA is an array


    tag.notA = tag.notA || [];

    if (typeof tag.notA === 'string') {
      tag.notA = [tag.notA];
    }
  });
  return tags;
}; // build-out the tag-graph structure


var inferTags = function inferTags(tags) {
  // validate data
  tags = validate(tags); // build its 'down tags'

  tags = inferIsA(tags); // infer the conflicts

  tags = inferNotA(tags); // debug tag color

  tags = inferColor(tags); // find incoming links

  tags = lineage(tags);
  return tags;
};

module.exports = inferTags;

},{"./_color":141,"./_isA":142,"./_lineage":143,"./_notA":144}],146:[function(_dereq_,module,exports){
"use strict";

var anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value'];
module.exports = {
  //--Adjectives--
  Adjective: {
    notA: ['Noun', 'Verb', 'Adverb', 'Value']
  },
  // adjectives that can conjugate
  Comparable: {
    isA: ['Adjective']
  },
  // better
  Comparative: {
    isA: ['Adjective']
  },
  // best
  Superlative: {
    isA: ['Adjective'],
    notA: ['Comparative']
  },
  NumberRange: {
    isA: ['Contraction']
  },
  Adverb: {
    notA: ['Noun', 'Verb', 'Adjective', 'Value']
  },
  // Dates:
  //not a noun, but usually is
  Date: {
    notA: ['Verb', 'Conjunction', 'Adverb', 'Preposition', 'Adjective']
  },
  Month: {
    isA: ['Date', 'Singular'],
    notA: ['Year', 'WeekDay', 'Time']
  },
  WeekDay: {
    isA: ['Date', 'Noun']
  },
  //glue
  Determiner: {
    notA: anything
  },
  Conjunction: {
    notA: anything
  },
  Preposition: {
    notA: anything
  },
  // what, who, why
  QuestionWord: {
    notA: ['Determiner']
  },
  // peso, euro
  Currency: {},
  // ughh
  Expression: {
    notA: ['Noun', 'Adjective', 'Verb', 'Adverb']
  },
  // dr.
  Abbreviation: {},
  // internet tags
  Url: {
    notA: ['HashTag', 'PhoneNumber', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email']
  },
  PhoneNumber: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email']
  },
  HashTag: {},
  AtMention: {
    isA: ['Noun'],
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'Email']
  },
  Emoji: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  Emoticon: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  Email: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention']
  },
  //non-exclusive
  Auxiliary: {
    notA: ['Noun', 'Adjective', 'Value']
  },
  Acronym: {
    notA: ['Plural', 'RomanNumeral']
  },
  Negative: {
    notA: ['Noun', 'Adjective', 'Value']
  },
  // if, unless, were
  Condition: {
    notA: ['Verb', 'Adjective', 'Noun', 'Value']
  }
};

},{}],147:[function(_dereq_,module,exports){
"use strict";

var entity = ['Person', 'Place', 'Organization'];
module.exports = {
  Noun: {
    notA: ['Verb', 'Adjective', 'Adverb']
  },
  // - singular
  Singular: {
    isA: 'Noun',
    notA: 'Plural'
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun'
  },
  // -- people
  Person: {
    isA: ['ProperNoun', 'Singular'],
    notA: ['Place', 'Organization']
  },
  FirstName: {
    isA: 'Person'
  },
  MaleName: {
    isA: 'FirstName',
    notA: ['FemaleName', 'LastName']
  },
  FemaleName: {
    isA: 'FirstName',
    notA: ['MaleName', 'LastName']
  },
  LastName: {
    isA: 'Person',
    notA: ['FirstName']
  },
  Honorific: {
    isA: 'Noun',
    notA: ['FirstName', 'LastName']
  },
  // -- places
  Place: {
    isA: 'Singular',
    notA: ['Person', 'Organization']
  },
  Country: {
    isA: ['Place', 'ProperNoun'],
    notA: ['City']
  },
  City: {
    isA: ['Place', 'ProperNoun'],
    notA: ['Country']
  },
  Region: {
    isA: ['Place', 'ProperNoun']
  },
  Address: {
    isA: 'Place'
  },
  //---Orgs---
  Organization: {
    isA: ['Singular', 'ProperNoun'],
    notA: ['Person', 'Place']
  },
  SportsTeam: {
    isA: 'Organization'
  },
  School: {
    isA: 'Organization'
  },
  Company: {
    isA: 'Organization'
  },
  // - plural
  Plural: {
    isA: 'Noun',
    notA: ['Singular']
  },
  //(not plural or singular)
  Uncountable: {
    isA: 'Noun'
  },
  Pronoun: {
    isA: 'Noun',
    notA: entity
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
    notA: entity
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
    notA: ['Person', 'Place']
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
    notA: entity
  },
  //'Canadians'
  Demonym: {
    isA: ['Noun', 'ProperNoun'],
    notA: entity
  },
  //`john's`
  Possessive: {
    isA: 'Noun' // notA: 'Pronoun',

  }
};

},{}],148:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  Value: {
    notA: ['Verb', 'Adjective', 'Adverb']
  },
  Ordinal: {
    isA: 'Value',
    notA: ['Cardinal']
  },
  Cardinal: {
    isA: 'Value',
    notA: ['Ordinal']
  },
  RomanNumeral: {
    isA: 'Cardinal',
    //can be a person, too
    notA: ['Ordinal', 'TextValue']
  },
  TextValue: {
    isA: 'Value',
    notA: ['NumericValue']
  },
  NumericValue: {
    isA: 'Value',
    notA: ['TextValue']
  },
  Money: {
    isA: 'Cardinal'
  },
  Percent: {
    isA: 'Value'
  }
};

},{}],149:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  Verb: {
    notA: ['Noun', 'Adjective', 'Adverb', 'Value']
  },
  // walks
  PresentTense: {
    isA: 'Verb',
    notA: ['PastTense', 'Copula', 'FutureTense']
  },
  // neutral form - 'walk'
  Infinitive: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Gerund']
  },
  // walking
  Gerund: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Copula', 'FutureTense']
  },
  // walked
  PastTense: {
    isA: 'Verb',
    notA: ['FutureTense']
  },
  // will walk
  FutureTense: {
    isA: 'Verb'
  },
  // is
  Copula: {
    isA: 'Verb'
  },
  // would have
  Modal: {
    isA: 'Verb',
    notA: ['Infinitive']
  },
  // had walked
  PerfectTense: {
    isA: 'Verb',
    notA: 'Gerund'
  },
  Pluperfect: {
    isA: 'Verb'
  },
  // shown
  Participle: {
    isA: 'Verb'
  },
  // show up
  PhrasalVerb: {
    isA: 'Verb'
  },
  //'up' part
  Particle: {
    isA: 'PhrasalVerb'
  }
};

},{}],150:[function(_dereq_,module,exports){
"use strict";

module.exports = '12.0.0-rc3';

},{}],151:[function(_dereq_,module,exports){
"use strict";

var tokenize = _dereq_('./01-tokenizer');

var version = _dereq_('./_version');

var World = _dereq_('./World/World');

var Doc = _dereq_('./Doc/Doc'); //blast-out our word-lists, just once


var world = new World();
/** parse and tag text into a compromise object  */

var nlp = function nlp() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var lexicon = arguments.length > 1 ? arguments[1] : undefined;

  if (lexicon) {
    world.addWords(lexicon);
  }

  var list = tokenize.fromText(text, world);
  var doc = new Doc(list, null, world);
  doc.tagger();
  return doc;
};
/** parse text into a compromise object, without running POS-tagging */


nlp.tokenize = function () {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var lexicon = arguments.length > 1 ? arguments[1] : undefined;

  if (lexicon) {
    world.addWords(lexicon);
  }

  var list = tokenize.fromText(text, world);
  var doc = new Doc(list, null, world);
  return doc;
};
/** mix in a compromise-plugin */


nlp.extend = function (fn) {
  fn(Doc, world);
  return this;
};
/** make a deep-copy of the library state */


nlp.clone = function () {
  world = world.clone();
  return this;
};
/** re-generate a Doc object from .json() results */


nlp.load = function (json) {
  var list = tokenize.fromJSON(json, world);
  return new Doc(list, null, world);
};
/** log our decision-making for debugging */


nlp.verbose = function () {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  world.verbose(bool);
  return this;
};
/** current version of the library */


nlp.version = version; // alias

nlp["import"] = nlp.load;
module.exports = nlp;

},{"./01-tokenizer":6,"./Doc/Doc":43,"./World/World":133,"./_version":150}],152:[function(_dereq_,module,exports){
"use strict";

var fns = {
  toSuperlative: _dereq_('./toSuperlative'),
  toComparative: _dereq_('./toComparative')
};
/** conjugate an adjective into other forms */

var conjugate = function conjugate(w) {
  var res = {}; // 'greatest'

  var sup = fns.toSuperlative(w);

  if (sup) {
    res.Superlative = sup;
  } // 'greater'


  var comp = fns.toComparative(w);

  if (comp) {
    res.Comparative = comp;
  }

  return res;
};

module.exports = conjugate;

},{"./toComparative":153,"./toSuperlative":154}],153:[function(_dereq_,module,exports){
"use strict";

//turn 'quick' into 'quickly'
var do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/];
var dont_rules = [/ary$/, /ous$/];
var irregulars = {
  grey: 'greyer',
  gray: 'grayer',
  green: 'greener',
  yellow: 'yellower',
  red: 'redder',
  good: 'better',
  well: 'better',
  bad: 'worse',
  sad: 'sadder',
  big: 'bigger'
};
var transforms = [{
  reg: /y$/i,
  repl: 'ier'
}, {
  reg: /([aeiou])t$/i,
  repl: '$1tter'
}, {
  reg: /([aeou])de$/i,
  repl: '$1der'
}, {
  reg: /nge$/i,
  repl: 'nger'
}];

var to_comparative = function to_comparative(str) {
  //known-irregulars
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //known-transforms


  for (var i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str) === true) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  } //dont-patterns


  for (var _i = 0; _i < dont_rules.length; _i++) {
    if (dont_rules[_i].test(str) === true) {
      return null;
    }
  } //do-patterns


  for (var _i2 = 0; _i2 < do_rules.length; _i2++) {
    if (do_rules[_i2].test(str) === true) {
      return str + 'er';
    }
  } //easy-one


  if (/e$/.test(str) === true) {
    return str + 'r';
  }

  return str + 'er';
};

module.exports = to_comparative;

},{}],154:[function(_dereq_,module,exports){
"use strict";

//turn 'quick' into 'quickest'
var do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
var dont_rules = [/ary$/];
var irregulars = {
  nice: 'nicest',
  late: 'latest',
  hard: 'hardest',
  inner: 'innermost',
  outer: 'outermost',
  far: 'furthest',
  worse: 'worst',
  bad: 'worst',
  good: 'best',
  big: 'biggest',
  large: 'largest'
};
var transforms = [{
  reg: /y$/i,
  repl: 'iest'
}, {
  reg: /([aeiou])t$/i,
  repl: '$1ttest'
}, {
  reg: /([aeou])de$/i,
  repl: '$1dest'
}, {
  reg: /nge$/i,
  repl: 'ngest'
}, {
  reg: /([aeiou])te$/i,
  repl: '$1test'
}];

var to_superlative = function to_superlative(str) {
  //irregulars
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //known transforms


  for (var i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  } //dont-rules


  for (var _i = 0; _i < dont_rules.length; _i++) {
    if (dont_rules[_i].test(str) === true) {
      return null;
    }
  } //do-rules


  for (var _i2 = 0; _i2 < do_rules.length; _i2++) {
    if (do_rules[_i2].test(str) === true) {
      if (str.charAt(str.length - 1) === 'e') {
        return str + 'st';
      }

      return str + 'est';
    }
  }

  return str + 'est';
};

module.exports = to_superlative;

},{}],155:[function(_dereq_,module,exports){
"use strict";

var suffixes = _dereq_('./suffixes');

var posMap = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor'
};

var doTransform = function doTransform(str, obj) {
  var found = {};
  var keys = Object.keys(obj.repl);

  for (var i = 0; i < keys.length; i += 1) {
    var pos = keys[i];
    found[posMap[pos]] = str.replace(obj.reg, obj.repl[pos]);
  }

  return found;
}; //look at the end of the word for clues


var checkSuffix = function checkSuffix() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var c = str[str.length - 1];

  if (suffixes.hasOwnProperty(c) === true) {
    for (var r = 0; r < suffixes[c].length; r += 1) {
      var reg = suffixes[c][r].reg;

      if (reg.test(str) === true) {
        return doTransform(str, suffixes[c][r]);
      }
    }
  }

  return {};
};

module.exports = checkSuffix;

},{"./suffixes":158}],156:[function(_dereq_,module,exports){
"use strict";

//non-specifc, 'hail-mary' transforms from infinitive, into other forms
var hasY = /[bcdfghjklmnpqrstvwxz]y$/;
var generic = {
  Gerund: function Gerund(inf) {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf.replace(/e$/, 'ing');
    }

    return inf + 'ing';
  },
  PresentTense: function PresentTense(inf) {
    if (inf.charAt(inf.length - 1) === 's') {
      return inf + 'es';
    }

    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ies';
    }

    return inf + 's';
  },
  PastTense: function PastTense(inf) {
    if (inf.charAt(inf.length - 1) === 'e') {
      return inf + 'd';
    }

    if (inf.substr(-2) === 'ed') {
      return inf;
    }

    if (hasY.test(inf) === true) {
      return inf.slice(0, -1) + 'ied';
    }

    return inf + 'ed';
  }
};
module.exports = generic;

},{}],157:[function(_dereq_,module,exports){
"use strict";

var checkSuffix = _dereq_('./01-suffixes');

var genericFill = _dereq_('./02-generic'); //we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive


var conjugate = function conjugate() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var found = {}; // 1. look at irregulars
  //the lexicon doesn't pass this in

  if (world && world.irregulars) {
    if (world.irregulars.verbs.hasOwnProperty(str) === true) {
      found = Object.assign({}, world.irregulars.verbs[str]);
    }
  } //2. rule-based regex


  found = Object.assign({}, checkSuffix(str), found); //3. generic transformations
  //'buzzing'

  if (found.Gerund === undefined) {
    found.Gerund = genericFill.Gerund(str);
  } //'buzzed'


  if (found.PastTense === undefined) {
    found.PastTense = genericFill.PastTense(str);
  } //'buzzes'


  if (found.PresentTense === undefined) {
    found.PresentTense = genericFill.PresentTense(str);
  }

  return found;
};

module.exports = conjugate;

},{"./01-suffixes":155,"./02-generic":156}],158:[function(_dereq_,module,exports){
"use strict";

var endsWith = {
  b: [{
    reg: /([^aeiou][aeiou])b$/i,
    repl: {
      pr: '$1bs',
      pa: '$1bbed',
      gr: '$1bbing'
    }
  }],
  d: [{
    reg: /(end)$/i,
    repl: {
      pr: '$1s',
      pa: 'ent',
      gr: '$1ing',
      ar: '$1er'
    }
  }, {
    reg: /(eed)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing',
      ar: '$1er'
    }
  }, {
    reg: /(ed)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ded',
      ar: '$1der',
      gr: '$1ding'
    }
  }, {
    reg: /([^aeiou][ou])d$/i,
    repl: {
      pr: '$1ds',
      pa: '$1dded',
      gr: '$1dding'
    }
  }],
  e: [{
    reg: /(eave)$/i,
    repl: {
      pr: '$1s',
      pa: '$1d',
      gr: 'eaving',
      ar: '$1r'
    }
  }, {
    reg: /(ide)$/i,
    repl: {
      pr: '$1s',
      pa: 'ode',
      gr: 'iding',
      ar: 'ider'
    }
  }, {
    reg: /(ake)$/i,
    repl: {
      pr: '$1s',
      pa: 'ook',
      gr: 'aking',
      ar: '$1r'
    }
  }, {
    reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing',
      prt: '$1en'
    }
  }, {
    reg: /([bd]l)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(om)e$/i,
    repl: {
      pr: '$1es',
      pa: 'ame',
      gr: '$1ing'
    }
  }],
  g: [{
    reg: /([^aeiou][ou])g$/i,
    repl: {
      pr: '$1gs',
      pa: '$1gged',
      gr: '$1gging'
    }
  }],
  h: [{
    reg: /(..)([cs]h)$/i,
    repl: {
      pr: '$1$2es',
      pa: '$1$2ed',
      gr: '$1$2ing'
    }
  }],
  k: [{
    reg: /(ink)$/i,
    repl: {
      pr: '$1s',
      pa: 'unk',
      gr: '$1ing',
      ar: '$1er'
    }
  }],
  m: [{
    reg: /([^aeiou][aeiou])m$/i,
    repl: {
      pr: '$1ms',
      pa: '$1mmed',
      gr: '$1mming'
    }
  }],
  n: [{
    reg: /(en)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }],
  p: [{
    reg: /(e)(ep)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1pt',
      gr: '$1$2ing',
      ar: '$1$2er'
    }
  }, {
    reg: /([^aeiou][aeiou])p$/i,
    repl: {
      pr: '$1ps',
      pa: '$1pped',
      gr: '$1pping'
    }
  }, {
    reg: /([aeiu])p$/i,
    repl: {
      pr: '$1ps',
      pa: '$1p',
      gr: '$1pping'
    }
  }],
  r: [{
    reg: /([td]er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }],
  s: [{
    reg: /(ish|tch|ess)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }],
  t: [{
    reg: /(ion|end|e[nc]t)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(.eat)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /([aeiu])t$/i,
    repl: {
      pr: '$1ts',
      pa: '$1t',
      gr: '$1tting'
    }
  }, {
    reg: /([^aeiou][aeiou])t$/i,
    repl: {
      pr: '$1ts',
      pa: '$1tted',
      gr: '$1tting'
    }
  }],
  w: [{
    reg: /(..)(ow)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1ew',
      gr: '$1$2ing',
      prt: '$1$2n'
    }
  }],
  y: [{
    reg: /([i|f|rr])y$/i,
    repl: {
      pr: '$1ies',
      pa: '$1ied',
      gr: '$1ying'
    }
  }],
  z: [{
    reg: /([aeiou]zz)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }]
};
module.exports = endsWith;

},{}],159:[function(_dereq_,module,exports){
"use strict";

var guessVerb = {
  Gerund: ['ing'],
  Actor: ['erer'],
  Infinitive: ['ate', 'ize', 'tion', 'rify', 'then', 'ress', 'ify', 'age', 'nce', 'ect', 'ise', 'ine', 'ish', 'ace', 'ash', 'ure', 'tch', 'end', 'ack', 'and', 'ute', 'ade', 'ock', 'ite', 'ase', 'ose', 'use', 'ive', 'int', 'nge', 'lay', 'est', 'ain', 'ant', 'ent', 'eed', 'er', 'le', 'own', 'unk', 'ung', 'en'],
  PastTense: ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  PresentTense: ['rks', 'cks', 'nks', 'ngs', 'mps', 'tes', 'zes', 'ers', 'les', 'acks', 'ends', 'ands', 'ocks', 'lays', 'eads', 'lls', 'els', 'ils', 'ows', 'nds', 'ays', 'ams', 'ars', 'ops', 'ffs', 'als', 'urs', 'lds', 'ews', 'ips', 'es', 'ts', 'ns']
}; //flip it into a lookup object

guessVerb = Object.keys(guessVerb).reduce(function (h, k) {
  guessVerb[k].forEach(function (a) {
    return h[a] = k;
  });
  return h;
}, {});
module.exports = guessVerb;

},{}],160:[function(_dereq_,module,exports){
"use strict";

//rules for turning a verb into infinitive form
var rules = {
  Participle: [{
    reg: /own$/i,
    to: 'ow'
  }, {
    reg: /(.)un([g|k])$/i,
    to: '$1in$2'
  }],
  Actor: [{
    reg: /(er)er$/i,
    to: '$1'
  }],
  PresentTense: [{
    reg: /(..)(ies)$/i,
    to: '$1y'
  }, {
    reg: /(tch|sh)es$/i,
    to: '$1'
  }, {
    reg: /(ss|zz)es$/i,
    to: '$1'
  }, {
    reg: /([tzlshicgrvdnkmu])es$/i,
    to: '$1e'
  }, {
    reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
    to: '$1'
  }, {
    reg: /(ow)s$/i,
    to: '$1'
  }, {
    reg: /(op)s$/i,
    to: '$1'
  }, {
    reg: /([eirs])ts$/i,
    to: '$1t'
  }, {
    reg: /(ll)s$/i,
    to: '$1'
  }, {
    reg: /(el)s$/i,
    to: '$1'
  }, {
    reg: /(ip)es$/i,
    to: '$1e'
  }, {
    reg: /ss$/i,
    to: 'ss'
  }, {
    reg: /s$/i,
    to: ''
  }],
  Gerund: [{
    reg: /pping$/i,
    to: 'p'
  }, {
    reg: /lling$/i,
    to: 'll'
  }, {
    reg: /tting$/i,
    to: 't'
  }, {
    reg: /dding$/i,
    to: 'd'
  }, {
    reg: /ssing$/i,
    to: 'ss'
  }, {
    reg: /(..)gging$/i,
    to: '$1g'
  }, {
    reg: /([^aeiou])ying$/i,
    to: '$1y'
  }, {
    reg: /([^ae]i.)ing$/i,
    to: '$1e'
  }, {
    reg: /(ea.)ing$/i,
    to: '$1'
  }, {
    reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
    to: '$1e'
  }, {
    reg: /(ch|sh)ing$/i,
    to: '$1'
  }, {
    reg: /(..)ing$/i,
    to: '$1'
  }],
  PastTense: [{
    reg: /(ued)$/i,
    to: 'ue'
  }, {
    reg: /a([^aeiouy])ed$/i,
    to: 'a$1e'
  }, {
    reg: /([aeiou]zz)ed$/i,
    to: '$1'
  }, {
    reg: /(e|i)lled$/i,
    to: '$1ll'
  }, {
    reg: /(.)(sh|ch)ed$/i,
    to: '$1$2'
  }, {
    reg: /(tl|gl)ed$/i,
    to: '$1e'
  }, {
    reg: /(um?pt?)ed$/i,
    to: '$1'
  }, {
    reg: /(ss)ed$/i,
    to: '$1'
  }, {
    reg: /pped$/i,
    to: 'p'
  }, {
    reg: /tted$/i,
    to: 't'
  }, {
    reg: /(..)gged$/i,
    to: '$1g'
  }, {
    reg: /(..)lked$/i,
    to: '$1lk'
  }, {
    reg: /([^aeiouy][aeiou])ked$/i,
    to: '$1ke'
  }, {
    reg: /(.[aeiou])led$/i,
    to: '$1l'
  }, {
    reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
    to: '$1$2'
  }, {
    reg: /(.ut)ed$/i,
    to: '$1e'
  }, {
    reg: /(.pt)ed$/i,
    to: '$1'
  }, {
    reg: /(us)ed$/i,
    to: '$1e'
  }, {
    reg: /(..[^aeiouy])ed$/i,
    to: '$1e'
  }, {
    reg: /(..)ied$/i,
    to: '$1y'
  }, {
    reg: /(.o)ed$/i,
    to: '$1o'
  }, {
    reg: /(..i)ed$/i,
    to: '$1'
  }, {
    reg: /(.a[^aeiou])ed$/i,
    to: '$1'
  }, {
    reg: /([rl])ew$/i,
    to: '$1ow'
  }, {
    reg: /([pl])t$/i,
    to: '$1t'
  }]
};
module.exports = rules;

},{}],161:[function(_dereq_,module,exports){
"use strict";

var rules = _dereq_('./_transform');

var guess = _dereq_('./_guess');
/** it helps to know what we're conjugating from */


var guessTense = function guessTense(str) {
  var three = str.substr(str.length - 3);

  if (guess.hasOwnProperty(three) === true) {
    return guess[three];
  }

  var two = str.substr(str.length - 2);

  if (guess.hasOwnProperty(two) === true) {
    return guess[two];
  }

  var one = str.substr(str.length - 1);

  if (one === 's') {
    return 'PresentTense';
  }

  return null;
};

var toInfinitive = function toInfinitive(str, world, tense) {
  if (!str) {
    return '';
  } //1. look at known irregulars


  if (world.words.hasOwnProperty(str) === true) {
    var irregs = world.irregulars.verbs;
    var keys = Object.keys(irregs);

    for (var i = 0; i < keys.length; i++) {
      var forms = Object.keys(irregs[keys[i]]);

      for (var o = 0; o < forms.length; o++) {
        if (str === irregs[keys[i]][forms[o]]) {
          return keys[i];
        }
      }
    }
  } // give'r!


  tense = tense || guessTense(str);

  if (tense && rules[tense]) {
    for (var _i = 0; _i < rules[tense].length; _i++) {
      var rule = rules[tense][_i];

      if (rule.reg.test(str) === true) {
        return str.replace(rule.reg, rule.to);
      }
    }
  }

  return str;
};

module.exports = toInfinitive;

},{"./_guess":159,"./_transform":160}],162:[function(_dereq_,module,exports){
"use strict";

/** patterns for turning 'bus' to 'buses'*/
var suffixes = {
  a: [[/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'], [/([ti])a$/i, '$1a']],
  e: [[/(kn|l|w)ife$/i, '$1ives'], [/(hive)$/i, '$1s'], [/([m|l])ouse$/i, '$1ice'], [/([m|l])ice$/i, '$1ice']],
  f: [[/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves']],
  i: [[/(octop|vir)i$/i, '$1i']],
  m: [[/([ti])um$/i, '$1a']],
  n: [[/^(oxen)$/i, '$1']],
  o: [[/(al|ad|at|er|et|ed|ad)o$/i, '$1oes']],
  s: [[/(ax|test)is$/i, '$1es'], [/(alias|status)$/i, '$1es'], [/sis$/i, 'ses'], [/(bu)s$/i, '$1ses'], [/(sis)$/i, 'ses'], [/^(?!talis|.*hu)(.*)man$/i, '$1men'], [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i']],
  x: [[/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'], [/^(ox)$/i, '$1en']],
  y: [[/([^aeiouy]|qu)y$/i, '$1ies']],
  z: [[/(quiz)$/i, '$1zes']]
};
module.exports = suffixes;

},{}],163:[function(_dereq_,module,exports){
"use strict";

var rules = _dereq_('./_rules');

var addE = /(x|ch|sh|s|z)$/;

var trySuffix = function trySuffix(str) {
  var c = str[str.length - 1];

  if (rules.hasOwnProperty(c) === true) {
    for (var i = 0; i < rules[c].length; i += 1) {
      var reg = rules[c][i][0];

      if (reg.test(str) === true) {
        return str.replace(reg, rules[c][i][1]);
      }
    }
  }

  return null;
};
/** Turn a singular noun into a plural
 * assume the given string is singular
 */


var pluralize = function pluralize() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var world = arguments.length > 1 ? arguments[1] : undefined;
  var irregulars = world.irregulars.nouns; // check irregulars list

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  } //we have some rules to try-out


  var plural = trySuffix(str);

  if (plural !== null) {
    return plural;
  } //like 'church'


  if (addE.test(str)) {
    return str + 'es';
  } // ¯\_(ツ)_/¯


  return str + 's';
};

module.exports = pluralize;

},{"./_rules":162}],164:[function(_dereq_,module,exports){
"use strict";

//patterns for turning 'dwarves' to 'dwarf'
module.exports = [[/([^v])ies$/i, '$1y'], [/ises$/i, 'isis'], [/(kn|[^o]l|w)ives$/i, '$1ife'], [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'], [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'], [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'], [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'], [/(buffal|tomat|tornad)(oes)$/i, '$1o'], // [/(analy|diagno|parenthe|progno|synop|the)ses$/i, '$1sis'],
[/(..[aeiou]s)es$/i, '$1'], [/(vert|ind|cort)(ices)$/i, '$1ex'], [/(matr|append)(ices)$/i, '$1ix'], [/(x|ch|ss|sh|z|o)es$/i, '$1'], [/men$/i, 'man'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/([m|l])ice$/i, '$1ouse'], [/(cris|ax|test)es$/i, '$1is'], [/(alias|status)es$/i, '$1'], [/(ss)$/i, '$1'], [/(ics)$/i, '$1'], [/s$/i, '']];

},{}],165:[function(_dereq_,module,exports){
"use strict";

var rules = _dereq_('./_rules');

var invertObj = function invertObj(obj) {
  return Object.keys(obj).reduce(function (h, k) {
    h[obj[k]] = k;
    return h;
  }, {});
};

var toSingular = function toSingular(str, world) {
  var irregulars = world.irregulars.nouns;
  var invert = invertObj(irregulars); // check irregulars list

  if (invert.hasOwnProperty(str)) {
    return invert[str];
  } // go through our regexes


  for (var i = 0; i < rules.length; i++) {
    if (rules[i][0].test(str) === true) {
      str = str.replace(rules[i][0], rules[i][1]);
      return str;
    }
  }

  return str;
};

module.exports = toSingular;

},{"./_rules":164}],166:[function(_dereq_,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"./inference/index":171,"./tags/misc":172,"./tags/nouns":173,"./tags/values":174,"./tags/verbs":175,"dup":140}],167:[function(_dereq_,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"dup":141}],168:[function(_dereq_,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"dup":142}],169:[function(_dereq_,module,exports){
arguments[4][143][0].apply(exports,arguments)
},{"dup":143}],170:[function(_dereq_,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144}],171:[function(_dereq_,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"./_color":167,"./_isA":168,"./_lineage":169,"./_notA":170,"dup":145}],172:[function(_dereq_,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"dup":146}],173:[function(_dereq_,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"dup":147}],174:[function(_dereq_,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"dup":148}],175:[function(_dereq_,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],176:[function(_dereq_,module,exports){
"use strict";

var somehow = _dereq_('somehow');

var w = somehow(); // react - 144K

w.bar().set([[1, 0], [1, 144]]).width(5).opacity(1).color('lightblue');
w.text(['react', '140kb']).set([[1, 144 + 50]]).center().size(2).color('grey'); // angular - 566K

w.bar().set([[2, 0], [2, 566]]).width(5).color('lightblue');
w.text(['angular', '560kb']).set([[2, 566 + 50]]).center().size(2).color('grey'); // compromise - 170kb

w.bar().set([[3, 0], [3, 170]]).width(5).color('rose');
w.text(['compromise', '170k']).set([[3, 170 + 50]]).center().size(2).color('rose'); // jquery - 84

w.bar().set([[4, 0], [4, 84]]).width(5).color('lightblue');
w.text(['jquery v2', '84kb']).set([[4, 84 + 50]]).center().size(2).color('grey'); // d3 - 230kb

w.bar().set([[5, 0], [5, 230]]).width(5).color('lightblue');
w.text(['d3 v3', '230kb']).set([[5, 230 + 50]]).center().size(2).color('grey'); // ember - 435

w.bar().set([[6, 0], [6, 435]]).width(5).color('lightblue');
w.text(['ember', '435kb']).set([[6, 435 + 50]]).center().size(2).color('grey');
w.x.fit(1, 6.5);
w.y.fit(-10, 800);
w.yAxis.label('kb'); // w.xAxis.remove()

w.xAxis.ticks([]);
w.yAxis.remove();
w.title('Filesizes (minified)');
document.querySelector('#size-chart').innerHTML = w.build();

},{"somehow":200}],177:[function(_dereq_,module,exports){
"use strict";

var somehow = _dereq_('somehow');

var w = somehow(); // 6ms

w.line().set([[-5, 1], [6, 1]]).color('rose');
w.text('One sentence - 6ms').set([[0, 0.6]]).size(2).color('rose'); // sublime-editor 12ms  - https://pavelfatin.com/typing-with-pleasure/

w.line().set([[0, 2], [12, 2]]).color('lightblue');
w.text('Typing latency - 12ms').set([[3, 1.6]]).size(2).color('lightblue'); // 60hz - 16ms

w.line().set([[0, 3], [16, 3]]).color('lightblue');
w.text('60hz refresh rate - 16ms').set([[8, 2.6]]).size(2).color('lightblue'); // packet around the world - 190ms

w.line().set([[0, 4], [190, 4]]).color('lightblue');
w.text('One packet around world - 190ms').set([[90, 3.5]]).size(2).color('lightblue'); // human blink - 300ms

w.line().set([[0, 5], [300, 5]]).color('lightblue');
w.text('human blink - 300ms').set([[200, 4.5]]).size(2).color('lightblue');
w.line().set([[0, 6], [400, 6]]).color('rose');
w.text('Wikipedia article - 400ms').set([[300, 5.5]]).size(2).color('rose'); //

w.line().set([[0, 7], [500, 7]]).color('lightblue');
w.text('one beat of a song - 500ms').set([[350, 6.6]]).size(2).color('lightblue');
w.fit();
w.xAxis.label('ms latency');
w.y.fit(7, 0);
w.yAxis.remove(); // w.title('Comparisons of Latency')

document.querySelector('#speed-chart').innerHTML = w.build();

},{"somehow":200}],178:[function(_dereq_,module,exports){
"use strict";

var somehow = _dereq_('somehow'); // const somehow = require('/Users/spencer/mountain/somehow/src')
//https://www.britannica.com/topic/Zipfs-law


var zipf = function zipf(r) {
  return 0.1 / r;
}; // let points = [[0, 0], [1, 10], [100, 50], [300, 65], [600, 70], [1150, 80]]


var max = 16000;
var w = somehow();
var all = [[0, 0]];
var carry = 0;

for (var i = 1; i < max; i += 1) {
  var percent = zipf(i);
  carry += percent;

  if (carry > 1) {
    carry = 1;
  }

  all.push([i, parseInt(carry * 100, 10)]);
} // sample some of them


var points = [all[0], all[1], all[100], all[300], all[600], all[1150]];

for (var _i = 1600; _i < max; _i += 400) {
  points.push(all[_i]);
} // console.log(all[9999])


w.line().set(points).soft(); // top

w.line().set([[0, 100], [max, 100]]).color('lightgrey').dotted().width(0.5); // 1k

w.line().set([[1000, 0], [1000, 100]]).color('lightgrey').dotted().width(0.5);
w.text(['80%', 'coverage', '(1k words)']).set([[1450, 50]]).center().color('lightgrey').size(1.8); // 5k

w.line().set([[5000, 0], [5000, 100]]).color('lightgrey').dotted().width(0.5);
w.text(['90%', '(5k words)']).set([[5600, 40]]).center().color('lightgrey').size(1.8); // 14k

w.line().set([[14000, 0], [14000, 100]]).color('lightgrey').dotted().width(0.5);
w.text(['  compromise', 'lexicon', '(14k', 'words)']).set([[14700, 55]]).center().color('lightgrey').size(1.8);
w.title('Vocabulary Size');
w.xAxis.label('# of words →'); // w.yAxis.label('coverage')
// w.yAxis.label('coverage')

w.yAxis.suffix('%');
w.fit();
w.y.fit(0, 100);
document.querySelector('#zipf-chart').innerHTML = w.build();

},{"somehow":200}],179:[function(_dereq_,module,exports){
"use strict";

_dereq_('./graphs/zipf');

_dereq_('./graphs/speed');

_dereq_('./graphs/size');

_dereq_('./interaction/sotu');

_dereq_('./interaction/tagDemo');

},{"./graphs/size":176,"./graphs/speed":177,"./graphs/zipf":178,"./interaction/sotu":181,"./interaction/tagDemo":182}],180:[function(_dereq_,module,exports){
"use strict";

var chooseTag = function chooseTag(t) {
  var colors = [['Person', '#6393b9'], ['Pronoun', '#81acce'], ['Plural', 'steelblue'], ['Singular', 'lightsteelblue'], ['Verb', 'palevioletred'], ['Adverb', '#f39c73'], ['Adjective', '#b3d3c6'], ['Determiner', '#d3c0b3'], ['Preposition', '#9794a8'], ['Conjunction', '#c8c9cf'], ['Value', 'palegoldenrod'], ['QuestionWord', 'lavender'], ['Acronym', 'violet'], ['Possessive', '#7990d6'], ['Noun', '#7990d6'], ['Expression', '#b3d3c6'], ['Negative', '#b4adad']];
  var found = colors.find(function (a) {
    return a[0] === t.bestTag;
  });

  if (found) {
    return found;
  }

  return [t.bestTag || ' ', 'dimgrey'];
};

module.exports = chooseTag;

},{}],181:[function(_dereq_,module,exports){
"use strict";

var superagent = _dereq_('superagent');

var nlp = _dereq_('/Users/spencer/mountain/compromise/src');

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var h = htm.bind(vhtml);
var titles = {
  Reagan_1988: '1988 (reagan)',
  Bush_1989: '1989 (bush)',
  Bush_1990: '1990 (bush)',
  Bush_1991: '1991 (bush)',
  Bush_1992: '1992 (bush)',
  Clinton_1993: '1993 (clinton)',
  Clinton_1994: '1994 (clinton)' // Clinton_1995: '1995 (clinton)'
  // Clinton_1996: '1996 (clinton)',
  // Clinton_1997: '1997 (clinton)',
  // Clinton_1998: '1998 (clinton)',
  // Clinton_1999: '1999 (clinton)',
  // Clinton_2000: '2000 (clinton)',
  // Bush_2001: '2001 (bush)',
  // Bush_2002: '2002 (bush)',
  // Bush_2003: '2003 (bush)',
  // Bush_2004: '2004 (bush)',
  // Bush_2005: '2005 (bush)',
  // Bush_2006: '2006 (bush)',
  // Bush_2007: '2007 (bush)',
  // Bush_2008: '2008 (bush)',
  // Obama_2009: '2009 (obama)',
  // Obama_2010: '2010 (obama)',
  // Obama_2011: '2011 (obama)',
  // Obama_2012: '2012 (obama)',
  // Obama_2013: '2013 (obama)',
  // Obama_2014: '2014 (obama)',
  // Obama_2015: '2015 (obama)'

}; // fetch suto texts

setTimeout(function () {
  superagent.get('./assets/sotu.json').then(function (res) {
    var size = res.header['content-length'] / 1000;
    size = parseInt(size, 10);
    document.getElementById('filesize').innerHTML = '<b>' + size + 'kb</b>';
    window.sotu = res.body;
    document.getElementById('run-button').disabled = false;
  });
}, 500);
var run = document.getElementById('run-button');
var results = document.getElementById('results');

var appendRow = function appendRow(name, words, duration, people, msPerSentence) {
  var tableRef = results.getElementsByTagName('tbody')[0]; // Insert a row in the table at the last row

  var newRow = tableRef.insertRow();
  var nameNode = document.createTextNode(name);
  newRow.insertCell(0).appendChild(nameNode);

  if (!duration) {
    return;
  }

  var timeNode = document.createTextNode(duration.toLocaleString() + 'ms');
  newRow.insertCell(1).appendChild(timeNode);
  var wordNode = document.createTextNode(words.toLocaleString() + ' words');
  window.wordNode = wordNode;
  newRow.insertCell(2).appendChild(wordNode);
  var personNode = document.createTextNode(people.toLocaleString() + ' people');
  newRow.insertCell(3).appendChild(personNode);
  var msNode = document.createTextNode(msPerSentence.toLocaleString() + 'ms/sentence');
  newRow.insertCell(4).appendChild(msNode);
};

run.onclick = function () {
  var i = 0;
  var keys = Object.keys(titles);

  var doit = function doit() {
    var k = keys[i];
    var name = titles[k];
    var str = window.sotu[k];
    var start = Date.now();
    var doc = nlp(str);
    var duration = Date.now() - start;
    var words = doc.wordCount();
    var people = doc.clauses().match('#Person+').length;
    var msPerSentence = Math.floor(duration / doc.length);
    appendRow(name, words, duration, people, msPerSentence);
    i += 1;

    if (keys[i]) {
      setTimeout(doit, 1);
    } else {
      appendRow('---', null);
    }
  };

  doit();
};

},{"/Users/spencer/mountain/compromise/src":151,"htm":187,"superagent":228,"vhtml":233}],182:[function(_dereq_,module,exports){
"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"m1 \">\n      <div style=", ">", "</div>\n      <div style=", ">", "</div>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var nlp = _dereq_('/Users/spencer/mountain/compromise/builds/compromise.min.js'); //TODO:fixme


var getColor = _dereq_('./_getColor');

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var h = htm.bind(vhtml);
var input = document.querySelector('#tag-demo');
var result = document.querySelector('#tag-result');

var showTags = function showTags() {
  var doc = nlp(input.value);
  var terms = doc.join().json({
    terms: {
      clean: true,
      bestTag: true
    }
  })[0].terms;
  terms = terms.map(function (t) {
    var tag = getColor(t);
    var style = "border-bottom: 4px solid ".concat(tag[1], ";  color:#b4adad; text-align:center; font-family:Inconsolata; font-size:27px;");
    var tagStyle = "font-size:10px; text-align:right; margin-top:3px; color: ".concat(tag[1], ";");
    return h(_templateObject(), style, t.text, tagStyle, tag[0]);
  });
  result.innerHTML = h(_templateObject2(), terms.join(''));
}; // listen for keypress event


if (input.addEventListener) {
  input.addEventListener('input', showTags, false);
} else if (input.attachEvent) {
  input.attachEvent('onpropertychange', showTags);
} // init


showTags();
console.log('compromise@' + nlp.version);

},{"./_getColor":180,"/Users/spencer/mountain/compromise/builds/compromise.min.js":1,"htm":187,"vhtml":233}],183:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],184:[function(_dereq_,module,exports){
// https://d3js.org/d3-path/ Version 1.0.5. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

exports.path = path;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],185:[function(_dereq_,module,exports){
module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []
var replacerStack = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer)
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer)
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]
function replaceGetterValues (replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = '[Circular]'
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

},{}],186:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).fitAspect=e()}}(function(){return function a(o,s,d){function c(t,e){if(!s[t]){if(!o[t]){var i="function"==typeof _dereq_&&_dereq_;if(!e&&i)return i(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=s[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,a,o,s,d)}return s[t].exports}for(var l="function"==typeof _dereq_&&_dereq_,e=0;e<d.length;e++)c(d[e]);return c}({1:[function(e,t,i){"use strict";var n=[{names:["square","1:1","instagram"],description:"Square",decimal:1,orientation:"landscape"},{names:["4:3","fullscreen","four three","1.33:1","ipad","pythagorean"],description:"Traditional TVs",decimal:1.333333,orientation:"landscape"},{names:["a4","√2:1","paper","lichtenberg","1:1.41"],description:"A4 paper",decimal:1.41},{names:["imax","1.43:1"],description:"IMAX film",decimal:1.43,orientation:"landscape"},{names:["3:2","35mm","photo","1.5:1","1.5"],description:"35mm photos",decimal:1.5,orientation:"landscape"},{names:["business card","bank card","1.58:1"],description:"Bank Cards",decimal:1.58577,orientation:"landscape"},{names:["golden","kepler","1.618","1.6:1"],description:"Golden ratio",decimal:1.61803,orientation:"landscape"},{names:["16:9","hd","hdtv","fhd","tv","computer","iphone","4k","8k","1.78:1"],description:"HD video",decimal:1.77777,orientation:"landscape"},{names:["widescreen","1.85:1"],description:"Movie-theatres",decimal:1.85,orientation:"landscape"},{names:["2:1","univisium","mobile","18:9"],description:"2:1",decimal:2,orientation:"landscape"},{names:["cinemascope","widescreen","wide","2.35:1","2.39:1"],description:"Widescreen",decimal:2.35,orientation:"landscape"},{names:["silver","1 + √2","2.41:1"],description:"Silver ratio",decimal:2.41,orientation:"landscape"}],r=n.map(function(e){return(e=Object.assign({},e)).decimal=1/e.decimal,e.orientation="portrait",e}),a={};n.forEach(function(t){t.names.forEach(function(e){a[e]=t})}),t.exports={lookup:a,portraits:r,list:n}},{}],2:[function(e,t,i){"use strict";var n=e("./aspects");t.exports=function(e,t){var i=e/t;return(i=parseInt(100*i,10)/100)<1?function(e,t){for(var i=0;i<t.length;i+=1)if(e>t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.portraits):function(e,t){for(var i=0;i<t.length;i+=1)if(e<=t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.list)}},{"./aspects":1}],3:[function(e,t,i){"use strict";var n=function(e,t){var i=1/t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.width*i;return r=Math.round(r),{closest:t,width:e.width,height:r,orientation:n,original:e}},r=function(e,t){var i=t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.height*i;return{closest:t,width:r=Math.round(r),height:e.height,orientation:n,original:e}};t.exports={both:function(e,t){var i=r(e,t);return i.width>e.width?n(e,t):i},width:r,height:n}},{}],4:[function(i,n,e){(function(e){"use strict";var o=i("./find-best-ratio"),s=i("./parse-ratio"),d=i("./fit"),t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!e.aspect&&!e.ratio){var t=o(e.width,e.height),i=1/t.decimal,n=e.width*i,r=(n-e.height)/e.height;return r=parseInt(1e3*r,10)/10,n=Math.round(n),{closest:t,percent_change:r,width:e.width,height:n}}var a=s(e.aspect||e.ratio||"");return null===a?(console.error("find-aspect-ratio error: Could not find a given aspect ratio."),e):"number"==typeof e.width&&"number"==typeof e.height?d.both(e,a):"number"==typeof e.width?d.height(e,a):"number"==typeof e.height?d.width(e,a):(console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."),e)};"undefined"!=typeof self?self.nlp=t:"undefined"!=typeof window?window.nlp=t:void 0!==e&&(e.nlp=t),void 0!==n&&(n.exports=t)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./find-best-ratio":2,"./fit":3,"./parse-ratio":5}],5:[function(e,t,i){"use strict";var n=e("./aspects"),r=/^[0-9\.]+:[0-9\.]+$/;t.exports=function(e){if(e=(e=(e=(e=e.toLowerCase()).trim()).replace(" ratio","")).replace("-"," "),!0===n.lookup.hasOwnProperty(e))return n.lookup[e];if(!0!==r.test(e))return null;var t=e.split(":");return{description:"custom",decimal:parseFloat(t[0])/parseFloat(t[1])}}},{"./aspects":1}]},{},[4])(4)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],187:[function(_dereq_,module,exports){
!function(){var n=function(t,e,u,r){for(var o=1;o<e.length;o++){var s=e[o],f="number"==typeof s?u[s]:s,p=e[++o];1===p?r[0]=f:3===p?r[1]=Object.assign(r[1]||{},f):5===p?(r[1]=r[1]||{})[e[++o]]=f:6===p?r[1][e[++o]]+=f+"":r.push(p?t.apply(null,n(t,f,u,["",null])):f)}return r},t=function(n){for(var t,e,u=1,r="",o="",s=[0],f=function(n){1===u&&(n||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||r,0):3===u&&(n||r)?(s.push(n||r,1),u=2):2===u&&"..."===r&&n?s.push(n,3):2===u&&r&&!n?s.push(!0,5,r):u>=5&&((r||!n&&5===u)&&(s.push(r,u,e),u=6),n&&(s.push(n,u,e),u=6)),r=""},p=0;p<n.length;p++){p&&(1===u&&f(),f(p));for(var h=0;h<n[p].length;h++)t=n[p][h],1===u?"<"===t?(f(),s=[s],u=3):r+=t:4===u?"--"===r&&">"===t?(u=1,r=""):r=t+r[0]:o?t===o?o="":r+=t:'"'===t||"'"===t?o=t:">"===t?(f(),u=1):u&&("="===t?(u=5,e=r,r=""):"/"===t&&(u<5||">"===n[p][h+1])?(f(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(f(),u=2):r+=t),3===u&&"!--"===r&&(u=4,s=s[0])}return f(),s},e="function"==typeof Map,u=e?new Map:{},r=e?function(n){var e=u.get(n);return e||u.set(n,e=t(n)),e}:function(n){for(var e="",r=0;r<n.length;r++)e+=n[r].length+"-"+n[r];return u[e]||(u[e]=t(n))},o=function(t){var e=n(this,r(t),arguments,[]);return e.length>1?e:e[0]};"undefined"!=typeof module?module.exports=o:self.htm=o}();

},{}],188:[function(_dereq_,module,exports){
(function (global){
/* somehow v0.0.3
   github.com/spencermountain/somehow-ticks
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehowTicks = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  trillion: 1000000000000,
  billion: 1000000000,
  million: 1000000,
  hundredThousand: 100000,
  tenThousand: 10000,
  thousand: 1000,
  hundred: 100,
  ten: 10,
  one: 1,
  tenth: 0.1,
  hundredth: 0.01,
  thousandth: 0.01
};

},{}],2:[function(_dereq_,module,exports){
"use strict";

var n = _dereq_('./_constants');

var prettyNum = function prettyNum(num) {
  num = parseFloat(num);

  if (num >= n.trillion) {
    num = parseInt(num / 100000000000, 10) * 100000000000;
    return num / n.trillion + 't';
  }

  if (num >= n.billion) {
    num = parseInt(num / 100000000, 10) * 100000000;
    return num / n.billion + 'b';
  }

  if (num >= n.million) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / n.million + 'm';
  }

  if (num >= n.tenThousand) {
    num = parseInt(num / n.thousand, 10) * n.thousand;
    return num / n.thousand + 'k';
  }

  if (num >= n.thousand) {
    num = parseInt(num / n.hundred, 10) * n.hundred;
    return num / n.thousand + 'k';
  }

  return num.toLocaleString();
};

module.exports = prettyNum;

},{"./_constants":1}],3:[function(_dereq_,module,exports){
"use strict";

// const zeroPad = (str, len = 2) => {
//   let pad = '0'
//   str = str + ''
//   return str.length >= len
//     ? str
//     : new Array(len - str.length + 1).join(pad) + str
// }
//
// const preferZeros = function(arr, ticks) {
//   const max = String(arr[arr.length - 1] || '').length
//   const zeroArr = arr.map(a => {
//     let str = zeroPad(String(a), max)
//     const zeros = (str.match(/0/g) || []).length
//     return [a, zeros]
//   })
//   let ranked = zeroArr.sort((a, b) => (a[1] < b[1] ? 1 : -1))
//   console.log(ranked)
//   return ranked
//     .map(a => a[0])
//     .slice(0, ticks)
//     .sort()
// }
var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  } //try filtering-down by # of non-zero digits used
  // let tmp = preferZeros(arr, n)
  // if (tmp.length > 0 && tmp.length <= n) {
  //   return tmp
  // }
  //otherwise, remove every other selection (less good)


  while (arr.length > n) {
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
};

module.exports = reduceTo;

},{}],4:[function(_dereq_,module,exports){
"use strict";

var methods = _dereq_('./methods');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = Math.abs(end - start);

  if (diff === 0) {
    return [];
  } //1 million


  if (diff > 3000000) {
    return methods.millions(start, end, n);
  } //100k


  if (diff > 300000) {
    return methods.hundredKs(start, end, n);
  } //1k


  if (diff > 3000) {
    return methods.thousands(start, end, n);
  } //100


  if (diff > 300) {
    return methods.hundreds(start, end, n);
  } //10


  if (diff > 30) {
    return methods.tens(start, end, n);
  } //1


  if (diff > 3) {
    return methods.ones(start, end, n);
  } //.1


  if (diff > 0.3) {
    return methods.tenths(start, end, n);
  } //.01


  return methods.hundredths(start, end, n);
}; //flip it around backwards


var reverseTicks = function reverseTicks(ticks) {
  ticks = ticks.map(function (o) {
    o.value = 1 - o.value;
    return o;
  });
  return ticks.reverse();
}; //


var somehowTicks = function somehowTicks(start, end, n) {
  var reverse = false;
  start = Number(start);
  end = Number(end); //reverse them, if necessary

  if (start > end) {
    reverse = true;
    var tmp = start;
    start = end;
    end = tmp;
  }

  var ticks = chooseMethod(start, end, n); //support backwards ticks

  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }

  return ticks;
};

module.exports = somehowTicks;

},{"./methods":5}],5:[function(_dereq_,module,exports){
"use strict";

var reduceTo = _dereq_('./_reduce');

var prettyNum = _dereq_('./_prettyNum');

var c = _dereq_('./_constants');

var roundDown = function roundDown(n, unit) {
  return Math.floor(n / unit) * unit;
}; //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var inc = unit / 2; //increment by .5

  var ticks = [];
  start = start += unit;
  start = roundDown(start, unit);

  while (start < end) {
    ticks.push(start);
    start = start += inc;
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end - start;
  return arr.map(function (s) {
    var percent = (s - start) / delta;
    return {
      label: prettyNum(s),
      number: s,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  millions: function millions(start, end, n) {
    var ticks = allTicks(start, end, c.million);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundredKs: function hundredKs(start, end, n) {
    var ticks = allTicks(start, end, c.hundredThousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'k', start, end);
    return ticks;
  },
  thousands: function thousands(start, end, n) {
    var ticks = allTicks(start, end, c.thousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundreds: function hundreds(start, end, n) {
    var ticks = allTicks(start, end, c.hundred);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  tens: function tens(start, end, n) {
    var ticks = allTicks(start, end, c.ten);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  ones: function ones(start, end, n) {
    var ticks = allTicks(start, end, c.one);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  tenths: function tenths(start, end, n) {
    var ticks = allTicks(start, end, c.tenth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  hundredths: function hundredths(start, end, n) {
    var ticks = allTicks(start, end, c.hundredth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  }
};
module.exports = methods;

},{"./_constants":1,"./_prettyNum":2,"./_reduce":3}]},{},[4])(4)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],189:[function(_dereq_,module,exports){
module.exports = '0.3.4'
},{}],190:[function(_dereq_,module,exports){
// https://d3js.org/d3-shape/ v1.3.5 Copyright 2019 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-path')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Path) { 'use strict';

function constant(x) {
  return function constant() {
    return x;
  };
}

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = d3Path.path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00),
            oc;

        // Restrict the corner radius according to the sector angle.
        if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

function pie() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

var slice = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$$1 = x,
      y$$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = d3Path.path();
    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810,
    kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10),
    kx = Math.sin(tau / 10) * kr,
    ky = -Math.cos(tau / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

function symbol() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = d3Path.path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop() {}

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$1(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
}

function diverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$1(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$1(series) {
  return ascending(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$1(series).reverse();
}

exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.areaRadial = areaRadial;
exports.radialArea = areaRadial;
exports.lineRadial = lineRadial$1;
exports.radialLine = lineRadial$1;
exports.pointRadial = pointRadial;
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle;
exports.symbolCross = cross;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetDiverging = diverging;
exports.stackOffsetNone = none;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAppearance = appearance;
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":184}],191:[function(_dereq_,module,exports){
const fitAspect = _dereq_('fit-aspect-ratio')
const htm = _dereq_('htm')
const vhtml = _dereq_('vhtml')
const methods = _dereq_('./methods')
const clipShapes = _dereq_('./_clip')
const YScale = _dereq_('./scales/YScale')
const XScale = _dereq_('./scales/Scale')
const XAxis = _dereq_('./axis/XAxis')
const YAxis = _dereq_('./axis/YAxis')

const Shape = _dereq_('./shapes/Shape')
const Area = _dereq_('./shapes/Area')
const Rect = _dereq_('./shapes/Rect')
const Line = _dereq_('./shapes/Line')
const Text = _dereq_('./shapes/Text')
const Dot = _dereq_('./shapes/Dot')
const Annotation = _dereq_('./shapes/Annotation')
const MidArea = _dereq_('./shapes/MidArea')
const Bar = _dereq_('./shapes/Bar')
const Image = _dereq_('./shapes/Image')
const Arrow = _dereq_('./shapes/Arrow')
const Now = _dereq_('./shapes/Now')
const Snake = _dereq_('./shapes/Snake')
const Title = _dereq_('./shapes/Title')

class World {
  constructor(obj = {}) {
    this.width = 100
    this.height = 100
    obj.aspect = obj.aspect || 'widescreen'
    if (obj.aspect) {
      this.aspect = obj.aspect
      let res = fitAspect({
        aspect: obj.aspect,
        width: 100
      })
      this.width = res.width || 100
      this.height = res.height || 100
    }
    this.shapes = []
    //give the points a little bit of space.
    this.wiggle_room = 1.05
    this.x = new XScale(obj, this)
    this.y = new YScale(obj, this)
    this.xAxis = new XAxis({}, this)
    this.yAxis = new YAxis({}, this)
    this.html = htm.bind(vhtml)
    this.inputs = []
    this.state = {}
    this.state.time = Date.now()
    this._title = ''
    this.el = obj.el || null
    if (typeof this.el === 'string') {
      this.el = document.querySelector(this.el)
    }
  }
  bind(fn) {
    this.html = htm.bind(fn)
  }
  line(obj) {
    let line = new Line(obj, this)
    this.shapes.push(line)
    return line
  }
  dot(obj) {
    let dot = new Dot(obj, this)
    this.shapes.push(dot)
    return dot
  }
  text(obj) {
    let text = new Text(obj, this)
    this.shapes.push(text)
    return text
  }
  area(obj) {
    let shape = new Area(obj, this)
    this.shapes.push(shape)
    return shape
  }
  midArea(obj) {
    let shape = new MidArea(obj, this)
    this.shapes.push(shape)
    return shape
  }
  rect(obj) {
    let shape = new Rect(obj, this)
    this.shapes.push(shape)
    return shape
  }
  bar(obj) {
    let shape = new Bar(obj, this)
    this.shapes.push(shape)
    return shape
  }
  annotation(obj) {
    let shape = new Annotation(obj, this)
    this.shapes.push(shape)
    return shape
  }
  image(obj) {
    let shape = new Image(obj, this)
    this.shapes.push(shape)
    return shape
  }
  arrow(obj) {
    let shape = new Arrow(obj, this)
    this.shapes.push(shape)
    return shape
  }
  now(obj) {
    let shape = new Now(obj, this)
    this.shapes.push(shape)
    return shape
  }
  snake(obj) {
    let shape = new Snake(obj, this)
    this.shapes.push(shape)
    return shape
  }
  title(obj) {
    let shape = new Title(obj, this)
    this.shapes.push(shape)
    return shape
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  getShape(id) {
    return this.shapes.find(shape => shape.id === id || shape._id === id)
  }
  redraw() {
    if (this.el) {
      this.el.innerHTML = this.build()
    } else {
      console.log('must define world html element')
    }
  }
  breakpoints() {
    return this.html`<style scoped>
      .somehow-legible {
        font-size: 2px;
      }
      @media (max-width: 600px) {
        .somehow-legible {
          font-size: 4px;
        }
      }
      .grow:hover {
        stroke-width: 6px;
      }
    </style>`
  }
  clip() {
    this.x.clip()
    this.y.clip()
    return this
  }
  build() {
    let h = this.html
    let shapes = this.shapes.sort((a, b) => (a._order > b._order ? 1 : -1))
    //remove shapes outside of max/mins
    shapes = clipShapes(shapes, this.x, this.y)
    let elements = []
    if (this.xAxis) {
      elements.push(this.xAxis.build())
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build())
    }
    elements = elements.concat(shapes.map(shape => shape.build()))
    let attrs = {
      // width: this.width,
      // height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;
    }
    return h`<svg ...${attrs}>
      ${this.breakpoints()}
      ${elements}
    </svg>`
  }
}
Object.keys(methods).forEach(k => {
  World.prototype[k] = methods[k]
})
const aliases = {
  plusminus: 'plusMinus'
}
Object.keys(aliases).forEach(k => {
  World.prototype[k] = methods[aliases[k]]
})
module.exports = World

},{"./_clip":192,"./axis/XAxis":195,"./axis/YAxis":196,"./methods":201,"./scales/Scale":203,"./scales/YScale":204,"./shapes/Annotation":206,"./shapes/Area":207,"./shapes/Arrow":208,"./shapes/Bar":209,"./shapes/Dot":210,"./shapes/Image":211,"./shapes/Line":212,"./shapes/MidArea":213,"./shapes/Now":214,"./shapes/Rect":215,"./shapes/Shape":216,"./shapes/Snake":217,"./shapes/Text":218,"./shapes/Title":219,"fit-aspect-ratio":186,"htm":187,"vhtml":233}],192:[function(_dereq_,module,exports){
//remove shapes outside of boundaries
const clipShapes = function(shapes, xScale, yScale) {
  shapes = shapes.filter(s => {
    //ignore
    if (s.ignore_clip === true) {
      return true
    }
    let { x, y } = s.extent()
    //clip according to x-axis
    if (xScale._clip) {
      //support reversed min/max values
      let min = xScale.min
      let max = xScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (x.min < min) {
        return false
      }
      if (x.max > max) {
        return false
      }
      if (x.min > max || x.max < min) {
        return false
      }
    }
    if (yScale._clip) {
      //support reversed min/max values
      let min = yScale.min
      let max = yScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (y.min < min) {
        return false
      }
      if (y.max > max) {
        return false
      }
      if (y.min > max || y.max < min) {
        return false
      }
    }
    return true
  })

  return shapes
}
module.exports = clipShapes

},{}],193:[function(_dereq_,module,exports){
const extent = function(arr) {
  let min = null
  let max = null
  arr.forEach(a => {
    if (min === null || a < min) {
      min = a
    }
    if (max === null || a > max) {
      max = a
    }
  })
  return {
    min: min,
    max: max
  }
}

/* eslint no-bitwise: 0 */
//may need to change when the term really-transforms? not sure.
const uid = str => {
  let nums = ''
  for (let i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10)
  }
  return str + '-' + nums
}

module.exports = {
  extent: extent,
  uid: uid
}

},{}],194:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color')
const ticks = _dereq_('./_ticks')
const drawTick = _dereq_('./_custom')

const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1,
  'vector-effect': 'non-scaling-stroke'
}

class Axis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
    this.scale = null
    this._tickCount = 6
    this._fmt = undefined
    this._given = undefined
    this._show = true
    this._label = ''
    this._suffix = ''
    this._prefix = ''
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  label(str) {
    this._label = str
    return this
  }
  suffix(str) {
    this._suffix = str
    return this
  }
  prefix(str) {
    this._prefix = str
    return this
  }
  remove() {
    this._show = false
    return this
  }
  format(str) {
    this._fmt = str
    return this
  }
  show() {
    this._show = true
    return this
  }
  ticks(n) {
    if (typeof n === 'number') {
      this._tickCount = n
    } else if (typeof n === 'object') {
      this._given = n
    }
    if (this._given) {
      return this._given.map(o => drawTick(o, this))
    }
    if (this.scale.format() === 'date') {
      return ticks.date(this, this._tickCount)
    }
    return ticks.generic(this, this._tickCount)
  }
}
module.exports = Axis

},{"./_custom":197,"./_ticks":199,"spencer-color":226}],195:[function(_dereq_,module,exports){
const Axis = _dereq_('./Axis')

class XAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.x
  }
  drawTicks(y) {
    let h = this.world.html
    return this.ticks().map(o => {
      return h`<text x="${o.value * 100 + '%'}" y="${y + 3}" fill="${
        this.attrs.stroke
      }" text-anchor="middle" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs
    let width = this.world.width
    let y = this.world.height
    let ticks = this.drawTicks(y)
    let textAttrs = {
      x: '50%',
      y: '115%',
      fill: this.attrs.stroke,
      'font-size': '2px',
      style: 'text-anchor:middle;'
    }
    return h`<g>
      ${ticks}
      <line x1="${0}" y1="${y}" x2="${width}" y2="${y}" ...${attrs} stroke="#d7d5d2" />
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = XAxis

},{"./Axis":194}],196:[function(_dereq_,module,exports){
const Axis = _dereq_('./Axis')

class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.y
  }
  drawTicks(x) {
    let h = this.world.html
    return this.ticks().map(o => {
      let percent = o.value * 100
      percent = 100 - percent
      return h`<text x="${x}" y="${percent + '%'}" dy="0" dx="-2px" fill="${
        this.attrs.stroke
      }" text-anchor="end" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs
    let height = this.world.height
    let x = 0
    let ticks = this.drawTicks(x)
    let textAttrs = {
      x: '-5%',
      y: '50%',
      'font-size': '2px',
      fill: this.attrs.stroke,
      style: 'text-anchor:end;'
    }
    return h`<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = YAxis

},{"./Axis":194}],197:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
const prettyNum = _dereq_('./_prettyNum')

const drawTick = function(s, axis) {
  let scale = axis.scale.scale
  let label = null
  //support {label, value} format
  if (typeof s === 'object' && s !== null) {
    label = s.label
    s = s.value
  }
  //support 'june 5th'
  if (typeof s === 'string') {
    s = spacetime(s)
    return {
      num: s.epoch, //val
      pos: parseInt(scale(s.epoch), 10), //x/y
      label: label || s.format(axis._fmt || '{month} {year}') //text
    }
  }
  //support '52'
  let num = Number(s)
  return {
    value: num / 100,
    pos: parseInt(scale(num), 10),
    label: label || prettyNum(num)
  }
}
module.exports = drawTick

},{"./_prettyNum":198,"spacetime":225}],198:[function(_dereq_,module,exports){
const bil = 1000000000
const mil = 1000000
const tenThou = 10000
const thou = 1000

const prettyNum = function(num) {
  num = parseFloat(num)
  if (num >= bil) {
    num = parseInt(num / 100000000, 10) * 100000000
    return num / mil + 'b'
  }
  if (num >= mil) {
    num = parseInt(num / 100000, 10) * 100000
    return num / mil + 'm'
  }
  if (num >= tenThou) {
    num = parseInt(num / thou, 10) * thou
    return num / thou + 'k'
  }
  if (num >= thou) {
    num = parseInt(num / 100, 10) * 100
    return num / thou + 'k'
  }
  return num.toLocaleString()
}
module.exports = prettyNum

},{}],199:[function(_dereq_,module,exports){
const spacetimeTicks = _dereq_('spacetime-ticks')
const somehowTicks = _dereq_('somehow-ticks')

const generic = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = somehowTicks(start, end, n)
  if (axis._suffix) {
    ticks.forEach(tick => (tick.label += axis._suffix))
  }
  if (axis._prefix) {
    ticks.forEach(tick => (tick.label = axis._prefix + tick.label))
  }
  return ticks
}

const date = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = spacetimeTicks(start, end, n)
  return ticks
}
module.exports = {
  generic: generic,
  date: date
}

},{"somehow-ticks":188,"spacetime-ticks":223}],200:[function(_dereq_,module,exports){
const World = _dereq_('./World')
const version = _dereq_('../_version')

// ...people call this a 'factory'
const somehow = function(obj) {
  return new World(obj)
}
somehow.version = version
module.exports = somehow

},{"../_version":189,"./World":191}],201:[function(_dereq_,module,exports){
const { parseX, parseY } = _dereq_('./parse')
const fns = _dereq_('./_fns')

const has = function(x) {
  return x !== undefined && x !== null
}

let methods = {
  //add new minimums
  from: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)

      this.x.min = x
      this.x.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this).value
      this.y.min = y
      this.y.rescale()
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this).value
      this.c.max = x
      this.c.rescale()
    }
    if (has(y) === true) {
      y = parseX(y, this).value
      this.y.max = y
      this.y.rescale()
    }
    return this
  },

  fitX: function(x) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null)
    let minX = fns.extent(arr.map(o => o.x.min).filter(n => n !== null)).min || 0
    let maxX = fns.extent(arr.map(o => o.x.max).filter(n => n !== null)).max || 0
    //keep graphs from 0, if you can...
    this.x.min = minX > 0 ? 0 : minX
    this.x.max = maxX
    if (this.x.format() === 'date') {
      this.x.min = minX
      this.x.max = maxX
    }
    this.x.rescale()
    if (has(x) === true) {
      x = parseX(x, this).value
      if (x > this.x.max) {
        this.x.max = x
      } else if (x < this.x.min) {
        this.x.min = x
      }
      this.x.rescale()
    }
    return this
  },
  fitY: function(y) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null)
    let minY = fns.extent(arr.map(o => o.y.min).filter(n => n !== null)).min || 0
    let maxY = fns.extent(arr.map(o => o.y.max).filter(n => n !== null)).max || 0
    this.y.min = minY > 0 ? 0 : minY
    this.y.max = maxY
    if (this.y.format() === 'date') {
      this.y.min = minY
      this.y.max = maxY
    }
    this.y.rescale()
    if (has(y) === true) {
      y = parseY(y, this).value
      if (y > this.y.max) {
        this.y.max = y
      } else if (y < this.y.min) {
        this.y.min = y
      }
      this.y.rescale()
    }
    return this
  },

  fit: function(x, y) {
    this.fitX(x)
    this.fitY(y)
    return this
  }
}
module.exports = methods

},{"./_fns":193,"./parse":202}],202:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
//
const parse = function(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      value: str
    }
  }
  //support pixels
  if (/[0-9]px$/.test(str)) {
    return {
      type: 'pixel',
      value: Number(str.replace(/px/, ''))
    }
  }
  //support percentages
  if (/[0-9]%$/.test(str)) {
    let num = Number(str.replace(/%/, ''))
    return {
      type: 'percent',
      value: num
    }
  }
  //try a straight-up number
  let num = Number(str)
  if (!isNaN(num)) {
    return {
      type: 'number',
      value: num
    }
  }
  //try a date
  let s = spacetime(str)
  if (s.isValid()) {
    return {
      type: 'date',
      value: s.epoch
    }
  }
  console.warn("Counldn't parse: " + str)
  return {
    type: 'unknown',
    value: null
  }
}

const parseX = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.x.format(res.type)
  }
  return res
}

const parseY = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.y.format(res.type)
  }
  return res
}

module.exports = {
  parseX: parseX,
  parseY: parseY
}

},{"spacetime":225}],203:[function(_dereq_,module,exports){
// const scaleLinear = require('d3-scale').scaleLinear
const scaleLinear = _dereq_('./_linear')
const { parseX } = _dereq_('../parse')

const has = function(x) {
  return x !== undefined && x !== null
}

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 1

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.parse = parseX
    this.is_y = false
    this._clip = false
    this.rescale()
  }
  rescale() {
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.min, this.max]
    })
    return this
  }
  fit(a, b) {
    if (has(a) === false && has(b) === false) {
      if (this.is_y) {
        this.world.fitY()
      } else {
        this.world.fitX()
      }
      this.rescale()
      return this
    }
    if (has(a) === true) {
      let num = this.parse(a, this.world).value
      this.min = num
    }
    if (has(b) === true) {
      let num = this.parse(b, this.world).value
      this.max = num
    }
    this.rescale()
    return this
  }
  place(obj) {
    //from=top
    //to=bottom
    if (obj.type === 'pixel') {
      if (this.is_y) {
        return this.to - obj.value //flip grid
      }
      return obj.value
    }
    if (obj.type === 'percent') {
      let num = this.byPercent(obj.value)
      let val = this.scale.backward(num)
      if (this.is_y) {
        return this.to - val
      }
      return val
    }
    return this.scale(obj.value)
  }
  byPercent(num = 0) {
    num = num / 100
    let diff = this.max - this.min
    return diff * num + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    this._format = format
    return this
  }
  clip(bool) {
    if (bool === undefined) {
      bool = true
    }
    this._clip = bool
  }
  reverse() {
    let tmp = this.min
    this.min = this.max
    this.max = tmp
    this.rescale()
    return tmp
  }
}

module.exports = Scale

},{"../parse":202,"./_linear":205}],204:[function(_dereq_,module,exports){
const Scale = _dereq_('./Scale')
const scaleLinear = _dereq_('./_linear')
// const scaleLinear = require('d3-scale').scaleLinear
const { parseY } = _dereq_('../parse')

class YScale extends Scale {
  constructor(data, world) {
    super(data, world)
    //use height instead of width
    this.to = world.height
    this.is_y = true
    this.parse = parseY
    this.rescale()
  }
  rescale() {
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.max, this.min]
    })
  }
}
module.exports = YScale

},{"../parse":202,"./Scale":203,"./_linear":205}],205:[function(_dereq_,module,exports){
//a very-tiny version of d3-scale's scaleLinear
const scaleLinear = function(obj) {
  let world = obj.world || []
  let minmax = obj.minmax || []
  const calc = num => {
    let range = minmax[1] - minmax[0]
    let percent = (num - minmax[0]) / range
    let size = world[1] - world[0]
    return parseInt(size * percent, 10)
  }
  // invert the calculation. return a %?
  calc.backward = num => {
    let size = world[1] - world[0]
    let range = minmax[1] - minmax[0]
    let percent = (num - world[0]) / size
    return parseInt(percent * range, 10)
  }
  return calc
}
module.exports = scaleLinear

// let scale = scaleLinear({
//   world: [0, 300],
//   minmax: [0, 100]
// })
// console.log(scale(50))
// console.log(scale.backward(150))

},{}],206:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Text = _dereq_('./Text')

const defaults = {
  'text-anchor': 'start',
  'font-size': 5,
  class: 'somehow-legible'
}

class Annotation extends Text {
  constructor(obj = {}, world) {
    super(obj, world)
    this.attrs = Object.assign({}, defaults, this.attrs)
    this._nudge = {
      x: 0,
      y: 0
    }
    this._title = ''
  }
  on(x, y) {
    this.at(x, y)
    return this
  }
  title(txt) {
    this._title = txt
    return this
  }
  nudge(x, y) {
    //always in pixels
    this._nudge.x = x
    this._nudge.y = y
    return this
  }
  drawText() {
    let h = this.world.html
    let nudge = this._nudge
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em">${String(str)}</tspan>`)
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y //- estimate.height,
    }
    let transform = `translate(${place.x} ${place.y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${-2}" y1="${estimate.height}" x2="${estimate.width}" y2="${
      estimate.height
    }" style="stroke-width:1.5px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;"  stroke=${
      colors.grey
    }/>
    </g>`
  }
  drawRange() {
    let h = this.world.html
    let points = this.points()
    if (points.length <= 1) {
      return null
    }
    let size = 4
    let style =
      'stroke-width:2px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;'
    let top = points[0]
    let bottom = points[1]
    //for a vertical range...
    let ticks = h`<g>
      <line x1="${top[0] - size}" y1="${top[1]}" x2="${top[0] + size}" y2="${
      top[1]
    }" style="${style}" stroke=${colors.grey}/>
      <line x1="${bottom[0] - size}" y1="${bottom[1]}" x2="${bottom[0] + size}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors.grey}/>
    </g>
    `
    //for a horizontal range
    if (top[0] !== bottom[0]) {
      ticks = h`<g>
        <line x1="${top[0]}" y1="${top[1] - size}" x2="${top[0]}" y2="${top[1] +
        size}" style="${style}" stroke=${colors.grey}/>
        <line x1="${bottom[0]}" y1="${bottom[1] - size}" x2="${bottom[0]}" y2="${bottom[1] +
        size}" style="${style}" stroke=${colors.grey}/>
      </g>
      `
    }
    return h`<g>
      <line x1="${top[0]}" y1="${top[1]}" x2="${bottom[0]}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors.grey}/>
      ${ticks}
    </g>`
  }
  getPoint() {
    let points = this.points()
    if (points.length <= 1) {
      return points[0]
    }
    //the middle point?
    let xDiff = points[0][0] - points[1][0]
    let yDiff = points[0][1] - points[1][1]
    return [points[0][0] - xDiff / 2, points[0][1] - yDiff / 2]
  }
  drawLine() {
    let h = this.world.html
    let nudge = this._nudge
    let point = this.getPoint()
    let start = this.points()[0]
    let textPoint = {
      x: start[0] + nudge.x,
      y: start[1] - nudge.y + 4
    }
    //touch the right side, instead
    if (nudge.x < 0) {
      let estimate = this.estimate()
      textPoint.x += estimate.width
    }
    return h`<line id="line" x1="${textPoint.x}" y1="${textPoint.y}" x2="${point[0]}" y2="${
      point[1]
    }" style="stroke-width:2px; shapeRendering:optimizeQuality;" vector-effect="non-scaling-stroke" stroke=${
      colors.grey
    }/>`
  }
  build() {
    let h = this.world.html
    this.onMount()
    return h`<g id="build">
      ${this.drawText()}
      ${this.drawLine()}
      ${this.drawRange()}
    </g>`
  }
}
module.exports = Annotation

},{"./Text":218,"spencer-color":226}],207:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')
const d3Shape = _dereq_('d3-shape')
const { parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 0.25,
  'stroke-width': 2
}

class Area extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._line = 2
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  line(num) {
    this._line = num
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  areaPath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    let zero = this.world.y.place(parseY(0))
    return d3Shape
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(this.curve)(points)
  }
  linePath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    return d3Shape
      .area()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html
    this.onMount()
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}"/>`
    if (!this._line) {
      return area
    }
    //draw a line on top
    let lineAttr = Object.assign({}, this.attrs, {
      d: this.linePath(),
      fill: 'none'
    })
    let line = h`<path ...${lineAttr} style="${this.drawSyle()}">
        <title>${this._title}</title>
      </path>`
    return [line, area]
  }
}

module.exports = Area

},{"../parse":202,"./Shape":216,"d3-shape":190,"spencer-color":226}],208:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const d3Shape = _dereq_('d3-shape')
const Shape = _dereq_('./Shape')

const defaults = {
  fill: 'none',
  stroke: colors.grey,
  'stroke-width': 3,
  'stroke-linecap': 'round',
  'shape-rendering': 'optimizeQuality'
}

class Arrow extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._length = 35
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  from(x, y) {
    this.set([this._data[0], [x, y]])
  }
  length(num) {
    this._length = num
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  getLength(start, end) {
    let x = start[0] - end[0]
    let y = start[1] - end[1]
    let h = Math.pow(x, 2) + Math.pow(y, 2) //x^2 + y^2 = h^2
    h = Math.sqrt(h)
    return h
  }
  getAngle(start, end) {
    let p1 = {
      x: start[0],
      y: start[1]
    }
    let p2 = {
      x: end[0],
      y: end[1]
    }
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    return angleRadians
  }
  head(start, end) {
    let h = this.world.html
    let radian = this.getAngle(start, end)
    let leftAngle = radian - Math.PI / 4
    let rightAngle = radian + Math.PI / 4
    let length = this.getLength(start, end)
    length = length * 0.2
    //---soh cah toa--
    let left = {
      opp: Math.sin(leftAngle) * length,
      adj: Math.cos(leftAngle) * length
    }
    let right = {
      opp: Math.sin(rightAngle) * length,
      adj: Math.cos(rightAngle) * length
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + left.adj} y2=${start[1] + left.opp} ...${
      this.attrs
    }/>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + right.adj} y2=${start[1] +
      right.opp} ...${this.attrs}/>
    </g>`
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let start = points[0]
    let end = points[1]
    if (!end) {
      end = [start[0] - this._length, start[1]]
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${end[0]} y2=${end[1]} ...${this.attrs}/>
      ${this.head(start, end)}
    </g>`
  }
}

module.exports = Arrow

},{"./Shape":216,"d3-shape":190,"spencer-color":226}],209:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Rect = _dereq_('./Rect')
const { parseX, parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 1,
  'stroke-width': 1
}

class Bar extends Rect {
  constructor(obj, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._rounded = 1
    this._width = 5
    this._zero = 0
  }
  width(w) {
    this._width = w
    return this
  }
  //point that it flips on
  zero(w) {
    this._zero = w
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  at(x, y) {
    this.data = [
      {
        x: parseX(x, this.world),
        y: parseY(0, this.world)
      },
      {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      }
    ]
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let bottom = points[0][1]
    if (points[0][1] > points[1][1]) {
      bottom = points[1][1]
    }
    let height = Math.abs(points[1][1] - points[0][1])
    let attrs = Object.assign({}, this.attrs, {
      x: points[0][0],
      y: bottom,
      width: this._width,
      height: height,
      rx: this._rounded,
      title: this._title
    })
    return h`<rect ...${attrs} >
        <title>${this._title}</title>
      </rect>`
  }
}
module.exports = Bar

},{"../parse":202,"./Rect":215,"spencer-color":226}],210:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')

const defaults = {
  fill: colors.blue,
  stroke: 'none'
}

class Dot extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._radius = obj.radius || 5
  }
  radius(r) {
    this._radius = r
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let point = this.points()[0]
    let attrs = Object.assign({}, this.attrs, {
      id: this._id,
      cx: point[0],
      cy: point[1],
      r: this._radius
    })
    return h`<circle ...${attrs} ><title>${this._title}</title></circle>`
  }
}

module.exports = Dot

},{"./Shape":216,"spencer-color":226}],211:[function(_dereq_,module,exports){
const Shape = _dereq_('./Shape')
const colors = _dereq_('spencer-color').colors

class Image extends Shape {
  constructor(obj, world) {
    super(obj, world)
    this._src = ''
    this._width = 100
    this._height = 200
    this._caption = ''
  }
  src(src) {
    this._src = src
    return this
  }
  caption(txt) {
    this._caption = txt
    return this
  }
  size(w, h) {
    this._width = w
    this._height = h
    return this
  }
  width(w) {
    this._width = w
    return this
  }
  height(h) {
    this._height = h
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let point = this.points()[0]
    if (!point) {
      point = [0, 0]
    }
    let caption = ''
    if (this._caption) {
      let y = point[1] + this._height + 15
      caption = h`<text x="${point[0]}" y="${y}" stroke="none" fill="${colors.grey}">${
        this._caption
      }</text>`
    }
    return h`<g>
      <image xlink:href="${this._src}" x="${point[0]}" y="${point[1]}" height="${
      this._width
    }" width="${this._height}" />
      ${caption}
    </g>
    `
    //preserveAspectRatio="slice"
  }
}
module.exports = Image

},{"./Shape":216,"spencer-color":226}],212:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const d3Shape = _dereq_('d3-shape')
const Shape = _dereq_('./Shape')

const defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
}

class Line extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  dotted(n) {
    if (n === true) {
      n = 4
    }
    this.attrs['stroke-dasharray'] = n || 4
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
}

module.exports = Line

},{"./Shape":216,"d3-shape":190,"spencer-color":226}],213:[function(_dereq_,module,exports){
const Area = _dereq_('./Area')
const { parseY } = _dereq_('../parse')
const parseInput = _dereq_('./lib/parseInput')
const d3Shape = _dereq_('d3-shape')

class Midarea extends Area {
  constructor(obj, world) {
    super(obj, world)
    this._zero = this.world.y.place(parseY(0))
  }
  zero(y) {
    this._zero = y
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    //add the bottom part, to data
    this.data.forEach(o => {
      o.y.value /= 2
      o.y2 = Object.assign({}, o.y)
      o.y2.value *= -1
    })
    return this
  }
  topLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  bottomLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[2])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html
    this.onMount()
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}">
      <title>${this._title}</title>
    </path>`
    if (!this._line) {
      return area
    }
    let points = this.points()

    //draw a line on top
    let topLine = Object.assign({}, this.attrs, {
      d: this.topLine(points),
      fill: 'none'
    })
    topLine = h`<path ...${topLine} style="${this.drawSyle()}"/>`

    //draw a line on the bottom
    let bottomLine = Object.assign({}, this.attrs, {
      d: this.bottomLine(points),
      fill: 'none'
    })
    bottomLine = h`<path ...${bottomLine} style="${this.drawSyle()}"/>`
    return [topLine, area, bottomLine]
  }
}
module.exports = Midarea

},{"../parse":202,"./Area":207,"./lib/parseInput":220,"d3-shape":190}],214:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Line = _dereq_('./Line')

const defaults = {
  fill: 'none',
  stroke: colors.lighter,
  'stroke-width': 2,
  'stroke-linecap': 'round'
}

class Now extends Line {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._label = ''
    this._y = '-5%'
    this.dotted(true)
    let d = Date.now()
    this.set([[d, '0%'], [d, '100%']])
  }
  label(str) {
    this._label = str
    return this
  }
  top() {
    this._y = '-5%'
  }
  bottom() {
    this._y = '105%'
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    })
    let point = this.points()[0]
    let textAttrs = {
      x: point[0],
      y: this._y,
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    }
    return h`
      <g>
        <text ...${textAttrs}>
          ${this._label}
        </text>
        <path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>
      </g>
    `
  }
}

module.exports = Now

},{"./Line":212,"spencer-color":226}],215:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 0.25,
  'stroke-width': 1
}

class Rect extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._rounded = 3
    this._width = undefined
    this._height = undefined
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  border(n) {
    this.attrs['stroke-width'] = n
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  width(n) {
    this._width = n
    return this
  }
  height(n) {
    this._height = n
    return this
  }
  rounded(r) {
    this._rounded = r
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let a = points[0]
    let b = points[1] || 0
    let width = Math.abs(b[0] - a[0])
    let height = Math.abs(b[1] - a[1])
    if (this._width !== undefined) {
      width = this._width
    }
    if (this._height !== undefined) {
      height = this._height
    }
    let attrs = Object.assign({}, this.attrs, {
      x: a[0],
      y: a[1] - height,
      width: width,
      height: height,
      rx: this._rounded
    })
    return h`<rect ...${attrs} >
      <title>${this._title}</title>
    </rect>` //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
  }
}

module.exports = Rect

},{"./Shape":216,"spencer-color":226}],216:[function(_dereq_,module,exports){
const d3Shape = _dereq_('d3-shape')
const colors = _dereq_('spencer-color').colors
const fns = _dereq_('../_fns')
const parseInput = _dereq_('./lib/parseInput')
const { parseX, parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality',
  'vector-effect': 'non-scaling-stroke'
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this._id = obj.id || fns.uid('input')
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this.curve = d3Shape.curveMonotoneX
    this._shape = 1
    this._title = ''
    this._click = obj.click
    this._hover = obj.hover
    this._grow = false
    //nudge pixels
    this._dx = 0
    this._dy = 0
    this.ignore_clip = false
  }
  //don't clip some shapes
  clip(bool) {
    this.ignore_clip = bool
    return this
  }
  straight() {
    this.curve = d3Shape.curveLinear
    return this
  }
  soft() {
    // this.curve = d3Shape.curveBundle.beta(0.5)
    this.curve = d3Shape.curveBasis
    return this
  }
  grow(bool) {
    this._grow = bool
    return this
  }
  id(str) {
    this._id = str
    return this
  }
  dx(n) {
    this._dx = n
    return this
  }
  dy(n) {
    this._dy = n
    return this
  }
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) {
      this.set([[x, y]])
      return this
    }
    //vertical line
    if (x || x === 0) {
      this.set([[x, '0%'], [x, '100%']])
      return this
    }
    //horizontal line
    if (y || y === 0) {
      this.set([['0%', y], ['100%', y]])
    }
    return this
  }
  extent() {
    let xArr = []
    let yArr = []
    this.data.forEach(o => {
      if (o.x.type !== 'pixel') {
        xArr.push(o.x.value)
      }
      if (o.y.type !== 'pixel') {
        yArr.push(o.y.value)
      }
      if (o.y2 && o.y2.type !== 'pixel') {
        yArr.push(o.y2.value)
      }
    })
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr)
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  opacity(n) {
    this.attrs.opacity = n
    return this
  }
  title(str) {
    this._title = str
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    return this
  }
  from(x, y) {
    this.data[0] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  to(x, y) {
    this.data[1] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  //set any listeners on the dom element
  onMount() {
    if (!this._click && !this._hover) {
      return
    }
    //wait for mount
    setTimeout(() => {
      let el = document.getElementById(this._id)
      if (!el) {
        return
      }
      if (this._click) {
        el.addEventListener('click', () => {
          this._click(this)
        })
      }
      if (this._hover) {
        el.addEventListener('mouseenter', () => {
          this._hover(this)
        })
      }
    }, 50)
  }
  click(fn) {
    this._click = fn
  }
  hover(fn) {
    this._hover = fn
  }
  //x,y coordinates
  points() {
    let { x, y } = this.world
    let points = this.data.map(o => {
      let arr = [x.place(o.x), y.place(o.y)]
      if (o.y2 !== undefined) {
        arr.push(y.place(o.y2))
      }
      arr[0] += this._dx
      arr[1] += this._dy
      return arr
    })
    return points
  }
  path() {
    let zero = this.world.y.place(parseY(0))
    let points = this.points()
    return d3Shape
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(this.curve)(points)
  }
  drawSyle() {
    return Object.keys(this.style)
      .map(k => {
        return `${k}:${this.style[k]};`
      })
      .join(' ')
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    })
    let classes = ''
    if (this._grow) {
      classes += 'grow'
    }
    return h`<path ...${attrs} id=${this._id} class=${classes} style="${this.drawSyle()}"/>`
  }
}
module.exports = Shape

},{"../_fns":193,"../parse":202,"./lib/parseInput":220,"d3-shape":190,"spencer-color":226}],217:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const d3Shape = _dereq_('d3-shape')
const Shape = _dereq_('./Shape')
const parseInput = _dereq_('./lib/parseInput')

const defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
}

class Snake extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  dotted(n) {
    if (n === true) {
      n = 4
    }
    this.attrs['stroke-dasharray'] = n || 4
    return this
  }
  set(str) {
    let data = parseInput(str, this.world)
    let more = []
    // make it into a snake-form
    data.forEach((obj, i) => {
      more.push(obj)
      if (data[i + 1]) {
        more.push({
          x: obj.x,
          y: data[i + 1].y
        })
      }
    })
    this.data = more
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])(points)
  }
}

module.exports = Snake

},{"./Shape":216,"./lib/parseInput":220,"d3-shape":190,"spencer-color":226}],218:[function(_dereq_,module,exports){
const Shape = _dereq_('./Shape')
const colors = _dereq_('spencer-color').colors

const defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round',
  'font-size': 5
}

class Text extends Shape {
  constructor(obj = {}, world) {
    let text = null
    let textFn = null
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    } else if (typeof obj === 'function') {
      textFn = obj
      obj = {}
    } else if (Array.isArray(obj)) {
      text = obj
      obj = []
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this.textLines = text || obj.text || []
    this.textFn = textFn
    if (typeof this.textLines === 'string') {
      this.textLines = [this.textLines]
    }
    this._order = 0
    this._responsive = false
    this.data = [
      {
        x: {
          value: 50,
          type: 'percent'
        },
        y: {
          value: 50,
          type: 'percent'
        }
      }
    ]
    this._dodge = {
      x: 0,
      y: 4
    }
    this._underline = ''
    this.style = this.style || {}
    this.style['font-size'] = this.style['font-size'] || '4px'
  }
  before(x, y) {
    this.attrs['text-anchor'] = 'end'
    this.set([[x, y]])
    return this
  }
  after(x, y) {
    this.attrs['text-anchor'] = 'start'
    this.set([[x, y]])
    return this
  }
  center(x, y) {
    this.attrs['text-anchor'] = 'middle'
    if (x !== undefined) {
      this.set([[x, y]])
    }
    return this
  }
  left() {
    this.attrs['text-anchor'] = 'start'
    return this
  }
  right() {
    this.attrs['text-anchor'] = 'end'
    return this
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  dy(n = 0) {
    this._dodge.y = n * -1
    return this
  }
  dx(n = 0) {
    this._dodge.x = n
    return this
  }
  dodge(x, y) {
    x = x || this._dodge.x
    y = y || this._dodge.y
    this._dodge.x = x * -1
    this._dodge.y = y * -1
    return this
  }
  font(num) {
    if (typeof num === 'number') {
      num += 'px'
    }
    this.style['font-size'] = num
    return this
  }
  size(num) {
    return this.font(num)
  }
  responsive(bool) {
    this._responsive = bool
    return this
  }
  extent() {
    // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
    // let width = longest.length * 8
    // let height = this.textLines.length * 20
    let d = this.data[0] || {}
    return {
      x: {
        min: d.x.value,
        max: d.x.value
      },
      y: {
        min: d.y.value, // - height,
        max: d.y.value
      }
    }
  }
  text(text) {
    if (typeof text === 'string') {
      this.textLines = [text]
    } else if (typeof text === 'function') {
      this.textLines = []
      this.textFn = text
    } else {
      this.textLines = text
    }
    return this
  }
  path() {
    return ''
  }
  estimate() {
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    //calculate height
    let height = 24
    if (this.style['font-size']) {
      let num = this.style['font-size'].replace('px', '')
      num = Number(num)
      height = num * 1.5
    }
    height *= textArr.length
    //calculate width
    let width = 0
    textArr.forEach(str => {
      let w = str.length * 8
      if (w > width) {
        width = w
      }
    })
    return {
      height: height,
      width: width
    }
  }
  position() {
    let point = this.points()[0]
    let res = {
      x: 0,
      y: 0
    }
    if (!point) {
      return res
    }
    let { height, width } = this.estimate()
    res.height = height
    res.width = width
    res.y = point[1] + this._dodge.y - height
    res.x = point[0] + 2 + this._dodge.x
    res.y -= 2
    return res
  }
  build() {
    let h = this.world.html
    this.onMount()
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em" >${String(str)}</tspan>`)
    let { x, y } = this.position()
    let transform = `translate(${x} ${y})`
    let classes = ''
    if (this._responsive) {
      classes = 'somehow-legible'
    }
    return h`<g transform="${transform}" >
      <text ...${this.attrs} style="${this.drawSyle()}" class=${classes}>
        ${inside}
      </text>
    </g>`
  }
}

module.exports = Text

},{"./Shape":216,"spencer-color":226}],219:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Text = _dereq_('./Text')

const defaults = {
  stroke: 'none',
  fill: colors.grey,
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'text-anchor': 'middle',
  class: 'somehow-legible'
}

class Title extends Text {
  constructor(obj = {}, world) {
    let title = ''
    if (typeof obj === 'string') {
      title = obj
      obj = {}
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._title = title
    this._y = '-5%'
    this._x = '50%'
    this.ignore_clip = true
  }
  extent() {
    return null
  }
  label(str) {
    this._label = str
    return this
  }
  color(c) {
    this.attrs.fill = c
    return this
  }
  top() {
    this._y = '-15%'
    return this
  }
  bottom() {
    this._y = '115%'
    return this
  }
  left() {
    this._x = '15%'
    this.attrs['text-anchor'] = 'start'
    return this
  }
  right() {
    this._x = '95%'
    this.attrs['text-anchor'] = 'end'
    return this
  }
  build() {
    let h = this.world.html
    let attrs = Object.assign({}, this.attrs, {
      x: this._x,
      y: this._y
    })
    return h`<text ...${attrs}>
          ${this._title}
        </text>`
  }
}

module.exports = Title

},{"./Text":218,"spencer-color":226}],220:[function(_dereq_,module,exports){
const { parseX, parseY } = _dereq_('../../parse')

//a very-flexible input language
const parseStr = function(str = '', world) {
  let lines = str.split(/\n/g)
  lines = lines.filter(l => l)
  lines = lines.map(line => {
    let split = line.split(/(,|\t) ?/).map(s => s.trim())
    let x = parseX(split[0], world)
    let y = parseY(split[2], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (split[4] !== undefined) {
      obj.y2 = parseY(split[4], world)
    }
    return obj
  })
  return lines
}

const parseInput = function(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world)
  }
  return set.map(a => {
    let x = parseX(a[0], world)
    let y = parseY(a[1], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (a[2] !== undefined) {
      obj.y2 = parseY(a[2], world)
    }
    return obj
  })
}

module.exports = parseInput

},{"../../parse":202}],221:[function(_dereq_,module,exports){
module.exports = '0.2.1'
},{}],222:[function(_dereq_,module,exports){
const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }
  while (arr.length > n) {
    //remove every other one
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    })
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
}
module.exports = reduceTo

},{}],223:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
const methods = _dereq_('./methods')
const version = _dereq_('../_version')

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end)
  if (diff.years > 300) {
    return methods.centuries(start, end, n)
  }
  if (diff.years > 30) {
    return methods.decades(start, end, n)
  }
  if (diff.years > 3) {
    return methods.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods.minutes(start, end, n)
  }
  return methods.months(start, end, n)
}

//flip it around backwards
const reverseTicks = function(ticks) {
  ticks = ticks.map(o => {
    o.value = 1 - o.value
    return o
  })
  return ticks.reverse()
}

const spacetimeTicks = function(start, end, n = 6) {
  let reverse = false
  start = spacetime(start)
  end = spacetime(end)
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    reverse = true
    let tmp = start.epoch
    start.epoch = end.epoch
    end.epoch = tmp
  }
  // nudge first one back 1 minute
  if (start.time() === '12:00am') {
    start = start.minus(1, 'minute')
  }
  let ticks = chooseMethod(start, end, n)
  //support backwards ticks
  if (reverse === true) {
    ticks = reverseTicks(ticks)
  }
  return ticks
}
spacetimeTicks.version = version

module.exports = spacetimeTicks

},{"../_version":221,"./methods":224,"spacetime":225}],224:[function(_dereq_,module,exports){
const reduceTo = _dereq_('./_reduce')

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = []
  start = start.add(1, unit)
  start = start.startOf(unit)
  while (start.isBefore(end)) {
    ticks.push(start)
    start = start.add(1, unit)
  }
  return ticks
}

const formatTicks = function(arr, fmt, start, end) {
  let delta = end.epoch - start.epoch
  return arr.map(s => {
    let percent = (s.epoch - start.epoch) / delta
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
}

const methods = {
  centuries: (start, end, n) => {
    let ticks = allTicks(start, end, 'century')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  decades: (start, end, n) => {
    let ticks = allTicks(start, end, 'decade')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  years: (start, end, n) => {
    let ticks = allTicks(start, end, 'year')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {year-short}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  months: (start, end, n) => {
    let ticks = allTicks(start, end, 'month')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  days: (start, end, n) => {
    let ticks = allTicks(start, end, 'day')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  hours: (start, end, n) => {
    let ticks = allTicks(start, end, 'hour')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  minutes: (start, end, n) => {
    let ticks = allTicks(start, end, 'minute')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  }
}
module.exports = methods

},{"./_reduce":222}],225:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.spacetime = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var fns = createCommonjsModule(function (module, exports) {
	  //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
	  exports.isLeapYear = function (year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	  }; // unsurprisingly-nasty `typeof date` call


	  exports.isDate = function (d) {
	    return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
	  };

	  exports.isArray = function (input) {
	    return Object.prototype.toString.call(input) === '[object Array]';
	  };

	  exports.isObject = function (input) {
	    return Object.prototype.toString.call(input) === '[object Object]';
	  };

	  exports.zeroPad = function (str) {
	    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	    var pad = '0';
	    str = str + '';
	    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
	  };

	  exports.titleCase = function (str) {
	    if (!str) {
	      return '';
	    }

	    return str[0].toUpperCase() + str.substr(1);
	  };

	  exports.ordinal = function (i) {
	    var j = i % 10;
	    var k = i % 100;

	    if (j === 1 && k !== 11) {
	      return i + 'st';
	    }

	    if (j === 2 && k !== 12) {
	      return i + 'nd';
	    }

	    if (j === 3 && k !== 13) {
	      return i + 'rd';
	    }

	    return i + 'th';
	  }; //strip 'st' off '1st'..


	  exports.toCardinal = function (str) {
	    str = String(str);
	    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
	    return parseInt(str, 10);
	  }; //used mostly for cleanup of unit names, like 'months'


	  exports.normalize = function () {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    str = str.toLowerCase().trim();
	    str = str.replace(/ies$/, 'y'); //'centuries'

	    str = str.replace(/s$/, '');
	    str = str.replace(/-/g, '');

	    if (str === 'day') {
	      return 'date';
	    }

	    return str;
	  };

	  exports.getEpoch = function (tmp) {
	    //support epoch
	    if (typeof tmp === 'number') {
	      return tmp;
	    } //suport date objects


	    if (exports.isDate(tmp)) {
	      return tmp.getTime();
	    }

	    if (tmp.epoch) {
	      return tmp.epoch;
	    }

	    return null;
	  }; //make sure this input is a spacetime obj


	  exports.beADate = function (d, s) {
	    if (exports.isObject(d) === false) {
	      return s.clone().set(d);
	    }

	    return d;
	  };

	  exports.formatTimezone = function (offset) {
	    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var absOffset = Math.abs(offset);
	    var sign = offset > 0 ? '+' : '-';
	    return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
	  };
	});
	var fns_1 = fns.isLeapYear;
	var fns_2 = fns.isDate;
	var fns_3 = fns.isArray;
	var fns_4 = fns.isObject;
	var fns_5 = fns.zeroPad;
	var fns_6 = fns.titleCase;
	var fns_7 = fns.ordinal;
	var fns_8 = fns.toCardinal;
	var fns_9 = fns.normalize;
	var fns_10 = fns.getEpoch;
	var fns_11 = fns.beADate;
	var fns_12 = fns.formatTimezone;

	var zeroPad = fns.zeroPad;

	var toString = function toString(d) {
	  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
	}; // a timezone will begin with a specific offset in january
	// then some will switch to something else between november-march


	var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
	  //note: this has a cray order-of-operations issue
	  //we can't get the date, without knowing the timezone, and vice-versa
	  //it's possible that we can miss a dst-change by a few hours.
	  var d = new Date(epoch); //(try to mediate this a little?)

	  var bias = d.getTimezoneOffset() || 0;
	  var shift = bias + defaultOffset * 60; //in minutes

	  shift = shift * 60 * 1000; //in ms

	  d = new Date(epoch + shift);
	  var current = toString(d); //eg. is it after ~november?

	  if (current >= start) {
	    //eg. is it before ~march~ too?
	    if (current < end) {
	      return true;
	    }
	  }

	  return false;
	};

	var summerTime = shouldChange;

	// it reproduces some things in ./index.js, but speeds up spacetime considerably

	var quickOffset = function quickOffset(s) {
	  var zones = s.timezones;
	  var obj = zones[s.tz];

	  if (obj === undefined) {
	    console.warn("Warning: couldn't find timezone " + s.tz);
	    return 0;
	  }

	  if (obj.dst === undefined) {
	    return obj.offset;
	  } //get our two possible offsets


	  var jul = obj.offset;
	  var dec = obj.offset + 1; // assume it's the same for now

	  if (obj.hem === 'n') {
	    dec = jul - 1;
	  }

	  var split = obj.dst.split('->');
	  var inSummer = summerTime(s.epoch, split[0], split[1], jul);

	  if (inSummer === true) {
	    return jul;
	  }

	  return dec;
	};

	var quick = quickOffset;

	var _build = {
		"9|s": "2/dili,2/jayapura",
		"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
		"9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
		"9.5|s": "4/darwin,4/north",
		"8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
		"8|n|03/25:03->09/29:23": "2/ulan_bator",
		"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
		"8.75|s": "4/eucla",
		"7|s": "12/davis,2/jakarta,9/christmas",
		"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
		"6|s": "12/vostok",
		"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
		"6.5|n": "2/rangoon,9/cocos",
		"5|s": "12/mawson,9/kerguelen",
		"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
		"5.75|n": "2/kathmandu,2/katmandu",
		"5.5|n": "2/calcutta,2/colombo,2/kolkata",
		"4|s": "9/reunion",
		"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
		"4.5|n|03/22:00->09/21:24": "2/tehran",
		"4.5|n": "2/kabul",
		"3|s": "12/syowa,9/antananarivo",
		"3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
		"3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
		"3|n|03/31:00->10/26:24": "2/beirut",
		"3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
		"3|n|03/29:00->10/26:01": "2/gaza,2/hebron",
		"3|n|03/29:00->10/25:01": "2/amman",
		"3|n|03/29:00->10/24:24": "2/damascus",
		"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
		"2|s|03/31:02->10/27:02": "12/troll",
		"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
		"2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
		"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
		"1|s|04/02:01->09/03:03": "0/windhoek",
		"1|s": "0/kinshasa,0/luanda",
		"1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
		"1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
		"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
		"14|n": "11/kiritimati",
		"13|s|04/07:04->09/29:03": "11/apia",
		"13|s|01/15:02->11/05:03": "11/tongatapu",
		"13|n": "11/enderbury,11/fakaofo",
		"12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
		"12|s|01/13:03->11/03:02": "11/fiji",
		"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
		"12.75|s|04/07:03->04/07:02": "11/chatham",
		"11|s": "12/macquarie,11/bougainville",
		"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
		"11.5|n": "11/norfolk",
		"10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
		"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
		"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
		"10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
		"0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
		"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
		"-9|n|03/10:02->11/03:02": "1/adak,1/atka",
		"-9|n": "11/gambier",
		"-9.5|n": "11/marquesas",
		"-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
		"-8|n": "11/pitcairn",
		"-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
		"-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
		"-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
		"-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
		"-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
		"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
		"-5|s": "1/lima,1/rio_branco,5/acre",
		"-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
		"-5|n|03/12:03->11/05:01": "1/north_dakota",
		"-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
		"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
		"-4|s|05/13:23->08/13:01": "12/palmer",
		"-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
		"-4|s|03/23:24->10/06:00": "1/asuncion",
		"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
		"-4|s": "1/la_paz,1/manaus,5/west",
		"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
		"-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
		"-4|n|03/10:00->11/03:01": "1/havana",
		"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
		"-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
		"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
		"-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
		"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
		"-2|s": "5/denoronha",
		"-2|n|03/30:22->10/26:23": "1/godthab",
		"-2|n|03/10:02->11/03:02": "1/miquelon",
		"-2|n": "1/noronha,3/south_georgia",
		"-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
		"-1|n": "3/cape_verde",
		"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
		"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
	};

	var _build$1 = /*#__PURE__*/Object.freeze({
		'default': _build
	});

	//prefixes for iana names..
	var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

	var data = getCjsExportFromNamespace(_build$1);

	var all = {};
	Object.keys(data).forEach(function (k) {
	  var split = k.split('|');
	  var obj = {
	    offset: Number(split[0]),
	    hem: split[1]
	  };

	  if (split[2]) {
	    obj.dst = split[2];
	  }

	  var names = data[k].split(',');
	  names.forEach(function (str) {
	    str = str.replace(/(^[0-9]+)\//, function (before, num) {
	      num = Number(num);
	      return _prefixes[num] + '/';
	    });
	    all[str] = obj;
	  });
	});
	all['utc'] = {
	  offset: 0,
	  hem: 'n' //(sorry)

	}; //add etc/gmt+n

	for (var i = -14; i <= 14; i += 0.5) {
	  var num = i;

	  if (num > 0) {
	    num = '+' + num;
	  }

	  var name = 'etc/gmt' + num;
	  all[name] = {
	    offset: i * -1,
	    //they're negative!
	    hem: 'n' //(sorry)

	  };
	  name = 'utc/gmt' + num; //this one too, why not.

	  all[name] = {
	    offset: i * -1,
	    hem: 'n'
	  };
	} // console.log(all)
	// console.log(Object.keys(all).length)


	var unpack = all;

	//find the implicit iana code for this machine.
	//safely query the Intl object
	//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
	var fallbackTZ = 'utc'; //
	//this Intl object is not supported often, yet

	var safeIntl = function safeIntl() {
	  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
	    return null;
	  }

	  var format = Intl.DateTimeFormat();

	  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
	    return null;
	  }

	  var timezone = format.resolvedOptions().timeZone;

	  if (!timezone) {
	    return null;
	  }

	  return timezone.toLowerCase();
	};

	var guessTz = function guessTz() {
	  var timezone = safeIntl();

	  if (timezone === null) {
	    return fallbackTZ;
	  }

	  return timezone;
	}; //do it once per computer


	var guessTz_1 = guessTz;

	var isOffset = /(\-?[0-9]+)h(rs)?/i;
	var isNumber = /(\-?[0-9]+)/;
	var utcOffset = /utc([\-+]?[0-9]+)/i;
	var gmtOffset = /gmt([\-+]?[0-9]+)/i;

	var toIana = function toIana(num) {
	  num = Number(num);

	  if (num > -13 && num < 13) {
	    num = num * -1; //it's opposite!

	    num = (num > 0 ? '+' : '') + num; //add plus sign

	    return 'etc/gmt' + num;
	  }

	  return null;
	};

	var parseOffset = function parseOffset(tz) {
	  // '+5hrs'
	  var m = tz.match(isOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'utc+5'


	  m = tz.match(utcOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'GMT-5' (not opposite)


	  m = tz.match(gmtOffset);

	  if (m !== null) {
	    var num = Number(m[1]) * -1;
	    return toIana(num);
	  } // '+5'


	  m = tz.match(isNumber);

	  if (m !== null) {
	    return toIana(m[1]);
	  }

	  return null;
	};

	var parseOffset_1 = parseOffset;

	var local = guessTz_1(); //add all the city names by themselves

	var cities = Object.keys(unpack).reduce(function (h, k) {
	  var city = k.split('/')[1] || '';
	  city = city.replace(/_/g, ' ');
	  h[city] = k;
	  return h;
	}, {}); //try to match these against iana form

	var normalize = function normalize(tz) {
	  tz = tz.replace(/ time/g, '');
	  tz = tz.replace(/ (standard|daylight|summer)/g, '');
	  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
	  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
	  tz = tz.replace(/\beuropean/g, 'europe');
	  tz = tz.replace(/\islands/g, 'island');
	  return tz;
	}; // try our best to reconcile the timzone to this given string


	var lookupTz = function lookupTz(str, zones) {
	  if (!str) {
	    return local;
	  }

	  var tz = str.trim();
	  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

	  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
	    tz = split[0] + '/' + split[1];
	  }

	  tz = tz.toLowerCase();

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //lookup more loosely..


	  tz = normalize(tz);

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //try city-names


	  if (cities.hasOwnProperty(tz) === true) {
	    return cities[tz];
	  } // //try to parse '-5h'


	  if (/[0-9]/.test(tz) === true) {
	    var id = parseOffset_1(tz);

	    if (id) {
	      return id;
	    }
	  }

	  throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
	};

	var find = lookupTz;

	var o = {
	  millisecond: 1
	};
	o.second = 1000;
	o.minute = 60000;
	o.hour = 3.6e6; // dst is supported post-hoc

	o.day = 8.64e7; //

	o.date = o.day;
	o.month = 8.64e7 * 29.5; //(average)

	o.week = 6.048e8;
	o.year = 3.154e10; // leap-years are supported post-hoc
	//add plurals

	Object.keys(o).forEach(function (k) {
	  o[k + 's'] = o[k];
	});
	var milliseconds = o;

	var walk = function walk(s, n, fn, unit, previous) {
	  var current = s.d[fn]();

	  if (current === n) {
	    return; //already there
	  }

	  var startUnit = previous === null ? null : s.d[previous]();
	  var original = s.epoch; //try to get it as close as we can

	  var diff = n - current;
	  s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

	  if (unit === 'day' && Math.abs(diff) > 28) {
	    //but don't push it over a month
	    if (n < 28) {
	      s.epoch += milliseconds.hour;
	    }
	  } //repair it if we've gone too far or something
	  //(go by half-steps, just in case)


	  var halfStep = milliseconds[unit] / 2;

	  while (s.d[fn]() < n) {
	    s.epoch += halfStep;
	  }

	  while (s.d[fn]() > n) {
	    s.epoch -= halfStep;
	  } //oops, did we change previous unit? revert it.


	  if (previous !== null && startUnit !== s.d[previous]()) {
	    // console.warn('spacetime warning: missed setting ' + unit)
	    s.epoch = original; // i mean, but make it close...

	    s.epoch += milliseconds[unit] * diff * 0.97; // i guess?
	  }
	}; //find the desired date by a increment/check while loop


	var units = {
	  year: {
	    valid: function valid(n) {
	      return n > -4000 && n < 4000;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getFullYear', 'year', null);
	    }
	  },
	  month: {
	    valid: function valid(n) {
	      return n >= 0 && n <= 11;
	    },
	    walkTo: function walkTo(s, n) {
	      var d = s.d;
	      var current = d.getMonth();
	      var original = s.epoch;
	      var startUnit = d.getYear();

	      if (current === n) {
	        return;
	      } //try to get it as close as we can..


	      var diff = n - current;
	      s.epoch += milliseconds.day * (diff * 28); //special case
	      //oops, did we change the year? revert it.

	      if (startUnit !== s.d.getYear()) {
	        s.epoch = original;
	      } //incriment by day


	      while (s.d.getMonth() < n) {
	        s.epoch += milliseconds.day;
	      }

	      while (s.d.getMonth() > n) {
	        s.epoch -= milliseconds.day;
	      }
	    }
	  },
	  date: {
	    valid: function valid(n) {
	      return n > 0 && n <= 31;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getDate', 'day', 'getMonth');
	    }
	  },
	  hour: {
	    valid: function valid(n) {
	      return n >= 0 && n < 24;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getHours', 'hour', 'getDate');
	    }
	  },
	  minute: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getMinutes', 'minute', 'getHours');
	    }
	  },
	  second: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.seconds(n).epoch;
	    }
	  },
	  millisecond: {
	    valid: function valid(n) {
	      return n >= 0 && n < 1000;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.milliseconds(n).epoch;
	    }
	  }
	};

	var walkTo = function walkTo(s, wants) {
	  var keys = Object.keys(units);
	  var old = s.clone();

	  for (var i = 0; i < keys.length; i++) {
	    var k = keys[i];
	    var n = wants[k];

	    if (n === undefined) {
	      n = old[k]();
	    }

	    if (typeof n === 'string') {
	      n = parseInt(n, 10);
	    } //make-sure it's valid


	    if (!units[k].valid(n)) {
	      s.epoch = null;

	      if (s.silent === false) {
	        console.warn('invalid ' + k + ': ' + n);
	      }

	      return;
	    } // console.log(k, n)


	    units[k].walkTo(s, n);
	  }

	  return;
	};

	var walk_1 = walkTo;

	var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
	var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

	function buildMapping() {
	  var obj = {
	    sep: 8 //support this format

	  };

	  for (var i = 0; i < shortMonths.length; i++) {
	    obj[shortMonths[i]] = i;
	  }

	  for (var _i = 0; _i < longMonths.length; _i++) {
	    obj[longMonths[_i]] = _i;
	  }

	  return obj;
	}

	var months = {
	  "short": function short() {
	    return shortMonths;
	  },
	  "long": function long() {
	    return longMonths;
	  },
	  mapping: function mapping() {
	    return buildMapping();
	  },
	  set: function set(i18n) {
	    shortMonths = i18n["short"] || shortMonths;
	    longMonths = i18n["long"] || longMonths;
	  }
	};

	//pull-apart ISO offsets, like "+0100"
	var parseOffset$1 = function parseOffset(s, offset) {
	  if (!offset) {
	    return s;
	  } //this is a fancy-move


	  if (offset === 'Z') {
	    offset = '+0000';
	  } // according to ISO8601, tz could be hh:mm, hhmm or hh
	  // so need few more steps before the calculation.


	  var num = 0; // for (+-)hh:mm

	  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
	    //support "+01:00"
	    if (/:00/.test(offset) === true) {
	      offset = offset.replace(/:00/, '');
	    } //support "+01:30"


	    if (/:30/.test(offset) === true) {
	      offset = offset.replace(/:30/, '.5');
	    }
	  } // for (+-)hhmm


	  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
	    offset = offset.replace(/30$/, '.5');
	  }

	  num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

	  if (Math.abs(num) > 100) {
	    num = num / 100;
	  } //okay, try to match it to a utc timezone
	  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
	  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


	  num *= -1;

	  if (num >= 0) {
	    num = '+' + num;
	  }

	  var tz = 'etc/gmt' + num;
	  var zones = s.timezones;

	  if (zones[tz]) {
	    // log a warning if we're over-writing a given timezone?
	    // console.log('changing timezone to: ' + tz)
	    s.tz = tz;
	  }

	  return s;
	};

	var parseOffset_1$1 = parseOffset$1;

	var parseTime = function parseTime(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  str = str.replace(/^\s+/, '').toLowerCase(); //trim
	  //formal time formats - 04:30.23

	  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

	  if (arr !== null) {
	    //validate it a little
	    var h = Number(arr[1]);

	    if (h < 0 || h > 24) {
	      return s.startOf('day');
	    }

	    var m = Number(arr[2]); //don't accept '5:3pm'

	    if (arr[2].length < 2 || m < 0 || m > 59) {
	      return s.startOf('day');
	    }

	    s = s.hour(h);
	    s = s.minute(m);
	    s = s.seconds(arr[3] || 0);
	    s = s.millisecond(arr[4] || 0); //parse-out am/pm

	    var ampm = str.match(/[\b0-9](am|pm)\b/);

	    if (ampm !== null && ampm[1]) {
	      s = s.ampm(ampm[1]);
	    }

	    return s;
	  } //try an informal form - 5pm (no minutes)


	  arr = str.match(/([0-9]+) ?(am|pm)/);

	  if (arr !== null && arr[1]) {
	    var _h = Number(arr[1]); //validate it a little..


	    if (_h > 12 || _h < 1) {
	      return s.startOf('day');
	    }

	    s = s.hour(arr[1] || 0);
	    s = s.ampm(arr[2]);
	    s = s.startOf('hour');
	    return s;
	  } //no time info found, use start-of-day


	  s = s.startOf('day');
	  return s;
	};

	var parseTime_1 = parseTime;

	var monthLengths = [31, // January - 31 days
	28, // February - 28 days in a common year and 29 days in leap years
	31, // March - 31 days
	30, // April - 30 days
	31, // May - 31 days
	30, // June - 30 days
	31, // July - 31 days
	31, // August - 31 days
	30, // September - 30 days
	31, // October - 31 days
	30, // November - 30 days
	31 // December - 31 days
	];
	var monthLengths_1 = monthLengths;

	var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

	var hasDate = function hasDate(obj) {
	  //invalid values
	  if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
	    return false;
	  } //support leap-year in february


	  if (obj.month === 1) {
	    if (isLeapYear(obj.year) && obj.date <= 29) {
	      return true;
	    } else {
	      return obj.date <= 28;
	    }
	  } //is this date too-big for this month?


	  var max = monthLengths_1[obj.month] || 0;

	  if (obj.date <= max) {
	    return true;
	  }

	  return false;
	};

	var hasDate_1 = hasDate;

	var months$1 = months.mapping();

	var parseYear = function parseYear() {
	  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  //support '18 -> 2018
	  // str = str.replace(/^'([0-9]{2})/, '20$1')
	  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
	  var year = parseInt(str.trim(), 10);
	  year = year || new Date().getFullYear();
	  return year;
	};

	var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
	{
	  reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
	  parse: function parse(s, arr, givenTz, options) {
	    var month = parseInt(arr[2], 10) - 1;
	    var obj = {
	      year: arr[1],
	      month: month,
	      date: arr[3]
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    parseOffset_1$1(s, arr[5]);
	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //iso "2015-03-25" or "2015/03/25" //0-based-months!
	{
	  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
	  parse: function parse(s, arr) {
	    var obj = {
	      year: arr[1],
	      month: parseInt(arr[2], 10) - 1,
	      date: parseInt(arr[3], 10)
	    };

	    if (obj.month >= 12) {
	      //support yyyy/dd/mm (weird, but ok)
	      obj.date = parseInt(arr[2], 10);
	      obj.month = parseInt(arr[3], 10) - 1;
	    }

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //short - uk "03/25/2015"  //0-based-months!
	{
	  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
	  parse: function parse(s, arr) {
	    var month = parseInt(arr[1], 10) - 1;
	    var date = parseInt(arr[2], 10); //support dd/mm/yyy

	    if (s.british || month >= 12) {
	      date = parseInt(arr[1], 10);
	      month = parseInt(arr[2], 10) - 1;
	    }

	    var year = arr[3] || new Date().getFullYear();
	    var obj = {
	      year: year,
	      month: month,
	      date: date
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //common british format - "25-feb-2015"
	{
	  reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[2].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[1] || '')
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //Long "Mar 25 2015"
	//February 22, 2017 15:30:00
	{
	  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[2] || '')
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //February 2017 (implied date)
	{
	  reg: /^([a-z]+) ([0-9]{4})$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[2]);
	    var obj = {
	      year: year,
	      month: month,
	      date: 1
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //Long "25 Mar 2015"
	{
	  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[2].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[1])
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '1992'
	  reg: /^[0-9]{4}$/i,
	  parse: function parse(s, arr) {
	    var year = parseYear(arr[0]);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '200bc'
	  reg: /^[0-9,]+ ?b\.?c\.?$/i,
	  parse: function parse(s, arr) {
	    var str = arr[0] || ''; //make negative-year

	    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

	    str = str.replace(/,/g, '');
	    var year = parseInt(str.trim(), 10);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}];
	var strParse = strFmt;

	var dates = {
	  now: function now(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tonight: function tonight(s) {
	    s.epoch = Date.now();
	    s = s.hour(18);
	    return s;
	  },
	  today: function today(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tomorrow: function tomorrow(s) {
	    s.epoch = Date.now();
	    s = s.add(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  yesterday: function yesterday(s) {
	    s.epoch = Date.now();
	    s = s.subtract(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  christmas: function christmas(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

	    return s;
	  },
	  'new years': function newYears(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

	    return s;
	  }
	};
	dates['new years eve'] = dates['new years'];
	var namedDates = dates;

	//  -  can't use built-in js parser ;(
	//=========================================
	// ISO Date	  "2015-03-25"
	// Short Date	"03/25/2015" or "2015/03/25"
	// Long Date	"Mar 25 2015" or "25 Mar 2015"
	// Full Date	"Wednesday March 25 2015"
	//=========================================
	//-- also -
	// if the given epoch is really small, they've probably given seconds and not milliseconds
	// anything below this number is likely (but not necessarily) a mistaken input.
	// this may seem like an arbitrary number, but it's 'within jan 1970'
	// this is only really ambiguous until 2054 or so

	var minimumEpoch = 2500000000;
	var defaults = {
	  year: new Date().getFullYear(),
	  month: 0,
	  date: 1
	}; //support [2016, 03, 01] format

	var handleArray = function handleArray(s, arr) {
	  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

	  for (var i = 0; i < order.length; i++) {
	    var num = arr[i] || defaults[order[i]] || 0;
	    s = s[order[i]](num);
	  }

	  return s;
	}; //support {year:2016, month:3} format


	var handleObject = function handleObject(s, obj) {
	  obj = Object.assign({}, defaults, obj);
	  var keys = Object.keys(obj);

	  for (var i = 0; i < keys.length; i++) {
	    var unit = keys[i]; //make sure we have this method

	    if (s[unit] === undefined || typeof s[unit] !== 'function') {
	      continue;
	    } //make sure the value is a number


	    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
	      continue;
	    }

	    var num = obj[unit] || defaults[unit] || 0;
	    s = s[unit](num);
	  }

	  return s;
	}; //find the epoch from different input styles


	var parseInput = function parseInput(s, input, givenTz) {
	  //if we've been given a epoch number, it's easy
	  if (typeof input === 'number') {
	    if (input > 0 && input < minimumEpoch && s.silent === false) {
	      console.warn('  - Warning: You are setting the date to January 1970.');
	      console.warn('       -   did input seconds instead of milliseconds?');
	    }

	    s.epoch = input;
	    return s;
	  } //set tmp time


	  s.epoch = Date.now();

	  if (input === null || input === undefined) {
	    return s; //k, we're good.
	  } //support input of Date() object


	  if (fns.isDate(input) === true) {
	    s.epoch = input.getTime();
	    return s;
	  } //support [2016, 03, 01] format


	  if (fns.isArray(input) === true) {
	    s = handleArray(s, input);
	    return s;
	  } //support {year:2016, month:3} format


	  if (fns.isObject(input) === true) {
	    //support spacetime object as input
	    if (input.epoch) {
	      s.epoch = input.epoch;
	      s.tz = input.tz;
	      return s;
	    }

	    s = handleObject(s, input);
	    return s;
	  } //input as a string..


	  if (typeof input !== 'string') {
	    return s;
	  } //little cleanup..


	  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
	  input = input.replace(/,/g, '');
	  input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

	  if (namedDates.hasOwnProperty(input) === true) {
	    s = namedDates[input](s);
	    return s;
	  } //try each text-parse template, use the first good result


	  for (var i = 0; i < strParse.length; i++) {
	    var m = input.match(strParse[i].reg);

	    if (m) {
	      s = strParse[i].parse(s, m, givenTz);
	      return s;
	    }
	  }

	  if (s.silent === false) {
	    console.warn("Warning: couldn't parse date-string: '" + input + "'");
	  }

	  s.epoch = null;
	  return s;
	};

	var input = parseInput;

	var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var days = {
	  "short": function short() {
	    return shortDays;
	  },
	  "long": function long() {
	    return longDays;
	  },
	  set: function set(i18n) {
	    shortDays = i18n["short"] || shortDays;
	    longDays = i18n["long"] || longDays;
	  }
	};

	// it's kind of nuts how involved this is
	// "+01:00", "+0100", or simply "+01"

	var isoOffset = function isoOffset(s) {
	  var offset = s.timezone().current.offset;
	  var isNegative = offset < 0;
	  var minute = '00'; //handle 5.5 → '5:30'

	  if (Math.abs(offset % 1) === 0.5) {
	    minute = '30';

	    if (offset >= 0) {
	      offset = Math.floor(offset);
	    } else {
	      offset = Math.ceil(offset);
	    }
	  }

	  if (isNegative) {
	    //handle negative sign
	    offset *= -1;
	    offset = fns.zeroPad(offset, 2);
	    offset = '-' + offset;
	  } else {
	    offset = fns.zeroPad(offset, 2);
	    offset = '+' + offset;
	  }

	  offset = offset + ':' + minute; //'Z' means 00

	  if (offset === '+00:00') {
	    offset = 'Z';
	  }

	  return offset;
	};

	var _offset = isoOffset;

	var format = {
	  day: function day(s) {
	    return fns.titleCase(s.dayName());
	  },
	  'day-short': function dayShort(s) {
	    return fns.titleCase(days["short"]()[s.day()]);
	  },
	  'day-number': function dayNumber(s) {
	    return s.day();
	  },
	  'day-ordinal': function dayOrdinal(s) {
	    return fns.ordinal(s.day());
	  },
	  'day-pad': function dayPad(s) {
	    return fns.zeroPad(s.day());
	  },
	  date: function date(s) {
	    return s.date();
	  },
	  'date-ordinal': function dateOrdinal(s) {
	    return fns.ordinal(s.date());
	  },
	  'date-pad': function datePad(s) {
	    return fns.zeroPad(s.date());
	  },
	  month: function month(s) {
	    return fns.titleCase(s.monthName());
	  },
	  'month-short': function monthShort(s) {
	    return fns.titleCase(months["short"]()[s.month()]);
	  },
	  'month-number': function monthNumber(s) {
	    return s.month();
	  },
	  'month-ordinal': function monthOrdinal(s) {
	    return fns.ordinal(s.month());
	  },
	  'month-pad': function monthPad(s) {
	    return fns.zeroPad(s.month());
	  },
	  'iso-month': function isoMonth(s) {
	    return fns.zeroPad(s.month() + 1);
	  },
	  //1-based months
	  year: function year(s) {
	    var year = s.year();

	    if (year > 0) {
	      return year;
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'year-short': function yearShort(s) {
	    var year = s.year();

	    if (year > 0) {
	      return "'".concat(String(s.year()).substr(2, 4));
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'iso-year': function isoYear(s) {
	    var year = s.year();
	    var isNegative = year < 0;
	    var str = fns.zeroPad(Math.abs(year), 4); //0-padded

	    if (isNegative) {
	      //negative years are for some reason 6-digits ('-00008')
	      str = fns.zeroPad(str, 6);
	      str = '-' + str;
	    }

	    return str;
	  },
	  time: function time(s) {
	    return s.time();
	  },
	  'time-24': function time24(s) {
	    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
	  },
	  hour: function hour(s) {
	    return s.hour12();
	  },
	  'hour-pad': function hourPad(s) {
	    return fns.zeroPad(s.hour12());
	  },
	  'hour-24': function hour24(s) {
	    return s.hour24();
	  },
	  'hour-24-pad': function hour24Pad(s) {
	    return fns.zeroPad(s.hour24());
	  },
	  minute: function minute(s) {
	    return s.minute();
	  },
	  'minute-pad': function minutePad(s) {
	    return fns.zeroPad(s.minute());
	  },
	  second: function second(s) {
	    return s.second();
	  },
	  'second-pad': function secondPad(s) {
	    return fns.zeroPad(s.second());
	  },
	  ampm: function ampm(s) {
	    return s.ampm();
	  },
	  quarter: function quarter(s) {
	    return 'Q' + s.quarter();
	  },
	  season: function season(s) {
	    return s.season();
	  },
	  era: function era(s) {
	    return s.era();
	  },
	  timezone: function timezone(s) {
	    return s.timezone().name;
	  },
	  offset: function offset(s) {
	    return _offset(s);
	  },
	  numeric: function numeric(s) {
	    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  // yyyy/mm/dd
	  'numeric-us': function numericUs(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
	  },
	  // mm/dd/yyyy
	  'numeric-uk': function numericUk(s) {
	    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
	  },
	  //dd/mm/yyyy
	  'mm/dd': function mmDd(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  //mm/dd
	  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
	  iso: function iso(s) {
	    var year = s.format('iso-year');
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    var hour = fns.zeroPad(s.h24());
	    var minute = fns.zeroPad(s.minute());
	    var second = fns.zeroPad(s.second());
	    var ms = fns.zeroPad(s.millisecond(), 3);
	    var offset = _offset(s);
	    return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
	  },
	  'iso-short': function isoShort(s) {
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
	  },
	  'iso-utc': function isoUtc(s) {
	    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
	  },
	  //i made these up
	  nice: function nice(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  },
	  'nice-year': function niceYear(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
	  },
	  'nice-day': function niceDay(s) {
	    return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
	  },
	  'nice-full': function niceFull(s) {
	    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  }
	}; //aliases

	var aliases = {
	  'day-name': 'day',
	  'month-name': 'month',
	  'iso 8601': 'iso',
	  'time-h24': 'time-24',
	  'time-12': 'time',
	  'time-h12': 'time',
	  tz: 'timezone',
	  'day-num': 'day-number',
	  'month-num': 'month-number',
	  'month-iso': 'iso-month',
	  'year-iso': 'iso-year',
	  'nice-short': 'nice',
	  mdy: 'numeric-us',
	  dmy: 'numeric-uk',
	  ymd: 'numeric',
	  'yyyy/mm/dd': 'numeric',
	  'mm/dd/yyyy': 'numeric-us',
	  'dd/mm/yyyy': 'numeric-us',
	  'little-endian': 'numeric-uk',
	  'big-endian': 'numeric',
	  'day-nice': 'nice-day'
	};
	Object.keys(aliases).forEach(function (k) {
	  return format[k] = format[aliases[k]];
	});

	var printFormat = function printFormat(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  //don't print anything if it's an invalid date
	  if (s.isValid() !== true) {
	    return '';
	  } //support .format('month')


	  if (format.hasOwnProperty(str)) {
	    var out = String(format[str](s) || '');

	    if (str !== 'ampm') {
	      out = fns.titleCase(out);
	    }

	    return out;
	  } //support '{hour}:{minute}' notation


	  if (str.indexOf('{') !== -1) {
	    var sections = /\{(.+?)\}/g;
	    str = str.replace(sections, function (_, fmt) {
	      fmt = fmt.toLowerCase().trim();

	      if (format.hasOwnProperty(fmt)) {
	        return String(format[fmt](s) || '');
	      }

	      return '';
	    });
	    return str;
	  }

	  return s.format('iso-short');
	};

	var format_1 = printFormat;

	var pad = fns.zeroPad;
	var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
	//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
	//time-symbols we support

	var mapping = {
	  G: function G(s) {
	    return s.era();
	  },
	  GG: function GG(s) {
	    return s.era();
	  },
	  GGG: function GGG(s) {
	    return s.era();
	  },
	  GGGG: function GGGG(s) {
	    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
	  },
	  //year
	  y: function y(s) {
	    return s.year();
	  },
	  yy: function yy(s) {
	    //last two chars
	    return parseInt(String(s.year()).substr(2, 4), 10);
	  },
	  yyy: function yyy(s) {
	    return s.year();
	  },
	  yyyy: function yyyy(s) {
	    return s.year();
	  },
	  yyyyy: function yyyyy(s) {
	    return '0' + s.year();
	  },
	  // u: (s) => {},//extended non-gregorian years
	  //quarter
	  Q: function Q(s) {
	    return s.quarter();
	  },
	  QQ: function QQ(s) {
	    return s.quarter();
	  },
	  QQQ: function QQQ(s) {
	    return s.quarter();
	  },
	  QQQQ: function QQQQ(s) {
	    return s.quarter();
	  },
	  //month
	  M: function M(s) {
	    return s.month() + 1;
	  },
	  MM: function MM(s) {
	    return pad(s.month() + 1);
	  },
	  MMM: function MMM(s) {
	    return s.format('month-short');
	  },
	  MMMM: function MMMM(s) {
	    return s.format('month');
	  },
	  //week
	  w: function w(s) {
	    return s.week();
	  },
	  ww: function ww(s) {
	    return pad(s.week());
	  },
	  //week of month
	  // W: (s) => s.week(),
	  //date of month
	  d: function d(s) {
	    return s.date();
	  },
	  dd: function dd(s) {
	    return pad(s.date());
	  },
	  //date of year
	  D: function D(s) {
	    return s.dayOfYear();
	  },
	  DD: function DD(s) {
	    return pad(s.dayOfYear());
	  },
	  DDD: function DDD(s) {
	    return pad(s.dayOfYear(), 3);
	  },
	  // F: (s) => {},//date of week in month
	  // g: (s) => {},//modified julian day
	  //day
	  E: function E(s) {
	    return s.format('day-short');
	  },
	  EE: function EE(s) {
	    return s.format('day-short');
	  },
	  EEE: function EEE(s) {
	    return s.format('day-short');
	  },
	  EEEE: function EEEE(s) {
	    return s.format('day');
	  },
	  EEEEE: function EEEEE(s) {
	    return s.format('day')[0];
	  },
	  e: function e(s) {
	    return s.day();
	  },
	  ee: function ee(s) {
	    return s.day();
	  },
	  eee: function eee(s) {
	    return s.format('day-short');
	  },
	  eeee: function eeee(s) {
	    return s.format('day');
	  },
	  eeeee: function eeeee(s) {
	    return s.format('day')[0];
	  },
	  //am/pm
	  a: function a(s) {
	    return s.ampm().toUpperCase();
	  },
	  aa: function aa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaa: function aaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaaa: function aaaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  //hour
	  h: function h(s) {
	    return s.h12();
	  },
	  hh: function hh(s) {
	    return pad(s.h12());
	  },
	  H: function H(s) {
	    return s.hour();
	  },
	  HH: function HH(s) {
	    return pad(s.hour());
	  },
	  // j: (s) => {},//weird hour format
	  m: function m(s) {
	    return s.minute();
	  },
	  mm: function mm(s) {
	    return pad(s.minute());
	  },
	  s: function s(_s) {
	    return _s.second();
	  },
	  ss: function ss(s) {
	    return pad(s.second());
	  },
	  //milliseconds in the day
	  A: function A(s) {
	    return s.epoch - s.startOf('day').epoch;
	  },
	  //timezone
	  z: function z(s) {
	    return s.timezone().name;
	  },
	  zz: function zz(s) {
	    return s.timezone().name;
	  },
	  zzz: function zzz(s) {
	    return s.timezone().name;
	  },
	  zzzz: function zzzz(s) {
	    return s.timezone().name;
	  },
	  Z: function Z(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZ: function ZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZ: function ZZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZZ: function ZZZZ(s) {
	    return formatTimezone(s.timezone().current.offset, ':');
	  }
	};

	var addAlias = function addAlias(_char, to, n) {
	  var name = _char;
	  var toName = to;

	  for (var i = 0; i < n; i += 1) {
	    mapping[name] = mapping[toName];
	    name += _char;
	    toName += to;
	  }
	};

	addAlias('q', 'Q', 4);
	addAlias('L', 'M', 4);
	addAlias('Y', 'y', 4);
	addAlias('c', 'e', 4);
	addAlias('k', 'H', 2);
	addAlias('K', 'h', 2);
	addAlias('S', 's', 2);
	addAlias('v', 'z', 4);
	addAlias('V', 'Z', 4);

	var unixFmt = function unixFmt(s, str) {
	  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

	  var arr = [chars[0]];
	  var quoteOn = false;

	  for (var i = 1; i < chars.length; i += 1) {
	    //support quoted substrings
	    if (chars[i] === "'") {
	      quoteOn = !quoteOn; //support '', meaning one tick

	      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
	        quoteOn = true;
	      } else {
	        continue;
	      }
	    } //merge it with the last one


	    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
	      arr[arr.length - 1] += chars[i];
	    } else {
	      arr.push(chars[i]);
	    }
	  }

	  return arr.reduce(function (txt, c) {
	    if (mapping[c] !== undefined) {
	      txt += mapping[c](s) || '';
	    } else {
	      txt += c;
	    }

	    return txt;
	  }, '');
	};

	var unixFmt_1 = unixFmt;

	var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

	var doUnit = function doUnit(s, k) {
	  var start = s.clone().startOf(k);
	  var end = s.clone().endOf(k);
	  var duration = end.epoch - start.epoch;
	  var percent = (s.epoch - start.epoch) / duration;
	  return parseFloat(percent.toFixed(2));
	}; //how far it is along, from 0-1


	var progress = function progress(s, unit) {
	  if (unit) {
	    unit = fns.normalize(unit);
	    return doUnit(s, unit);
	  }

	  var obj = {};
	  units$1.forEach(function (k) {
	    obj[k] = doUnit(s, k);
	  });
	  return obj;
	};

	var progress_1 = progress;

	var nearest = function nearest(s, unit) {
	  //how far have we gone?
	  var prog = s.progress();
	  unit = fns.normalize(unit); //fix camel-case for this one

	  if (unit === 'quarterhour') {
	    unit = 'quarterHour';
	  }

	  if (prog[unit] !== undefined) {
	    // go forward one?
	    if (prog[unit] > 0.5) {
	      s = s.add(1, unit);
	    } // go to start


	    s = s.startOf(unit);
	  } else if (s.silent === false) {
	    console.warn("no known unit '" + unit + "'");
	  }

	  return s;
	};

	var nearest_1 = nearest;

	//increment until dates are the same
	var climb = function climb(a, b, unit) {
	  var i = 0;
	  a = a.clone();

	  while (a.isBefore(b)) {
	    //do proper, expensive increment to catch all-the-tricks
	    a = a.add(1, unit);
	    i += 1;
	  } //oops, we went too-far..


	  if (a.isAfter(b, unit)) {
	    i -= 1;
	  }

	  return i;
	}; // do a thurough +=1 on the unit, until they match
	// for speed-reasons, only used on day, month, week.


	var diffOne = function diffOne(a, b, unit) {
	  if (a.isBefore(b)) {
	    return climb(a, b, unit);
	  } else {
	    return climb(b, a, unit) * -1; //reverse it
	  }
	};

	var one = diffOne;

	// 2020 - 2019 may be 1 year, or 0 years
	// - '1 year difference' means 366 days during a leap year

	var fastYear = function fastYear(a, b) {
	  var years = b.year() - a.year(); // should we decrement it by 1?

	  a = a.year(b.year());

	  if (a.isAfter(b)) {
	    years -= 1;
	  }

	  return years;
	}; // use a waterfall-method for computing a diff of any 'pre-knowable' units
	// compute years, then compute months, etc..
	// ... then ms-math for any very-small units


	var diff = function diff(a, b) {
	  // an hour is always the same # of milliseconds
	  // so these units can be 'pre-calculated'
	  var msDiff = b.epoch - a.epoch;
	  var obj = {
	    milliseconds: msDiff,
	    seconds: parseInt(msDiff / 1000, 10)
	  };
	  obj.minutes = parseInt(obj.seconds / 60, 10);
	  obj.hours = parseInt(obj.minutes / 60, 10); //do the year

	  var tmp = a.clone();
	  obj.years = fastYear(tmp, b);
	  tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

	  obj.months = obj.years * 12;
	  tmp = a.add(obj.months, 'month');
	  obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
	  // (month * 4) isn't as close

	  obj.weeks = obj.years * 52;
	  tmp = a.add(obj.weeks, 'week');
	  obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

	  obj.days = obj.weeks * 7;
	  tmp = a.add(obj.days, 'day');
	  obj.days += one(tmp, b, 'day');
	  return obj;
	};

	var waterfall = diff;

	var reverseDiff = function reverseDiff(obj) {
	  Object.keys(obj).forEach(function (k) {
	    obj[k] *= -1;
	  });
	  return obj;
	}; // this method counts a total # of each unit, between a, b.
	// '1 month' means 28 days in february
	// '1 year' means 366 days in a leap year


	var main = function main(a, b, unit) {
	  b = fns.beADate(b, a); //reverse values, if necessary

	  var reversed = false;

	  if (a.isAfter(b)) {
	    var tmp = a;
	    a = b;
	    b = tmp;
	    reversed = true;
	  } //compute them all (i know!)


	  var obj = waterfall(a, b);

	  if (reversed) {
	    obj = reverseDiff(obj);
	  } //return just the requested unit


	  if (unit) {
	    //make sure it's plural-form
	    unit = fns.normalize(unit);

	    if (/s$/.test(unit) !== true) {
	      unit += 's';
	    }

	    if (unit === 'dates') {
	      unit = 'days';
	    }

	    return obj[unit];
	  }

	  return obj;
	};

	var diff$1 = main;

	//our conceptual 'break-points' for each unit

	var qualifiers = {
	  months: {
	    almost: 10,
	    over: 4
	  },
	  days: {
	    almost: 25,
	    over: 10
	  },
	  hours: {
	    almost: 20,
	    over: 8
	  },
	  minutes: {
	    almost: 50,
	    over: 20
	  },
	  seconds: {
	    almost: 50,
	    over: 20
	  }
	}; //get number of hours/minutes... between the two dates

	function getDiff(a, b) {
	  var isBefore = a.isBefore(b);
	  var later = isBefore ? b : a;
	  var earlier = isBefore ? a : b;
	  earlier = earlier.clone();
	  var diff = {
	    years: 0,
	    months: 0,
	    days: 0,
	    hours: 0,
	    minutes: 0,
	    seconds: 0
	  };
	  Object.keys(diff).forEach(function (unit) {
	    if (earlier.isSame(later, unit)) {
	      return;
	    }

	    var max = earlier.diff(later, unit);
	    earlier = earlier.add(max, unit);
	    diff[unit] = max;
	  }); //reverse it, if necessary

	  if (isBefore) {
	    Object.keys(diff).forEach(function (u) {
	      if (diff[u] !== 0) {
	        diff[u] *= -1;
	      }
	    });
	  }

	  return diff;
	} // Expects a plural unit arg


	function pluralize(value, unit) {
	  if (value === 1) {
	    unit = unit.slice(0, -1);
	  }

	  return value + ' ' + unit;
	} //create the human-readable diff between the two dates


	var since = function since(start, end) {
	  end = fns.beADate(end, start);
	  var diff = getDiff(start, end);
	  var isNow = Object.keys(diff).every(function (u) {
	    return !diff[u];
	  });

	  if (isNow === true) {
	    return {
	      diff: diff,
	      rounded: 'now',
	      qualified: 'now',
	      precise: 'now'
	    };
	  }

	  var rounded;
	  var qualified;
	  var precise;
	  var englishValues = []; //go through each value and create its text-representation

	  Object.keys(diff).forEach(function (unit, i, units) {
	    var value = Math.abs(diff[unit]);

	    if (value === 0) {
	      return;
	    }

	    var englishValue = pluralize(value, unit);
	    englishValues.push(englishValue);

	    if (!rounded) {
	      rounded = qualified = englishValue;

	      if (i > 4) {
	        return;
	      } //is it a 'almost' something, etc?


	      var nextUnit = units[i + 1];
	      var nextValue = Math.abs(diff[nextUnit]);

	      if (nextValue > qualifiers[nextUnit].almost) {
	        rounded = pluralize(value + 1, unit);
	        qualified = 'almost ' + rounded;
	      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
	    }
	  }); //make them into a string

	  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

	  if (start.isAfter(end) === true) {
	    rounded += ' ago';
	    qualified += ' ago';
	    precise += ' ago';
	  } else {
	    rounded = 'in ' + rounded;
	    qualified = 'in ' + qualified;
	    precise = 'in ' + precise;
	  }

	  return {
	    diff: diff,
	    rounded: rounded,
	    qualified: qualified,
	    precise: precise
	  };
	};

	var since_1 = since;

	//https://www.timeanddate.com/calendar/aboutseasons.html
	// Spring - from March 1 to May 31;
	// Summer - from June 1 to August 31;
	// Fall (autumn) - from September 1 to November 30; and,
	// Winter - from December 1 to February 28 (February 29 in a leap year).
	var seasons = {
	  north: [['spring', 2, 1], //spring march 1
	  ['summer', 5, 1], //june 1
	  ['fall', 8, 1], //sept 1
	  ['autumn', 8, 1], //sept 1
	  ['winter', 11, 1] //dec 1
	  ],
	  south: [['fall', 2, 1], //march 1
	  ['autumn', 2, 1], //march 1
	  ['winter', 5, 1], //june 1
	  ['spring', 8, 1], //sept 1
	  ['summer', 11, 1] //dec 1
	  ]
	};

	var quarters = [null, [0, 1], //jan 1
	[3, 1], //apr 1
	[6, 1], //july 1
	[9, 1] //oct 1
	];

	var units$2 = {
	  minute: function minute(s) {
	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarterhour: function quarterhour(s) {
	    var minute = s.minutes();

	    if (minute >= 45) {
	      s = s.minutes(45);
	    } else if (minute >= 30) {
	      s = s.minutes(30);
	    } else if (minute >= 15) {
	      s = s.minutes(15);
	    } else {
	      s = s.minutes(0);
	    }

	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  hour: function hour(s) {
	    walk_1(s, {
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  day: function day(s) {
	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  week: function week(s) {
	    var original = s.clone();
	    s = s.day(s._weekStart); //monday

	    if (s.isAfter(original)) {
	      s = s.subtract(1, 'week');
	    }

	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  month: function month(s) {
	    walk_1(s, {
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarter: function quarter(s) {
	    var q = s.quarter();

	    if (quarters[q]) {
	      walk_1(s, {
	        month: quarters[q][0],
	        date: quarters[q][1],
	        hour: 0,
	        minute: 0,
	        second: 0,
	        millisecond: 0
	      });
	    }

	    return s;
	  },
	  season: function season(s) {
	    var current = s.season();
	    var hem = 'north';

	    if (s.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    for (var i = 0; i < seasons[hem].length; i++) {
	      if (seasons[hem][i][0] === current) {
	        //winter goes between years
	        var year = s.year();

	        if (current === 'winter' && s.month() < 3) {
	          year -= 1;
	        }

	        walk_1(s, {
	          year: year,
	          month: seasons[hem][i][1],
	          date: seasons[hem][i][2],
	          hour: 0,
	          minute: 0,
	          second: 0,
	          millisecond: 0
	        });
	        return s;
	      }
	    }

	    return s;
	  },
	  year: function year(s) {
	    walk_1(s, {
	      month: 0,
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  decade: function decade(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 10, 10) * 10;
	    s = s.year(decade);
	    return s;
	  },
	  century: function century(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 100, 10) * 100;
	    s = s.year(decade);
	    return s;
	  }
	};
	units$2.date = units$2.day;

	var startOf = function startOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    return units$2[unit](s);
	  }

	  if (unit === 'summer' || unit === 'winter') {
	    s = s.season(unit);
	    return units$2.season(s);
	  }

	  return s;
	}; //piggy-backs off startOf


	var endOf = function endOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    s = units$2[unit](s);
	    s = s.add(1, unit);
	    s = s.subtract(1, 'milliseconds');
	    return s;
	  }

	  return s;
	};

	var startOf_1 = {
	  startOf: startOf,
	  endOf: endOf
	};

	var isDay = function isDay(unit) {
	  if (days["short"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  if (days["long"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  return false;
	}; // return a list of the weeks/months/days between a -> b
	// returns spacetime objects in the timezone of the input


	var every = function every(start) {
	  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var end = arguments.length > 2 ? arguments[2] : undefined;

	  if (!unit || !end) {
	    return [];
	  } //cleanup unit param


	  unit = fns.normalize(unit); //cleanup to param

	  end = start.clone().set(end); //swap them, if they're backwards

	  if (start.isAfter(end)) {
	    var tmp = start;
	    start = end;
	    end = tmp;
	  } //support 'every wednesday'


	  var d = start.clone();

	  if (isDay(unit)) {
	    d = d.next(unit);
	    unit = 'week';
	  } else {
	    d = d.next(unit);
	  } //okay, actually start doing it


	  var result = [];

	  while (d.isBefore(end)) {
	    result.push(d);
	    d = d.add(1, unit);
	  }

	  return result;
	};

	var every_1 = every;

	var parseDst = function parseDst(dst) {
	  if (!dst) {
	    return [];
	  }

	  return dst.split('->');
	};

	var titleCase = function titleCase(str) {
	  str = str[0].toUpperCase() + str.substr(1);
	  str = str.replace(/\/gmt/, '/GMT');
	  str = str.replace(/[\/_]([a-z])/gi, function (s) {
	    return s.toUpperCase();
	  });
	  return str;
	}; //get metadata about this timezone


	var timezone = function timezone(s) {
	  var zones = s.timezones;
	  var tz = s.tz;

	  if (zones.hasOwnProperty(tz) === false) {
	    tz = find(s.tz, zones);
	  }

	  if (tz === null) {
	    if (s.silent === false) {
	      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
	    }

	    return {
	      current: {
	        epochShift: 0
	      }
	    };
	  }

	  var found = zones[tz];
	  var result = {
	    name: titleCase(tz),
	    hasDst: Boolean(found.dst),
	    default_offset: found.offset,
	    //do north-hemisphere version as default (sorry!)
	    hemisphere: found.hem === 's' ? 'South' : 'North',
	    current: {}
	  };

	  if (result.hasDst) {
	    var arr = parseDst(found.dst);
	    result.change = {
	      start: arr[0],
	      back: arr[1]
	    };
	  } //find the offsets for summer/winter times
	  //(these variable names are north-centric)


	  var summer = found.offset; // (july)

	  var winter = summer; // (january) assume it's the same for now

	  if (result.hasDst === true) {
	    if (result.hemisphere === 'North') {
	      winter = summer - 1;
	    } else {
	      //southern hemisphere
	      winter = found.offset + 1;
	    }
	  } //find out which offset to use right now
	  //use 'summer' time july-time


	  if (result.hasDst === false) {
	    result.current.offset = summer;
	    result.current.isDST = false;
	  } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
	    result.current.offset = summer;
	    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
	  } else {
	    //use 'winter' january-time
	    result.current.offset = winter;
	    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
	  }

	  return result;
	};

	var timezone_1 = timezone;

	var methods = {
	  set: function set(input$1, tz) {
	    var s = this.clone();
	    s = input(s, input$1);

	    if (tz) {
	      this.tz = find(tz);
	    }

	    return s;
	  },
	  timezone: function timezone() {
	    return timezone_1(this);
	  },
	  isDST: function isDST() {
	    return timezone_1(this).current.isDST;
	  },
	  hasDST: function hasDST() {
	    return timezone_1(this).hasDst;
	  },
	  offset: function offset() {
	    return timezone_1(this).current.offset * 60;
	  },
	  hemisphere: function hemisphere() {
	    return timezone_1(this).hemisphere;
	  },
	  format: function format(fmt) {
	    return format_1(this, fmt);
	  },
	  unixFmt: function unixFmt(fmt) {
	    return unixFmt_1(this, fmt);
	  },
	  startOf: function startOf(unit) {
	    return startOf_1.startOf(this, unit);
	  },
	  endOf: function endOf(unit) {
	    return startOf_1.endOf(this, unit);
	  },
	  leapYear: function leapYear() {
	    var year = this.year();
	    return fns.isLeapYear(year);
	  },
	  progress: function progress(unit) {
	    return progress_1(this, unit);
	  },
	  nearest: function nearest(unit) {
	    return nearest_1(this, unit);
	  },
	  diff: function diff(d, unit) {
	    return diff$1(this, d, unit);
	  },
	  since: function since(d) {
	    if (!d) {
	      d = this.clone().set();
	    }

	    return since_1(this, d);
	  },
	  next: function next(unit) {
	    var s = this.add(1, unit);
	    return s.startOf(unit);
	  },
	  //the start of the previous year/week/century
	  last: function last(unit) {
	    var s = this.subtract(1, unit);
	    return s.startOf(unit);
	  },
	  isValid: function isValid() {
	    //null/undefined epochs
	    if (!this.epoch && this.epoch !== 0) {
	      return false;
	    }

	    return !isNaN(this.d.getTime());
	  },
	  //travel to this timezone
	  "goto": function goto(tz) {
	    var s = this.clone();
	    s.tz = find(tz, s.timezones); //science!

	    return s;
	  },
	  //get each week/month/day between a -> b
	  every: function every(unit, to) {
	    return every_1(this, unit, to);
	  },
	  isAwake: function isAwake() {
	    var hour = this.hour(); //10pm -> 8am

	    if (hour < 8 || hour > 22) {
	      return false;
	    }

	    return true;
	  },
	  isAsleep: function isAsleep() {
	    return !this.isAwake();
	  },
	  //pretty-printing
	  log: function log() {
	    console.log('');
	    console.log(format_1(this, 'nice-short'));
	    return this;
	  },
	  logYear: function logYear() {
	    console.log('');
	    console.log(format_1(this, 'full-short'));
	    return this;
	  },
	  debug: function debug() {
	    var tz = this.timezone();
	    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
	    date += '\n     - ' + this.format('time');
	    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
	    return this;
	  },
	  //alias of 'since' but opposite - like moment.js
	  from: function from(d) {
	    d = this.clone().set(d);
	    return d.since(this);
	  },
	  fromNow: function fromNow() {
	    var d = this.clone().set(Date.now());
	    return d.since(this);
	  },
	  weekStart: function weekStart(input) {
	    //accept a number directly
	    if (typeof input === 'number') {
	      this._weekStart = input;
	      return this;
	    }

	    if (typeof input === 'string') {
	      // accept 'wednesday'
	      input = input.toLowerCase().trim();
	      var num = days["short"]().indexOf(input);

	      if (num === -1) {
	        num = days["long"]().indexOf(input);
	      }

	      if (num === -1) {
	        num = 1; //go back to default
	      }

	      this._weekStart = num;
	    } else {
	      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
	    }

	    return this;
	  }
	}; // aliases

	methods.inDST = methods.isDST;
	methods.round = methods.nearest;
	methods.each = methods.every;
	var methods_1 = methods;

	//these methods wrap around them.

	var validate = function validate(n) {
	  //handle number as a string
	  if (typeof n === 'string') {
	    n = parseInt(n, 10);
	  }

	  return n;
	};

	var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

	var confirm = function confirm(s, tmp, unit) {
	  var n = order.indexOf(unit);
	  var arr = order.slice(n, order.length);

	  for (var i = 0; i < arr.length; i++) {
	    var want = tmp[arr[i]]();
	    s[arr[i]](want);
	  }

	  return s;
	};

	var set = {
	  milliseconds: function milliseconds(s, n) {
	    n = validate(n);
	    var current = s.millisecond();
	    var diff = current - n; //milliseconds to shift by

	    return s.epoch - diff;
	  },
	  seconds: function seconds(s, n) {
	    n = validate(n);
	    var diff = s.second() - n;
	    var shift = diff * milliseconds.second;
	    return s.epoch - shift;
	  },
	  minutes: function minutes(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    var diff = s.minute() - n;
	    var shift = diff * milliseconds.minute;
	    s.epoch -= shift;
	    confirm(s, old, 'second');
	    return s.epoch;
	  },
	  hours: function hours(s, n) {
	    n = validate(n);

	    if (n >= 24) {
	      n = 24;
	    } else if (n < 0) {
	      n = 0;
	    }

	    var old = s.clone();
	    var diff = s.hour() - n;
	    var shift = diff * milliseconds.hour;
	    s.epoch -= shift;
	    walk_1(s, {
	      hour: n
	    });
	    confirm(s, old, 'minute');
	    return s.epoch;
	  },
	  //support setting time by '4:25pm' - this isn't very-well developed..
	  time: function time(s, str) {
	    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

	    if (!m) {
	      //fallback to support just '2am'
	      m = str.match(/([0-9]{1,2})(am|pm)/);

	      if (!m) {
	        return s.epoch;
	      }

	      m.splice(2, 0, '0'); //add implicit 0 minutes
	    }

	    var h24 = false;
	    var hour = parseInt(m[1], 10);
	    var minute = parseInt(m[2], 10);

	    if (hour > 12) {
	      h24 = true;
	    } //make the hour into proper 24h time


	    if (h24 === false) {
	      if (m[3] === 'am' && hour === 12) {
	        //12am is midnight
	        hour = 0;
	      }

	      if (m[3] === 'pm' && hour < 12) {
	        //12pm is noon
	        hour += 12;
	      }
	    }

	    s = s.hour(hour);
	    s = s.minute(minute);
	    s = s.second(0);
	    s = s.millisecond(0);
	    return s.epoch;
	  },
	  date: function date(s, n) {
	    n = validate(n); //avoid setting february 31st

	    if (n > 28) {
	      var max = monthLengths_1[s.month()];

	      if (n > max) {
	        n = max;
	      }
	    } //avoid setting < 0


	    if (n <= 0) {
	      n = 1;
	    }

	    walk_1(s, {
	      date: n
	    });
	    return s.epoch;
	  },
	  //this one's tricky
	  month: function month(s, n) {
	    if (typeof n === 'string') {
	      n = months.mapping()[n.toLowerCase()];
	    }

	    n = validate(n); //don't go past december

	    if (n >= 12) {
	      n = 11;
	    }

	    if (n <= 0) {
	      n = 0;
	    }

	    var date = s.date(); //there's no 30th of february, etc.

	    if (date > monthLengths_1[n]) {
	      //make it as close as we can..
	      date = monthLengths_1[n];
	    }

	    walk_1(s, {
	      month: n,
	      date: date
	    });
	    return s.epoch;
	  },
	  year: function year(s, n) {
	    n = validate(n);
	    walk_1(s, {
	      year: n
	    });
	    return s.epoch;
	  },
	  dayOfYear: function dayOfYear(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    n -= 1; //days are 1-based

	    if (n <= 0) {
	      n = 0;
	    } else if (n >= 365) {
	      n = 364;
	    }

	    s = s.startOf('year');
	    s = s.add(n, 'day');
	    confirm(s, old, 'hour');
	    return s.epoch;
	  }
	};

	var methods$1 = {
	  millisecond: function millisecond(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.milliseconds(s, num);
	      return s;
	    }

	    return this.d.getMilliseconds();
	  },
	  second: function second(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.seconds(s, num);
	      return s;
	    }

	    return this.d.getSeconds();
	  },
	  minute: function minute(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.minutes(s, num);
	      return s;
	    }

	    return this.d.getMinutes();
	  },
	  hour: function hour(num) {
	    var d = this.d;

	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.hours(s, num);
	      return s;
	    }

	    return d.getHours();
	  },
	  //'3:30' is 3.5
	  hourFloat: function hourFloat(num) {
	    if (num !== undefined) {
	      var s = this.clone();

	      var _minute = num % 1;

	      _minute = _minute * 60;

	      var _hour = parseInt(num, 10);

	      s.epoch = set.hours(s, _hour);
	      s.epoch = set.minutes(s, _minute);
	      return s;
	    }

	    var d = this.d;
	    var hour = d.getHours();
	    var minute = d.getMinutes();
	    minute = minute / 60;
	    return hour + minute;
	  },
	  // hour in 12h format
	  hour12: function hour12(str) {
	    var d = this.d;

	    if (str !== undefined) {
	      var s = this.clone();
	      str = '' + str;
	      var m = str.match(/^([0-9]+)(am|pm)$/);

	      if (m) {
	        var hour = parseInt(m[1], 10);

	        if (m[2] === 'pm') {
	          hour += 12;
	        }

	        s.epoch = set.hours(s, hour);
	      }

	      return s;
	    } //get the hour


	    var hour12 = d.getHours();

	    if (hour12 > 12) {
	      hour12 = hour12 - 12;
	    }

	    if (hour12 === 0) {
	      hour12 = 12;
	    }

	    return hour12;
	  },
	  //some ambiguity here with 12/24h
	  time: function time(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      s.epoch = set.time(s, str);
	      return s;
	    }

	    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
	  },
	  // either 'am' or 'pm'
	  ampm: function ampm(input) {
	    var which = 'am';
	    var hour = this.hour();

	    if (hour >= 12) {
	      which = 'pm';
	    }

	    if (typeof input !== 'string') {
	      return which;
	    } //okay, we're doing a setter


	    var s = this.clone();
	    input = input.toLowerCase().trim(); //ampm should never change the day
	    // - so use `.hour(n)` instead of `.minus(12,'hour')`

	    if (hour >= 12 && input === 'am') {
	      //noon is 12pm
	      hour -= 12;
	      return s.hour(hour);
	    }

	    if (hour < 12 && input === 'pm') {
	      hour += 12;
	      return s.hour(hour);
	    }

	    return s;
	  },
	  //some hard-coded times of day, like 'noon'
	  dayTime: function dayTime(str) {
	    if (str !== undefined) {
	      var times = {
	        morning: '7:00am',
	        breakfast: '7:00am',
	        noon: '12:00am',
	        lunch: '12:00pm',
	        afternoon: '2:00pm',
	        evening: '6:00pm',
	        dinner: '6:00pm',
	        night: '11:00pm',
	        midnight: '23:59pm'
	      };
	      var s = this.clone();
	      str = str || '';
	      str = str.toLowerCase();

	      if (times.hasOwnProperty(str) === true) {
	        s = s.time(times[str]);
	      }

	      return s;
	    }

	    var h = this.hour();

	    if (h < 6) {
	      return 'night';
	    }

	    if (h < 12) {
	      //until noon
	      return 'morning';
	    }

	    if (h < 17) {
	      //until 5pm
	      return 'afternoon';
	    }

	    if (h < 22) {
	      //until 10pm
	      return 'evening';
	    }

	    return 'night';
	  },
	  //parse a proper iso string
	  iso: function iso(num) {
	    if (num !== undefined) {
	      return this.set(num);
	    }

	    return this.format('iso');
	  }
	};
	var _01Time = methods$1;

	var methods$2 = {
	  // # day in the month
	  date: function date(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.date(s, num);
	      return s;
	    }

	    return this.d.getDate();
	  },
	  //like 'wednesday' (hard!)
	  day: function day(input) {
	    if (input === undefined) {
	      return this.d.getDay();
	    }

	    var original = this.clone();
	    var want = input; // accept 'wednesday'

	    if (typeof input === 'string') {
	      input = input.toLowerCase();
	      want = days["short"]().indexOf(input);

	      if (want === -1) {
	        want = days["long"]().indexOf(input);
	      }
	    } //move approx


	    var day = this.d.getDay();
	    var diff = day - want;
	    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

	    walk_1(s, {
	      hour: original.hour(),
	      minute: original.minute(),
	      second: original.second()
	    });
	    return s;
	  },
	  //these are helpful name-wrappers
	  dayName: function dayName(input) {
	    if (input === undefined) {
	      return days["long"]()[this.day()];
	    }

	    var s = this.clone();
	    s = s.day(input);
	    return s;
	  },
	  //either name or number
	  month: function month(input) {
	    if (input !== undefined) {
	      var s = this.clone();
	      s.epoch = set.month(s, input);
	      return s;
	    }

	    return this.d.getMonth();
	  }
	};
	var _02Date = methods$2;

	var clearMinutes = function clearMinutes(s) {
	  s = s.minute(0);
	  s = s.second(0);
	  s = s.millisecond(1);
	  return s;
	};

	var methods$3 = {
	  // day 0-366
	  dayOfYear: function dayOfYear(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.dayOfYear(s, num);
	      return s;
	    } //days since newyears - jan 1st is 1, jan 2nd is 2...


	    var sum = 0;
	    var month = this.d.getMonth();
	    var tmp; //count the num days in each month

	    for (var i = 1; i <= month; i++) {
	      tmp = new Date();
	      tmp.setDate(1);
	      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

	      tmp.setHours(1);
	      tmp.setMinutes(1);
	      tmp.setMonth(i);
	      tmp.setHours(-2); //the last day of the month

	      sum += tmp.getDate();
	    }

	    return sum + this.d.getDate();
	  },
	  //since the start of the year
	  week: function week(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s = s.month(0);
	      s = s.date(1);
	      s = s.day('monday');
	      s = clearMinutes(s); //don't go into last-year

	      if (s.monthName() === 'december') {
	        s = s.add(1, 'week');
	      }

	      num -= 1; //1-based

	      s = s.add(num, 'weeks');
	      return s;
	    } //find-out which week it is


	    var tmp = this.clone();
	    tmp = tmp.month(0);
	    tmp = tmp.date(1);
	    tmp = clearMinutes(tmp);
	    tmp = tmp.day('monday'); //don't go into last-year

	    if (tmp.monthName() === 'december') {
	      tmp = tmp.add(1, 'week');
	    }

	    var thisOne = this.epoch; //if the week technically hasn't started yet

	    if (tmp.epoch > thisOne) {
	      return 1;
	    } //speed it up, if we can


	    var i = 0;
	    var skipWeeks = this.month() * 4;
	    tmp.epoch += milliseconds.week * skipWeeks;
	    i += skipWeeks;

	    for (; i < 52; i++) {
	      if (tmp.epoch > thisOne) {
	        return i;
	      }

	      tmp = tmp.add(1, 'week');
	    }

	    return 52;
	  },
	  //'january'
	  monthName: function monthName(input) {
	    if (input === undefined) {
	      return months["long"]()[this.month()];
	    }

	    var s = this.clone();
	    s = s.month(input);
	    return s;
	  },
	  //q1, q2, q3, q4
	  quarter: function quarter(num) {
	    if (num !== undefined) {
	      if (typeof num === 'string') {
	        num = num.replace(/^q/i, '');
	        num = parseInt(num, 10);
	      }

	      if (quarters[num]) {
	        var s = this.clone();
	        var _month = quarters[num][0];
	        s = s.month(_month);
	        s = s.date(1);
	        s = s.startOf('day');
	        return s;
	      }
	    }

	    var month = this.d.getMonth();

	    for (var i = 1; i < quarters.length; i++) {
	      if (month < quarters[i][0]) {
	        return i - 1;
	      }
	    }

	    return 4;
	  },
	  //spring, summer, winter, fall
	  season: function season(input) {
	    var hem = 'north';

	    if (this.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    if (input !== undefined) {
	      var s = this.clone();

	      for (var i = 0; i < seasons[hem].length; i++) {
	        if (input === seasons[hem][i][0]) {
	          s = s.month(seasons[hem][i][1]);
	          s = s.date(1);
	          s = s.startOf('day');
	        }
	      }

	      return s;
	    }

	    var month = this.d.getMonth();

	    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
	      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
	        return seasons[hem][_i][0];
	      }
	    }

	    return 'winter';
	  },
	  //the year number
	  year: function year(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.year(s, num);
	      return s;
	    }

	    return this.d.getFullYear();
	  },
	  //bc/ad years
	  era: function era(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

	      var year = s.d.getFullYear(); //make '1992' into 1992bc..

	      if (str === 'bc' && year > 0) {
	        s.epoch = set.year(s, year * -1);
	      } //make '1992bc' into '1992'


	      if (str === 'ad' && year < 0) {
	        s.epoch = set.year(s, year * -1);
	      }

	      return s;
	    }

	    if (this.d.getFullYear() < 0) {
	      return 'BC';
	    }

	    return 'AD';
	  }
	};
	var _03Year = methods$3;

	var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

	methods$4.milliseconds = methods$4.millisecond;
	methods$4.seconds = methods$4.second;
	methods$4.minutes = methods$4.minute;
	methods$4.hours = methods$4.hour;
	methods$4.hour24 = methods$4.hour;
	methods$4.h12 = methods$4.hour12;
	methods$4.h24 = methods$4.hour24;
	methods$4.days = methods$4.day;

	var addMethods = function addMethods(Space) {
	  //hook the methods into prototype
	  Object.keys(methods$4).forEach(function (k) {
	    Space.prototype[k] = methods$4[k];
	  });
	};

	var query = addMethods;

	var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
	var keep = {
	  second: order$1.slice(0, 1),
	  minute: order$1.slice(0, 2),
	  quarterhour: order$1.slice(0, 2),
	  hour: order$1.slice(0, 3),
	  date: order$1.slice(0, 4),
	  month: order$1.slice(0, 4),
	  quarter: order$1.slice(0, 4),
	  season: order$1.slice(0, 4),
	  year: order$1,
	  decade: order$1,
	  century: order$1
	};
	keep.week = keep.hour;
	keep.season = keep.date;
	keep.quarter = keep.date; // Units need to be dst adjuested

	var dstAwareUnits = {
	  year: true,
	  quarter: true,
	  season: true,
	  month: true,
	  week: true,
	  day: true
	};
	var keepDate = {
	  month: true,
	  quarter: true,
	  season: true,
	  year: true
	}; //month is the only thing we 'model/compute'
	//- because ms-shifting can be off by enough

	var rollMonth = function rollMonth(want, old) {
	  //increment year
	  if (want.month > 0) {
	    var years = parseInt(want.month / 12, 10);
	    want.year = old.year() + years;
	    want.month = want.month % 12;
	  } else if (want.month < 0) {
	    //decrement year
	    var _years = Math.floor(Math.abs(want.month) / 13, 10);

	    _years = Math.abs(_years) + 1;
	    want.year = old.year() - _years; //ignore extras

	    want.month = want.month % 12;
	    want.month = want.month + 12;

	    if (want.month === 12) {
	      want.month = 0;
	    }
	  }

	  return want;
	};

	var addMethods$1 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.add = function (num, unit) {
	    var s = this.clone();

	    if (!unit || num === 0) {
	      return s; //don't bother
	    }

	    var old = this.clone();
	    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

	    if (milliseconds[unit]) {
	      s.epoch += milliseconds[unit] * num;
	    } else if (unit === 'week') {
	      s.epoch += milliseconds.day * (num * 7);
	    } else if (unit === 'quarter' || unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'quarterhour') {
	      s.epoch += milliseconds.minute * 15 * num;
	    } //now ensure our milliseconds/etc are in-line


	    var want = {};

	    if (keep[unit]) {
	      keep[unit].forEach(function (u) {
	        want[u] = old[u]();
	      });
	    }

	    if (dstAwareUnits[unit]) {
	      var diff = old.timezone().current.offset - s.timezone().current.offset;
	      s.epoch += diff * 3600 * 1000;
	    } //ensure month/year has ticked-over


	    if (unit === 'month') {
	      want.month = old.month() + num; //month is the one unit we 'model' directly

	      want = rollMonth(want, old);
	    } //support coercing a week, too


	    if (unit === 'week') {
	      var sum = old.date() + num * 7;

	      if (sum <= 28 && sum > 1) {
	        want.date = sum;
	      }
	    } //support 25-hour day-changes on dst-changes
	    else if (unit === 'date') {
	        //specify a naive date number, if it's easy to do...
	        var _sum = old.date() + num;

	        if (_sum <= 28 && _sum > 1) {
	          want.date = _sum;
	        } //or if we haven't moved at all..
	        else if (num !== 0 && old.isSame(s, 'day')) {
	            want.date = old.date() + num;
	          }
	      } //ensure year has changed (leap-years)
	      else if (unit === 'year' && s.year() === old.year()) {
	          s.epoch += milliseconds.week;
	        } //these are easier
	        else if (unit === 'decade') {
	            want.year = s.year() + 10;
	          } else if (unit === 'century') {
	            want.year = s.year() + 100;
	          } //keep current date, unless the month doesn't have it.


	    if (keepDate[unit]) {
	      var max = monthLengths_1[want.month];
	      want.date = old.date();

	      if (want.date > max) {
	        want.date = max;
	      }
	    }

	    walk_1(s, want);
	    return s;
	  }; //subtract is only add *-1


	  SpaceTime.prototype.subtract = function (num, unit) {
	    var s = this.clone();
	    return s.add(num * -1, unit);
	  }; //add aliases


	  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
	  SpaceTime.prototype.plus = SpaceTime.prototype.add;
	};

	var add = addMethods$1;

	//make a string, for easy comparison between dates
	var print = {
	  millisecond: function millisecond(s) {
	    return s.epoch;
	  },
	  second: function second(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
	  },
	  minute: function minute(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
	  },
	  hour: function hour(s) {
	    return [s.year(), s.month(), s.date(), s.hour()].join('-');
	  },
	  day: function day(s) {
	    return [s.year(), s.month(), s.date()].join('-');
	  },
	  week: function week(s) {
	    return [s.year(), s.week()].join('-');
	  },
	  month: function month(s) {
	    return [s.year(), s.month()].join('-');
	  },
	  quarter: function quarter(s) {
	    return [s.year(), s.quarter()].join('-');
	  },
	  year: function year(s) {
	    return s.year();
	  }
	};
	print.date = print.day;

	var addMethods$2 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.isSame = function (b, unit) {
	    var a = this;

	    if (!unit) {
	      return null;
	    }

	    if (typeof b === 'string' || typeof b === 'number') {
	      b = new SpaceTime(b, this.timezone.name);
	    } //support 'seconds' aswell as 'second'


	    unit = unit.replace(/s$/, '');

	    if (print[unit]) {
	      return print[unit](a) === print[unit](b);
	    }

	    return null;
	  };
	};

	var same = addMethods$2;

	var addMethods$3 = function addMethods(SpaceTime) {
	  var methods = {
	    isAfter: function isAfter(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch > epoch;
	    },
	    isBefore: function isBefore(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch < epoch;
	    },
	    isEqual: function isEqual(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch === epoch;
	    },
	    isBetween: function isBetween(start, end) {
	      start = fns.beADate(start, this);
	      end = fns.beADate(end, this);
	      var startEpoch = fns.getEpoch(start);

	      if (startEpoch === null) {
	        return null;
	      }

	      var endEpoch = fns.getEpoch(end);

	      if (endEpoch === null) {
	        return null;
	      }

	      return startEpoch < this.epoch && this.epoch < endEpoch;
	    }
	  }; //hook them into proto

	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var compare = addMethods$3;

	var addMethods$4 = function addMethods(SpaceTime) {
	  var methods = {
	    i18n: function i18n(data) {
	      //change the day names
	      if (fns.isObject(data.days)) {
	        days.set(data.days);
	      } //change the month names


	      if (fns.isObject(data.months)) {
	        months.set(data.months);
	      }
	    }
	  }; //hook them into proto

	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var i18n = addMethods$4;

	var timezones = unpack; //fake timezone-support, for fakers (es5 class)

	var SpaceTime = function SpaceTime(input$1, tz) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  //the holy moment
	  this.epoch = null; //the shift for the given timezone

	  this.tz = find(tz, timezones); //whether to output warnings to console

	  this.silent = options.silent || true; // favour british interpretation of 02/02/2018, etc

	  this.british = options.dmy || options.british; //does the week start on sunday, or monday:

	  this._weekStart = 1; //default to monday

	  if (options.weekStart !== undefined) {
	    this._weekStart = options.weekStart;
	  } //add getter/setters


	  Object.defineProperty(this, 'd', {
	    //return a js date object
	    get: function get() {
	      var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

	      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

	      var shift = bias + offset * 60; //in minutes

	      shift = shift * 60 * 1000; //in ms
	      //remove this computer's offset

	      var epoch = this.epoch + shift;
	      var d = new Date(epoch);
	      return d;
	    }
	  }); //add this data on the object, to allow adding new timezones

	  Object.defineProperty(this, 'timezones', {
	    get: function get() {
	      return timezones;
	    },
	    set: function set(obj) {
	      timezones = obj;
	      return obj;
	    }
	  }); //parse the various formats

	  if (input$1 !== undefined || input$1 === null) {
	    var tmp = input(this, input$1, tz);
	    this.epoch = tmp.epoch;
	  }
	}; //(add instance methods to prototype)


	Object.keys(methods_1).forEach(function (k) {
	  SpaceTime.prototype[k] = methods_1[k];
	}); // ¯\_(ツ)_/¯

	SpaceTime.prototype.clone = function () {
	  return new SpaceTime(this.epoch, this.tz, {
	    silent: this.silent,
	    weekStart: this._weekStart
	  });
	}; //append more methods


	query(SpaceTime);
	add(SpaceTime);
	same(SpaceTime);
	compare(SpaceTime);
	i18n(SpaceTime);
	var spacetime = SpaceTime;

	var whereIts = function whereIts(a, b) {
	  var start = new spacetime(null);
	  var end = new spacetime(null);
	  start = start.time(a); //if b is undefined, use as 'within one hour'

	  if (b) {
	    end = end.time(b);
	  } else {
	    end = start.add(59, 'minutes');
	  }

	  var startHour = start.hour();
	  var endHour = end.hour();
	  var tzs = Object.keys(start.timezones).filter(function (tz) {
	    if (tz.indexOf('/') === -1) {
	      return false;
	    }

	    var m = new spacetime(null, tz);
	    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

	    if (hour >= startHour && hour <= endHour) {
	      //test minutes too, if applicable
	      if (hour === startHour && m.minute() < start.minute()) {
	        return false;
	      }

	      if (hour === endHour && m.minute() > end.minute()) {
	        return false;
	      }

	      return true;
	    }

	    return false;
	  });
	  return tzs;
	};

	var whereIts_1 = whereIts;

	var _version = '6.2.0';

	var main$1 = function main(input, tz, options) {
	  return new spacetime(input, tz, options);
	}; //some helper functions on the main method


	main$1.now = function (tz, options) {
	  return new spacetime(new Date().getTime(), tz, options);
	};

	main$1.today = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.startOf('day');
	};

	main$1.tomorrow = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.add(1, 'day').startOf('day');
	};

	main$1.yesterday = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.subtract(1, 'day').startOf('day');
	};

	main$1.extend = function (obj) {
	  Object.keys(obj).forEach(function (k) {
	    spacetime.prototype[k] = obj[k];
	  });
	  return this;
	}; //find tz by time


	main$1.whereIts = whereIts_1;
	main$1.version = _version; //aliases:

	main$1.plugin = main$1.extend;
	var src = main$1;

	return src;

}));


},{}],226:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spencerColor=e()}}(function(){return function u(i,a,c){function f(r,e){if(!a[r]){if(!i[r]){var o="function"==typeof _dereq_&&_dereq_;if(!e&&o)return o(r,!0);if(d)return d(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var t=a[r]={exports:{}};i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,u,i,a,c)}return a[r].exports}for(var d="function"==typeof _dereq_&&_dereq_,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,r,o){"use strict";r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#F2C0BB",brown:"#705E5C",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",fuscia:"#735873",beige:"#e6d7b3",slate:"#8C8C88",suede:"#9c896c",burnt:"#603a39",sea:"#50617A",sky:"#2D85A8",night:"#303b50",rouge:"#914045",grey:"#838B91",mud:"#C4ABAB",royal:"#275291",cherry:"#cc6966",tulip:"#e6b3bc",rose:"#D68881",fire:"#AB5850",greyblue:"#72697D",greygreen:"#8BA3A2",greypurple:"#978BA3",burn:"#6D5685",slategrey:"#bfb0b3",light:"#a3a5a5",lighter:"#d7d5d2",fudge:"#4d4d4d",lightgrey:"#949a9e",white:"#fbfbfb",dimgrey:"#606c74",softblack:"#463D4F",dark:"#443d3d",black:"#333333"}},{}],2:[function(e,r,o){"use strict";var n=e("./colors"),t={juno:["blue","mud","navy","slate","pink","burn"],barrow:["rouge","red","orange","burnt","brown","greygreen"],roma:["#8a849a","#b5b0bf","rose","lighter","greygreen","mud"],palmer:["red","navy","olive","pink","suede","sky"],mark:["#848f9a","#9aa4ac","slate","#b0b8bf","mud","grey"],salmon:["sky","sea","fuscia","slate","mud","fudge"],dupont:["green","brown","orange","red","olive","blue"],bloor:["night","navy","beige","rouge","mud","grey"],yukon:["mud","slate","brown","sky","beige","red"],david:["blue","green","yellow","red","pink","light"],neste:["mud","cherry","royal","rouge","greygreen","greypurple"],ken:["red","sky","#c67a53","greygreen","#dfb59f","mud"]};Object.keys(t).forEach(function(e){t[e]=t[e].map(function(e){return n[e]||e})}),r.exports=t},{"./colors":1}],3:[function(e,r,o){"use strict";var n=e("./colors"),t=e("./combos"),u={colors:n,list:Object.keys(n).map(function(e){return n[e]}),combos:t};r.exports=u},{"./colors":1,"./combos":2}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],227:[function(_dereq_,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;
},{}],228:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = _dereq_('component-emitter');

var safeStringify = _dereq_('fast-safe-stringify');

var RequestBase = _dereq_('./request-base');

var isObject = _dereq_('./is-object');

var ResponseBase = _dereq_('./response-base');

var Agent = _dereq_('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (err) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (err) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (err) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (err) {}

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, val) {
  if (val === undefined) return;

  if (val === null) {
    pairs.push(encodeURIComponent(key));
    return;
  }

  if (Array.isArray(val)) {
    val.forEach(function (v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else if (isObject(val)) {
    for (var subkey in val) {
      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
    }
  } else {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
  }
}
/**
 * Expose serialization method.
 */


request.serializeObject = serialize;
/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}
/**
 * Expose parser.
 */


request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/.test(mime);
}
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */


function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
} // eslint-disable-next-line new-cap


ResponseBase(Response.prototype);
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, str);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
  return err;
};
/**
 * Expose `Response`.
 */


request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err2) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = err2; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);
    var new_err;

    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch (err2) {
      new_err = err2; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = function encoder(string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (val) {
  if (typeof val !== 'string') val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;
  err.status = this.status;
  err.method = this.method;
  err.url = this.url;
  this.callback(err);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.buffer = Request.prototype.ca;
Request.prototype.ca = Request.prototype.agent; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (err) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }; // progress


  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (err) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var req = new request.Request(method, url);

    this._setDefaults(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var req = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var req = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var req = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var req = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
},{"./agent-base":227,"./is-object":229,"./request-base":230,"./response-base":231,"component-emitter":183,"fast-safe-stringify":185}],229:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;
},{}],230:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = _dereq_('./is-object');
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
  }

  return obj;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (val) {
  this._responseType = val;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err2) {
      console.error(err2);
    }
  }

  if (res && res.status && res.status >= 500 && res.status !== 501) return true;

  if (err) {
    if (err.code && ERROR_CODES.indexOf(err.code) !== -1) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, val) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
}; // eslint-disable-next-line valid-jsdoc

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, val) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
    }

    return this;
  } // val should be defined now


  if (val === null || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof val === 'boolean') {
    val = String(val);
  }

  this._getFormData().append(name, val);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObj && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }

      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};
},{"./is-object":229}],231:[function(_dereq_,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var utils = _dereq_('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (err) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};
},{"./utils":232}],232:[function(_dereq_,module,exports){
"use strict";

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();
    if (key && val) obj[key] = val;
    return obj;
  }, {});
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};
},{}],233:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vhtml = factory());
}(this, (function () { 'use strict';

var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));


},{}]},{},[179]);
