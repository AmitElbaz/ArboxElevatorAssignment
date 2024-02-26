import { Component, Input } from '@angular/core';
import { ElevatorService } from '../elevator.service';

@Component({
  selector: 'app-floor-button',
  standalone: true,
  imports: [],
  templateUrl: './floor-button.component.html',
  styleUrl: './floor-button.component.scss'
})
export class FloorButtonComponent {
  @Input() floorId: number;

  constructor (public elevatorService:ElevatorService){}

  callElevator() {
    this.elevatorService.AddElevatorCall(this.floorId)
  }
}
