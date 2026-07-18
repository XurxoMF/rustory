# AGENTS.md

Este ficheiro recolle o contexto e as regras de traballo para axentes que modifiquen Rustory. As instrucións do usuario e do mantedor teñen prioridade sobre este documento.

## Obxectivo e alcance

Rustory é un launcher non oficial de Vintage Story para Windows, Linux e macOS. O seu obxectivo é permitir xestionar múltiples versións e instancias do xogo desde unha aplicación de escritorio.

O alcance da primeira versión usable indicado polo mantedor é:

- instalar versións de Vintage Story e crear instancias;
- executar as instancias;
- instalar, desinstalar e actualizar mods;
- crear, listar, restaurar e eliminar backups de instancias;
- integrar as actualizacións de Rustory, cunha opción para desactivar a comprobación automática e un botón para que o usuario decida cando actualizar.

O README menciona tamén servidores e modpacks, pero non hai unha implementación funcional deles no código actual. Non os inclúas no MVP sen unha petición explícita.

Segundo o mantedor, as funcionalidades xa implementadas funcionan, aínda que o produto non está rematado. A creación de instancias e a instalación de versións existen; executar o xogo aínda non. O traballo funcional máis recente é a páxina de mods, incluíndo layouts, ordenación, paxinación e unha selección simple da última release compatible para instalar un mod.

Limitación coñecida: o soporte de Vintage Story en macOS está roto porque o xogo distribúe agora artefactos x64 e ARM64 separados, pero non todas as versións antigas teñen ambos. Calquera solución debe admitir a arquitectura actual e a ausencia dalgún artefacto nas versións históricas. O formato exacto futuro da API para representalos non está confirmado neste repositorio.

## Arquitectura

Rustory é unha aplicación Tauri 2 cun frontend SvelteKit en modo SPA:

- `src/routes/`: páxinas e layout de SvelteKit. O SSR está desactivado e `adapter-static` xera unha SPA con fallback a `index.html`.
- `src/lib/classes/App.svelte.ts`: singleton que inicializa e expón os servizos globais da aplicación.
- `src/lib/classes/stores/`: configuración, datos, información do sistema e servizos reactivos de UI.
- `src/lib/classes/vs/`: modelos e operacións de dominio para versións, instancias, mods, backups e contas.
- `src/lib/classes/api/`: modelos e clientes para a API de Rustory e a API de mods de Vintage Story.
- `src/lib/classes/utils/`: abstraccións de ficheiros, directorios, ZIP, logs e utilidades relacionadas.
- `src/lib/components/ui/`: biblioteca local de compoñentes UI baseada en Bits UI/shadcn-svelte/xmfcn-svelte. É extensa e maioritariamente código de infraestrutura visual.
- `src-tauri/src/`: backend Rust. Os comandos IPC propios xestionan ZIPs, permisos Unix e detección da versión de Vintage Story.
- `src-tauri/capabilities/`: permisos e allowlists de Tauri.
- `messages/` e `rustory.inlang/`: configuración e catálogos de Paraglide/Inlang.
- `.github/workflows/release.yml`: empaquetado e publicación para Windows, Linux, macOS x64 e macOS ARM64.

### Fluxo de datos

- `Config` persiste preferencias nun `config.json` baixo o directorio de configuración da aplicación.
- `Data` persiste rutas a versións e instancias nun `data.json` baixo o directorio de datos da aplicación.
- Cada instancia usa un `instance.json` e os subdirectorios `Data/Mods` e `Backups`.
- O frontend accede ao sistema mediante plugins Tauri e mediante os comandos Rust rexistrados en `src-tauri/src/lib.rs`.
- As versións do xogo veñen de `https://api.rustory.xyz`; os mods veñen da API e CDN oficiais de mods de Vintage Story.

## Tecnoloxías confirmadas

- Bun e `bun.lock` como xestor de paquetes frontend.
- Svelte 5, SvelteKit 2, TypeScript estrito e Vite 6.
- Tailwind CSS 4, Bits UI, Tabler Icons e compoñentes UI locais.
- Paraglide/Inlang para internacionalización. A maior parte da UI segue actualmente hardcodeada en inglés.
- Tauri 2 e Rust 2021.
- Tokio, Serde, `zip`, `walkdir`, Chrono e plugins oficiais de Tauri.
- Vintage Story require .NET; a aplicación consulta os SDKs e runtimes dispoñibles durante o arranque.

As versións concretas están en `package.json`, `bun.lock`, `src-tauri/Cargo.toml` e `src-tauri/Cargo.lock`. Non dupliques nin fixes versións noutros documentos salvo necesidade expresa.

## Instalar, executar e compilar

Desde a raíz do repositorio:

```bash
bun install
bun run tauri dev
```

Só o frontend:

```bash
bun run dev
bun run build
bun run preview
```

Aplicación de escritorio empaquetada:

```bash
bun run tauri build
```

Actualizar dependencias é unha operación deliberada, non un paso normal de instalación:

```bash
bun run app:update
```

