export class Stopwatch {
    private startTime: number = 0;
    private running: boolean = false;
    private elapsedTime: number = 0;
    private updateTimer: any;
  
    Start() {
      if (!this.running) {
        this.startTime = Date.now() - this.elapsedTime;
        this.running = true;
        this.Update();
      }
    }
  
    Stop() {
      if (this.running) {
        this.running = false;
        clearTimeout(this.updateTimer);
      }
    }
  
    Reset() {
      this.elapsedTime = 0;
      if (!this.running) {
        this.startTime = Date.now();
      }
    }    
  
    private Update() {
      if (this.running) {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateTimer = setTimeout(() => this.Update(), 10); // Update every 10 milliseconds
      }
    }
  
    GetElapsedTime(): number {
      return this.elapsedTime;
    }
  }