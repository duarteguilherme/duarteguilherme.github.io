    // Create the graph using D3


function orient_arrow(x1, y1, x2, y2, r) {
   let orientleft = (x2 < x1) * (1) + (x2 > x1)*(-1);
   let orientdown = (y2 < y1) * (1) + (y2 > y1)*(-1);
   let angle = (-1)* orientleft * Math.atan((y2 - y1) / (x2 - x1));
   let headx = x2 + orientleft * r * Math.cos(angle);
   let heady = y2 + orientdown * r * Math.sin(angle); 
   return [headx, heady];
}

function pawp() {
let paw = d3.select('#test2')
.append("svg")
.attr("width", 100)
.attr("height", 100);
}

pawp();
function create_dag(id_graph, vertexdata, edgedata) {
   console.log(edgedata);
   let svg = d3.select(id_graph);
//   svg.selectAll("*").remove();
 
   let strokecolor = "black";
   let strokewidth = 1.5;
   let lineparam = '';
   let midpoint = [];
   let beziervector = [];
   let controlpoint = [];
   
   edgedata.forEach(d => {
         let idc = Math.floor(Math.random() * 2000);
         controlpoint = [ vertexdata[d[0]].cx, vertexdata[d[0]].cy ];
         svg.append("defs").append("marker")
         .attr("id", "karrowhead" + idc)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 10)
          .attr("refY", 0)
          .attr("markerWidth", 9)
          .attr("markerHeight", 12)
          .attr("orient", "auto")
//          .attr("fill", d[3])
          .append("path")
          .attr("d", "M0,-5 L10,0 L0,5")
          .attr("class", "arrowhead");

          if(typeof d[3] !== 'undefined') {
            strokecolor = d[3];
            strokewidth = 2;
        }
        else {
            strokecolor = "black";
            strokewidth = 1.5;
        }
      // var x2y2 = orient_arrow(vertexdata[d[0]].cx, vertexdata[d[0]].cy, vertexdata[d[1]].cx, vertexdata[d[1]].cy, vertexdata[d[0]].r);
      //    svg.append("line")
      //    .attr("x1", vertexdata[d[0]].cx)
      //    .attr("y1", vertexdata[d[0]].cy)
      //    .attr("x2",x2y2[0])
      //    .attr("y2", x2y2[1])
      //    .attr("stroke", strokecolor)
      //    .attr("stroke-width", strokewidth)
      //    .attr("class", d[2])
      //    .attr("marker-end", "url(#karrowhead" + idc + ")");

      // });
      var x2y2 = orient_arrow(controlpoint[0], controlpoint[1], vertexdata[d[1]].cx, vertexdata[d[1]].cy, vertexdata[d[0]].r);
        // d[4] identify the angle curve, for instance, -0.5 will curve the line to a 0.5 offset right
      if(typeof d[4] !== 'undefined') {
         midpoint = [ (vertexdata[d[0]].cx + x2y2[0])/2, (vertexdata[d[1]].cx + x2y2[1])/2 ]; 
         beziervector = [ (x2y2[0] - vertexdata[d[0]].cx), (- vertexdata[d[1]].cx + x2y2[1]) ];
         controlpoint = [  midpoint[0] + d[4] * beziervector[1],midpoint[1] - d[4] * beziervector[0] ];
         lineparam = "M " + vertexdata[d[0]].cx + " " + vertexdata[d[0]].cy + " Q " + controlpoint[0] + " " + controlpoint[1] + " " + x2y2[0] + " " + x2y2[1];
      }
     else {
      lineparam = "M " + vertexdata[d[0]].cx + " " + vertexdata[d[0]].cy + " L " + x2y2[0] + " " + x2y2[1]
     }

         svg.append("path")
         .attr("d", lineparam)
         .attr("fill", "transparent")
         .attr("stroke", strokecolor)
         .attr("stroke-width", strokewidth)
         .attr("class", d[2])
         .attr("marker-end", "url(#karrowhead" + idc + ")");

      });

      for (let key in vertexdata) {
         let d = vertexdata[key];
         fontsize = d.fontsize == undefined ? d.r * 1.1 : d.fontsize;
         height = d.height == undefined ? d.r*2 : d.height;
         width = d.width == undefined ? d.r*2 : d.width;
         if (d.type == "circle") {
            svg.append(d.type)
            .attr("id", d.id)
            .attr("cx", d.cx)
            .attr("cy", d.cy).attr("r", d.r)
            .attr("fill", d.fill)
            .attr("stroke", d.stroke)
            .attr("stroke-width", "0.075em");
         } else {
            svg.append('rect')
            .attr("id", d.id)
            .attr("x",d.cx - width/2)
            .attr("y",d.cy- height/2)
            .attr("width",width)
            .attr("height",height)
               .attr("fill", d.fill)
               .attr("stroke", "black")
//               .attr("stroke", d.stroke)
               .attr("stroke-width", "0.075em");
         }
     // Add labels
           svg.append("text")
           .attr("x", d.cx)
           .attr("y", d.cy + height/2*0.45)
           .attr("text-anchor", "middle")
           .attr("font-size", fontsize)
           .text(d.text)
           .attr("stroke", "black")
           .attr("fill", "black");
      };
}

