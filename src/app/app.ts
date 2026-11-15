import { Component, inject } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LightboxComponent } from './shared/components/lightbox/lightbox.component';
import { DynamicSectionRendererComponent } from './shared/components/dynamic-renderer/dynamic-section-renderer.component';
import { DynamicSectionService } from './core/services/dynamic-section.service';
import { ApartmentService } from './core/services/apartment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    LightboxComponent,
    DynamicSectionRendererComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-sand-50 selection:bg-terracotta-200 selection:text-terracotta-900">
      <!-- Mediterranean Navigation Bar -->
      <app-navbar />

      <!-- Dynamic Page Sections driven by ViewModels & ng-template injection -->
      <main class="flex-1">
        <app-dynamic-section-renderer [sections]="homeSections" />
      </main>

      <!-- Warm Mediterranean Footer -->
      <app-footer />

      <!-- Photo Lightbox with Keyboard Navigation & WAAPI -->
      <app-lightbox 
        [activePhoto]="sectionService.activeLightboxPhoto()"
        [allPhotos]="apartmentService.filteredGallery()"
        (close)="sectionService.closeLightbox()"
        (selectPhoto)="sectionService.openLightbox($event)"
      />
    </div>
  `
})
export class App {
  readonly sectionService = inject(DynamicSectionService);
  readonly apartmentService = inject(ApartmentService);

  readonly homeSections = this.sectionService.getHomePageSections();
}

