import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FloorComponent } from '../floor/floor.component';

@Component({
  selector: 'app-floors',
  standalone: true,
  imports: [FloorComponent],
  templateUrl: './floors.component.html',
  styleUrl: './floors.component.scss'
})
export class FloorsComponent {
  @Input() numberOfFloors: number = 0;  
  @Input() numberOfElevators: number = 0;  
  protected floors: number[] = []

  constructor(private cdRef: ChangeDetectorRef){}

  BuildFloors():void{    
    this.floors = Array.from({ length: this.numberOfFloors }, (_, index) => this.numberOfFloors - 1 - index);
  }
  
  ngAfterViewChecked() {
    if (this.numberOfFloors > 0){
      this.BuildFloors();
    }

    this.cdRef.detectChanges();
  }
  

}
