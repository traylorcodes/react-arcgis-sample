import React, { FC, useEffect, useState } from 'react';
import styles from './LayerList.module.scss';

interface LayerListProps {
  layers: any
}

const LayerList: FC<LayerListProps> = (props) => {

  const [layerListItems, setLayerListItems] = useState<Array<any>>([]);

  useEffect(() => {
    console.log('props:', props);
    const temp: Array<any> = [];
    props.layers.items.forEach((layer: any) => {
      temp.push(<p key = {layer.title}>{layer.title}</p>);
    });
    setLayerListItems(temp);
  }, []);

  return (
  <div className={styles.LayerList}>
    {layerListItems}
  </div>
  );
};

export default LayerList;
