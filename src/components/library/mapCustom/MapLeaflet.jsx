"use client";
import React, { FC, useState, useEffect } from "react";
import "./style.css";
import * as L from "leaflet";
import { Icon, LeafIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src.css";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import "./libBankMap";

let drawnItems = null;
let drawControl;
let markerDrawHandlerRfi;
let markerDrawHandlerRfa;
let markerDrawHandlerInspection;
let cloudDrawHandler;
let drawingHandler;
let highlightHandler;
let arrowHandler;
let measurementCalibrateHandler;
let img = null;
let imageUrl = null;
let map = null;
let bounds = null;
let layer = null;
let mockDataLayers = null;
let colorTemp = "#b400ff";

const pinIcon = (text) => {
  return L.divIcon({
    iconUrl:
      "https://tsx-center.s3.amazonaws.com/photo_6163585641414244837_m.jpg",
    iconAnchor: [12, 0],
    popupAnchor: [-10, -10],
    className: "location-pin",
    html: `<div class='txt'>${
      text ?? ""
    }</div><div class="pin"></div><div class="pulse"></div>`,
  });
};

const MapLeaflet = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colors, setColors] = useState("#b400ff");

  let errorOverlayUrl = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
  let altText =
    "Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.";
  let initLat = 13.736717;
  let initLon = 100.523186;

  mockDataLayers = {
    type: "FeatureCollection",
    features: [
      // {
      //   geometry: {
      //     type: "Inspection",
      //     coordinates: [[[99.72026765424896, 14.09658529657004]]],
      //     data: {
      //       id:1,
      //       jobName: "ตรวจก่อนก่อผนัง",
      //       message: "text...",
      //     },
      //   },
      //   properties: {},
      // },
      // {
      //   geometry: {
      //     type: "Inspection",
      //     coordinates: [[[100.4179454839114, 13.197148887055963]]],
      //     data: {
      //       id:2,
      //       jobName: "ตรวจไลน์สถาปัตย์",
      //       message: "text...",
      //     },
      //   },
      //   properties: {},
      // },
      // {
      //   geometry: {
      //     type: "Inspection",
      //     coordinates: [[[100.42893253634703, 14.423997367651623]]],
      //     data: {
      //       id:3,
      //       jobName: "ตรวจ Precast",
      //       message: "text...",
      //     },
      //   },
      //   properties: {},
      // },
      // {
      //   geometry: {
      //     type: "cloud",
      //     coordinates: [
      //       [
      //         [100.73588052045918, 13.920738089518343],
      //         [100.73588052045918, 14.216463826934984],
      //         [100.89514416315225, 14.216463826934984],
      //         [100.89514416315225, 13.920738089518343],
      //       ],
      //     ],
      //   },
      //   properties: {
      //     dataApi:{
      //       id:1,
      //       name:"ok na",
      //       detail:"test.....",
      //     },
      //     description: "This is Cloud value",
      //     attribution: null,
      //     bubblingMouseEvents: true,
      //     color: "#FF0000",
      //     dashArray: null,
      //     dashOffset: null,
      //     fill: true,
      //     fillColor: null,
      //     fillOpacity: 0.2,
      //     fillRule: "evenodd",
      //     interactive: true,
      //     lineCap: "round",
      //     lineJoin: "round",
      //     noClip: false,
      //     opacity: 1,
      //     pane: "overlayPane",
      //     smoothFactor: 1,
      //     stroke: true,
      //     weight: 3.072,
      //   },
      // },
      {
        geometry: {
          type: "polygon",
          coordinates: [
            [
              [99.56349085902657, 14.217795020079569],
              [99.56074493415254, 13.911407168115016],
              [99.70216006516449, 13.911407168115016],
              [99.69666821541647, 14.217795020079569],
            ],
          ],
        },
        properties: {
          dataApi: {
            id: 1,
            name: "ok na",
            detail: "test.....",
          },
          description: "This is Cloud value",
          attribution: null,
          bubblingMouseEvents: true,
          color: "#FF0000",
          dashArray: null,
          dashOffset: null,
          fill: true,
          fillColor: null,
          fillOpacity: 0.2,
          fillRule: "evenodd",
          interactive: true,
          lineCap: "round",
          lineJoin: "round",
          noClip: false,
          opacity: 1,
          pane: "overlayPane",
          smoothFactor: 1,
          stroke: true,
          weight: 3.072,
        },
      },
    ],
  };

  imageUrl = "https://www.ksw.hk/media/405/conversions/2F_carpark-w1200.png";

  const mapUi = async () => {
    if (!!map) map.remove();
    map = new L.map("custom-map-leaflet", {
      center: [initLat, initLon],
      zoom: 9,
      minZoom: 0,
      maxZoom: 10,
      zoomControl: false,
    });

    let latLngBounds = L.latLngBounds([
      [initLat + 1.1, initLon + 1.6],
      [initLat - 1.1, initLon - 1.6],
    ]);
    img = L.imageOverlay(imageUrl, latLngBounds, {
      opacity: 0.8,
      errorOverlayUrl: errorOverlayUrl,
      alt: altText,
    });

    map.addLayer(img);

    map.on("zoom", () => {
      console.log(map.getZoom());
    });
  };

  const getMarkRFICustom = () => {
    dispatch(setMarkerType("RFI"));
    setTimeout(() => {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "data:image/png;base64,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",
        iconUrl:
          "data:image/png;base64,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",
        // shadowUrl:
        //   "data:image/png;base64,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",
        iconSize: [30, 30],
        iconAnchor: [30, 30],
      });
      // L.Icon.Default.prototype.options = { name: "1111" };
      markerDrawHandlerRfa = new L.Draw.Marker(map, drawControl.options.marker);
      // markerDrawHandler.as = { name: "1111" };
      markerDrawHandlerRfa.enable();
    }, 100);
  };

  const getMarkCustom = () => {
    // setMarkerType("RFA")
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    dispatch(setMarkerType("RFA"));
    setTimeout(() => {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
        iconSize: [30, 30],
      });
      // L.Icon.Default.prototype.options = { name: "1111" };
      markerDrawHandlerRfa = new L.Draw.Marker(map, drawControl.options.marker);

      // markerDrawHandler.as = { name: "1111" };
      markerDrawHandlerRfa.enable();
    }, 100);
  };

  const getMarkInspectionCustom = () => {
    // setMarkerType("Inspection")
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      delete L.Icon.Default.prototype._getIconUrl;

      let marksCustom = new L.divIcon({
        iconUrl:
          "https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740__480.png",
        iconAnchor: [30, 50],
        popupAnchor: [0, -50],
        className: "location-pin",
        html: `
      <img src="https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740__480.png" />
      <div class='txt' style="background:#C1873E">
      ${"งานที่ 1 AF"}
      </div>
      <div class="pulse"></div>`,
      });
      // <div class="pulse" style="background: rgba(94,190,255,0.5); box-shadow: 0 0 1px 2px #2d99d3;"></div>`,
      // layer.bindPopup("A popup!");

      markerDrawHandlerInspection = new L.Draw.Marker(map, {
        icon: marksCustom,
      });
      markerDrawHandlerInspection.enable();
    }, 100);
  };

  const getCloudCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      cloudDrawHandler = new L.Draw.Cloud(map, drawControl.options.cloud);
      cloudDrawHandler.enable();
    }, 100);
  };

  const getPolygonCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      cloudDrawHandler = new L.Draw.Polygon(map, drawControl.options.polygon);
      cloudDrawHandler.enable();
    }, 100);
  };

  const getDrawCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      drawingHandler = new L.Draw.Drawing(map, drawControl.options.drawing);
      drawingHandler.enable();
    }, 100);
  };

  const getHighlightDrawCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      highlightHandler = new L.Draw.Highlight(
        map,
        drawControl.options.highlight
      );
      highlightHandler.enable();
    }, 100);
  };

  const getArrowCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      arrowHandler = new L.Draw.Arrow(map, drawControl.options.arrow);
      arrowHandler.enable();
    }, 100);
  };

  const getMeasurementCalibrateCustom = () => {
    if (!!markerDrawHandlerRfa) {
      markerDrawHandlerRfa.disable();
    }
    if (!!markerDrawHandlerRfi) {
      markerDrawHandlerRfi.disable();
    }
    if (!!markerDrawHandlerInspection) {
      markerDrawHandlerInspection.disable();
    }
    if (!!cloudDrawHandler) {
      cloudDrawHandler.disable();
    }
    if (!!highlightHandler) {
      highlightHandler.disable();
    }
    if (!!arrowHandler) {
      arrowHandler.disable();
    }
    if (!!measurementCalibrateHandler) {
      measurementCalibrateHandler.disable();
    }
    if (!!drawingHandler) {
      drawingHandler.disable();
    }
    setTimeout(() => {
      measurementCalibrateHandler = new L.Draw.MeasurementCalibrate(
        map,
        drawControl.options.measurementCalibrate
      );
      measurementCalibrateHandler.enable();
    }, 100);
  };

  const centerMap = async () => {
    map.setView([initLat, initLon], 9, { animation: true });
  };

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  const getInitData = async () => {
    // drawnItems = L.featureGroup();
    // map.addLayer(drawnItems);

    let options = {
      position: "topleft",
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polyline: false,
        polygon: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
    };
    drawControl = new L.Control.Draw(options);

    map.addControl(drawControl);

    map.on(L.Draw.Event.DRAWSTART, async function (e) {
      // console.log(L.Draw.Event);
    });

    map.on(L.Draw.Event.CREATED, async function (e) {
      var type = e.layerType,
        layer = e.layer;
      let geojson = layer.toGeoJSON();
      geojson.geometry.type = e.layerType;
      if (type === "marker") {
        const {
          _latlng: { lat, lng },
        } = layer;

        const obj = {
          location: {
            lat,
            lng,
          },
        };
        console.log(lat, lng);
        layer.bindPopup("A popup!");
        map.addLayer(layer);
      }

      if (type === "drawing") {
        layer.options.color = colorTemp; //new
        drawnItems.addLayer(layer);
      }

      if (type === "arrow") {
        drawnItems.addLayer(layer);
      }

      if (type === "measurementcalibrate") {
        drawnItems.addLayer(layer);
      }

      if (type === "cloud") {
        // console.log(layer.getLatLngs());
        // console.log(layer.getBounds());
        geojson.properties = {
          description: "This is Cloud value",
          attribution: null,
          bubblingMouseEvents: true,
          color: "#FF0000",
          dashArray: null,
          dashOffset: null,
          fill: true,
          fillColor: null,
          fillOpacity: 0.2,
          fillRule: "evenodd",
          interactive: true,
          lineCap: "round",
          lineJoin: "round",
          noClip: false,
          opacity: 1,
          pane: "overlayPane",
          smoothFactor: 1,
          stroke: true,
          weight: 3.072,
        };
        console.log(layer);
        drawnItems.addLayer(layer);
      }

      if (type === "polygon") {
        // console.log(layer.getLatLngs());
        // console.log(layer.getBounds());
        geojson.properties = {
          description: "This is polygon value",
          attribution: null,
          bubblingMouseEvents: true,
          color: "#FF0000",
          dashArray: null,
          dashOffset: null,
          fill: true,
          fillColor: null,
          fillOpacity: 0.2,
          fillRule: "evenodd",
          interactive: true,
          lineCap: "round",
          lineJoin: "round",
          noClip: false,
          opacity: 1,
          pane: "overlayPane",
          smoothFactor: 1,
          stroke: true,
          weight: 3.072,
        };
        console.log(layer);
        drawnItems.addLayer(layer);
      }

      layer.on("click", function (event) {
        console.log(event);
      });
    });
  };

  const drawTools = async ({ type, layer, drawnItems }) => {
    console.log({ type, layer, drawnItems });
    if (type === "drawing") {
      layer.options.color = colorTemp; //new
      drawnItems.addLayer(layer);
    }
  };

  const getRunDrawData = async () => {
    if (!!mockDataLayers && mockDataLayers.features.length > 0) {
      for (let geo = 0; geo < mockDataLayers.features.length; geo++) {
        if (!!mockDataLayers.features[geo].geometry.coordinates) {
          let coordinates = mockDataLayers.features[
            geo
          ].geometry.coordinates[0].map((e) => e.reverse());

          switch (mockDataLayers.features[geo].geometry.type) {
            case "polygon":
              layer = new L.polygon(coordinates);

              layer.options = mockDataLayers.features[geo].properties;

              let headPolygon = document.createElement("div");
              headPolygon.innerHTML = `<div class="">${`Txt`}</div>`;

              let btnContentPolygon = document.createElement("div");
              btnContentPolygon.innerHTML = `<div style="margin-top:5px;"></div>`;

              let btnDivPolygon = document.createElement("div");
              btnDivPolygon.append(headPolygon);
              btnDivPolygon.append(btnContentPolygon);

              layer.bindPopup(btnDivPolygon).openPopup();

              break;

            case "cloud":
              bounds = new L.latLngBounds(coordinates);
              layer = new L.Cloud(bounds);
              layer.options = mockDataLayers.features[geo].properties;

              let headCloud = document.createElement("div");
              headCloud.innerHTML = `<div class="">${`Txt`}</div>`;

              let btnContentCloud = document.createElement("div");
              btnContentCloud.innerHTML = `<div style="margin-top:5px;"></div>`;

              let btnDivCloud = document.createElement("div");
              btnDivCloud.append(headCloud);
              btnDivCloud.append(btnContentCloud);

              layer.bindPopup(btnDivCloud).openPopup();

              break;

            case "polyline":
              bounds = coordinates;
              layer = new L.Polyline(bounds);
              layer.options = mockDataLayers.features[geo].properties;
              break;

            case "drawing":
              bounds = coordinates;
              layer = new L.Drawing(bounds);
              layer.options = mockDataLayers.features[geo].properties;
              break;

            case "Inspection":
              bounds = coordinates;
              delete L.Icon.Default.prototype._getIconUrl;
              layer = new L.Marker(L.latLng(...bounds[0]), {
                icon: new L.divIcon({
                  iconUrl:
                    "https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740__480.png",
                  iconAnchor: [30, 50],
                  popupAnchor: [0, -50],
                  className: "location-pin",
                  html: `
                  <img src="https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740__480.png" />
                  <div class='txt' style="background:#C1873E">
                  ${mockDataLayers.features[geo].geometry?.data?.jobName}
                  </div>
                  <div class="pulse"></div>`,
                }),
                data: mockDataLayers.features[geo] || null,
              });

              let head = document.createElement("div");
              head.innerHTML = `<div class="">${mockDataLayers.features[geo].geometry?.data?.message}</div>`;

              let btnContent = document.createElement("div");
              btnContent.innerHTML = `<div style="margin-top:5px;"></div>`;
              let btn_360 = document.createElement("button");
              btn_360.innerText = "View360";
              btn_360.className = "box-popup-data";
              btn_360.onclick = () => {
                goTo360(mockDataLayers.features[geo]);
              };

              let btnDiv = document.createElement("div");
              btnDiv.append(head);
              btnDiv.append(btnContent);

              layer.bindPopup(btnDiv).openPopup();

              break;

            default:
              break;
          }
          if (!!layer) {
            drawnItems.addLayer(layer);
            layer.on("click", function (event) {
              this.closePopup();
              props.handleClick(event.target.options.dataApi);
            });
            layer.on("mouseover", function (event) {
              this.openPopup();
            });
            layer.on("mouseout", function (event) {});
          }
        }
      }
    }
  };

  const goTo360 = (data) => {
    let taskID = data?.geometry?.data?.id;
  };

  useEffect(() => {
    mapUi();
    drawnItems = L.featureGroup();
    map.addLayer(drawnItems);
    getInitData();
    getRunDrawData();
  }, []);

  useEffect(() => {
    console.log('colors : ', colors);
    // getInitData();
    // getRunDrawData();
  }, [colors]);

  return (
    <>
      <div className="w-[100%] h-[100%] relative">
        <div className=" absolute top-[100px] left-[0] z-[1000] p-[12px]">
          <div className="mb-[20px] grid gap-[2px]">
            {/* <div
              className="cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/2776/2776067.png')",
              }}
              onClick={() => getMarkInspectionCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div> */}

            {/* <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/7600/7600812.png')",
              }}
              onClick={() => getCloudCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div> */}
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/10493/10493008.png')",
              }}
              onClick={() => getPolygonCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/4341/4341104.png')",
              }}
              onClick={() => getDrawCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/2901/2901244.png')",
              }}
              onClick={() => getHighlightDrawCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
                backgroundSize: "cover",
                backgroundImage:
                  "url('https://cdn-icons-png.flaticon.com/128/11418/11418411.png')",
              }}
              onClick={() => getArrowCustom()}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
              }}
              onClick={() => getMeasurementCalibrateCustom()}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url('https://cdn-icons-png.flaticon.com/128/8072/8072536.png')",
                }}
              ></div>
            </div>
          </div>
          <div className="grid gap-[2px]">
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
              }}
              // onClick={() => centerMap()}
            >
              <input
                type="color"
                name=""
                id=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
                value={colors}
                onChange={(e) => {
                  colorTemp = e.target.value
                  setColors(e.target.value);
                }}
              />
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
              }}
              onClick={() => centerMap()}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url('https://cdn-icons-png.flaticon.com/128/2267/2267979.png')",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
              }}
              onClick={() => zoomIn()}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url('https://cdn-icons-png.flaticon.com/128/9312/9312231.png')",
                }}
              ></div>
            </div>
            <div
              className=" cursor-pointer rounded-sm shadow-sm bg-[#dedede] hover:bg-[#cccccc] border-2 border-[#C6C6C6]"
              style={{
                width: "40px",
                height: "40px",
                padding: "2px",
              }}
              onClick={() => zoomOut()}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url('https://cdn-icons-png.flaticon.com/128/8721/8721328.png')",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          id="custom-map-leaflet"
          className="border-2 border-red-100 w-[100%] h-[100%] bg-[#ffffff]"
        ></div>
      </div>
    </>
  );
};

export default MapLeaflet;
