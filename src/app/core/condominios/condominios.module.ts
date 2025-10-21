import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CondominiosComponent } from './condominios.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CondominiosComponent }])
  ]
})
export class CondominiosModule {}
