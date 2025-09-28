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
  import Alert from '@renderer/lib/ui/form/Alert.svelte'
  import Label from '@renderer/lib/ui/form/Label.svelte'
  import Description from '@renderer/lib/ui/form/Description.svelte'
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'
  import CollapsibleContainer from '@renderer/lib/ui/layout/Containers/CollapsibleContainer.svelte'
  import GridContainer from '@renderer/lib/ui/layout/Containers/Grid/GridContainer.svelte'
  import GridItem from '@renderer/lib/ui/layout/Containers/Grid/GridItem.svelte'
  import ScrollableContainer from '@renderer/lib/ui/layout/Containers/ScrollableContainer.svelte'
  import StyledContainer from '@renderer/lib/ui/layout/Containers/StyledContainer.svelte'

  Breadcrumbs.instance.segments = []

  let open = $state(false)
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <GridContainer columns={1}>
      <GridItem>
        <StyledContainer>
          <ScrollableContainer orientation="vertical">
            {#snippet headerContent()}
              <p>Select in a Scrollable Section</p>
            {/snippet}

            <div class="flex items-center gap-2">
              <Select
                type="single"
                placeholder="Hola"
                disabled
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
            </div>
          </ScrollableContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <ScrollableContainer orientation="vertical">
            {#snippet headerContent()}
              <p>ComboBox in a ScrollableSection</p>
            {/snippet}

            <div class="flex items-center gap-2">
              <ComboBox
                type="single"
                inputProps={{ placeholder: 'Hola' }}
                disabled
                items={[
                  { label: 'Item 1', value: 'item1' },
                  { label: 'Item 2', value: 'item2' }
                ]}
              />

              <ComboBox
                type="single"
                inputProps={{ placeholder: 'Hola' }}
                items={[
                  { label: 'Item 1', value: 'item1' },
                  { label: 'Item 2', value: 'item2' }
                ]}
              />
            </div>
          </ScrollableContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <CollapsibleContainer open>
            {#snippet headerContent()}
              <p>Inputs in a Collapsible Section</p>
            {/snippet}

            <GridContainer columns={1}>
              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="text" placeholder="Hola" readonly />
                  <Input type="text" placeholder="Hola" disabled />
                  <Input type="text" placeholder="Hola" />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="number" placeholder="Hola" readonly />
                  <Input type="number" placeholder="Hola" disabled />
                  <Input type="number" placeholder="Hola" />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="email" placeholder="Hola" readonly />
                  <Input type="email" placeholder="Hola" disabled />
                  <Input type="email" placeholder="Hola" />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="password" placeholder="Hola" readonly />
                  <Input type="password" placeholder="Hola" disabled />
                  <Input type="password" placeholder="Hola" />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="tel" placeholder="Hola" readonly />
                  <Input type="tel" placeholder="Hola" disabled />
                  <Input type="tel" placeholder="Hola" />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2">
                  <Input type="url" placeholder="Hola" readonly />
                  <Input type="url" placeholder="Hola" disabled />
                  <Input type="url" placeholder="Hola" />
                </div>
              </GridItem>
            </GridContainer>
          </CollapsibleContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Labels & Descriptions in a Static Section</p>
            {/snippet}

            <div class="flex items-center gap-2">
              <div class="w-full flex flex-col">
                <div class="flex gap-1 items-center">
                  <Label required>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" readonly />
              </div>

              <div class="w-full flex flex-col">
                <div class="flex gap-1 items-center">
                  <Label disabled>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" disabled />
              </div>

              <div class="w-full flex flex-col">
                <div class="flex gap-1 items-center">
                  <Label required>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" />
              </div>
            </div>
          </StaticContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Alert & Dialog in a Static Section</p>
            {/snippet}

            <ButtonNeutral mode="text" onclick={() => (open = true)}>Open</ButtonNeutral>
            <Alert bind:open title="Title">
              {#snippet description()}
                <p>Hola mundo!</p>
              {/snippet}
            </Alert>
          </StaticContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Toasts in a Static Section</p>
            {/snippet}

            <ButtonNeutral
              mode="text"
              onclick={() => {
                const toastInfo = new Toast({ title: 'Info toast', type: Toast.Type.INFO, description: 'This is an info toast!' })
                Toasts.instance.addToast(toastInfo)

                const toastWarning = new Toast({
                  title: 'Warning toast',
                  type: Toast.Type.WARNING,
                  description: 'This is an warning toast with a long ass description how will this fit on a toast is crazy!'
                })
                Toasts.instance.addToast(toastWarning)

                const toastError = new Toast({
                  title: 'Danger toast',
                  type: Toast.Type.ERROR,
                  description: 'This is an error toast! Click it to show another toast!',
                  onclick: () => {
                    const anotherToast = new Toast({ title: 'Another toast', type: Toast.Type.INFO, description: 'This is another toast that will last 10 seconds!', hideAfter: 10000 })
                    Toasts.instance.addToast(anotherToast)
                  }
                })
                Toasts.instance.addToast(toastError)

                const toastSuccess = new Toast({ title: 'Success toast', type: Toast.Type.SUCCESS, description: 'This is an success toast! Keep your cursor over it to make it last forver!' })
                Toasts.instance.addToast(toastSuccess)
              }}
            >
              Open
            </ButtonNeutral>
          </StaticContainer>
        </StyledContainer>
      </GridItem>

      <GridItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Buttons in a Static Section</p>
            {/snippet}

            <div class="flex items-center gap-2">
              <Button mode="text" disabled>Hola</Button>
              <Button mode="text" onclick={() => (open = true)}>Open</Button>

              <ButtonNeutral mode="text" disabled>Hola</ButtonNeutral>
              <ButtonNeutral mode="text">Hola</ButtonNeutral>

              <ButtonSuccess mode="text" disabled>Hola</ButtonSuccess>
              <ButtonSuccess mode="text">Hola</ButtonSuccess>

              <ButtonDanger mode="text" disabled>Hola</ButtonDanger>
              <ButtonDanger mode="text">Hola</ButtonDanger>

              <ButtonWarning mode="text" disabled>Hola</ButtonWarning>
              <ButtonWarning mode="text">Hola</ButtonWarning>
            </div>
          </StaticContainer>
        </StyledContainer>
      </GridItem>
    </GridContainer>
  </ScrollableContainer>
</PageWrapper>
