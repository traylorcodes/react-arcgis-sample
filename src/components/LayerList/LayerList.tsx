import React, { FC, useEffect, useState } from 'react';
import styles from './LayerList.module.scss';
import ListItem from '../ListItem/ListItem';
import {
  CalcitePanel,
} from '@esri/calcite-components-react';

interface LayerListProps {
  layers: any
}

const LayerList: FC<LayerListProps> = (props) => {

  const [layerListItems, setLayerListItems] = useState<Array<any>>([]);

  useEffect(() => {
    // console.log('props:', props);
    const temp: Array<any> = [];
    props.layers.items.forEach((layer: any) => {
      temp.push(
        <ListItem key = {layer.title} layer = {layer}></ListItem>
        );
      // temp.push(
      //   <div key = {layer.title} className = {styles.listItemDivs} onClick = {() => {layer.visible = !layer.visible}}>
      // <p >{layer.title}</p>
      //   </div>

      // );
    });
    setLayerListItems(temp);
  }, []);

  return (
  // <div className={styles.LayerList}>
  <CalcitePanel heading = "Layers">
    {layerListItems}
  </CalcitePanel>
  // </div>
  );
};

export default LayerList;
