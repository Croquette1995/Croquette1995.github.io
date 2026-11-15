import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionPressDirective } from './motion-press.directive';
import * as motionLib from 'motion';

vi.mock('motion', () => ({
  animate: vi.fn(() => ({ stop: vi.fn() })),
  inView: vi.fn()
}));

@Component({
  standalone: true,
  imports: [MotionPressDirective],
  template: `<button appMotionPress type="button">Test</button>`
})
class TestHostComponent {}

describe('MotionPressDirective', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });
  });

  it('does NOT animate on pointerleave if button was never pressed (no hover rebound)', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    btn.dispatchEvent(new Event('pointerleave'));
    expect(motionLib.animate).not.toHaveBeenCalled();
  });

  it('animates scale down on pointerdown and back to 1 on pointerup without overshoot', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    const downEvent = new Event('pointerdown') as PointerEvent;
    Object.defineProperty(downEvent, 'pointerType', { value: 'mouse' });
    Object.defineProperty(downEvent, 'button', { value: 0 });
    btn.dispatchEvent(downEvent);

    expect(motionLib.animate).toHaveBeenCalledTimes(1);
    expect(motionLib.animate).toHaveBeenLastCalledWith(
      btn,
      { transform: 'scale(0.96)' },
      { duration: 0.12, ease: 'easeOut' }
    );

    btn.dispatchEvent(new Event('pointerup'));
    expect(motionLib.animate).toHaveBeenCalledTimes(2);
    expect(motionLib.animate).toHaveBeenLastCalledWith(
      btn,
      { transform: 'scale(1)' },
      { duration: 0.16, ease: [0.25, 1, 0.5, 1] }
    );

    // Subsequent pointerleave after release should NOT re-trigger animation
    btn.dispatchEvent(new Event('pointerleave'));
    expect(motionLib.animate).toHaveBeenCalledTimes(2);
  });
});
