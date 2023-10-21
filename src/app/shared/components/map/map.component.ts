import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';

import { GmapService } from 'src/app/services/gmap/gmap.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true
})
export class MapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  source: any = { lat: 28.651798, lng: 77.183022 };
  dest: any = { lat: 28.5617287, lng: 77.3187642 }
  map: any;
  directionService: any;
  directionDisplay: any;
  source_marker: any;
  destination_marker: any;
  // constructor() { }

  maps = inject(GmapService);
  render = inject(Renderer2);


  ngOnInit() { }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      console.log('map');
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.source.lat, lng: this.source.lng },
        disableDefaultUI: true,
        zoom: 13,
      });
      this.directionService = new googleMaps.DirectionsService;
      this.directionDisplay = new googleMaps.DirectionsRender;
      this.directionDisplay = new googleMaps.DirectionsRender();


      const sourceIconUrl = 'assets/icon/bus2.png';
      const destinationIconUrl = 'assets/icon/pin.png';

      const source_position = new googleMaps.latLng(this.source.lat, this.source.lng);
      const destination_position = new googleMaps.latLng(this.dest.lat, this.dest.lng);

      const source_icon = {
        url: sourceIconUrl,
        scaledSice: new googleMaps.Size(50, 50),
        origin: new googleMaps.Point(0, 0),
        archor: new googleMaps.Point(0, 0)
      };

      const destination_icon = {
        url: destinationIconUrl,
        scaledSice: new googleMaps.Size(30, 30),
        origin: new googleMaps.Point(0, 0),
        archor: new googleMaps.Point(0, 0)
      };

      // settiando el marcador
      this.source_marker = new googleMaps.Marker({
        map: this.map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      })

      //settiando el destino 
      this.destination_marker = new googleMaps.Marker({
        map: this.map,
        position: destination_position,
        animation: googleMaps.Animation.DROP,
        icon: destination_icon,
      })


      // settiando los 2 iconos en el mapa


      this.source_marker.setMap(this.map);
      this.destination_marker.setMap(this.map);


      // pantalla dedirecciones

      this.directionDisplay.setMap(this.map);
      this.directionDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 4,
          strokeOpacity: 1,
          strokeColor: 'black'
        },
        suppressMarkers: true
      });


      await this.drawRoute();

      this.map.setCenter(source_position);
      this.render.addClass(mapEl, 'visible');

    } catch (e) {
      console.log(e);

    }
  }

  drawRoute() {
    this.directionService.route({
      origin: this.source,
      destination: this.dest,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (Response, status) => {
      if (status === 'OK') {
        this.directionDisplay.setDirections(Response);
        console.log('response: ', Response);
        const directionsData = Response.routes[0].legs[0];
        console.log(directionsData);
        const duration = directionsData.duration.text;
        console.log(duration);
      } else {
        console.log(status);

      }
    });
  }


}
