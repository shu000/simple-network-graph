class Droppable {

  /**
   * [constructor description]
   * @param {[type]} area [description]
   */
  constructor(area) {
    this.droppableArea = area;
		this.droppableArea.addEventListener("dragenter", cancelEvent);
		this.droppableArea.addEventListener("dragover", cancelEvent);
  }

  /**
   * [hide description]
   * @return {[type]} [description]
   */
  hide() {
    this.droppableArea.setAttribute("style", "display: none;");
  }

  onDrop() {
    return new Promise((resolve, reject) => {
  		this.droppableArea.addEventListener("drop", (e) => {
        this.hide();

  			e.preventDefault();
  			// TODO: 複数ファイルドロップ時のエラー処理
  			const file = e.dataTransfer.files[0];

      	if (file.type !== "text/csv") reject(e);

        resolve(this.read(file));
      });
    });
  }

  read(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = e => reject(e);
      reader.readAsText(file);
    });
  }

};

/**
 * [cancelEvent description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
const cancelEvent = (e) => {
	e.preventDefault();
	e.stopPropagation();
	return false;
};

module.exports = Droppable;
