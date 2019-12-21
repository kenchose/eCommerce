import {} from "googlemaps";
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from "@angular/core";

@Component({
  selector: "app-findstore",
  templateUrl: "./findstore.component.html",
  styleUrls: ["./findstore.component.scss"]
})
export class FindstoreComponent implements AfterViewInit, OnInit {
  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: google.maps.Map;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Map Options
    const mapOptions = {
      center: new google.maps.LatLng(34.0407, -118.2468),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Marker function
    function addMarker(props, map) {
      // New Map
      let marker = new google.maps.Marker({
        position: props.coords,
        map: map
      });

      // Check icons
      if (props.icon) {
        marker.setIcon(props.icon);
      }

      // Check content
      if (props.content) {
        let infoWindow = new google.maps.InfoWindow({
          content: props.content
        });
        marker.addListener("mouseover", () => {
          infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
          infoWindow.close();
        });
      }
    }

    // Map Markers
    let marker = [
      {
        coords: { lat: 34.0407, lng: -118.2468 },
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon2.png",
        content:
          "<h5 class='text-center'>Headquarters</h5><p>611 E 7th St, Los Angeles, CA 90021, USA</p>"
      },
      {
        coords: { lat: 34.0162, lng: -118.4968 },
        content:
          "<h5 class='text-center'>Third Street Promenade</h5><p>611 E 7th St, Los Angeles, CA 90021</p>"
      },
      {
        coords: { lat: 34.0913, lng: -118.3794 },
        content:
          "<h5 class='text-center'>The Sunset Strip</h5><p>9040 W Sunset Blvd, West Hollywood, CA 90069</p>"
      },
      {
        coords: { lat: 34.0523, lng: -118.2395 },
        content:
          "<h5 class='text-center'>Little Tokyo Mall</h5><p>319 E 2nd St Los Angeles, CA 90012</p>"
      },
      {
        coords: { lat: 34.0832, lng: -118.3588 },
        content:
          "<h5 class='text-center'>Melrose Avenue</h5><p>Melrose Ave., Los Angeles, CA 90046</p>"
      }
    ];

    // Loop through markers
    marker.forEach(location => {
      // Add marker
      addMarker(location, this.map);
    });
  }
}
