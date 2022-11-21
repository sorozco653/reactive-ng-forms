import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss']
})
export class PrintErrorComponent {

  errorMsgList: any = [];
  errorMessage: Record<string, any>  = {
    'required'  : (_params: any)  => `This field is required`,
    'maxlength' : (params: { requiredLength: any; })  => `Maximum ${params.requiredLength} characters are allowed`,
    'minlength' : (params: { requiredLength: any; })  => `Minimum ${params.requiredLength} characters are required`,
    'pattern'   : (_params: any)  => `Password must be a length of 8 characters and must contain a capital letter, number, and a special character`,
    'email': (_params: any)   => `Enter a Valid Email Address`,
    'invalidDate': (_params: any)   => `You must be over the age of 13`
  };

  @Input() controlName!: AbstractControl | AbstractControlDirective
  constructor(){}

  listErrors() {
    if (!this.controlName) return [];

    if (this.controlName.errors) {
        Object.keys(this.controlName.errors).map( error  => {
            const controlErrors = this.controlName.errors ?? [];
            this.controlName.touched || this.controlName.dirty ?
            this.errorMsgList.push(this.errorMessage[error](controlErrors[error])) : '';
        });
        return this.errorMsgList;
    }
    
    return [];
}
  
}
