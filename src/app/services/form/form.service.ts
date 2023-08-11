import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ErrorMessage } from 'src/app/models/error-message';
import { RecapMessage } from 'src/app/models/recap-message';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private isDisabled$: Subject<boolean> = new Subject<boolean>();
  private formError$: Subject<ErrorMessage[]> = new Subject<ErrorMessage[]>();
  private recap$: Subject<RecapMessage> = new Subject<RecapMessage>();
  private newRegistration$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setFormIsDisabled(status: boolean): void {
    this.isDisabled$.next(status);
  }
  
  getFormIsDisabled(): Observable<boolean> {
    return this.isDisabled$;
  }

  setNewRegistration(status: boolean): void {
    this.newRegistration$.next(status);
  }
  
  getNewRegistration(): Observable<boolean> {
    return this.newRegistration$;
  }

  setFormError(value: ErrorMessage[]): void {
    this.formError$.next(value);
  }
  
  getFormError(): Observable<ErrorMessage[]> {
    return this.formError$;
  }

  addError(value: any): ErrorMessage[] {
    let errors: ErrorMessage[] = [];
    const isEmpty = Object.keys(value).length === 0 ;
    if (isEmpty || value['fName'] == '') errors.push({message: 'Prénom obligatoire'});
    if (isEmpty || value['lName'] == '') errors.push({message: 'Nom obligatoire'});
    if (isEmpty || value['email'] == '') errors.push({message: 'Email obligatoire'});
    const pattern = (/\S+@\S+\.\S+/);
    if (value['email'] != '' && !pattern.test(value['email'])) errors.push({message: 'Email non valide'});
    if (isEmpty || value['institut'] == '') errors.push({message: 'Institution d\'origine obligatoire'});
    if (isEmpty || value['address'] == '') errors.push({message: 'Address obligatoire'});
    if (isEmpty || value['country'] == '') errors.push({message: 'Pays obligatoire'});
    if (isEmpty || value['postalCode'] == '') errors.push({message: 'Code postal obligatoire'});
    if (isEmpty || value['city'] == '') errors.push({message: 'Ville obligatoire'});
    if (isEmpty || value['registration'] == '') errors.push({message: 'Formulaire d\'inscription obligatoire'});
    if (isEmpty || value['hosting'] == '') errors.push({message: 'Formulaire d\'hébergement obligatoire'});

    return errors;
  }

  setRecap(value: RecapMessage): void {
    this.recap$.next(value);
  }
  
  getRecap(): Observable<RecapMessage> {
    return this.recap$;
  }
}
