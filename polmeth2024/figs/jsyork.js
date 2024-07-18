
create_dag('#zeroth', 
             {
              'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1' },
             'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1' }
             }, 
             [
               ['D', 'Y', '']
            ]);


            
create_dag('#zeroth1', 
            {
               'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle', 'id': 'd1' },
              'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
              'Rd':  {'cx': 150, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Rd', 'type': 'square' },
              'Ry':  {'cx': 400, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' }
              }, 
              [
                ['D', 'Y', ''],
                ['Rd', 'D', 'dashed'],
                ['Ry', 'Y', 'dashed']
             ]);


create_dag('#zeroth2', 
             {
               'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
               'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
               'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
               'Ry':  {'cx': 400, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
               'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
               'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' }
               }, 
               [
                ['Rd', 'D', 'dashed'],
                 ['D', 'Y', ''],
                 ['Ry', 'Y', 'dashed']
              ] );




create_dag('#zeroth3', 
              {
                'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
                'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
                'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
                'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
                'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
                'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
                'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
                'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
                'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
                'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
                }, 
                [
                  ['D', 'Y', ''],
                  ['Rd', 'D', 'dashed'],
                  ['Ry', 'Y', 'dashed']
               ] ) ;




create_dag('#zeroth4', 
               {
                 'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
                 'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
                 'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
                 'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
                 'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
                 'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
                 'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
                 'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
                 'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
                 'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
                 }, 
                 [
                   ['D', 'Y', ''],
                   ['Rd', 'D', 'dashed'],
                   ['Ry', 'Y', 'dashed']
                ] ) ;






create_dag('#zeroth5', 
                {
                  'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
                  'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
                  'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
                  'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
                  'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
                  'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
                  'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
                  'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
                  'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
                  'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
                  }, 
                  [
                    ['D', 'Y', ''],
                    ['Rd', 'D', 'dashed'],
                    ['Ry', 'Y', 'dashed']
                 ] ) ;




create_dag('#zeroth6', 
                 {
                   'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
                   'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
                   'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
                   'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
                   'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
                   'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
                   'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
                   'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
                   'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
                   'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
                   }, 
                   [
                     ['D', 'Y', ''],
                     ['Rd', 'D', 'dashed'],
                     ['Ry', 'Y', 'dashed']
                  ] ) ;



  


create_dag('#zeroth7', 
{
  'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
  'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
  'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
  'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
  'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
  'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
  'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
  'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
  'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
  'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
  }, 
  [
    ['D', 'Y', ''],
    ['Rd', 'D', 'dashed'],
    ['Ry', 'Y', 'dashed']
 ] ) ;


 


create_dag('#zeroth8', 
{
  'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle' },
  'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle' },
  'Rd':  {'cx': 150, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'black', 'text':'Rd', 'type': 'square' },
  'Ry':  {'cx': 400, 'cy':175, 'r': 0.1, 'fill': 'black', 'stroke': 'blue', 'text':'Ry', 'type': 'square' },
  'D0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0', 'type': 'square' },
  'D1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1', 'type': 'square' },
  'Y00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
  'Y01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
  'Y10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
  'Y11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
  }, 
  [
    ['D', 'Y', ''],
    ['Rd', 'D', 'dashed'],
    ['Ry', 'Y', 'dashed']
 ] ) ;



 create_dag('#conf', 
                      {
                       'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                      'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                      'U':  {'cx': 275, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'y1','fontsize': 35*1.1 }
                      }, 
                      [
                        ['D', 'Y', ''],
                        ['U', 'D', 'dashed'],
                        ['U', 'Y', 'dashed']
                     ]);


create_dag('#conf1', 
                     {
                        'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle', 'id': 'd1','fontsize': 35*1.1 },
                       'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle','fontsize': 35*1.1 },
                       'Rd':  {'cx': 275, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Rdy', 'type': 'square','fontsize': 35*1.1 }
                       }, 
                       [
                         ['D', 'Y', ''],
                         ['Rd', 'D', 'dashed'],
                         ['Rd', 'Y', 'dashed']
                      ]);
      

