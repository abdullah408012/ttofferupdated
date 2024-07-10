import { Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { BodyComponent } from './pages/body/body.component';
import { ProductViewsComponent } from './pages/product-views/product-views.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import { SellingComponent } from './pages/selling/selling.component';
import { WhoBoughtAdComponent } from './pages/who-bought-ad/who-bought-ad.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { AuctionProductComponent } from './pages/auction-product/auction-product.component';
import { AuctionUserProfileComponent } from './pages/auction-user-profile/auction-user-profile.component';

export const routes: Routes = [

    
    {
        path:'',
        redirectTo:'body',
        pathMatch:'full'
    },
    {
        path:'header',
        component:HeaderComponent
    },
    {
        path:'body',
        component:BodyComponent
    },
    // {
    //     path:'productView',
    //     component:ProductViewsComponent
    // },

    {
        path:'productDetails/:id',
        component:ProductDetailsComponent
    },
    {
        path:'profilePage/:id',
        component:ProfilePageComponent
    },
    {
        path:'profilePageBy/:id/:name',
        component:ProfilePageComponent
    },
    {
        path:'catagories/:id',
        component: CategoriesComponent
    },
    {
        path:'chatBox',
        component: ChatBoxComponent
    },
    {
        path:'selling/:id',
        component: SellingComponent
    },
    {
        path:'whoBoughtAd/:id',
        component: WhoBoughtAdComponent
    },
    {
        path:'reviewPage',
        component: ReviewPageComponent
    },
    {
        path:'auctionProduct/:id',
        component: AuctionProductComponent
    },
    {
        path:'auctionUserProfile/:id',
        component: AuctionUserProfileComponent
    },
    {
        path:'product-views/:id',
        component:ProductViewsComponent
    }
];
