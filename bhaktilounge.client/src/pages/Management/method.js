
export function itemHighlight(selectedItem) {
    if (selectedItem !== null) {
        var ul = document.getElementById("mgmt-itemlist");
        var listItems = ul.getElementsByTagName("li");
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove("bg-gray-300");
        }
        const element = document.getElementById(`item-${selectedItem.id}`);
        if (element) {
            element.classList.add("bg-gray-300");
        }
    }
}
