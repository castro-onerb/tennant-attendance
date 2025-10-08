import { Either, left, right } from "@/errors/either";
import { PatientProps } from "../types/patients";
import { NotValidCPF, PatientNotFound } from "../errors";
import { getPatient } from "../mock-db";

type Response = Either<NotValidCPF | PatientNotFound, PatientProps>;

export async function getPatientByCPF(cpf: string): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!cpf || cpf === "invalid") {
        return resolve(left(new NotValidCPF()));
      }

      const patient = getPatient();

      if (!patient) {
        return resolve(left(new PatientNotFound()));
      }

      if (patient.cpf !== cpf) {
        return resolve(left(new PatientNotFound()));
      }

      return resolve(right(patient));
    }, 2000);
  });
}
