import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routerConfig';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './auth-guard';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { CreateTattoComponent } from './create-tatto/create-tatto.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AllTattosComponent } from './all-tattos/all-tattos.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppNavbarComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
    CreateTattoComponent,
    TestimonialComponent,
    AllTattosComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SharedModule.forRoot(),
    HttpModule, FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
