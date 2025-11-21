import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { deleteVSInstance, getVSInstances, saveVSInstance } from '@main/utils/db/vsInstance'

export async function registerVSInstanceHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.db.vsInstance.saveVSInstance, async (_event, instance: VSInstanceType): Promise<void> => await saveVSInstance(instance))

  ipcMain.handle(IPC_CHANNELS.db.vsInstance.deleteVSInstance, async (_event, instance: VSInstanceType): Promise<void> => await deleteVSInstance(instance))

  ipcMain.handle(IPC_CHANNELS.db.vsInstance.getVSInstances, async (): Promise<VSInstanceType[]> => await getVSInstances())
}
