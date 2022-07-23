import React from 'react';
import Menu from '../../components/Menu/Menu';


const NormalRoute = ({ component: Component, menu, ...rest }) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {menu && <Menu />}
      <Component {...rest} />
    </div>
  );
};

export default NormalRoute;
