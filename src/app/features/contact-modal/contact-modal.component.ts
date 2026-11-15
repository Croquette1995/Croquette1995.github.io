import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ContactSectionViewModel } from '../../shared/view-models/section.view-model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MotionScrollDirective } from '../../shared/motion/motion-scroll.directive';
import { MotionPressDirective } from '../../shared/motion/motion-press.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [FormsModule, TranslocoPipe, IconComponent, MotionScrollDirective, MotionPressDirective],
  template: `
    <section id="contact" class="py-20 lg:py-28 bg-sand-100/70 border-t border-sand-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left: Information & direct owner contact -->
          <div class="lg:col-span-5" appMotionScroll>
            <span class="text-xs font-semibold uppercase tracking-widest text-terracotta-700 bg-terracotta-100/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {{ 'contact.badge' | transloco }}
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
              {{ 'contact.title' | transloco }}
            </h2>
            <p class="text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
              {{ 'contact.subtitle' | transloco }}
            </p>

            <!-- Direct Contact Methods Card -->
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-sm space-y-5">
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta-700 flex items-center justify-center shrink-0">
                  <app-icon name="mail" [size]="22" />
                </div>
                <div>
                  <div class="text-xs text-stone-600 uppercase font-semibold">{{ 'contact.emailLabel' | transloco }}</div>
                  <a 
                    href="mailto:casadali.capistrano@gmail.com" 
                    class="font-bold text-stone-900 hover:text-terracotta-700 text-base sm:text-lg transition-colors break-all"
                  >
                    casadali.capistrano&#64;gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4 pt-4 border-t border-sand-100">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <app-icon name="facebook" [size]="22" />
                </div>
                <div>
                  <div class="text-xs text-stone-600 uppercase font-semibold">{{ 'contact.facebookLabel' | transloco }}</div>
                  <a 
                    href="https://www.facebook.com/casadalinerja" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="font-bold text-stone-900 hover:text-blue-700 text-base transition-colors"
                  >
                    facebook.com/casadalinerja
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4 pt-4 border-t border-sand-100 text-xs text-stone-700">
                <div class="w-12 h-12 rounded-2xl bg-sand-100 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/images/Contact.png" alt="Casa Dali" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="font-bold text-stone-900">{{ 'contact.owner' | transloco }}</div>
                  <div class="text-stone-600">{{ 'contact.ownerSub' | transloco }}</div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right: Interactive Pre-filled Contact Form -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-xl" appMotionScroll [delay]="0.15">
            <h3 class="font-serif text-2xl font-bold text-stone-900 mb-2">
              {{ 'contact.quickInquiry' | transloco }}
            </h3>
            <p class="text-stone-500 text-sm mb-6">
              {{ 'contact.quickInquiryDesc' | transloco }}
            </p>

            <form (ngSubmit)="sendMail()" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">{{ 'contact.labels.name' | transloco }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="name" 
                    name="name" 
                    [placeholder]="'contact.namePlaceholder' | transloco"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-hidden focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">{{ 'contact.labels.email' | transloco }}</label>
                  <input 
                    type="email" 
                    [(ngModel)]="email" 
                    name="email" 
                    [placeholder]="'contact.emailPlaceholder' | transloco"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-hidden focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 text-sm transition-colors"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">{{ 'contact.labels.dates' | transloco }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="dates" 
                    name="dates" 
                    [placeholder]="'contact.datesPlaceholder' | transloco"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-hidden focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">{{ 'contact.labels.guests' | transloco }}</label>
                  <select 
                    [(ngModel)]="guests" 
                    name="guests"
                    class="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-hidden focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 text-sm transition-colors bg-white"
                  >
                    <option [value]="1">{{ 'contact.guestOptions.one' | transloco }}</option>
                    <option [value]="2">{{ 'contact.guestOptions.two' | transloco }}</option>
                    <option [value]="3">{{ 'contact.guestOptions.three' | transloco }}</option>
                    <option [value]="4">{{ 'contact.guestOptions.four' | transloco }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">{{ 'contact.labels.message' | transloco }}</label>
                <textarea 
                  [(ngModel)]="message" 
                  name="message" 
                  rows="4"
                  [placeholder]="'contact.messagePlaceholder' | transloco"
                  class="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-hidden focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200 text-sm transition-colors"
                ></textarea>
              </div>

              <button 
                type="submit" 
                appMotionPress
                class="w-full py-4 rounded-xl bg-terracotta-700 hover:bg-terracotta-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <app-icon name="mail" [size]="18" />
                <span>{{ 'contact.submit' | transloco }}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactSectionComponent {
  private transloco = inject(TranslocoService);
  readonly vm = input.required<ContactSectionViewModel>();

  name = signal('');
  email = signal('');
  dates = signal('');
  guests = signal('2');
  message = signal('');

  sendMail(): void {
    const recipient = 'casadali.capistrano@gmail.com';
    const fallbackName = this.transloco.translate('contact.inquiry.defaultName');
    const noMessage = this.transloco.translate('contact.inquiry.noMessage');
    const subject = encodeURIComponent(
      this.transloco.translate('contact.inquiry.subject', {
        name: this.name() || fallbackName
      })
    );
    const body = encodeURIComponent(
      this.transloco.translate('contact.inquiry.body', {
        name: this.name(),
        email: this.email(),
        dates: this.dates(),
        guests: this.guests(),
        message: this.message() || noMessage
      })
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }
}
