// export function Color() {

//   const getRandomColor = (a,b,c,d,e,f,g,h,i) => map.(Math.floor(Math.random() * 256));

//   const clicking = (getRandomColor) => {
//     console.log("button clicked");
//     document.getElementsByTagName(
//       "body"
//     )[0].style.background = `linear-gradient(90deg, rgb(${a},${b},${c}),rgb(${d},${e},${f}),rgb(${g},${h},${i}) )`;
//   };
//   return (
//     <div className="container">
//       <button onClick={clicking}>Change Gradient</button>
//     </div>
//   );
// }


import React, { useState } from 'react';

export default function Color() {
  const getRandomColor = () => Math.floor(Math.random() * 256);

  const clicking = () => {
    const colors = Array.from({ length: 3 }, () => `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`);
    const gradient = colors.join(', ');

    document.body.style.background = `linear-gradient(90deg, ${gradient})`;
  };

  return (
    <div className="container">
      <button onClick={clicking}>Change Gradient</button>
    </div>
  );
}