Non está documentada no repositorio unha lista completa de paquetes nativos necesarios para desenvolver en cada sistema operativo. O workflow de Linux instala `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, `librsvg2-dev` e `patchelf`; non asumas que isto cobre todos os contornos locais.

## Probar e verificar

Frontend:

```bash
bun run check
bun run lint
bun run build
```

Backend Rust:

```bash
cd src-tauri
cargo fmt --all -- --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
```

Estado confirmado durante a auditoría de xullo de 2026:

- `cargo fmt`, `cargo clippy` e `cargo test` pasan;
- non hai tests Rust implementados: `cargo test` executa 0 tests;
- non hai script nin framework de tests frontend;
- `bun run lint` debe ignorar artefactos xerados como `build/`, `.svelte-kit/`, `package/`, `src/lib/paraglide/`, `src-tauri/gen/` e `src-tauri/target/`;
- no contorno de Codex de xullo de 2026, `bun run check` e `bun run build` quedaron bloqueados ou limitados polo sandbox; o usuario informou de que `bun run check` funciona correctamente no seu contorno local habitual.

Estes fallos son débeda coñecida, non razón para omitir silenciosamente as comprobacións. Ao traballar neles, rexistra se o resultado cambia e distingue erros de código, configuración, sandbox e timeouts. Non cambies scripts estándar só para rodear unha limitación da contorna de Codex sen confirmalo antes co usuario.

## Convencións de código existentes

- TypeScript está en modo `strict`.
- Prettier usa tabs, comiñas dobres, sen trailing commas e `printWidth: 150`.
- Os compoñentes Svelte usan Svelte 5 e runes como `$state`, `$derived`, `$effect` e `$props`.
- As clases reactivas usan o sufixo `.svelte.ts`.
- As importacións internas usan preferentemente os aliases `$lib` e `$assets`.
- As clases principais están divididas en propiedades estáticas, inicialización, propiedades de instancia, getters/setters e métodos, con comentarios JSDoc.
- Os erros do dominio envólvense normalmente en `AppError` e rexístranse mediante `App.logger`.
- As operacións asíncronas públicas devolven `Promise` e deben propagarse ou esperarse explicitamente.
- Un método `save()` non pode informar de éxito nin resolverse antes de que remate a escritura subxacente. Agarda sempre a operación de persistencia para que os erros cheguen ao `catch` do método; isto aplica por separado a configuración, datos globais e instancias.
- Ao engadir ou modificar stores persistentes, comproba especificamente que as escrituras de `config.json`, `data.json` ou `instance.json` estean agardadas e cubertas polo manexo de erros do método.
- Para facilitar a lectura, garda os resultados asíncronos que se vaian comprobar nunha variable descritiva antes do condicional (por exemplo, `const fileExists = await file.exists(); if (!fileExists) ...`). Evita chamadas con `await` incrustadas directamente na condición.
- Fai explícita a posible ausencia nos tipos. Se unha propiedade, parámetro ou variable é opcional e usa `?:`, inclúe sempre `| undefined` no tipo: usa `algo?: string | undefined`, nunca `algo?: string`. Aplica a mesma regra aos demais tipos cando se use `?:`.
- Rust debe manter `cargo fmt` e `clippy` sen warnings.
- Os nomes e textos existentes están maioritariamente en inglés. Non introduzas un terceiro estilo de idioma: ao internacionalizar, usa Paraglide e os catálogos de `messages/`.

Non copies automaticamente patróns existentes se conteñen un erro evidente. En particular, todas as escrituras e operacións de I/O asíncronas deben levar `await` cando a seguinte operación dependa delas.

## Decisións técnicas que se deben respectar

- Manter Tauri como shell de escritorio e SvelteKit como frontend SPA; non introducir un servidor SSR.
- Manter compatibilidade con Windows, Linux, macOS x64 e macOS ARM64.
- Tratar versións de xogo e instancias como entidades distintas: varias instancias poden compartir unha versión instalada, pero deben ter datos e mods illados.
- Usar os directorios de aplicación resoltos por Tauri e as rutas configurables existentes; non codificar rutas específicas dun sistema operativo.
- Manter as operacións privilexiadas ou non dispoñibles no webview detrás de plugins Tauri ou comandos IPC Rust.
- Conceder só os permisos Tauri e dominios de rede necesarios. Calquera cambio en capabilities debe revisarse como cambio de seguridade.
- As descargas, instalacións, actualizacións e restauracións deben ser recuperables: usar temporais/staging, validar antes de substituír datos e limpar tras un fallo.
- Verificar checksums cando a API os proporciona; non usar o hash unicamente como parte do nome.
- Non persistir unha versión ou instancia como dispoñible antes de completar e validar a operación correspondente.
- Os cambios no formato JSON persistido deben ser retrocompatibles ou incluír unha migración explícita.
- Non asumir que a orde devolta por unha API equivale a “máis recente”; ordenar ou comparar versións explicitamente.
- O updater debe respectar a elección do usuario: setting para comprobación automática e acción manual separada.
- Non ampliar o alcance a servidores ou modpacks durante o MVP salvo petición explícita.

## Ficheiros e directorios sensibles

- `src-tauri/capabilities/*.json`: controla acceso a filesystem, shell, rede e updater.
- `src-tauri/tauri.conf.json`: identificador da app, endpoints e chave pública do updater, bundles e configuración da ventá.
- `src-tauri/src/commands/file_system.rs` e `zip.rs`: poden modificar, eliminar, comprimir ou extraer datos do usuario.
- `src/lib/classes/utils/File.svelte.ts`, `Directory.svelte.ts` e `Zip.svelte.ts`: capa común para operacións destrutivas.
- `Config.svelte.ts`, `Data.svelte.ts` e `VSInstance.svelte.ts`: definen formatos persistidos; unha regresión pode impedir cargar instalacións existentes.
- `src/lib/classes/vs/VSVersion.svelte.ts`: instala e elimina versións compartidas por instancias.
- `src/lib/classes/stores/Request.svelte.ts` e clientes de `src/lib/classes/api/`: límites de confianza para datos externos.
- `.github/workflows/release.yml`: publicación multiplataforma e uso dos secrets de sinatura.
- `bun.lock` e `src-tauri/Cargo.lock`: deben cambiar só cando se actualicen dependencias intencionadamente.
- `src/lib/paraglide/`, `.svelte-kit/`, `build/`, `package/`, `src-tauri/gen/` e `src-tauri/target/`: artefactos xerados; non editalos nin versionalos manualmente.
- `src/lib/components/ui/`: biblioteca visual ampla. Evita cambios masivos ou rexeneracións completas para resolver unha necesidade local.

Non inclúas secrets, chaves privadas, tokens, datos persoais, rutas locais nin contido real de instancias nos commits ou logs de probas.

## Regras para realizar cambios

1. Le primeiro os ficheiros afectados e segue o fluxo completo desde a UI ata persistencia, rede ou IPC.
2. Conserva cambios alleos xa presentes no worktree e evita reformatar ficheiros non relacionados.
3. Fai parches pequenos e cunha finalidade verificable. Non mestures unha feature cunha actualización xeral de dependencias ou da biblioteca UI.
4. Antes dunha operación destrutiva, resolve e valida a ruta exacta. Non elimines directorios amplos, compartidos ou derivados dunha entrada sen validar.
5. Evita estados parciais: completa a operación no disco antes de actualizar o estado reactivo e a persistencia, ou implementa rollback.
6. Agarda todas as Promises relevantes e manexa os erros no nivel que poida ofrecer recuperación ou feedback ao usuario. Isto inclúe comprobacións booleanas asíncronas como `exists()`: nunca uses unha `Promise<boolean>` directamente nun condicional e garda o resultado nunha variable descritiva antes de avalialo.
7. Valida respostas HTTP, datos JSON, checksums, ZIPs e executables antes de confiar neles.
8. Un elemento corrupto non debería impedir cargar todos os demais; illa erros por versión, instancia, mod ou backup cando sexa posible.
9. Ao tocar comportamento específico dunha plataforma, conserva as outras e engade unha forma verificable de seleccionar OS/arquitectura.
10. Ao modificar modelos persistidos ou respostas de API, engade fixtures/tests para formatos actuais, antigos e datos incompletos.
11. Non cambies capabilities, endpoints, identificador, chaves do updater nin release workflow sen explicar a necesidade e revisar o impacto.
12. Actualiza documentación e textos de UI cando cambie o comportamento visible.

## Criterios obrigatorios para terminar unha tarefa

Antes de considerar unha tarefa terminada:

1. Revisa `git diff` e confirma que só hai cambios relacionados.
2. Executa Prettier/ESLint sobre os ficheiros modificados; se a tarefa resolve a configuración global, executa `bun run lint` completo.
3. Executa `bun run check` e `bun run build`. Se seguen bloqueados ou fallan por unha causa preexistente, indícao expresamente coa saída ou timeout; non os marques como correctos.
4. Se se modificou Rust, executa `cargo fmt --all -- --check`, `cargo clippy --locked --all-targets -- -D warnings` e `cargo test --locked`.
5. Engade ou actualiza tests cando exista lóxica verificable. Se non hai infraestrutura adecuada, documenta a carencia e proporciona pasos manuais concretos.
6. Para filesystem, instalacións, mods, backups ou updater, verifica polo menos o camiño feliz e un fallo recuperable; comproba tamén que non quedan temporais nin rexistros fantasma.
7. Para cambios multiplataforma, verifica por tests/fixtures as ramas de Windows, Linux, macOS x64 e macOS ARM64. Non afirmes ter probado fisicamente plataformas ás que non se tivo acceso.
8. Para cambios de persistencia, comproba carga de datos existentes, escritura correcta, reinicio e recuperación ante JSON inválido ou incompleto.
9. Para cambios visuais, comproba os estados normal, carga, baleiro, offline/erro e tamaños de ventá relevantes cando a páxina os teña.
10. Confirma que non se engadiron artefactos xerados, secrets ou datos locais.

Unha tarefa non está terminada só porque compila: debe preservar datos existentes, fallar de forma recuperable e deixar evidencia verificable das comprobacións realizadas.
