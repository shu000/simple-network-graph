const NetworkFactory = (function() {

  class _NetworkFactory {
    /**
     * [create description]
     * @param  {Object} container [description]
     * @param  {Object} nodes     [description]
     * @param  {Object} edges     [description]
     * @return {Object}           [description]
     */
    create(container, nodes, edges) {
      const data = {
        nodes: nodes,
        edges: edges
      };

      const options = {
        nodes: {
          shape: "dot",
          borderWidth: 0,
          borderWidthSelected: 1,
          color: {
            border: "#CCC",
            background: "#AAC4FC",
            highlight: {
              background: "#0E0791",
            }
          }
        }
      };

      return new vis.Network(container, data, options);
    }
  };

  return new _NetworkFactory();

})();
