function slist(target, onDragEnd) {
    // See: https://code-boxx.com/drag-drop-sortable-list-javascript/
    // (A) SET CSS + GET ALL LIST ITEMS
    // target.classList.add("slist");
    let items = target.getElementsByTagName("li"), 
        current = null;
    const cleanUpFuncs = [];
    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
        // (B1) ATTACH DRAGGABLE
        i.draggable = true;

        function dragStartHandler(e) {
            // e.preventDefault();
            current = i;
            for (let it of items) {
                if (it != current) { it.classList.add("drag-hint"); }
            }
        }
        function dragEnterHandler() {
            if (i != current) { i.classList.add("drag-active"); }
        }
        function dragLeaveHandler() {
            i.classList.remove("drag-active");
        }
        function dragEndHandler() {
            for (let it of items) {
                it.classList.remove("drag-hint");
                it.classList.remove("drag-active");
            }
            onDragEnd?.();
        }
        function dragOverHandler(e) {
            e.preventDefault();
        }
        function dragDropHandler(e) {
            e.preventDefault();
            if (i != current) {
                let currentpos = 0, droppedpos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) { currentpos = it; }
                    if (i == items[it]) { droppedpos = it; }
                }
                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(current, i);
                }
            }
        }
        const $item = $(i);
        $item.on('dragstart', dragStartHandler);
        $item.on('dragenter', dragEnterHandler);
        $item.on('dragleave', dragLeaveHandler);
        $item.on('dragend', dragEndHandler);
        $item.on('dragover', dragOverHandler);
        $item.on('drop', dragDropHandler);
        cleanUpFuncs.push(() => {
            $item.off('dragstart', dragStartHandler);
            $item.off('dragenter', dragEnterHandler);
            $item.off('dragleave', dragLeaveHandler);
            $item.off('dragend', dragEndHandler);
            $item.off('dragover', dragOverHandler);
            $item.off('drop', dragDropHandler);
        });
    }

    return () => {
        cleanUpFuncs.forEach((cleanUpFunc) => {
            cleanUpFunc?.();
        });
    };
}