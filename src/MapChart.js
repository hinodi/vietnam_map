import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

import "./App.css";
import province from "./chartData/province.json";

const chartData = [
  "https://gist.githubusercontent.com/hinodi/611bfc7208232be11ee994bc4f07e625/raw/70029a9134b3a49a653d86ea812bbca5d391e0ee/vietnam_map.json",
  "https://gist.githubusercontent.com/hinodi/611bfc7208232be11ee994bc4f07e625/raw/a6c87ab52e94d2bad690fb79a9e158b195bbc394/hoangsa_map.json",
  "https://gist.githubusercontent.com/hinodi/611bfc7208232be11ee994bc4f07e625/raw/a6c87ab52e94d2bad690fb79a9e158b195bbc394/truongsa_map.json",
];

const MapChart = ({ setTooltipContent, listVisited, onToggleItem }) => {
  const getGeoBackgroundColor = (index) => {
    const data = province.find((e) => e.id === index);
    const { city } = data || {};

    if (listVisited[index] && listVisited[index].visited) return "#00ff0030";

    if (city) return "#ff000030";

    return "#00000010";
  };
  const getGeoBackgroundHoverColor = (index) => {
    const data = province.find((e) => e.id === index);
    const { city } = data || {};

    if (listVisited[index] && listVisited[index].visited) return "#00ff0050";

    if (city) return "#ff000050";

    return "#00000050";
  };

  return (
    <ComposableMap
      data-tip=""
      projection="geoMercator"
      projectionConfig={{
        scale: 1000,
        center: [105, 15],
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ZoomableGroup>
        {chartData.map((geoUrl, index) => (
          <Geographies key={index.toString()} geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo, index) => {
                  const centroid = geoCentroid(geo);
                  const provinceIndex = geo.rsmKey.split("-").pop();
                  const data = province.find((e) => e.id === provinceIndex);

                  const { offset: { x, y } = {}, code = "" } = data || {};
                  const codeForIsLand = geo?.properties?.code;

                  return (
                    <g key={index.toString()}>
                      <Marker coordinates={centroid}>
                        <text x={x} y={y} fontSize={3} textAnchor="middle">
                          {codeForIsLand || code}
                        </text>
                      </Marker>
                    </g>
                  );
                })}
                {geographies.map((geo, index) => {
                  const provinceIndex = geo.rsmKey.split("-").pop();
                  const data = province.find((e) => e.id === provinceIndex);
                  const { name } = data || {};

                  return (
                    <Geography
                      key={index.toString()}
                      geography={geo}
                      onMouseEnter={() => setTooltipContent(name)}
                      onMouseLeave={() => setTooltipContent("")}
                      onMouseDownCapture={() => onToggleItem(provinceIndex)}
                      style={{
                        default: {
                          fill: getGeoBackgroundColor(provinceIndex),
                          stroke: "#212529",
                          strokeWidth: 0.2,
                          outline: "none",
                        },
                        hover: {
                          fill: getGeoBackgroundHoverColor(provinceIndex),
                          stroke: "#212529",
                          strokeWidth: 0.8,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })}
              </>
            )}
          </Geographies>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
