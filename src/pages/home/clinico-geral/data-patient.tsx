import { useState } from 'react';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { useGlobalModal } from '@/components/Modal/hooks/use-global-modals';
import { Headline } from '@/components/Title';
import { usePatientStore } from '@/stores/patient.store';
import { PatientProps } from '@/services/patients/types/patients';
import { Rule, validate } from '@/utils/guard';
import { ValidationError } from '@/errors/validation-error';
import { validateCPF } from '@/utils/validate-cpf';
import { useMask } from '@/components/Input/hooks/use-mask';
import { usePatient } from '../hooks/use-get-patient-by-cpf';
import { useNavigate } from 'react-router-dom';

export function DataPatient() {
  const { close } = useGlobalModal();
  const patientStore = usePatientStore(state => state);
  const patient = patientStore.patient;
  const { updatePatient } = usePatient();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<PatientProps>>({
    name: patient?.name,
    cpf: patient?.cpf,
    birth: patient?.birth,
    gender: patient?.gender,
    whatsapp: patient?.whatsapp,
    email: patient?.email
  });

  const numberMask = { '#': { pattern: /\d/ } };
  const { value: cpfMasked, onChange: handleCpfChange, unmasked: cpfRaw } = useMask(
    form.cpf ?? '',
    '###.###.###-##',
    numberMask,
    raw => setForm(prev => ({ ...prev, cpf: raw }))
  );

  const { value: whatsappMasked, onChange: handleWhatsappChange, unmasked: whatsappRaw } = useMask(
    form.whatsapp ?? '',
    '(##) #####-####',
    numberMask,
    raw => setForm(prev => ({ ...prev, whatsapp: raw }))
  );

  const [errors, setErrors] = useState<Partial<Record<keyof PatientProps, string>>>({});

  const handleChange = (field: keyof PatientProps, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (patient) {
      patientStore.setPatient({ ...patient, [field]: value });
    }
  };

  const handleSave = async () => {
    const rules: Partial<Record<keyof PatientProps, Rule<PatientProps>>> = {
      name: { required: true, message: 'É necessário informar o nome.' },
      cpf: {
        required: true,
        validate: (value) => typeof value === 'string' && validateCPF(value).isRight(),
        message: 'É preciso fornecer um CPF válido.'
      },
      email: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Precisamos de um e-mail válido.'
      }
    };

    const result = validate(form as PatientProps, rules, 'Paciente', 'Dados do paciente');

    if (result.isLeft()) {
      const err = result.value as ValidationError;
      setErrors(err.details as Partial<Record<keyof PatientProps, string>>);
      return;
    }

    await updatePatient(form as PatientProps);

    close('confirm-data-patient');
    navigate('/triage');
  };

  return (
    <Modal className='w-[980px]'>
      <Modal.Header className='items-center'>
        <Headline.H4 className='text-gray-700'>Dados do paciente</Headline.H4>
        <Modal.Close
          close={() => {
            close('confirm-data-patient');
            patientStore.clearPatient();
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col items-center'>
          <span className='bg-primary-500 p-4 rounded-full aspect-square'>
            <Icon name='user_fill' size={40} className='text-white' />
          </span>
          <Headline.H1 className='text-center text-gray-700'>
            Confirme seus dados abaixo para continuar
          </Headline.H1>
          <Headline.H3 className='text-gray-500'>
            Antes de iniciar seu atendimento, confirme os dados do seu cadastro.
          </Headline.H3>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          <Form className='flex-1 grid grid-cols-2 gap-4'>
            <Form.Title className='items-center col-span-2'>
              <Icon name='contract_edit_line' size={22} /> Dados Gerais
            </Form.Title>

            <Input>
              <Input.Label>Nome do Paciente:</Input.Label>
              <Input.Text
                placeholder='Seu nome aqui'
                value={form.name || ''}
                onChange={e => handleChange('name', e.target.value)}
              />
              {errors.name && <Input.Legend>{errors.name}</Input.Legend>}
            </Input>

            <Input>
              <Input.Label>CPF:</Input.Label>
              <Input.Text
                placeholder='000.000.000-00'
                value={cpfMasked}
                onChange={e => handleCpfChange(e.target.value)}
              />
              {errors.cpf && <Input.Legend>{errors.cpf}</Input.Legend>}
            </Input>

            <Input>
              <Input.Label>E-mail:</Input.Label>
              <Input.Text
                placeholder='email@exemplo.com'
                value={form.email || ''}
                onChange={e => handleChange('email', e.target.value)}
              />
              {errors.email && <Input.Legend>{errors.email}</Input.Legend>}
            </Input>

            <Input>
              <Input.Label>Data de nascimento:</Input.Label>
              <Input.Text
                placeholder='00/00/0000'
                value={form.birth ? new Date(form.birth).toISOString().slice(0,10) : ''}
                onChange={e => handleChange('birth', new Date(e.target.value))}
              />
            </Input>

            <Input>
              <Input.Label>Sexo:</Input.Label>
              <Input.Text
                placeholder='Masculino/Feminino'
                value={form.gender || ''}
                onChange={e => handleChange('gender', e.target.value)}
              />
            </Input>

            <Input>
              <Input.Label required>WhatsApp:</Input.Label>
              <Input.Text
                placeholder='(00) 00000-0000'
                value={whatsappMasked}
                onChange={e => handleWhatsappChange(e.target.value)}
              />
            </Input>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-end'>
        <Button onClick={handleSave}>Continuar</Button>
      </Modal.Footer>
    </Modal>
  );
}
