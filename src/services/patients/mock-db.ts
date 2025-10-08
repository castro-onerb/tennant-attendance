import dayjs from "@/utils/dayjs.config";
import { PatientProps } from "./types/patients";

let patient: PatientProps | null = {
  name: 'Breno Castro Barros da Silva',
  cpf: '07435809314',
  birth: dayjs('1999-06-09').toDate(),
  gender: 'male',
  whatsapp: '88999316842',
  email: 'breno.castro.ofc@gmail.com',
};

export function getPatient() {
  return patient;
}

export function updatePatient(data: PatientProps) {
  patient = { ...data };
  return patient;
}

export function clearPatient() {
  patient = null;
}
