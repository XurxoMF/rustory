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
  import { StaticContainer, ScrollableContainer, StyledContainer } from '@renderer/lib/ui/layout/Containers'
  import { GridContainer, GridItem } from '@renderer/lib/ui/layout/Containers/Grid'
  import { ColumnsContainer, ColumnItem } from '@renderer/lib/ui/layout/Containers/Columns'
  import { Notification, Notifications } from '@renderer/lib/classes/Notifications.svelte'
  import Checkbox from '@renderer/lib/ui/form/Checkbox.svelte'
  import Dropdown from '@renderer/lib/ui/form/Dropdown.svelte'
  import Slider from '@renderer/lib/ui/form/Slider.svelte'
  import Switch from '@renderer/lib/ui/form/Switch.svelte'
  import ContextMenu from '@renderer/lib/ui/form/ContextMenu.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Pagination from '@renderer/lib/ui/form/Pagination.svelte'

  Breadcrumbs.instance.segments = []

  let alertOpen = $state(false)

  let radioCheckedCM = $state('radio-one')
  let checkboxOneCheckedCM = $state(false)
  let checkboxTwoCheckedCM = $state(true)

  let radioCheckedD = $state('radio-one')
  let checkboxOneCheckedD = $state(false)
  let checkboxTwoCheckedD = $state(true)
</script>

