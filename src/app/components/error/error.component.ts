import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/models/error-message';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public errors: ErrorMessage[] = [];
  private subscription = new Subscription()

  constructor(
    private formService: FormService
  ) {

  }

  ngOnInit(): void {
    this.getError();
  }

  getError(): void {
    this.subscription.add(
      this.formService.getFormError().subscribe((value: ErrorMessage[]) => {
        this.errors = value
        console.log(value);
        
      })
    )
  }
}
