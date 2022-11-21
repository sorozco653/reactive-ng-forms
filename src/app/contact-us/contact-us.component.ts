import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../service/user.service';

export const VALID_AGE = 13;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  
  signUp!: FormGroup;
  currentIndex: number = 0;
  steps = [
    {title: 'Create Account'},
    {title: 'Verify Password'}
  ]
  loading: boolean = false
  invalidForm: boolean = false
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.signUp = this.fb.group({
      name: [
        '', 
        [Validators.required, Validators.minLength(4)]
      ],
      email: [ 
        null,
        [Validators.required, Validators.email]
      ],
      dob: [null, this.dateValidator],
      password: [
        null,
        [Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ), ]
      ],
      check_password: [
        null, 
        [Validators.required]
      ]
    }, { validators: this.passwordMatchingValidatior });
  }

  public moveStep(dir: 'prev' | 'next'): void {
    const first = this.currentIndex === 0
    const last = this.currentIndex === this.steps.length -1;

    if (dir === 'next' && !last) {
      this.currentIndex++
    } else if (dir === 'prev' && !first) {
      this.currentIndex--
    }
  }

  private dateValidator(control: FormControl) {
    if (control.value) {
      const age = moment().diff(control.value, 'years')
      if (age <= VALID_AGE) {
        return { invalidDate: true }
      }
    }
    return null
  }

  private passwordMatchingValidatior(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('check_password');
  
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  public async onSubmit(form: FormGroup) {
    try {
      this.loading = true;
      this.invalidForm = false;
      await this.wait(3000);
      if (form.valid) {
        const {
          name, 
          email, 
          password, 
          dob
        } = form.value
        this.userService.setUser({
          name,
          email,
          password, 
          dob
        })
        this.router.navigate(['/user']);
      } else {
        throw "Form is invalid."
      }
    } catch {
      this.invalidForm = true
      console.log('Form is invalid')
    } finally {
      this.loading = false
    }
  }

  private wait(ms:number): Promise<void>{
    return new Promise((resolve,reject) => setTimeout(_=> resolve(), ms))
  }

}
 