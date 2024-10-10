import React, { useEffect } from 'react';

// components 
import { NioIcon, NioStickyBadge , NioSection} from '../../components'

function CompetionLayout({ title = "Page Title Goes Here", rootClass = "layout-1", children }) {

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
 
 {/* <NioSection className="bg-purple-100" masks={['shape-18']} py={false}>
       </NioSection> */}
       <div className="nk-split-page flex-column flex-xl-row">
        <div className="nk-split-col nk-auth-col justify-content-center">
          {children}
        </div>
        </div>
    </>
  )
}
export default CompetionLayout;