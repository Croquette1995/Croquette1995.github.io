import { Component, computed, inject, signal, ElementRef, HostListener } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { IconComponent } from '../icon/icon.component';
import { MotionPressDirective } from '../../motion/motion-press.directive';

interface LanguageItem {
  code: string;
  label: string;
  flag: string;
  badge: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoPipe, IconComponent, MotionPressDirective],
  template: `
    <header class="fixed top-0 left-0 right-0 z-40 bg-sand-50/95 backdrop-blur-md border-b border-sand-200/80 transition-all duration-300 shadow-2xs">
      <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-20 sm:h-22 flex items-center justify-between gap-4">
        
        <!-- Logo & Brand with generous airy spacing -->
        <a href="#accueil" class="flex items-center gap-3 sm:gap-3.5 group shrink-0 select-none py-1">
          <img 
            src="/images/logo.png" 
            alt="Casa Dali Logo" 
            class="h-11 sm:h-12 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <div class="flex flex-col shrink-0 justify-center">
            <span class="font-serif text-2xl sm:text-[25px] font-bold tracking-tight text-stone-900 group-hover:text-terracotta-700 transition-colors leading-none whitespace-nowrap">
              Casa Dali
            </span>
            <span class="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-800 font-semibold mt-1.5 whitespace-nowrap">
              Nerja · Costa del Sol
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links (Airy & Spacious, no wrapping) -->
        <nav class="hidden xl:flex items-center gap-5 2xl:gap-8 text-[14px] 2xl:text-[15px] font-medium text-stone-700 shrink-0">
          <a 
            href="#accueil" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.home' | transloco }}
          </a>
          <a 
            href="#appartement" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.apartment' | transloco }}
          </a>
          <a 
            href="#galerie" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.gallery' | transloco }}
          </a>
          <a 
            href="#situation" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.situation' | transloco }}
          </a>
          <a 
            href="#tarifs" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.pricing' | transloco }}
          </a>
          <a 
            href="#liens" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.links' | transloco }}
          </a>
          <a 
            href="#contact" 
            class="relative py-2 text-stone-700 hover:text-terracotta-700 transition-colors whitespace-nowrap tracking-wide after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-terracotta-600 after:transition-all after:duration-200"
          >
            {{ 'nav.contact' | transloco }}
          </a>
        </nav>

        <!-- Right Side: Harmonized Language Selector & Book CTA & Mobile Toggle -->
        <div class="flex items-center gap-3 sm:gap-3.5 shrink-0">
          
          <!-- Harmonized Language Dropdown (Desktop & Tablet) -->
          <div id="lang-selector-container" class="relative hidden sm:block">
            <button
              type="button"
              (click)="toggleLangDropdown()"
              class="flex items-center gap-2 h-10 px-3.5 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-sand-300/80 hover:border-terracotta-400 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-terracotta-400/30"
              [attr.aria-expanded]="langDropdownOpen()"
              [attr.aria-label]="'nav.changeLang' | transloco"
            >
              <span class="text-base leading-none select-none" aria-hidden="true">{{ currentItem().flag }}</span>
              <span class="text-xs font-semibold tracking-wider text-stone-700 uppercase">{{ currentItem().badge }}</span>
              <app-icon 
                name="chevron-down" 
                [size]="12" 
                class="text-stone-400 transition-transform duration-200"
                [class.rotate-180]="langDropdownOpen()"
              />
            </button>

            <!-- Custom Dropdown Menu -->
            @if (langDropdownOpen()) {
              <div 
                class="absolute right-0 top-full mt-2 w-48 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-sand-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                <div class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-sand-100 mb-1 select-none">
                  {{ 'nav.languages' | transloco }}
                </div>
                @for (lang of languages; track lang.code) {
                  <button
                    type="button"
                    (click)="selectLang(lang.code)"
                    role="menuitem"
                    class="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer text-left"
                    [class.bg-terracotta-50]="currentLang() === lang.code"
                    [class.text-terracotta-800]="currentLang() === lang.code"
                    [class.font-semibold]="currentLang() === lang.code"
                    [class.text-stone-700]="currentLang() !== lang.code"
                    [class.hover:bg-sand-100/80]="currentLang() !== lang.code"
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-base leading-none select-none">{{ lang.flag }}</span>
                      <span>{{ lang.label }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[10px] font-semibold uppercase tracking-wider" [class.text-terracotta-600]="currentLang() === lang.code" [class.text-stone-400]="currentLang() !== lang.code">{{ lang.badge }}</span>
                      @if (currentLang() === lang.code) {
                        <app-icon name="check" [size]="14" class="text-terracotta-600" />
                      }
                    </div>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Book CTA Button -->
          <a 
            href="#tarifs" 
            appMotionPress
            class="inline-flex items-center gap-2 bg-terracotta-700 hover:bg-terracotta-800 text-white h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-[color,background-color,border-color,box-shadow] duration-200 whitespace-nowrap shrink-0"
          >
            <app-icon name="calendar" [size]="15" class="text-terracotta-100 shrink-0" />
            <span>{{ 'nav.bookNow' | transloco }}</span>
          </a>

          <!-- Mobile Menu Toggle Button (Visible on screens < xl) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            appMotionPress
            class="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-sand-200/80 transition-colors cursor-pointer shrink-0"
            [attr.aria-label]="'nav.toggleMenu' | transloco"
          >
            <app-icon [name]="mobileMenuOpen() ? 'x' : 'menu'" [size]="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (mobileMenuOpen()) {
        <div class="xl:hidden bg-sand-50/98 backdrop-blur-lg border-b border-sand-200 px-6 py-6 flex flex-col gap-6 shadow-xl animate-in fade-in duration-200">
          <nav class="flex flex-col gap-3.5 text-base font-medium text-stone-800">
            <a (click)="closeMobileMenu()" href="#accueil" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.home' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#appartement" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.apartment' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#galerie" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.gallery' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#situation" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.situation' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#tarifs" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.pricing' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#liens" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.links' | transloco }}
            </a>
            <a (click)="closeMobileMenu()" href="#contact" class="py-1 hover:text-terracotta-700 transition-colors">
              {{ 'nav.contact' | transloco }}
            </a>
          </nav>

          <!-- Mobile Language Selector & CTA -->
          <div class="pt-5 border-t border-sand-200 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {{ 'nav.languageLabel' | transloco }}
              </span>
              <div class="grid grid-cols-3 gap-2">
                @for (lang of languages; track lang.code) {
                  <button
                    type="button"
                    (click)="selectLang(lang.code); closeMobileMenu()"
                    class="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border text-xs font-medium transition-all cursor-pointer"
                    [class.border-terracotta-500]="currentLang() === lang.code"
                    [class.bg-terracotta-50]="currentLang() === lang.code"
                    [class.text-terracotta-800]="currentLang() === lang.code"
                    [class.font-semibold]="currentLang() === lang.code"
                    [class.shadow-xs]="currentLang() === lang.code"
                    [class.border-sand-200]="currentLang() !== lang.code"
                    [class.bg-white]="currentLang() !== lang.code"
                    [class.text-stone-700]="currentLang() !== lang.code"
                  >
                    <span class="text-base leading-none select-none">{{ lang.flag }}</span>
                    <span>{{ lang.badge }}</span>
                  </button>
                }
              </div>
            </div>

            <a 
              (click)="closeMobileMenu()"
              href="#tarifs" 
              class="w-full flex items-center justify-center gap-2 bg-terracotta-700 text-white py-3 rounded-xl text-sm font-semibold shadow-xs hover:bg-terracotta-800 transition-colors"
            >
              <app-icon name="calendar" [size]="16" class="text-terracotta-100" />
              <span>{{ 'nav.bookNow' | transloco }}</span>
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  private transloco = inject(TranslocoService);
  private elementRef = inject(ElementRef);

  readonly mobileMenuOpen = signal(false);
  readonly currentLang = signal(this.transloco.getActiveLang() || 'fr');
  readonly langDropdownOpen = signal(false);

  readonly languages: LanguageItem[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷', badge: 'FR' },
    { code: 'es', label: 'Español', flag: '🇪🇸', badge: 'ES' },
    { code: 'en', label: 'English', flag: '🇬🇧', badge: 'EN' },
    { code: 'ro', label: 'Română', flag: '🇷🇴', badge: 'RO' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱', badge: 'NL' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹', badge: 'IT' }
  ];

  readonly currentItem = computed(() => {
    return this.languages.find(l => l.code === this.currentLang()) ?? this.languages[0];
  });

  toggleLangDropdown(): void {
    this.langDropdownOpen.update(v => !v);
  }

  closeLangDropdown(): void {
    this.langDropdownOpen.set(false);
  }

  selectLang(langCode: string): void {
    this.switchLang(langCode);
    this.closeLangDropdown();
  }

  switchLang(lang: string): void {
    this.transloco.setActiveLang(lang);
    this.currentLang.set(lang);
    try {
      localStorage.setItem('casadali_lang', lang);
    } catch {}
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.langDropdownOpen()) {
      const nativeEl = this.elementRef.nativeElement as HTMLElement;
      const langContainer = nativeEl.querySelector('#lang-selector-container');
      if (langContainer && !langContainer.contains(event.target as Node)) {
        this.closeLangDropdown();
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLangDropdown();
    this.closeMobileMenu();
  }
}
