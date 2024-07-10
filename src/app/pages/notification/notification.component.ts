import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notify: any [] = [
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
    {img:'assets/images/chat-profile1.png', heading1:'You have got a new', heading2:'message from wasif ali', heading3:'conversation',time:'31 min Ago'},
  ]
  notificationList:any
  currentUserId: number = 0
  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
  ){ 
    
    this.currentUserId = this.extension.getUserId();
  }
  ngOnInit():void{
    this.getNotification();
  }
  getNotification(){
    debugger
    this.mainServices.getNotification(this.currentUserId).subscribe((res:any) => {
      debugger
      this.notificationList = res.data
      console.log('Notification:', this.notificationList)
    })
  }
}
