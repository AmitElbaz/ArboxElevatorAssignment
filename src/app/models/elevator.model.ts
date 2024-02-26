import { Time } from "@angular/common";
import { ElevatorStatus } from "./elevatorStatus.enum";
import { Stopwatch } from "./stopwatch.moel";

export class Elevator {
  private ElevatorBaseId:string = 'elevator';
  private FloorHeightInPixel: number = 65;  
  private CurrentFloor: number = 0;
  private Id: number = 0;
  private stopwatch  :Stopwatch;
  Available: boolean = true;
  RequestedFloor: number;

  constructor(id: number) {
    this.Id = id;
    this.stopwatch  = new Stopwatch();
  }

  public MoveElevatorToFloor(floorToMove: number, elevator: Elevator): void {
    this.stopwatch.Start();
    const elevatorSvgElement = document.getElementById( this.ElevatorBaseId + this.Id.toString());

    if (elevatorSvgElement) {
      elevator.SetElevatorStyle(this, floorToMove, ElevatorStatus.Waiting);
    }
  }

  public PlayElevetorArrivedToFloorSound(): void {
    const audioPlayer = document.getElementById('audio') as HTMLAudioElement;
    audioPlayer.play();
  }

  public GetCurrentFloor(): number {
    return this.CurrentFloor;
  }

  public SetCurrentFloor(floor: number): void {
    this.CurrentFloor = floor;
  }

  public SetElevatorProperties(elevator: Elevator, floor: number): void {
    //this.stopwatch.getElapsedTime();
    this.stopwatch.Stop();
    elevator.Available = false;
    elevator.RequestedFloor = floor;
  }

  public SetElevatorStyle(elevator: Elevator, floorToMove: number, elevatorStatus: ElevatorStatus): void {
    const elevatorSvgElement = document.getElementById(this.ElevatorBaseId + this.Id.toString());
    const pixelsDistance = floorToMove * this.FloorHeightInPixel;
    const floorsDistance = Math.abs(elevator.CurrentFloor - floorToMove);

    elevatorSvgElement.style.transitionDuration = floorsDistance.toString() + "s";
    elevatorSvgElement.setAttribute('transform', `translate(0 -${pixelsDistance})`); // move the SVG upwards by the specified distance

    // change elevator color by status
    switch (elevatorStatus) {
      case ElevatorStatus.Call: {
        elevatorSvgElement.setAttribute('fill', 'green');
        break;
      }
      case ElevatorStatus.Waiting: {
        elevatorSvgElement.setAttribute('fill', 'red');
        break;
      }    
      case ElevatorStatus.Default: {
        elevatorSvgElement.setAttribute('fill', 'black');
        break;
      }      
    }
  }
}