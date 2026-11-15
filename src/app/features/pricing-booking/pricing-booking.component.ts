import { Component, inject, input } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PricingSectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';

@Component({
  selector: 'app-pricing-booking',
  standalone: true,
  imports: [
    TranslocoPipe, 
    CdkAccordionModule, 
    IconComponent, 
    MotionScrollDirective, 
    MotionPressDirective
  ],
  template: `
    <section id="tarifs" class="py-20 lg:py-28 bg-sand-100/60 border-t border-sand-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16" appMotionScroll>
          <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-100/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {{ 'pricing.badge' | transloco }}
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            {{ 'pricing.title' | transloco }}
          </h2>
          <p class="text-stone-600 text-lg">
            {{ 'pricing.subtitle' | transloco }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Pricing Inclusions & Conditions (7 cols) -->
          <div class="lg:col-span-7 space-y-6" appMotionScroll>
            
            <!-- Base Rate Highlight Card -->
            <div class="bg-white rounded-3xl p-8 border border-sand-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-stone-600">{{ 'pricing.forTwoGuests' | transloco }}</span>
                <div class="flex items-baseline gap-2 mt-1">
                  <span class="font-serif text-4xl sm:text-5xl font-extrabold text-terracotta-700">350 €</span>
                  <span class="text-stone-600 font-medium text-lg">{{ 'pricing.perWeek' | transloco }}</span>
                </div>
                <p class="text-xs text-stone-600 mt-2">
                  {{ 'pricing.rateFootnote' | transloco }}
                </p>
              </div>

              <div class="bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs text-stone-700 flex flex-col gap-1.5 shrink-0 sm:max-w-xs">
                <div class="font-bold text-stone-900 flex items-center gap-1.5">
                  <app-icon name="shield-check" [size]="16" class="text-emerald-600" />
                  <span>{{ 'pricing.depositTitle' | transloco }}</span>
                </div>
                <div>{{ 'pricing.depositDesc' | transloco }}</div>
              </div>
            </div>

            <!-- Inclusions & Conditions Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- What's included -->
              <div class="bg-white rounded-2xl p-6 border border-sand-200 shadow-xs">
                <div class="flex items-center gap-2.5 text-stone-900 font-bold text-base mb-4">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <app-icon name="check" [size]="16" />
                  </div>
                  <h4>{{ 'pricing.includedTitle' | transloco }}</h4>
                </div>
                <ul class="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  @for (idx of [0, 1, 2, 3, 4, 5]; track idx) {
                    <li class="flex items-center gap-2">
                      <app-icon name="check" [size]="14" class="text-emerald-600 shrink-0" />
                      <span>{{ 'pricing.included.' + idx | transloco }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Booking terms -->
              <div class="bg-white rounded-2xl p-6 border border-sand-200 shadow-xs">
                <div class="flex items-center gap-2.5 text-stone-900 font-bold text-base mb-4">
                  <div class="w-8 h-8 rounded-lg bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
                    <app-icon name="calendar" [size]="16" />
                  </div>
                  <h4>{{ 'pricing.conditionsTitle' | transloco }}</h4>
                </div>
                <ul class="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  @for (idx of [0, 1, 2, 3, 4]; track idx) {
                    <li class="flex items-start gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-terracotta-600 mt-2 shrink-0"></span>
                      <span>{{ 'pricing.conditions.' + idx | transloco }}</span>
                    </li>
                  }
                </ul>
              </div>

            </div>

            <!-- CDK Accordion for Options & FAQ -->
            <cdk-accordion class="block space-y-3">
              <cdk-accordion-item #acc1="cdkAccordionItem" class="block bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-xs">
                <button
                  type="button"
                  (click)="acc1.toggle()"
                  class="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-stone-900 hover:bg-sand-50 transition-colors cursor-pointer"
                >
                  <span class="flex items-center gap-2.5 text-sm sm:text-base">
                    <app-icon name="sparkles" [size]="18" class="text-amber-600" />
                    <span>{{ 'pricing.optionsTitle' | transloco }}</span>
                  </span>
                  <app-icon [name]="acc1.expanded ? 'chevron-left' : 'chevron-right'" [size]="18" class="text-stone-400 rotate-90" />
                </button>
                @if (acc1.expanded) {
                  <div class="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 space-y-2 border-t border-sand-100">
                    @for (idx of [0, 1, 2]; track idx) {
                      <p>• {{ 'pricing.options.' + idx | transloco }}</p>
                    }
                  </div>
                }
              </cdk-accordion-item>
            </cdk-accordion>

          </div>

          <!-- Right Column: Interactive Price Simulator (5 cols) -->
          <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-xl" appMotionScroll [delay]="0.15">
            
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-sand-200">
              <div class="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <app-icon name="calendar" [size]="20" />
              </div>
              <div>
                <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {{ 'pricing.simulator.title' | transloco }}
                </h3>
                <span class="text-xs text-stone-500">{{ 'pricing.simulator.subtitle' | transloco }}</span>
              </div>
            </div>

            <!-- Simulator Controls -->
            <div class="space-y-6">
              
              <!-- Weeks selector -->
              <div>
                <div class="flex items-center justify-between text-sm font-semibold text-stone-800 mb-2">
                  <span>{{ 'pricing.simulator.weeks' | transloco }}</span>
                  <span class="text-terracotta-700 font-bold bg-terracotta-50 px-2.5 py-0.5 rounded-full text-xs">
                    {{ 'pricing.simulator.weeksNights' | transloco : { weeks: vm().weeks(), nights: vm().weeks() * 7 } }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  @for (w of [1, 2, 3, 4]; track w) {
                    <button
                      type="button"
                      appMotionPress
                      (click)="vm().setWeeks(w)"
                      [class]="vm().weeks() === w ? 'bg-terracotta-700 text-white shadow-xs' : 'bg-sand-100 text-stone-700 hover:bg-sand-200'"
                      class="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors duration-150 cursor-pointer"
                    >
                      {{ 'pricing.simulator.weekShort' | transloco : { count: w } }}
                    </button>
                  }
                </div>
              </div>

              <!-- Guests selector -->
              <div>
                <div class="flex items-center justify-between text-sm font-semibold text-stone-800 mb-2">
                  <span>{{ 'pricing.simulator.guests' | transloco }}</span>
                  <span class="text-terracotta-700 font-bold bg-terracotta-50 px-2.5 py-0.5 rounded-full text-xs">
                    {{ 'pricing.simulator.guestsCount' | transloco : { count: vm().guests() } }}
                  </span>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  @for (g of [1, 2, 3, 4]; track g) {
                    <button
                      type="button"
                      appMotionPress
                      (click)="vm().setGuests(g)"
                      [class]="vm().guests() === g ? 'bg-terracotta-700 text-white shadow-xs' : 'bg-sand-100 text-stone-700 hover:bg-sand-200'"
                      class="py-2.5 rounded-xl font-bold text-sm transition-colors duration-150 cursor-pointer"
                    >
                      {{ 'pricing.simulator.guestShort' | transloco : { count: g } }}
                    </button>
                  }
                </div>
              </div>

              <!-- Price Breakdown Result -->
              @if (vm().calculation(); as calc) {
                <div class="bg-sand-50 rounded-2xl p-5 border border-sand-200/80 space-y-3 text-sm">
                  
                  <div class="flex items-center justify-between text-stone-600">
                    <span>{{ 'pricing.simulator.baseCalculation' | transloco }} :</span>
                    <span class="font-semibold text-stone-900">{{ calc.basePrice }} €</span>
                  </div>

                  @if (calc.extraGuestsCharge > 0) {
                    <div class="flex items-center justify-between text-stone-600">
                      <span>{{ 'pricing.simulator.extraGuests' | transloco }} :</span>
                      <span class="font-semibold text-terracotta-700">+{{ calc.extraGuestsCharge }} €</span>
                    </div>
                  }

                  <div class="flex items-center justify-between text-stone-600">
                    <span>{{ 'pricing.simulator.deposit' | transloco }} :</span>
                    <span class="font-semibold text-stone-900">{{ calc.refundableDeposit }} €</span>
                  </div>

                  <div class="pt-3 border-t border-sand-200 flex items-baseline justify-between">
                    <div>
                      <div class="text-xs uppercase font-bold tracking-wider text-stone-500">
                        {{ 'pricing.simulator.totalEstimated' | transloco }}
                      </div>
                      <div class="text-[11px] text-stone-400">{{ 'pricing.simulator.withRefundableDeposit' | transloco }}</div>
                    </div>
                    <div class="font-serif text-3xl font-extrabold text-terracotta-700">
                      {{ calc.totalWithDeposit }} €
                    </div>
                  </div>

                  <div class="text-xs text-stone-500 pt-2 border-t border-sand-200 space-y-1">
                    <div class="flex justify-between">
                      <span>{{ 'pricing.simulator.depositDueNow' | transloco }}</span>
                      <span class="font-semibold text-stone-800">{{ calc.depositDueNow }} €</span>
                    </div>
                    <div class="flex justify-between">
                      <span>{{ 'pricing.simulator.balanceDueBeforeArrival' | transloco }}</span>
                      <span class="font-semibold text-stone-800">{{ calc.balanceDueBeforeArrival }} €</span>
                    </div>
                  </div>

                </div>

                <a 
                  [href]="getInquiryMailto(calc)"
                  appMotionPress
                  class="w-full flex items-center justify-center gap-2 bg-terracotta-700 hover:bg-terracotta-800 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-[color,background-color,border-color,box-shadow] duration-200 cursor-pointer"
                >
                  <app-icon name="mail" [size]="18" />
                  <span>{{ 'pricing.simulator.requestButton' | transloco }}</span>
                </a>

                <p class="text-[11px] text-stone-600 text-center leading-relaxed">
                  {{ 'pricing.simulator.estimateNotice' | transloco }}
                </p>
              }

            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class PricingBookingComponent {
  private transloco = inject(TranslocoService);
  readonly vm = input.required<PricingSectionViewModel>();

  getInquiryMailto(calc: any): string {
    const email = 'casadali.capistrano@gmail.com';
    const subject = encodeURIComponent(
      this.transloco.translate('pricing.inquiry.subject', {
        weeks: calc.weeks,
        guests: calc.guests
      })
    );
    const body = encodeURIComponent(
      this.transloco.translate('pricing.inquiry.body', {
        weeks: calc.weeks,
        nights: calc.weeks * 7,
        guests: calc.guests,
        total: calc.totalWithDeposit
      })
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
