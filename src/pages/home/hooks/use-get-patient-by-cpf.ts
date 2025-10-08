import { useState } from 'react';
import { PatientProps } from '../../../services/patients/types/patients';
import { getPatientByCPF } from '@/services/patients/get-patient-by-cpf';
import { validateCPF } from '@/utils/validate-cpf';
import { NotValidCPF } from '@/services/patients/errors';
import { Either, left } from '@/errors/either';
import { usePatientStore } from '@/stores/patient.store';
import { updatePatientService } from '@/services/patients/update-patient';
import { clearPatientService } from '@/services/patients/clear-patient';

export function usePatient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setPatient = usePatientStore(state => state.setPatient);
  const clearPatientStore = usePatientStore(state => state.clearPatient);
  const patient = usePatientStore(state => state.patient);

  const clearError = () => setError(null); // <-- adiciona aqui

  const getPatient = async (cpf: string): Promise<Either<Error, PatientProps>> => {
    clearPatientStore();
    setIsLoading(true);
    setError(null);

    try {
      const cpfValidation = validateCPF(cpf);

      const result = await cpfValidation.fold(
        async () => left(new NotValidCPF()),
        async (cleanCPF) => {
          const response = await getPatientByCPF(cleanCPF);
          return response;
        }
      );

      result.fold(
        (err) => {
          setError(err);
          clearPatientStore();
        },
        (patient) => {
          setError(null);
          setPatient(patient);
        }
      );

      return result;
    } catch {
      const unexpected = new Error("Erro inesperado ao buscar o paciente.");
      setError(unexpected);
      clearPatientStore();
      return left(unexpected);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePatient = async (data: PatientProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updatePatientService(data);
      result.fold(
        (err) => setError(err),
        (patient) => setPatient(patient)
      );
      return result;
    } catch {
      const unexpected = new Error("Erro inesperado ao atualizar o paciente.");
      setError(unexpected);
      return left(unexpected);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPatient = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await clearPatientService();
      clearPatientStore();
      return result;
    } catch {
      const unexpected = new Error("Erro inesperado ao limpar o paciente.");
      setError(unexpected);
      return left(unexpected);
    } finally {
      setIsLoading(false);
    }
  };

  return { patient, isLoading, error, getPatient, updatePatient, clearPatient, clearError };
}
