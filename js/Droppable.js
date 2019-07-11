class Droppable {
  constructor(area) {
    this.droppableArea = area;
		this.droppableArea.addEventListener("dragenter", cancelEvent);
		this.droppableArea.addEventListener("dragover", cancelEvent);
  };

  addDropdEvent(callback) {
		this.droppableArea.addEventListener("drop", (e) => {
			e.preventDefault();
			// TODO: 複数ファイルドロップ時のエラー処理
			const file = e.dataTransfer.files[0];

    	//if (file.type !== "application/json") return null;

    	const reader = new FileReader();
    	reader.onload = e => {
        console.log(e.target.result);
        callback(e.target.result);
    	};
    	reader.readAsText(file);
		});
  };
};

const cancelEvent = (e) => {
	e.preventDefault();
	e.stopPropagation();
	return false;
};
