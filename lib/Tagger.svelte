<script>
  import TextArea from './TextArea.svelte'
  import nlp from '/Users/spencer/mountain/compromise/src/two.js'
  export let text = ``
  $: res = nlp(text).json()
</script>

<div>
  <TextArea value={text} height="1.4rem" />
  <div class="res col">
    {#each res as p, n}
      <div class="row">
        {#each p.terms as term, i}
          <div class="term">
            {term.pre}
            {term.text}
            {term.post}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .res {
    min-height: 20px;
    min-width: 300px;
    margin-left: 3rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
    padding-left: 1rem;
    border-left: 2px solid steelblue;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    align-self: stretch;
  }
  .term {
    margin: 0.5rem;
    border-bottom: 2px solid grey;
  }
</style>
