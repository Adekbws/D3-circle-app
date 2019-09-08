import React from 'react';

const renderText = React.memo(({d, index, dataLength}) => {
    const textProps = {
      clipPath: "url(#"+d.data.clipId+")", 
      key: index
    }
    const words = d.data.name.split(/(?=[A-Z][^A-Z])/g);
    const tspanProps = (i, words) => {
      return {
        x: 0,
        y: `${i - words.length / 2 + 0.8}em`,
      }
    }

    return <text {...textProps} fill="red" fontSize={d.r/5}>{words.map((w,i,words) => <tspan key={i} {...tspanProps(i,words)}>{w}</tspan>)}</text>;
});

export default renderText