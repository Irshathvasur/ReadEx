import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewRoutingModule } from './main-view-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { SwipeNavigationModule } from 'swipe-navigation';

@NgModule({
  declarations: [
    FeedsComponent,
    SearchComponent,
    MainComponent
  ],
  exports: [
    FeedsComponent
  ],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    SwipeNavigationModule
  ]
})
export class MainViewModule { }
