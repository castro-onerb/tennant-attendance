import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useGlobalModal } from '@/components/Modal/hooks/use-global-modals';
import { Headline } from '@/components/Title';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Queue() {

  const { closeAll } = useGlobalModal();
  const navigate = useNavigate();

  useEffect(() => {
    closeAll();
    setTimeout(() => {
      navigate('/attendance');
    }, 5000);
  }, []);

  return (
    <div
      className='w-dvw h-dvh bg-primary-500 p-6'>
      <div
        className='flex flex-col items-center p-6 justify-between w-full h-full bg-white rounded-2xl'>
        <div />
        <div className='flex flex-col items-center gap-4 max-w-[900px]'>
          <Headline.H1>Informações do atendimento</Headline.H1>
          <div className='flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-[20px]'>
            <Icon name='hourglass_line' size={52} className='text-primary-500' />
            <Headline.H3 className='text-gray-700 text-center'>
              Você está na fila de espera para atendimento<br />
              com um profissional de saúde. Seu atendimento<br />
              será iniciado em breve.
            </Headline.H3>
            <div className="flex flex-col items-center gap-3 p-3 w-full border-2 border-gray-200 bg-gray-100 rounded-xl">
              <Icon name='warning_fill' size={36} className='text-gray-700' />
              <Headline.H4 className='text-gray-700 text-center'>É importante lembrar que o Profissional de Saúde pode demorar um pouco mais durante o atendimento. Ou seja, seu lugar na fila e o tempo estimado pode aumentar ou diminuir.</Headline.H4>
            </div>
          </div>
        </div>
        <Button
          variant='outlined'
          color='gray'>
          Desistir do atendimento
        </Button>
      </div>
    </div>
  );
}
