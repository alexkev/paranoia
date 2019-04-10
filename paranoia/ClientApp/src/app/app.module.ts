import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ParanoiaComponent } from './paranoia/paranoia.component';
import { CardsComponent } from './paranoia/cards/cards.component';

import { ParanoiaService } from './paranoia/paranoia.service';
import { CardsEditComponent } from './paranoia/cards/cards-edit/cards-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ParanoiaComponent,
    CardsComponent,
    CardsEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'paranoia', component: ParanoiaComponent, children: [
          { path: 'edit/:id', component: CardsEditComponent }
      ] }
    ])
    ],
    providers: [ParanoiaService],
    bootstrap: [AppComponent]
})

export class AppModule { }
