"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
  OverlayView,
  InfoWindow,
} from "@react-google-maps/api";
import { useSpring, animated } from "react-spring";
import axios from "axios";

const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

console.log("apiKey : ", apiKey);

const getAddressComponents = async (latitude: any, longitude: any) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );

    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      // Extract address components
      const addressComponents = result.address_components;
      // Find components by type
      const subdistrict = addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_2")
      );
      const district = addressComponents.find((component: any) =>
        component.types.includes("locality")
      );
      const districtKhet = addressComponents.find((component: any) =>
        component.types.includes("sublocality_level_1")
      );
      const subdistrictKhwaeng = addressComponents.find((component: any) =>
        component.types.includes("sublocality_level_2")
      );
      const province = addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      );
      const postalCode = addressComponents.find((component: any) =>
        component.types.includes("postal_code")
      );

      return {
        subdistrict: subdistrict ? subdistrict.long_name : "",
        district: district ? district.long_name : "",
        districtKhet: districtKhet ? districtKhet.long_name : "",
        subdistrictKhwaeng: subdistrictKhwaeng
          ? subdistrictKhwaeng.long_name
          : "",
        province: province ? province.long_name : "",
        postalCode: postalCode ? postalCode.long_name : "",
      };
    } else {
      throw new Error("No results found");
    }
  } catch (error: any) {
    console.error("Error fetching address components:", error.message);
    return null;
  }
};

