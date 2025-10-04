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
  import { Notification, Notifications } from '@renderer/lib/classes/Notifications.svelte'
  import Checkbox from '@renderer/lib/ui/form/Checkbox.svelte'
  import Dropdown from '@renderer/lib/ui/form/Dropdown.svelte'
  import Slider from '@renderer/lib/ui/form/Slider.svelte'
  import Switch from '@renderer/lib/ui/form/Switch.svelte'

  Breadcrumbs.instance.segments = []

  let alertOpen = $state(false)
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <ColumnsContainer columns={2} breakpoint>
      <ColumnItem>
        <StyledContainer>
          <CollapsibleContainer open>
            {#snippet headerContent()}
              <p>Inputs in a Collapsible Section</p>
            {/snippet}

            <GridContainer columns={1}>
              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="text" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="text" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="text" placeholder="Example..." /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="number" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="number" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="number" placeholder="Example..." /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="email" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="email" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="email" placeholder="Example..." /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="password" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="password" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="password" placeholder="Example..." /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="tel" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="tel" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="tel" placeholder="Example..." /></GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <GridContainer columns={3}>
                  <GridItem><Input type="url" placeholder="Example..." readonly /></GridItem>
                  <GridItem><Input type="url" placeholder="Example..." disabled /></GridItem>
                  <GridItem><Input type="url" placeholder="Example..." /></GridItem>
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
                  placeholder="Example..."
                  disabled
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                  onValueChange={(value: string) => console.log(value)}
                />
              </GridItem>

              <GridItem>
                <Select
                  type="single"
                  placeholder="Example..."
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                  onValueChange={(value: string) => console.log(value)}
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
                  inputProps={{ placeholder: 'Example...' }}
                  disabled
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                  onValueChange={(value: string) => console.log(value)}
                />
              </GridItem>

              <GridItem>
                <ComboBox
                  type="single"
                  inputProps={{ placeholder: 'Example...' }}
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' }
                  ]}
                  onValueChange={(value: string) => console.log(value)}
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
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label required>Example...</Label>
                    <Description>Example...</Description>
                  </div>

                  <Input type="url" placeholder="Example..." readonly />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label disabled>Example...</Label>
                    <Description>Example...</Description>
                  </div>

                  <Input type="url" placeholder="Example..." disabled />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label required>Example...</Label>
                    <Description>Example...</Description>
                  </div>

                  <Input type="url" placeholder="Example..." />
                </div>
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

            <ButtonNeutral onclick={() => (alertOpen = true)}>Open</ButtonNeutral>
            <Alert bind:open={alertOpen} title="Title">
              {#snippet description()}
                <p>Example... mundo!</p>
              {/snippet}
            </Alert>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Slider in a Static Section</p>
            {/snippet}

            <Slider type="single" min={0} max={10} value={5} withThumbs withTicks />
            <Slider type="multiple" min={0} max={10} value={[4, 6]} withThumbs withTicks />
            <Slider type="single" disabled min={0} max={10} value={5} />
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Switch in a Static Section</p>
            {/snippet}

            <div class="flex items-center flex-wrap gap-2">
              <Switch />
              <Switch disabled />
            </div>
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
              Show
            </ButtonNeutral>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>System Notification in a Static Section</p>
            {/snippet}

            <ButtonNeutral
              onclick={async () => {
                const notification = new Notification({
                  title: 'Example notification',
                  description: 'This is a system notification! How cool is this?!?!',
                  onclick: () => {
                    const toastInfo = new Toast({ title: 'Notification clicked!', type: Toast.Type.INFO, description: 'You clicked the system notification!' })
                    Toasts.instance.addToast(toastInfo)
                  }
                })
                Notifications.instance.addNotification(notification)
              }}
            >
              Show
            </ButtonNeutral>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Dropdown in a Static Section</p>
            {/snippet}

            <Dropdown
              items={[
                {
                  label: 'One',
                  value: 'one',
                  onselect: () => {
                    const toastInfo = new Toast({ title: 'One cliecked!', type: Toast.Type.INFO, description: 'You clicked one on the Dropdown!' })
                    Toasts.instance.addToast(toastInfo)
                  },
                  icon: 'ph:code-bold'
                },
                {
                  label: 'Two',
                  value: 'two',
                  onselect: () => {
                    const toastInfo = new Toast({ title: 'Two cliecked!', type: Toast.Type.INFO, description: 'You clicked two on the Dropdown!' })
                    Toasts.instance.addToast(toastInfo)
                  },
                  icon: 'ph:code-bold'
                },
                {
                  label: 'Three',
                  value: 'three',
                  onselect: () => {
                    const toastInfo = new Toast({ title: 'Three cliecked!', type: Toast.Type.INFO, description: "How the hell you clicked three? It's disabled!" })
                    Toasts.instance.addToast(toastInfo)
                  },
                  icon: 'ph:code-bold'
                }
              ]}
            />
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
              <Button disabled>Example...</Button>
              <Button onclick={() => (alertOpen = true)}>Open</Button>

              <ButtonNeutral disabled>Example...</ButtonNeutral>
              <ButtonNeutral>Example...</ButtonNeutral>

              <ButtonSuccess disabled>Example...</ButtonSuccess>
              <ButtonSuccess>Example...</ButtonSuccess>

              <ButtonDanger disabled>Example...</ButtonDanger>
              <ButtonDanger>Example...</ButtonDanger>

              <ButtonWarning disabled>Example...</ButtonWarning>
              <ButtonWarning>Example...</ButtonWarning>
            </div>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Checkbox in a Static Section</p>
            {/snippet}

            <GridContainer>
              <GridItem>
                <div class="flex items-center gap-1 flex-wrap-reverse">
                  <Checkbox disabled />

                  <div class="flex gap-1 items-center">
                    <Label disabled>Example...</Label>
                    <Description>Example...</Description>
                  </div>
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-1 flex-wrap-reverse">
                  <Checkbox />

                  <div class="flex gap-1 items-center">
                    <Label>Example...</Label>
                    <Description>Example...</Description>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>
    </ColumnsContainer>
  </ScrollableContainer>
</PageWrapper>
