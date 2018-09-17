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

  private dataChartHum: Array<any>;
  private dataChartTemp: Array<any>;

  private currentHum;
  private currentTemp;

  private response: boolean;

  constructor(private _sensorService: SensorService) {
  }

  ngOnInit() {
  	this.obtenerHumedad();
    this.obtenerTemperatura();

    const socket = SocketIO('http://localhost:8000');

    socket.on('data', (data) => {
    	if(this.response){
    		let date = new Date(Date.now());
    		if(data.data.sensor == "HUM") {
    			this.currentHum = { 
    				'data': data.data.data, 
    				'value': data.data.value.toFixed(2), 
    				'date': date
    			};
    			
    			this.hum.push(this.currentHum);
    			this.dataChartHum = this.createDataChart(this.hum);
    			this.createChartHum();

    		}
    		if(data.data.sensor == "TEMP") {
    			this.currentTemp = { 
    				'data': data.data.data, 
    				'value': data.data.value.toFixed(2), 
    				'date': date
    			};

    			this.temp.push(this.currentTemp);
    			this.dataChartTemp = this.createDataChart(this.temp);
    			this.createChartTemp();  
    		}
    	}
    });
  }

  ngDoCheck() {
    if(this.temp && this.hum && !this.response) {
      this.response = true; 
    }
  }

  obtenerHumedad() {
    this._sensorService.obtenerHumedad().subscribe(
      res => {
        this.hum = res;  
        this.dataChartHum = this.createDataChart(this.hum); 
    },
      error => {
        console.log(<any>error);
    });
  }

  obtenerTemperatura() {
    this._sensorService.obtenerTemperatura().subscribe(
      res => {
        this.temp = res;
        this.dataChartTemp = this.createDataChart(this.temp);
    },
      error => {
        console.log(<any>error);
    });
  }

  createChartTemp() {
  	this.chartTemperature = new Chart('temperature', {
        type: 'line',
        data: {
          labels:this.dataChartTemp['labels'],
            datasets: [{
            label: 'Ultimos 15 minutos',
            data: this.dataChartTemp['data'],
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

  createChartHum() {
    this.chartHumidity = new Chart('humidity', {
        type: 'line',
        data: {
          labels:this.dataChartHum['labels'],
          datasets: [{
            label: 'Ultimos 15 minutos',
            data: this.dataChartHum['data'],
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

  createDataChart(arr): Array<any> {
    let sensor = [];
    sensor['data'] = [];
    sensor['labels'] = [];
    
    let intervalo = parseInt((arr.length/6 + 1).toFixed(0));

    for(let i = 0; i < arr.length; i += intervalo){
      arr[i].date = new Date(arr[i].date);
      sensor['data'].push(arr[i].value);
      sensor['labels'].push(arr[i].date.toLocaleTimeString());
    }

    sensor['data'].push(arr[arr.length - 1].value);

    arr[arr.length - 1 ].date = new Date(arr[arr.length - 1].date);
    sensor['labels'].push(arr[arr.length - 1].date.toLocaleTimeString());

    return sensor;

  }

}