function LibGoogleMap() {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    // lat: 13.736717,
    // lng: 100.523186,
    lat: 37.771922672374636,
    lng: -122.42060473828842,
  };
  const [animationProps, setAnimationProps] = useSpring<any>(() => ({
    path: [],
  }));
  const [isEnabled, setIsEnabled] = useState(true);
  const [path, setPath] = useState([]);

  const [animationPosition, setAnimationPosition] = useState(0);
  const [startPosition, setStartPosition] = useState<any>({
    lat: 37.771922672374636,
    lng: -122.42060473828842,
    // lat: 13.736717,
    // lng: 100.523186,
  });
  const [endPosition, setEndPosition] = useState<any>({
    lat: 37.775492552609144,
    lng: -122.41863305632259,
    // lat: 13.739843646937608,
    // lng: 100.53460121154785,
  });
  const [directions, setDirections] = useState<any>();

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    } else {
      console.log("error");
    }
  };

  const addressInfo = async (event: any) => {
    const { latLng } = event;
    console.log(latLng?.lat());
    console.log(latLng?.lng());
    let res = await getAddressComponents(latLng?.lat(), latLng?.lng());
    console.log("res : ", res);
  };

  const handleMapClick = (event: any) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    if (!startPosition) {
      // Set starting position
      setStartPosition({ lat: clickedLat, lng: clickedLng });
    } else if (!endPosition) {
      // Set ending position
      setEndPosition({ lat: clickedLat, lng: clickedLng });

      // Calculate the path between start and end positions
      const newPath: any = [
        { lat: startPosition.lat, lng: startPosition.lng },
        { lat: clickedLat, lng: clickedLng },
      ];
      setPath(newPath);
    } else {
      // Reset positions if both start and end are set
      setStartPosition(null);
      setEndPosition(null);
      setPath([]);
    }
  };

  const updateDirections = (start: any) => {
    if (window.google && window.google.maps && start && endPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(start.lat, start.lng),
          destination: new window.google.maps.LatLng(
            endPosition.lat,
            endPosition.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        directionsCallback
      );
    }
  };

  const updateStart = async (event: any) => {
    updateDirections(event);
  };

  const LocationPoint = () => {
  
    return (
      <>
        <Marker
          position={{
            lat: directions?.request?.origin?.location?.lat(),
            lng: directions?.request?.origin?.location?.lng(),
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/128/3097/3097144.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        <Marker
          position={{
            lat: new window.google.maps.LatLng(
              endPosition.lat,
              endPosition.lng
            )?.lat(),
            lng: new window.google.maps.LatLng(
              endPosition.lat,
              endPosition.lng
            )?.lng(),
            // lat: directions?.request?.destination?.location?.lat(),
            // lng: directions?.request?.destination?.location?.lng(),
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/128/3009/3009489.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      </>
    );
  };

  const handleLoad = useCallback((map: any) => {
    // Check if window.google is defined before accessing maps
    if (window.google) {
      console.log("Map loaded:", map);
    }
  }, []);

  useEffect(() => {
    let flag = true;
    setInterval(() => {
      if (!isEnabled) setIsEnabled(true);
      if (flag) {
        updateStart({
        //   lat: 13.736717,
        //   lng: 100.523186,
            lat: 37.771922672374636,
            lng: -122.42060473828842,
        });
        flag = false;
      } else {
        updateStart({
        //   lat: 13.735046888284385,
        //   lng: 100.52341683631897,
            lat: 37.77123999608587,
            lng: -122.42028497769444,
        });
        flag = true;
      }
    }, 2000);
    return () => {};
  }, []);

//   useEffect(() => {
//     // console.log("origin : ", {lat: directions?.request?.origin?.location?.lat(), lng: directions?.request?.origin?.location?.lng()});
//     // console.log("destination : ", {lat: directions?.request?.destination?.location?.lat(), lng: directions?.request?.destination?.location?.lng()});
//     console.log("--- ", directions);
//   }, [directions]);

  return (
    <>
      <div className="bg-[pink] w-[100vw] h-[100%]">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            // center={center}
            center={startPosition}
            // center={directions}
            // center={!!directions?.routes && directions?.routes[0]?.legs[0]?.start_location || directions}
            // zoom={14}
            zoom={17}
            onClick={addressInfo}
            // onClick={handleMapClick}
            onLoad={handleLoad}
            // options={{
            //     tilt: 45, // Set the tilt angle for 3D view
            //     heading: 90, // Set the heading angle for 3D view
            //     mapTypeId: 'satellite', // Use satellite view for a more 3D-like experience
            //   }}
          >
            {/* <Marker position={center} /> */}
            {/* {startPosition && <Marker position={startPosition} label="Start" />}
            {endPosition && <Marker position={endPosition} label="End" />}
            {path.length > 0 && <Polyline path={path} options={{ strokeColor: '#FF0000' }} />} */}

            {/* <Marker position={startPosition} label="Start" />
        <Marker position={endPosition} label="End" /> */}
            {/* {
            <DirectionsService
                options={{
                    destination: new window.google.maps.LatLng(endPosition?.lat, endPosition?.lng),
                    origin: new window.google.maps.LatLng(startPosition?.lat, startPosition?.lng),
                    travelMode: google.maps.TravelMode.DRIVING,
                }}
                callback={directionsCallback}
                />
        } */}
            {!!directions && isEnabled && <LocationPoint />}

            {isEnabled && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  markerOptions: {
                    icon: null,
                  },
                  suppressMarkers: true,
                  preserveViewport: true, // Set preserveViewport to true to prevent auto-focus
                }}
              />
            )}

            {/* {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h2>Custom Div/Tooltip Content</h2>
                </div>
              </InfoWindow>
            )} */}
            {/* <div
              style={{
                position: "absolute",
                top: "100px",
                left: "10px",
                background: "white",
                padding: "10px",
              }}
              className=" text-purple-400"
            >
              <div
                onClick={() => {
                  updateStart({
                    lat: 37.771922672374636,
                    lng: -122.42060473828842,
                  });
                }}
              >
                ทดสอบเคลือนที่ 1
              </div>
              <div
                onClick={() => {
                  updateStart({
                    lat: 37.77481298803406,
                    lng: -122.41927445051766,
                  });
                }}
              >
                ทดสอบเคลือนที่ 2
              </div>
            </div> */}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default LibGoogleMap;
