import React, { FC } from 'react';
import styles from './LayerList.module.scss';

interface LayerListProps {}

const LayerList: FC<LayerListProps> = () => (
  <div className={styles.LayerList}>
    LayerList Component
  </div>
);

export default LayerList;
