import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainServicesService } from '../../services/main-services.service';
import { BodyComponent } from '../body/body.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../notification/notification.component";
import { routes } from '../../app.routes';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        NgIf,
        FormsModule,
        NgFor,
        CommonModule,
        NotificationComponent,
        RouterModule
    ]
})

export class HeaderComponent {
  @ViewChild('inputFields')
  inputFields: ElementRef[] = [];
  showEmailBox: boolean = false;
  showMainBox: boolean = false;
  showRegisterBox: boolean = false;
  showForgotBox: boolean = false;
  showForgotPhoneBox: boolean = false;
  showOTPBox: boolean = false;
  showPhoneBox: boolean = false;
  isMobileMenuOpen = false;
  isMoreMenuOpen = false;
  featuredProducts: any;
  image: any
  showCarousel: boolean = true;
  showBanner: boolean = true;
  hideHeader: boolean = true;
  email: string = '';
  phone: string = '';
  password: string = '';
  otp: string[] = ['', '', '', '', '', ''];
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  emailOrPhone: string = '';
  confirmPassword: string = '';
  openMenu: boolean = false;
  currentUser: any = [];
  imgUrl: any;
  onlineCount: number = 0;
  dropdownVisible = false;
  private intervalId: any;

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateOnlineCount() {
    this.onlineCount = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {
    this.userInfo()
    this.updateOnlineCount();
    this.intervalId = setInterval(() => this.updateOnlineCount(), 100000);
  }
  toggleDropdown1() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  onSubmit() {
    if (this.phone && this.password) {
      console.log('Phone:', this.phone);
      console.log('Password:', this.password);
    }
  }

  openMobileMenu() {
    this.openMenu = !this.openMenu
  }

  resetForm() {
    this.email = '';
    this.phone = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.emailOrPhone = '';
    this.confirmPassword = '';

  }

  isOTPComplete(): boolean {
    return this.otp.every(value => value.trim() !== '');
  }

  verifyOTP() {
    if (this.isOTPComplete()) {
      console.log('OTP:', this.otp.join(''));
    }
  }

  focusNextInput(index: number) {
    if (index < this.otp.length - 1 && this.otp[index].trim() !== '') {
      this.inputFields[index + 1].nativeElement.focus();
    }
  }



  signIn() {
    if (this.isFormValid()) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }

  ValidFor(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.emailOrPhone.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.confirmPassword == this.password
    )
  }

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' && this.password.trim() !== ''

    );
  }

  confirmRegistration() {
    let input = {
      name: this.firstName + this.lastName,
      username: this.username,
      email: this.emailOrPhone,
      password: this.password
    }
    this.mainServices.getSignUp(input).subscribe(res => {
      res
    })
  }

  constructor(
    private router: Router, private mainServices: MainServicesService) {
    this.inputFields = new Array(6);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  checkRoute(url: string): void {
    if (url === '/productDetails') {
      this.showCarousel = false;
    }
    else if (url === '/profilePage') {
      this.showBanner = false;
      this.showCarousel = false;
      this.hideHeader = false;
    }
    else if (url === '/chatBox') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/selling') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/whoBoughtAd') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/reviewPage') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/auctionProduct') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else if (url === '/auctionUserProfile') {
      this.showBanner = false;
      this.showCarousel = false;
    }
    else {
      this.showBanner = true;
      this.showCarousel = true;
      this.hideHeader = true;
    }
  }



  getAuth() {
    let input = {
      email: this.email,
      password: this.password
    }
    this.mainServices.getAuthByLogin(input).subscribe(res => {
      res
      localStorage.setItem('authToken', res.data.token);
      const jsonString = JSON.stringify(res.data.user);
      localStorage.setItem("key", jsonString);
      const jsonStringGetData = localStorage.getItem('key');
      this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
    })
  }
  openEmail() {
    this.showEmailBox = true
  }
  openRegister() {
    this.showRegisterBox = true
  }
  openOTP() {
    this.showOTPBox = true
    this.showForgotPhoneBox = false
    this.showForgotBox = false
  }
  openForgot() {
    this.showForgotPhoneBox = true
    this.showPhoneBox = false
  }
  openForgotEmail() {
    this.showForgotBox = true
    this.showEmailBox = false
  }
  back() {
  }
  openPhone() {
    this.showPhoneBox = true
  }
  openModal() {
    const modal = document.getElementById('loginModal');
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
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeAttribute('aria-modal');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      this.showEmailBox = false;
      this.showMainBox = false;
      this.showRegisterBox = false;
      this.showPhoneBox = false;
      this.showForgotBox = false;
      this.showOTPBox = false;

      if (backdrop) {
        document.body.removeChild(backdrop);
      }
      this.resetForm();

    }
  }
  userInfo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      this.currentUser = jsonStringGetData ? JSON.parse(jsonStringGetData) : [];
      this.imgUrl = this.currentUser.img;
    } else {
      this.currentUser = [];
      this.imgUrl = null;
      console.warn('localStorage is not available.');
    }
  }
  signInWithEmail() {
    if (this.isFormValid()) {
      this.getAuth();
    }
  }
  logout(){
    // localStorage.clear();
  }
}
