import { Component, OnInit, NgZone } from "@angular/core";

@Component({
  selector: "app-custom-form",
  templateUrl: "./custom-form.component.html",
  styleUrls: ["./custom-form.component.scss"]
})
export class CustomFormComponent implements OnInit {
  email: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;

  constructor(private _zone: NgZone) {}

  ngOnInit() {}

  getToken() {
    this.message = "Loading...";

    (<any>window).Stripe.card.createToken(
      {
        email: this.email,
        number: this.cardNumber,
        exp_month: this.expiryMonth,
        exp_year: this.expiryYear,
        cvc: this.cvc
      },
      (status: number, response: any) => {
        this._zone.run(() => {
          if (status === 200) {
            this.message = `Success! Card token ${response.card.id}.`;
          } else {
            this.message = response.error.message;
          }
        });
      }
    );
  }
}
