import { Component, OnInit } from '@angular/core';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { StripeServiceService } from '../../services/stripe-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  loading = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;
  handler:any = null;
  jSonAttributes: any;
  jSonCard: any;
  client_ip: any;
  email: any;
  id: any;
  livemode: any;
  object: any;
  type: any;
  used: any;
  brand: any;
  country: any;
  last4: any;

  constructor(private stripeService: StripeServiceService) {}
  async ngOnInit() {
    this.stripe = this.stripeService.getStripe();
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PZehdRp8Vcq4D6bi1HEniPgkPluHHZftNgeONrtcYRrsR0bs4GN6xSEnrBzE76rze7bTA63a3KecIwnO28ebJnJ00lTSTShq9',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PZehdRp8Vcq4D6bi1HEniPgkPluHHZftNgeONrtcYRrsR0bs4GN6xSEnrBzE76rze7bTA63a3KecIwnO28ebJnJ00lTSTShq9',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            this.processPayment(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  // async handleForm(event: Event) {
  //   event.preventDefault();
  //   this.loading = true;
  //   this.errorMessage = null;
  //   this.successMessage = null;

  //   if (this.stripe && this.card) {
  //     const { token, error } = await this.stripe.createToken(this.card);
  //     if (error) {
  //       // Handle error
  //       console.error(error);
  //       // this.errorMessage = error.message;
  //       // document.getElementById('card-errors').textContent = error.message;
  //     } else {
  //       // Send token to server
  //       this.processPayment(token);
  //     }
  //   }
  //   this.loading = false;
  // }

  async processPayment(token: any) {
    try {
      const response: any = await this.stripeService.processPayment(token, 10).toPromise();
      this.successMessage = 'Payment successful!';
    } catch (error) {
      console.error('Payment failed:', error);
      this.errorMessage = 'Payment failed. Please try again.';
    }
    // Send token to your server for processing payment
    console.log('Token:', token);
  }
  attribute(){
    // if (this.selectedCategoryId == "Mobiles") {
      const jsonData = {
        card:this.jSonCard,
        client_ip:this.client_ip,
        email:this.email,
        id:this.id,
        livemode:this.livemode,
        object:this.object,
        type:this.type,
        used:this.used,
      };
      this.jSonAttributes = JSON.stringify(jsonData);
    // }
  }
  jSonCardAttributed(){
    this.jSonCard = {
      brand:this.brand,
      country:this.country,
      last4:this.last4,

    }
  }
}
