<script lang="ts" module>
  import Alert from '../components/Alert.svelte'

  export type AlertManagerQuestion = {
    title: string
    description: string
    resolve: (value: boolean) => void
  }

  const queue: AlertManagerQuestion[] = $state([])

  export function ask(title: string, description: string): Promise<boolean> {
    return new Promise((resolve) => {
      queue.push({
        title,
        description,
        resolve
      })
    })
  }

  function onaccept(): void {
    const question = queue.shift()
    if (question) {
      question.resolve(true)
    }
  }

  function oncancel(): void {
    const question = queue.shift()
    if (question) {
      question.resolve(false)
    }
  }
</script>

{#if queue.length > 0}
  <Alert title={queue[0].title} description={queue[0].description} {onaccept} {oncancel} />
{/if}
