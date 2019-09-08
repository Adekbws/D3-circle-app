import React from 'react';

const renderCircle = React.memo(({d, index, ...props}) => {

    const circleProps = {
      id: d.data.id,
      className:'ball',
      r: d.r/1.5,
      weight: d.r,
      key: index
    };
    return <circle {...circleProps} />;
});

export default renderCircle