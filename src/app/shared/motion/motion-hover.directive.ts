import { Directive, ElementRef, HostListener, inject, input, OnDestroy } from '@angular/core';
import { animate } from 'motion';

@Directive({
  selector: '[appMotionHover]',
  standalone: true
})
export class MotionHoverDirective implements OnDestroy {
  private el = inject(ElementRef);
  readonly translateY = input<number>(-4);

  private currentAnimation: ReturnType<typeof animate> | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.currentAnimation?.stop();
    this.currentAnimation = animate(
      this.el.nativeElement,
      { transform: `translateY(${this.translateY()}px)` },
      { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.currentAnimation?.stop();
    this.currentAnimation = animate(
      this.el.nativeElement,
      { transform: 'translateY(0px)' },
      { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
    );
  }

  ngOnDestroy(): void {
    this.currentAnimation?.stop();
  }
}
