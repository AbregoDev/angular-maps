import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa')
  mapDiv!: ElementRef;
  mapa!: mapboxgl.Map;
  
  zoomLevel: number = 10;
  MIN_ZOOM = 1;
  MAX_ZOOM = 18;

  center: [number, number] = [-100.2895252535902, 25.65089724924327];

  constructor() { }
  
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom() > this.MAX_ZOOM) {
        this.mapa.zoomTo(this.MAX_ZOOM);
      }
    });

    this.mapa.on('move', ({ target }) => {
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];
    });
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
