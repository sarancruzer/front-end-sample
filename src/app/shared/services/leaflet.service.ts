import { Injectable, Inject } from '@angular/core';

import { WindowRefService } from './window-ref.service';

@Injectable()
export class LeafletService {

  private mapDefaultView: Number[];

  private map: any;

  private L: any;

  constructor(
    private windowRef: WindowRefService
  ) {
    this.L = windowRef.nativeWindow['L'];

    this.mapDefaultView = [55.676098, 12.568337];
  }

  init(container: string) {
    if (!this.L) {
      throw new Error('Leaflet library is not available!');
    }

    // create a map in the `container`, set the view to a given place and zoom
    this.map = this.L.map(container).setView(this.mapDefaultView, 10);

    // add an OpenStreetMap tile layer
    this.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://gurtam.com">Gurtam</a>'
    }).addTo(this.map);
  }

  showMarker(position: any, options: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!this.map) {
        return reject('Map has not been initialized!');
      }

      const marker = this.L.marker(position, options).addTo(this.map);

      resolve(marker);
    });
  }

  buildIcon(options: any): any {
    if (!this.L) {
      throw new Error('Leaflet library is not available!');
    }

    return this.L.icon(options);
  }

  setView(lat: number, lng: number, zoom?: number) {
    if (!this.map) {
      return;
    }

    this.map.setView({
      lat: lat,
      lng: lng
    }, zoom ? zoom : 10);
  }

}
