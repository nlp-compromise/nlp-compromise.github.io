<script>
  import Caret from './Caret.svelte'
  export let href = '#'
  export let label = 'label'
</script>

<div>
  <a {href} class="container">
    <span class="choose">{label}</span>
    <Caret />
  </a>
</div>

<style>
  .container {
    flex-shrink: 1;
    text-decoration: none;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    flex-wrap: nowrap;
    align-self: flex-start;
    transition: margin-left 180ms;
  }
  .container:hover {
    margin-left: 0.6rem;
    /* height: 250px; */
  }
  .choose {
    color: white;
    font-size: 1.8rem;
    background-color: rgba(70, 130, 180, 0.8);
    min-width: 150px;
    border-radius: 2px;
    text-align: left;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-left: 10%;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    overflow-x: grow;
  }
  .choose:hover {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.5);
  }
</style>
