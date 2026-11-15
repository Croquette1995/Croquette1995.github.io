import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoPipe } from '@jsverse/transloco';
import { IconComponent } from '../icon/icon.component';


interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [IconComponent, TranslocoPipe],
  template: `
    <div class="bg-white/90 backdrop-blur-xs rounded-2xl p-4 shadow-sm border border-sand-200/80 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
          <app-icon name="sun" [size]="24" class="animate-spin-slow" />
        </div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-stone-500">
            {{ 'weather.liveTitle' | transloco }}
          </div>
          <div class="flex items-baseline gap-2">
            <span class="font-serif text-2xl font-bold text-stone-900">
              {{ weather().temperature }}°C
            </span>
            <span class="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {{ 'weather.microclimate' | transloco }}
            </span>
          </div>
        </div>
      </div>

      <div class="hidden sm:flex items-center gap-4 text-xs text-stone-600 border-l border-sand-200 pl-4">
        <div>
          <span class="text-stone-600">{{ 'weather.wind' | transloco }}</span>
          <span class="font-semibold ml-1 text-stone-900">{{ weather().windSpeed }} km/h</span>
        </div>
        <div>
          <span class="text-stone-600">{{ 'weather.humidity' | transloco }}</span>
          <span class="font-semibold ml-1 text-stone-900">{{ weather().humidity }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spinSlow 20s linear infinite;
    }
  `]
})
export class WeatherWidgetComponent implements OnInit {
  private http = inject(HttpClient);

  readonly weather = signal<CurrentWeather>({
    temperature: 24,
    humidity: 58,
    windSpeed: 12,
    condition: 'Ensoleillé'
  });

  ngOnInit(): void {
    // Coordinates for Nerja, Spain
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=36.7446&longitude=-3.8767&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (data?.current) {
          this.weather.set({
            temperature: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            condition: 'Ensoleillé'
          });
        }
      },
      error: () => {
        // Keeps the default pleasant Nerja Mediterranean spring/summer weather
      }
    });
  }
}
