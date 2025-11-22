import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { deleteVSVersion, getVSVersions, saveVSVersion } from '@main/utils/db/vsVersion'

export async function registerVSVersionHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.db.vsVersion.save, async (_event, version: VSVersionType): Promise<void> => await saveVSVersion(version))

  ipcMain.handle(IPC_CHANNELS.db.vsVersion.delete, async (_event, version: VSVersionType): Promise<void> => await deleteVSVersion(version))

  ipcMain.handle(IPC_CHANNELS.db.vsVersion.getAll, async (): Promise<VSVersionType[]> => await getVSVersions())
}
