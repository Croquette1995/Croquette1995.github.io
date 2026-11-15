import { Directive, ElementRef, HostListener, inject, input, OnDestroy } from '@angular/core';
import { animate } from 'motion';

@Directive({
  selector: '[appMotionPress]',
  standalone: true
})
export class MotionPressDirective implements OnDestroy {
  private el = inject(ElementRef);
  readonly scaleFactor = input<number>(0.96);

  private isPressed = false;
  private currentAnimation: ReturnType<typeof animate> | null = null;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    this.isPressed = true;
    this.currentAnimation?.stop();
    this.currentAnimation = animate(
      this.el.nativeElement,
      { transform: `scale(${this.scaleFactor()})` },
      { duration: 0.12, ease: 'easeOut' }
    );
  }

  @HostListener('pointerup')
  @HostListener('pointerleave')
  @HostListener('pointercancel')
  onPointerUp(): void {
    if (!this.isPressed) {
      return;
    }
    this.isPressed = false;
    this.currentAnimation?.stop();
    this.currentAnimation = animate(
      this.el.nativeElement,
      { transform: 'scale(1)' },
      { duration: 0.16, ease: [0.25, 1, 0.5, 1] }
    );
  }

  ngOnDestroy(): void {
    this.currentAnimation?.stop();
  }
}
