import axios from 'axios';

export function useTriageService() {
  const startTriage = async (cpf: string) => {
    console.log('Iniciando triagem para CPF:', cpf);

    // Simula delay do healthcheck
    await new Promise(res => setTimeout(res, 500));
    console.log('Healthcheck OK');

    // Simula delay da captura e leitura
    await new Promise(res => setTimeout(res, 1000));

    // Simula erro aleatório 20% das vezes
    if (Math.random() < 0.2) {
      console.error('Erro simulado na triagem');
      throw new Error('Falha na captura de dados da máquina.');
    }

    // Retorno simulado da leitura
    const mockData = {
      pulse: 72,
      bloodPressure: '120/80',
      temperature: 36.7,
      oxygen: 98
    };

    console.log('Dados capturados (mock):', mockData);

    // Simula switch de tela
    await new Promise(res => setTimeout(res, 300));
    console.log('Switch para navegador concluído');

    return mockData;
  };

  return { startTriage };
}
