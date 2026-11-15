import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoPipe, IconComponent],
  template: `
    <footer class="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <!-- Column 1: Brand -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <img src="/images/logo.png" alt="Casa Dali" class="h-12 w-auto brightness-95" />
              <div>
                <span class="font-serif text-2xl font-bold text-white tracking-wide">Casa Dali</span>
                <span class="block text-xs uppercase tracking-widest text-amber-400">El Capistrano Village · Nerja</span>
              </div>
            </div>
            <p class="text-sm text-stone-400 max-w-md leading-relaxed">
              {{ 'footer.description' | transloco }}
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 class="text-xs uppercase font-bold tracking-widest text-white mb-4">{{ 'footer.navigation' | transloco }}</h4>
            <ul class="space-y-2.5 text-sm text-stone-400">
              <li><a href="#accueil" class="hover:text-amber-400 transition-colors">{{ 'nav.home' | transloco }}</a></li>
              <li><a href="#appartement" class="hover:text-amber-400 transition-colors">{{ 'nav.apartment' | transloco }}</a></li>
              <li><a href="#galerie" class="hover:text-amber-400 transition-colors">{{ 'nav.gallery' | transloco }}</a></li>
              <li><a href="#situation" class="hover:text-amber-400 transition-colors">{{ 'nav.situation' | transloco }}</a></li>
              <li><a href="#tarifs" class="hover:text-amber-400 transition-colors">{{ 'nav.pricing' | transloco }}</a></li>
              <li><a href="#liens" class="hover:text-amber-400 transition-colors">{{ 'nav.links' | transloco }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact Details -->
          <div>
            <h4 class="text-xs uppercase font-bold tracking-widest text-white mb-4">{{ 'footer.directContact' | transloco }}</h4>
            <ul class="space-y-3 text-sm text-stone-400">
              <li class="flex items-center gap-2.5">
                <app-icon name="mail" [size]="16" class="text-amber-400 shrink-0" />
                <a href="mailto:casadali.capistrano@gmail.com" class="hover:text-amber-400 transition-colors break-all">
                  casadali.capistrano&#64;gmail.com
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <app-icon name="facebook" [size]="16" class="text-amber-400 shrink-0" />
                <a href="https://www.facebook.com/casadalinerja" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors">
                  Facebook : casadalinerja
                </a>
              </li>
              <li class="flex items-start gap-2.5 text-xs text-stone-400">
                <app-icon name="map-pin" [size]="16" class="text-amber-400 shrink-0 mt-0.5" />
                <span>{{ 'footer.address' | transloco }}</span>
              </li>
            </ul>
          </div>

        </div>

        <div class="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>{{ 'contact.footerText' | transloco }}</p>
          <p class="text-stone-400">
            {{ 'footer.tagline' | transloco }}
          </p>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
