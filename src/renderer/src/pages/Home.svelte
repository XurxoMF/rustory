<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ComboBox from '@renderer/lib/ui/form/ComboBox.svelte'
  import Select from '@renderer/lib/ui/form/Select.svelte'
  import Input from '@renderer/lib/ui/form/Input.svelte'
  import { Button, ButtonNeutral, ButtonSuccess, ButtonDanger, ButtonWarning } from '@renderer/lib/ui/form/Buttons'
  import Alert from '@renderer/lib/ui/form/Alert.svelte'
  import Label from '@renderer/lib/ui/form/Label.svelte'
  import Description from '@renderer/lib/ui/form/Description.svelte'
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'
  import { StaticContainer, CollapsibleContainer, ScrollableContainer, StyledContainer } from '@renderer/lib/ui/layout/Containers'
  import { GridContainer, GridItem } from '@renderer/lib/ui/layout/Containers/Grid'
  import { ColumnsContainer, ColumnItem } from '@renderer/lib/ui/layout/Containers/Columns'

  Breadcrumbs.instance.segments = []

  let open = $state(false)
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <ColumnsContainer columns={2}>
      <ColumnItem>
        <StyledContainer>
          <CollapsibleContainer open>
            {#snippet headerContent()}
              <p>Inputs in a Collapsible Section</p>
            {/snippet}

            <GridContainer columns={1}>
              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="text" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="text" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="text" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="number" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="number" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="number" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="email" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="email" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="email" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="password" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="password" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="password" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="tel" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="tel" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="tel" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="url" placeholder="Hola" readonly /></GridItem>
                  <GridItem><Input type="url" placeholder="Hola" disabled /></GridItem>
                  <GridItem><Input type="url" placeholder="Hola" /></GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </CollapsibleContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <ScrollableContainer orientation="vertical">
            {#snippet headerContent()}
              <p>Select in a Scrollable Section</p>
            {/snippet}

            <GridContainer columns={2}>
              <GridItem>
                <Select
                  type="single"
                  placeholder="Hola"
                  disabled
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                />
              </GridItem>

              <GridItem>
                <Select
                  type="single"
                  placeholder="Hola"
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </ScrollableContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <ScrollableContainer orientation="vertical">
            {#snippet headerContent()}
              <p>ComboBox in a ScrollableSection</p>
            {/snippet}

            <GridContainer columns={2}>
              <GridItem>
                <ComboBox
                  type="single"
                  inputProps={{ placeholder: 'Hola' }}
                  disabled
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                />
              </GridItem>

              <GridItem>
                <ComboBox
                  type="single"
                  inputProps={{ placeholder: 'Hola' }}
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </ScrollableContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Labels & Descriptions in a Static Section</p>
            {/snippet}

            <GridContainer columns={3}>
              <GridItem>
                <div class="flex gap-1 items-center">
                  <Label required>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" readonly />
              </GridItem>

              <GridItem>
                <div class="flex gap-1 items-center">
                  <Label disabled>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" disabled />
              </GridItem>

              <GridItem>
                <div class="flex gap-1 items-center">
                  <Label required>Hola</Label>
                  <Description>Hola</Description>
                </div>
                <Input type="url" placeholder="Hola" />
              </GridItem>
            </GridContainer>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Alert & Dialog in a Static Section</p>
            {/snippet}

            <ButtonNeutral padding="text" onclick={() => (open = true)}>Open</ButtonNeutral>
            <Alert bind:open title="Title">
              {#snippet description()}
                <p>Hola mundo!</p>
              {/snippet}
            </Alert>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Toasts in a Static Section</p>
            {/snippet}

            <ButtonNeutral
              padding="text"
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
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Buttons in a Static Section</p>
            {/snippet}

            <div class="flex items-center flex-wrap gap-2">
              <Button padding="text" disabled>Hola</Button>
              <Button padding="text" onclick={() => (open = true)}>Open</Button>

              <ButtonNeutral padding="text" disabled>Hola</ButtonNeutral>
              <ButtonNeutral padding="text">Hola</ButtonNeutral>

              <ButtonSuccess padding="text" disabled>Hola</ButtonSuccess>
              <ButtonSuccess padding="text">Hola</ButtonSuccess>

              <ButtonDanger padding="text" disabled>Hola</ButtonDanger>
              <ButtonDanger padding="text">Hola</ButtonDanger>

              <ButtonWarning padding="text" disabled>Hola</ButtonWarning>
              <ButtonWarning padding="text">Hola</ButtonWarning>
            </div>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>
    </ColumnsContainer>
  </ScrollableContainer>
</PageWrapper>
