


function draw_first_graph(where) {
const width = 800/1.75, height = 600/1.75;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

const data = [
  { x: "ATE", y: -0.69, y2: 0.559 },
];

const xScale = d3.scalePoint()
  .domain(data.map(d => d.x))
  .range([0, plotWidth])
  .padding(0.5);

const yScale = d3.scaleLinear()
  .domain([-1, 1])
  .range([plotHeight, 0]);

const svg = d3.select(where)
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#f0f1eb");

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

g.selectAll("line")
  .data(data)
  .enter()
  .append("line")
  .attr("x1", d => xScale(d.x))
  .attr("x2", d => xScale(d.x))
  .attr("y1", d => yScale(d.y))
  .attr("y2", d => yScale(d.y2))
  .attr("stroke", "black")
  .attr("stroke-width", 2);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

g.append("g")
  .attr("transform", `translate(0, ${plotHeight})`)
  .call(xAxis);

g.append("g")
  .call(yAxis);
  
g.selectAll(".errorbar-cap")
  .data(data)
  .enter()
  .append("line")
  .attr("class", "errorbar-cap")
  .attr("x1", d => xScale(d.x) - 20)
  .attr("x2", d => xScale(d.x) + 20)
  .attr("y1", d => yScale(d.y))
  .attr("y2", d => yScale(d.y))
  .attr("stroke", "black")
  .attr("stroke-width", 2);

g.selectAll(".errorbar-cap2")
  .data(data)
  .enter()
  .append("line")
  .attr("class", "errorbar-cap2")
  .attr("x1", d => xScale(d.x) - 20)
  .attr("x2", d => xScale(d.x) + 20)
  .attr("y1", d => yScale(d.y2))
  .attr("y2", d => yScale(d.y2))
  .attr("stroke", "black")
  .attr("stroke-width", 2);

// Add values as text over the extreme points
g.selectAll(".errorbar-value")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "errorbar-value")
  .attr("x", d => xScale(d.x))
  .attr("y", d => yScale(d.y) + 20)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial")
  .attr("font-size", "12px")
  .text(d => d.y);

g.selectAll(".errorbar-value2")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "errorbar-value2")
  .attr("x", d => xScale(d.x))
  .attr("y", d => yScale(d.y2) - 10)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial")
  .attr("font-size", "12px")
  .text(d => d.y2);

// Add dashed horizontal line at y = 0.5
g.append("line")
  .attr("x1", 0)
  .attr("x2", plotWidth)
  .attr("y1", yScale(0.5))
  .attr("y2", yScale(0.5))
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("stroke-dasharray", "5,5");
 }

