# FOLDER DISTRIBUTION

This folder contains all the component types used by the app categorized by "modules".

## What are modules?

Modules are like features. For example:

- Basics
- Versions
- Installations
- Mods
- Backups
- Etc...

## What are the component types?

Component types are, liek the name says, types of components xD For example:

- Components (.svelte)
- Utils
- Contexts
- Etc...

## Example of the folder categories

```

modules/
├── basics/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── Input.svelte
│   │   │   ├── Button.svelte
│   │   │   └── ...
│   │   ├── Dropdown.svelte
│   │   └── ...
│   ├── utils/
│   │   ├── something.ts
│   │   └── ...
│   └── ...
├── versions/
│   ├── components/
│   │   ├── VersionsList.svelte
│   ├── utils/
│   │   └── ...
│   │   ├── versionsInstall.ts
│   │   ├── versionsUninstall.ts
│   │   └── ...
│   ├── contexts/
│   │   ├── versionsContext.ts
│   │   └── ...
│   └── ...
└── ...
```
