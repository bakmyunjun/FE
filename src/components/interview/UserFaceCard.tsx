import { Card, CardContent } from '../ui/card';
import { VideoOffIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { usePermissionsStore } from '@/stores/permissionsStore';

export default function UserFaceCard({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const cameraPermission = usePermissionsStore(
    (state) => state.cameraPermission,
  );

  const streamRef = useRef<MediaStream | null>(null); // 카메라 리소스 ref

  useEffect(() => {
    if (cameraPermission !== true) return;

    const video = videoRef.current;

    const connectCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;

        if (video) {
          video.srcObject = stream;
        }
      } catch (err) {
        console.error('카메라 권한 거부됨:', err);
      }
    };

    connectCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (video) {
        video.srcObject = null;
      }
    };
  }, [cameraPermission, videoRef]);

  return (
    <Card className="h-[320px] overflow-hidden">
      <CardContent className="flex h-full items-center justify-center p-0">
        {cameraPermission === false && (
          <div className="flex h-full w-full flex-col items-center justify-center bg-muted text-muted-foreground">
            <VideoOffIcon className="mb-2 h-10 w-10" />
            <span className="text-caption">카메라 권한을 확인해주세요.</span>
          </div>
        )}

        {cameraPermission === true && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        )}
      </CardContent>
    </Card>
  );
}
