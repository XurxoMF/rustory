This file contains a small guide on the current state of the project and the future steps to follow to get to the finish line for the 1.0.0 release.

It's mainly on Galician as it's for me and for the agents.

## Diagnóstico xeral

Rustory é unha base sólida de launcher, pero aínda está nun estado pre-MVP. A infraestrutura de escritorio, configuración, persistencia, UI, catálogo de mods e CRUD básico de instancias está bastante avanzada. O camiño crítico para unha primeira versión usable —instalación robusta, executar o xogo, xestión completa de mods, backups e updater visible— segue incompleto.

Hai ademais varios erros de consistencia e persistencia que convén resolver antes de engadir funcionalidades.

## 1. Obxectivo da aplicación

O código e o README confirman o obxectivo que describes: un launcher multiplataforma para Vintage Story que centralice:

- Instalación de múltiples versións do xogo.
- Creación e configuración de instancias illadas.
- Instalación e futura actualización/desinstalación de mods.
- Backups por instancia.
- Lanzamento do cliente e, eventualmente, servidores.
- Actualización automática do propio Rustory.
- Configuración de idioma, tema, rutas e comportamento.

O README tamén menciona servidores e modpacks, pero actualmente parecen obxectivos posteriores ao MVP, non funcionalidade en desenvolvemento activo.

## 2. Tecnoloxías e dependencias

O manifesto principal está en [package.json](/home/xurxomf/Desarrollo/Rustory/rustory/package.json).

Frontend:

- Svelte 5 con runes.
- SvelteKit 2 como router e estrutura da aplicación.
- SPA estática mediante `@sveltejs/adapter-static`; SSR desactivado.
- TypeScript estrito.
- Vite 6.
- Tailwind CSS 4.
- Bits UI e unha colección local estilo xmfcn/shadcn: 349 compoñentes Svelte baixo `src/lib/components/ui`.
- Tabler Icons.
- `runed` para estado persistido no navegador.
- Paraglide/Inlang para internacionalización.
- Embla Carousel, TanStack Table, LayerChart, Formsnap e outras dependencias usadas principalmente pola biblioteca UI.

Escritorio/backend:

- Tauri 2.
- Rust 2021.
- Tokio para comandos asíncronos.
- `zip` e `walkdir` para compresión e extracción.
- Serde/Serde JSON para datos persistidos.
- Chrono e `dirs`.
- Plugins Tauri para HTTP, descargas, filesystem, shell, updater, logs, diálogo, notificacións, tray, single-instance, window-state e proceso.

Servizos externos:

- `https://api.rustory.xyz/versions` para versións de Vintage Story.
- `https://mods.vintagestory.at/api` e CDN de ModDB.
- Releases de GitHub para actualizar Rustory.

Non hai framework de tests frontend nin tests de integración/end-to-end.

## 3. Arquitectura

A arquitectura actual pode resumirse así:

```text
SvelteKit routes/UI
        │
        ▼
App singleton + stores reactivos
        │
        ├── Config/Data → JSON persistido
        ├── Clases de dominio → VSVersion, VSInstance, VSMod
        ├── Clientes API → Rustory API e ModDB
        └── Wrappers → File, Directory, Zip, Request
                │
                ▼
      Plugins Tauri + comandos IPC Rust
                │
                ▼
  filesystem, procesos, zip, rede e updater
```

Elementos principais:

- [App.svelte.ts](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/App.svelte.ts) é un service locator/singleton global. Inicializa información do sistema, configuración, tray, hotkeys, solicitudes, datos e servizos de UI.
- [Config.svelte.ts](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/stores/Config.svelte.ts) persiste preferencias en `config.json`.
- [Data.svelte.ts](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/stores/Data.svelte.ts) mantén listas de rutas a versións e instancias en `data.json`.
- Cada instancia ten un `instance.json`, un directorio `Data/Mods` e outro `Backups`.
- As clases de dominio conteñen tanto estado como operacións de I/O.
- Rust limítase a operacións que son máis difíciles ou convenientes fóra do webview: ZIP, permisos Unix e detección da versión executando `Vintagestory -v`.
- A UI está organizada por rutas: inicio, configuración, instancias, creación/edición de instancias e catálogo/detalle de mods.

