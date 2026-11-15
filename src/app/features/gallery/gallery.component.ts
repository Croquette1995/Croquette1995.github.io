import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { GallerySectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';
import { MotionHoverDirective } from '../../shared/motion/motion-hover.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    TranslocoPipe, 
    IconComponent, 
    MotionScrollDirective, 
    MotionPressDirective, 
    MotionHoverDirective
  ],
  template: `
    <section id="galerie" class="py-20 lg:py-28 bg-sand-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12" appMotionScroll>
          <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {{ 'gallery.badge' | transloco }}
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {{ 'gallery.title' | transloco }}
          </h2>
          <p class="text-stone-600 text-lg">
            {{ 'gallery.subtitle' | transloco }}
          </p>
        </div>

        <!-- Category Filters -->
        <div class="flex items-center justify-center flex-wrap gap-2 mb-10" appMotionScroll [delay]="0.1">
          @for (filter of categories; track filter.id) {
            <button
              type="button"
              appMotionPress
              (click)="selectCategory(filter.id)"
              [class]="vm().activeCategory() === filter.id ? 'bg-terracotta-700 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-sand-200/80 border border-sand-200'"
              class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              {{ filter.labelKey | transloco }}
            </button>
          }
        </div>

        <!-- Horizontal Snap-Scroll Carousel -->
        <div class="relative" appMotionScroll [delay]="0.2">
          <!-- Carousel Controls & Counter -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-semibold text-stone-500">
              {{ vm().photos().length }} {{ 'gallery.filters.' + vm().activeCategory() | transloco }}
            </span>

            @if (vm().photos().length > 1) {
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  appMotionPress
                  (click)="scrollCarousel(-1)"
                  [attr.aria-label]="'gallery.previousSlide' | transloco"
                  class="w-10 h-10 rounded-full bg-white hover:bg-sand-100 text-stone-800 border border-sand-200 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  <app-icon name="chevron-left" [size]="20" />
                </button>
                <button
                  type="button"
                  appMotionPress
                  (click)="scrollCarousel(1)"
                  [attr.aria-label]="'gallery.nextSlide' | transloco"
                  class="w-10 h-10 rounded-full bg-white hover:bg-sand-100 text-stone-800 border border-sand-200 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  <app-icon name="chevron-right" [size]="20" />
                </button>
              </div>
            }
          </div>

          <!-- Scrollable Track -->
          <div
            #carouselTrack
            class="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
          >
            @for (photo of vm().photos(); track photo.id) {
              <div
                appMotionHover
                (click)="vm().onOpenLightbox(photo)"
                class="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)] group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white border border-sand-200 cursor-pointer aspect-[4/3]"
              >
                <img
                  [src]="photo.src"
                  [alt]="'gallery.photos.' + photo.id | transloco"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span class="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                    {{ 'gallery.filters.' + photo.category | transloco }}
                  </span>
                  <p class="text-white font-medium text-sm drop-shadow-xs line-clamp-2">
                    {{ 'gallery.photos.' + photo.id | transloco }}
                  </p>
                  <div class="mt-2 inline-flex items-center gap-1.5 text-xs text-stone-200">
                    <app-icon name="external-link" [size]="14" />
                    <span>{{ 'gallery.viewFullscreen' | transloco }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class GalleryComponent {
  readonly vm = input.required<GallerySectionViewModel>();
  readonly carouselTrack = viewChild<ElementRef<HTMLElement>>('carouselTrack');
  readonly activeCategory = signal<string>('all');

  readonly categories = [
    { id: 'all' as const, labelKey: 'gallery.filters.all' },
    { id: 'interior' as const, labelKey: 'gallery.filters.interior' },
    { id: 'outdoor' as const, labelKey: 'gallery.filters.outdoor' },
    { id: 'village' as const, labelKey: 'gallery.filters.village' },
    { id: 'nerja' as const, labelKey: 'gallery.filters.nerja' }
  ];

  selectCategory(category: 'all' | 'interior' | 'outdoor' | 'village' | 'nerja'): void {
    this.activeCategory.set(category);
    this.vm().onSelectCategory(category);
    const track = this.carouselTrack()?.nativeElement;
    if (track) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  scrollCarousel(direction: -1 | 1): void {
    const track = this.carouselTrack()?.nativeElement;
    if (!track) return;
    const step = Math.max(track.clientWidth * 0.85, 280);
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
}
