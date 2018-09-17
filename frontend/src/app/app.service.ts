import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Sensor } from './sensor';

@Injectable()

export class AppService {
	private url = 'http://localhost:8000/iot/sensors/';

	constructor(private http: HttpClient){}

	obtenerHumedad(): Observable<any> {
  		return this.http.get(this.url + 'hum/');
	}
	
	obtenerTemperatura(): Observable<any> {
        return this.http.get(this.url + 'temp/');
    }

}