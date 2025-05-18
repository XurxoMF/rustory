# FOLDER DISTRIBUTION

This folder contains all the logic used by different modules.

## What are modules?

Modules are like features. For example:

- Versions
- Installations
- Mods
- Backups
- ...

## What are the logic types?

Logic types depends on the function of the files. For example:

- Components
- Utils
- Stores
- ...

## Example of the folder categories

```
modules/
├── versions/
│   ├── components/
│   │   ├── VersionsList.svelte
│   ├── utils/
│   │   ├── versionsInstall.ts
│   │   ├── versionsUninstall.ts
│   │   └── ...
│   ├── stores/
│   │   ├── VersionsStore.ts
│   │   └── ...
│   └── ...
└── ...
```
