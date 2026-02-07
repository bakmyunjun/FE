import { Card, CardContent } from '../ui/card';
import { VideoOffIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function UserFaceCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    async function connectCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCameraPermission(true);
      } catch (err) {
        console.error('카메라 권한 거부됨:', err);
        setCameraPermission(false);
      }
    }

    connectCamera();
  }, []);

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

        {cameraPermission === null && (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            카메라 연결 중입니다...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
