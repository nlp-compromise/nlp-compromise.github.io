<script>
  import Page from './Page.svelte'
</script>

<Page>
  <div>okay but consider-</div>
  <div class="more">all of our information is in text</div>
  <div>and we can't get it out,</div>
  <div>and we don't really have a plan to.</div>
  <div class="space" />
  <div>so this organization</div>
  <div class="more">
    is trying to build some ways
    <ul>
      <div>ways to bounce easy queries off of it</div>
      <div>to flip it around, and mess with it.</div>
      <div>to make text interfaces interesting.</div>
    </ul>
    <div>
      we think open-source, web-focused tools
      <br />
      and a stupidly-good group of contributers
      <br />
      are the best way to build
      <br />
      such a complicated group of things.
    </div>
  </div>
  <kb>&lt;script src="https://unpkg.com/compromise"&gt;&lt;/script&gt;</kb>
  <kb>npm install compromise</kb>
</Page>

<Page>
  <h2>step 1: tokenization</h2>
  <div>compromise/one</div>
  <div>a really, very, uncontroversial way to split sentences and words into bits.</div>
  <div>this basic thing is helping government orgs, banks, and many software companies.</div>
  <div>this super-basic thing has been refined for 8 ruthless github-years</div>
  <div>really - it actually works.</div>
  <div>when someone tells you it's impossible, quietly disagree.</div>
  <div class="row">
    <div>it's like 20kb of javascript</div>
    <div />
    <div>+ symmetric tools</div>
  </div>
  <!-- <Demo /> -->
  <div>sometimes tokenization is enough</div>
  <div>you can do this kinda stuff:</div>
  <ul>
    <li>syllable parsing</li>
    <li>text-typeahead</li>
    <li>indexing and lookup</li>
  </ul>
</Page>

<Page>
  <h2>step 2: word interpretation</h2>
  <div>compromise/two</div>
  <div>there are some complicated things here,</div>
  <div>- but it's not actually that bad -</div>
  <div>you can say 'waterpolo' and 'buffalo' are <i>Nouns</i>,</div>
  <div>without knowing what they are</div>
  <div>and sometimes this is enough.</div>
  <div>
    <div>it was the . of times</div>
    <div>simon says #Verb+</div>
    <div>#FirstName is on #Ordinal</div>
  </div>
  <div>
    <div>creating a series of templates,</div>
    <div>to scoop-up information in text</div>
    <div>like it's in some little database</div>
    <div>and your queries can be ad-hoc.</div>
    <div>it surprising how helpful this is.</div>
    <div>
      and how much leg-work schemes like this can do,
      <br />
      before handing it off to some kind of AI thing.
      <br />
      or sleepy eyeballs.
    </div>
    <ul>
      <li>bot-interfaces</li>
      <li>redaction</li>
      <li>contractions</li>
    </ul>
  </div>
</Page>

<Page>
  <h2>step 3: phrase labelling</h2>
  <div>compromise/three</div>
  <div>
    <div>'captain of the football team' is one thing</div>
    <div>so is 'jet skiing'</div>
    <div>'breaking up'</div>
    <div>and 'Calgary, Alberta'</div>
  </div>
  <div>words are not the most-helpful <i>units</i> for working with text.</div>
  <div>it's too bad.</div>
  <div>words are tricky things-</div>
  <div>usually people want a phrase, a clause, or a slice of words.</div>
  <div>that do one thing.</div>
  <div>this is a harder, more-goofy task, but actually not so bad.</div>
  <div>
    <div>now you can turn 'four hundred and five' into '405'</div>
    <!-- <Demo /> -->
  </div>
  <div>
    <div>pull-out the details -</div>
    <!-- <Demo /> -->
  </div>
  <div>
    <div>or throw a sentence around</div>
    <!-- <Demo /> -->
  </div>
  <ul>
    <li>number parsing</li>
    <li>verb-conjugation</li>
    <li>date parsing</li>
  </ul>
</Page>

<style>
</style>
