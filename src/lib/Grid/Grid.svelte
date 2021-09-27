<script>
  import Ratio from '../Ratio.svelte'
  import combos from './combos'
  import { generate, getNums, pick } from './seed'
  export let images = []
  export let image = null
  export let ratio = 1.618 //0.382
  export let rows = 3
  export let cols = 3
  export let seed = null
  let demo = false
  if (seed === null) {
    seed = generate()
    demo = true
  }
  let nums = getNums(seed, 65)
  if (image && images.length === 0) {
    images.push(image)
  }

  let colors = pick(combos, nums.pop())
  let cells = []
  for (let i = 0; i < rows * cols; i += 1) {
    let type = pick(['empty', 'empty', 'empty', 'color', 'image'], nums.pop())
    if (images.length === 0 && type === 'image') {
      type = 'color'
    }
    let cell = { type: type }
    if (type === 'color') {
      cell.color = pick(colors, nums.pop())
      cell.size = pick(['one', 'one', 'row2', 'col2', 'four'], nums.pop())
    }
    if (type === 'image') {
      cell.image = pick(images, nums.pop())
      cell.size = pick(['one', 'row2', 'col2', 'four'], nums.pop())
    }
    cells.push(cell)
  }
</script>

<Ratio {ratio}>
  <div
    class="goldGrid"
    style="grid-template-columns:repeat({cols}, 1fr); grid-template-rows:repeat({rows},
    1fr);"
  >
    {#each cells as cell}
      {#if cell.type === 'empty'}
        <div />
      {:else if cell.type === 'color'}
        <div class="color {cell.size}" style="background-color:{cell.color};" />
      {:else if cell.type === 'image'}
        <div class="img {cell.size}" style="background-image: url({cell.image})" />
      {/if}
    {/each}
  </div>
</Ratio>

{#if demo}
  <div class="f1">{seed}</div>
{/if}

<style>
  .goldGrid {
    display: grid;
    height: 100%;
    margin-top: 60px;
    margin-bottom: 50px;
  }
  /* tablet - change grid6 to grid3 */
  @media (max-width: 900px) {
    .goldGrid {
      grid-template-columns: 1fr 1.618fr 1fr 1.618fr;
      justify-self: stretch;
      min-height: 10rem;
    }
  }
  .one {
  }
  .row2 {
    grid-column: span 2;
  }
  .col2 {
    grid-row: span 2;
  }
  .four {
    grid-column: span 2;
    grid-row: span 2;
  }
  .color {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .img {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
</style>
