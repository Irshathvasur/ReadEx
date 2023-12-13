import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent,
        data: { animation: 'search' }
    },
    {
        path: 'main',
        component: MainComponent,
        data: { animation: 'main' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainViewRoutingModule { }
