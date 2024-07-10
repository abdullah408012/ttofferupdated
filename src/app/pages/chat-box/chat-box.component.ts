import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';

@Component({
    selector: 'app-chat-box',
    standalone: true,
    templateUrl: './chat-box.component.html',
    styleUrl: './chat-box.component.scss',
    imports: [HeaderComponent, NgFor, CommonModule, ReactiveFormsModule]
})
export class ChatBoxComponent {
  @ViewChild('selectedUserDiv')
  selectedUserDiv!: ElementRef;
  chatBox: any[]= [
    // {img:'assets/images/chat-profile1.png', name:'Elmer Laverty', text:'Haha oh man 🔥', time:'12m'},
    // {img:'assets/images/chat-profile2.png', name:'Florencio Dorrance', text:'woohoooo', time:'24m'},
    // {img:'assets/images/chat-profile3.png', name:'Lavern Laboy', text:`Haha that's terrifying 😂`, time:'1h'},
    // {img:'assets/images/chat-profile4.png', name:'Titus Kitamura', text:'omg, this is amazing', time:'5h'},
  ]
  selectedUser: any = null;
  selectedConversation: any = [];
  conversationBox: any = [];
  currentUserid: number = 0;
  message: any;
  productId: number = 0 
  sellerId: number = 0
  buyerId: number = 0
  offerId: number = 0
  constructor(
    private mainServices: MainServicesService,
    private extension:Extension,
  ){
    this.currentUserid = extension.getUserId();
  }

  selectUser(user: any) {
    this.selectedUser = user;
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

  messageControl = new FormControl();
  suggestions: string[] = [
    'Still available?',
    'I am interested.',
    'What’s your final price?',
    'Where can I meet you?',
    'I want to buy!'
  ];
  suggestionsVisible: boolean = false;

  showSuggestions() {
    this.suggestionsVisible = true;
  }

  hideSuggestions() {
    setTimeout(() => {
      this.suggestionsVisible = false;
    }, 200); // Delay to allow click event to register
  }

  selectSuggestion(suggestion: string) {
    this.messageControl.setValue(suggestion);
    this.suggestionsVisible = false;
  }
  ngOnInit(){
  this.getAllChatsOfUser();  
  }
  getAllChatsOfUser = () => {
    this.mainServices.getAllChatsOfUser(this.currentUserid).subscribe((res:any) =>{
      this.chatBox = res.data
      console.log(this.chatBox)
    });
  }
  getMinutesDifference(updatedAt: string): number {
    const updatedAtDate = new Date(updatedAt);
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime.getTime() - updatedAtDate.getTime()); // Difference in milliseconds
    return Math.floor(timeDifference / (1000 * 60)); // Convert to minutes
  }
  getConversation(data:any){
    this.mainServices.getConversation(data.conversation_id).subscribe((res:any) =>{
      this.selectedConversation = res;
      this.selectUser(res.data.Participant2)
      console.log(res)
      console.log(res.data.conversation)
      this.conversationBox = res.data.conversation
      this.productId = this.conversationBox[0].product_id;
      this.sellerId = this.conversationBox[0].sender_id;
      this.buyerId  = this.conversationBox[0].receiver_id;
      this.offerId  = this.conversationBox[0].offer_id;
    })
  }
  sendMsg(){
    let input = {
      sender_id: this.selectedConversation.data.Participant1.id,
      receiver_id: this.selectedConversation.data.Participant2.id,
      message: this.message,
    }
    this.mainServices.sendMsg(input).subscribe((res:any) =>{
      
      this.message = "";
      this.getConversation(res.conversation_id)
    })
  }
  acceptOffer(){
    
    let input = {
      product_id: this.productId,
      seller_id:this.sellerId,
      buyer_id:this.buyerId,
      offer_id:this.offerId
    }
    this.mainServices.acceptOffer(input).subscribe(res => {
      
      res
      console.log(res)
    });
  }
  
  rejectOffer(){
    
    let input = {
      product_id: this.productId,
      seller_id:this.sellerId,
      buyer_id:this.buyerId,
      offer_id:this.offerId
    }
    this.mainServices.rejectOffer(input).subscribe(res => {
      
      res
    });
  }
}
