import { Either, right } from "@/errors/either";
import { PatientProps } from "../types/patients";
import { updatePatient } from "../mock-db";

type Response = Either<Error, PatientProps>;

export async function updatePatientService(data: PatientProps): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(right(updatePatient(data)));
    }, 1000);
  });
}
