import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { SellingComponent } from "../selling/selling.component";
import { MainServicesService } from '../../services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { blob } from 'stream/consumers';
import { ReviewPageComponent } from '../review-page/review-page.component';
import { PaymentComponent } from '../payment/payment.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';

interface ImageSnippet {
  file: File | null;
  url: string | ArrayBuffer | null;
}
@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    NgFor,
    FooterComponent,
    SellingComponent,
    FormsModule,
    NgIf,
    RouterModule,
    NgFor,
    NotificationComponent,
    NgxDropzoneModule,
    ReviewPageComponent,
    PaymentComponent
  ]
})
export class ProfilePageComponent {
  progress!: number;
  showMore: boolean = false;
  selectedTab: string = 'purchasesSales';
  selectedTabItem: string = '';
  selectedTabId: any;
  activeButton: number = 1;
  showDiv: boolean = false;
  currentUserProfile: any;
  rating: number = 0; // Current rating
  maxRating: number = 5; // Maximum rating, default is 5
  ratingChange: any;
  imageUrl: string | ArrayBuffer | null = null;
  currentUserId: number = 0
  user_Id: number = 0
  title: string = "";
  description: string = "";
  // productImage:any = [];
  userImage: any;
  profilePhoto: File | null = null;
  selectedCategoryId: string = "Mobiles";
  pricingCatId: string = "";
  brandId: string = "";
  conditionId: string = "";
  storageId: string = "";
  colorId: string = "";
  typeId: string = "";
  bedRoomId: string = "";
  areaSizeId: string = "";
  yearBuiltId: string = "";
  feartureId: string = "";
  amenitiesId: string = "";
  makeAndModelId: string = "";
  yearId: string = "";
  price: string = "";
  mileage: string = "";
  fuelTypeId: string = "";
  engineCapacityId: string = "";
  subCategoriesId: string = "";
  modelId: string = "";
  jobtypeId: string = "";
  experienceId: string = "";
  educationId: string = "";
  salaryId: string = "";
  salaryPeriodId: string = "";
  companyNameId: string = "";
  positionTypeId: string = "";
  careerLevelId: string = "";
  carId: string = "";
  ageId: string = "";
  breedId: string = "";
  fashionTypeId: string = "";
  fabricId: string = "";
  suitTypeId: string = "";
  toyId: string = "";
  startingTime: string = "";
  endingTime: string = "";
  startingDate: Date | null = null;
  endingDate: Date | null = null;
  productId: number = 0;
  locationId: string = "";
  jSonAttributes: any;
  startingPrice: string = "";
  lowestPrice: string = "";
  defaultsImage: string = "assets/images/best-selling.png"
  public imagesFiles: File[] = [];
  filesabc!: File[];
  imageFilesAbc: File[] = [];
  videoFilesAbc: File[] = []
  showNotification: boolean = false
  notificationList:any
  customLink:any

