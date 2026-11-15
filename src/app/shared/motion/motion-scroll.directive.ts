import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { inView, animate } from 'motion';

@Directive({
  selector: '[appMotionScroll]',
  standalone: true
})
export class MotionScrollDirective implements OnInit {
  private el = inject(ElementRef);

  readonly delay = input<number>(0);
  readonly distance = input<number>(28);
  readonly duration = input<number>(0.65);

  ngOnInit(): void {
    const target = this.el.nativeElement as HTMLElement;
    target.style.opacity = '0';
    target.style.transform = `translateY(${this.distance()}px)`;

    inView(target, () => {
      animate(
        target,
        {
          opacity: [0, 1],
          transform: [`translateY(${this.distance()}px)`, 'translateY(0px)']
        },
        {
          duration: this.duration(),
          delay: this.delay(),
          ease: [0.22, 1, 0.36, 1]
        }
      );
    });
  }
}
