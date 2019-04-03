export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  ime: string;
  prezime: string;
  user_role: {
    id: number;
  };

  constructor() {
    this.id = null;
    this.username = '';
    this.password = '';
    this.email = '';
    this.ime = '';
    this.prezime = '';
    this.user_role = {
      id: null
    };
  }
}