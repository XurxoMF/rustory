# TODOS.md

Backlog vivo de Rustory cara á primeira versión usable.

Este ficheiro só debe conter cousas pendentes por facer, corrixir ou verificar. O contexto estable do proxecto, comandos, arquitectura, convencións e regras de traballo deben vivir en `AGENTS.md`.

## Prioridade actual

1. Base verificable e CI.
2. Persistencia e instalación transaccional de versións.
3. macOS x64/ARM64.
4. Lanzamento do xogo.
5. Xestión completa de mods.
6. Backups.
7. Updater visible e configurable.
8. Robustez, documentación e acabamento.

## Fase 1 — Base verificable

1. Engadir tests unitarios para helpers de rutas, versións e compatibilidade.
   - Verificación: os tests cobren casos válidos, inválidos e límites coñecidos.

## Fase 2 — Persistencia e instalación de versións

1. Introducir versión de esquema e validación de `config.json`, `data.json` e `instance.json`.
   - Verificación: datos actuais, datos antigos e JSON incompleto/corrupto teñen comportamento definido.
2. Descargar versións de Vintage Story a un directorio temporal independente do directorio final.
   - Verificación: un fallo durante a descarga non deixa versións parcialmente rexistradas.
3. Verificar SHA-256 antes de extraer cando a API proporcione checksum.
   - Verificación: checksum correcto instala; checksum incorrecto aborta e limpa temporais.
4. Extraer a staging, validar executable/versión e renomear atomicamente ao directorio final.
   - Verificación: unha extracción incompleta non substitúe unha instalación válida.
5. Limpar temporais e facer rollback ao fallar.
   - Verificación: corte de rede, ZIP inválido e falta de espazo non deixan instalacións fantasma.
6. Non rexistrar unha versión nin crear unha instancia ata finalizar e validar a instalación.
   - Verificación: se a instalación falla, `data.json` e a UI non mostran a versión/instancia como dispoñible.
7. Mostrar progreso e erro recuperable durante a instalación.
   - Verificación: a UI permite entender se está descargando, extraendo, validando ou limpando.
8. Corrixir a instalación fire-and-forget ao crear/editar instancias.
   - Verificación: as chamadas a `install()` rematan ou fallan antes de persistir o novo estado.

## Fase 3 — macOS x64/ARM64

1. Cambiar o modelo da API a artefactos por `OS + arquitectura`, con campos opcionais.
   - Verificación: o modelo representa macOS x64, macOS ARM64 e ausencia dalgún artefacto.
2. Definir fallback para releases antigas cun único paquete macOS.
   - Verificación: versións antigas seguen sendo instalables cando corresponda.
3. Engadir fixtures para macOS Intel, Apple Silicon e versións sen paquete nativo.
   - Verificación: a selección de artefacto está cuberta por tests.
4. Validar o executable dentro do `.app`/paquete real de Vintage Story.
   - Verificación: a instalación falla de forma recuperable se o executable esperado non existe.

## Fase 4 — Lanzar o xogo

1. Construír un `LaunchSpec` independente da UI: executable, directorio de datos, argumentos e variables.
   - Verificación: unha instancia produce sempre unha especificación reproducible.
2. Implementar variantes Windows, Linux e macOS.
   - Verificación: as rutas e argumentos son correctos por plataforma.
3. Parsear variables de contorno de forma segura e aplicar Mesa GL só en Linux.
   - Verificación: entradas inválidas non rompen o lanzamento nin inxectan argumentos inesperados.
4. Controlar proceso, estados, código de saída e concorrencia.
   - Verificación: non se pode lanzar dúas veces a mesma instancia sen control explícito.
5. Actualizar `lastTimePlayed` e `totalTimePlayed`.
   - Verificación: o tempo só cambia cando o proceso realmente arranca e remata.
6. Engadir botón Play/Stop e erros visibles.
   - Verificación: cada instancia arranca co seu `Data` illado e o estado volve a `STOPPED` ao saír.

## Fase 5 — Mods completos

