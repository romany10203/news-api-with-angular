import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {path:'',redirectTo:'news',pathMatch:'full'},
  {path:'news',component:NewsComponent},
  {path:'news/:country/:category',component:NewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
