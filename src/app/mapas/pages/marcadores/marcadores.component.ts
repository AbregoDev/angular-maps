import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10;
    }

    li {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa')
  mapDiv!: ElementRef;
  mapa!: mapboxgl.Map;
  
  zoomLevel: number = 14;
  // MIN_ZOOM = 1;
  // MAX_ZOOM = 18;

  center: [number, number] = [-100.2895252535902, 25.65089724924327];

  // Marker array
  markers: MarkerColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    // const marker = new mapboxgl.Marker({ color: 'red', rotation: 25 })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  navigateToMarker({ marker }: MarkerColor) {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }

  createMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.markers.push({
      marker: newMarker,
      color,
    });

    console.log(this.markers.map(m => (m as any)._color));
  }

  saveMarkersLocally() {

  }

  readMarkersLocally() {
    
  }

}
