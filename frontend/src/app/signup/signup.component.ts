import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {} as User;
  formErrors: { user: string, 
                email: string, 
                password: string, 
                name: string,
                lastName: string} = {  user: '', email: '', password: '', name: '', lastName: ''};
  userLoggedInId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient  
  ) {}

  submitForm() {
    // Lógica para enviar o formulário se não houver erros
    if (this.isFormValid()) {
      this.sendRequest();
    }else{
      console.log('ERROR: Could not create user');
    }
  }

  isFormValid(): boolean{
    // Limpa mensagens de erro antes de realizar a validação
    this.formErrors = {  user: '', email: '', password: '', name: '', lastName: ''};
    let isValid : boolean = true;

    // Validação do campo Nome de Usuário (obrigatório)
    if (!this.user.user) {
      this.formErrors['user'] = 'Nome de usuário é obrigatório.';
      isValid = false;
    }

    // Validação do campo E-mail (obrigatório)
    if (!this.user.email) {
      this.formErrors['email'] = 'E-mail é obrigatório.';
      isValid = false;
    }else if(!this.isValidEmail(this.user.email)){
      this.formErrors['email'] = 'O E-mail é inválido.';
      isValid = false;
    }

    // Validação do campo Senha (obrigatório)
    if (!this.user.password) {
      this.formErrors['password'] = 'Senha é obrigatória.';
      isValid = false;
    } else {
      isValid = this.isValidPassword(this.user.password);
    }

    // Validação do campo Nome e Sobrenome (obrigatório)
    if (!this.user.name) {
      this.formErrors['name'] = 'Nome e sobrenome são obrigatórios.';
      isValid = false;
    }

    if (!this.user.lastName) {
      this.formErrors['lastName'] = 'Nome e sobrenome são obrigatórios.';
      isValid = false;
    }

    return isValid;
  }

  isValidPassword(password: string): boolean {
    // Verifica se a senha tem pelo menos 6 caracteres
    let isValid:boolean = true;

    if (password.length < 7) {
      this.formErrors['password'] = 'A senha deve ter pelo menos 7 caracteres.';
      isValid = false;
    }
  
    // Verifica se a senha contém pelo menos 1 letra
    const letterRegex = /[a-zA-Z]/;
    if (!letterRegex.test(password)) {
      this.formErrors['password'] = 'A senha deve conter pelo menos uma letra';
      isValid = false;
    }
  
    // Verifica se a senha contém pelo menos 6 números
    const numberRegex = /\d/g;
    const numbers = password.match(numberRegex);
    if(!(numbers !== null && numbers.length >= 6)){
      this.formErrors['password'] = 'A senha deve conter pelo menos 6 números.';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    // Regex para validar um email simples (pode ser mais abrangente se necessário)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

  sendRequest(): void {
    console.log('Sign in user:', this.user);
    this.http.post('/users', this.user).subscribe(
      (data) => {
        const createdUser: User = data as User;
        console.log('Sign in created user:', createdUser);
        this.http.put('/me', { id: createdUser.id }).subscribe(
          (data) => {
            this.router.navigate([`/users/${createdUser.id}`]);
          },
          (error) => {
            console.log("Error logging in", error);
          }
        );
      },
      (error) => {
        console.log(error.status);
        console.log(error.message);
  
        if (error.status === 409) {
          if (error.error && error.error.message) {
            const errorMessage = error.error.message;
  
            if (errorMessage.includes('Username')) {
              this.formErrors['user'] = 'O Usuário já existe';
            }
  
            if (errorMessage.includes('Email')) {
              this.formErrors['email'] = 'O Email já existe';
            }
          }
        }
      }
    );
  }  
}
