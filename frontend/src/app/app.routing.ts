import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorComponent } from './sensor/sensor.component'; 

const appRoutes: Routes = [	
	{ path: '', component: SensorComponent},
	{ path: 'clima', component: SensorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);