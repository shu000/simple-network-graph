class Droppable {

  constructor(area) {
    this.droppableArea = area;
		this.droppableArea.addEventListener("dragenter", cancelEvent);
		this.droppableArea.addEventListener("dragover", cancelEvent);
  }

  hide() {
    this.droppableArea.setAttribute("style", "display: none;");
  }

  on(type, callback) {
    // drop イベントのみである限りはここでretrun
    if (type !== "drop") return;

		this.droppableArea.addEventListener("drop", (e) => {
      this.hide();

			e.preventDefault();
			// TODO: 複数ファイルドロップ時のエラー処理
			const file = e.dataTransfer.files[0];

    	if (file.type !== "text/csv") return null;

    	const reader = new FileReader();
    	reader.onload = e => {
        callback(e.target.result);
    	};

      reader.readAsText(file);
		});
  }
};

const cancelEvent = (e) => {
	e.preventDefault();
	e.stopPropagation();
	return false;
};
