import { UserResponse } from './user.model';

export interface ServiceRequest {
  nome: string;
  descricao: string;
  duracaoMinutos: number;
  profissionalId: number;
}

export interface ServiceResponse {
  id: number;
  nome: string;
  descricao: string;
  duracaoMinutos: number;
  profissional: UserResponse;
}
export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracaoMinutos: number;
  profissionalId: number;
  nomeProfissional?: string; // opcional para preencher depois
}