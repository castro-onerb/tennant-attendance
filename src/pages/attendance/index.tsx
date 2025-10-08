import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { VideoCall } from "@/components/VideoCall";
import { useVideoCall } from "@/components/VideoCall/hooks/useVideoCall";
import { useNavigate } from "react-router-dom";

export default function Attendance() {

  const controller = useVideoCall();
  const navigate = useNavigate();

  return (
    <div
      className='w-dvw h-dvh bg-primary-500 p-6'>
      <div
        className='flex flex-col items-center justify-center w-full h-full bg-white rounded-2xl overflow-hidden'>
        <div className='flex bg-gray-100 flex-1 w-full'>
          <VideoCall controller={controller} />
        </div>
        <div className='flex flex-col items-center gap-6 p-6'>
          <span className="font-bold bg-primary-500 text-white p-3 rounded-xl leading-none">05:27</span>
          <div className="flex gap-6">
            <Button
               onClick={controller.toggleVideo}
              corner='full'
              variant='outlined'
              color='gray'
              className='p-4 border-gray-300 text-gray-700'>
              <Icon name='cam_fill' size={32} />
            </Button>
            <Button
               onClick={controller.toggleAudio}
              corner='full'
              variant='outlined'
              color='gray'
              className='p-4 border-gray-300 text-gray-700'>
              <Icon name='voice_fill' size={32} />
            </Button>
            <Button
              onClick={() => {
                controller.hangup();
                navigate('/');
              }}
              corner='full'
              variant='contained'
              className='p-4 bg-red-500 hover:bg-red-600 transition'>
              <Icon name='phone_fill' size={32} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
