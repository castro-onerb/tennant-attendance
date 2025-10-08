import { useRef, useState, useCallback } from 'react';
import { JitsiApiHandle } from '../jitsi-meeting';

export function useVideoCall() {
  const jitsiRef = useRef<JitsiApiHandle>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  const [audioMuted, setAudioMuted] = useState<boolean | null>(null);
  const [videoMuted, setVideoMuted] = useState<boolean | null>(null);
  const [screenSharing, setScreenSharing] = useState<boolean | null>(null);

  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  const close = useCallback(() => {
    jitsiRef.current?.hangup();
    setVisible(false);
  }, []);

  return {
    jitsiRef,
    ready,
    setReady,
    visible,
    toggleVisibility,
    close,

    toggleAudio: () => jitsiRef.current?.toggleAudio(),
    toggleVideo: () => jitsiRef.current?.toggleVideo(),
    toggleScreenShare: () => jitsiRef.current?.toggleScreenShare(),
    hangup: () => jitsiRef.current?.hangup(),

    audioMuted,
    videoMuted,
    screenSharing,
    setAudioMuted,
    setVideoMuted,
    setScreenSharing,
  };
}