  showNotif(){
    this.showNotification = true
  }
  rawData: any = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
  ]
  categories: any = [
    { id: 'Mobiles', name: 'Mobiles' },
    { id: 'Property for Sale', name: 'Property for Sale' },
    { id: 'Vehicles', name: 'Vehicles' },
    { id: 'Property for Rent', name: 'Property for Rent' },
    { id: 'Bike', name: 'Bike' },
    { id: 'Job', name: 'Job' },
    { id: 'Services', name: 'Services' },
    { id: 'Animals', name: 'Animals' },
    { id: 'Furniture and home decor', name: 'Furniture and home decor' },
    { id: 'Fashion (dress) and beauty', name: 'Fashion (dress) and beauty' },
    { id: 'Kids', name: 'Kids' },
    // {id:12, name:'Kids'}
  ]
  pricingCategories: any = [
    { id: 'FixedPrice', name: 'Fixed Price' },
    { id: 'Auction', name: 'Auction' },
    { id: 'SellToTTOffer', name: 'Sell To TTOffer' }
  ]
  brandList: any = [
    { id: 'Samsung', name: 'Samsung' },
    { id: 'Infinix', name: 'Infinix' },
    { id: 'Xiaomi', name: 'Xiaomi' },
    { id: 'Motorola', name: 'Motorola' },
    { id: 'Huawei', name: 'Huawei' },
    { id: 'Apple', name: 'Apple' }
  ]
  conditionList: any = [
    { id: 'New', name: 'New' },
    { id: 'Good', name: 'Good' },
    { id: 'Open Box', name: 'Open Box' },
    { id: 'Refurnished', name: 'Refurnished' },
  ]
  storageList: any = [
    { id: '32GB', name: '32GB' },
    { id: '16GB', name: '16GB' },
    { id: '64GB', name: '64GB' },
    { id: '128GB', name: '128GB' },
    { id: '256GB', name: '256GB' },
    { id: '512GB', name: '512GB' },
    { id: '1 TB+', name: '1 TB+' },
  ]
  colorList: any = [
    { id: 'White', name: 'White' },
    { id: 'Black', name: 'Black' },
    { id: 'Red', name: 'Red' },
    { id: 'Other', name: 'Other' },
  ]
  typeList: any = [
    { id: 'Apartment', name: 'Apartment' },
  ]
  bedRoomList: any = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '5', name: '6' },
    { id: '5', name: '7' },
    { id: '5', name: '8' },
    { id: '5', name: '9' },
    { id: '5', name: '10' },
    { id: '5', name: '11' },
    { id: '5', name: '12' },
    { id: '5', name: '13' },
    { id: '6+', name: '13+' },
    { id: 'Studio', name: 'Studio' },
  ]
  areaSizeList: any = [
    { id: '1,000 sqft', name: '1,000 sqft' },
  ]
  yearBuilt: any = [
    { id: '2020', name: '2020' },
  ]
  feartureBuilt: any = [
    { id: 'Apartment', name: 'Apartment' },
  ]
  amenitiesList: any = [
    { id: 'Apartment', name: 'Apartment' },
  ]
  makeAndModelList: any = [
    { id: 'Audi', name: 'Audi' },
    { id: 'BMW', name: 'BMW' },
    { id: 'Corolla', name: 'Corolla' },
  ]
  yearList: any = [
    { id: '2021', name: '2021' },
    { id: '2000', name: '2000' },
    { id: '2001', name: '2001' },
  ]
  fuelTypeList: any = [
    { id: 'Diesel', name: 'Diesel' },
    { id: 'Petrol', name: 'Petrol' },
  ]
  subCategoriesList: any = [
    { id: 1, name: "Mobile Phones" },
    { id: 1, name: "Accessories" },
    { id: 1, name: "Smart Watches" },
    { id: 1, name: "Tablets" },
    { id: 2, name: "Lands & Plots" },
    { id: 2, name: "Houses" },
    { id: 2, name: "Apartments & Flats" },
    { id: 2, name: "Shops - Offices - Commercial Space" },
    { id: 2, name: "Portions & Floors" },
    { id: 3, name: "Cars" },
    { id: 3, name: "Cars Accessories" },
    { id: 3, name: "Spare Parts" },
    { id: 3, name: "Buses, Vans & Trucks" },
    { id: 3, name: "Rickshaw & Chingchi" },
    { id: 3, name: "Tractors & Trailers" },
    { id: 3, name: "Cars on Installments" },
    { id: 3, name: "Other Vehicles" },
    { id: 3, name: "Boats" },
    { id: 4, name: "Portions & Floors" },
    { id: 4, name: "Houses" },
    { id: 4, name: "Apartments & Flats" },
    { id: 4, name: "Shops - Offices - Commercial Space " },
    { id: 4, name: "Rooms" },
    { id: 4, name: "Vacation Rentals - Guest Houses" },
    { id: 4, name: "Roommates & Paying Guests" },
    { id: 5, name: "Computer & Accessories" },
    { id: 5, name: "Television & Accessories" },
    { id: 5, name: "AC & Coolers" },
    { id: 5, name: "Generators, UPS & Power Solutions" },
    { id: 5, name: "Refrigerators & Freezers" },
    { id: 5, name: "Other Home Appliances" },
    { id: 5, name: "Cameras & Accessories" },
    { id: 5, name: "Games & Entertainment" },
    { id: 5, name: "Kitchen Appliances" },
    { id: 5, name: "Fans" },
    { id: 5, name: "Video-Audios" },
    { id: 5, name: "Washing Machines & Dryers" },
    { id: 5, name: "Microwaves & Ovens" },
    { id: 5, name: "Sewing Machines" },
    { id: 5, name: "Water Dispensers" },
    { id: 5, name: "Heater & Geysers" },
    { id: 5, name: "Irons & Steamers" },
    { id: 5, name: "Air Purifiers & Humidifiers" },
    { id: 6, name: "Motorcycles" },
    { id: 6, name: "Bicycles" },
    { id: 6, name: "Spare Parts" },
    { id: 6, name: "Bikes Accessories" },
    { id: 6, name: "Scooters" },
    { id: 6, name: "ATV & Quads" },
    { id: 7, name: "Online" },
    { id: 7, name: "Other Jobs" },
    { id: 7, name: "Education" },
    { id: 7, name: "Content Writing" },
    { id: 7, name: "Part time" },
    { id: 7, name: "Sales" },
    { id: 7, name: "Marketing" },
    { id: 7, name: "Customer Service" },
    { id: 7, name: "Restaurants & Hospitality" },
    { id: 7, name: "Domestic Staff" },
    { id: 7, name: "Medical" },
    { id: 7, name: "Graphic Design" },
    { id: 7, name: "Accounting & Finance" },
    { id: 7, name: "IT & Networking" },
    { id: 7, name: "Delivery Riders" },
    { id: 7, name: "Hotel & Tourism" },
    { id: 7, name: "Engineering" },
    { id: 7, name: "Security" },
    { id: 7, name: "Manufacturing" },
    { id: 7, name: "Clerical & Administration" },
    { id: 7, name: "Human Resources" },
    { id: 7, name: "Real Estate" },
    { id: 7, name: "Advertising & PR" },
    { id: 7, name: "Internships" },
    { id: 7, name: "Architecture & Interior Design" },
    { id: 8, name: "Other Services" },
    { id: 8, name: "Tuitions & Academies" },
    { id: 8, name: "Home & Office Repair" },
    { id: 8, name: "Car Rental" },
    { id: 8, name: "Domestic Help" },
    { id: 8, name: "Web Development" },
    { id: 8, name: "Travel & Visa" },
    { id: 8, name: "Electronics & Computer Repair" },
    { id: 8, name: "Movers & Packers" },
    { id: 8, name: "Drivers & Taxi" },
    { id: 8, name: "Health & Beauty" },
    { id: 8, name: "Event Services" },
    { id: 8, name: "Construction Services" },
    { id: 8, name: "Farm & Fresh Food" },
    { id: 8, name: "Consultancy Services" },
    { id: 8, name: "Architecture & Interior Design" },
    { id: 8, name: "Video & Photography" },
    { id: 8, name: "Renting Services" },
    { id: 8, name: "Catering & Restaurant" },
    { id: 8, name: "Car Services" },
    { id: 8, name: "Catering & Restaurant" },
    { id: 8, name: "Tailor Services" },
    { id: 8, name: "Insurance Services" },
    { id: 9, name: "Hens" },
    { id: 9, name: "Parrots" },
    { id: 9, name: "Livestock" },
    { id: 9, name: "Cats" },
    { id: 9, name: "Dogs" },
    { id: 9, name: "Pet Food & Accessories" },
    { id: 9, name: "Pigeons" },
    { id: 9, name: "Rabbits" },
    { id: 9, name: "Fish" },
    { id: 9, name: "Other Birds" },
    { id: 9, name: "Doves" },
    { id: 9, name: "Fertile Eggs" },
    { id: 9, name: "Ducks" },
    { id: 9, name: "Peacocks" },
    { id: 9, name: "Other Animal" },
    { id: 9, name: "Horses" },
    { id: 10, name: "Sofa & Chairs" },
    { id: 10, name: "Beds & Wardrobes" },
    { id: 10, name: "Other Household Items" },
    { id: 10, name: "Tables & Dining" },
    { id: 10, name: "Home Decoration" },
    { id: 10, name: "Office Furniture" },
    { id: 10, name: "Garden & Outdoor" },
    { id: 10, name: "Painting & Mirrors" },
    { id: 10, name: "Curtain & Blinds" },
    { id: 10, name: "Rugs & Carpets" },
    { id: 10, name: "Bathroom & Accessories" },
    { id: 11, name: "Clothes" },
    { id: 11, name: "Watches" },
    { id: 11, name: "Wedding" },
    { id: 11, name: "Footwear" },
    { id: 11, name: "Skin & Hair" },
    { id: 11, name: "Jewellery" },
    { id: 11, name: "Bags" },
    { id: 11, name: "Makeup" },
    { id: 11, name: "Fragrance" },
    { id: 11, name: "Fashion Accessories" },
    { id: 11, name: "Other Fashion" },
  ]
  engineCapacityList: any = [
    { id: '50cc', name: '50cc' },
  ]
  modelList: any = [
    { id: 'Yamaha R1', name: 'Yamaha R1' },
  ]
  jobtypeList: any = [
    { id: 'Graphic Design', name: 'Graphic Design' },
  ]
  experiencelist: any = [
    { id: 'Freshie', name: 'Freshie' },
  ]
  educationlist: any = [
    { id: 'Intermediate', name: 'Intermediate' },
  ]
  salaryList: any = [
    { id: '$30,000', name: '$30,000' },
  ]
  salaryPeriodList: any = [
    { id: 'Monthly', name: 'Monthly' },
  ]
  comanNameList: any = [
    { id: 'DevSinc', name: 'DevSinc' },
  ]
  positioinTypeList: any = [
    { id: 'Full Time', name: 'Full Time' },
  ]
  careerLevelList: any = [
    { id: 'Mid - Senior Level', name: 'Mid - Senior Level' },
  ]
  carList: any = [
    { id: 'Corolla', name: 'Corolla' },
  ]
  ageList: any = [
    { id: '1 year', name: '1 year' },
  ]
  breedList: any = [
    { id: 'Husky', name: 'Husky' },
  ]
  fashionTypeList: any = [
    { id: '1 seater', name: '1 seater' },
  ]
  fabricList: any = [
    { id: 'Cotton', name: 'Cotton' },
  ]
  suitTypeList: any = [
    { id: 'Tuxedo', name: 'Tuxedo' },
  ]
  toyList: any = [
    { id: 'Doll', name: 'Doll' },
  ]
  locationList: any = [
    { id: 'America', name: 'America' },
  ]
  compStatusId:any
  CombitanStatusList:any = [
    { id: 'Off plan', name: 'Off plan' },
    { id: 'Ready', name: 'Ready' },
  ]
  furnisheableId:any;
  FurnishableList:any = [
    { id: 'All', name: 'All' },
    { id: 'Furnished', name: 'Furnished' },
    { id: 'Un Furnished', name: 'Un Furnished' },
  ]
  bathRoomId:any
  BathRoomList:any = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
  ]
  // selectedFile: File | null = null;
  selectedFile: File[] = []
  constructor(
    private mainServices: MainServicesService,
    private extension: Extension,
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.currentUserId = this.extension.getUserId();
  }
  ngOnInit() {
    this.selectedTabItem = this.route.snapshot.paramMap.get('name')!;
    this.selectedTabId = this.route.snapshot.paramMap.get('id')!;
    if (this.selectedTabItem !=null) {
      this.selectTab(this.selectedTabItem)
    }
    else{
      this.selectTab("purchasesSales")
    }
    // this.currentUserProfile;
    this.getSelling();
    this.getCurrentUser();
    this.wishListProduct();
    // this.showSuccessMessage();
    // this.getNotification();
  }
  showSuccessMessage(message:string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  openPage() {
    this.showDiv = true;
  }
  onSelectImage(event: any) {
    
    console.log(event);
    this.imagesFiles.push(...event.addedFiles);
  }
  // handleInputChange() {
  //   console.log('Starting Time:', this.startingTime);
  //   console.log('Ending Time:', this.endingTime);
  //   console.log('Starting Date:', this.startingDate);
  //   console.log('Ending Date:', this.endingDate);
  // }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.showDiv = false;
    this.showMore = false
  }

  toggleActive(buttonIndex: number) {
    this.activeButton = buttonIndex;
  }

  sellingList: any = []
  sellingListTemp: any = []
  purchaseSale: any[] = [
    // { img: 'assets/images/light-clothes-img.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img2.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img3.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-clothes-img.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img2.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
    // { img: 'assets/images/light-img3.svg', heading: 'Modern light clothes', elipsImg1: 'assets/images/Ellipse1.svg', elipsImg2: 'assets/images/Ellipse2.svg', elipsImg3: 'assets/images/Ellipse3.svg', elipsImg4: 'assets/images/Ellipse4.svg', subHeading1: 'Sale Faster', subHeading2: 'Mark As Sold' },
  ]

  savedItems: any
  // = [
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  //   // {img: 'assets/images/product2.svg', heading:'Modern light clothes', location:'Dhaka Bangladesh', time:'34m Ago', },
  // ]

  paymentDeposit: any[] = [
    { img: 'assets/images/Applelogo.svg', detail1: 'Apply Pay', detail2: 'Default', id: 'flexRadioDefault1' },
    { img: 'assets/images/visalogo.svg', detail1: 'Visa', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },
    { img: 'assets/images/StripLogo.svg', detail1: 'Mastercard', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },
    { img: 'assets/images/GPay.svg', detail1: 'Google Pay', date: 'Expiry 06/2024', detail2: 'Set as default', btn: 'Edit', id: 'flexRadioDefault2' },

  ]

  selectedFiles: Array<{ src: string }> = [];
  selectedImagesList: File[] = [];
  selectedImageIndex: number = -1;
  selectedVideoIndex: number = -1;

  // onFilesSelected(event: any): void {

  //   const files = event.target.files;
  //   this.selectedImagesList.push(files[0])
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedFiles.push({ src: e.target.result }); 
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onFileSelected(event: Event) {
  //   
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.filesabc = Array.from(input.files);
  //   } else {
  //     this.filesabc = [];
  //   }
  // }
  onFileChange(event: any) {
    
    if (event.target.files && event.target.files.length > 0) {
      
      for (let i = 0; i < event.target.files.length; i++) {
        
        this.imageFilesAbc.push(event.target.files[i]);
        this.readFileAsDataURL(event.target.files[i]);
      }
    }
  }
  readFileAsDataURL(file: File) {
    
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFiles.push({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
  // onFilesSelected(event: any): void {
  //   
  //   const files = event.target.files;
  //   for (let file of files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedFiles.push({ url: e.target.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  openMore() {
    this.showMore = !this.showMore
  }


  deleteSelectedImage(): void {
    if (this.selectedImageIndex > -1 && this.selectedImageIndex < this.selectedFiles.length) {
      this.selectedFiles.splice(this.selectedImageIndex, 1);
      this.selectedImageIndex = -1;
    }
  }
  deleteProductImage(file: any) {
    debugger
    let input = {
      id: file.id,
      product_id: file.product_id
    }
    this.mainServices.deleteProductImage(input).subscribe(res => {
      debugger
      res
      console.log(res)
    })
  }
  updateProductImage() {
    debugger
    let formData = new FormData();
    this.imageFilesAbc.forEach((file, index) => {
      formData.append(`src[]`, file, file.name);
    });
    formData.append('product_id', ((this.productId) ? Number(this.productId) : 0).toString());
    this.http.post('https://www.ttoffer.com/api/upload-image', formData, { headers: this.getHeaders() }).subscribe(res =>{
      debugger
        res
        console.log(res)
    })
  }



  confirmSelection(): void {

    if (this.selectedImageIndex > -1 && this.selectedImageIndex < this.selectedFiles.length) {
      console.log('Image selected:', this.selectedFiles[this.selectedImageIndex]);
    }
  }



  selectedVideos: Array<{ url: string }> = [];

  onVideosSelected(event: any): void {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedVideos.push({ url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  selectVideo(index: number): void {
    this.selectedVideoIndex = index;
  }

  deleteSelectedVideo(): void {
    if (this.selectedVideoIndex > -1 && this.selectedVideoIndex < this.selectedVideos.length) {
      this.selectedVideos.splice(this.selectedVideoIndex, 1);
      this.selectedVideoIndex = -1; // Reset selection
    }
  }

  confirmVideoSelection(): void {
    if (this.selectedVideoIndex > -1 && this.selectedVideoIndex < this.selectedVideos.length) {
      // Perform any action needed on selection
      console.log('Video selected:', this.selectedVideos[this.selectedVideoIndex]);
    }
  }

  openModal() {
    const modal = document.getElementById('editModal');
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
    const modal = document.getElementById('editModal');
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

  openNewCardModal() {
    const modal = document.getElementById('newCardModal');
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

  closeNewCardModal() {
    const modal = document.getElementById('newCardModal');
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

  openUserNameModal() {
    const modal = document.getElementById('userNameModal');
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

  closeUserNameModal() {
    const modal = document.getElementById('userNameModal');
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

  openNumberModal() {
    const modal = document.getElementById('numberModal');
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

  closeNumberModal() {
    const modal = document.getElementById('numberModal');
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

  openEmailModal() {
    const modal = document.getElementById('emailModal');
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

  closeEmailModal() {
    const modal = document.getElementById('emailModal');
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
  openPasswordModal() {
    const modal = document.getElementById('passwordModal');
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

  closePasswordModal() {
    const modal = document.getElementById('passwordModal');
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

  openLocationModal() {
    const modal = document.getElementById('locationModal');
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

  closeLocationModal() {
    const modal = document.getElementById('locationModal');
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

  openBoostModal() {
    const modal = document.getElementById('boostPlusModal');
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

  closeBoostModal() {
    const modal = document.getElementById('boostPlusModal');
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

  openBoostPlanModal() {
    const modal = document.getElementById('boostModal');
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

  closeBoostPlanModal() {
    const modal = document.getElementById('boostModal');
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
  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      
      for (let i = 0; i < event.target.files.length; i++) {
        
        this.selectedFile.push(event.target.files[i]);
        this.readFileAsDataURL(event.target.files[i]);
      }
    }
    // this.selectedFile = event.target.files[0] ?? null;
    // const input = event.target as HTMLInputElement;
    // let files = input.files;

    // if (files && files[0]) {
    //   let file = files[0];
    //   this.selectedFile = file;
    this.updateProfile();
    // }
  }

  updateProfile(): void {
    debugger
    if (this.selectedFile) {
      let formData = new FormData();
      // this.filesabc.forEach(file => formData.append('video', file, file.name));
      this.videoFilesAbc.forEach((file, index) => {
        formData.append(`img`, file, file.name);
      });
      formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());

      this.http.post('https://www.ttoffer.com/api/update/user', formData, { headers: this.getHeaders() }).subscribe(
        (response: any) => {
          debugger
          
          this.showSuccessMessage(response.message)
          console.log('File upload successful', response);
          // this.updateProductImage()
          // this.atributes()
          // this.addProductSeccondStep();
        },
        error => {
          console.error('File upload failed', error);
        }
      );
      // let data = {
      //   user_id: 11,
      //   img: this.selectedFile
      // };

      // this.mainServices.updateUserImage(data).subscribe(
      //   res => {

      //     console.log('Response:', res); // For debugging
      //   },
      //   err => {
      //     console.error('Upload failed:', err);
      //   }
      // );
    }
  }
  // onImageUpload(event: any): void {
  //   
  //   const input = event.target as HTMLInputElement;
  //   let files = input.files;

  //   if (files && files[0]) {
  //     let file = files[0];
  //     this.userImage = file;
  //     this.profilePhoto = file;
  //     this.updateProfile()
  //   }
  // }

  // updateProfile() {
  //   
  //   let data = {
  //     user_id:11,
  //     // src: "",
  //     img:this.userImage,
  //   }
  //   this.mainServices.updateUserImage(data).subscribe(res => {
  //     
  //     console.log('Response:', res); // For debugging
  //   });
  // }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }
  // AddProductFirstStep() {

  //   let input = {
  //     user_id: this.currentUserId,
  //     title: this.title,
  //     description: this.description,
  //     photo: this.selectedFiles,
  //     video: this.selectedFiles,
  //   }
  //   this.mainServices.addProductFirstStep(input).subscribe((res: any) => {

  //     res
  //     this.productId = res.product_id
  //     this.atributes()
  //     this.addProductSeccondStep();
  //     console.log(res);
  //   })
  // }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  AddProductFirstStep() {
    debugger
    let formData = new FormData();
    // this.filesabc.forEach(file => formData.append('video', file, file.name));
    this.videoFilesAbc.forEach((file, index) => {
      formData.append(`video[]`, file, file.name);
    });
    formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.http.post('https://www.ttoffer.com/api/add-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
      (response: any) => {
        debugger
        console.log('File upload successful', response);
        this.productId = response.product_id
        this.updateProductImage()
        this.atributes()
        this.addProductSeccondStep();
      },
      error => {
        console.error('File upload failed', error);
      }
    );
  }
  EditProductFirstStep() {
    debugger
    let formData = new FormData();
    // this.filesabc.forEach(file => formData.append('video', file, file.name));
    // this.imageFilesAbc.forEach((file, index) => {
    //   formData.append(`video[]`, file, file.name);
    // });
    formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('product_id', ((this.productId) ? Number(this.productId) : 0).toString());

    this.http.post('https://www.ttoffer.com/api/edit-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
      (response: any) => {
        debugger
        // console.log('File upload successful', response);
        this.productId = response.product_id
        this.atributes()
        this.EditProductSeccondStep();
      },
      error => {
        console.error('File upload failed', error);
      }
    );
  }

  addProductSeccondStep() {
    let input = {
      product_id: this.productId,
      category_id: 1,
      condition: this.conditionId,
      make_and_model: this.makeAndModelId,
      mileage: this.mileage,
      color: this.colorId,
      brand: this.brandId,
      model: this.modelId,
      edition: "",
      authenticity: "",
      attributes: this.jSonAttributes,
    }
    this.mainServices.addProductSecondStep(input).subscribe(res => {
      debugger
      res
      this.addProductThirdStep()
      console.log(res);
    })
  }
  EditProductSeccondStep() {
    let input = {
      user_id: this.currentUserId,
      product_id: this.productId,
      category_id: 1,
      condition: this.conditionId,
      make_and_model: this.makeAndModelId,
      mileage: this.mileage,
      color: this.colorId,
      brand: this.brandId,
      model: this.modelId,
      edition: "",
      authenticity: "",
      attributes: this.jSonAttributes,
    }
    this.mainServices.editProductSecondStep(input).subscribe(res => {
      debugger
      res
      this.EditProductThirdStep()
      console.log(res);
    })
  }
  addProductThirdStep() {
    debugger
    let input
    if (this.pricingCatId == "Auction") {
      input = {
        product_id: this.productId,
        auction_price: this.startingPrice,
        starting_date: this.startingDate,
        // starting_time: '12:16',
        starting_time: this.startingTime,
        ending_date: this.endingDate,
        // ending_time: '12:16',
        ending_time: this.endingTime,
        // fix_price: null,

      }
    }
    else if (this.pricingCatId == "FixedPrice") {
      debugger
      input = {
        product_id: this.productId,
        fix_price: this.price,
        // auction_price: null,
      }
    }
    else {
      debugger
      input = {
        product_id: this.productId,
        // fix_price: this.price,
      }
    }
    this.mainServices.addProductThirdStep(input).subscribe((res:any) => {
      debugger
      res
      // this.showSuccessMessage(res.message)
      this.addProductLastStep();
      console.log(res);
    })
  }
  EditProductThirdStep() {
    let input
    if (this.pricingCatId == "Auction") {
      input = {
        product_id: this.productId,
        auction_price: this.startingPrice,
        starting_date: this.startingDate,
        // starting_time: '12:16',
        starting_time: this.startingTime,
        ending_date: this.endingDate,
        // ending_time: '12:16',
        ending_time: this.endingTime,
        fix_price: null,
      }
    }
    else if (this.pricingCatId == "FixedPrice") {
      input = {
        product_id: this.productId,
        fix_price: this.price,
        auction_price: null,
      }
    }
    else {
      input = {
        product_id: this.productId,
        // fix_price: this.price,
      }
    }
    this.mainServices.editProductThirdStep(input).subscribe(res => {
      res
      this.editProductLastStep();
      console.log(res);
    })
  }
  addProductLastStep() {
    debugger
    let input = {
      product_id: this.productId,
      location: this.locationId,
    }
    this.mainServices.addProductLastStep(input).subscribe((res:any) => {
      debugger
      res
      this.showSuccessMessage(res.msg)
      console.log(res);
    })
  }

  editProductLastStep() {

    let input = {
      product_id: this.productId,
      location: this.locationId,
    }
    this.mainServices.editProductLastStep(input).subscribe((res:any) => {
      res
      this.showSuccessMessage(res.message)
      console.log(res);
    })
  }
  getSelling() {
    debugger;
    this.mainServices.getSelling().subscribe((res: any) => {
      debugger;
      this.sellingList = res
      this.sellingListTemp = res.data.selling
      if (this.selectedTab != "") {
        this.sellingListTemp = this.sellingListTemp.filter((item: any) => {
          return item.id == this.selectedTabId;
        });
        // this.readFileAsDataURL(this.sellingListTemp[0].video[0].src)
        console.log('this is temp file:', this.sellingListTemp)
        // this.convertLinksToBase64(this.sellingListTemp[0].video)
        this.productId = this.sellingListTemp[0].id
        this.title = this.sellingListTemp[0].title
        this.description = this.sellingListTemp[0].description
        const attributesObject = JSON.parse(this.sellingListTemp[0].attributes);
        const parsedAttributes = JSON.parse(attributesObject.attributes);
        // const parsedAttributes = JSON.parse(this.sellingListTemp[0].attributes);

        // Extract the category_id
        // this.categories.id = attributesObject.category_id;


        this.brandId = parsedAttributes.brand;
        this.selectedCategoryId = parsedAttributes.category_id
        console.log('Extracted category_id:', this.categories.id);
        // this.brandId = parsedAttributes.brand
        this.conditionId = parsedAttributes.condition
        this.makeAndModelId = parsedAttributes.makeAndModel
        this.mileage = parsedAttributes.milage
        // this.pricingCatId = parsedAttributes.milage
        // this.price = parsedAttributes.price
        this.locationId = parsedAttributes.location
        this.storageId = parsedAttributes.storage
        this.colorId = parsedAttributes.color
        this.typeId = parsedAttributes.type
        this.bedRoomId = parsedAttributes.bedrooms
        this.areaSizeId = parsedAttributes.area
        this.feartureId = parsedAttributes.feature
        this.amenitiesId = parsedAttributes.Amenities
        this.yearId = parsedAttributes.year
        this.price = parsedAttributes.price
        this.fuelTypeId = parsedAttributes.fuelType
        this.engineCapacityId = parsedAttributes.engineCapacity
        this.subCategoriesId = parsedAttributes.subcategory
        this.modelId = parsedAttributes.model
        this.jobtypeId = parsedAttributes.type
        this.experienceId = parsedAttributes.experience
        this.educationId = parsedAttributes.education
        this.salaryId = parsedAttributes.salary
        this.salaryPeriodId = parsedAttributes.salaryPeriod
        this.companyNameId = parsedAttributes.companyName
        this.positionTypeId = parsedAttributes.possitionType
        this.careerLevelId = parsedAttributes.carrierLevel
        this.carId = parsedAttributes.car
        this.ageId = parsedAttributes.age
        this.breedId = parsedAttributes.breed
        // this.fashionTypeId = parsedAttributes.milage
        this.fabricId = parsedAttributes.fabric
        this.suitTypeId = parsedAttributes.suitType
        this.toyId = parsedAttributes.toy
        this.startingTime = this.sellingListTemp[0].starting_time
        this.endingTime = this.sellingListTemp[0].ending_time
        this.startingDate = this.sellingListTemp[0].starting_date
        this.endingDate = this.sellingListTemp[0].ending_date
        this.startingPrice = this.sellingListTemp[0].auction_price
        this.price = this.sellingListTemp[0].fix_price
        if (this.sellingListTemp[0].fix_price != null) {
          this.pricingCatId = "FixedPrice"
        } else if (this.sellingListTemp[0].auction_price != null) {
          this.pricingCatId = "Auction"
        }
        else {
          this.pricingCatId = "SellToTTOffer"
        }
      }
      console.log(this.sellingList)

    })
  }
  getCurrentUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      if (jsonStringGetData) {
        this.currentUserProfile = JSON.parse(jsonStringGetData);
        console.log(this.currentUserProfile)
        this.imageUrl = this.currentUserProfile.img
      } else {
        console.warn('localStorage is not available.');
      }
    }
  }
  updateUserName = () => {
    let input = {
      name: this.currentUserProfile.name
    }
    this.mainServices.updateUserName(input).subscribe((res: any) => {

      res.data
      const jsonString = JSON.stringify(res.data);
      localStorage.setItem("key", jsonString);
      this.getCurrentUser();
    })
  }
  updateUserNumber = () => {

    let input = {
      phone: this.currentUserProfile.phone
    }
    this.mainServices.updateNumber(input).subscribe((res: any) => {

      res.data
      const jsonString = JSON.stringify(res.data);
      localStorage.setItem("key", jsonString);
      this.getCurrentUser();
    })
  }
  updateUserEmail = () => {

    let input = {
      email: this.currentUserProfile.email
    }
    this.mainServices.updateEmail(input).subscribe((res: any) => {

      res.data
      const jsonString = JSON.stringify(res.data);
      localStorage.setItem("key", jsonString);
      this.getCurrentUser();
    })
  }
  updateUserPassword = () => {

    let input = {
      password: this.currentUserProfile.password
    }
    this.mainServices.updatePassword(input).subscribe((res: any) => {

      res.data
      const jsonString = JSON.stringify(res.data);
      localStorage.setItem("key", jsonString);
      this.getCurrentUser();
    })
  }
  updateUserLocation = () => {

    let input = {
      location: this.currentUserProfile.location
    }
    this.mainServices.updateLocation(input).subscribe((res: any) => {

      res.data
      const jsonString = JSON.stringify(res.data);
      localStorage.setItem("key", jsonString);
      this.getCurrentUser();
    })
  }
  wishListProduct() {

    var input = {
      user_id: this.currentUserId
    }
    this.mainServices.wishListProduct(input).subscribe((res: any) => {

      this.savedItems = res.data
      console.log('SAVED ITEMS', this.savedItems)
    })
  }
  parseDate(event: any): Date {

    let date = (event.target as HTMLTextAreaElement).value;
    let dateString: string = date;
    if (dateString) {
      return new Date(dateString);
    }
    return new Date();
  }
  parseSTime(event: Event): any {

    const input = event.target as HTMLInputElement;
    this.startingTime = input.value;
  }
  parseETime(event: Event): any {

    const input = event.target as HTMLInputElement;
    this.endingTime = input.value;
  }
  atributes() {

    if (this.selectedCategoryId == "Mobiles") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name,
        product_id: this.productId,
        brand: this.brandId ?? '',
        condition: this.conditionId ?? '',
        price: this.price.trim() ?? '',
        storage: this.storageId ?? '',
        color: this.colorId ?? '',
        location: this.locationId
      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Property for Sale") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        type: this.typeId ?? '',
        bedrooms: this.bedRoomId ?? '',
        area: this.areaSizeId ?? '',
        condition: this.conditionId,
        yearBuilt: this.yearBuiltId ?? '',
        feature: this.feartureId ?? '',
        Amenities: this.amenitiesId ?? '',
        price: this.price.trim() ?? '',
        storage: this.storageId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Vehicles") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        makeAndModel: this.makeAndModelId ?? '',
        year: this.yearBuiltId ?? '',
        condition: this.conditionId ?? '',
        mileage: this.mileage ?? '',
        fuelType: this.fuelTypeId ?? '',
        color: this.colorId ?? '',
        price: this.price.trim() ?? '',
        location: this.locationId ?? ''

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Property for Rent") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        type: this.typeId ?? '',
        bedrooms: this.bedRoomId ?? '',
        area: this.areaSizeId ?? '',
        condition: this.conditionId,
        yearBuilt: this.yearBuiltId ?? '',
        feature: this.feartureId ?? '',
        Amenities: this.amenitiesId ?? '',
        price: this.price.trim() ?? '',
        storage: this.storageId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Bike") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,

        subCatId: this.subCategoriesId ?? '',
        condition: this.conditionId,
        engineCapacity: this.engineCapacityId ?? '',
        model: this.modelId ?? '',
        price: this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Job") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        type: this.jobtypeId ?? '',
        experience: this.experienceId ?? '',
        education: this.educationId ?? '',
        salary: this.salaryId ?? '',
        condition: this.conditionId,
        salaryPeriod: this.salaryPeriodId ?? '',
        companyName: this.companyNameId ?? '',
        possitionType: this.positionTypeId ?? '',
        carrierLevel: this.careerLevelId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Services") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId ?? '',
        price: this.price.trim() ?? '',
        car: this.carId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Animals") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        condition: this.conditionId,
        subcategory: this.subCategoriesId ?? '',
        age: this.ageId ?? '',
        price: this.price.trim() ?? '',
        breed: this.breedId ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Furniture and home decor") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        type: this.fashionTypeId ?? '',
        condition: this.conditionId ?? '',
        color: this.colorId ?? '',
        price: this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Fashion (dress) and beauty") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId,
        fabric: this.fabricId ?? '',
        suitType: this.suitTypeId ?? '',
        price: this.price ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
    else if (this.selectedCategoryId == "Kids") {
      const jsonData = {
        category_id: this.selectedCategoryId ?? '',
        category_name: this.categories.name ?? '',
        product_id: this.productId,
        subcategory: this.subCategoriesId ?? '',
        condition: this.conditionId ?? '',
        toy: this.toyId ?? '',
        price: this.price.trim() ?? '',
        location: this.locationId ?? '',

      };
      this.jSonAttributes = JSON.stringify(jsonData);
    }
  }
  onchange() {
    console.log('this is the selected categorie Id', this.selectedCategoryId);
  }
  markAsSold(prodictId: any) {
    console.log('sold out ', prodictId)
    this.mainServices.markAsSold(prodictId).subscribe((res:any) => {
      debugger
      res
      // this.getSelling();
      this.showSuccessMessage(res.message)
    })
  }
  getNotification(){
    debugger
    this.mainServices.getNotification(this.currentUserId).subscribe((res:any) => {
      debugger
      this.notificationList = res.data
      console.log('Notification:', this.notificationList)
    })
  }
  addCumtomLink(){
    // let formData = new FormData();
    // formData.append('custom_link', this.customLink);
    // this.http.post('https://www.ttoffer.com/api/edit-product-first-step', formData, { headers: this.getHeaders() }).subscribe(
    //   (response: any) => {
    //     debugger
    //   },
    //   error => {
    //     console.error('File upload failed', error);
    //   }
    // );
    let input = {
      custom_link:this.customLink
    }
    this.mainServices.customLink(input).subscribe((res:any) => {
      debugger
      res;
      this.showSuccessMessage(res.message)
      console.log('customLInt',res)
    })
  }
}
