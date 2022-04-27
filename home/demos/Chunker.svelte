<script>
  import Textarea from '../../lib/TextArea.svelte'
  import nlp from 'compromise/one'
  let text = `Like the time I caught the ferry over to Shelbyville - I needed a new heel for my shoe, so I decided to go to Morganville which is what they called Shelbyville in those days. So, I tied an onion to my belt which was the style at the time. Now, to take the ferry cost a nickel. And in those days, nickels had pictures of bumblebees on ‘em.`
  let json = nlp(text).json({ terms: { tags: false, index: false, machine: false } })
  const onchange = function (txt) {
    json = nlp(txt).json()
  }
</script>

<div style="min-width:800px;">
  <Textarea value={text} size="18px" cb={onchange} />
  <div class="json down">here</div>
</div>

<style></style>
