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

Vintage Story distribúe artefactos macOS x64 e ARM64 separados nas versións actuais, mentres que as versións antigas usan o paquete x64 para ambas arquitecturas. A API represéntaos cos campos obrigatorios `macosX64`, `macosX64Sha`, `macosArm64` e `macosArm64Sha`; para releases antigas pode devolver o mesmo URL e SHA nos dous artefactos como fallback. O launcher selecciona `macosX64` para `x86_64` e `macosArm64` para `aarch64`.

## Estado funcional confirmado

Partes bastante completas:

- Arranque de Tauri, single-instance, tray, logs e ventá personalizada.
- Información do sistema e detección de runtimes .NET.
- Configuración persistida de tema, idioma, escala, logs e directorios.
- Navegación, sidebar, breadcrumbs, command palette, hotkeys e recarga.
- Formulario de creación e edición de instancias.
- Rexistro e eliminación de instancias.
- Descarga/modelado de versións desde a API de Rustory.
- Catálogo ModDB con grid/lista, ordenación, paxinación, cantidade por páxina, selección de instancia, detalle, screenshots e estados de carga/erro/baleiro/offline.
- Instalación simple dun mod buscando unha release exacta ou parcialmente compatible.

Partes incompletas:

- O botón Play aínda non lanza o xogo.
- Non existe lanzamento de cliente/servidor nin seguimento real do proceso.
- `VSInstanceBackup` é só un modelo de datos; faltan crear, cargar, eliminar e restaurar.
- As pestanas de mods e backups dunha instancia son placeholders.
- Non hai desinstalación, actualización, activación/desactivación nin selección manual de release de mods.
- O panel de filtros avanzados de mods está baleiro.
- O updater Tauri está rexistrado e configurado, pero non hai chamadas frontend, estado, setting nin botón de actualización.
- Non existe xestión explícita das versións instaladas.
- A internacionalización está practicamente sen usar: os catálogos conteñen moi poucos textos e a UI está maioritariamente hardcodeada en inglés.
- `VSAccount` existe pero non está integrado.
- Servidores e modpacks só aparecen como intención no README.

## Arquitectura

Rustory é unha aplicación Tauri 2 cun frontend SvelteKit en modo SPA:

- `src/routes/`: páxinas e layout de SvelteKit. O SSR está desactivado e `adapter-static` xera unha SPA con fallback a `index.html`.
- `src/routes/+layout.svelte`: composition root do frontend; inicializa os servizos na orde necesaria, mostra a ventá, controla o loader e rexistra o reenvío de logs.
- `src/lib/classes/stores/`: configuración, datos, información do sistema e servizos reactivos de UI.
- `src/lib/classes/vs/`: modelos e operacións de dominio para versións, instancias, mods, backups e contas.
- `src/lib/classes/api/`: modelos e clientes para a API de Rustory e a API de mods de Vintage Story.
- `src/lib/classes/utils/`: abstraccións de ficheiros, directorios, ZIP, logs e utilidades relacionadas.
- `src/lib/helpers/`: funcións puras e helpers simples que non precisan estado nin forma de clase.
- `src/lib/components/ui/`: biblioteca local de compoñentes UI baseada en Bits UI/shadcn-svelte/xmfcn-svelte. É extensa e maioritariamente código de infraestrutura visual.
- `src-tauri/src/`: backend Rust. Os comandos IPC propios xestionan ZIPs, permisos Unix e detección da versión de Vintage Story.
- `src-tauri/capabilities/`: permisos e allowlists de Tauri.
- `messages/` e `rustory.inlang/`: configuración e catálogos de Paraglide/Inlang.
- `.github/workflows/release.yml`: empaquetado e publicación para Windows, Linux, macOS x64 e macOS ARM64.
- `.github/workflows/ci.yml`: comprobacións de PR/push con `check`, lint, `bun test`, Rust fmt, clippy e tests.

### Fluxo de datos

- `Config` persiste preferencias nun `config.json` baixo o directorio de configuración da aplicación.
- `Data` persiste rutas a versións e instancias nun `data.json` baixo o directorio de datos da aplicación.
- Cada servizo global é propietario da súa única instancia e exponse mediante `Clase.instance`; os servizos con carga asíncrona expóñense mediante `Clase.init()`. `Info`, `Config`, `Request` e `Data` comparten unha inicialización concorrente e permiten reintentar se a carga falla.
- Os compoñentes importan directamente as clases que usan. Non existe un service locator ou fachada global `App`.
- Cada instancia usa un `instance.json` e os subdirectorios `Data/Mods` e `Backups`.
- `config.json`, `data.json` e `instance.json` usan actualmente `schemaVersion: 1`. Os ficheiros legacy sen `schemaVersion` son compatibles: valídanse, complétanse cos defaults existentes e escríbense co esquema actual no seguinte gardado. Unha versión explícita distinta de `1`, unha raíz que non sexa un obxecto ou un campo presente cun tipo/valor inválido produce `AppErrorCodes.MALFORMED_DATA`.
- `Info.instance.tempDir` é o directorio temporal compartido da aplicación e corresponde a `tmp` dentro do directorio de caché resolto por Tauri. As descargas de versións usan un subdirectorio único `vs-version-installs/<UUID>` baixo esta raíz, separado do destino final.
- A extracción dunha versión faise nun directorio oculto de staging, irmán do destino final e co mesmo UUID do intento. Tras localizar o executable e confirmar que a versión executada coincide coa solicitada, `Directory.rename()` publica o staging no destino. O staging debe estar no mesmo filesystem para que o renomeado sexa atómico e nunca pode sobrescribir un destino existente.
- O frontend accede ao sistema mediante plugins Tauri e mediante os comandos Rust rexistrados en `src-tauri/src/lib.rs`. `File.getSha256()` delega nun comando Rust que le por bloques, para non cargar arquivos grandes completos na memoria do webview.
- As versións do xogo veñen de `https://api.rustory.xyz`; os mods veñen da API e CDN oficiais de mods de Vintage Story.

