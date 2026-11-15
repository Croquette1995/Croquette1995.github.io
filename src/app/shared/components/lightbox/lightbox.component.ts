import { Component, HostListener, input, output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { GalleryPhoto } from '../../../core/models/entities/apartment.entity';
import { IconComponent } from '../icon/icon.component';
import { MotionPressDirective } from '../../motion/motion-press.directive';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [IconComponent, MotionPressDirective, TranslocoPipe],
  template: `
    @if (activePhoto(); as photo) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 select-none animate-fade-in"
        role="dialog"
        aria-modal="true"
        (click)="onBackdropClick($event)"
      >
        <!-- Top bar: counter & close button -->
        <div class="absolute top-4 left-4 right-4 flex items-center justify-between text-white/80 z-10">
          <div class="text-sm font-medium tracking-wide">
            {{ currentIndex() + 1 }} / {{ totalPhotos() }}
          </div>
          <button
            type="button"
            (click)="close.emit()"
            appMotionPress
            class="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            [attr.aria-label]="'gallery.close' | transloco"
          >
            <app-icon name="x" [size]="24" />
          </button>
        </div>

        <!-- Previous button -->
        <button
          type="button"
          (click)="prevPhoto($event)"
          appMotionPress
          class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10 hidden sm:flex items-center justify-center"
          [attr.aria-label]="'gallery.prev' | transloco"
        >
          <app-icon name="chevron-left" [size]="28" />
        </button>

        <!-- Main Photo Container -->
        <div class="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2">
          <img 
            [src]="photo.src" 
            [alt]="'gallery.photos.' + photo.id | transloco" 
            class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
          />
          <p class="mt-4 text-white/90 text-center text-sm font-medium">
            {{ 'gallery.photos.' + photo.id | transloco }}
          </p>
        </div>

        <!-- Next button -->
        <button
          type="button"
          (click)="nextPhoto($event)"
          appMotionPress
          class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10 hidden sm:flex items-center justify-center"
          [attr.aria-label]="'gallery.next' | transloco"
        >
          <app-icon name="chevron-right" [size]="28" />
        </button>

        <!-- Bottom mobile controls -->
        <div class="absolute bottom-6 flex sm:hidden items-center gap-6 z-10">
          <button
            type="button"
            (click)="prevPhoto($event)"
            class="p-3 rounded-full bg-white/15 text-white"
          >
            <app-icon name="chevron-left" [size]="24" />
          </button>
          <button
            type="button"
            (click)="nextPhoto($event)"
            class="p-3 rounded-full bg-white/15 text-white"
          >
            <app-icon name="chevron-right" [size]="24" />
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class LightboxComponent {
  readonly activePhoto = input<GalleryPhoto | null>(null);
  readonly allPhotos = input<GalleryPhoto[]>([]);
  readonly close = output<void>();
  readonly selectPhoto = output<GalleryPhoto>();

  currentIndex(): number {
    const photo = this.activePhoto();
    if (!photo) return 0;
    return this.allPhotos().findIndex(p => p.id === photo.id);
  }

  totalPhotos(): number {
    return this.allPhotos().length;
  }

  prevPhoto(event?: MouseEvent): void {
    event?.stopPropagation();
    const photos = this.allPhotos();
    if (!photos.length) return;
    const current = this.currentIndex();
    const nextIdx = (current - 1 + photos.length) % photos.length;
    this.selectPhoto.emit(photos[nextIdx]);
  }

  nextPhoto(event?: MouseEvent): void {
    event?.stopPropagation();
    const photos = this.allPhotos();
    if (!photos.length) return;
    const current = this.currentIndex();
    const nextIdx = (current + 1) % photos.length;
    this.selectPhoto.emit(photos[nextIdx]);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'IMG') {
      this.close.emit();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.activePhoto()) return;
    if (event.key === 'Escape') {
      this.close.emit();
    } else if (event.key === 'ArrowLeft') {
      this.prevPhoto();
    } else if (event.key === 'ArrowRight') {
      this.nextPhoto();
    }
  }
}
