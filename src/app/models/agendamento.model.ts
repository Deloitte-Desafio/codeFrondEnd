import { ServiceResponse } from './servico.model';
import { UserResponse } from './user.model';

//para criar agendamento em /api/appointments
export interface CreateAppointmentRequest {
  profissionalId: number;
  servicoId: number;
  dataHoraInicio: string; // Formato: ISO 8601 (ex.: '2025-05-15T10:00:00')
}
export interface AppointmentResponse {
  id: number;
  cliente: UserResponse;
  profissional: UserResponse;
  servico: ServiceResponse;
  dataHoraInicio: string;
  dataHoraFim: string;
  status:
    | 'AGENDADO'
    | 'CONCLUIDO'
    | 'CANCELADO_CLIENTE'
    | 'CANCELADO_PROFISSIONAL';
}

export interface SlotResponse {
  id: number;
  dataHoraInicio: string;
  dataHoraFim: string;
  available: boolean;
}