## Tecnoloxías confirmadas

- Bun e `bun.lock` como xestor de paquetes frontend.
- `@types/bun` proporciona os tipos oficiais de Bun e `bun:test`; non manteñas declaracións manuais para estes módulos salvo bloqueo confirmado.
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
bun run paraglide:compile
bun run check
bun run lint
bun test
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
- hai tests Rust para parsing do nivel de log, permisos recursivos e operacións ZIP; non hai aínda tests de integración da aplicación Tauri completa;
- hai tests frontend con `bun test` para compatibilidade de versións/releases, normalización de `modinfo.json` e comportamento de cache, offline e erros de transporte de `Request`;
- nun checkout limpo, executa `bun run paraglide:compile` antes de `bun run check`, `bun run lint`, `bun test` ou `bun run build`, porque parte do código importa os ficheiros xerados en `src/lib/paraglide/`;
- `bun run lint` debe ignorar artefactos xerados como `build/`, `.svelte-kit/`, `package/`, `src/lib/paraglide/`, `src-tauri/gen/` e `src-tauri/target/`;
- no contorno de Codex de xullo de 2026, `bun run check` e `bun run build` quedaron bloqueados ou limitados polo sandbox; o usuario informou de que `bun run check` funciona correctamente no seu contorno local habitual.

Estes fallos son débeda coñecida, non razón para omitir silenciosamente as comprobacións. Ao traballar neles, rexistra se o resultado cambia e distingue erros de código, configuración, sandbox e timeouts. Non cambies scripts estándar só para rodear unha limitación da contorna de Codex sen confirmalo antes co usuario.

## Convencións de código existentes

- TypeScript está en modo `strict`.
- Prettier usa tabs, comiñas dobres, sen trailing commas e `printWidth: 150`.
- Os compoñentes Svelte usan Svelte 5 e runes como `$state`, `$derived`, `$effect` e `$props`.
- As clases reactivas usan o sufixo `.svelte.ts`.
- As importacións internas usan preferentemente os aliases `$lib` e `$assets`.
- Todas as clases e compoñentes importan só as dependencias concretas que necesitan, como `Logger`, `Info`, `Config`, `Data` ou `Request`; isto evita ciclos e permite tests unitarios illados.
- Non convertas entidades de dominio en singletons: deben poder coexistir múltiples `VSInstance`, `VSVersion`, `VSMod` e `VSInstanceBackup`. O patrón singleton está reservado para servizos globais cun único ciclo de vida.
- As clases principais están divididas en propiedades estáticas, inicialización, propiedades de instancia, getters/setters e métodos, con comentarios JSDoc.
- Se unha transformación ou regra de dominio pertence claramente a unha clase existente, impleméntaa e próbaa como método desa clase. Reserva `src/lib/helpers/` para funcións simples transversais ou propiedades illadas que non teñan unha clase propietaria clara, como a comparación de versións do xogo.
- Os erros do dominio envólvense normalmente en `AppError` e rexístranse mediante `Logger`.
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
- Manter o arranque explícito no layout raíz e cada servizo global como propietario da súa instancia. Non reintroducir unha clase `App`, service locator ou fachada equivalente.
- Manter compatibilidade con Windows, Linux, macOS x64 e macOS ARM64.
- Tratar versións de xogo e instancias como entidades distintas: varias instancias poden compartir unha versión instalada, pero deben ter datos e mods illados.
- Usar os directorios de aplicación resoltos por Tauri e as rutas configurables existentes; non codificar rutas específicas dun sistema operativo.
- Manter as operacións privilexiadas ou non dispoñibles no webview detrás de plugins Tauri ou comandos IPC Rust.
- Consumir información xa centralizada polos stores a través das súas clases (`Info`, `Config`, `Data`, etc.). Non importar plugins Tauri directamente noutras clases para obter datos ou tipos que o store correspondente xa expón.
- Conceder só os permisos Tauri e dominios de rede necesarios. Calquera cambio en capabilities debe revisarse como cambio de seguridade.
- As descargas, instalacións, actualizacións e restauracións deben ser recuperables: usar temporais/staging, validar antes de substituír datos e limpar tras un fallo.
- Reutilizar `Info.instance.tempDir` para temporais de instalación; non descargar arquivos dentro do directorio final da versión. Cada intento debe ter un subdirectorio propio para evitar colisións entre operacións.
- Extraer versións nun staging irmán do destino final, non no temporal de caché, para garantir que o renomeado final non cruce filesystems. Validar o executable e a versión antes de publicar; non borrar nin sobrescribir unha instalación existente durante esta operación.
- Verificar sempre o SHA-256 descargado antes de crear ou extraer o ZIP. Todo artefacto proporcionado pola API ten obrigatoriamente un checksum; unha diferenza produce `AppErrorCodes.CHECKSUM_MISMATCH`. Non usar o hash unicamente como parte do nome.
- Non persistir unha versión ou instancia como dispoñible antes de completar e validar a operación correspondente.
- Os cambios no formato JSON persistido deben ser retrocompatibles ou incluír unha migración explícita.
- Ao cambiar `config.json`, `data.json` ou `instance.json`, incrementa a versión de esquema e engade a migración desde todas as versións que continúen soportadas. A ausencia de `schemaVersion` representa o formato legacy anterior ao esquema `1`; non a reutilices para formatos novos.
- Non asumir que a orde devolta por unha API equivale a “máis recente”; ordenar ou comparar versións explicitamente.
- Seleccionar os artefactos macOS exclusivamente mediante os campos da API e `Info.instance.osArch`: `x86_64` corresponde a `macosX64` e `aarch64` a `macosArm64`. Non construír URLs de descarga no cliente nin facer fallback entre arquitecturas fóra do contrato da API.
- O updater debe respectar a elección do usuario: setting para comprobación automática e acción manual separada.
- Non ampliar o alcance a servidores ou modpacks durante o MVP salvo petición explícita.

