import { ipcMain } from 'electron'
import { Systeminformation } from 'systeminformation'
import { IPC_CHANNELS } from '@main/ipc/channels'
import { getCPUInfo, getGPUsInfo, getNETRuntimesInfo, getNETSDKsInfo, getOSInfo, getRAMInfo, getVolumesInfo } from '@main/utils/system'

export async function registerSystemHandlers(): Promise<void> {
  ipcMain.handle(IPC_CHANNELS.system.getOSInfo, async (_event): Promise<Systeminformation.OsData | undefined> => await getOSInfo())

  ipcMain.handle(IPC_CHANNELS.system.getCPUInfo, async (_event): Promise<Systeminformation.CpuData | undefined> => await getCPUInfo())

  ipcMain.handle(IPC_CHANNELS.system.getRAMInfo, async (_event): Promise<Systeminformation.MemData | undefined> => await getRAMInfo())

  ipcMain.handle(IPC_CHANNELS.system.getGPUsInfo, async (_event): Promise<Systeminformation.GraphicsData | undefined> => await getGPUsInfo())

  ipcMain.handle(IPC_CHANNELS.system.getVolumesInfo, async (_event): Promise<Systeminformation.FsSizeData[] | undefined> => await getVolumesInfo())

  ipcMain.handle(IPC_CHANNELS.system.getNETSDKsInfo, async (_event): Promise<string[] | undefined> => await getNETSDKsInfo())

  ipcMain.handle(IPC_CHANNELS.system.getNETRuntimesInfo, async (_event): Promise<string[] | undefined> => await getNETRuntimesInfo())
}