function fg1() { 
create_dag('#fg1', 
              {
               'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'a1', 'fontsize': 35*1.1 },
              'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 }
              }, 
              [
                ['A', 'Y', '']
             ]);

            }

function fg2conf() { 
   create_dag('#fg2conf', 
   {
      'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
     'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
     'U':  {'cx': 325, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U','type': 'circle','id': 'y1','fontsize': 35*1.1 }
     }, 
     [
       ['A', 'Y', ''],
       ['U', 'A', 'dashed'],
       ['U', 'Y', 'dashed']
    ])
}

function fg3iv(id) { 
   create_dag(id, 
   {
      'Z':  {'cx': 100, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
      'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
      'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
      'U':  {'cx': 325, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U','type': 'circle','id': 'uz3', 'fontsize': 35*1.1 },  
              }, 
     [
      ['Z', 'A', ''],
       ['A', 'Y', ''],
       ['U', 'A', 'dashed'],
       ['U', 'Y', 'dashed']
    ])
}

function sg1iv_vio() { 
   create_dag('#sg1iv_vio', 
      {
         'Z':  {'cx': 100, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
         'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
         'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
         'U':  {'cx': 275, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U','type': 'circle','id': 'uz3', 'fontsize': 35*1.1 },  
         'US':  {'cx': 250, 'cy':75, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U\'','type': 'circle','id': 'us', 'fontsize': 35*1.1 },  
                 }, 
        [
         ['Z', 'A', ''],
          ['A', 'Y', ''],
          ['U', 'A', 'dashed'],
          ['U', 'Y', 'dashed'],
          ['US', 'Z', 'dashed', 'red'],
          ['US', 'Y', 'dashed', 'red']
       ])
}


function sg2iv_vio() { 
   create_dag('#sg2iv_vio', 
      {
         'Z':  {'cx': 100, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
         'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
         'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
         'U':  {'cx': 325, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U','type': 'circle','id': 'uz3', 'fontsize': 35*1.1 },  
                 }, 
        [
         ['Z', 'A', ''],
          ['A', 'Y', ''],
          ['U', 'A', 'dashed'],
          ['U', 'Y', 'dashed'],
          ['Z', 'Y', 'dashed', 'red', -0.3]
       ])
}

function sg1iv_si() { 
   create_dag("#sg1iv_si", 
   {
      'Z':  {'cx': 100, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
      'A':  {'cx': 250, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'A', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
      'Y':  {'cx': 400, 'cy':300, 'r': 32, 'fill': '#F1FFFF', 'stroke': 'black', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
      'U':  {'cx': 325, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'U','type': 'circle','id': 'uz3', 'fontsize': 35*1.1 },  
      'ZS':  {'cx': 175, 'cy':175, 'r': 32, 'fill': 'white', 'stroke': 'white', 'text':'Z\'','type': 'circle','id': 'zs', 'fontsize': 35*1.1 },  
              }, 
     [
      ['ZS', 'A', 'dashed'],
      ['ZS', 'Z', 'dashed'],
       ['A', 'Y', ''],
       ['U', 'A', 'dashed'],
       ['U', 'Y', 'dashed']
    ])
}

function initializeGraphs() {
   fg1();
   fg2conf();
   fg3iv('#fg3iv');
   fg3iv('#fg3iv2');
   fg3iv('#fg3iv3');
   fg3iv('#sg2iv');
   fg3iv('#sg1iv');
   fg3iv('#sg3iv');
   fg3iv('#sg3iv2');
   sg1iv_vio();
   sg1iv_si();
   sg2iv_vio();
   graphsInitialized = true;
}




conf_graphs = [
            () => create_dag('#conf', 
                      {
                       'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                      'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                      'U':  {'cx': 275, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'y1','fontsize': 35*1.1 }
                      }, 
                      [
                        ['D', 'Y', ''],
                        ['U', 'D', 'dashed'],
                        ['U', 'Y', 'dashed']
                     ]),
            () => create_dag('#conf', 
               {
                  'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle', 'id': 'd1','fontsize': 35*1.1 },
                 'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle','fontsize': 35*1.1 },
                 'Rd':  {'cx': 275, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Rdy', 'type': 'square','fontsize': 35*1.1 }
                 }, 
                 [
                   ['D', 'Y', ''],
                   ['Rd', 'D', 'dashed'],
                   ['Rd', 'Y', 'dashed']
                ]),
                () => { 
                  create_dag('#conf', 
                {
                  'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','fontsize': 35*1.1 },
                  'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle','fontsize': 35*1.1 },
                  'Rd':  {'cx': 275, 'cy':175, 'r': 0.001, 'fill': 'black', 'stroke': 'blue', 'text':'Rdy', 'type': 'square','fontsize': 0.0001 },
                  'X00.Y00':  {'cx': 250, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00\nY00', 'type': 'square','fontsize': 11*1.1, height: 25},
                  'X00.Y01':  {'cx': 300, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y01', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X00.Y10':  {'cx': 200, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y10', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X00.Y11':  {'cx': 350, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y11', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X01.Y00':  {'cx': 250, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00\nY00', 'type': 'square','fontsize': 11*1.1, height: 25},
                  'X01.Y01':  {'cx': 300, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y01', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X01.Y10':  {'cx': 350, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y10', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X01.Y11':  {'cx': 475, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y11', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X10.Y00':  {'cx': 325, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00\nY00', 'type': 'square','fontsize': 11*1.1, height: 25},
                  'X10.Y01':  {'cx': 375, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y01', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X10.Y10':  {'cx': 425, 'cy':150, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y10', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X10.Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y11', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X11.Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00\nY00', 'type': 'square','fontsize': 11*1.1, height: 25},
                  'X11.Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y01', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X11.Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y10', 'type': 'square','fontsize': 11*1.1, height: 25 },
                  'X11.Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'X00.Y11', 'type': 'square','fontsize': 11*1.1, height: 25 }
                }, 
                  [
                    ['D', 'Y', ''],
                    ['Rd', 'D', 'dashed'],
                    ['Rd', 'Y', 'dashed']
                 ])               
               } 
         
                  ];
            

// create_first("#first");



// create_dag("#firstcan2", 800, 800,
//            {
//             'D':  {'cx': 200, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
//            'Y':  {'cx': 450, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
//            'Rd':  {'cx': 200, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Rd', 'type': 'square' },
//            'Ry':  {'cx': 450, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
//            'D0':  {'cx': 233, 'cy':175, 'r': 33, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
//            'D1':  {'cx': 167, 'cy':175, 'r': 33, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' }
//            }, 
//            [
//              ['D', 'Y', ''],
//              ['Rd', 'D', 'dashed'],
//              ['Ry', 'Y', 'dashed']
//           ]);



//  create_dag("#second", 500, 500,
//              {
//               'D':  {'cx': 100, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
//              'Y':  {'cx': 350, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
//              'U':  {'cx': 225, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'U', 'type': 'circle' }
//              }, 
//              [
//                ['D', 'Y', ''],
//                ['U', 'D', 'dashed'],
//                ['U', 'Y', 'dashed']
//             ]);



    function add_simple_dag_dy(id_graph) {
      const svg = d3.select(id_graph, width = 400, height = 300)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

     // Add nodes
     svg.append("circle").attr("cx", 100).attr("cy", 150).attr("r", 25).attr("fill", "black").attr("stroke", "green");
     svg.append("circle").attr("cx", 300).attr("cy", 150).attr("r", 25).attr("fill", "black").attr("stroke", "red");

     // Add labels
     svg.append("text").attr("x", 100).attr("y", 150).attr("text-anchor", "middle").attr("dy", ".3em").attr("fill", "white").text("D");
     svg.append("text").attr("x", 300).attr("y", 150).attr("text-anchor", "middle").attr("dy", ".3em").attr("fill", "white").text("Y");

     // Add arrows
     svg.append("line").attr("x1", 120).attr("y1", 150).attr("x2", 280).attr("y2", 150).attr("stroke", "white").attr("stroke-width", 2);
//     svg.append("line").attr("x1", 200).attr("y1", 70).attr("x2", 115).attr("y2", 130).attr("stroke", "white ").attr("stroke-width", 2).attr("class", "dashed");
//     svg.append("line").attr("x1", 200).attr("y1", 70).attr("x2", 285).attr("y2", 130).attr("stroke", "black").attr("stroke-width", 2).attr("class", "dashed");
   // Add arrowheads
     svg.append("path")
    .attr("d", "M280,150 L270,140 L270,160 Z")
    .attr("class", "arrowhead");

     // Define an arrowhead marker
     svg.append("defs").append("marker")
    .attr("id", "dashed-arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 5)
    .attr("refY", 0)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5 L10,0 L0,5")
    .attr("class", "arrowhead");

     // Add dashed lines with arrowheads
//      svg.append("line")
//     .attr("x1", 200).attr("y1", 70)
//     .attr("x2", 115).attr("y2", 130)
//     .attr("stroke", "white").attr("stroke-width", 2)
//  //        .attr("class", "dashed")
//     .attr("marker-end", "url(#dashed-arrowhead)");

//      svg.append("line")
//     .attr("x1", 200).attr("y1", 70)
//     .attr("x2", 285).attr("y2", 130)
//     .attr("stroke", "white").attr("stroke-width", 2)
//   //       .attr("class", "dashed")
//     .attr("marker-end", "url(#dashed-arrowhead)");
    
    }


    function add_dag(id_graph) {
    const svg = d3.select(id_graph, width = 400, height = 300)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

	    // Add nodes
	    svg.append("circle").attr("cx", 100).attr("cy", 150).attr("r", 20).attr("fill", "#f0f1eb");
	    svg.append("circle").attr("cx", 300).attr("cy", 150).attr("r", 20).attr("fill", "#f0f1eb");
	    svg.append("circle").attr("cx", 200).attr("cy", 50).attr("r", 20).attr("fill", "#f0f1eb");

	    // Add labels
	    svg.append("text").attr("x", 100).attr("y", 150).attr("text-anchor", "middle").attr("dy", ".3em").text("X");
	    svg.append("text").attr("x", 300).attr("y", 150).attr("text-anchor", "middle").attr("dy", ".3em").text("Y");
	    svg.append("text").attr("x", 200).attr("y", 50).attr("text-anchor", "middle").attr("dy", ".3em").text("W");

	    // Add arrows
	    svg.append("line").attr("x1", 120).attr("y1", 150).attr("x2", 280).attr("y2", 150).attr("stroke", "black").attr("stroke-width", 2);
	    svg.append("line").attr("x1", 200).attr("y1", 70).attr("x2", 115).attr("y2", 130).attr("stroke", "black").attr("stroke-width", 2).attr("class", "dashed");
	    svg.append("line").attr("x1", 200).attr("y1", 70).attr("x2", 285).attr("y2", 130).attr("stroke", "black").attr("stroke-width", 2).attr("class", "dashed");
	  // Add arrowheads
	    svg.append("path")
		.attr("d", "M280,150 L270,140 L270,160 Z")
		.attr("class", "arrowhead");

	    // Define an arrowhead marker
	    svg.append("defs").append("marker")
		.attr("id", "dashed-arrowhead")
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 5)
		.attr("refY", 0)
		.attr("markerWidth", 5)
		.attr("markerHeight", 5)
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M0,-5 L10,0 L0,5")
		.attr("class", "arrowhead");

	    // Add dashed lines with arrowheads
	    svg.append("line")
		.attr("x1", 200).attr("y1", 70)
		.attr("x2", 115).attr("y2", 130)
		.attr("stroke", "black").attr("stroke-width", 2)
	//        .attr("class", "dashed")
		.attr("marker-end", "url(#dashed-arrowhead)");

	    svg.append("line")
		.attr("x1", 200).attr("y1", 70)
		.attr("x2", 285).attr("y2", 130)
		.attr("stroke", "black").attr("stroke-width", 2)
	 //       .attr("class", "dashed")
		.attr("marker-end", "url(#dashed-arrowhead)");
        
}

function add_data_xy_aval(id_graph) {      
    const svg = d3.select(id_graph).select('svg'); 
     svg.append("rect")
        .attr("x", 80)
        .attr("y", 110)
         .attr("rx", 10)
    .attr("ry", 10)
        .attr("width", 240)
        .attr("height", 80)
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
       svg.append("text")
        .attr("x", 200)
        .attr("y", 200)
       .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-family", "Arial")
    .attr("font-size", "14px")
    .attr("fill", "red")
    .text("n = 400");
 }
 
function add_data_w_aval(id_graph) {      
    const svg = d3.select(id_graph).select('svg'); 
     svg.append("rect")
        .attr("x", 150)
        .attr("y", 22)
         .attr("rx", 10)
    .attr("ry", 10)
        .attr("width", 100)
        .attr("height", 50)
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
       svg.append("text")
        .attr("x", 200)
        .attr("y", 12)
       .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-family", "Arial")
    .attr("font-size", "14px")
    .attr("fill", "red")
    .text("n = 800");
 }
 
 
 function add_data_yw_aval(id_graph) {      
    const svg = d3.select(id_graph).select('svg'); 
     svg.append("rect")
        .attr("x", 30)
        .attr("y", 60)
         .attr("rx", 10)
    .attr("ry", 10)
        .attr("width", 200)
        .attr("height", 80)
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
         .attr("transform", "translate(200, 275) rotate(37) translate(-200, -275)");
       svg.append("text")
        .attr("x", 130)
        .attr("y", 45)
       .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-family", "Arial")
    .attr("font-size", "14px")
    .attr("fill", "red")
    .text("n = 200")
    .attr("transform", "translate(200, 275) rotate(37) translate(-200, -275)");
 }
 
 
 
 
 function add_data_wx_aval(id_graph) {      
    const svg = d3.select(id_graph).select('svg'); 
     svg.append("rect")
        .attr("x", 160)
        .attr("y", 60)
         .attr("rx", 10)
    .attr("ry", 10)
        .attr("width", 200)
        .attr("height", 80)
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
         .attr("transform", "translate(200, 275) rotate(-35) translate(-200, -275)");
       svg.append("text")
        .attr("x", 270)
        .attr("y", 45)
       .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-family", "Arial")
    .attr("font-size", "14px")
    .attr("fill", "red")
    .text("n = 100")
    .attr("transform", "translate(200, 275) rotate(-35) translate(-200, -275)");
 }
 
  function add_data_wxy_aval(id_graph) {      
   const svg = d3.select(id_graph).select('svg'); 
     svg.append("rect")
        .attr("x", 80)
        .attr("y", 20)
         .attr("rx", 10)
    .attr("ry", 10)
        .attr("width", 240)
        .attr("height", 160)
        .attr("stroke", "red")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");
       svg.append("text")
        .attr("x", 200)
        .attr("y", 200)
       .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-family", "Arial")
    .attr("font-size", "14px")
    .attr("fill", "red")
    .text("n = 50");
 }
 
// add_dag("#graphconf0");
// // add_data_xy_aval("#graphconf0");
// draw_first_graph("#first_conf_plot");

// // add_simple_dag_dy("#dy1");
