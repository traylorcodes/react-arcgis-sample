import React, { FC, useEffect, useRef, useState } from 'react';
import LayerList from '../LayerList/LayerList';
import styles from './Map.module.scss';
import MapView from "@arcgis/core/views/MapView.js";
import WebMap from "@arcgis/core/WebMap.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import {
  CalciteShellPanel,
  CalciteShell,
  } from '@esri/calcite-components-react';
import { loadModules } from 'esri-loader';


interface MapProps {}

const Map: FC<MapProps> = () => {

  const [webmapLoaded, setWebmapLoaded] = useState<Boolean>(false);

  const [showListPanel, setShowListPanel] = useState<Boolean>(false);
  
  const [viewDivStyle /* , setViewDivStyle */] = useState<any>(styles.viewDiv);

  const hasWatchers = useRef<Boolean>(false);

  const mapEl = useRef(null);

  // const layers = useRef<any>(null);
  const [layers, setLayers] = useState<any>(null);

// const [webmap /* , setWebmap */] = useState<WebMap>(new WebMap({
//     portalItem: {
//       id: '0465bbcbaa9d44e0bce20415174279b1'
//     },
//     basemap: 'hybrid'
//   }));

//   const [view /* , setView */] = useState<MapView>(new MapView({
//     map: webmap
//   }));

//   const [layerListExpand, /*setLayerListExpand*/] = useState<Expand>(new Expand({
//     expandTooltip: 'Layer List',
//     expandIconClass: 'esri-icon-layer-list',
//     expanded: false
//   }));

//   const [basemapExpand, /*setBasemapExpand */] = useState<Expand>(new Expand({
//     content: new BasemapGallery({view: view}),
//     expandTooltip: 'Basemaps',
//     expanded: false
//   }));



  useEffect(() => {
    loadModules([
      'esri/widgets/BasemapGallery',
      'esri/widgets/Expand',
      'esri/views/MapView',
      'esri/WebMap'
    ])
    .then(([BasemapGallery, Expand, MapView, WebMap]) => {
     const webmap = new WebMap({
            portalItem: {
              id: '0465bbcbaa9d44e0bce20415174279b1'
            },
            basemap: 'hybrid'
          });
    
    const view = new MapView({
          map: webmap
        });

    const layerListExpand = new Expand({
          expandTooltip: 'Layer List',
          expandIconClass: 'esri-icon-layer-list',
          expanded: false
        });

    const basemapExpand = new Expand({
          content: new BasemapGallery({view: view}),
          expandTooltip: 'Basemaps',
          expanded: false
        });

      if (mapEl.current && !view.container) {
        view.container = mapEl.current;
      }

      webmap.when(() => {
        setLayers(webmap.layers);
        // layers.current = webmap.layers;
        // indicate that the webmap is loaded and the layer list can be created
        setWebmapLoaded(true);
      });

      view.when(() => {
        view.ui.add(layerListExpand,
          'top-right');
        view.ui.add(basemapExpand, 'top-right');
        });

    // watch the expanded property of the layer list expand, open panel if expanded
    if (hasWatchers.current === false) {
      reactiveUtils.watch(() => layerListExpand.expanded, (newValue) => {
        if (newValue) {
          setShowListPanel(true);
          return;
        }
        setShowListPanel(false);
      });
          hasWatchers.current = true;
      }


      });
  }, []);

  useEffect(() => {
    // // watch the expanded property of the layer list expand, open panel if expanded
    // if (hasWatchers.current === false) {
    //   reactiveUtils.watch(() => layerListExpand.expanded, (newValue) => {
    //     if (newValue) {
    //       setShowListPanel(true);
    //       return;
    //     }
    //     setShowListPanel(false);
    //   });
    //       hasWatchers.current = true;
    //   }
  }, [])

useEffect(() => {}, [webmapLoaded, showListPanel, viewDivStyle, layers])

  return (
    <CalciteShell>
      <CalciteShellPanel slot = "panel-end" collapsed = {!showListPanel}>
        { 
        // webmapLoaded &&  <LayerList layers = {webmap.layers}></LayerList>
        webmapLoaded && <LayerList layers = {layers}></LayerList>
        }
      </CalciteShellPanel>
      <div ref = {mapEl} className = {viewDivStyle}></div>
    </CalciteShell>
  );
  }

export default Map;
