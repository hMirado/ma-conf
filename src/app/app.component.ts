import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from './services/form/form.service';
import { ErrorMessage } from './models/error-message';
import { RecapMessage } from './models/recap-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private formValue: any = {};
  public formValid: boolean = false;
  public showError: boolean = false;
  public isPreValidate: boolean = false;
  private subscription = new Subscription()

  constructor(
    private formService: FormService
  ) {
  }

  ngOnInit(): void {
    this.getNewRegistration();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getFormValue(event: any) {
    this.formValue = event;
  }

  getFormValid(event: boolean) {
    this.formValid = event;
  }

  preValidate() {
    const isEmpty = Object.keys(this.formValue).length === 0 ;
    
    if (this.formValid) {
      this.showError = false;
      this.isPreValidate = true;
      const registration =this.formValue['registration'];
      const hosting =this.formValue['hosting'];
      const recap: RecapMessage = {
        name: `${this.formValue['fName']} ${this.formValue['lName'].toUpperCase()}`,
        email: this.formValue['email'],
        gender: this.formValue['gender'] == 'men' ? 'monsieur' : 'madame',
        registrationType: registration  == 'student' ? 'Etudiant' : registration == 'academy' ? 'Académique' : 'Entreprise',
        registrationPrice: registration == 'student' ? 150 : registration == 'academy' ? 200 : 300,
        hosting: hosting ? 'Avec réservation' : 'Sans réservation',
        hostingPrice: hosting ? 150 :0
      }
      this.formService.setRecap(recap);
      this.formService.setFormIsDisabled(true);
    } else {
      this.isPreValidate = false;
      this.showError = true;
      const errors: ErrorMessage[] = this.formService.addError(this.formValue);
      this.formService.setFormError(errors);
    }
  }

  getButtonIsEnable(event: boolean): void {
    this.isPreValidate = !event;
  }

  getNewRegistration() {
    this.subscription.add(
      this.formService.getNewRegistration().subscribe((value: boolean) => {
        this.formValue = {};
        this.formValid = false;
        this.showError = false;
        this.isPreValidate = false;
      })
    )
  }
}
