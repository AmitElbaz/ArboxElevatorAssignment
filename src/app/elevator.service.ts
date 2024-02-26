import { Injectable } from '@angular/core';
import { Elevator } from './models/elevator.model';
import { ElevatorStatus } from './models/elevatorStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {
  //#region props

  private elevators: Array<Elevator>;
  private elevatorCallsQueue: Array<number>;
  private elevatorsAmount = 0;

  //#endregion

  //#region Ctor

  constructor() {
    this.elevators = new Array<Elevator>;
    this.elevatorCallsQueue = new Array<number>;
  }

  //#endregion

  //#region Public Methods

  public GetElevators():Array<Elevator> {
    return this.elevators;
  }

  public GetElevatorsAmount():number{
    return this.elevatorsAmount;
  }

  public BuildElevatorsAmount(elevatorsAmount:number):Array<Elevator>{
    if(elevatorsAmount == null){
      elevatorsAmount = 1;
    }

    this.elevatorsAmount = elevatorsAmount;
    this.elevators = []
    
    for (let i = 0; i < elevatorsAmount; i++) {
      this.elevators.push(new Elevator(i));
    }

    return this.elevators;
  }

  public AddElevatorCall(floor: number):void {
    let elevatorsOnThierWayToFloor = this.elevators.filter(e => e.RequestedFloor == floor);
    let elevatorsInCurrentFloorAsRequested = this.elevators.filter(e => e.GetCurrentFloor() == floor);

    // if there is no elevator that in the requested floor 
    // and there is no elevator on the way to the requested floor
    if ((elevatorsOnThierWayToFloor.length == 0 && elevatorsInCurrentFloorAsRequested.length == 0) || floor == 0) {
        this.SetCallButtonStyle(ElevatorStatus.Waiting,floor);
        this.elevatorCallsQueue.unshift(floor);
        this.HandleElevatorCall();
    }
  }

  //#endregion

  //#region Private Methods

  private GetElevatorCall():number {        
    return this.elevatorCallsQueue.pop();
  }

  private GetClosetElevator(floor: number): Elevator {
    let closestElevator: Elevator | null = null;
    let minDistance = Infinity;
    let availableElevators = this.elevators.filter(elevator => elevator.Available == true);

    if (!availableElevators)
      return null;

    if (availableElevators.length == 1) {
      closestElevator = availableElevators[0];
    }
    else {
      availableElevators.forEach(e => {
        const distance = Math.abs(e.GetCurrentFloor() - floor);
        if (distance < minDistance) {
          minDistance = distance;
          closestElevator = e;
        }
      });
    }

    return closestElevator;
  }

  private HandleElevatorCall():void {
    let requestedElevatorFloor = 0;

    // if there is calls in the queue we handle, othewise we exiting the function
    if (this.elevatorCallsQueue.length > 0) {
      requestedElevatorFloor = this.GetElevatorCall()      
    }
    else {
      return;
    }

    let closestElevator: Elevator = this.GetClosetElevator(requestedElevatorFloor);

    if (closestElevator) {
      this.SetCallButtonStyle(ElevatorStatus.Call,closestElevator.GetCurrentFloor())
      closestElevator.MoveElevatorToFloor(requestedElevatorFloor, closestElevator);
    }
    else {
      this.elevatorCallsQueue.push(requestedElevatorFloor); // Add request to queue      
      return;
    }

    closestElevator.SetElevatorProperties(closestElevator, requestedElevatorFloor);
    let floorsDistance = Math.abs(closestElevator.GetCurrentFloor() - requestedElevatorFloor);

    setTimeout(() => {
      closestElevator.SetCurrentFloor(requestedElevatorFloor);
      closestElevator.PlayElevetorArrivedToFloorSound();
      closestElevator.SetElevatorStyle(closestElevator,requestedElevatorFloor, ElevatorStatus.Call);
      this.SetCallButtonStyle(ElevatorStatus.Arrived,requestedElevatorFloor)
      this.HandleNextElevatorCall(closestElevator);
    }, floorsDistance * 1000);
  }    

  private HandleNextElevatorCall(elevator: Elevator): void {
    setTimeout(() => {      
      elevator.Available = true;
      elevator.SetElevatorStyle(elevator,elevator.GetCurrentFloor(), ElevatorStatus.Default);
      if (this.elevatorCallsQueue.length > 0) {
        this.HandleElevatorCall();
      }
    }, 2000)
  }

  private SetCallButtonStyle(elevatorStatus: ElevatorStatus,floor:number):void {
    const callButton = document.getElementById('callButton' + floor.toString()) as HTMLButtonElement;
    callButton.style.border = "0";
    callButton.style.color = "white";

    switch (elevatorStatus) {
      case ElevatorStatus.Call: {
        callButton.style.backgroundColor = "#2ea44f";
        callButton.innerText = "Call";
        break;
      }
      case ElevatorStatus.Waiting: {
        callButton.style.backgroundColor = "red";
        callButton.innerText = "Waiting";
        break;
      }
      case ElevatorStatus.Arrived: {
        callButton.style.backgroundColor = "white";
        callButton.style.color = "#2ea44f";
        callButton.innerText = "Arrived";
        callButton.style.border = "3px solid #2ea44f";
        break;
      }
      default: {
        callButton.style.backgroundColor = "black";
        break;
      }
    }
  }

  //#endregion
}