import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MainServicesService } from '../../services/main-services.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { Extension } from '../../helper/common/extension/extension';



// imports: [],
// templateUrl: './body.component.html',

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  imports: [HeaderComponent, FooterComponent, NgFor, ProductCarouselComponent,  NgIf]
})
export class BodyComponent {
  showText:string = 'Crypto Market';
  firstRowItems =  [
    { imgSrc: '/assets/catImage/mobile.png', title: 'Mobile', id: 1 },
    { imgSrc: '/assets/catImage/propertySale.png', title: 'Property For Sale', id: 2 },
    { imgSrc: '/assets/catImage/vahicel.png', title: 'Vahicels',id: 3 },
    { imgSrc: '/assets/catImage/propertyRent.png', title: 'Property for Rent',id: 4 },
    { imgSrc: '/assets/catImage/electronics.png', title: 'Electronic & Appliances',id: 5 },
    { imgSrc: '/assets/catImage/bike.png', title: 'Bikes',id: 6 },
    { imgSrc: '/assets/catImage/jobs.png', title: 'Jobs',id: 7 },
    { imgSrc: '/assets/catImage/service.png', title: 'Services',id: 8 },
    { imgSrc: '/assets/catImage/animals.png', title: 'Animals',id: 9 },
    { imgSrc: '/assets/catImage/furniture.png', title: 'Furniture & Home',id: 10 },
    { imgSrc: '/assets/catImage/fashion.png', title: 'Fashion & Beauty', id: 11 },
    { imgSrc: '/assets/catImage/kids.png', title: 'Kids', id: 12},
    { imgSrc: '/assets/catImage/bit-coin.png', title: 'Crypto Market', subTitle:'Coming Soon'}
  ];

  image: any
  featuredProducts: any[] = [
    // { id: 1, price: "$2,94,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 2, price: "$3,00,000", title: "Tourch Light", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 3, price: "$4,000", title: "Test Cards etc", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 4, price: "$2,94,000", title: "Best Products", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 5, price: "$9,000", title: "Working ON It", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 6, price: "$84,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 7, price: "$24,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 8, price: "$29,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 9, price: "$20,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 10, price: "$2,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 11, price: "$8,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 12, price: "$10,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
  ];
  auctionProduct: any[] = [
    // { id: 1, price: "$2,94,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 2, price: "$3,00,000", title: "Tourch Light", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 3, price: "$4,000", title: "Test Cards etc", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 4, price: "$2,94,000", title: "Best Products", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 5, price: "$9,000", title: "Working ON It", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 6, price: "$84,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 7, price: "$24,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 8, price: "$29,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 9, price: "$20,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 10, price: "$2,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
    // { id: 11, price: "$8,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "car-img.png" },
    // { id: 12, price: "$10,000", title: "HYUNDAI GRAND | 10 1.3 CRDI", year: "2024", km: "2452Km", petrol: "Petrol", location: "2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName: "house-img.png" },
  ]

  showAll: boolean = false;
  currentUserId : number = 0;
  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
  ) {
    this.currentUserId = this.extension.getUserId()
   }
  ngOnInit(){
    if (this.currentUserId>0) {
      this.getFeatcherdProduct();
      this.getAuctionProduct();
      // this.firstRowItems = this.firstRowItems
    }
  }
  getFeatcherdProduct() {
    this.mainServices.getFeatureProduct().subscribe(res =>{
      this.featuredProducts = res.data
      console.log(this.featuredProducts)
    },
    (error) => {
      if (error.status === 401) {
        // console.error('Unauthorized access. Redirecting to login...');
      } else {
        // console.error('Error fetching feature product:', error);
      }
    })
  }
  toggleView(): void {
    this.showAll = !this.showAll;
  }
  getDisplayedItems() {
    return this.showAll ? this.auctionProduct : this.auctionProduct.slice(0, 8);
  }
  getDisplayedFeatured() {
    return this.showAll ? this.featuredProducts : this.featuredProducts.slice(0, 8);
  }
  getBidNow() {
    // return
  }
  getAuctionProduct(){
    debugger
    this.mainServices.getAuctionProduct().subscribe(res =>{
      debugger
      this.auctionProduct = res.data
      console.log(this.auctionProduct)
    })
  }
  addWishLst(item:any){
    ;
    let input = {
      user_id:this.currentUserId,
      product_id:item.id
    }
    this.mainServices.addWishList(input).subscribe((res:any) =>{
      ;
      this.getFeatcherdProduct();
      this.getAuctionProduct();
    })
  } 
  removeWishLst(item:any){
    
    let input = {
      id:item.id
    }
    this.mainServices.removeWishList(input).subscribe((res:any) =>{
      
      res
      this.getFeatcherdProduct();
      this.getAuctionProduct();
    })
  }
}
