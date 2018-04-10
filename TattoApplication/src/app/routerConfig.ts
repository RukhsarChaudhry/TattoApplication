import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { HomeRoutes } from './home/index';
import { AboutUsRoutes } from './aboutus/index';
import { ContactRoutes } from './contact/index';
import { CreateTattoRoutes } from './create-tatto/index';
import { AllTattosRoutes } from './all-tattos/index';
import { TestimonialRoutes } from './testimonial/index';
import { BlogRoutes } from './blog/index';


export const appRoutes: Routes = [

  ...HomeRoutes,
  ...AboutUsRoutes,
  ...ContactRoutes,
  ...CreateTattoRoutes,
  ...AllTattosRoutes,
  ...TestimonialRoutes,
  ...BlogRoutes,
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
