import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-carousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './related-carousel.component.html',
  styleUrl: './related-carousel.component.scss'
})
export class RelatedCarouselComponent {
  showAll:boolean = false;
  @Input() productList:any = []
  images = [
    'assets/images/map.png',
    'assets/images/email-img.png',
    'assets/images/map.png',
    'assets/images/email-img.png',
    'assets/images/map.png',
    'assets/images/email-img.png'
  ];
  currentIndex = 0;
  visibleImages: string[] = [];


  getVisibleItems() {
    let endIndex = this.currentIndex + 4;
    if (endIndex > this.items.length) {
      endIndex = this.items.length;
    }
    return this.items.slice(this.currentIndex, endIndex);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - 4;
    }
  }

  nextImage() {
    if (this.currentIndex < this.items.length - 4) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  items:any
  // = [
  //   // {id:1, price:"$2,94,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:2, price:"$3,00,000", title:"Tourch Light", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  //   // {id:3, price:"$4,000", title:"Test Cards etc", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:4, price:"$2,94,000", title:"Best Products", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  //   // {id:5, price:"$9,000", title:"Working ON It", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:6, price:"$84,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  //   // {id:7, price:"$24,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:8, price:"$29,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  //   // {id:9, price:"$20,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:10, price:"$2,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  //   // {id:11, price:"$8,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"car-img.png"},
  //   // {id:12, price:"$10,000", title:"HYUNDAI GRAND | 10 1.3 CRDI", year:"2024", km:"2452Km", petrol:"Petrol", location:"2972 Westheimer Rd. Santa Ana, Illinois 85486", imageName:"house-img.png"},
  // ]

  ngOnInit():void{
    this.items = this.productList
    console.log('reladed ads', this.items)
  }
}
