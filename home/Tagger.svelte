<script>
  import { Page, Grid, TextArea } from '../lib/index.js'
  import nlp from '/Users/spencer/mountain/compromise/src/three.js'
  let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on em. Give me five bees for a quarter, you'd say.`
  let html = ''
  nlp.addWords({
    shelbyville: 'City',
    morganville: 'City',
  })
  const onchange = function (txt) {
    let doc = nlp(txt)
    let nouns = doc.nouns()
    let verbs = doc.verbs()
    let places = doc.places()
    html = doc.html({
      '.nouns': nouns,
      '.verbs': verbs,
      '.places': places,
    })
  }
  onchange(text)
</script>

<Page>
  <div class="top">
    <TextArea value={text} size="18px" cb={onchange} width="80%" height="130px" />
  </div>
  <div class="res" style="position:relative;">
    {@html html}
  </div>
  <div class="end">
    <Grid seed="5091626afd684efdbb8" />
  </div>
</Page>

<style>
  .end {
    width: 200px;
    margin: 1rem;
    padding-bottom: 5rem;
    padding-left: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: center;
    flex-wrap: wrap;
    align-self: flex-end;
  }
  .top {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .res {
    margin: 4rem;
    padding: 1rem;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    line-height: 1.8rem;
  }
  @media only screen and (max-width: 600px) {
    .res {
      margin: 1rem;
      font-size: 0.8rem;
      line-height: 1.4rem;
    }
  }
</style>
