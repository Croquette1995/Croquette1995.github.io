import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SituationSectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionHoverDirective } from '../../shared/motion/motion-hover.directive';

@Component({
  selector: 'app-situation-guide',
  standalone: true,
  imports: [TranslocoPipe, IconComponent, MotionScrollDirective, MotionHoverDirective],
  template: `
    <section id="situation" class="py-20 lg:py-28 bg-white border-t border-sand-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" appMotionScroll>
          <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {{ 'situation.badge' | transloco }}
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {{ 'situation.title' | transloco }}
          </h2>
          <p class="text-stone-600 text-lg">
            {{ 'situation.subtitle' | transloco }}
          </p>
        </div>

        @if (vm().situation(); as sit) {
          <!-- Capistrano & Nerja Dual Showcase -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            
            <!-- Capistrano Village -->
            <div class="bg-sand-50 rounded-3xl p-8 border border-sand-200 shadow-sm flex flex-col justify-between" appMotionScroll>
              <div>
                <div class="inline-flex items-center gap-2 text-xs font-bold text-terracotta-700 uppercase tracking-widest mb-3">
                  <app-icon name="home" [size]="16" />
                  <span>{{ 'situation.capistrano.badge' | transloco }}</span>
                </div>
                <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
                  {{ 'situation.capistrano.title' | transloco }}
                </h3>
                <p class="text-stone-700 leading-relaxed mb-4">
                  {{ 'situation.capistrano.text1' | transloco }}
                </p>
                <p class="text-stone-700 leading-relaxed mb-6">
                  {{ 'situation.capistrano.text2' | transloco }}
                </p>
              </div>

              <!-- Mini gallery capistrano -->
              <div class="grid grid-cols-3 gap-3">
                @for (img of sit.capistrano.images.slice(0, 3); track img) {
                  <div class="rounded-xl overflow-hidden aspect-[4/3] border border-sand-200 shadow-xs">
                    <img [src]="img" alt="El Capistrano" class="w-full h-full object-cover" loading="lazy" />
                  </div>
                }
              </div>
            </div>

            <!-- Nerja City -->
            <div class="bg-sand-50 rounded-3xl p-8 border border-sand-200 shadow-sm flex flex-col justify-between" appMotionScroll [delay]="0.15">
              <div>
                <div class="inline-flex items-center gap-2 text-xs font-bold text-ocean-600 uppercase tracking-widest mb-3">
                  <app-icon name="waves" [size]="16" />
                  <span>Costa del Sol</span>
                </div>
                <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
                  {{ 'situation.nerja.title' | transloco }}
                </h3>
                <p class="text-stone-700 leading-relaxed mb-4">
                  {{ 'situation.nerja.text1' | transloco }}
                </p>
                <p class="text-stone-700 leading-relaxed mb-6">
                  {{ 'situation.nerja.text2' | transloco }}
                </p>
              </div>

              <!-- Mini gallery nerja -->
              <div class="grid grid-cols-3 gap-3">
                @for (img of sit.nerja.images.slice(0, 3); track img) {
                  <div class="rounded-xl overflow-hidden aspect-[4/3] border border-sand-200 shadow-xs">
                    <img [src]="img" alt="Nerja" class="w-full h-full object-cover" loading="lazy" />
                  </div>
                }
              </div>
            </div>

          </div>

          <!-- Must-See Highlights Grid (10 Incontournables) -->
          <div appMotionScroll [delay]="0.2">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {{ 'situation.mustSeeTitle' | transloco }}
                </h3>
                <p class="text-stone-600 text-sm mt-1">
                  {{ 'situation.mustSeeSubtitle' | transloco }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              @for (spot of vm().mustSeeSpots(); track spot.id) {
                <div 
                  appMotionHover
                  class="bg-sand-50 rounded-2xl overflow-hidden border border-sand-200 shadow-xs hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div class="relative aspect-[16/10] overflow-hidden">
                    <img 
                      [src]="spot.image" 
                      [alt]="'situation.spotsList.' + spot.id + '.title' | transloco" 
                      class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span class="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full">
                      {{ 'situation.spotsList.' + spot.id + '.tag' | transloco }}
                    </span>
                  </div>
                  <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 class="font-serif text-lg font-bold text-stone-900 mb-2">
                        {{ 'situation.spotsList.' + spot.id + '.title' | transloco }}
                      </h4>
                      <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {{ 'situation.spotsList.' + spot.id + '.description' | transloco }}
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class SituationGuideComponent {
  readonly vm = input.required<SituationSectionViewModel>();
}
