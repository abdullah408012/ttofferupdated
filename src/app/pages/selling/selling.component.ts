import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';

@Component({
    selector: 'app-selling',
    standalone: true,
    templateUrl: './selling.component.html',
    styleUrl: './selling.component.scss',
    imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent]
})
export class SellingComponent {
  showPerformance:boolean = false;
  sellingId:any;
  currentUserid:number = 0;
  sellingList: any = [];
  whoBouthList:any;
  // chatBox: any[]= [
  //   // {img:'assets/images/chat-profile1.png', name:'Elmer Laverty', text:'Haha oh man 🔥', time:'12m'},
  //   // {img:'assets/images/chat-profile2.png', name:'Florencio Dorrance', text:'woohoooo', time:'24m'},
  //   // {img:'assets/images/chat-profile3.png', name:'Lavern Laboy', text:`Haha that's terrifying 😂`, time:'1h'},
  //   // {img:'assets/images/chat-profile4.png', name:'Titus Kitamura', text:'omg, this is amazing', time:'5h'},
  // ]
  message:any [] = [
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
    // {img:'assets/images/profile-img.png', name:'Anthony (Web3.io)', text:'How are you today?', time:'9:54 AM'},
  ]
  constructor(
    private route: ActivatedRoute,
    private mainServices: MainServicesService,
    private extension: Extension,
  ){
    this.currentUserid = extension.getUserId()
  }
  ngOnInit():void{
    this.sellingId = this.route.snapshot.paramMap.get('id')!;
    this.getSelling();
    this.getAllChatsOfUser();
    this.whoBought();
  }
  openTab(){
    this.showPerformance = !this.showPerformance
  }
  getSelling() {
    ;
    this.mainServices.getSelling().subscribe((res:any) => {
      ;
      this.sellingList = res.data.selling
      this.sellingList = this.sellingList.filter((item:any) => {
        return item.id == this.sellingId;
      });
      console.log(this.sellingList)
    })
  }
  markAsSold(prodictId:any){
    console.log('sold out ', prodictId)
    this.mainServices.markAsSold(prodictId).subscribe(res =>{
       
      res
    })
  }
  getAllChatsOfUser = () => {
    
    this.mainServices.getAllChatsOfUser(this.currentUserid).subscribe((res:any) =>{
      this.message = res.data
      console.log(this.message)
    });
  }
  whoBought(){
    let input = {
      user_id: this.currentUserid
    }
    this.mainServices.whoBought(input).subscribe(res =>{
      debugger
      res
      this.whoBouthList = res
      console.log('who bought',this.whoBouthList)
    })
  }
}
