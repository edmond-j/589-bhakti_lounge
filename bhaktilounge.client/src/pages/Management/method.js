import authFetch from "@/utils/authFetch.js";
import { toast } from "react-toastify";

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

export function updateData(type, newData, items, setItems, setSelectedItem) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
    };
    // console.log(JSON.stringify(newData));
    authFetch(`/api/v1/${type}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Update Succesful:", data);
            // alert(data.name + " has been updated!");
            toast.success(data.name + " has been updated!");
            const updatedItems = items.map((item) => (item.id === data.id ? data : item));
            setItems(updatedItems); //update the frontend activities after backend data updated
            setSelectedItem(data);
        })
        .catch((error) => {
            toast.error(`Update failed: ${error.message}`);
            console.error("Error:", error);
        });
}

export function deleteData(type, items, setItems, selectedItem, setSelectedItem, populateData) {
    const url = `/api/v1/${type}?Id=${selectedItem.id}`;
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    authFetch(url, requestOptions).then((response) => {
        // console.log(response);
        if (response.ok) {
            toast.success(selectedItem.name + " has been deleted.");
            const index = items.indexOf(selectedItem);
            // console.log(index);
            setItems((currentItems) => currentItems.filter((item) => item !== selectedItem)); //remove the deleted activity
            if (index > 0) {
                setSelectedItem(items[index - 1]);
            } else {
                if (items.length == 1)
                    //when the activities has only 1 element
                    setSelectedItem(null);
                else setSelectedItem(items[1]);
            }
        } else {
            toast.error(response.status + ": " + response.statusText);
            populateData();
            console.log(response.status + ": " + response.statusText);
        }
    });
}
