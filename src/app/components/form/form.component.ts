import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, filter } from 'rxjs';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() formValue = new EventEmitter<any>();
  @Output() formValid = new EventEmitter<boolean>();
  public form!: FormGroup;
  private subscription = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formValueChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.form = this.formBuilder.group(
      {
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        gender: ['men', Validators.required],
        institut: ['', Validators.required],
        address: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        personalWeb: '',
        institutWeb: '',
        registration: ['', Validators.required],
        hosting: ['', Validators.required],
      }
    )
  }

  formValueChange(): void {
    this.form.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: any) => {
      this.formValue.emit(value);
      this.formValid.emit(this.form.valid);
    })
  }

  public isDisabled: boolean = false;
  getFormIsDisabled(): void {
    this.subscription.add(
      this.formService.getFormIsDisabled().pipe(
        filter(value => value != undefined && value != null)
      ).subscribe((value: boolean) => {
        this.isDisabled = value
      })
    )
  }
}
