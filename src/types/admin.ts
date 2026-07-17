export interface IDoctorCreateRequest {
  userEmail: string;
  dniDoctor: string;
  cmp: string;
  rne: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  direccion: string;
  especialidades: string[];
}

export interface ISecretaryCreateRequest {
  userEmail: string;
  dniSecretary: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  direccion: string;
}

export interface IAdminCreateRequest {
  userEmail: string;
  dniAdmin: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  direccion: string;
  superAdmin: boolean;
}
