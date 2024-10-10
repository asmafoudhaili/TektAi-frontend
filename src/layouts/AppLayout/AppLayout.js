import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// context 
import { useData } from '../../context/DataProvider/DataProvider';
import LayoutProvider from '../../context/LayoutProvider/LayoutProvider';

// components 
import { App } from '../../components';
import Header from "../../components/Header"
import Footer from '../../components/Footer/Footer';
import NioBackTop from '../../components/NioBackTop/NioBackTop';
import NioStickyBadge from '../../components/NioStickyBadge/NioStickyBadge';

function AppLayout({ variant = 2, rootClass, title = 'page title goes here', children }) {

  const data = useData();
  const location = useLocation();

  // Use the same navigation data for the header
  const headerData = data.navigation.one;

  useEffect(() => {
    document.title = `${title} - NioLand React Template`
  }, [title])

  return (
    <LayoutProvider>
      <App rootClass={rootClass}>
        <Header variant={variant} data={headerData} />
        <App.Main>
          {children}
        </App.Main>
        <Footer variant={variant} />
        <NioBackTop />
        <NioStickyBadge />
      </App>
    </LayoutProvider>
  )
}

export default AppLayout;
