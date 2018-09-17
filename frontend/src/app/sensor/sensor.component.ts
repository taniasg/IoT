import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import * as SocketIO from 'socket.io-client';
import { Sensor } from './sensor';

import { SensorService } from './sensor.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  title = 'Clima';

  private chartTemperature: any;
  private chartHumidity: any;

  private hum: Array<any>;
  private temp: Array<any>;

  private currentHum;
  private currentTemp;

  private response: boolean;

  constructor(private _sensorService: SensorService) {

  }

  ngOnInit() {

    const socket = SocketIO('http://localhost:8000');

    socket.on('data', (data) => {
      if(data.change) {
        this.obtenerHumedad();
        this.obtenerTemperatura();
      }
    });
  	
  }

  ngDoCheck() {
    if(this.hum && this.temp && !this.response) {
      this.response = true;
    }
  }

  obtenerHumedad() {
    this._sensorService.obtenerHumedad().subscribe(
      res => {
        this.hum = this.generateArray(res);

        res[res.length - 1 ].date = new Date(res[res.length - 1].date);
        res[res.length - 1].value = res[res.length - 1].value.toFixed(2);

        this.currentHum = res[res.length - 1];

        if(this.response) {
          this.chartHumidity = new Chart('humidity', {
            type: 'line',
            data: {
              labels:this.hum['labels'],
              datasets: [{
                label: 'Ultimos 15 minutos',
                data: this.hum['data'],
                fill: false,
                lineTension: 0.2,
                borderColor: "#549BE2",
                borderWidth: 3
              }]
            },
            options: {
              scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 80
                    }
                }]
              }
            }
          });
        }        
    },
      error => {
        console.log(<any>error);
    });
  }

  obtenerTemperatura() {
    this._sensorService.obtenerTemperatura().subscribe(
      res => {
        this.temp = this.generateArray(res);

        res[res.length - 1 ].date = new Date(res[res.length - 1].date);
        res[res.length - 1].value = res[res.length - 1].value.toFixed(2);
        this.currentTemp = res[res.length - 1];

        if(this.response) {
          this.chartTemperature = new Chart('temperature', {
            type: 'line',
            data: {
              labels:this.temp['labels'],
                datasets: [{
                label: 'Ultimos 15 minutos',
                data: this.temp['data'],
                fill: false,
                lineTension: 0.2,
                borderColor: "#549BE2",
                borderWidth: 3
              }]
            },
            options: {
              scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 30
                    }
                }]
              }
            }
          });
        }
    },
      error => {
        console.log(<any>error);
    });
  }

  generateArray(res): Array<any> {
    let sensor = [];
    sensor['data'] = [];
    sensor['labels'] = [];
    
    let intervalo = parseInt((res.length/6 + 1).toFixed(0));

    for(let i = 0; i < res.length; i += intervalo){
      res[i].date = new Date(res[i].date);
      sensor['data'].push(res[i].value);
      sensor['labels'].push(res[i].date.toLocaleTimeString());
    }

    sensor['data'].push(res[res.length - 1].value);

    res[res.length - 1 ].date = new Date(res[res.length - 1].date);
    sensor['labels'].push(res[res.length - 1].date.toLocaleTimeString());

    return sensor;

  }

}
