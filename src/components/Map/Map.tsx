import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Map.module.scss';
import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";

interface MapProps {}

const Map: FC<MapProps> = () => {

const [webmap /* , setWebmap */] = useState<WebMap>(new WebMap({
    portalItem: {
      id: '0465bbcbaa9d44e0bce20415174279b1'
    }
  }));

  const [view /* , setView */] = useState<MapView>(new MapView({
    map: webmap
  }));
  const mapEl = useRef(null);


  useEffect(() => {
    webmap.when().then(() => {

      if (mapEl.current && !view.container) {
        view.container = mapEl.current;
      }
    })
  }, []);

  return (
  // <div className={styles.Map}>
    <div ref = {mapEl} className = {styles.viewDiv}></div>
  // </div>
  );
  }
// const Map: FC<MapProps> = () => (
//   <div className={styles.Map}>
//     Map Component
//   </div>
// );

export default Map;
