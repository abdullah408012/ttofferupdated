import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from "./pages/categories/categories.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { AuctionProductComponent } from "./pages/auction-product/auction-product.component";
import { AuctionUserProfileComponent } from "./pages/auction-user-profile/auction-user-profile.component";
import { ChatBoxComponent } from "./pages/chat-box/chat-box.component";
import { ReviewPageComponent } from "./pages/review-page/review-page.component";
import { WhoBoughtAdComponent } from "./pages/who-bought-ad/who-bought-ad.component";
import { SellingComponent } from "./pages/selling/selling.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ChatBoxComponent, ProfilePageComponent]
})
export class AppComponent {
  title = 'tt-offer';
}
