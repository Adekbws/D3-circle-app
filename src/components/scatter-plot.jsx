import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import GBox from './data-g';

var playStatus = null;

export default (props) => {
    const width = props.width;
    const height = props.height;
    const pack = data => d3.pack().size([width - 2, height - 2]).padding(3)(d3.hierarchy({children: data}).sum(d => d.value))
    const root = (props) => pack(props.data);
    const dataPack = root(props).leaves();

    let [startStopFlag, changePlayFlag] = useState(null);
    playStatus = startStopFlag;

    useEffect(() => {
        if (props.circleRefs.length > 0 ) StartStopGame(props.circleRefs);
    }, [props.circleRefs])
    
    function StartStopGame(balls) {
        
        if (startStopFlag == null) {
            console.log("startujemy");
            var t = d3.timer(function () {
                for (var i = 0; i < balls.length; ++i) {
                    //console.log("timer ")
                    balls[i].Move();
                    for (var j = i + 1; j < balls.length; ++j) {
                        ProcessCollision(i, j);
                    }
                }
                if (playStatus == null) t.stop();
                
            }, 500);
            startStopFlag = 1;
            changePlayFlag(startStopFlag);
        }
        else {
            startStopFlag = null;
            changePlayFlag(startStopFlag); 
        }
    }

    function ProcessCollision(ball1, ball2) {
        if (ball2 <= ball1)
            return;
        if (ball1 >= (props.circleRefs.length-1) || ball2 >= props.circleRefs.length )
            return;
    
        ball1 = props.circleRefs[ball1];
        ball2 = props.circleRefs[ball2];
        
        if ( CheckCollision(ball1, ball2) ) {
    
            // calculate new velocity of each ball.
            var vx1 = (ball1.vx * (ball1.weight - ball2.weight)
                + (2 * ball2.weight * ball2.vx )) / (ball1.weight + ball2.weight);
            var vy1 = (ball1.vy * (ball1.weight - ball2.weight)
                + (2 * ball2.weight * ball2.vy)) / (ball1.weight + ball2.weight);
            var vx2 = (ball2.vx * (ball2.weight - ball1.weight)
                + (2 * ball1.weight * ball1.vx)) / (ball1.weight + ball2.weight);
            var vy2 = (ball2.vy * (ball2.weight - ball1.weight)
                + (2 * ball1.weight * ball1.vy)) / (ball1.weight + ball2.weight);
    
            //set velocities for both balls
            ball1.vx = vx1;
            ball1.vy = vy1;
            ball2.vx = vx2;
            ball2.vy = vy2;
    
            //ensure one ball is not inside others. distant apart till not colliding
            while (CheckCollision(ball1, ball2)) {
                
                ball1.posX += ball1.vx;
                ball1.posY += ball1.vy;
    
                ball2.posX += ball2.vx;
                ball2.posY += ball2.vy;
    
            }
                ball1.forceUpdate();
                ball2.forceUpdate();
        }
    }
    
    function CheckCollision(ball1, ball2) {
        var absx = Math.abs(parseFloat(ball2.posX) - parseFloat(ball1.posX));
        var absy = Math.abs(parseFloat(ball2.posY) - parseFloat(ball1.posY));
    
        // find distance between two balls.
        var distance = (absx * absx) + (absy * absy);
        distance = Math.sqrt(distance);
        
        // check if distance is less than sum of two radius - if yes, collision
        if (distance < (parseFloat(ball1.radius) + parseFloat(ball2.radius))) {
            //console.log("check colission true")
            return true;
        }
        return false;
    }

  return (
  <div>
    <svg className="bubble-box" viewBox={`0,0,${width},${height}`} fontSize="10" fontFamily="sans-serif" textAnchor="middle">
        {dataPack.map((d,i,data) => <GBox {...props} key={i}  d={d} index={i} data={data} />  )}
    </svg>
    <div><button className="start-stop-bt" onClick={() => StartStopGame(props.circleRefs)} >{!startStopFlag ? "Start":"Stop"}</button> </div>
  </div>
  )
}