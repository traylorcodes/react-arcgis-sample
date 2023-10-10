import
// React,
{ FC, useRef, useState, useEffect } from 'react';
// import styles from './ListItem.module.scss';
import { loadModules } from 'esri-loader';
// import esri = __esri;
import {
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

      loadModules
        <[
          typeof __esri.reactiveUtils
        ]>
        ([
          'esri/core/reactiveUtils',
        ])
        .then(([reactiveUtils]) => {
          reactiveUtils.watch(() => props.layer.visible, (newValue: boolean) => {
            console.log('here');
            if (newValue === true) {
              setIcon('view-visible');
              return;
            }
            setIcon('view-hide');
          });
        });
      hasWatchers.current = true;
    }
  }, [props.layer.visible])

  return (
    <CalciteLabel layout='inline'>
      {<CalciteButton iconStart={icon} kind={'neutral'} onClick={() => { props.layer.visible = !props.layer.visible }}></CalciteButton>}
      {props.layer.title}
    </CalciteLabel>
  );
}
export default ListItem;
