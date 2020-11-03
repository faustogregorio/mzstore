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
