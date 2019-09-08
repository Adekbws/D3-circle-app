import React, {useState}       from 'react';
import ScatterPlot from './components/scatter-plot';

//set container size
const styles = {
  width   : 932,
  height  : 600,
};

// The number of data points for the chart.
let numDataPoints = 10;
// circles limit
const ballLimit = 40;

//returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

//create random params for circle
const randomCircleParams = (radius) => {
  return {
    id:Math.random().toString(36).substr(2, 9),
    clipId:Math.random().toString(36).substr(2, 9), 
    name:"lorem Ipsum",
    x:randomNum(),
    y:randomNum(), 
    value: radius,
    aoa:(Math.PI / Math.floor((Math.random() * 100) + 1)),
    weight: radius
  }
}

const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => randomCircleParams(randomNum()) );
}

export default () =>{

  const [data, setData] = useState(randomDataSet());
  const [circleRefs, setCircleRefs] = useState([]);
  const [reset, changeReset] = useState(false);
  const [resetWhenAdd, changeResetWhenAdd] = useState(false);

   //change reset varaibles status
   const setReset = (boolean) => {
    changeReset(boolean);
    changeResetWhenAdd(boolean);
  }

  //randomize data and reset
  const randomizeData = () => {
    setData(randomDataSet());
    changeReset(true);
  }

  //add circle to container
  const addCircle = () =>{
    numDataPoints++;
    if(data.length < ballLimit){
      data.push(randomCircleParams(randomNum()));
      setData(data);
      changeResetWhenAdd(true);
    }
    
  }

  //remove last circle
  const removeCircle = () => {
    if(data.length > 1){
      numDataPoints--;
      circleRefs.pop()
      setCircleRefs(circleRefs)
      data.pop()
      setData(data)
      changeResetWhenAdd(true);
    }
  }
  
  return( 
    <div>
      <h1>LorBall React and D3</h1>
      <div>
        <ScatterPlot  {...{data, circleRefs, reset, resetWhenAdd}} {...styles} setReset={setReset}/>
      </div>
      
      <div className="controls">
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={removeCircle}>Remove last Circle</button>
        <button className="btn randomize" onClick={() => randomizeData()}>
          Randomize Data
        </button>
        <span>{data.length}</span>
      </div>
    </div>
  );
  

}


