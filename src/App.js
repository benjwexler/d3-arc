
import {useEffect, useState, useRef} from 'react';
import BezierEasing from 'bezier-easing';

import * as d3 from 'd3';
import './App.css';

var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

export const degToRadians = (degrees) => degrees * (Math.PI/180);

const ShowIf = ({condition, children}) => {
  if(condition) return children;

  return null;
}





  
const Arc = ({startAngle, endAngle, fill, rotateX = 0}) => {
  // console.log('startAngle', startAngle)
  // console.log('endAngle', endAngle)

  const arc = d3.arc()
.innerRadius( 100 )
  .outerRadius( 150 )
  .startAngle( degToRadians(startAngle) ) 

const arcTween = (newAngle) => {

  // The function passed to attrTween is invoked for each selected element when
  // the transition starts, and for each element returns the interpolator to use
  // over the course of transition. This function is thus responsible for
  // determining the starting angle of the transition (which is pulled from the
  // element’s bound datum, d.endAngle), and the ending angle (simply the
  // newAngle argument to the enclosing function).
  return function(d) {

    // To interpolate between the two angles, we use the default d3.interpolate.
    // (Internally, this maps to d3.interpolateNumber, since both of the
    // arguments to d3.interpolate are numbers.) The returned function takes a
    // single argument t and returns a number between the starting angle and the
    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
    // newAngle; and for 0 < t < 1 it returns an angle in-between.
    // console.log('d end', d.endAngle)
    // var interpolateNew = d3.interpolate(d.startAngle, d.endAngle);
    var interpolate = d3.interpolate(d.endAngle, newAngle);

    // The return value of the attrTween is also a function: the function that
    // we want to run for each tick of the transition. Because we used
    // attrTween("d"), the return value of this last function will be set to the
    // "d" attribute at every tick. (It’s also possible to use transition.tween
    // to run arbitrary code for every tick, say if you want to set multiple
    // attributes from a single function.) The argument t ranges from 0, at the
    // start of the transition, to 1, at the end.
    return function(t) {

      // Calculate the current arc angle based on the transition time, t. Since
      // the t for the transition and the t for the interpolate both range from
      // 0 to 1, we can pass t directly to the interpolator.
      //
      // Note that the interpolated angle is written into the element’s bound
      // data object! This is important: it means that if the transition were
      // interrupted, the data bound to the element would still be consistent
      // with its appearance. Whenever we start a new arc transition, the
      // correct starting angle can be inferred from the data.
      // d.startAngle = interpolate(t);
      // d.startAngle = interpolateNew(t)
      d.endAngle = interpolate(t);

      // Lastly, compute the arc path given the updated data! In effect, this
      // transition uses data-space interpolation: the data is interpolated
      // (that is, the end angle) rather than the path string itself.
      // Interpolating the angles in polar coordinates, rather than the raw path
      // string, produces valid intermediate arcs during the transition.
      return arc(d);
    };
  };
}

 const pathRef = useRef();


 
var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    // It's in radian, so Pi = 3.14 = bottom.
  // .endAngle( degToRadians(endAngle) )

  // console.log('initD', initD())

  
  

  useEffect(() => {
    const foreground = d3.select(pathRef.current)
  .datum({endAngle: degToRadians(endAngle), startAngle: degToRadians(startAngle)})
  // .style('fill', 'orange')
  .attr('d', arc)
  // .transition()
  // .delay(0)
  //     .duration(1000)
  //     .attrTween("d", arcTween(degToRadians(endAngle)))

    // if(!pathRef?.current) return

  

    // pathRef.current
    // .transition()
    // .duration(1500)
    // .attrTween('d', (d) => {
    //     return (t) => {
    //       const angle = d3.interpolate(d.endAngle, d.newAngle)(t);
    //       // ^^^ interpolate datum values using time.
    //       initD.startAngle(angle);
    //       // ^^^ call methods of arc() to configure what you need.
    //       return initD(null);
    //       // ^^^ call arc function to render "d" attribute.
    //     };
    //   });
  

  }, [startAngle, endAngle])



//   initD.attrTween('d', (d) =>  {
//       var i = d3.interpolate(d.startAngle, d.endAngle);
//       return function(t) {
//           d.endAngle = i(t);
//         return initD(d);
//       }
//  })

    // d3.interval(function() {
    //   d.transition()
    //       .duration(750)
    //       .attrTween("d", arcTween(Math.random() * tau));
    // }, 1500);


    // d.transition()
    //   .duration(750)
    //   .attrTween("d", arcTween(Math.random() * tau));

  return (
    // <svg style={{height: 400, width: 1000}}>
     <path
     ref={pathRef}
      transform= {`translate(400,200) rotate(${rotateX}, 0, 0)`}
      // d={initD()}
        style={{
          // stroke: 'black',
          fill,

        }}
       
     />
    // </svg>
  )
}

