<script lang="ts">
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import PageWrapper from '@renderer/lib/ui/layout/PageWrapper.svelte'
  import ComboBox, { type ComboBoxItem } from '@renderer/lib/ui/components/ComboBox.svelte'
  import Select, { type SelectItem } from '@renderer/lib/ui/components/Select.svelte'
  import Input from '@renderer/lib/ui/components/Input.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Alert from '@renderer/lib/ui/components/Alert.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'
  import Info from '@renderer/lib/ui/components/Info.svelte'
  import { Toast, Toasts } from '@renderer/lib/classes/Toasts.svelte'
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
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'
  import H3 from '@renderer/lib/ui/components/H3.svelte'
  import P from '@renderer/lib/ui/components/P.svelte'
  import Hint from '@renderer/lib/ui/components/Hint.svelte'

  Breadcrumbs.instance.segments = []

  let inputValue = $state('')

  const SELECT_ITEMS: SelectItem[] = [
    { label: 'Disabled Value', value: 'disabled-value', disabled: true },
    { label: 'Enabled Value', value: 'enabled-value' },
    { label: 'Commented Value', value: 'comment-value', comment: 'This is a comment' }
  ]
  let selectValue = $state(undefined)

  const COMBOBOX_ITEMS: ComboBoxItem[] = [
    { label: 'Disabled Value', value: 'disabled-value', disabled: true },
    { label: 'Enabled Value', value: 'enabled-value' },
    { label: 'Commented Value', value: 'comment-value', comment: 'This is a comment' }
  ]
  let comboboxValue = $state(undefined)

  const SLIDER_MIN = 0
  const SLIDER_MAX = 50
  const SLIDER_INTERVAL = 5
  let sliderValue = $state([15, 35])

  let checkboxValue = $state(false)

  let switchValue = $state(false)

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

