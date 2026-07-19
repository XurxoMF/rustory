# TODOS.md

Backlog vivo de Rustory cara á primeira versión usable.

Este ficheiro só debe conter cousas pendentes por facer, corrixir ou verificar. O contexto estable do proxecto, comandos, arquitectura, convencións e regras de traballo deben vivir en `AGENTS.md`.

## Prioridade actual

1. Lanzamento do xogo.
2. Xestión completa de mods.
3. Backups.
4. Updater visible e configurable.
5. Robustez, documentación e acabamento.

## Aprazado por dependencias externas

1. (Aplazado) Mostrar progreso detallado e erro recuperable durante a instalación.
   - Bloqueo: a API de versións non informa aínda do tamaño total do artefacto, polo que non se pode calcular unha porcentaxe real de descarga.
   - Verificación futura: a UI permite entender se está descargando, verificando, extraendo, validando ou limpando, e mostra a porcentaxe real durante a descarga.
2. (Manual) Corrixir ou verificar na API o URL `macosArm64` de `1.22.3`: o 18 de xullo de 2026 apunta a `1.22.3-X64.zip`, pero publica un SHA distinto ao x64.
   - Bloqueo: o mantedor confirmou que se corrixirá na API.
   - Verificación futura: descargar ambos artefactos produce os SHA publicados e cada URL identifica a arquitectura correcta.

## Fase 4 — Lanzar o xogo

1. Antes de lanzar, comprobar o estado da versión e instalar ou reinstalar se non está dispoñible.
   - Verificación: unha instancia cunha versión `NOT_INSTALLED` agarda unha instalación correcta e despois continúa automaticamente co lanzamento.
2. Implementar variantes Windows, Linux e macOS.
   - Verificación: as rutas e argumentos son correctos por plataforma.
3. Parsear os parámetros de inicio e as variables de contorno de forma segura, e aplicar Mesa GL só en Linux.
   - Verificación: entradas inválidas non rompen o lanzamento nin inxectan argumentos inesperados.
4. Engadir `play()` e `stop()` a `VSInstance`, controlando proceso, estados, código de saída e concorrencia.
   - Verificación: non se pode lanzar dúas veces a mesma instancia sen control explícito.
5. Actualizar `lastTimePlayed` e `totalTimePlayed`.
   - Verificación: o tempo só cambia cando o proceso realmente arranca e remata.
6. Engadir botón Play/Stop e erros visibles.
   - Verificación: cada instancia arranca co seu `Data` illado e o estado volve a `STOPPED` ao saír.

## Fase 5 — Mods completos

1. Descargar mods a `.tmp` e mover tras validar `modinfo.json`.
   - Verificación: un ZIP inválido non aparece como mod instalado.
2. Evitar duplicados e colisións de nomes.
   - Verificación: instalar o mesmo mod dúas veces ten comportamento definido.
3. Implementar desinstalación.
   - Verificación: disco e estado UI quedan sincronizados.
4. Implementar actualización individual e “actualizar todos”.
   - Verificación: se unha actualización falla, os demais mods non quedan bloqueados.
5. Permitir escoller unha release manual.
   - Verificación: o usuario pode instalar unha versión compatible concreta.
6. Construír a pestana de mods da instancia.
   - Verificación: lista mods instalados, estado e accións dispoñibles.
7. Completar os filtros avanzados.
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
9. Cubrir o ciclo de inicialización de `Info`, `Config` e `Data` con dobres de Tauri.
   - Verificación: inicialización concorrente comparte instancia, un fallo non publica estado parcial e unha chamada posterior pode reintentar.
