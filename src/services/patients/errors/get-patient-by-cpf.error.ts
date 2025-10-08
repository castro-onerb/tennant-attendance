import { AppError } from '@/errors/app-error';

export class PatientNotFound extends AppError {
  constructor() {
    super(
      'Não localizamos o paciente solicitado.',
      { code: 'patient-service.not_found' }
    );
  }
}

export class NotValidCPF extends AppError {
  constructor() {
    super(
      'É necessário fornecer um CPF válido.',
      { code: 'patient-service.bad_request' }
    );
  }
}
