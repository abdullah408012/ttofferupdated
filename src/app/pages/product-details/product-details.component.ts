import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { ProductCarouselComponent } from "../carousels/product-carousel/product-carousel.component";
import { RelatedCarouselComponent } from "../carousels/related-carousel/related-carousel.component";
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-product-details',
    standalone: true,
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss',
    imports: [
      HeaderComponent, 
      FooterComponent, 
      ProductCarouselComponent, 
      RelatedCarouselComponent, 
      NgIf, 
      FormsModule, 
      GoogleMapsModule,
      CommonModule
    ]
})
export class ProductDetailsComponent {
  productId:any;
  // auctionProduct: any[] = [];
  featuredProducts: any[] = []
  featuredProductsTemp: any[] = []
  currentUserid: number = 0
  offerPrice: number = 0;
  center!: google.maps.LatLngLiteral;
  zoom = 4;
  parsedAttributes:any
  attributesObject:any
  constructor(
    private route: ActivatedRoute,
    private mainServices: MainServicesService,
    private extension: Extension,
  ){
    this.currentUserid = extension.getUserId()
  }
  ngOnInit(){
    this.productId = this.route.snapshot.paramMap.get('id')!;
    // this.getAuctionProduct();
    this.getCurrentLocation();
    this.getFeatcherdProduct();
    this.loadMap();
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    } else {
      // Browser doesn't support Geolocation
      console.error("Browser doesn't support geolocation.");
    }
  }
  getUserId() {
    
    const jsonStringGetData = localStorage.getItem('key');
    if (jsonStringGetData) {
      const user = JSON.parse(jsonStringGetData);
      this.currentUserid = user.id;
    }
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
      // getAuctionProduct(){
      //   
      //   this.mainServices.getAuctionProduct().subscribe(res =>{
      //     
      //     this.auctionProduct = res.data
      //     // this.auctionProduct.filter(item => this.auctionProduct.includes(this.productId))
      //     // console.log(this.auctionProduct)
      //     this.auctionProduct = this.auctionProduct.filter((item) => {
      //       return item.id == this.productId;
      //   });
      //   console.log(this.auctionProduct)
      //   })
      // }
      
    makeOffer(){
      
      let input = {
        product_id: this.productId,
        seller_id: this.featuredProducts[0].user.id,
        buyer_id:this.currentUserid ,
        offer_price:this.offerPrice,
      }
      this.mainServices.makeOffer(input).subscribe(res =>{
        
        res
      });
    }
    getFeatcherdProduct() {
      this.mainServices.getFeatureProduct().subscribe(res =>{
        this.featuredProducts = res.data
        this.featuredProductsTemp = res.data
        this.featuredProducts = this.featuredProducts.filter((item) => {
          return item.id == this.productId;
        });
        this.attributesObject = JSON.parse(this.featuredProducts[0].attributes);
        this.parsedAttributes = JSON.parse(this.attributesObject.attributes);
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

  loadMap(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.6895, 139.6917),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapProperties);
  }
  addWishLst(item:any){
    ;
    let input = {
      user_id:this.currentUserid,
      product_id:item.id
    }
    this.mainServices.addWishList(input).subscribe((res:any) =>{
      ;
      this.getFeatcherdProduct();
      res
    })
  }
  removeWishLst(item:any){
    
    let input = {
      id:item.id
    }
    this.mainServices.removeWishList(input).subscribe((res:any) =>{
      
      res
      this.getFeatcherdProduct();
    })
  }
}
