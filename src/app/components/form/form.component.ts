import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        gender: [0, Validators.required],
        institut: ['', Validators.required],
        adress: ['', Validators.required],
        pays: ['', Validators.required],
        postalCode: ['', Validators.required],
        personalWeb: ['', Validators.required],
        institutWeb: ['', Validators.required],
        inscription: ['', Validators.required],
        hebergement: ['', Validators.required],
      }
    )
  }
}
