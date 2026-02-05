/**
 * 시간 영역(Time-domain) 신호에서 자기상관(Auto-correlation)을 계산해
 * 기본 주파수(pitch)를 추정
 */

const RMS_SILENCE_THRESHOLD = 0.02;

export function estimatePitch(
  buffer: Float32Array,
  sampleRate: number,
): number | null {
  const bufferSize = buffer.length;
  const rms = Math.sqrt(buffer.reduce((sum, v) => sum + v * v, 0) / bufferSize);

  // RMS가 임계값보다 낮으면 무성 구간으로 판단 (노이즈 제거 목적)
  if (rms < RMS_SILENCE_THRESHOLD) return null;

  let bestLag = -1;
  let maxCorrelation = 0;

  for (let lag = 20; lag < bufferSize / 2; lag++) {
    let autoCorrelation = 0;

    for (let i = 0; i < bufferSize - lag; i++) {
      autoCorrelation += buffer[i] * buffer[i + lag];
    }

    if (autoCorrelation > maxCorrelation) {
      maxCorrelation = autoCorrelation;
      bestLag = lag;
    }
  }

  if (bestLag === -1) return null;

  return sampleRate / bestLag;
}
