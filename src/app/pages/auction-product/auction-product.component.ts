import { Component } from '@angular/core';
import { RelatedCarouselComponent } from "../carousels/related-carousel/related-carousel.component";
import { FooterComponent } from "../footer/footer.component";
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-product',
  standalone: true,
  templateUrl: './auction-product.component.html',
  styleUrl: './auction-product.component.scss',
  imports: [
    RelatedCarouselComponent,
    FooterComponent,
    NgIf,
    ProductCarouselComponent,
    HeaderComponent,
    NgFor,
    CommonModule,
    FormsModule
  ]
})
export class AuctionProductComponent {
  showBid: boolean = false;

  profileImg: any[] = [
    { elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' }
  ]

  liveAuction: any[] = [
    // {elipsImg:'assets/images/liveProfile1.svg', name:'Ronald Richards', time:'20s',price:'$24.5k'},
    // {elipsImg:'assets/images/liveProfile2.svg',name:'Cameron Williamson', time:'1m', price:'$20k'},
    // {elipsImg:'assets/images/liveProfile3.svg', name:'Guy Hawkins', time:'5m', price:'$15k'},
    // {elipsImg:'assets/images/liveProfile4.svg',name:'Darrell Steward', time:'7m',price:'$12.5k'},
    // {elipsImg:'assets/images/liveProfile5.svg',name:'Wade Warren', time:'10m', price:'$10k'}
  ]
  productId: any;
  auctionProduct: any[] = [];
  auctionProductTemp: any[] = [];
  // featuredProducts: any[] = []
  currentUserid: number = 0
  offerPrice: number = 0;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  price: any
  bidlist: any[] = [];
  maxPrice:number = 0
  constructor(
    private route: ActivatedRoute,
    private mainServices: MainServicesService,
    private extension: Extension,
  ) {
    this.currentUserid = extension.getUserId()
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getAuctionProduct();
    this.getBid();
  }
  getUserId() {
    const jsonStringGetData = localStorage.getItem('key');
    if (jsonStringGetData) {
      const user = JSON.parse(jsonStringGetData);
      this.currentUserid = user.id;
    }
  }
  showInput() {
    this.showBid = !this.showBid
  }

  openModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  closeModal() {
    const modal = document.getElementById('offerModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }

  getAuctionProduct() {
    this.mainServices.getAuctionProduct().subscribe(res => {
      this.auctionProduct = res.data
      this.auctionProductTemp = res.data
      this.auctionProduct = this.auctionProduct.filter((item) => {
        return item.id == this.productId;
      });
      this.auctionProduct = this.auctionProduct.map((item) => {
        let remainingDays = null;
        if (item.starting_date && item.ending_date) {
          const startDate = new Date(item.starting_date);
          const endDate = new Date(item.ending_date);
          const timeDiff = endDate.getDate() - startDate.getDate();
          remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        }
        return {
          ...item,
          remainingDays: remainingDays
        };
      });
  
      console.log(this.auctionProduct)
    })
  }
  placeBid() {
    if (this.price<this.maxPrice) {
      return
    }
    let input = {
      user_id: this.currentUserid,
      product_id: this.productId,
      price: this.price
    }
    this.mainServices.placeBid(input).subscribe(res => {
      res
      this.getBid();
      console.log(res)
    })
  }
  getBid() {
    let input = {
      product_id: this.productId,
    }
    this.mainServices.getPlacedBids(input).subscribe((res: any) => {
      this.liveAuction = res.data
      this.profileImg = res.data.user
      console.log('live auction', this.liveAuction)
      if (this.liveAuction && this.liveAuction.length > 0) {
        const prices = this.liveAuction.map((item) => item.price);
        this.maxPrice = Math.max(...prices);
        // console.log('Max price', maxPrice);
      }
    })
  }
  bid26() {
    this.price = "26000"
  }
  bid28() {
    this.price = "28000"
  }
  bid32() {
    this.price = "32000"
  }
  bid35() {
    this.price = "35000"
  }
}
