import { UpdateProductoComponent } from './../components/update-producto/update-producto.component';
import { RegistrarProductoComponent } from './../components/registrar-producto/registrar-producto.component';
import { SharedModuleModule } from './../../shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    RegistrarProductoComponent,
    UpdateProductoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
  ]
})
export class HomeModule { }
