import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ElevatorComponent } from '../elevator-icon/elevator.component';
import { FloorsComponent } from '../floors/floors.component';
import { FormsModule } from '@angular/forms';
import { ElevatorService } from '../elevator.service';


@Component({
  selector: 'app-building',
  standalone: true,
  imports: [CommonModule, ElevatorComponent,FloorsComponent,FormsModule],
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss',
  providers: [ElevatorService]
})

export class BuildingComponent {
  protected numberOfFloors:number = 10;
  protected numberOfElevators:number = 5;
}

