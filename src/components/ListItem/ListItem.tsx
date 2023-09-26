import React, { FC } from 'react';
import styles from './ListItem.module.scss';

interface ListItemProps {}

const ListItem: FC<ListItemProps> = () => (
  <div className={styles.ListItem}>
    ListItem Component
  </div>
);

export default ListItem;
