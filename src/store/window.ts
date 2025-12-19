import {create} from "zustand"
import {immer} from "zustand/middleware/immer";
import {INITIAL_Z_INDEX, WINDOW_CONFIG, type windowKey, type Windows} from "@constants";

interface WindowState {
    windows: Windows;
    nextZIndex: number;
    openWindow: (windowKey: windowKey, data?: null) => void;
    closeWindow: (windowKey: windowKey) => void;
    focusWindow: (windowKey: windowKey) => void;
}

const useWindowStore = create<WindowState>()(immer(set => (
    {
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey: windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),
        closeWindow: (windowKey: windowKey) => set(
            (state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),
        focusWindow: (windowKey: windowKey) => set(
            (state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),
    }
)));

export default useWindowStore;