É unha arquitectura válida para un proxecto pequeno, pero o singleton global e a mestura de dominio, rede, persistencia e UI nas mesmas clases dificultarán os tests e as operacións transaccionais.

## 4. Estado funcional

### Bastante completo

- Arranque de Tauri, single-instance, tray, logs e ventá personalizada.
- Información do sistema e detección de runtimes .NET.
- Configuración persistida de tema, idioma, escala, logs e directorios.
- Navegación, sidebar, breadcrumbs, command palette, hotkeys e recarga.
- Formulario completo de creación e edición de instancias.
- Rexistro e eliminación de instancias.
- Descarga/modelado de versións desde a API de Rustory.
- Catálogo ModDB:
  - Grid/lista.
  - Ordenación.
  - Paxinación.
  - Cantidade por páxina.
  - Selección de instancia.
  - Páxina de detalle e screenshots.
  - Estados offline, erro, baleiro e skeletons.
- Instalación simple dun mod buscando unha release exacta ou parcialmente compatible.

### Incompleto

- O botón Play só mostra “Not implemented yet” en [vs-instances/+page.svelte:136](/home/xurxomf/Desarrollo/Rustory/rustory/src/routes/vs-instances/+page.svelte:136).
- Non existe lanzamento de cliente/servidor nin seguimento real do proceso.
- `VSInstanceBackup` é só un modelo de datos; non ten crear, cargar, eliminar nin restaurar.
- As pestanas de mods e backups dunha instancia son placeholders.
- Non hai desinstalación, actualización, activación/desactivación nin selección manual de release de mods.
- O panel de filtros avanzados de mods está baleiro; só funcionan ordenación, layout e paxinación.
- O updater Tauri está rexistrado e configurado, pero non hai chamadas frontend, estado, setting nin botón de actualización.
- Non existe xestión explícita das versións instaladas.
- A internacionalización está practicamente sen usar: os dous catálogos conteñen só `hello_world`; a UI está hardcodeada en inglés.
- `VSAccount` existe pero non está integrado.
- Servidores e modpacks só aparecen como intención no README.

Non vin indicios suficientes para afirmar que estas partes estean abandonadas; parecen máis ben esqueletos ou funcionalidades futuras.

## 5. Execución, compilación e probas

Fluxo previsto:

```bash
bun install
bun run tauri dev
```

Só frontend:

```bash
bun run dev
bun run build
bun run preview
```

Aplicación empaquetada:

```bash
bun run tauri build
```

Validación:

```bash
bun run check
bun run lint
cd src-tauri
cargo fmt --all -- --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
```

Dependencias externas:

- Bun.
- Toolchain Rust.
- Dependencias nativas de Tauri/WebKit en Linux.
- .NET instalado para executar Vintage Story; actualmente Rustory tamén intenta consultalo durante o arranque.
- Toolchains/targets de Apple para ambos Macs.

Resultados obtidos:

- `cargo fmt --check`: correcto.
- `cargo clippy -D warnings`: correcto.
- `cargo test --locked`: correcto, pero executa **0 tests**.
- `bun run lint`: corrixido para ignorar artefactos xerados como `build/`, `.svelte-kit/`, `package/`, `src/lib/paraglide/`, `src-tauri/gen/` e `src-tauri/target/`.
- `svelte-check`: no contorno de Codex expirou ou quedou bloqueado, pero o usuario informou de que `bun run check` funciona correctamente no seu contorno local habitual.
- `vite build`: no contorno de Codex quedou bloqueado ou fallou por limitacións do sandbox/esbuild; os resultados desta contorna non abondan para tratalo como erro confirmado do proxecto.
- Git segue limpo.

Non se debe substituír `svelte-kit sync && svelte-check` por un wrapper só porque falle na contorna de Codex: `svelte-kit sync` é necesario para xerar `.svelte-kit`, que á súa vez é referenciada por `tsconfig.json`.

O workflow de release compila Windows, Linux, macOS ARM64 e macOS x64, pero non executa lint nin tests antes de publicar: [release.yml](/home/xurxomf/Desarrollo/Rustory/rustory/.github/workflows/release.yml).

## 6. Erros e débeda técnica importantes

### Críticos

1. Posible borrado do ZIP antes de extraelo.

