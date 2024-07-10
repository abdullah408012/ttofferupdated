import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { MainServicesService } from '../../services/main-services.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [HeaderComponent, CommonModule, FooterComponent, FormsModule]
})
export class CategoriesComponent {
  @Input() progress: number = 30;
  show: boolean = false
  categorieId:string = ""
  search:string = ""
  sub_category_id:any
  limit:string = ""
  locationId:string = ""
  sort_by:string = ""
  is_urgert:string = ""
  min_price:string = ""
  max_price:string = ""
  isAuctionProduct: boolean = false
  isFeatureProduct: boolean = false
  activeButton: number = 1;
  subCategories:any = [
    // { title: 'Sub Categories', id: 'flexRadioDefault1', content1: 'Lands & Plots', content2: 'Houses', content3: 'Apartments & Flats', content4: 'Shops - Offices', content5: 'Portions & Floors', content6: 'View all' },
    // { title: 'SELLER TYPE', id: 'flexRadioDefault2', content1: 'Verified Seller', content2: 'Urgents' },
    // { title: 'CONDITIONS', id: 'flexRadioDefault3', content1: 'Any', content2: 'New', content3: 'Used' },
  ];
  sellerType:any = [
    {id:'Verified Seller'},
    {id:'Urgents'}
  ]
  conditions:any = [
    {id:'Any'},
    {id:'New'},
    {id:'Used'}
  ]
  subCatContent:any = [];
  trackById(index: number, item: any): number {
    return item.id;
  }

  auction: any []= []
  feature: any []= []


  showAuction(buttonIndex: number){
    this.activeButton = buttonIndex;
  }
  
  showFeature(buttonIndex: number){
    this.activeButton = buttonIndex;
  }

  currentUserId : number = 0;
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

  getDisplayedFeatured() {
    return this.showAll ? this.feature : this.feature.slice(0, 8);
  }

  getAuctionProduct(){
    this.mainServices.getAuctionProduct().subscribe(res =>{
      this.auction = res.data
      console.log(this.auction)
    })
  }

  getFeatcherdProduct() {
    this.mainServices.getFeatureProduct().subscribe(res =>{
      this.feature = res.data
      console.log(this.feature)
    },
    (error) => {
      if (error.status === 401) {
        // console.error('Unauthorized access. Redirecting to login...');
      } else {
        // console.error('Error fetching feature product:', error);
      }
    })
  }

openfilter(){
  this.show = !this.show
}
constructor(
  private mainServices: MainServicesService,
  private route: ActivatedRoute,
)
{}
ngOnInit():void{
  this.categorieId = this.route.snapshot.paramMap.get('id')!;
  this.getAllProducts();
  this.subCategory();

}
getAllProducts(){
  
  let input = {
    search:this.search,
    category_id: this.categorieId,
    sub_category_id: this.sub_category_id,
    limit:this.limit,
    location:this.locationId,
    sort_by:this.sort_by,
    is_urgert:this.is_urgert,
    min_price:this.min_price,
    max_price:this.max_price
  }
  this.mainServices.getAllProducts(input).subscribe((res:any) =>{
    
    this.categories = res.data
    console.log('Categories',this.categories)
    this.categories.forEach(category => {
      if (category.fix_price !== null) {
        this.feature.push(category);
      } 
      else if (category.auction_price !== null) {
        this.auction.push(category);
      }
    });
  })
}
getSubCatProducts(subId:any){
  this.sub_category_id = 1;
  this.getAllProducts();

}

  // location = [
  //   { title: 'TOP LOCATION', id: 'flexCheckDefault', content1: 'Dhaka, Bangladesh', content2: 'Wisconsin, USA', content3: 'Michigan, USA', content4: 'New York, USA', content5: 'New Mexico, USA', content6: 'Washington, USA', content7: 'Brasilia, Brazil' },
  // ];
  locationRadius = [
    { title: 'LOCATION RADIUS', subTitle: '32 miles' },
  ];

  prices = [
    { title: 'PRICES'},
  ];

