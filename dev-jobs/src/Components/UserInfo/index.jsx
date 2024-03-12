import React from 'react';
import styles from './UserInfo.module.css';

export const UserInfo = ({ avatarUrl, fullName, _id }) => {
  return (
      <>
        <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt="" />
        <span>{fullName}</span>
      </>
  );
};
