import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-views',
  standalone: true,
  templateUrl: './product-views.component.html',
  styleUrl: './product-views.component.scss',
  imports: [HeaderComponent]
})

export class ProductViewsComponent {

  featuredProducts:any[] = [
    {id:1, price:"$2,94,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertySale.png"},
    {id:2, price:"$3,00,000", title:"Tourch Light", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertySale.png"},
    {id:3, price:"$4,000", title:"Test Cards etc", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"vahicel.png"},
    {id:4, price:"$2,94,000", title:"Best Products", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"bike.png"},
    {id:5, price:"$9,000", title:"Working ON It", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertyRent.png"},
    {id:6, price:"$84,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"electronics.png"},
    {id:7, price:"$24,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"service.png"},
    {id:8, price:"$29,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"jobs.png"},
    {id:9, price:"$20,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"animals.png"},
    {id:10, price:"$2,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"furniture.png"},
    {id:11, price:"$8,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"fashion.png"},
    {id:12, price:"$10,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"kids.png"},
  ];
  auctionProduct:any[] = [
    {id:1, price:"$2,94,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertySale.png"},
    {id:2, price:"$3,00,000", title:"Tourch Light", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertySale.png"},
    {id:3, price:"$4,000", title:"Test Cards etc", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"vahicel.png"},
    {id:4, price:"$2,94,000", title:"Best Products", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"bike.png"},
    {id:5, price:"$9,000", title:"Working ON It", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"propertyRent.png"},
    {id:6, price:"$84,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"electronics.png"},
    {id:7, price:"$24,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"service.png"},
    {id:8, price:"$29,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"jobs.png"},
    {id:9, price:"$20,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"animals.png"},
    {id:10, price:"$2,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"furniture.png"},
    {id:11, price:"$8,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"fashion.png"},
    {id:12, price:"$10,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. San", imageName:"kids.png"},
  ]
  productType:string="";
constructor(
  private route: ActivatedRoute
){}
  ngOnInit(){
    debugger
    // this.productType = this.route.snapshot.paramMap.get('type')!;
    // console.log(this.productType)
  }
}
