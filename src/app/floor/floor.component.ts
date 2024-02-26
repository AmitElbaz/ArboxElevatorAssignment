import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Elevator } from '../models/elevator.model';
import { ElevatorService } from '../elevator.service';
import { ElevatorComponent } from '../elevator-icon/elevator.component';
import { FloorButtonComponent } from '../floor-button/floor-button.component';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [ElevatorComponent, FloorButtonComponent],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.scss',
  providers: []
})
export class FloorComponent {
  @Input() floorId: number;
  @Input() numberOfElevators: number = 1; // the number of elevator shaft in the floor

  elevators: Elevator[] = [];
  isElevatorOnFloor: boolean = false;

  constructor(public elevatorService: ElevatorService,private cdRef: ChangeDetectorRef) { }

  protected GetFloorDescription(): string {
    if (this.floorId == 0)
      return "Ground Floor";
    else if (this.floorId == 1)
      return "1st";
    else if (this.floorId == 2)
      return "2nd";
    else if (this.floorId == 3)
      return "3rd";
    else
      return this.floorId + "th";
  }

  ngOnChanges() {
    if (this.numberOfElevators > 0 ) {
      this.elevators = [];
      this.elevators = this.elevatorService.GetElevators()      
    }
  }

  ngAfterViewChecked() {
    let elevatorsAmount = this.elevatorService.GetElevatorsAmount();

    if (elevatorsAmount != this.numberOfElevators){
      this.elevators = this.elevatorService.BuildElevatorsAmount(this.numberOfElevators)
    }

    this.cdRef.detectChanges();
  }
}
