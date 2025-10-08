import { Either, right } from "@/errors/either";
import { clearPatient } from "../mock-db";

type Response = Either<Error, null>;

export async function clearPatientService(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      clearPatient();
      resolve(right(null));
    }, 500);
  });
}
