import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
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

    #addBtn {
      cursor: pointer;
    }

    li h5 {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy {

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

  ngOnDestroy(): void {
    this.saveMarkersLocally();
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.readMarkersLocally();

    // const marker = new mapboxgl.Marker({ color: 'red', rotation: 25 })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  navigateToMarker({ marker }: MarkerColor) {
    this.mapa.flyTo({
      center: marker!.getLngLat()
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
  }

  saveMarkersLocally() {
    const markersArr: MarkerColor[] = [];

    this.markers.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      markersArr.push({
        color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('markers', JSON.stringify(markersArr));
  }

  readMarkersLocally() {
    const markersString = localStorage.getItem('markers');
    
    if (markersString) {
      const markersArr: MarkerColor[] = JSON.parse(markersString);
      
      markersArr.forEach(marker => {
        const newMarker = new mapboxgl.Marker({
          draggable: true,
          color: marker.color
        }).setLngLat(marker.center!)
          .addTo(this.mapa);

        this.markers.push({
          color: marker.color,
          marker: newMarker,
        });
      });
    }
  }

  deleteMarker(i: number) {
    this.markers[i].marker!.remove();
    this.markers.splice(i, 1);
  }

}
