<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import { StaticContainer } from '@renderer/lib/ui/layout/Containers'
  import ComboBox from '@renderer/lib/ui/form/ComboBox.svelte'
  import Select from '@renderer/lib/ui/form/Select.svelte'
  import Input from '@renderer/lib/ui/form/Input.svelte'
  import Button from '@renderer/lib/ui/form/Buttons/Button.svelte'
  import ButtonNeutral from '@renderer/lib/ui/form/Buttons/ButtonNeutral.svelte'
  import ButtonSuccess from '@renderer/lib/ui/form/Buttons/ButtonSuccess.svelte'
  import ButtonDanger from '@renderer/lib/ui/form/Buttons/ButtonDanger.svelte'
  import ButtonWarning from '@renderer/lib/ui/form/Buttons/ButtonWarning.svelte'
  import ButtonTransparent from '@renderer/lib/ui/form/Buttons/ButtonTransparent.svelte'

  Breadcrumbs.instance.segments = []
</script>

<PageWrapper>
  <StaticContainer>
    <p>Hola mundo!</p>

    <div class="flex gap-2 mb-2">
      <ComboBox
        type="single"
        inputProps={{ placeholder: 'Hola' }}
        items={[
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' }
        ]}
      />

      <Select
        type="single"
        placeholder="Hola"
        items={[
          { label: 'Item 1', value: 'item1' },
          { label: 'Item 2', value: 'item2' }
        ]}
      />

      <Input type="text" placeholder="Hola" />
    </div>

    <div class="flex gap-2">
      <Button mode="text">Hola</Button>

      <ButtonNeutral mode="text">Hola</ButtonNeutral>

      <ButtonSuccess mode="text">Hola</ButtonSuccess>

      <ButtonDanger mode="text">Hola</ButtonDanger>

      <ButtonWarning mode="text">Hola</ButtonWarning>

      <ButtonTransparent mode="text">Hola</ButtonTransparent>
    </div>
  </StaticContainer>
</PageWrapper>
