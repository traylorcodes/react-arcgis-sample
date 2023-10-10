import
// React,
{ FC, useEffect, useRef, useState } from 'react';
import LayerList from '../LayerList/LayerList';
import styles from './Map.module.scss';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import {
  CalciteShellPanel,
  CalciteShell,
} from '@esri/calcite-components-react';
import { loadModules } from 'esri-loader';
// import esri = __esri;


interface MapProps { }

const Map: FC<MapProps> = () => {
  const [showListPanel, setShowListPanel] = useState<Boolean>(false);
  const [layers, setLayers] = useState<any>(null);
  const mapEl = useRef(null);
  // const [webmap, setWebmap] = useState<__esri.WebMap>();
  // const [view, setView] = useState<any>();
  const modulesLoaded = useRef<Boolean>(false);

  // type BasemapGallery = typeof import('esri/widgets/BasemapGallery');
  // type Expand = typeof import('esri/widgets/Expand');
  // type MapView = typeof import('esri/views/MapView');
  // type reactiveUtils = typeof import('esri/core/reactiveUtils');
  // type WebMap = typeof import('esri/WebMap');

  // type MapModules = [
  //   typeof import ('esri/widgets/BasemapGallery'),
  //   typeof import('esri/widgets/Expand'),
  //   typeof import('esri/views/MapView'),
  //   typeof import('esri/core/reactiveUtils'),
  //   typeof import ('esri/WebMap'),
  // ];

  useEffect(() => {
    if (!modulesLoaded.current) {

      loadModules
        // <[WebMap, MapView, BasemapGallery, Expand, reactiveUtils]>
        <[
          typeof __esri.WebMap,
          typeof __esri.MapView,
          typeof __esri.BasemapGallery,
          typeof __esri.Expand,
          typeof __esri.reactiveUtils
        ]>
        ([
          'esri/WebMap',
          'esri/views/MapView',
          'esri/widgets/BasemapGallery',
          'esri/widgets/Expand',
          'esri/core/reactiveUtils'
        ])
        .then(([WebMap, MapView, BasemapGallery, Expand, reactiveUtils]) => {

          // create the WebMap
          const webmap: __esri.WebMap = new WebMap({
            portalItem: {
              id: '0465bbcbaa9d44e0bce20415174279b1'
            },
            basemap: 'hybrid'
          });

          // store the layers once the webmap has loaded
          webmap.when(() => {
            setLayers(webmap.layers);
          });

          // create the MapView
          const view: __esri.MapView = new MapView({
            map: webmap,
            container: mapEl.current ? mapEl.current : undefined
          });

          // add the UI once the view has loaded
          view.when(() => {
            const layerExpand = new Expand({
              expandTooltip: 'Layer List',
              expandIconClass: 'esri-icon-layer-list',
              expanded: false
            });

            // watch the value of the layer expand's expanded property
            reactiveUtils.watch(() => layerExpand.expanded, (newValue: boolean) => {
              setShowListPanel(newValue);
            });

            view.ui.add(new Expand({
              content: new BasemapGallery({ view: view }),
              expandTooltip: 'Basemaps',
              expanded: false
            }), 'top-right');

            view.ui.add(layerExpand, 'top-right');

          });

          // store the WebMap and MapView
          // setWebmap(webmap);
          // setView(view);


          // destroy perhaps?
          // return () => {
          //   console.log('destroy');
          //   webmap.destroy();
          //   view.destroy();
          // }
        });
      modulesLoaded.current = true;
    }
  }, [])

  return (
    <CalciteShell>
      <CalciteShellPanel slot="panel-end" collapsed={!showListPanel}>
        {
          layers && <LayerList layers={layers}></LayerList>
        }
      </CalciteShellPanel>
      <div ref={mapEl} className={styles.viewDiv}></div>
    </CalciteShell>
  );
}

export default Map;