function App() {
  const [angles, setAngles] = useState({
    1: {startAngle: 0, endAngle:0},
    2: {startAngle: 180, endAngle:180},

    
  });

  const ratio = 3/7;

  // const [endAngle, setEndAngle] = useState(0);
  const [progress, setProgress ] = useState(0);
  const [progress2, setProgress2] = useState(0)
  // const [rotateX, setRotateX] = useState(0);
  // cubic-bezier(1,-1.44,0,.99)
  // cubic-bezier(1,-1.44,0,1.67)

  var easing = BezierEasing(1.00, 0.00, 1.00, 0.75);
  const easing2 = BezierEasing(1,-1.44,0,1.67);

  console.log('progress', progress)
  console.log('easing', easing(progress))

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevVal => {
          if(progress > 1) {
          clearInterval(interval);
        }

        const newProgress = prevVal += 0.01;
        return newProgress > 1 ? 1 : newProgress
      })
      // setEndAngle(prevAngle => {
      //   if(prevAngle > 360) {
      //     clearInterval(interval);
      //   }

      //   const newAngle = prevAngle + 5;
        
      //   return newAngle > 360 ? 360 :newAngle
      // })
      
      // setAngles(prevAngles => {
      //   const newAngles = {...prevAngles};

        
      //   newAngles[1].endAngle = newAngles[1].endAngle + 1;
        
      //   newAngles[2].endAngle = newAngles[2].endAngle + 1

      //   if(newAngles[1].endAngle > 360) newAngles[1].endAngle = 360;
      //   if(newAngles[2].endAngle > 360) newAngles[2].endAngle = 360;
      //   // if(prevVal > 180) {
      //   //   clearInterval(interval);
      //   // }
      //   return newAngles
      // })
    }, 17)

    
    



  }, [])



  const endAngle = easing(progress) * 360 > 360 ? 360 : easing(progress) * 360;
  const rotateX = 90 * easing2(progress2)

  useEffect(() => {

    

    if(endAngle >= 360) {
      // setRotateX(-90)



      const interval = setInterval(() => {
        setProgress2(prevVal => {
            if(progress > 1) {
            clearInterval(interval);
          }
  
          const newProgress = prevVal += 0.001;
          return newProgress > 1 ? 1 : newProgress
        })
      })

    }
       
    
    
  }, [endAngle])


  return (
    <div>
    <svg style={{height: 400, width: 1000}}>
    {/* <ShowIf condition={endAngle < 180}> */}
{/* <>
    <Arc
      startAngle={0}
      endAngle={endAngle * ratio > 180 ? 180 : endAngle * ratio}
      fill='#69b3a2' 
      />
    <Arc
      startAngle={endAngle * ratio > 180 ? 180 : endAngle * ratio}
      endAngle={endAngle > 180 ? 180 : endAngle} 
      fill='black'
      />

       </> */}
      {/* </ShowIf> */}

<ShowIf condition={endAngle >= 180}>
<>
      <Arc
      startAngle={180}
      endAngle={endAngle * ratio < 180 ? 180 : endAngle * ratio}
      fill='#69b3a2'
      rotateX={rotateX}
      />
    <Arc
      startAngle={endAngle * ratio < 180 ? 180 : endAngle * ratio}
      endAngle={endAngle} 
      fill='black'
      rotateX={rotateX}
      />
      </>
      </ShowIf>

</svg>
    </div>
  );
}

export default App;
