export interface User {
  id_usuario: number;
  nombre_completo: string;
  telefono: string;
  email: string;
  password: string;
}

export interface LoginRespuesta {
  message: string;
  token: string;
  nombre_completo: string;
  success: boolean;
}

export interface RegistrarRespuesta {
  success: boolean;
  message: string;
  inserted_id: number;
  token: string;
}

export interface Authenticated {
  token: string;
  autheticated: boolean;
  message: string;
}

export interface TokenData {
  aud: string;
  data: Token;
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
}

export interface Token {
  id_usuario: number;
  nombre_completo: string;
  email: string;
  esAdmin: boolean;
}

export interface CheckAuth {
  authenticated: boolean;
  esAdmin: boolean;
}
