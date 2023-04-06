import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css'],
})
export class ButtonToggleComponent {
  @Input() isDisabled = false;
  @Input() isResetingToggle = false;

  @Output() statusToggle = new EventEmitter<string>();

  public toggleValue = 'All';

  public setToggleValue(value: string) {
    this.statusToggle.emit(value);
    this.toggleValue = value;
  }

  getToggleValue() {
    if (this.isResetingToggle || this.isDisabled) this.toggleValue = 'All';

    return this.toggleValue;
  }
}
