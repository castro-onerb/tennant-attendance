import type { IconifyIcon } from '@iconify/react/dist/iconify.js';

type IconData = { type: 'data'; value: IconifyIcon };
type IconString = { type: 'string'; value: string };

export const IconsReference = {
  asterisk_line: { type: 'string', value: 'mingcute:asterisk-fill' },
  cam_fill: { type: 'string', value: 'stash:cam-video-solid' },
  close_regular: { type: 'string', value: 'ep:close-bold' },
  contract_edit_line: { type: 'string', value: 'material-symbols:contract-edit-outline-rounded' },
  loading_line: { type: 'string', value: 'hugeicons:loading-02' },
  gear_line: { type: 'string', value: 'gravity-ui:gear' },
  hourglass_line: { type: 'string', value: 'famicons:hourglass-outline' },
  warning_fill: { type: 'string', value: 'fluent:warning-12-filled' },
  voice_fill: { type: 'string', value: 'streamline:voice-mail-solid' },
  sthetoscope_line: { type: 'string', value: 'ph:stethoscope-bold' },
  user_fill: { type: 'string', value: 'basil:user-solid' },
  phone_fill: { type: 'string', value: 'carbon:phone-filled' },
  map_pin_line: { type: 'string', value: 'ri:map-pin-line' },
  family_fill: { type: 'string', value: 'material-symbols:family-restroom-rounded' },
} as const satisfies Record<string, IconData | IconString>;

export type IconKey = keyof typeof IconsReference;
