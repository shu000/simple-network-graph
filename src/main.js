const Keywords = require("./Keywords");
const Words = require("./Words");
const Edges = require("./Edges");
const Droppable = require("./Droppable");
const NetworkFactory = require("./NetworkFactory");

const DROP_AREA_ID = "droppable";
const NETWORK_AREA_ID = "mynetwork";

class App {

  constructor() {
    this.visNodes = [];
    this.visEdges = [];
  }

  /**
   * This application's Main Module
   */
  run() {
    const dropArea = document.getElementById(DROP_AREA_ID);
    const droppable = new Droppable(dropArea);

    droppable.onDrop().then((csv) => {
      const data = this.csv2data(csv);
      this.showNetworkGraph(data);
    });
  }

  showNetworkGraph(data) {
    const container = document.getElementById(NETWORK_AREA_ID);
    const network = NetworkFactory.create(container);
    this.addLoadingEvents(network); // TODO: wrap into NetworkFactory
    network.setData(data);
  }

  csv2data(csv) {
    const keywords = new Keywords();
    keywords.initByCSV(csv)

    const words = new Words();
    words.initByKeywords(keywords.getAll());

    const edges = new Edges();
    edges.initByKeywords(keywords.getAll(), words);

    return {
      nodes: words.getAsVisNodes(),
      edges: edges.getAsVisEdges()
    };
  }

  addLoadingEvents(network) {
    network.on("startStabilizing", (obj) => {
      document.getElementById("loading").classList.remove("hide");
    });

    network.on("stabilizationProgress", (obj) => {
      const percentage = obj.iterations / 10 + " %";
      document.getElementById("loading-text").innerHTML = percentage;
    });

    network.on("stabilizationIterationsDone", () => {
      document.getElementById("loading").classList.add("hide");
      network.off("startStabilizing");
      network.off("stabilizationProgress");
      network.off("stabilizationIterationsDone");
    });
  }
}

const app = new App();
app.run();
