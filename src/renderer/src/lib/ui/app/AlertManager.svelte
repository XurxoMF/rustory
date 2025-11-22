<script lang="ts" module>
  import Alert, { type AlertModeTypes } from '../components/Alert.svelte'

  export type AlertManagerQuestion = {
    title: string
    description: string
    mode?: AlertModeTypes | undefined
    resolve: (value: boolean) => void
  }

  const queue: AlertManagerQuestion[] = $state([])

  export function ask(title: string, description: string, mode?: AlertModeTypes | undefined): Promise<boolean> {
    return new Promise((resolve) => {
      queue.push({
        title,
        description,
        mode,
        resolve
      })
    })
  }

  function onaccept(question: AlertManagerQuestion): void {
    if (question) {
      question.resolve(true)
    }
    deleteQuestion()
  }

  function oncancel(question: AlertManagerQuestion): void {
    if (question) {
      question.resolve(false)
    }
    deleteQuestion()
  }

  // This is done this way so the animation plays before dissapearing
  function deleteQuestion(): void {
    setTimeout(() => {
      queue.shift()
    }, 200)
  }
</script>

{#if queue.length > 0}
  <Alert
    title={queue[0].title}
    description={queue[0].description}
    mode={queue[0].mode}
    onaccept={() => onaccept(queue[0])}
    oncancel={() => oncancel(queue[0])}
  />
{/if}
