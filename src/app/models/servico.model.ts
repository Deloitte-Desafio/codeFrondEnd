import { UserResponse } from './user.model';

//para criar/editar serviço em /api/professionals/services
export interface CreateServiceRequest {
  nome: string;
  descricao: string;
  duracaoEmMinutos: number;
}

//retornado em /api/professionals/services ou /api/professionals/search
export interface ServiceResponse {
  id: number;
  nome: string;
  descricao: string;
  duracaoEmMinutos: number;
  profissional: UserResponse; // Relacionamento ManyToOne
}
