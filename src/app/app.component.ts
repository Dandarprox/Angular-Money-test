import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  originalValue = '';
  moneyInput = new FormControl('', [
    this.decimalValidator() as any
  ]);

  private moneyFormatter = new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 2,
    }
  );

  onInput(event: Event) {
    console.log({ event })

    const { data, target } = event as unknown as { data: string | null, target: { value: string } };

    if (target.value === "") {
      this.originalValue = "";
    }

    if (data) {
      this.originalValue += data;
    } else {
      this.originalValue = this.originalValue.substring(0, this.originalValue.length - 1);
    }

    this.moneyInput.setValue(this.originalValue);
  }

  get visualRep(): string {
    if (Number.isNaN(this.originalValue) || this.originalValue === "") {
      return "";
    }

    if (/[a-z]+/g.test(this.originalValue)) {
      return this.originalValue;
    }

    return this.moneyFormatter.format(parseFloat(this.originalValue));
  }

  decimalValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const valid = /^\d+(\.\d{0,2})?$/.test(control.value);
      console.log({ v: control.value })
      return valid ? null : { 'invalidDecimal': { value: control.value } };
    };
  }
}
