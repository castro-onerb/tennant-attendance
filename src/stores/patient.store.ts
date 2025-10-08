import { PatientProps } from '@/services/patients/types/patients';
import { create } from 'zustand';

type PatientStore = {
  patient: PatientProps | null;
  setPatient: (p: PatientProps) => void;
  clearPatient: () => void;
};

export const usePatientStore = create<PatientStore>((set) => ({
  patient: null,
  setPatient: (p) => set({ patient: p }),
  clearPatient: () => set({ patient: null }),
}));
