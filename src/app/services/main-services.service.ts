import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServicesService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  private apiUrl = 'https://www.ttoffer.com/';
  // private getHeaders(): HttpHeaders {
  //   let headersConfig:any = {
  //     'Content-Type': 'application/json',
  //   };

  //   if (isPlatformBrowser(this.platformId)) {
  //     
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       headersConfig['Authorization'] = `Bearer ${token}`;
  //     }
  //   }

  //   return new HttpHeaders(headersConfig);
  // }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAuthByLogin(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}` + 'api/login-email', input).pipe(
      // catchError()
    );
  }
  getFeatureProduct(): Observable<any> {
    return this.http.post(`${this.apiUrl}api/featured-products`, null, { headers: this.getHeaders() });
  }
  getAuctionProduct(): Observable<any> {
    return this.http.post(`${this.apiUrl}api/auction-products`, null, { headers: this.getHeaders() });
  }
  addWishList(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/add-wishlist-products', input, { headers: this.getHeaders() }).pipe();
  }
  removeWishList(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/remove-wishlist-products', input, { headers: this.getHeaders() }).pipe();
  }
  updateUserName(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/user/name', input, { headers: this.getHeaders() }).pipe();
  }
  updateNumber(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/phone/number', input, { headers: this.getHeaders() }).pipe();
  }
  updateEmail(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/email', input, { headers: this.getHeaders() }).pipe();
  }
  updatePassword(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/password', input, { headers: this.getHeaders() }).pipe();
  }
  updateLocation(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/location', input, { headers: this.getHeaders() }).pipe();
  }
  getPlacedBids(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/get-placed-bids', input, { headers: this.getHeaders() }).pipe();
  }
  makeOffer(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/make-offer', input, { headers: this.getHeaders() }).pipe();
  }
  getAllChatsOfUser(currentUserid: number) {
    return this.http.get(`${this.apiUrl}` + 'api/get/user/all/chats/' + currentUserid, { headers: this.getHeaders() }).pipe();
  }
  getConversation(conversation_id: number) {
    return this.http.get(`${this.apiUrl}` + 'api/get/conversation/' + conversation_id, { headers: this.getHeaders() }).pipe();
  }
  sendMsg(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/send_msg', input, { headers: this.getHeaders() }).pipe();
  }
  addProductFirstStep(input: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}` + 'api/add-product-first-step', input, {
      headers: this.getHeaders(),
      reportProgress: true,
      observe: "events"
    }).pipe(
      map(result => {
        return result;
    })
    );
  }
  addProductSecondStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/add-product-second-step', input, { headers: this.getHeaders() }).pipe();
  }
  editProductSecondStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/edit-product-second-step', input, { headers: this.getHeaders() }).pipe();
  }
  addProductThirdStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/add-product-third-step', input, { headers: this.getHeaders() }).pipe();
  }
  editProductThirdStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/edit-product-third-step', input, { headers: this.getHeaders() }).pipe();
  }
  addProductLastStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/add-product-last-step', input, { headers: this.getHeaders() }).pipe();
  }
  editProductLastStep(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/edit-product-last-step', input, { headers: this.getHeaders() }).pipe();
  }
  updateUserImage(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/user', input, { headers: this.getHeaders() }).pipe();
  }
  getSignUp(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/signup', input).pipe();
  }
  getSelling() {
    return this.http.get(`${this.apiUrl}` + 'api/selling-screen', { headers: this.getHeaders() }).pipe();
  }
  wishListProduct(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/wishlist-products', input, { headers: this.getHeaders() }).pipe();
  }
  markAsSold(productId: any) {
    return this.http.get(`${this.apiUrl}` + 'api/mark-product-sold/' + productId, { headers: this.getHeaders() }).pipe();
  }
  acceptOffer(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/accept-offer', input, { headers: this.getHeaders() }).pipe();
  }
  rejectOffer(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/reject-offer', input, { headers: this.getHeaders() }).pipe();
  }
  placeBid(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/place-bid', input, { headers: this.getHeaders() }).pipe();
  }
  getUserInfo(userId: any) {
    return this.http.get(`${this.apiUrl}` + 'api/user/info/' + userId, { headers: this.getHeaders() }).pipe();
  }
  getAllProducts(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/get-all-products', input, { headers: this.getHeaders() }).pipe();
  }
  deleteProductImage(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/delete-image', input, { headers: this.getHeaders() }).pipe();
  }
  udpateProductImage(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/upload-image', input, { headers: this.getHeaders() }).pipe();
  }
  getNotification(userId: any) {
    return this.http.get(`${this.apiUrl}` + 'api/get/user/all/notifications/' + userId, { headers: this.getHeaders() }).pipe();
  }
  customLink(input: any) {
    return this.http.post(`${this.apiUrl}` + 'api/update/custom/link', input, { headers: this.getHeaders() }).pipe();
  }
  whoBought(input: any){
    return this.http.post(`${this.apiUrl}` + 'api/who-bought', input, { headers: this.getHeaders() }).pipe();
  }
}
