<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ComboBox from '@renderer/lib/ui/components/ComboBox.svelte'
  import Select from '@renderer/lib/ui/components/Select.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Alert from '@renderer/lib/ui/components/Alert.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Description from '@renderer/lib/ui/components/Description.svelte'
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'
  import { StaticSection } from '@renderer/lib/ui/layout/Sections'
  import { GridContainer, GridItem } from '@renderer/lib/ui/layout/Grid'
  import { ColumnsContainer, ColumnItem } from '@renderer/lib/ui/layout/Columns'
  import { Notification, Notifications } from '@renderer/lib/classes/Notifications.svelte'
  import Checkbox from '@renderer/lib/ui/components/Checkbox.svelte'
  import Dropdown from '@renderer/lib/ui/components/DropdownMenu.svelte'
  import Slider from '@renderer/lib/ui/components/Slider.svelte'
  import Switch from '@renderer/lib/ui/components/Switch.svelte'
  import ContextMenu from '@renderer/lib/ui/components/ContextMenu.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Pagination from '@renderer/lib/ui/components/Pagination.svelte'
  import Sheet from '@renderer/lib/ui/components/Sheet.svelte'
  import Dialog from '@renderer/lib/ui/components/Dialog.svelte'

  Breadcrumbs.instance.segments = []

  let alertOpen = $state(false)
  let dialogOpen = $state(false)
  let sheetOpen = $state(false)

  let radioCheckedCM = $state('radio-one')
  let checkboxOneCheckedCM = $state(false)
  let checkboxTwoCheckedCM = $state(true)

  let radioCheckedD = $state('radio-one')
  let checkboxOneCheckedD = $state(false)
  let checkboxTwoCheckedD = $state(true)
</script>

<PageWrapper>
  <ColumnsContainer columns={2} breakpoint>
    <ColumnItem>
      <StaticSection title="Inputs, Labels and Descriptions (Tooltips)">
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
                <Label for="required-input">Required Input</Label>
                <Description>This Input is rerquired and it has an * to prove it xD</Description>
              </div>

              <Input id="required-input" type="url" placeholder="Reqired Input" />
            </div>
          </GridItem>
        </GridContainer>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Buttons">
        <div class="flex items-center flex-wrap gap-2">
          <Button disabled>Example...</Button>
          <Button onclick={() => (alertOpen = true)}>Open</Button>

          <Button mode="neutral" disabled>Example...</Button>
          <Button mode="neutral">Example...</Button>

          <Button mode="success" disabled>Example...</Button>
          <Button mode="success">Example...</Button>

          <Button mode="warning" disabled>Example...</Button>
          <Button mode="warning">Example...</Button>

          <Button mode="danger" disabled>Example...</Button>
          <Button mode="danger">Example...</Button>
        </div>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Selects">
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
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="ComboBoxes">
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
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Alerts, Dialogs & Sheets">
        <div class="flex items-center flex-wrap gap-2">
          <Button mode="neutral" onclick={() => (alertOpen = true)}>Open Alert</Button>

          <Alert bind:open={alertOpen} title="Title" description="This is a really cool alert! We can as you to accept or cancel things here!" />

          <Button mode="neutral" onclick={() => (dialogOpen = true)}>Open Dialog</Button>

          <Dialog bind:open={dialogOpen} title="Title" description="This is a really cool dialog! We can as you to edit whatever we add and it'll not make you change page or anything..">
            <div class="w-full h-full flex flex-col items-center justify-between gap-2">
              <GridContainer columns={2} breakpoint>
                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-1">
                    <div class="flex gap-1 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Description>This Input is rerquired and it has an * to prove it xD</Description>
                    </div>

                    <Input id="required-input" type="url" placeholder="Reqired Input" />
                  </div>
                </GridItem>

                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-1">
                    <div class="flex gap-1 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Description>This Input is rerquired and it has an * to prove it xD</Description>
                    </div>

                    <Input id="required-input" type="url" placeholder="Reqired Input" />
                  </div>
                </GridItem>
              </GridContainer>

              <div class="flex items-center justify-center gap-2 mt-2">
                <Button mode="neutral" onclick={() => (dialogOpen = false)}>Cancel</Button>

                <Button mode="success" onclick={() => (dialogOpen = false)}>Save</Button>
              </div>
            </div>
          </Dialog>

          <Button mode="neutral" onclick={() => (sheetOpen = true)}>Open Sheet</Button>

          <Sheet bind:open={sheetOpen} title="Title" description="On this sheet you can edit whatever we add and it'll not make you change page or anything...">
            <div class="h-full w-full flex flex-col items-center justify-between gap-2">
              <GridContainer columns={1}>
                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-1">
                    <div class="flex gap-1 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Description>This Input is rerquired and it has an * to prove it xD</Description>
                    </div>

                    <Input id="required-input" type="url" placeholder="Reqired Input" />
                  </div>
                </GridItem>
              </GridContainer>

              <div class="flex items-center justify-center gap-2 mt-2">
                <Button mode="neutral" onclick={() => (sheetOpen = false)}>Cancel</Button>

                <Button mode="neutral" onclick={() => (sheetOpen = false)}>Save</Button>
              </div>
            </div>
          </Sheet>
        </div>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Checkboxes">
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
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Sliders">
        <Slider type="single" min={0} max={10} value={5} withTickLabels withTicks />
        <Slider type="multiple" min={0} max={10} value={[4, 6]} withTickLabels withTicks />
        <Slider type="single" disabled min={0} max={10} value={5} />
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Switches">
        <div class="flex items-center flex-wrap gap-2">
          <Switch />
          <Switch disabled />
        </div>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Dropdowns">
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
        >
          <Icon icon="ph:dots-three" class="text-xl" />
        </Dropdown>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Context Menus">
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
          <div class="w-full h-full flex items-center justify-center p-6">Right click here!</div>
        </ContextMenu>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Toasts and Notifications">
        <div class="flex items-center flex-wrap gap-2">
          <Button
            mode="neutral"
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
          </Button>

          <Button
            mode="neutral"
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
          </Button>
        </div>
      </StaticSection>
    </ColumnItem>

    <ColumnItem>
      <StaticSection title="Pagination">
        <Pagination page={1} count={95} perPage={10} />
      </StaticSection>
    </ColumnItem>
  </ColumnsContainer>
</PageWrapper>
