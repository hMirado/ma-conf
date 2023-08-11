import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecapMessage } from 'src/app/models/recap-message';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit, OnDestroy {
  @Output() enable = new EventEmitter<boolean>();
  public recap: RecapMessage|null = null;
  private subscription = new Subscription();

  constructor(
    private formService: FormService
  ) {

  }

  ngOnInit(): void {
    this.getRecap();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRecap(): void {
    this.subscription.add(
      this.formService.getRecap().subscribe((value: RecapMessage) => this.recap = value)
    )
  }

  newRegistration() {
    this.recap = null;
    this.formService.setNewRegistration(true);
    alert('Votre inscription a été confirmée.')
  }

  updateData(): void {
    this.recap = null;
    this.formService.setFormIsDisabled(false);
    this.enable.emit(true);
  }
}