  activeIndices: Set<number> = new Set([0, 1, 2]);

  toggleAccordion(index: number) {
    if (this.activeIndices.has(index)) {
      this.activeIndices.delete(index);
    } else {
      this.activeIndices.add(index);
    }
  }

  activeLocationIndex: number | null = 0;
  activeRadiusIndex: number | null = 0;
  activePriceIndex: number | null = 0;

  toggleLocationAccordion(index: number): void {
    this.activeLocationIndex = this.activeLocationIndex === index ? null : index;
  }

  toggleRadiusAccordion(index: number): void {
    this.activeRadiusIndex = this.activeRadiusIndex === index ? null : index;
  }

  togglePriceAccordion(index: number): void {
    this.activeRadiusIndex = this.activeRadiusIndex === index ? null : index;
  }

  isLocationActive(index: number): boolean {
    return this.activeLocationIndex === index;
  }

  isRadiusActive(index: number): boolean {
    return this.activeRadiusIndex === index;
  }

  getCategoryContents(category: any): string[] {
    let contents = [];
    for (let key in category) {
      if (key.startsWith('content')) {
        contents.push(category[key]);
      }
    }
    return contents;
  }

  isActive(index: number): boolean {
    return this.activeIndices.has(index);
  }

  categories: any[] = [
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


  getDisplayedItems() {
    return this.showAll ? this.categories : this.categories.slice(0, 15);
  }
  
  // { title: 'Sub Categories', id: 'flexRadioDefault1', content1: 'Lands & Plots', content2: 'Houses', content3: 'Apartments & Flats', content4: 'Shops - Offices', content5: 'Portions & Floors', content6: 'View all' },
  // { title: 'SELLER TYPE', id: 'flexRadioDefault2', content1: 'Verified Seller', content2: 'Urgents' },
  // { title: 'CONDITIONS', id: 'flexRadioDefault3', content1: 'Any', content2: 'New', content3: 'Used' },

  subCategory(){
    if (this.categorieId == "1") {
      
      this.subCatContent = [
        {id:"Mobile Phones", name:"Mobile Phones"},
        {id:"Accessories", name:"Accessories"},
        {id:"Smart Watches", name:"Smart Watches"},
        {id:"Tablets", name:"Tablets"},
      ]
    }
    else if (this.categorieId == "2") {
      
      this.subCatContent = [
        {id:"Lands & Plots", name:"Lands & Plots"},
        {id:"Houses", name:"Houses"},
        {id:"Apartments & Flats", name:"Apartments & Flats"},
        {id:"Shops - Offices - Commercial Space", name:"Shops - Offices - Commercial Space"},
        {id:"Portions & Floors", name:"Portions & Floors"},
      ]
    }
    else if (this.categorieId == "3") {
      
      this.subCatContent = [
        {id:"Cars", name:"Cars"},
        {id:"Cars Accessories", name:"Cars Accessories"},
        {id:"Spare Parts", name:"Spare Parts"},
        {id:"Buses, Vans & Trucks", name:"Buses, Vans & Trucks"},
        {id:"Rickshaw & Chingchi", name:"Rickshaw & Chingchi"},
        {id:"Tractors & Trailers", name:"Tractors & Trailers"},
        {id:"Cars on installments", name:"Cars on installments"},
        {id:"Other Vehicles", name:"Other Vehicles"},
        {id:"Boats", name:"Boats"},
      ]
    }
    else if (this.categorieId == "4") {
      
      this.subCatContent = [
        {id:"Portions & Floors", name:"Portions & Floors"},
        {id:"Houses", name:"Houses"},
        {id:"Appartments & Flats", name:"Appartments & Flats"},
        {id:"Shops - Offices -Commercial Space", name:"Shops - Offices -Commercial Space"},
        {id:"Rooms", name:"Rooms"},
        {id:"Vacation Rentals - Guest Houses", name:"Vacation Rentals - Guest Houses"},
        {id:"Roommates & Paying Guests", name:"Roommates & Paying Guests"},
      ]
    }
    else if (this.categorieId == "5") {
      
      this.subCatContent = [
        {id:"Computer & Accessories", name:"Computer & Accessories"},
        {id:"Television & Accessories", name:"Television & Accessories"},
        {id:"AC & Coolers", name:"AC & Coolers"},
        {id:"Generators, UPS & Power Solutions", name:"Generators, UPS & Power Solutions"},
        {id:"Refrigerators & Freezers", name:"Refrigerators & Freezers"},
        {id:"Other Home Appliances", name:"Other Home Appliances"},
        {id:"Cameras & Accessories", name:"Cameras & Accessories"},
        {id:"Game & Ebtertainment", name:"Game & Ebtertainment"},
        {id:"Kitchen Appliances", name:"Kitchen Appliances"},
        {id:"Fan", name:"Fan"},
        {id:"Video-Audios", name:"Video-Audios"},
        {id:"Washing Machines & Dryers", name:"Washing Machines & Dryers"},
        {id:"Microwaves & Ovens", name:"Microwaves & Ovens"},
        {id:"Sewing Machines", name:"Sewing Machines"},
        {id:"Water Dispensers", name:"Water Dispensers"},
        {id:"Heater & Geysers", name:"Heater & Geysers"},
        {id:"Iron & Steamers", name:"Iron & Steamers"},
        {id:"Air Rurifiers & Humidifiers", name:"Air Rurifiers & Humidifiers"},
      ]
    }
    else if (this.categorieId == "6") {
      
      this.subCatContent = [
        {id:"Motorcycles", name:"Motorcycles"},
        {id:"Bicycles", name:"Bicycles"},
        {id:"Spare parts", name:"Spare parts"},
        {id:"Bikes Accessories", name:"Bikes Accessories"},
        {id:"Scooters", name:"Scooters"},
        {id:"ATV & Quads", name:"ATV & Quads"},
      ]
    }
    else if (this.categorieId == "7") {
      
      this.subCatContent = [
        {id:"Online", name:"Online"},
        {id:"Other Jobs", name:"Other Jobs"},
        {id:"Education", name:"Education"},
        {id:"Content Writing", name:"Content Writing"},
        {id:"Scooters", name:"Scooters"},
        {id:"Part time", name:"Part time"},
        {id:"Sales", name:"Sales"},
        {id:"Marketing", name:"Marketing"},
        {id:"Customer Serrvice", name:"Customer Serrvice"},
        {id:"Restaurants & Hospitality", name:"Restaurants & Hospitality"},
        {id:"Domistic Staff", name:"Domistic Staff"},
        {id:"Medical", name:"Medical"},
        {id:"Graphic Design", name:"Graphic Design"},
        {id:"Accounting & Finance", name:"Accounting & Finance"},
        {id:"IT & Networking", name:"IT & Networking"},
        {id:"Delivery Riders", name:"Delivery Riders"},
        {id:"Hotel & Tourism", name:"Hotel & Tourism"},
        {id:"Engineering", name:"Engineering"},
        {id:"Security", name:"Security"},
        {id:"Manufacturing", name:"Manufacturing"},
        {id:"Clerical & Administrations", name:"Clerical & Administrations"},
        {id:"Human Resources", name:"Human Resources"},
        {id:"Real Estate", name:"Real Estate"},
        {id:"Advertising & PR", name:"Advertising & PR"},
        {id:"Internships", name:"Internships"},
        {id:"Architecture & Interior Design", name:"Architecture & Interior Design"},
      ]
    }
    else if (this.categorieId == "8") {
      
      this.subCatContent = [
        {id:"Other Services", name:"Other Services"},
        {id:"Tuitions & Academies", name:"Tuitions & Academies"},
        {id:"Home & Office Repair", name:"Home & Office Repair"},
        {id:"Car Rental", name:"Car Rental"},
        {id:"Domestic Help", name:"Domestic Help"},
        {id:"Web Development", name:"Web Development"},
        {id:"Travel & Visa", name:"Travel & Visa"},
        {id:"Electronics & Computer Repair", name:"Electronics & Computer Repair"},
        {id:"Movers & Packers", name:"Movers & Packers"},
        {id:"Drivers & Taxi", name:"Drivers & Taxi"},
        {id:"Health & Beauty", name:"Health & Beauty"},
        {id:"Event Services", name:"Event Services"},
        {id:"Construction Services", name:"Construction Services"},
        {id:"Farm & Fresh Food", name:"Farm & Fresh Food"},
        {id:"Consultancy Services", name:"Consultancy Services"},
        {id:"Architecture & Interior Design", name:"Architecture & Interior Design"},
        {id:"Video & Photography", name:"Video & Photography"},
        {id:"Renting Services", name:"Renting Services"},
        {id:"Catering & Restaurant", name:"Catering & Restaurant"},
        {id:"Car Services", name:"Car Services"},
        {id:"Tailor Services", name:"Tailor Services"},
        {id:"Insurance Services", name:"Insurance Services"},
      ]
    }
    else if (this.categorieId == "9") {
      
      this.subCatContent = [
        {id:"Hens", name:"Hens"},
        {id:"Parrots", name:"Parrots"},
        {id:"Livestock", name:"Livestock"},
        {id:"Cats", name:"Cats"},
        {id:"Dogs", name:"Dogs"},
        {id:"Pet Food & Accessories", name:"Pet Food & Accessories"},
        {id:"Pigeons", name:"Pigeons"},
        {id:"Rabbits", name:"Rabbits"},
        {id:"Fish", name:"Fish"},
        {id:"Other Birds", name:"Other Birds"},
        {id:"Doves", name:"Doves"},
        {id:"Rertile Eggs", name:"Rertile Eggs"},
        {id:"Ducks", name:"Ducks"},
        {id:"Peacocks", name:"Peacocks"},
        {id:"Other Animal", name:"Other Animal"},
        {id:"Horses", name:"Horses"},
      ]
    }
    else if (this.categorieId == "10") {
      
      this.subCatContent = [
        {id:"Sofa & Chairs", name:"Sofa & Chairs"},
        {id:"Beds & Wardrobes", name:"Beds & Wardrobes"},
        {id:"Other Houseshold Items", name:"Other Houseshold Items"},
        {id:"Tables & Dining", name:"Tables & Dining"},
        {id:"Home Decoration", name:"Home Decoration"},
        {id:"Office Furniture", name:"Office Furniture"},
        {id:"Garden & Outdoor", name:"Garden & Outdoor"},
        {id:"Painting & Mirrors", name:"Painting & Mirrors"},
        {id:"Curtain & Blinds", name:"Curtain & Blinds"},
        {id:"Rugs & Carpets", name:"Rugs & Carpets"},
        {id:"Bathroom & Accessories", name:"Bathroom & Accessories"},
      ]
    }
    else if (this.categorieId == "11") {
      
      this.subCatContent = [
        {id:"Clothes", name:"Clothes"},
        {id:"Watches", name:"Watches"},
        {id:"Wedding", name:"Wedding"},
        {id:"Footwear", name:"Footwear"},
        {id:"Skin & Hair", name:"Skin & Hair"},
        {id:"Jewellery", name:"Jewellery"},
        {id:"Bags", name:"Bags"},
        {id:"Makeup", name:"Makeup"},
        {id:"Fragrance", name:"Fragrance"},
        {id:"Fashion Accessories", name:"Fashion Accessories"},
        {id:"Other Fashion", name:"Other Fashion"},
      ]
    }
    else if (this.categorieId == "12") {
      
      this.subCatContent = [
        {id:"Toys", name:"Toys"},
        {id:"Kids Vehicles", name:"Kids Vehicles"},
        {id:"Baby Gear", name:"Baby Gear"},
        {id:"Kids Furniture", name:"Kids Furniture"},
        {id:"Swings & Slides", name:"Swings & Slides"},
        {id:"Kids Accessories", name:"Kids Accessories"},
        {id:"Kids Clothing", name:"Kids Clothing"},
        {id:"Bath & Diapers", name:"Bath & Diapers"},
      ]
    }
  }
}
