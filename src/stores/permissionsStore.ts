import { create } from 'zustand';

interface PermissionsState {
  cameraPermission: boolean;
  micPermission: boolean;
  setCameraPermission: (status: boolean) => void;
  setMicPermission: (status: boolean) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
  cameraPermission: false,
  micPermission: false,
  setCameraPermission: (status) => set({ cameraPermission: status }),
  setMicPermission: (status) => set({ micPermission: status }),
}));
