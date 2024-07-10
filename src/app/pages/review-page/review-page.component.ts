import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-review-page',
    standalone: true,
    templateUrl: './review-page.component.html',
    styleUrl: './review-page.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class ReviewPageComponent {

}
