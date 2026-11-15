import { Component, input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { UsefulLinksSectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';

@Component({
  selector: 'app-useful-links',
  standalone: true,
  imports: [TranslocoPipe, IconComponent, MotionScrollDirective, MotionPressDirective],
  template: `
    <section id="liens" class="py-20 lg:py-28 bg-white border-t border-sand-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" appMotionScroll>
          <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {{ 'links.badge' | transloco }}
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {{ 'links.title' | transloco }}
          </h2>
          <p class="text-stone-600 text-lg">
            {{ 'links.subtitle' | transloco }}
          </p>
        </div>

        @if (vm().directory(); as dir) {
          
          <!-- Restaurant PDF Featured Banner -->
          @if (dir.restaurantGuide; as guide) {
            <div class="bg-gradient-to-r from-sand-100 via-sand-50 to-sand-100 rounded-3xl p-8 border border-sand-200/90 shadow-sm mb-16 flex flex-col md:flex-row items-center justify-between gap-8" appMotionScroll>
              <div class="flex items-center gap-6">
                <div class="w-20 h-20 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
                  <img [src]="guide.coverImage" alt="Restaurants Nerja" class="w-full h-full object-cover" />
                </div>
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-terracotta-700">{{ 'links.localSelection' | transloco : { date: guide.date } }}</span>
                  <h3 class="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                    {{ 'links.restaurants' | transloco }}
                  </h3>
                  <p class="text-stone-600 text-sm mt-1 max-w-xl">
                    {{ 'links.restaurantsDesc' | transloco }}
                  </p>
                </div>
              </div>

              <a 
                [href]="guide.pdfUrl" 
                target="_blank"
                download
                appMotionPress
                class="inline-flex items-center gap-2.5 bg-terracotta-700 hover:bg-terracotta-800 text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-[color,background-color,border-color,box-shadow] duration-200 shrink-0"
              >
                <app-icon name="download" [size]="18" />
                <span>{{ 'links.downloadPdf' | transloco }}</span>
              </a>
            </div>
          }

          <!-- Category filter buttons -->
          <div class="flex items-center justify-center flex-wrap gap-2 mb-10" appMotionScroll [delay]="0.1">
            @for (cat of categories; track cat.id) {
              <button
                type="button"
                appMotionPress
                (click)="selectedCategory.set(cat.id)"
                [class]="selectedCategory() === cat.id ? 'bg-terracotta-700 text-white shadow-xs' : 'bg-sand-100 text-stone-700 hover:bg-sand-200'"
                class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer"
              >
                {{ cat.labelKey | transloco }}
              </button>
            }
          </div>

          <!-- Links Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" appMotionScroll [delay]="0.2">
            @for (link of filteredLinks(dir); track link.id) {
              <a 
                [href]="link.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-sand-50/80 hover:bg-white rounded-2xl p-5 border border-sand-200 hover:border-terracotta-300 shadow-xs hover:shadow-md transition-[color,background-color,border-color,box-shadow] duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 rounded-xl bg-white text-terracotta-700 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                      <app-icon [name]="link.iconName" [size]="20" />
                    </div>
                    <span class="text-stone-400 group-hover:text-terracotta-600 transition-colors">
                      <app-icon name="external-link" [size]="16" />
                    </span>
                  </div>
                  <h4 class="font-serif text-lg font-bold text-stone-900 group-hover:text-terracotta-800 transition-colors">
                    {{ 'links.items.' + link.id + '.name' | transloco }}
                  </h4>
                  <p class="text-xs text-stone-500 mt-1">
                    {{ 'links.items.' + link.id + '.note' | transloco }}
                  </p>
                </div>

                <div class="mt-4 pt-3 border-t border-sand-200/60 flex items-center justify-between text-xs text-stone-500">
                  <span>{{ 'links.categories.' + link.category | transloco }}</span>
                  <span class="text-terracotta-700 font-semibold group-hover:underline">{{ 'links.visitSite' | transloco }}</span>
                </div>
              </a>
            }
          </div>

        }

      </div>
    </section>
  `
})
export class UsefulLinksComponent {
  readonly vm = input.required<UsefulLinksSectionViewModel>();
  readonly selectedCategory = signal<string>('all');

  readonly categories = [
    { id: 'all', labelKey: 'links.usefulLinks' },
    { id: 'transports', labelKey: 'links.transports' },
    { id: 'flights', labelKey: 'links.flights' },
    { id: 'carRental', labelKey: 'links.carRental' },
    { id: 'tourism', labelKey: 'links.tourism' }
  ];

  filteredLinks(dir: any) {
    if (this.selectedCategory() === 'all') {
      return dir.links;
    }
    return dir.links.filter((l: any) => l.category === this.selectedCategory());
  }
}