## Ficheiros e directorios sensibles

- `src-tauri/capabilities/*.json`: controla acceso a filesystem, shell, rede e updater.
- `src-tauri/tauri.conf.json`: identificador da app, endpoints e chave pública do updater, bundles e configuración da ventá.
- `src-tauri/src/commands/file_system.rs` e `zip.rs`: poden ler, modificar, eliminar, comprimir ou extraer datos do usuario; inclúen o cálculo por streaming de SHA-256.
- `src/lib/classes/utils/File.svelte.ts`, `Directory.svelte.ts` e `Zip.svelte.ts`: capa común para operacións destrutivas.
- `Config.svelte.ts`, `Data.svelte.ts` e `VSInstance.svelte.ts`: definen formatos persistidos; unha regresión pode impedir cargar instalacións existentes.
- `src/lib/classes/vs/VSVersion.svelte.ts`: instala e elimina versións compartidas por instancias.
- `src/lib/classes/stores/Request.svelte.ts` e clientes de `src/lib/classes/api/`: límites de confianza para datos externos.
- `.github/workflows/release.yml`: publicación multiplataforma e uso dos secrets de sinatura.
- `.github/workflows/ci.yml`: validación automática. Mantén as comprobacións aliñadas cos comandos documentados en “Probar e verificar” e non engadas ferramentas fóra de Bun/Rust sen aprobación explícita.
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
3. Executa `bun run paraglide:compile` antes das comprobacións frontend nun checkout limpo; despois executa `bun run check` e `bun run build`. Se seguen bloqueados ou fallan por unha causa preexistente, indícao expresamente coa saída ou timeout; non os marques como correctos.
4. Se se modificou Rust, executa `cargo fmt --all -- --check`, `cargo clippy --locked --all-targets -- -D warnings` e `cargo test --locked`.
5. Engade ou actualiza tests cando exista lóxica verificable. Se non hai infraestrutura adecuada, documenta a carencia e proporciona pasos manuais concretos.
   - Prioriza contratos, transformacións, estados e fallos recuperables; non engadas tests que só repitan getters ou asignacións triviais.
   - `tests/setup.ts`, cargado por `bunfig.toml`, substitúe unicamente o logger Tauri común. Cada test debe simular directamente o servizo concreto adicional que precise; non introduzas un mock ou rexistro global de servizos.
6. Para filesystem, instalacións, mods, backups ou updater, verifica polo menos o camiño feliz e un fallo recuperable; comproba tamén que non quedan temporais nin rexistros fantasma.
7. Para cambios multiplataforma, verifica por tests/fixtures as ramas de Windows, Linux, macOS x64 e macOS ARM64. Non afirmes ter probado fisicamente plataformas ás que non se tivo acceso.
8. Para cambios de persistencia, comproba carga de datos existentes, escritura correcta, reinicio e recuperación ante JSON inválido ou incompleto.
9. Para cambios visuais, comproba os estados normal, carga, baleiro, offline/erro e tamaños de ventá relevantes cando a páxina os teña.
10. Confirma que non se engadiron artefactos xerados, secrets ou datos locais.

Unha tarefa non está terminada só porque compila: debe preservar datos existentes, fallar de forma recuperable e deixar evidencia verificable das comprobacións realizadas.
