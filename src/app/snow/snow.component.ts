import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  NgZone
} from '@angular/core';

interface Snowflake {
  x: number;
  y: number;
  r: number;
  speed: number;
  wind: number;
  rotation: number;
  rotationSpeed: number;
}

@Component({
  selector: 'app-snow',
  imports: [],
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.css'],
})
export class SnowComponent implements AfterViewInit, OnDestroy {

  @ViewChild('snowCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private flakes: Snowflake[] = [];
  private animationId = 0;

  private readonly FLAKE_COUNT = 60;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit() {
    // Run outside Angular change detection
    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();
      this.createFlakes();
      this.animate();
      window.addEventListener('resize', this.resize);
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
  }

  private resize = () => {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private createFlakes() {
    this.flakes = Array.from({ length: this.FLAKE_COUNT }, () => {
      const size = Math.random() * 1 + 1;

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: size,
        speed: Math.random() * 0.6 + 0.1,
        wind: Math.random() * 0.3 - 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.01 - 0.005
      };
    });
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const f of this.flakes) {
      f.y += f.speed;
      f.x += f.wind + Math.sin(f.y * 0.01) * 0.3;
      f.rotation += f.rotationSpeed;

      if (f.y > canvas.height) {
        f.y = -10;
        f.x = Math.random() * canvas.width;
      }

      if (f.x > canvas.width) f.x = 0;
      if (f.x < 0) f.x = canvas.width;

      this.drawSnowflake(f.x, f.y, f.r, f.rotation);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private drawSnowflake(x: number, y: number, r: number, rotation: number) {
    const arms = 6;
    const angle = (Math.PI * 2) / arms;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = Math.max(1, r * 0.4);

    for (let i = 0; i < arms; i++) {
      this.ctx.rotate(angle);

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, r * 4);

      // branches
      this.ctx.moveTo(0, r * 2.5);
      this.ctx.lineTo(r, r * 2);
      this.ctx.moveTo(0, r * 2.5);
      this.ctx.lineTo(-r, r * 2);

      this.ctx.stroke();
    }

    this.ctx.restore();
  }
}