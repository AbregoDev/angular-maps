import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      position: fixed;
      bottom: 50px;
      left: 50px;
      width: 500px;
      padding: 10px;
      border-radius: 5px;
      z-index: 15;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa')
  mapDiv!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.2895252535902, 25.65089724924327],
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom() > 17) {
        this.mapa.zoomTo(17);
      }
    })
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  onZoomChange(value: string) {
    this.mapa.zoomTo(parseInt(value));
  }

}
