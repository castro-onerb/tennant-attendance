import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Headline } from '@/components/Title';
import { usePatientStore } from '@/stores/patient.store';
import { useTriageService } from '../hooks/use-triage-service';
import { useNavigate } from 'react-router-dom';
import { useGlobalModal } from '@/components/Modal/hooks/use-global-modals';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { LoadingModal } from '@/components/Loading';
import { Input } from '@/components/Input';

export function Triage() {
  const patient = usePatientStore(state => state.patient);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { open, close } = useGlobalModal();
  const loadingIdRef = useRef<string | null>(null);

  const { startTriage } = useTriageService();

  useEffect(() => {
    if (loading) {
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
  }, [loading]);

  const handleStart = async () => {
    if (!patient) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await startTriage(patient.cpf || '');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      open(
        <Modal className='w-[800px]'>
          <Modal.Body>
            <Headline.H2 className='text-center mx-20'>Os dados coletados serão enviados ao médico no atendimento.</Headline.H2>
            <div className='grid grid-cols-2 gap-8'>
              <div className='flex flex-col items-center gap-4 p-6 px-10 font-semibold text-gray-700 border border-gray-200 rounded-2xl'>
                <span className='text-3xl'>🫀 Pulso</span>
                <span className='text-6xl'>{result.pulse} bpm</span>
              </div>
              <div className='flex flex-col items-center gap-4 p-6 px-10 font-semibold text-gray-700 border border-gray-200 rounded-2xl'>
                <span className='text-3xl'>💉 Pressão</span>
                <span className='text-6xl'>{result.bloodPressure}</span>
              </div>
              <div className='flex flex-col items-center gap-4 p-6 px-10 font-semibold text-gray-700 border border-gray-200 rounded-2xl'>
                <span className='text-3xl'>🌡️ Temperatura</span>
                <span className='text-6xl'>{result.temperature}°C</span>
              </div>
              <div className='flex flex-col items-center gap-4 p-6 px-10 font-semibold text-gray-700 border border-gray-200 rounded-2xl'>
                <span className='text-3xl'>🩸 Oxigenação</span>
                <span className='text-6xl'>{result.oxygen}%</span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='justify-end'>
            <Button onClick={() => navigate('/queue')}>Continuar</Button>
          </Modal.Footer>
        </Modal>,
        { mode: 'replaceAll' }
      );
    }
  }, [result]);

  useEffect(() => {
    if (!patient) {
      navigate('/');
    }
  }, [patient, navigate]);

  if (!patient) return null;

  return (
    <div className='flex flex-col gap-16 items-center justify-center w-dvw h-dvh bg-primary-500'>
      <div className='flex flex-col items-center gap-3'>
        <Headline.H1 className='text-white text-[90px] leading-none'>
          Olá, {patient.name?.split(' ')[0]}!
        </Headline.H1>
        <Headline.H2 className='text-white text-[40px] leading-none'>
          Quase lá, só precisamos realizar uma rápida triagem.
        </Headline.H2>
      </div>

      <motion.button
        className='relative p-14 px-20 text-5xl bg-primary-700 font-bold text-white rounded-3xl overflow-visible'
        onClick={handleStart}
        whileTap={{ scale: 0.95 }}
      >
        INICIAR

        {/* Primeiro ring */}
        <motion.span
          className='absolute inset-0 rounded-3xl pointer-events-none'
          style={{
            boxShadow: '0 0 0 0 rgba(96, 165, 250, 0.5)',
          }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(96, 165, 250, 0.5)',
              '0 0 0 24px rgba(96, 165, 250, 0)',
              '0 0 0 0 rgba(96, 165, 250, 0.5)'
            ],
            opacity: [1, 0, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Segundo ring, menor delay para dar efeito de halo duplo */}
        <motion.span
          className='absolute inset-0 rounded-3xl pointer-events-none'
          style={{ boxShadow: '0 0 0 0 rgba(255,255,255,0.3)' }}
          animate={{
            boxShadow: ['0 0 0 0 rgba(255,255,255,0.3)', '0 0 0 16px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.3)'],
            opacity: [1, 0, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
        />
      </motion.button>

      {error && <Input.Legend className='bg-white py-5 px-10 rounded-xl text-3xl max-w-[640px] text-center shadow-xl'>{error}</Input.Legend>}
    </div>
  );
}
