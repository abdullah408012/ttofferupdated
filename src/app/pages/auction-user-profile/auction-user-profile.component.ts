import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';

@Component({
    selector: 'app-auction-user-profile',
    standalone: true,
    templateUrl: './auction-user-profile.component.html',
    styleUrl: './auction-user-profile.component.scss',
    imports: [HeaderComponent, FooterComponent, NgFor, NgIf]
})
export class AuctionUserProfileComponent {
    activeTab: string = 'products';

    setActiveTab(tab: string) {
        this.activeTab = tab;
      }
    products: any [] =[
        // {img:'assets/images/product1.svg', name:'Modern light clothes',detail:'Sold'},
        // {img:'assets/images/product1.svg', name:'Modern light clothes',detail:'Sold'},
        // {img:'assets/images/product1.svg', name:'Modern light clothes',detail:'Sold'},
        // {img:'assets/images/product1.svg', name:'Modern light clothes',detail:'Sold'},
        // {img:'assets/images/product1.svg', name:'Modern light clothes',detail:'Sold'},
    ]
    reviews: any [] =[
        {img:'assets/images/reviewProfile1.svg', name:'Anthony Stark', starImg:'assets/images/stars.png', detail:'Excellent quality, fast shipping, and great customer service. Highly recommend this product for everyone.'},
        {img:'assets/images/reviewProfile1.svg', name:'Anthony Stark', starImg:'assets/images/stars.png', detail:'Excellent quality, fast shipping, and great customer service. Highly recommend this product for everyone.'},
        {img:'assets/images/reviewProfile1.svg', name:'Anthony Stark', starImg:'assets/images/stars.png', detail:'Excellent quality, fast shipping, and great customer service. Highly recommend this product for everyone.'},
        {img:'assets/images/reviewProfile1.svg', name:'Anthony Stark', starImg:'assets/images/stars.png', detail:'Excellent quality, fast shipping, and great customer service. Highly recommend this product for everyone.'},
    ]

    reportUser: any [] = [
        {id: 'flexRadioDefault1', content1: 'Inappropriate profile picture'},
        {id: 'flexRadioDefault1', content1: 'The User is threatening me'},
        {id: 'flexRadioDefault1', content1: 'The User is Insulting me'},
        {id: 'flexRadioDefault1', content1: 'Spam'},
        {id: 'flexRadioDefault1', content1: 'Fraud'},
        {id: 'flexRadioDefault1', content1: 'Other'},
    ]

    isDropdownOpen = false;
    currentUserid:number = 0;
    auctionUserList:any;
    auctionUserId:any;

    constructor(
      private route: ActivatedRoute,
      private mainServices: MainServicesService,
      private extension: Extension,
    ){
      this.currentUserid = extension.getUserId()
    }
    ngOnInit():void{
      this.auctionUserId = this.route.snapshot.paramMap.get('id')!;
      this.getAuctionUser()
      // this.getSelling()
      // this.getAllChatsOfUser()
    }
    getAuctionUser(){
      this.mainServices.getUserInfo(this.auctionUserId).subscribe((res:any) =>{
        this.auctionUserList = res.data
        console.log(this.auctionUserList);
      })

    }
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    openModal() {
        const modal = document.getElementById('reportUserModal');
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
        const modal = document.getElementById('reportUserModal');
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

}