A descarga gárdase dentro do directorio final da versión en [RustoryApiVSVersion.svelte.ts:262](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/api/RustoryApiVSVersion.svelte.ts:262), pero `install()` elimina ese directorio antes de extraer o mesmo ZIP en [VSVersion.svelte.ts:232](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/vs/VSVersion.svelte.ts:232). Estáticamente, ese fluxo debería deixar o obxecto `Zip` apuntando a un ficheiro xa eliminado. Convén reproducilo inmediatamente nunha instalación limpa.

2. Instalación fire-and-forget.

A creación dunha instancia chama `newVersion.install(...)` sen `await` en [create/+page.svelte:195](/home/xurxomf/Desarrollo/Rustory/rustory/src/routes/vs-instances/create/+page.svelte:195). A instancia queda rexistrada aínda que a descarga ou extracción falle, e un rexeitamento pode quedar sen manexar.

3. macOS non modela arquitectura.

A API só define `macos` e `macosSha`, non x64/ARM64: [RustoryApiVSVersion.svelte.ts:11](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/api/RustoryApiVSVersion.svelte.ts:11). A descarga decide só polo sistema operativo. Cómpre representar artefactos opcionais por plataforma e arquitectura, mantendo fallback para versións antigas.

### Altos

- O SHA recibido non se verifica; só se incorpora ao nome do ficheiro.
- `RustoryApiVSVersion.fetch()` consume o corpo con `res.text()` e despois intenta facer `res.json()`: [RustoryApiVSVersion.svelte.ts:207](/home/xurxomf/Desarrollo/Rustory/rustory/src/lib/classes/api/RustoryApiVSVersion.svelte.ts:207).
- `Request.get()` non comproba `response.ok`, non aplica timeout/reintentos e pode cachear respostas HTTP erróneas.
- A compatibilidade parcial usa `startsWith("1.2")`, que tamén pode aceptar `1.20`; ademais escolle a primeira release sen ordenar explicitamente: [mod.svelte:75](/home/xurxomf/Desarrollo/Rustory/rustory/src/routes/vs-mods/mod.svelte:75).
- Instalacións, actualizacións e restauracións non usan staging nin operacións atómicas.
- Unha entrada corrupta en `data.json`, unha instancia inválida ou un mod ZIP mal formado pode abortar toda a inicialización da aplicación.
- O cargador de mods usa `Promise.all`: un único ZIP defectuoso impide cargar todos os mods da instancia.
- A compresión Rust le cada ficheiro completo en memoria; backups grandes poden disparar o consumo de RAM.
- Os logs usan `KeepAll`, polo que poden crecer indefinidamente.
- O permiso `fs:read-all`/`write-all` é amplo, aínda que está parcialmente limitado polo scope.
- O README e CONTRIBUTING non documentan realmente instalación, prerequisites, execución nin arquitectura.
- Non hai migración/versionado dos JSON persistidos.
- Non hai tests nin CI para PRs/main.
- A enorme biblioteca UI local incrementa superficie de mantemento e tempo de análise, aínda que moitos compoñentes non se usan.

### Correccións completadas

- 2026-07-18: a carga dunha instancia agarda agora o resultado de `File.exists()` antes de decidir se falta `instance.json`. Deste modo, unha ruta rexistrada sen o seu ficheiro de configuración produce o `FILE_SYSTEM_ERROR` previsto en lugar de continuar cunha Promise truthy.
- 2026-07-18: `VSInstance.save()` agarda agora a escritura de `instance.json`. O método só rexistra o éxito despois de persistir os datos e os erros de `writeJSON()` chegan ao seu bloque `catch`.
- 2026-07-18: `Config.save()` agarda agora a escritura de `config.json`. As actualizacións de configuración xa non resolven antes de que a persistencia remate e os erros de `writeJSON()` chegan ao seu bloque `catch`.
- 2026-07-18: `Data.save()` agarda agora a escritura de `data.json`. Con isto queda pechada a incidencia coñecida de métodos `save()` que resolvían antes de completar a escritura.
- 2026-07-18: retirouse o workaround que substituía `svelte-kit sync`; non era unha corrección fiable do proxecto, senón unha adaptación á contorna de Codex.
- 2026-07-18: ESLint ignora explicitamente os directorios xerados. `bun run lint` xa non analiza `src-tauri/target` nin outros artefactos de build.

## 7. Orde lóxica de desenvolvemento

