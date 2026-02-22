import { useEffect } from 'react';
import { usePermissionsStore } from '@/stores/permissionsStore';

export function useSyncPermissions() {
  const { setCameraPermission, setMicPermission } = usePermissionsStore();

  useEffect(() => {
    let cameraStatus: PermissionStatus | null = null;
    let micStatus: PermissionStatus | null = null;

    const sync = async () => {
      try {
        // Camera
        if ('permissions' in navigator) {
          cameraStatus = await navigator.permissions.query({
            name: 'camera' as PermissionName,
          });

          setCameraPermission(cameraStatus.state === 'granted');

          cameraStatus.onchange = () => {
            setCameraPermission(cameraStatus!.state === 'granted');
          };

          // Microphone
          micStatus = await navigator.permissions.query({
            name: 'microphone' as PermissionName,
          });

          setMicPermission(micStatus.state === 'granted');

          micStatus.onchange = () => {
            setMicPermission(micStatus!.state === 'granted');
          };
        }
      } catch (err) {
        console.warn('브라우저 Permissions API 미지원:', err);
      }
    };

    sync();

    return () => {
      if (cameraStatus) cameraStatus.onchange = null;
      if (micStatus) micStatus.onchange = null;
    };
  }, [setCameraPermission, setMicPermission]);
}
