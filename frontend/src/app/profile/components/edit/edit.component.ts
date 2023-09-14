import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  userId : number = 0;
  userLoggedInId: number = 0;
  user : User = {} as User;
  saved : boolean = false;
  notSaved: boolean = false;
  disabled = false;
  formErrors: { email: string, password: string } = { email: '', password: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient  
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    //geting loggedID and returning if the user is not logged with the correct id
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;
      this.userLoggedInId = userLoggedIn.id;   
      
      if(this.userLoggedInId !== this.userId){     
        this.router.navigate([`/users/${this.userId}`]);
      }
    });  

    this.getUserDetails(this.userId).subscribe(
      (data) => {
        this.user = data as User;
      },
      (error) => {
        console.error('Error loading user details', error);
        this.router.navigate(['/not-found']);
      }
    );
  }

  getUserDetails(userId: number) {
    const params = new HttpParams().set('loggedID', this.userLoggedInId);

    return this.http.get(`/users/${userId}`,{params}).pipe(
      catchError((error) => {
        console.error('Error loading user details', error);
        return throwError(error);
      })
    );
  }

  saveChanges() {
    if(this.isFormValid()){
      this.http.put(`/users/${this.userId}`,this.user).subscribe(
        (response) => {
          console.log('User details updated successfully');
          //this.router.navigate(['/users/', this.userId]);
          this.saved = true;
          this.disabled = true;
          window.location.reload();
        },
        (error) => {
          this.notSaved = true;
          console.error('Error updating user details', error);
          this.router.navigate([`/users/${this.userId}/edit`]);
        }
      ); 
    }else{

    }
  }

  isFormValid(): boolean{
    this.formErrors={email: '', password: ''};
    let isValid = true;

    //validate email
    if(!this.isValidEmail(this.user.email)){
      this.formErrors['email'] = 'Email inválido.';
      isValid = false;
      this.notSaved = true;
    }
    //validate Password
    if(!this.isValidPassword(this.user.password)){
      this.formErrors['password'] = 'A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 letra.';
      isValid = false;
      this.notSaved = true;
    }
    
    return isValid;
  }

  isValidPassword(password: string): boolean {
    // Verifica se a senha tem pelo menos 6 caracteres
    if (password.length < 6) {
      return false;
    }
  
    // Verifica se a senha contém pelo menos 1 letra
    const letterRegex = /[a-zA-Z]/;
    if (!letterRegex.test(password)) {
      return false;
    }
  
    // Verifica se a senha contém pelo menos 6 números
    const numberRegex = /\d/g;
    const numbers = password.match(numberRegex);
    return numbers !== null && numbers.length >= 6;
  }

  isValidEmail(email: string): boolean {
    // Regex para validar um email simples (pode ser mais abrangente se necessário)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

