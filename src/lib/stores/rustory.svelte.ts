import { RConfig } from "$lib/classes/RConfig.svelte";
import { RInfo } from "$lib/classes/RInfo.svelte";
import { RUser } from "$lib/classes/RUser.svelte";
import { RWindow } from "$lib/classes/RWindow.svelte";

export const rInfo = RInfo.getInstance();

export const rConfig = RConfig.getInstance();

export const rUser = RUser.getInstance();

export const rMainWindow = new RWindow();
