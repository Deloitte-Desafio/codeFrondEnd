//para criar/editar disponibilidade em /api/professionals/availability
export interface CreateAvailabilityRequest {
  diaDaSemana:
    | 'SEGUNDA'
    | 'TERCA'
    | 'QUARTA'
    | 'QUINTA'
    | 'SEXTA'
    | 'SABADO'
    | 'DOMINGO';
  horaInicio: string; // Formato: 'HH:mm:ss'
  horaFim: string; // Formato: 'HH:mm:ss'
}

//retornado em /api/professionals/availability
export interface AvailabilityResponse {
  id: number;
  diaDaSemana:
    | 'SEGUNDA'
    | 'TERCA'
    | 'QUARTA'
    | 'QUINTA'
    | 'SEXTA'
    | 'SABADO'
    | 'DOMINGO';
  horaInicio: string;
  horaFim: string;
  profissionalId: number;
}
