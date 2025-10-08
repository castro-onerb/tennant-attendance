import { left, right, Either } from '@/errors/either';

export function validateCPF(cpf: string): Either<string, string> {
  const cleanCpf = cpf.replace(/\D/g, '');

  if (!cleanCpf) return left('CPF é obrigatório.');
  if (cleanCpf.length !== 11) return left('CPF deve ter 11 dígitos.');
  if (/^(\d)\1+$/.test(cleanCpf)) return left('CPF inválido.');

  const calculateDigit = (cpfArray: string[], factor: number) => {
    const total = cpfArray.reduce((acc, num) => acc + parseInt(num) * factor--, 0);
    const digit = (total * 10) % 11;
    return digit >= 10 ? 0 : digit;
  };

  const digits = cleanCpf.split('');
  const firstDigit = calculateDigit(digits.slice(0, 9), 10);
  const secondDigit = calculateDigit(digits.slice(0, 10), 11);

  if (firstDigit !== parseInt(digits[9]) || secondDigit !== parseInt(digits[10])) {
    return left('CPF inválido.');
  }

  return right(cleanCpf);
}
