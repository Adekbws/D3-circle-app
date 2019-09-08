import React from 'react';
import DataCircle  from './data-circle';
import DataText from './data-text';
import DataClipPath from './data-clip-path';

class GBox extends React.Component {

    jumpSize = 1; // equivalent of speed default to 1

    constructor(props) {
        super(props);
        this.circleRef = React.createRef();
        this.posX  = props.d.x;
        this.posY = props.d.y;
        this.aoa = props.d.data.aoa; // initial angle of attack
        this.radius = props.d.r/1.5;
        this.weight = props.d.data.weight;

        //aoa and speed together is velocity 
        this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
        this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
      }

      componentDidMount(){
          this.props.circleRefs.push(this);
      }

      componentDidUpdate(props){
          if(props.reset){
            props.setReset(false);

            this.posX  = props.d.x;
            this.posY = props.d.y;
            this.weight = props.d.data.weight;
            this.aoa = props.d.data.aoa; // initial angle of attack
            this.radius = props.d.r/1.5;
            //aoa and speed together is velocity 
            this.vx = Math.cos(this.aoa) * this.jumpSize; // velocity x
            this.vy = Math.sin(this.aoa) * this.jumpSize; // velocity y
        }
        if(props.resetWhenAdd){
            props.setReset(false);
            this.radius = props.d.r/1.5;
        }
      }

      Move() {
        const width = this.props.width;
        const height = this.props.height;
        
        this.posX += this.vx;
        this.posY += this.vy;
    
        if (parseInt(width) <= (this.posX + this.radius)) {
            this.posX = parseInt(width) - this.radius - 1;
            this.aoa = Math.PI - this.aoa;
            this.vx = -this.vx;
        }
    
        if ( this.posX < this.radius) {
            this.posX = this.radius+1;
            this.aoa = Math.PI - this.aoa;
            this.vx = -this.vx;
        }
    
        if (parseInt(height) < (this.posY + this.radius)) {
            this.posY = parseInt(height) - this.radius - 1;
            this.aoa = 2 * Math.PI - this.aoa;
            this.vy = -this.vy;
        }
    
        if (this.posY < this.radius) {
            this.posY = this.radius+1;
            this.aoa = 2 * Math.PI - this.aoa;
            this.vy = -this.vy;
        }
    
        if (this.aoa > 2 * Math.PI)
            this.aoa = this.aoa - 2 * Math.PI;
        if (this.aoa < 0)
            this.aoa = 2 * Math.PI + this.aoa;
    
        this.forceUpdate();
      }
    
      render() {
        return (
            <g key={this.props.index} transform={`translate(${this.posX + 1},${this.posY + 1})`}>
                <DataCircle {...this.props.props} {...this.props.scales} d={this.props.d} index={this.props.index}/>
                <DataClipPath {...this.props.propsy} {...this.props.scales} d={this.props.d} index={this.props.index}/>
                <DataText {...this.props.propsy} {...this.props.scales} d={this.props.d} index={this.props.index} dataLength={this.props.data.length}/>
            </g>
        );
      }
}

export default GBox