1. Crear un resolver determinista de releases compatibles con tests.
   - Verificación: non confunde `1.2` con `1.20` e escolle a release máis recente válida.
2. Descargar mods a `.tmp` e mover tras validar `modinfo.json`.
   - Verificación: un ZIP inválido non aparece como mod instalado.
3. Evitar duplicados e colisións de nomes.
   - Verificación: instalar o mesmo mod dúas veces ten comportamento definido.
4. Implementar desinstalación.
   - Verificación: disco e estado UI quedan sincronizados.
5. Implementar actualización individual e “actualizar todos”.
   - Verificación: se unha actualización falla, os demais mods non quedan bloqueados.
6. Permitir escoller unha release manual.
   - Verificación: o usuario pode instalar unha versión compatible concreta.
7. Construír a pestana de mods da instancia.
   - Verificación: lista mods instalados, estado e accións dispoñibles.
8. Completar os filtros avanzados.
   - Verificación: filtros, layout e paxinación manteñen resultados coherentes.

## Fase 6 — Backups

1. Descubrir e cargar backups existentes.
   - Verificación: backups válidos aparecen e backups corruptos non abortan toda a carga.
2. Crear backups manualmente con progreso.
   - Verificación: o usuario pode ver avance e resultado.
3. Aplicar límite e retención.
   - Verificación: a política non elimina backups fóra do alcance esperado.
4. Implementar eliminación.
   - Verificación: borra só o backup seleccionado.
5. Restaurar mediante staging e rollback.
   - Verificación: restaurar reproduce os datos orixinais e un fallo non destrúe a instancia activa.
6. Integrar backup automático antes de Play.
   - Verificación: se está configurado, crea backup antes de modificar/executar.
7. Construír a pestana de backups.
   - Verificación: permite listar, crear, restaurar e eliminar desde a UI.

## Fase 7 — Actualización de Rustory

1. Engadir `automaticUpdatesEnabled` á configuración.
   - Verificación: o setting persiste e se respecta no arranque.
2. Consultar actualizacións ao iniciar só cando estea habilitado.
   - Verificación: desactivar updates evita a comprobación automática.
3. Manter estado “actualización dispoñible”.
   - Verificación: a UI pode mostrar versión actual, versión dispoñible e erro.
4. Engadir botón Check/Download/Install.
   - Verificación: o botón manual segue funcionando aínda que as automáticas estean desactivadas.
5. Pedir confirmación antes de instalar e relanzar.
   - Verificación: o usuario decide cando aplicar a actualización.
6. Probar artefactos asinados nos catro targets do workflow.
   - Verificación: Windows, Linux, macOS x64 e macOS ARM64 poden actualizar desde release asinada.

## Fase 8 — Robustez e acabamento

1. Illar instancias, versións, mods ou backups corruptos en lugar de abortar o arranque.
   - Verificación: un elemento corrupto xera erro local e permite cargar o resto.
2. Engadir timeouts, comprobación HTTP e política de cache en `Request`.
   - Verificación: HTTP non-OK, timeout e erro de rede teñen comportamento recuperable.
3. Corrixir `RustoryApiVSVersion.fetch()` para non consumir o corpo dúas veces.
   - Verificación: a resposta JSON pódese rexistrar e parsear sen erro.
4. Limitar rotación de logs.
   - Verificación: os logs non crecen indefinidamente.
5. Revisar permisos Tauri amplos.
   - Verificación: filesystem, shell e rede teñen só o alcance necesario.
6. Migrar todos os textos a Paraglide e completar inglés/español.
   - Verificación: non quedan textos visibles hardcodeados fóra dos catálogos.
7. Documentar setup, execución, estrutura de datos e proceso de release.
   - Verificación: unha persoa nova pode instalar, executar, comprobar e empaquetar seguindo a documentación.
8. Crear smoke tests Windows, Linux, macOS x64 e ARM64.
   - Verificación: cada plataforma cobre arranque, instalación básica e fluxo mínimo de instancia.
