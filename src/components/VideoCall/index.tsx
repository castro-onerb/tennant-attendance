import { useState } from 'react';
import { useVideoCall } from './hooks/useVideoCall';
import { JitsiMeetingWrapper } from './jitsi-meeting';

export function VideoCall({ controller }: { controller: ReturnType<typeof useVideoCall> }) {
  const {
    jitsiRef, audioMuted, videoMuted, screenSharing,
    ready, setReady, close, toggleAudio, toggleVideo,
    toggleScreenShare, hangup, setAudioMuted, setVideoMuted, setScreenSharing
  } = controller;

  return (
    <div className='flex w-full h-full'>
      <JitsiMeetingWrapper
        ref={jitsiRef}
        roomName='telemedicina_1090368'
        userName='Carlos'
        email='breno.castro.ofc@gmail.com'
        onMeetingEnd={close}
        onReadyChange={setReady}
        onStatusChange={({ audioMuted, videoMuted, screenSharing }) => {
          if (audioMuted !== undefined) setAudioMuted(audioMuted);
          if (videoMuted !== undefined) setVideoMuted(videoMuted);
          if (screenSharing !== undefined) setScreenSharing(screenSharing);
        }}
      />
    </div>
  );
}
