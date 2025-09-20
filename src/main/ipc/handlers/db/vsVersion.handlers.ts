import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { deleteVSVersion, getVSVersions, saveVSVersion } from '@main/utils/db/vsVersion'

export async function registerConfigHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.db.vsVersion.saveVSVersion, async (_event, version: VSVersionType): Promise<void> => await saveVSVersion(version))

  ipcMain.handle(IPC_CHANNELS.db.vsVersion.deleteVSVersion, async (_event, version: VSVersionType): Promise<void> => await deleteVSVersion(version))

  ipcMain.handle(IPC_CHANNELS.db.vsVersion.deleteVSVersion, async (_event): Promise<VSVersionType[]> => await getVSVersions())
}
