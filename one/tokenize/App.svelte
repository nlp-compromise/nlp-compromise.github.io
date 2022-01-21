<script>
  import { Page, Back, One, Left, Two, CodeMirror, Below, Code, TextArea, Three } from '../../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  let str = `i have two questions. 'Why lie?' and 'Lies, why?'`

  $: res = nlp(str).json()

  const doit = function () {
    console.log('=-=-=-= here -=-=-=-')
    res = nlp(str).json()
  }

  const showSpaces = function (str) {
    str = str.replace(/ /g, '_')
    str = str.replace(/\r?\n/g, '⏎')
    return str
  }
  const showText = function (term) {
    if (term.machine) {
      return `[${term.machine}]`
    }
    return term.text
  }
  let example = `let doc = nlp('i was saying boo-urns')
doc.json()
/*[{
    text: 'I was saying boo-urns.',
    terms: [
      {
        text: 'I',
        normal: 'i',
        pre: '',
        post: ' '
      },
      {
        text: 'was',
        pre: '',
        post: ' '
      },
      {
        text: 'saying',
        pre: '',
        post: ' '
      },
      {
        text: 'boo',
        pre: '',
        post: '-'
      },
      {
        text: 'urns',
        pre: '',
        post: '.'
      }
    ]
  }]
*/
`
</script>

<div class="col">
  <Back href="https://compromise.cool" />
  <Page bottom="40px">
    <div class="lib">compromise/one/tokenize</div>
    <!-- <div class="plugin">match-syntax</div> -->
    <div class="down tab desc">text is more useful when it's json.</div>
    <CodeMirror bind:text={str} />

    <div class="res col">
      {#each res as o, n}
        <div class="sentence row">
          {#each o.terms as term, i}
            <div class="space pre" class:empty={!term.pre}>{showSpaces(term.pre)}</div>
            <div class="term">{showText(term)}</div>
            <div class="space post" class:empty={!term.post}>{showSpaces(term.post)}</div>
          {/each}
        </div>
        {#if res[n + 1]}
          <div class="div" />
        {/if}
      {/each}
    </div>

    <Two>
      <Code js={example} width="500px" />
    </Two>

    <Three>
      viz inspired by <a href="https://www.inkandswitch.com/peritext/">Peritext</a> by Geoffrey Litt.
    </Three>
  </Page>
  <Below>
    <a href="https://observablehq.com/@spencermountain/compromise-match-syntax" class="">docs</a>
    <a href="https://github.com/spencermountain/compromise#two" class="">github</a>
  </Below>
</div>

<style></style>
