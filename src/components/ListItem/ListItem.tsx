import React, { FC, useRef, useState, useEffect } from 'react';
import styles from './ListItem.module.scss';
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import {
  CalciteIcon,
  CalciteLabel,
  CalciteButton
} from '@esri/calcite-components-react';

interface ListItemProps {
  layer: any
}

const ListItem: FC<ListItemProps> = (props) => {
  const hasWatchers = useRef<Boolean>(false);
  const [icon, setIcon] = useState<'view-visible' | 'view-hide'>(
    props.layer.visible ? 'view-visible' : 'view-hide'
  );

  useEffect(() => {
    if (!hasWatchers.current) {
      reactiveUtils.watch(() => props.layer.visible, (newValue) => {
        if (newValue === true) {
          setIcon('view-visible');
          return;
        }
        setIcon('view-hide');
      });
      hasWatchers.current = true;
    }
    }, [])
    
    useEffect(() => {}, [icon]);

return (
  <CalciteLabel layout = 'inline'>
    {/* <CalciteIcon icon = {icon} onClick = {() => {props.layer.visible = !props.layer.visible}}></CalciteIcon> */}
    { <CalciteButton iconStart = {icon} kind = {'neutral'} onClick = {() => {props.layer.visible = !props.layer.visible}}></CalciteButton>}
    {props.layer.title}
  </CalciteLabel>
);
}
export default ListItem;
