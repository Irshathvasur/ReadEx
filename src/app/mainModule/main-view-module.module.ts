import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewRoutingModule } from './main-view-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { InputTextModule } from 'primeng/inputtext';
import { CameraModule } from '../cameraModule/camera/camera.module';
import { SwipeNavigationModule } from 'swipe-navigation';
import { PostcomponentComponent } from './postcomponent/postcomponent.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RequesterComponent } from './requester/requester.component';
import { OrderListModule } from 'primeng/orderlist';
import { ListboxModule } from 'primeng/listbox';
import { ChatComponent } from '../chatModule/chat/chat.component';
@NgModule({
  declarations: [
    FeedsComponent,
    SearchComponent,
    MainComponent,
    PostcomponentComponent,
    RequesterComponent,
    ChatComponent
  ],
  exports: [
    FeedsComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    CardModule,
    ListboxModule,
    OrderListModule,
    SwipeNavigationModule,
    MainViewRoutingModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    CameraModule
  ]
})
export class MainViewModule { }
