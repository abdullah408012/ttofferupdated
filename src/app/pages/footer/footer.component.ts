import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
