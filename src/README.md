# FOLDER DISTRIBUTION

This folder contains all the code of the APP.

## main

This folder contains the main AKA node.js part of the app.

## migrations

This folder contains all the migrations of the app DB.

All the DB code is on `./main/db/*`. This one is only for migrations and it's here because of how the app compiles.

## preload

This folder contains all the preaload definitions and calls AKA what you see on `window.api.XXX`.

## renderer

This folder contains the frontend of the app.

## shared

This folder contains all the code than can be used on the main, preload and renderer and not only on one of those.
