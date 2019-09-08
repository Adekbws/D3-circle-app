import React from 'react';

const renderClip = React.memo(({d, index, dataLength}) => {
    const clipProps = {
      id: d.data.clipId, 
    }
    const useProps = {
      href: "#"+d.data.id
    };
    return <clipPath {...clipProps}><use {...useProps}/></clipPath>;
});

export default renderClip