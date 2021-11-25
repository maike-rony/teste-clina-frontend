import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/services/control.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hideInputPassoword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private controlService: ControlService,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      email: [, { validators: [Validators.required, Validators.email] }],
      password: [, { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  async submitLogin() {
    if (this.loginForm.valid) {
      this.loginService.loginForm(this.loginForm.value).subscribe(result => {
        if (result.statusCode == 200) {
          const body = result.body
          this.controlService.setTokenSessionStorage(body.token)
          this.router.navigate(['/home']);
        }
      })
    }
  }

}

