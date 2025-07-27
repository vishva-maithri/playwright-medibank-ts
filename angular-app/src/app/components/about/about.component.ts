import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  features = [
    {
      title: 'Angular Framework',
      description: 'Built with Angular 15+ for modern web development',
      icon: '🅰️'
    },
    {
      title: 'Playwright Testing',
      description: 'Comprehensive test automation with cross-browser support',
      icon: '🎭'
    },
    {
      title: 'Multi-Environment',
      description: 'Support for development, staging, and production environments',
      icon: '🌍'
    },
    {
      title: 'API Integration',
      description: 'RESTful API integration with error handling',
      icon: '🔌'
    }
  ];

  techStack = [
    'Angular 15+',
    'TypeScript',
    'Playwright',
    'RxJS',
    'HTTP Client',
    'Angular Router'
  ];

  trackByTitle(index: number, feature: any): string {
    return feature.title;
  }

  trackByTech(index: number, tech: string): string {
    return tech;
  }

  getTechTestId(tech: string): string {
    return 'tech-' + tech.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  getFeatureTestId(title: string): string {
    return 'feature-' + title.toLowerCase().replace(/\s+/g, '-');
  }
}