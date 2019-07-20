const Keywords = require("./Keywords");
const Words = require("./Words");
const Edges = require("./Edges");
const Droppable = require("./Droppable");
const NetworkFactory = require("./NetworkFactory");

const DROP_AREA_ID = "droppable";
const NETWORK_AREA_ID = "network";
const RANKING_AREA_ID = "ranking";

class App {

  constructor() {
    this.keywords;
    this.words;
    this.edges;
  }

  /**
   * This application's Main Module
   */
  run() {
    const dropArea = document.getElementById(DROP_AREA_ID);
    const droppable = new Droppable(dropArea);

    droppable.onDrop().then(csv => {
      // show network graph area before than vis.js calc graph's initial position.
      document.getElementById("network").classList.remove("hide");

      this.read(csv);
      this.showWordRanking()
      this.showNetworkGraph();
    });
  }


  showWordRanking() {
    const rankingArea = document.getElementById(RANKING_AREA_ID);
    this.words.getAllOrderByOccurence().map(word => {
      this.addRankingItem(rankingArea, word.text, word.occurence);
    });
  }

  addRankingItem(area, text, occurence) {
    const li = document.createElement("li");
    const p_text = document.createElement("p");
    const p_occ = document.createElement("p");

    li.classList.add("ranking-li");

    p_text.classList.add("ranking-text");
    p_text.innerHTML = text;

    p_occ.classList.add("ranking-occurence");
    p_occ.innerHTML = occurence;

    li.appendChild(p_occ);
    li.appendChild(p_text);
    area.appendChild(li);
  }

  showNetworkGraph() {
    const container = document.getElementById(NETWORK_AREA_ID);
    const network = NetworkFactory.create(container);

    this.addLoadingEvents(network); // TODO: wrap into NetworkFactory

    const data = {
      nodes: new vis.DataSet(this.words.getAsVisNodes()),
      edges: new vis.DataSet(this.edges.getAsVisEdges())
    };
    network.setData(data);
  }

  read(csv) {
    this.keywords = new Keywords();
    this.keywords.initByCSV(csv)

    this.words = new Words();
    this.words.initByKeywords(this.keywords.getAll());

    this.edges = new Edges();
    this.edges.initByKeywords(this.keywords.getAll(), this.words);
  }

  addLoadingEvents(network) {
    network.on("startStabilizing", obj => {
      document.getElementById("loading").classList.remove("hide");
    });

    network.on("stabilizationProgress", obj => {
      const percentage = obj.iterations / 10 + " %";
      document.getElementById("loading-text").innerHTML = percentage;
    });

    network.on("stabilizationIterationsDone", () => {
      document.getElementById("loading").classList.add("hide");
      network.off("startStabilizing");
      network.off("stabilizationProgress");
      network.off("stabilizationIterationsDone");
    });

    network.on("select", obj => {
      // when select a node, select also neighbors
      const clickedEdges = this.edges.getAll().filter(edge => {
        return obj.edges.includes(edge.edgeID);
      });
      const nodeIDs = clickedEdges.map(edge => edge.wordIDs).flat();
      network.selectNodes(nodeIDs);
    });
  }
}

const app = new App();
app.run();
