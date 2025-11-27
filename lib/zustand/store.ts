import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  WindowConfig,
  INITIAL_Z_INDEX,
  WINDOW_CONFIG,
  WindowId,
} from "../constants";

type State = {
  windows: WindowConfig;
  nextZIndex: number;
};

type Actions = {
  openWindow: (windowKey: WindowId, date: unknown) => void;
  closeWindow: (windowKey: WindowId) => void;
  focusWindow: (windowKey: WindowId) => void;
};

export const useWindowStore = create<State & Actions>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey: WindowId, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex++;
        win.data = data;
      }),
    closeWindow: (windowKey: WindowId) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
      }),
    focusWindow: (windowKey: WindowId) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex++;
      }),
  }))
);
