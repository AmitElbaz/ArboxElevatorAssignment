import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elevator',
  standalone: true,
  imports: [],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.scss'
})
export class ElevatorComponent {
  @Input() elevatorId:number | undefined;

}