### Fase 1 — Recuperar unha base verificable

1. Reproducir nun contorno local normal calquera fallo real de `check` ou `build` antes de modificar scripts estándar.
   - Verificación: diferenciar erro do proxecto, erro de configuración e limitación da contorna de execución.
2. Crear CI para `check`, lint, Rust fmt, clippy e tests.
   - Verificación: unha PR executa todas as comprobacións.
3. Engadir tests unitarios para helpers de rutas, versións e compatibilidade.

### Fase 2 — Corrixir persistencia e instalación de versións

5. Introducir versión de esquema e validación de `config.json`, `data.json` e `instance.json`.
6. Descargar a un directorio temporal independente.
7. Verificar SHA-256 antes de extraer.
8. Extraer a staging, validar executable/versión e renomear atomicamente.
9. Limpar temporais e facer rollback ao fallar.
10. Non rexistrar a versión nin crear a instancia ata finalizar a instalación.
11. Mostrar progreso e erro recuperable.

- Verificación: éxito, checksum incorrecto, corte de rede e falta de espazo non deixan instalacións fantasma.

### Fase 3 — Resolver macOS correctamente

13. Cambiar o modelo da API a artefactos por `OS + arquitectura`, con campos opcionais.
14. Definir fallback para releases antigas cun único paquete macOS.
15. Engadir fixtures para macOS Intel, Apple Silicon e versións sen paquete nativo.
16. Validar o executable dentro do `.app`/paquete real de Vintage Story.

- Verificación: matriz x64/ARM64 selecciona sempre o artefacto correcto ou mostra “non dispoñible”.

### Fase 4 — Lanzar o xogo

17. Construír un `LaunchSpec` independente da UI: executable, directorio de datos, argumentos e variables.
18. Implementar variantes Windows/Linux/macOS.
19. Parsear variables de contorno de forma segura e aplicar Mesa GL só en Linux.
20. Controlar proceso, estados, código de saída e concorrencia.
21. Actualizar `lastTimePlayed` e `totalTimePlayed`.
22. Engadir botón Play/Stop e erros visibles.

- Verificación: cada instancia arranca co seu `Data` illado e o estado volve a `STOPPED` ao saír.

### Fase 5 — Mods completos

23. Crear un resolver determinista de releases compatibles con tests.
24. Descargar mods a `.tmp` e mover tras validar `modinfo.json`.
25. Evitar duplicados e colisións de nomes.
26. Implementar desinstalación.
27. Implementar actualización individual e “actualizar todos”.
28. Permitir escoller unha release manual.
29. Construír a pestana de mods da instancia.
30. Completar os filtros avanzados.

- Verificación: instalar, actualizar e desinstalar mantén disco e estado UI sincronizados.

### Fase 6 — Backups

31. Descubrir e cargar backups existentes.
32. Crear backups manualmente con progreso.
33. Aplicar límite e retención.
34. Implementar eliminación.
35. Restaurar mediante staging e rollback.
36. Integrar backup automático antes de Play.
37. Construír a pestana de backups.

- Verificación: restaurar reproduce os datos orixinais e un fallo non destrúe a instancia activa.

### Fase 7 — Actualización de Rustory

38. Engadir `automaticUpdatesEnabled` á configuración.
39. Consultar actualizacións ao iniciar só cando estea habilitado.
40. Manter estado “actualización dispoñible”.
41. Engadir botón Check/Download/Install.
42. Pedir confirmación antes de instalar e relanzar.
43. Probar artefactos asinados nos catro targets do workflow.

- Verificación: desactivar updates evita a comprobación automática, pero o botón manual segue funcionando.

### Fase 8 — Robustez e acabamento

44. Illar instancias/mods corruptos en lugar de abortar o arranque.
45. Engadir timeouts, comprobación HTTP e política de cache.
46. Limitar rotación de logs.
47. Migrar todos os textos a Paraglide e completar inglés/español.
48. Documentar setup, execución, estrutura de datos e proceso de release.
49. Crear smoke tests Windows, Linux, macOS x64 e ARM64.

A prioridade inmediata debería ser: **ferramentas de validación → persistencia/instalación transaccional → macOS → Play → mods → backups → updater**. Isto evita construír as funcionalidades do MVP sobre unha base que agora pode deixar estado persistido incoherente.
