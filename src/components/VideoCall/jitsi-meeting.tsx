import { JitsiMeeting } from '@jitsi/react-sdk';
import type { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';
import React from 'react';

export type JitsiApiHandle = {
  toggleAudio(): void;
  toggleVideo(): void;
  toggleScreenShare(): void;
  toggleParticipants(): void;
  hangup(): void;
};

type Props = {
  roomName: string;
  userName: string;
  email: string;
  onMeetingEnd?: () => void;
  onReadyChange?: (ready: boolean) => void;
  onStatusChange?: (status: {
    audioMuted?: boolean;
    videoMuted?: boolean;
    screenSharing?: boolean;
  }) => void;
};

export const JitsiMeetingWrapper = React.forwardRef<JitsiApiHandle, Props>(
  ({ roomName, userName, email, onMeetingEnd, onReadyChange, onStatusChange }, ref) => {
    const apiRef = React.useRef<IJitsiMeetExternalApi | null>(null);

    const handleApiReady = (api: IJitsiMeetExternalApi) => {
			apiRef.current = api;
			onReadyChange?.(true);
			api.addListener('readyToClose', () => onMeetingEnd?.());

			api.addListener('audioMuteStatusChanged', (event: unknown) => {
				if (typeof event === 'object' && event !== null && 'muted' in event && typeof (event as any).muted === 'boolean') {
					const muted = (event as { muted: boolean }).muted;
					onStatusChange?.({ audioMuted: muted });
				}
			});

			api.addListener('videoMuteStatusChanged', (event: unknown) => {
				if (typeof event === 'object' && event !== null && 'muted' in event && typeof (event as any).muted === 'boolean') {
					const muted = (event as { muted: boolean }).muted;
					onStatusChange?.({ videoMuted: muted });
				}
			});

			api.addListener('screenSharingStatusChanged', (event: unknown) => {
				if (typeof event === 'object' && event !== null && 'on' in event && typeof (event as any).on === 'boolean') {
					const on = (event as { on: boolean }).on;
					onStatusChange?.({ screenSharing: on });
				}
			});

			api.addListener('toolbarButtonClicked', (ev: any) => {
				if (ev?.key === 'settings') {
					// faça algo (telemetria, fechar sua barra externa, etc.)
					// ev.preventExecution === true se a execução padrão foi bloqueada
				}
			});

		};

    React.useImperativeHandle(ref, () => ({
			toggleAudio: () => apiRef.current?.executeCommand('toggleAudio'),
			toggleVideo: () => apiRef.current?.executeCommand('toggleVideo'),
			toggleScreenShare: () => apiRef.current?.executeCommand('toggleShareScreen'),
			toggleParticipants: () => apiRef.current?.executeCommand('toggleParticipantsPane'),
			hangup: () => apiRef.current?.executeCommand('hangup'),
    }), []);

    React.useEffect(() => {
      return () => {
        apiRef.current?.dispose?.();
        apiRef.current = null;
        onReadyChange?.(false);
      };
    }, [onReadyChange]);

    return (
      <JitsiMeeting
        domain="telemedicina.planointeligente.com.br"
        roomName={roomName}
        userInfo={{ displayName: userName, email }}
				devices={{
					audioInput: 'Microfone USB',
					audioOutput: 'Fone de Ouvido USB',
					videoInput: 'HD Pro Webcam C920'
				}}
        configOverwrite={{
          prejoinPageEnabled: false,
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          disableDeepLinking: true,
          disableThirdPartyRequests: true,
          p2p: { enabled: false },
					filmStripOnly: true,
					disableSelfView: false,
					toolbarButtons: ['settings'],
					buttonsWithNotifyClick: [{ key: 'settings', preventExecution: false }],
        }}
        interfaceConfigOverwrite={{
          DEFAULT_REMOTE_DISPLAY_NAME: 'Paciente',
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        }}
        onApiReady={handleApiReady}
        getIFrameRef={(ref) => {
					ref.style.width = '100%';
					ref.style.height = '100%';
					ref.style.flex = '1';
					ref.style.border = '0';
					ref.setAttribute('allow', 'camera; microphone; display-capture; autoplay; clipboard-write; fullscreen');
				}}
      />
    );
  }
);

JitsiMeetingWrapper.displayName = 'JitsiMeetingWrapper';
