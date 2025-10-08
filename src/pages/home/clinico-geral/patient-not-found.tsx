import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { useGlobalModal } from '@/components/Modal/hooks/use-global-modals';
import { Headline } from '@/components/Title';
import { DataPatient } from './data-patient';
import { ClinicoGeralModal } from './clinico-geral.modal';

export function PatientNotFound() {
  const { open, close } = useGlobalModal();

  return (
    <Modal className='max-w-[600px]'>
      <Modal.Header className='border-0'>
        <Modal.Close className='ml-auto' close={() => close('patient-not-found')} />
      </Modal.Header>
      <Modal.Body className='items-center'>
        <span className='bg-primary-500 text-white p-5 rounded-full'>
          <Icon name='family_fill' size={46} />
        </span>
        <div className='flex flex-col gap-3'>
          <Headline.H1 className='text-center text-gray-700'>CPF não encontrado</Headline.H1>
          <Headline.H3 className='text-gray-500 text-center'>Não localizamos esse CPF em nosso sistema. Mas tudo bem! Vamos te ajudar a fazer um cadastro rápido para seguir com o atendimento.</Headline.H3>
        </div>
        {/* <Button
          className='w-full'
          onClick={() =>  open(<DataPatient />, { id: 'confirm-data-patient', mode: 'replaceAll' })}>
          Iniciar Cadastro
        </Button>
        <Button
          onClick={() => open(<ClinicoGeralModal />, { id: 'modal-clinico-geral', mode: 'replaceAll' })}
          className='w-full p-0 rounded-none bg-transparent hover:bg-transparent text-gray-600'>
          Tentar outro CPF
        </Button>*/}
        <Button
          className='w-full'
          onClick={() => open(<ClinicoGeralModal />, { id: 'modal-clinico-geral', mode: 'replaceAll' })}>
          Tentar outro CPF
        </Button>
      </Modal.Body>
    </Modal>
  );
}
