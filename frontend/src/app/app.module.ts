import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SensorComponent } from './sensor/sensor.component';

import { SensorService } from './sensor/sensor.service';

@NgModule({
  declarations: [
    AppComponent,
    SensorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    SensorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
