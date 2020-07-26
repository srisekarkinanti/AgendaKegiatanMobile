import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'note-add',
    loadChildren: () => import('./note-add/note-add.module').then( m => m.NoteAddPageModule)
  },
  {
    path: 'note-detail',
    loadChildren: () => import('./note-detail/note-detail.module').then( m => m.NoteDetailPageModule)
  },
  {
    path: 'detail-event',
    loadChildren: () => import('./detail-event/detail-event.module').then( m => m.DetailEventPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  { path:  'login', loadChildren:  './auth/login/login.module#LoginPageModule' },
  {
    path: 'second/:idevent',
    loadChildren: () => import('./second/second.module').then( m => m.SecondPageModule)
  },
  { path: 'second/:price', loadChildren: './second/second.module#SecondPageModule' },
  {
    path: 'konfirmasi/:iduser',
    loadChildren: () => import('./konfirmasi/konfirmasi.module').then( m => m.KonfirmasiPageModule)
  },
  {
    path: 'reminder/:idevent',
    loadChildren: () => import('./reminder/reminder.module').then( m => m.ReminderPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
