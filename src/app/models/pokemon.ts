export class Pokemon {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;

  constructor(id: number, nombre: string, email: string, contraseña: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }

  // Métodos adicionales (opcional)
  // ...
}
