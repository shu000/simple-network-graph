const NetworkFactory = (function() {

  class _NetworkFactory {
    /**
     * [create description]
     * @param  {Object} container [description]
     * @param  {Object} nodes     [description]
     * @param  {Object} edges     [description]
     * @return {Object}           [description]
     */
    create(container) {
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
        },
        layout: {
          improvedLayout: false
        }
      };

      return new vis.Network(container, {}, options);
    }
  };

  return new _NetworkFactory();

})();

module.exports = NetworkFactory;