create_dag('#conf2', 
                      {
                        'D':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','fontsize': 35*1.1 },
                        'Y':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle','fontsize': 35*1.1 },
                        'Rd':  {'cx': 275, 'cy':175, 'r': 0.001, 'fill': 'black', 'stroke': 'blue', 'text':'Rdy', 'type': 'square','fontsize': 0.0001 },
                        'D0.Y00':  {'cx': 162.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 75},
                        'D0.Y01':  {'cx': 237.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                        'D0.Y10':  {'cx': 312.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                        'D0.Y11':  {'cx': 387.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                        'D1.Y00':  {'cx': 162.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y00', 'type': 'square','fontsize': 18*1.1, 'width': 75},
                        'D1.Y01':  {'cx': 237.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                        'D1.Y10':  {'cx': 312.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                        'D1.Y11':  {'cx': 387.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
                            }, 
                        [
                          ['D', 'Y', ''],
                          ['Rd', 'D', 'dashed'],
                          ['Rd', 'Y', 'dashed']
                       ]);




  
 create_dag('#confsum', 
 {
  'D':  {'cx': 150/3, 'cy':300/3, 'r': 35/3, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35/3*1.1 },
 'Y':  {'cx': 400/3, 'cy':300/3, 'r': 35/3, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35/3*1.1 },
 'U':  {'cx': 275/3, 'cy':175/3, 'r': 35/3, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'y1','fontsize': 35/3*1.1 }
 }, 
 [
   ['D', 'Y', ''],
   ['U', 'D', 'dashed'],
   ['U', 'Y', 'dashed']
]);


create_dag('#confsum2', 
                      {
                        'D':  {'cx': 150/3, 'cy':300/3, 'r': 35/3, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','fontsize': 35/3*1.1 },
                        'Y':  {'cx': 400/3, 'cy':300/3, 'r': 35/3, 'fill': 'black', 'stroke': 'green', 'text':'Y', 'type': 'circle','fontsize': 35/3*1.1 },
                        'Rd':  {'cx': 275/3, 'cy':175/3, 'r': 0.001/3, 'fill': 'black', 'stroke': 'blue', 'text':'Rdy', 'type': 'square','fontsize': 0.0001/3 },
                        'D0.Y00':  {'cx': 162.5/3, 'cy':125/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y00', 'type': 'square','fontsize': 18/3*1.1,'width': 75/3},
                        'D0.Y01':  {'cx': 237.5/3, 'cy':125/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y01', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                        'D0.Y10':  {'cx': 312.5/3, 'cy':125/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y10', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                        'D0.Y11':  {'cx': 387.5/3, 'cy':125/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D0Y11', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                        'D1.Y00':  {'cx': 162.5/3, 'cy':175/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y00', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3},
                        'D1.Y01':  {'cx': 237.5/3, 'cy':175/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y01', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                        'D1.Y10':  {'cx': 312.5/3, 'cy':175/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y10', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                        'D1.Y11':  {'cx': 387.5/3, 'cy':175/3, 'r': 25/3, 'fill': 'black', 'stroke': 'blue', 'text':'D1Y11', 'type': 'square','fontsize': 18/3*1.1, 'width': 75/3 },
                            }, 
                        [
                          ['D', 'Y', ''],
                          ['Rd', 'D', 'dashed'],
                          ['Rd', 'Y', 'dashed']
                       ]);


 
create_dag('#iv1', 
                       {
                        'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
                        'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                       'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                       'U':  {'cx': 525, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'u1','fontsize': 35*1.1 }
                       }, 
                       [
                        ['Z', 'D', ''],
                         ['D', 'Y', ''],
                         ['U', 'D', 'dashed'],
                         ['U', 'Y', 'dashed']
                      ]);



create_dag('#iv2', 
                      {
                       'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
                       'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                      'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                      'U':  {'cx': 525, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'u1','fontsize': 35*1.1 }
                      }, 
                      [
                       ['Z', 'D', ''],
                        ['D', 'Y', ''],
                        ['U', 'D', 'dashed'],
                        ['U', 'Y', 'dashed']
                     ]);


create_dag('#iv3', 
                      {
                       'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
                       'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                      'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                      'Uz':  {'cx': 150, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'u1' },
                      'Ud':  {'cx': 400, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1'  },
                      'Uy':  {'cx': 650, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1' },
                      'Z0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Z0', 'type': 'square' },
                      'Z1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Z1', 'type': 'square' },
                      'D00':  {'cx': 325, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00', 'type': 'square' },
                      'D01':  {'cx': 375, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D01', 'type': 'square' },
                      'D10':  {'cx': 425, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D10', 'type': 'square' },
                      'D11':  {'cx': 475, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D11', 'type': 'square' },
                      'Y00':  {'cx': 575, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y00', 'type': 'square' },
                      'Y01':  {'cx': 625, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y01', 'type': 'square' },
                      'Y10':  {'cx': 675, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y10', 'type': 'square' },
                      'Y11':  {'cx': 725, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Y11', 'type': 'square' }
                      }, 
                      [
                       ['Z', 'D', ''],
                        ['D', 'Y', ''],
                        ['Uz', 'Z', 'dashed'],
                        ['Ud', 'D', 'dashed'],
                        ['Uy', 'Y', 'dashed'],
                        ['Ud', 'Uy', 'dashed']
                        // ['U', 'D', 'dashed'],
                        // ['U', 'Y', 'dashed']
                     ]);

                     

create_dag('#iv4', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
'Uz':  {'cx': 150, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'Uz','type': 'circle','id': 'u1' },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
'Z0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Z0', 'type': 'square' },
'Z1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'Z1', 'type': 'square' },
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 75},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 75},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 75},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 75},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 75 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'blue', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 75 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  ['Uz', 'Z', 'dashed'],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);



create_dag('#iv5', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
'Uz':  {'cx': 150, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'Uz','type': 'circle','id': 'u1' },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
'Z0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'Z0', 'type': 'square' },
'Z1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'Z1', 'type': 'square' },
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'yellow', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  ['Uz', 'Z', 'dashed'],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);



create_dag('#iv6', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
// 'Uz':  {'cx': 150, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'Uz','type': 'circle','id': 'u1' },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
// 'Z0':  {'cx': 124, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'Z0', 'type': 'square' },
// 'Z1':  {'cx': 176, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'Z1', 'type': 'square' },
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  // ['Uz', 'Z', 'dashed'],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);


create_dag('#iv7', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);



create_dag('#iv8', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);

create_dag('#iv9', 
{
 'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
 'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
'U':  {'cx': 525, 'cy':175, 'r': .01, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'uz3'},                     
'D00.Y00':  {'cx': 412.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D00.Y01':  {'cx': 487.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y10':  {'cx': 562.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D00Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D00.Y11':  {'cx': 637.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D00Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y00':  {'cx': 412.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D01Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D01.Y01':  {'cx': 487.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y10':  {'cx': 562.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D01Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D01.Y11':  {'cx': 637.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D01Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y00':  {'cx': 712.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'black', 'text':'D10Y00', 'type': 'square','fontsize': 18*1.1,'width': 72},
'D10.Y01':  {'cx': 787.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y10':  {'cx': 862.5, 'cy':125, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D10Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D10.Y11':  {'cx': 937.5, 'cy':125, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D10Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y00':  {'cx': 712.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y00', 'type': 'square','fontsize': 18*1.1, 'width': 72},
'D11.Y01':  {'cx': 787.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y01', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y10':  {'cx': 862.5, 'cy':175, 'r': 25, 'fill': 'black', 'stroke': 'black', 'text':'D11Y10', 'type': 'square','fontsize': 18*1.1, 'width': 72 },
'D11.Y11':  {'cx': 937.5, 'cy':175, 'r': 25, 'fill': 'blue', 'stroke': 'yellow', 'text':'D11Y11', 'type': 'square','fontsize': 18*1.1, 'width': 72 }
}, 
[
 ['Z', 'D', ''],
  ['D', 'Y', ''],
  ['U', 'D', 'dashed'],
  ['U', 'Y', 'dashed']
  // ['U', 'D', 'dashed'],
  // ['U', 'Y', 'dashed']
]);



create_dag('#frontdoor', 
                       {
                        'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
                        'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                       'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                       'U':  {'cx': 400, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'u1','fontsize': 35*1.1 }
                       }, 
                       [
                        ['Z', 'D', ''],
                         ['D', 'Y', ''],
                         ['U', 'Z', 'dashed'],
                         ['U', 'Y', 'dashed']
                      ]);



create_dag('#factorial', 
                      {
                       'U':  {'cx': 250, 'cy':280, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
                      'B':  {'cx': 400, 'cy':355, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'B', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
                      'Y':  {'cx': 600, 'cy':280, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
                      'A':  {'cx': 400, 'cy':225, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'A','type': 'circle','id': 'u1','fontsize': 35*1.1 }
                      }, 
                      [
                       ['A', 'Y', ''],
                        ['B', 'Y', ''],
                        ['U', 'A', 'dashed'],
                        ['U', 'Y', 'dashed'],
                        ['U', 'B', 'dashed']

                     ]);




create_dag('#highdim', 
{
  'Z':  {'cx': 150, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'blue', 'text':'Z', 'type': 'circle','id': 'z1', 'fontsize': 35*1.1 },
  'D':  {'cx': 400, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'red', 'text':'D', 'type': 'circle','id': 'd1', 'fontsize': 35*1.1 },
 'Y':  {'cx': 650, 'cy':300, 'r': 35, 'fill': 'black', 'stroke': 'green', 'text':'Y','type': 'circle','id': 'y1', 'fontsize': 35*1.1 },
 'U':  {'cx': 525, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'U','type': 'circle','id': 'u1','fontsize': 35*1.1 },
 'W':  {'cx': 150, 'cy':175, 'r': 35, 'fill': 'black', 'stroke': 'black', 'text':'W','type': 'circle','id': 'u1','fontsize': 35*1.1 }

 }, 
 [
  ['Z', 'D', ''],
   ['D', 'Y', ''],
   ['U', 'D', 'dashed'],
   ['U', 'Y', 'dashed'],
   ['W', 'Z', ''],
   ['W', 'Y', '']
]);
