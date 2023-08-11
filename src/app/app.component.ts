import { Component, OnInit } from '@angular/core';
import { FormService } from './services/form/form.service';
import { ErrorMessage } from './models/error-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private formValue: any = {};
  public formValid: boolean = false;
  public showError: boolean = false;

  constructor(
    private formService: FormService
  ) {
  }

  ngOnInit(): void {
  }

  getFormValue(event: any) {
    this.formValue = event;
  }

  getFormValid(event: boolean) {
    this.formValid = event;
  }

  preValidate() {
    if (this.formValid) {
      this.showError = false;
      console.log(this.formValue);
    } else {
      console.log(this.formValue);
      
      this.showError = true;
      const errors: ErrorMessage[] = this.formService.addError(this.formValue);
      this.formService.setFormError(errors);
    }
  }
}
