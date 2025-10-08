import { DataPatient } from './data-patient';
import { Headline } from '@/components/Title';
import { Icon } from '../../../components/Icon';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { LoadingModal } from '@/components/Loading';
import { PatientNotFound } from '@/services/patients/errors';
import { useMask } from '../../../components/Input/hooks/use-mask';
import { usePatient } from '../hooks/use-get-patient-by-cpf';
import { useGlobalModal } from '@/components/Modal/hooks/use-global-modals';
import { PatientNotFound as PatientNotFoundModal } from './patient-not-found';

export function ClinicoGeralModal() {
  const [cpf, setCpf] = useState<string>('');
  const { open, close } = useGlobalModal();
  const { patient, error, isLoading, getPatient, clearError } = usePatient();
  const loadingIdRef = useRef<string | null>(null);

  const numberMask = { '#': { pattern: /\d/ } };
  const { value: cpfMasked, onChange: handleCpfChange, isValid: isValidCpf } = useMask(
    cpf,
    '###.###.###-##',
    numberMask,
    (raw) => {
      setCpf(raw);
      if (error) {
        clearError();
      }
    },
  );

  useEffect(() => {
    if (!error && !patient) return;

    if (error instanceof PatientNotFound) {
      open(<PatientNotFoundModal />, {
        id: 'patient-not-found',
        singletonKey: 'patient-not-found',
        mode: 'replaceAll',
      });
    } else if (patient) {
      open(<DataPatient />, {
        id: 'confirm-data-patient',
        singletonKey: 'confirm-data-patient',
        mode: 'replaceAll',
        closeOnBackdrop: false,
        closeOnEsc: false,
      });
    }
  }, [error, patient]);

  useEffect(() => {
    if (isLoading) {
      if (!loadingIdRef.current) {
        loadingIdRef.current = open(<LoadingModal className='text-primary-500' />, {
          singletonKey: 'loading',
          closeOnBackdrop: false,
          closeOnEsc: false,
          mode: 'singleton',
        });
      }
    } else if (loadingIdRef.current) {
      close(loadingIdRef.current);
      loadingIdRef.current = null;
    }
  }, [isLoading, open, close]);

  const handleContinue = async () => {
    await getPatient(cpf);
  };

  return (
    <Modal className='w-[600px]'>
      <Modal.Header className='border-0'>
        <Modal.Close className='ml-auto' close={() => close('modal-clinico-geral')} />
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-6 items-center'>
          <span className='bg-primary-500 text-white p-5 rounded-full'>
            <Icon name='sthetoscope_line' size={46} />
          </span>
          <Headline.H1 className='text-center text-gray-700'>
            Atendimento<br /> com Clínico Geral
          </Headline.H1>
          <Headline.H3 className='text-gray-500 text-center'>
            Informe o CPF do paciente que será atendido
          </Headline.H3>
        </div>

        <Input>
          <Input.Label required>CPF do Paciente:</Input.Label>
          <Input.Text
            placeholder='xxx.xxx.xxx-xx'
            value={cpfMasked}
            onChange={e => handleCpfChange(e.target.value)}
          />
        </Input>

        {error && !(error instanceof PatientNotFound) && (
          <Input.Legend>{error.message}</Input.Legend>
        )}

        <Button onClick={handleContinue} disabled={!isValidCpf}>
          Continuar
        </Button>
      </Modal.Body>
    </Modal>
  );
}
