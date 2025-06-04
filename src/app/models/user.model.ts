///auth/register
export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: 'CLIENTE' | 'PROFISSIONAL';
}
///auth/login
export interface LoginRequest {
  email: string;
  senha: string;
}
///auth/register, /auth/login, ou perfil
export interface UserResponse {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: 'CLIENTE' | 'PROFISSIONAL';
}
