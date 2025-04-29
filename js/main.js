/**
 * Load data from JSON file asynchronously and render force directed graph
 */
d3.json('data/ssbu.json').then(data => {
    const forceDirectedGraph = new ForceDirectedGraph({ parentElement: '#force-directed-graph'}, data);
  })
  .catch(error => console.error(error));