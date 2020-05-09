import React from 'react';
import AppContext from '../AppContext';
import { renderRoutes } from 'react-router-config';

function Layout(props) {
  const { classes } = props;
 
  return (
       <AppContext.Consumer>
        {({ routes }) => (
      <div >
             {
              renderRoutes(routes)
             }
      </div>
        )}
    </AppContext.Consumer>
  );
}

export default Layout;