<PageWrapper>
  <ScrollableContainer orientation="vertical">
    <ColumnsContainer columns={2} breakpoint>
      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Inputs, Labels and Descriptions (Tooltips)</p>
            {/snippet}

            <GridContainer columns={3}>
              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label for="readonly-input">Readonly Input</Label>
                    <Description>You can only read but not edit this Input.</Description>
                  </div>

                  <Input id="readonly-input" type="url" placeholder="Readonly Input" value="You can't edit me!" readonly />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label for="disabled-input" disabled>Disabled Input</Label>
                    <Description disabled>This input is disabled so you can't do anything.</Description>
                  </div>

                  <Input id="disabled-input" type="url" placeholder="Disabled Input" disabled />
                </div>
              </GridItem>

              <GridItem>
                <div class="flex flex-col items-start justify-center gap-1">
                  <div class="flex gap-1 items-center">
                    <Label for="required-input" required>Required Input</Label>
                    <Description>This Input is rerquired and it has an * to prove it xD</Description>
                  </div>

                  <Input id="required-input" type="url" placeholder="Reqired Input" />
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
              <p>Buttons</p>
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
          <ScrollableContainer orientation="vertical">
            {#snippet headerContent()}
              <p>Selects</p>
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
                    { label: 'Item 2', value: 'item2', disabled: true },
                    { label: 'Item 3', value: 'item3' },
                    { label: 'Item 4', value: 'item4', disabled: true },
                    { label: 'Item 5', value: 'item5' },
                    { label: 'Item 6', value: 'item6', disabled: true },
                    { label: 'Item 7', value: 'item7' },
                    { label: 'Item 8', value: 'item8', disabled: true },
                    { label: 'Item 9', value: 'item9' },
                    { label: 'Item 10', value: 'item10', disabled: true },
                    { label: 'Item 11', value: 'item11' },
                    { label: 'Item 12', value: 'item12', disabled: true }
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
              <p>ComboBoxes</p>
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
                    { label: 'Item 2', value: 'item2', disabled: true }
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
              <p>Alerts and Dialogs</p>
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
              <p>Checkboxes</p>
            {/snippet}

            <GridContainer>
              <GridItem>
                <div class="flex items-center gap-2 flex-wrap-reverse">
                  <Checkbox disabled />

                  <div class="flex gap-1 items-center">
                    <Label disabled>Example...</Label>
                    <Description disabled>Example...</Description>
                  </div>
                </div>
              </GridItem>

              <GridItem>
                <div class="flex items-center gap-2 flex-wrap-reverse">
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

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Sliders</p>
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
              <p>Switches</p>
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
              <p>Dropdowns</p>
            {/snippet}

            <Dropdown
              groups={[
                {
                  type: 'group',
                  label: 'Item Group',
                  items: [
                    {
                      type: 'item',
                      label: 'One',
                      value: 'one',
                      onselect: () => {
                        const toastInfo = new Toast({ title: 'One cliecked!', type: Toast.Type.INFO, description: ['You clicked one on the DropdownMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                      },
                      icon: 'ph:code'
                    },
                    {
                      type: 'item',
                      label: 'Two',
                      value: 'two',
                      onselect: () => {
                        const toast = new Toast({ title: 'Two cliecked!', type: Toast.Type.INFO, description: ['You clicked two on the DropdownMenu!'] })
                        Toasts.instance.addToast(toast)
                      },
                      icon: 'ph:code',
                      disabled: true
                    }
                  ]
                },
                {
                  type: 'radiogroup',
                  label: 'Radio Group',
                  value: radioCheckedD,
                  items: [
                    {
                      type: 'radioitem',
                      label: 'Radio One',
                      value: 'radio-one'
                    },
                    {
                      type: 'radioitem',
                      label: 'Radio Two',
                      value: 'radio-two',
                      disabled: true
                    }
                  ],
                  onchange: (value: string) => {
                    const toast = new Toast({ title: 'Radio Changed!', type: Toast.Type.INFO, description: [`You clicked ${value} on the DropdownMenu!`] })
                    Toasts.instance.addToast(toast)

                    radioCheckedD = value
                  }
                },
                {
                  type: 'group',
                  label: 'Submenu Group',
                  items: [
                    {
                      type: 'submenu',
                      icon: 'ph:code',
                      label: 'Submenu One',
                      items: [
                        {
                          type: 'group',
                          items: [
                            {
                              type: 'item',
                              label: 'Inside First Menu',
                              value: 'inside-first-menu',
                              onselect: () => {
                                const toastInfo = new Toast({
                                  title: 'Inside first Menu cliecked!',
                                  type: Toast.Type.INFO,
                                  description: ['You clicked inside-first-menu on the DropdownMenu!']
                                })
                                Toasts.instance.addToast(toastInfo)
                              },
                              icon: 'ph:code'
                            },
                            {
                              type: 'itemsubmenu',
                              icon: 'ph:code',
                              value: 'submenu-two',
                              label: 'Submenu Two',
                              items: [
                                {
                                  type: 'group',
                                  items: [
                                    {
                                      type: 'item',
                                      label: 'Inside Second Menu',
                                      value: 'inside-second-menu',
                                      onselect: () => {
                                        const toastInfo = new Toast({
                                          title: 'Inside Second Menu cliecked!',
                                          type: Toast.Type.INFO,
                                          description: ['You clicked inside-second-menu on the DropdownMenu!']
                                        })
                                        Toasts.instance.addToast(toastInfo)
                                      },
                                      icon: 'ph:code'
                                    }
                                  ]
                                }
                              ],
                              onselect: () => {
                                const toastInfo = new Toast({
                                  title: 'Submenu Two cliecked!',
                                  type: Toast.Type.INFO,
                                  description: ['You clicked submenu-two on the DropdownMenu!']
                                })
                                Toasts.instance.addToast(toastInfo)
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'group',
                  label: 'Checkbox Group',
                  items: [
                    {
                      type: 'checkboxitem',
                      label: 'Checkbox One',
                      value: 'checkbox-one',
                      checked: checkboxOneCheckedD,
                      onchange: (changed) => {
                        const toastInfo = new Toast({ title: 'Checkbox One cliecked!', type: Toast.Type.INFO, description: ['You clicked checkbox-one on the ContextMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                        checkboxOneCheckedD = changed
                      }
                    },
                    {
                      type: 'checkboxitem',
                      label: 'Checkbox Two',
                      value: 'checkbox-two',
                      checked: checkboxTwoCheckedD,
                      disabled: true,
                      onchange: (changed) => {
                        const toastInfo = new Toast({ title: 'Checkbox Two cliecked!', type: Toast.Type.INFO, description: ['You clicked checkbox-two on the ContextMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                        checkboxTwoCheckedD = changed
                      }
                    }
                  ]
                }
              ]}
              padding="icon"
              size="square"
            >
              <Icon icon="ph:dots-three" class="text-xl" />
            </Dropdown>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Context Menus</p>
            {/snippet}

            <ContextMenu
              groups={[
                {
                  type: 'group',
                  label: 'Item Group',
                  items: [
                    {
                      type: 'item',
                      label: 'One',
                      value: 'one',
                      onselect: () => {
                        const toastInfo = new Toast({ title: 'One cliecked!', type: Toast.Type.INFO, description: ['You clicked one on the ContextMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                      },
                      icon: 'ph:code'
                    },
                    {
                      type: 'item',
                      label: 'Two',
                      value: 'two',
                      onselect: () => {
                        const toast = new Toast({ title: 'Two cliecked!', type: Toast.Type.INFO, description: ['You clicked two on the ContextMenu!'] })
                        Toasts.instance.addToast(toast)
                      },
                      icon: 'ph:code',
                      disabled: true
                    }
                  ]
                },
                {
                  type: 'radiogroup',
                  label: 'Radio Group',
                  value: radioCheckedCM,
                  items: [
                    {
                      type: 'radioitem',
                      label: 'Radio One',
                      value: 'radio-one'
                    },
                    {
                      type: 'radioitem',
                      label: 'Radio Two',
                      value: 'radio-two',
                      disabled: true
                    }
                  ],
                  onchange: (value: string) => {
                    const toast = new Toast({ title: 'Radio Changed!', type: Toast.Type.INFO, description: [`You clicked ${value} on the ContextMenu!`] })
                    Toasts.instance.addToast(toast)

                    radioCheckedCM = value
                  }
                },
                {
                  type: 'group',
                  label: 'Submenu Group',
                  items: [
                    {
                      type: 'submenu',
                      icon: 'ph:code',
                      label: 'Submenu One',
                      items: [
                        {
                          type: 'group',
                          items: [
                            {
                              type: 'item',
                              label: 'Inside First Menu',
                              value: 'inside-first-menu',
                              onselect: () => {
                                const toastInfo = new Toast({
                                  title: 'Inside first Menu cliecked!',
                                  type: Toast.Type.INFO,
                                  description: ['You clicked inside-first-menu on the ContextMenu!']
                                })
                                Toasts.instance.addToast(toastInfo)
                              },
                              icon: 'ph:code'
                            },
                            {
                              type: 'itemsubmenu',
                              icon: 'ph:code',
                              value: 'submenu-two',
                              label: 'Submenu Two',
                              items: [
                                {
                                  type: 'group',
                                  items: [
                                    {
                                      type: 'item',
                                      label: 'Inside Second Menu',
                                      value: 'inside-second-menu',
                                      onselect: () => {
                                        const toastInfo = new Toast({
                                          title: 'Inside Second Menu cliecked!',
                                          type: Toast.Type.INFO,
                                          description: ['You clicked inside-second-menu on the ContextMenu!']
                                        })
                                        Toasts.instance.addToast(toastInfo)
                                      },
                                      icon: 'ph:code'
                                    }
                                  ]
                                }
                              ],
                              onselect: () => {
                                const toastInfo = new Toast({
                                  title: 'Submenu Two cliecked!',
                                  type: Toast.Type.INFO,
                                  description: ['You clicked submenu-two on the ContextMenu!']
                                })
                                Toasts.instance.addToast(toastInfo)
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'group',
                  label: 'Checkbox Group',
                  items: [
                    {
                      type: 'checkboxitem',
                      label: 'Checkbox One',
                      value: 'checkbox-one',
                      checked: checkboxOneCheckedCM,
                      onchange: (changed) => {
                        const toastInfo = new Toast({ title: 'Checkbox One cliecked!', type: Toast.Type.INFO, description: ['You clicked checkbox-one on the ContextMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                        checkboxOneCheckedCM = changed
                      }
                    },
                    {
                      type: 'checkboxitem',
                      label: 'Checkbox Two',
                      value: 'checkbox-two',
                      checked: checkboxTwoCheckedCM,
                      disabled: true,
                      onchange: (changed) => {
                        const toastInfo = new Toast({ title: 'Checkbox Two cliecked!', type: Toast.Type.INFO, description: ['You clicked checkbox-two on the ContextMenu!'] })
                        Toasts.instance.addToast(toastInfo)
                        checkboxTwoCheckedCM = changed
                      }
                    }
                  ]
                }
              ]}
            >
              <StyledContainer>
                <div class="w-full h-full flex items-center justify-center p-6">Right click here!</div>
              </StyledContainer>
            </ContextMenu>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Toasts and Notifications</p>
            {/snippet}

            <div class="flex items-center flex-wrap gap-2">
              <ButtonNeutral
                onclick={() => {
                  const toastInfo = new Toast({ title: 'Info toast', type: Toast.Type.INFO, description: ['This is an info toast!'] })
                  Toasts.instance.addToast(toastInfo)

                  const toastWarning = new Toast({
                    title: 'Warning toast',
                    type: Toast.Type.WARNING,
                    description: ['This is an warning toast with a long ass description how will this fit on a toast is crazy!']
                  })
                  Toasts.instance.addToast(toastWarning)

                  const toastError = new Toast({
                    title: 'Danger toast',
                    type: Toast.Type.ERROR,
                    description: ['This is an error toast! Click it to show another toast!'],
                    onclick: () => {
                      const anotherToast = new Toast({ title: 'Another toast', type: Toast.Type.INFO, description: ['This is another toast that will last 10 seconds!'], hideAfter: 10000 })
                      Toasts.instance.addToast(anotherToast)
                    }
                  })
                  Toasts.instance.addToast(toastError)

                  const toastSuccess = new Toast({ title: 'Success toast', type: Toast.Type.SUCCESS, description: ['This is an success toast! Keep your cursor over it to make it last forver!'] })
                  Toasts.instance.addToast(toastSuccess)
                }}
              >
                Toasts
              </ButtonNeutral>

              <ButtonNeutral
                onclick={async () => {
                  const notification = new Notification({
                    title: 'Example notification',
                    description: 'This is a system notification! How cool is this?!?!',
                    onclick: () => {
                      const toastInfo = new Toast({ title: 'Notification clicked!', type: Toast.Type.INFO, description: ['You clicked the system notification!'] })
                      Toasts.instance.addToast(toastInfo)
                    }
                  })
                  Notifications.instance.addNotification(notification)
                }}
              >
                Native Notification
              </ButtonNeutral>
            </div>
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>

      <ColumnItem>
        <StyledContainer>
          <StaticContainer>
            {#snippet headerContent()}
              <p>Pagination</p>
            {/snippet}

            <Pagination page={1} count={100} perPage={10} />
          </StaticContainer>
        </StyledContainer>
      </ColumnItem>
    </ColumnsContainer>
  </ScrollableContainer>
</PageWrapper>
