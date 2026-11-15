import { Component, input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ApartmentTourSectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';

@Component({
  selector: 'app-apartment-tour',
  standalone: true,
  imports: [TranslocoPipe, IconComponent, MotionScrollDirective, MotionPressDirective],
  template: `
    <section id="appartement" class="py-20 lg:py-28 bg-white border-y border-sand-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-14" appMotionScroll>
          <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {{ 'apartment.badge' | transloco }}
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {{ 'apartment.title' | transloco }}
          </h2>
          <p class="text-stone-600 text-lg">
            {{ 'apartment.subtitle' | transloco }}
          </p>
        </div>

        @if (vm().apartment(); as apt) {
          <!-- Tabs Navigation -->
          <div class="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" appMotionScroll [delay]="0.1">
            @for (tab of apt.features; track tab.id) {
              <button
                type="button"
                appMotionPress
                (click)="selectTab(tab.id)"
                [class]="activeTabId() === tab.id ? 'bg-terracotta-700 text-white shadow-md' : 'bg-sand-100 text-stone-700 hover:bg-sand-200'"
                class="px-5 py-3 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex items-center gap-2.5 cursor-pointer"
              >
                <app-icon [name]="tab.icon" [size]="18" />
                <span>{{ tab.titleKey | transloco }}</span>
              </button>
            }
          </div>

          <!-- Active Tab Content -->
          @for (tab of apt.features; track tab.id) {
            @if (activeTabId() === tab.id) {
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" appMotionScroll [delay]="0.2">
                
                <!-- Details & description items -->
                <div class="lg:col-span-6 flex flex-col gap-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                      <app-icon [name]="tab.icon" [size]="22" />
                    </div>
                    <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      {{ tab.titleKey | transloco }}
                    </h3>
                  </div>

                  <div class="space-y-4">
                    @for (itemKey of tab.items; track itemKey) {
                      <div class="flex items-start gap-3.5 bg-sand-50/80 p-4 rounded-2xl border border-sand-200/60">
                        <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <app-icon name="check" [size]="14" />
                        </div>
                        <p class="text-stone-700 leading-relaxed text-sm sm:text-base">
                          {{ itemKey | transloco }}
                        </p>
                      </div>
                    }
                  </div>

                  <!-- Quick summary pill -->
                  <div class="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
                    <span class="bg-sand-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <app-icon name="wind" [size]="14" class="text-terracotta-600" />
                      {{ 'apartment.quickSummary.ac' | transloco }}
                    </span>
                    <span class="bg-sand-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <app-icon name="wifi" [size]="14" class="text-terracotta-600" />
                      {{ 'apartment.quickSummary.wifi' | transloco }}
                    </span>
                    <span class="bg-sand-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <app-icon name="waves" [size]="14" class="text-terracotta-600" />
                      {{ 'apartment.quickSummary.pools' | transloco }}
                    </span>
                  </div>
                </div>

                <!-- Uniform-size Carousel for this tab -->
                <div class="lg:col-span-6">
                  @if (tab.images.length > 0) {
                    @let safeIdx = currentImageIndex() < tab.images.length ? currentImageIndex() : 0;
                    <div class="space-y-3">
                      <div class="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md border border-sand-200 bg-sand-100 group">
                        <img
                          [src]="tab.images[safeIdx]"
                          [alt]="'apartment.photoAlt' | transloco"
                          class="w-full h-full object-cover"
                        />

                        @if (tab.images.length > 1) {
                          <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-xs text-white text-xs font-semibold">
                            {{ safeIdx + 1 }} / {{ tab.images.length }}
                          </div>

                          <button
                            type="button"
                            appMotionPress
                            (click)="prevImage(tab.images.length)"
                            [attr.aria-label]="'gallery.previousSlide' | transloco"
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <app-icon name="chevron-left" [size]="20" />
                          </button>

                          <button
                            type="button"
                            appMotionPress
                            (click)="nextImage(tab.images.length)"
                            [attr.aria-label]="'gallery.nextSlide' | transloco"
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <app-icon name="chevron-right" [size]="20" />
                          </button>
                        }
                      </div>

                      @if (tab.images.length > 1) {
                        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                          @for (img of tab.images; track img; let idx = $index) {
                            <button
                              type="button"
                              (click)="currentImageIndex.set(idx)"
                              class="relative w-16 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-colors cursor-pointer"
                              [class]="safeIdx === idx ? 'border-terracotta-600 ring-2 ring-terracotta-200' : 'border-transparent opacity-65 hover:opacity-100'"
                            >
                              <img
                                [src]="img"
                                [alt]="'apartment.photoAlt' | transloco"
                                class="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>

              </div>
            }
          }
        }
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
export class ApartmentTourComponent {
  readonly vm = input.required<ApartmentTourSectionViewModel>();
  readonly activeTabId = signal<string>('general');
  readonly currentImageIndex = signal<number>(0);

  selectTab(tabId: string): void {
    this.activeTabId.set(tabId);
    this.currentImageIndex.set(0);
  }

  prevImage(total: number): void {
    if (total <= 1) return;
    this.currentImageIndex.update(idx => (idx - 1 + total) % total);
  }

  nextImage(total: number): void {
    if (total <= 1) return;
    this.currentImageIndex.update(idx => (idx + 1) % total);
  }
}
