import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapAnnonces = ({announces}) => {

  return (
    <dir className="ContainerMap_Annonce">
      <div className="map">
        <Map
          mapLib={maplibregl}
          initialViewState={{
            longitude: 3.05176,
            latitude: 36.77172,
            zoom: 10,
          }}
          style={{ width: "100%", height: " calc(95vh - 77px)" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ami5YZbLyI4lKlA0CpRx "
        >
          <NavigationControl position="top-left" />

            <Marker
              longitude={26}
              latitude={20}
            ></Marker>


        </Map>
      </div>
    </dir>
  );
};

export default MapAnnonces;