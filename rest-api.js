const API_URL = "http://localhost:3000/api/items";
const itemList = document.getElementById("item-list");
const newItem = document.getElementById("new-item");

// Fetch and display items
async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        renderItems(items);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

// Render items to the DOM
function renderItems(items) {
    itemList.innerHTML = "";
    items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class = "deleteeditbutton">
        <span style="padding-top: 20px; padding-right: 30px;">${item.text}</span> 
        
            <button onclick="editItem(${item.id}, '${item.text}')">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button> 
        </div>
        `;
        itemList.appendChild(listItem);
    });
}

// Create a new item
async function createItem() {
    console.log(newItem);
    const text = newItem.value.trim();
    if (!text) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        await response.json();
        fetchItems();
        newItemInput.value = "";
    } catch (error) {
        console.error("Error creating item:", error);
    }
}

// Edit an item
function editItem(id, currentText) {
    const newText = prompt("Edit item:", currentText);
    if (newText !== null && newText.trim()) {
        updateItem(id, newText);
    }
}

// Update an item
async function updateItem(id, text) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        fetchItems();
    } catch (error) {
        console.error("Error updating item:", error);
    }
}

// Delete an item
async function deleteItem(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchItems();
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

fetchItems();
