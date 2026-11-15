import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { HeroSectionViewModel } from '../../shared/view-models/section.view-model';
import { WeatherWidgetComponent } from '../../shared/components/weather-widget/weather-widget.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    TranslocoPipe, 
    WeatherWidgetComponent, 
    IconComponent, 
    MotionScrollDirective, 
    MotionPressDirective
  ],
  template: `
    <section id="accueil" class="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <!-- Background subtle decorative aura -->
      <div class="absolute top-1/4 -left-48 w-96 h-96 bg-terracotta-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div class="absolute top-1/3 -right-48 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Hero Header -->
        <div class="max-w-3xl" appMotionScroll>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/80 text-terracotta-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <app-icon name="sun" [size]="14" class="text-terracotta-600" />
            <span>{{ 'hero.badge' | transloco }}</span>
          </div>

          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-6">
            {{ 'hero.title' | transloco }}
          </h1>

          <p class="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal mb-8">
            {{ 'hero.description' | transloco }}
          </p>

          <!-- Action buttons -->
          <div class="flex flex-wrap items-center gap-4 mb-12">
            <a 
              href="#appartement" 
              appMotionPress
              class="inline-flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white px-6 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-colors duration-200"
            >
              <span>{{ 'hero.exploreApt' | transloco }}</span>
              <app-icon name="chevron-right" [size]="18" />
            </a>

            <a 
              href="#tarifs" 
              appMotionPress
              class="inline-flex items-center gap-2 bg-white hover:bg-sand-100 text-stone-800 border border-sand-300 px-6 py-3.5 rounded-full font-semibold shadow-xs transition-colors duration-200"
            >
              <app-icon name="calendar" [size]="18" class="text-terracotta-600" />
              <span>{{ 'hero.checkRates' | transloco }}</span>
            </a>
          </div>
        </div>

        <!-- Banner Image & Key Stats Showcase -->
        <div class="relative mt-4" appMotionScroll [delay]="0.15">
          <!-- Featured Banner -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/8] sm:aspect-[16/7] group">
            <img 
              src="/images/banniere.png" 
              alt="Casa Dali Panorama" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
            
            <!-- Banner caption overlay -->
            <div class="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <span class="text-xs uppercase tracking-widest text-amber-200 font-semibold">El Capistrano Village</span>
                <h2 class="font-serif text-xl sm:text-3xl font-bold">Casa Dali · Nerja</h2>
              </div>
              <div class="flex items-center gap-2 text-sm bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                <app-icon name="map-pin" [size]="16" class="text-amber-300" />
                <span>{{ 'hero.location' | transloco }}</span>
              </div>
            </div>
          </div>

          <!-- Floating Weather Widget on desktop -->
          <div class="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:right-8 lg:max-w-md w-full shadow-xl">
            <app-weather-widget />
          </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16" appMotionScroll [delay]="0.25">
          
          <div class="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-sand-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-terracotta-50 flex items-center justify-center text-terracotta-600 shrink-0">
              <app-icon name="users" [size]="22" />
            </div>
            <div>
              <div class="text-xs text-stone-600 uppercase font-semibold tracking-wider">{{ 'hero.statsLabels.capacity' | transloco }}</div>
              <div class="font-serif text-lg font-bold text-stone-900">{{ 'hero.stats.capacity' | transloco }}</div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-sand-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <app-icon name="home" [size]="22" />
            </div>
            <div>
              <div class="text-xs text-stone-600 uppercase font-semibold tracking-wider">{{ 'hero.statsLabels.surface' | transloco }}</div>
              <div class="font-serif text-lg font-bold text-stone-900">{{ 'hero.stats.surface' | transloco }}</div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-sand-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <app-icon name="waves" [size]="22" />
            </div>
            <div>
              <div class="text-xs text-stone-600 uppercase font-semibold tracking-wider">{{ 'hero.statsLabels.relax' | transloco }}</div>
              <div class="font-serif text-lg font-bold text-stone-900">{{ 'hero.stats.pools' | transloco }}</div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-sand-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <app-icon name="umbrella" [size]="22" />
            </div>
            <div>
              <div class="text-xs text-stone-600 uppercase font-semibold tracking-wider">{{ 'hero.statsLabels.proximity' | transloco }}</div>
              <div class="font-serif text-lg font-bold text-stone-900">{{ 'hero.stats.beach' | transloco }}</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  readonly vm = input.required<HeroSectionViewModel>();
}
