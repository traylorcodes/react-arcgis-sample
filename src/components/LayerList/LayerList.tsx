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
    const temp: Array<any> = [];
    props.layers.items.forEach((layer: any) => {
      temp.push(
        <ListItem key = {layer.title} layer = {layer}></ListItem>
        );
    });
    setLayerListItems(temp);
  }, []);

  return (
  <CalcitePanel heading = "Layers">
    <div className = {styles.body}>
    {layerListItems}
    </div>
  </CalcitePanel>
  );
};

export default LayerList;
