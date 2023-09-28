import React, { FC, useEffect, useRef, useState } from 'react';
import LayerList from '../LayerList/LayerList';
import styles from './Map.module.scss';
import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import {
  CalciteShellPanel,
  CalciteShell,
  } from '@esri/calcite-components-react';

interface MapProps {}

const Map: FC<MapProps> = () => {

const [webmap /* , setWebmap */] = useState<WebMap>(new WebMap({
    portalItem: {
      id: '0465bbcbaa9d44e0bce20415174279b1'
    },
    basemap: 'hybrid'
  }));

  const [view /* , setView */] = useState<MapView>(new MapView({
    map: webmap
  }));

  const [layerListExpand, /*setLayerListExpand*/] = useState<Expand>(new Expand({
    expandTooltip: 'Layer List',
    expandIconClass: 'esri-icon-layer-list',
    expanded: false
  }));

  const [webmapLoaded, setWebmapLoaded] = useState<Boolean>(false);

  const [showListPanel, setShowListPanel] = useState<Boolean>(false);
  
  const [viewDivStyle, setViewDivStyle] = useState<any>(styles.viewDiv);

  // const [hasWatchers, setHasWatchers] = useState<Boolean>(false);
  const hasWatchers = useRef<Boolean>(false);

  const mapEl = useRef(null);


  useEffect(() => {

      if (mapEl.current && !view.container) {
        view.container = mapEl.current;
      }

      webmap.when(() => {
        setWebmapLoaded(true);
      });

      view.when(() => {
        view.ui.add(layerListExpand,
          'top-right');
        });

  }, []);

  useEffect(() => {
    if (hasWatchers.current === false) {
        reactiveUtils.when(() => layerListExpand.expanded, () => {
            setShowListPanel(true);
            setViewDivStyle(styles.smallViewDiv);
          });
        reactiveUtils.when(() => !layerListExpand.expanded, () => {
          setShowListPanel(false);
          setViewDivStyle(styles.viewDiv);
          });
          hasWatchers.current = true;
      }
  }, [hasWatchers])

useEffect(() => {}, [webmapLoaded, showListPanel, viewDivStyle])

  return (
    <CalciteShell>

    
    <CalciteShellPanel slot = "panel-end" collapsed = {!showListPanel}>
      { 
      webmapLoaded &&  <LayerList layers = {webmap.layers}></LayerList>
      }
    </CalciteShellPanel>

    <div ref = {mapEl} className = {styles.viewDiv}></div>

    </CalciteShell>



    // <div className = {styles.container}>
    // <div ref = {mapEl} className = {viewDivStyle}></div>
    // {webmapLoaded && showListPanel && 
    // <div className = {styles.rightPanel}>
    //   <LayerList layers = {webmap.layers}></LayerList>
    // </div>
    // }
    // </div>





    // <div className = {styles.container}>
    // <div ref = {mapEl} className = {viewDivStyle}></div>
    // {webmapLoaded && showListPanel && 
    // <div className = {styles.rightPanel}>
    //   <LayerList layers = {webmap.layers}></LayerList>
    // </div>
    // }
    // </div>
  );
  }
// const Map: FC<MapProps> = () => (
//   <div className={styles.Map}>
//     Map Component
//   </div>
// );

export default Map;
