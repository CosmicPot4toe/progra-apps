import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegAsisPageRoutingModule } from './reg-asis-routing.module';

import { RegAsisPage } from './reg-asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegAsisPageRoutingModule
  ],
  declarations: [RegAsisPage]
})
export class RegAsisPageModule {}
