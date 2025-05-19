# FOLDER DISTRIBUTION

This folder contains all the **components**, **helpers**, **utils**, **stores**... of the APP.

On each folder you'll find a `README.md` explaining what's inside if it's needed.

# EXTERNAL vs INTERNAL STORES

On this folder you'll find 2 types of stores: the ones inside the stores folder and separated from the components and the ones inside the UI folder on the same .svelte file as the components that manages it.  
This structure has a reason and it's the scope of the store.

If the stored data will only be used on one single component then it'll be defined on the `<script module>` of that component.  
If the stored data will be used by multiple components then you've to separate the store from the component.

> _Only components that **USE** the data apply to this rule, the ones that **SET** the data doesn't count so, for example, the Breadcrumbs store will only be used by the Breadcrumbs component to render them but you can set the breadcrumbs from anywhere on the APP so this one counts as internal store._
