import React, { useEffect } from 'react';
import { NioIcon, NioBrand, NioMedia, NioStickyBadge } from '../../components';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function SuperAdminLayout({ title = "Page Title Goes Here", rootClass = "layout-1", children }) {

  useEffect(() => {
    document.title = `${title} - NioLand React Template`
  }, [title]);

  useEffect(() => {
    // Apply rootClass to the body element when the rootClass prop changes
    const body = document.querySelector('body');

    if (rootClass) {
      body.classList.add(rootClass);
    }

    // Remove the previous rootClass if it exists
    return () => {
      if (rootClass) {
        body.classList.remove(rootClass);
      }
    };
  }, [rootClass]);

  return (
    <>
      <div className="nk-split-page flex-column flex-xl-row" >
      <Sidebar>
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
  </Menu>
</Sidebar>;
        
      </div>

    </>
  )
}

export default SuperAdminLayout;
