import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuildingComponent } from './building/building.component';
import { FloorsComponent } from './floors/floors.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BuildingComponent,FloorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ArboxElevatorAssignment';

  
}