<PageWrapper title="Components Demo" description="This is a demo of all the components! Mostly used during development.">
  <ColumnsContainer columns={3} gap="xl" isBreakpoint>
    <!-- Inputs & Buttons -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Inputs & Buttons</H3>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="disabled-input" disabled>Disabled Input & Button</Label>
            <Info disabled>You can't interact with this components!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="disabled-input" type="text" placeholder="Disabled Input" bind:value={inputValue} disabled />
            <Button mode="neutral" disabled>Disabled Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="readonly-input">Readonly Input & Transparent Button</Label>
            <Info>You can't edit this input but you can click the button!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="readonly-input" type="text" placeholder="Readonly Input" bind:value={inputValue} readonly />
            <Button mode="transparent">Transparent Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="required-input">Neutral Input & Button</Label>
            <Info>Input & Button with neutral style!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="required-input" type="text" placeholder="Neutral Input" bind:value={inputValue} />
            <Button mode="neutral">Neutral Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="info-input">Info Input & Button</Label>
            <Info>Input & Button with info style!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="info-input" mode="info" type="text" placeholder="Info Input" bind:value={inputValue} />
            <Button mode="info">Info Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="success-input">Success Input & Button</Label>
            <Info>Input & Button with success style!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="success-input" mode="success" type="text" placeholder="Success Input" bind:value={inputValue} />
            <Button mode="success">Success Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="warning-input">Warning Input & Button</Label>
            <Info>Input & Button with warning style!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="warning-input" mode="warning" type="text" placeholder="Warning Input" bind:value={inputValue} />
            <Button mode="warning">Warning Button</Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="error-input">Error Input & Button</Label>
            <Info>Input & Button with error style!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <Input id="error-input" mode="danger" type="text" placeholder="Error Input" bind:value={inputValue} />
            <Button mode="danger">Error Button</Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Selects -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Selects</H3>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="disabled-select" disabled>Disabled Select</Label>
            <Info disabled>You can't interact with this component!</Info>
          </FlexContainer>

          <Select
            triggerProps={{ id: 'disabled-select' }}
            type="single"
            placeholder="Disabled Select"
            mode="neutral"
            disabled
            items={SELECT_ITEMS}
            bind:value={selectValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="neutral-select">Neutral Select</Label>
            <Info>Select with neutral style!</Info>
          </FlexContainer>

          <Select
            triggerProps={{ id: 'neutral-select' }}
            type="single"
            placeholder="Neutral Select"
            mode="neutral"
            items={SELECT_ITEMS}
            bind:value={selectValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="info-select">Info Select</Label>
            <Info>Select with info style!</Info>
          </FlexContainer>

          <Select triggerProps={{ id: 'info-select' }} type="single" placeholder="Info Select" mode="info" items={SELECT_ITEMS} bind:value={selectValue} />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="success-select">Success Select</Label>
            <Info>Select with success style!</Info>
          </FlexContainer>

          <Select
            triggerProps={{ id: 'success-select' }}
            type="single"
            placeholder="Success Select"
            mode="success"
            items={SELECT_ITEMS}
            bind:value={selectValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="warning-select">Warning Select</Label>
            <Info>Select with warning style!</Info>
          </FlexContainer>

          <Select
            triggerProps={{ id: 'warning-select' }}
            type="single"
            placeholder="Warning Select"
            mode="warning"
            items={SELECT_ITEMS}
            bind:value={selectValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="error-select">Error Select</Label>
            <Info>Select with error style!</Info>
          </FlexContainer>

          <Select triggerProps={{ id: 'error-select' }} type="single" placeholder="Error Select" mode="danger" items={SELECT_ITEMS} bind:value={selectValue} />
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- ComboBoxes -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>ComboBoxes</H3>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="disabled-combobox" disabled>Disabled Combobox</Label>
            <Info disabled>Combobox with transparent style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Disabled Combobox', id: 'disabled-combobox' }}
            mode="neutral"
            disabled
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="neutral-combobox">Neutral Combobox</Label>
            <Info>Combobox with neutral style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Neutral Combobox', id: 'neutral-combobox' }}
            mode="neutral"
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="info-combobox">Info Combobox</Label>
            <Info>Combobox with info style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Info Combobox', id: 'info-combobox' }}
            mode="info"
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="success-combobox">Success Combobox</Label>
            <Info>Combobox with success style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Success Combobox', id: 'success-combobox' }}
            mode="success"
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="warning-combobox">Warning Combobox</Label>
            <Info>Combobox with warning style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Warning Combobox', id: 'warning-combobox' }}
            mode="warning"
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="error-combobox">Error Combobox</Label>
            <Info>Combobox with error style!</Info>
          </FlexContainer>

          <ComboBox
            type="single"
            inputProps={{ placeholder: 'Error Combobox', id: 'error-combobox' }}
            mode="danger"
            items={COMBOBOX_ITEMS}
            bind:value={comboboxValue}
          />
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Alerts, Dialogs and Sheets -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Alerts, Dialogs and Sheets</H3>

        <FlexContainer gap="sm">
          <Button mode="neutral" width="flex-1" onclick={() => (alertOpen = true)}>Open Alert</Button>

          <Alert bind:open={alertOpen} title="Title" description="This is a really cool alert! We can as you to accept or cancel things here!" />

          <Button mode="neutral" width="flex-1" onclick={() => (dialogOpen = true)}>Open Dialog</Button>

          <Dialog
            bind:open={dialogOpen}
            title="Title"
            description="This is a really cool dialog! We can as you to edit whatever we add and it'll not make you change page or anything.."
          >
            <div class="w-full h-full flex flex-col items-center justify-between gap-2">
              <GridContainer columns={2} isBreakpoint>
                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-2">
                    <div class="flex gap-2 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Info>This Input is rerquired and it has an * to prove it xD</Info>
                    </div>

                    <Input id="required-input" type="url" placeholder="Reqired Input" />
                  </div>
                </GridItem>

                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-2">
                    <div class="flex gap-2 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Info>This Input is rerquired and it has an * to prove it xD</Info>
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

          <Button mode="neutral" width="flex-1" onclick={() => (sheetOpen = true)}>Open Sheet</Button>

          <Sheet bind:open={sheetOpen} title="Title" description="On this sheet you can edit whatever we add and it'll not make you change page or anything...">
            <div class="h-full w-full flex flex-col items-center justify-between gap-2">
              <GridContainer columns={1}>
                <GridItem>
                  <div class="flex flex-col items-start justify-center gap-2">
                    <div class="flex gap-2 items-center">
                      <Label for="required-input">Required Input</Label>
                      <Info>This Input is rerquired and it has an * to prove it xD</Info>
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
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Sliders -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Sliders</H3>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="disabled-slider" disabled>Disabled Slider</Label>
            <Info disabled>You can't interact with this component!</Info>
          </FlexContainer>

          <FlexContainer gap="sm">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="disabled-slider"
              type="multiple"
              mode="neutral"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              disabled
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="neutral-slider">Neutral Slider</Label>
            <Info>Slider with neutral style!</Info>
          </FlexContainer>

          <FlexContainer alignY="end">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="neutral-slider"
              type="multiple"
              mode="neutral"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              withTickLabels
              withTicks
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="info-slider">Info Slider</Label>
            <Info>Slider with info style!</Info>
          </FlexContainer>

          <FlexContainer alignY="end">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="info-slider"
              type="multiple"
              mode="info"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              withTickLabels
              withTicks
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="success-slider">Success Slider</Label>
            <Info>Slider with success style!</Info>
          </FlexContainer>

          <FlexContainer alignY="end">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="success-slider"
              type="multiple"
              mode="success"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              withTickLabels
              withTicks
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="warning-slider">Warning Slider</Label>
            <Info>Slider with warning style!</Info>
          </FlexContainer>

          <FlexContainer alignY="end">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="warning-slider"
              type="multiple"
              mode="warning"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              withTickLabels
              withTicks
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="col" gap="sm">
          <FlexContainer gap="sm">
            <Label for="error-slider">Error Slider</Label>
            <Info>Slider with error style!</Info>
          </FlexContainer>

          <FlexContainer alignY="end">
            <P mode="secondary">{SLIDER_MIN}</P>
            <Slider
              id="error-slider"
              type="multiple"
              mode="danger"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_INTERVAL}
              bind:value={sliderValue}
              withTickLabels
              withTicks
            />
            <P mode="secondary">{SLIDER_MAX}</P>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Checkboxes -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Checkboxes</H3>

        <FlexContainer gap="sm">
          <Checkbox id="disabled-checkbox" bind:checked={checkboxValue} disabled />
          <Label for="disabled-checkbox" disabled>Disabled Checkbox</Label>
          <Info disabled>You can't interact with this component!</Info>
        </FlexContainer>

        <FlexContainer gap="sm">
          <Checkbox id="neutral-checkbox" mode="neutral" bind:checked={checkboxValue} />
          <Label for="neutral-checkbox">Neutral Checkbox</Label>
          <Info>Checkbox with neutral style!</Info>
        </FlexContainer>

        <FlexContainer gap="sm">
          <Checkbox id="info-checkbox" mode="info" bind:checked={checkboxValue} />
          <Label for="info-checkbox">Info Checkbox</Label>
          <Info>Checkbox with info style!</Info>
        </FlexContainer>

        <FlexContainer gap="sm">
          <Checkbox id="success-checkbox" mode="success" bind:checked={checkboxValue} />
          <Label for="success-checkbox">Success Checkbox</Label>
          <Info>Checkbox with success style!</Info>
        </FlexContainer>

        <FlexContainer gap="sm">
          <Checkbox id="warning-checkbox" mode="warning" bind:checked={checkboxValue} />
          <Label for="warning-checkbox">Warning Checkbox</Label>
          <Info>Checkbox with warning style!</Info>
        </FlexContainer>

        <FlexContainer gap="sm">
          <Checkbox id="error-checkbox" mode="danger" bind:checked={checkboxValue} />
          <Label for="error-checkbox">Error Checkbox</Label>
          <Info>Checkbox with error style!</Info>
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Switches -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Switches</H3>

        <FlexContainer gap="sm">
          <Label for="disabled-switch" disabled>Disabled Switch</Label>
          <Info disabled>You can't interact with this component!</Info>
          <Switch id="disabled-switch" bind:checked={switchValue} disabled />
        </FlexContainer>

        <FlexContainer gap="sm">
          <Label for="neutral-switch">Neutral Switch</Label>
          <Info>Switch with neutral style!</Info>
          <Switch id="neutral-switch" mode="neutral" bind:checked={switchValue} />
        </FlexContainer>

        <FlexContainer gap="sm">
          <Label for="info-switch">Info Switch</Label>
          <Info>Switch with info style!</Info>
          <Switch id="info-switch" mode="info" bind:checked={switchValue} />
        </FlexContainer>

        <FlexContainer gap="sm">
          <Label for="success-switch">Success Switch</Label>
          <Info>Switch with success style!</Info>
          <Switch id="success-switch" mode="success" bind:checked={switchValue} />
        </FlexContainer>

        <FlexContainer gap="sm">
          <Label for="warning-switch">Warning Switch</Label>
          <Info>Switch with warning style!</Info>
          <Switch id="warning-switch" mode="warning" bind:checked={switchValue} />
        </FlexContainer>

        <FlexContainer gap="sm">
          <Label for="error-switch">Error Switch</Label>
          <Info>Switch with error style!</Info>
          <Switch id="error-switch" mode="danger" bind:checked={switchValue} />
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Dropdown Menu -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Dropdown Menu</H3>

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
                    const toastInfo = new Toast({ title: 'One cliecked!', type: Toast.Type.INFO, description: 'You clicked one on the DropdownMenu!' })
                    Toasts.instance.addToast(toastInfo)
                  },
                  icon: 'ph:code'
                },
                {
                  type: 'item',
                  label: 'Two',
                  value: 'two',
                  onselect: () => {
                    const toast = new Toast({ title: 'Two cliecked!', type: Toast.Type.INFO, description: 'You clicked two on the DropdownMenu!' })
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
                const toast = new Toast({ title: 'Radio Changed!', type: Toast.Type.INFO, description: `You clicked ${value} on the DropdownMenu!` })
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
                              description: 'You clicked inside-first-menu on the DropdownMenu!'
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
                                      description: 'You clicked inside-second-menu on the DropdownMenu!'
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
                              description: 'You clicked submenu-two on the DropdownMenu!'
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
                    const toastInfo = new Toast({
                      title: 'Checkbox One cliecked!',
                      type: Toast.Type.INFO,
                      description: 'You clicked checkbox-one on the DropdownMenu!'
                    })
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
                    const toastInfo = new Toast({
                      title: 'Checkbox Two cliecked!',
                      type: Toast.Type.INFO,
                      description: 'You clicked checkbox-two on the DropdownMenu!'
                    })
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
      </FlexContainer>
    </ColumnItem>

    <!-- Context Menu -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Context Menu</H3>

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
                    const toastInfo = new Toast({ title: 'One cliecked!', type: Toast.Type.INFO, description: 'You clicked one on the ContextMenu!' })
                    Toasts.instance.addToast(toastInfo)
                  },
                  icon: 'ph:code'
                },
                {
                  type: 'item',
                  label: 'Two',
                  value: 'two',
                  onselect: () => {
                    const toast = new Toast({ title: 'Two cliecked!', type: Toast.Type.INFO, description: 'You clicked two on the ContextMenu!' })
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
                const toast = new Toast({ title: 'Radio Changed!', type: Toast.Type.INFO, description: `You clicked ${value} on the ContextMenu!` })
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
                              description: 'You clicked inside-first-menu on the ContextMenu!'
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
                                      description: 'You clicked inside-second-menu on the ContextMenu!'
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
                              description: 'You clicked submenu-two on the ContextMenu!'
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
                    const toastInfo = new Toast({
                      title: 'Checkbox One cliecked!',
                      type: Toast.Type.INFO,
                      description: 'You clicked checkbox-one on the ContextMenu!'
                    })
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
                    const toastInfo = new Toast({
                      title: 'Checkbox Two cliecked!',
                      type: Toast.Type.INFO,
                      description: 'You clicked checkbox-two on the ContextMenu!'
                    })
                    Toasts.instance.addToast(toastInfo)
                    checkboxTwoCheckedCM = changed
                  }
                }
              ]
            }
          ]}
        >
          <div class={['w-full h-full flex items-center justify-center p-6 rounded-md border transition-all duration', 'border-zinc-800']}>
            Right click here!
          </div>
        </ContextMenu>
      </FlexContainer>
    </ColumnItem>

    <!-- Toasts -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Toasts</H3>

        <FlexContainer gap="sm">
          <Button
            mode="neutral"
            width="flex-1"
            onclick={() => {
              const toastNeutral = new Toast({ title: 'Neutral toast', type: Toast.Type.NEUTRAL, description: 'This is a neutral toast!' })
              Toasts.instance.addToast(toastNeutral)

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
                type: Toast.Type.DANGER,
                description: 'This is an error toast! Click it to show another toast!',
                onclick: () => {
                  const anotherToast = new Toast({
                    title: 'Another toast',
                    type: Toast.Type.INFO,
                    description: 'This is another toast that will last 10 seconds!',
                    hideAfter: 10000
                  })
                  Toasts.instance.addToast(anotherToast)
                }
              })
              Toasts.instance.addToast(toastError)

              const toastSuccess = new Toast({
                title: 'Success toast',
                type: Toast.Type.SUCCESS,
                description: 'This is an success toast! Keep your cursor over it to make it last forver!'
              })
              Toasts.instance.addToast(toastSuccess)
            }}
          >
            Toasts
          </Button>

          <Button
            mode="neutral"
            width="flex-1"
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
            Native Notification
          </Button>
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>

    <!-- Pagination -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Pagination</H3>

        <Pagination page={1} count={95} perPage={10} />
      </FlexContainer>
    </ColumnItem>

    <!-- Hints -->
    <ColumnItem>
      <FlexContainer direction="col" gap="sm">
        <H3>Hints</H3>

        <FlexContainer direction="col" gap="sm">
          <Hint mode="neutral" title="Neutral Hint" description="This is a neutral hint! Not important, not informative... just a hint." />
          <Hint mode="info" title="Info Hint" description="This is a hint with some interesting info! It may be useful..." />
          <Hint mode="success" title="Success Hint" description="This is a success hint! Probably you did something right!" />
          <Hint mode="warning" title="Warning Hint" description="This is a hint with a warning! Pay atention! It's important." />
          <Hint mode="danger" title="Danger Hint" description="This is a danderous hint! PAY EVEN MORE ATENTION! This is super important." />
        </FlexContainer>
      </FlexContainer>
    </ColumnItem>
  </ColumnsContainer>
</PageWrapper>
