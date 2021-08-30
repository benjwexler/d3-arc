
import { useEffect } from 'react';
import * as d3 from 'd3';
import { degToRadians } from './App';
let endAngle1 = 0;
const NewApp = () => {

  const ratio = 12/24;
  let progress = 0;

  useEffect(() => {
    var width = 960
    const height = 500

    var arc_colors = ["black", "purple", "#CCDE66", "#4B90A6"]
    var inner_radius = 80
    var radius_width = 30

    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var arc = d3.arc()

    var data = []
    for (var k = 0; k < 2; k++) {

      var score = 0.7 * Math.random()
      // var startAngle = Math.random() * 2 * Math.PI
      var startAngle = 0
      // var endAngle = startAngle + score * 2 * Math.PI
      var endAngle = 0
      data.push({
        startAngle: startAngle,
        endAngle: endAngle,
        innerRadius: inner_radius + 0 * radius_width,
        outerRadius: inner_radius + (0 + 1) * radius_width,
        fill: arc_colors[k]
      })

    }

    svg.selectAll("path").data(data).enter()
      .append("path")
      .style("fill", function (d) { return d.fill })
      .attr("d", arc);

   const interval = d3.interval(function () {

      if(progress > -.1) {
        progress = 1;
        interval.stop();

        const angle1End = degToRadians(360 * progress * ratio)

        const angles = {
          1: {
            start: 0,
            end: angle1End,
          },
          2: {
            start: angle1End,
            end: degToRadians(360 * progress),
          },
        }
    
    
          svg.selectAll("path")
            .each(function (d, i) {
              // if (i === 1) {
              // put all your operations on the second element, e.g.
              d3.select(this)
                .transition()
                .duration(2200)
                .ease(d3.easeBounceOut)
    
                .attrTween("d", function (d) { return arcTween(d, angles[i + 1]) })
              // }
            })

            return;

          
        
      }

      // return

      progress += 0.005

      const angle1End = degToRadians(360 * progress * ratio)

      const angles = {
        1: {
          start: 0,
          end: angle1End,
        },
        2: {
          start: angle1End,
          end: degToRadians(360 * progress),
        },
      }


      svg.selectAll("path")
        .each(function (d, i) {
          // if (i === 1) {
          // put all your operations on the second element, e.g.
          d3.select(this)
            .transition()
            .duration(16)
            // .ease(d3.easeExpOut)

            .attrTween("d", function (d) { return arcTween(d, angles[i + 1]) })
          // }
        })

       

    }, 17, -17)

  

    

    function arcTween(d, angle) {
      
      // console.log('index', index)
      // var new_startAngle = Math.random() * 2 * Math.PI
      // const offset = index === 1 ? endAngle1 : 0
      
      var new_startAngle = angle.start
      // var new_endAngle = new_startAngle + new_score * 2 * Math.PI
      var new_endAngle = angle.end
      // console.log('newEndAng', new_endAngle)
      // if(index == 0) {
      //   endAngle1 = new_endAngle
        
      // }
      // console.log('endAngle', endAngle1)
      var interpolate_start = d3.interpolate(d.startAngle, new_startAngle)
      var interpolate_end = d3.interpolate(d.endAngle, new_endAngle)
      return function (t) {
        d.startAngle = interpolate_start(t)
        d.endAngle = interpolate_end(t)
        return arc(d)
      }
    }

  }, [])
  return null;


}

export default NewApp;