import {create} from "zustand"
import {immer} from "zustand/middleware/immer";
import {INITIAL_Z_INDEX, WINDOW_CONFIG, type WindowKey, type Windows} from "@constants/main.ts";

interface WindowState {
    windows: Windows;
    nextZIndex: number;
    openWindow: (windowKey: WindowKey, data?: null) => void;
    closeWindow: (windowKey: WindowKey) => void;
    focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowState>()(immer(set => (
    {
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey: WindowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),
        closeWindow: (windowKey: WindowKey) => set(
            (state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),
        focusWindow: (windowKey: WindowKey) => set(
            (state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),
    }
)));

export default useWindowStore;