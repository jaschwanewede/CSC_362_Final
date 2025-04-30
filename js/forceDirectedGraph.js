class ForceDirectedGraph {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
        this.config = {
          parentElement: _config.parentElement,
          containerWidth: 600,
          containerHeight: 600,
          margin: {top: 25, right: 20, bottom: 20, left: 35},
          tooltipPadding: 10
        }
        this.data = _data;
        this.initVis();
      }

      initVis(){
        let vis = this;
  
        vis.config.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.config.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.colorScale = d3.scaleOrdinal(d3.schemeCategory10);//ADD COLORSCALE
    
        vis.svg = d3.select(vis.config.parentElement).append('svg')
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        
        vis.simulation = d3.forceSimulation()
          .force('link', d3.forceLink()
            .id(d => d.id)
            .distance(100)
            .strength(0.05))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter(vis.config.width / 2, vis.config.height / 2));
      
        vis.updateVis();
      }

      updateVis() {
        let vis = this;
    
        vis.simulation.nodes(vis.data.nodes);
        vis.simulation.force('link').links(vis.data.links);
    
        vis.colorScale.domain(vis.data.nodes.map(d => d.group)); //ADD COLORSCALE
        
        vis.renderVis();
  
        console.log('Nodes:', vis.data.nodes); //DEBUGGING
        console.log('Links:', vis.data.links);
      }
    
      renderVis() {
        let vis = this;
    
        const links = vis.chart.selectAll('line')
          .data(vis.data.links, d => [d.source, d.target])
          .join('line');
    
        const nodes = vis.chart.selectAll('circle')
          .data(vis.data.nodes, d => d.id)
          .join('circle')
          .attr('r', d => 3 * Math.log10(d.size)+4) //PLAY AROUND W LOG SCALE ~ Mult is divergent, add is convergent 
          .attr("fill", d => d.party === "Y" ? "red" : "blue"); 
    
        vis.simulation.on('tick', () => {
          links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
  
          nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

          nodes.on('mouseover', (event,d) => {
            d3.select('#tooltip')
              .style('display', 'block')
              .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
              .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
              .html(`
                <div class="tooltip-title"><strong>Franchise: </strong>${d.id}</div>
                <div><i>Estimated Copies Sold (Millions): </i>${d.size}</div>
                <div><i>Main Genre: </i>${d.genre}</div>
              `);
          })
        });
    }

}