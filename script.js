document.addEventListener("DOMContentLoaded", () => {
    // Sample data
    const products = [
        { id: 1, name: "Product A", price: 10, stock: 100 },
        { id: 2, name: "Product B", price: 20, stock: 50 },
        { id: 3, name: "Product C", price: 30, stock: 30 },
    ];

    const orders = [];

    // Function to display products in the inventory table
    const displayProducts = () => {
        const inventoryTableBody = document.querySelector("#inventory-table tbody");
        inventoryTableBody.innerHTML = "";

        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
            `;
            inventoryTableBody.appendChild(row);
        });
    };

    // Function to populate product select options
    const populateProductSelect = () => {
        const productSelect = document.querySelector("#product-select");
        productSelect.innerHTML = "";

        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    };

    // Function to display orders in the orders table
    const displayOrders = () => {
        const ordersTableBody = document.querySelector("#orders-table tbody");
        ordersTableBody.innerHTML = "";

        orders.forEach((order, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.customerName}</td>
                <td>${order.product.name}</td>
                <td>${order.quantity}</td>
                <td>
                    <button class="delete-order" data-index="${index}">Delete</button>
                </td>
            `;
            ordersTableBody.appendChild(row);
        });

        document.querySelectorAll(".delete-order").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                orders.splice(index, 1);
                displayOrders();
            });
        });
    };

    // Event listener for the sale order form submission
    document.querySelector("#sale-order-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const customerName = document.querySelector("#customer-name").value;
        const productId = parseInt(document.querySelector("#product-select").value);
        const quantity = parseInt(document.querySelector("#quantity").value);

        const product = products.find(p => p.id === productId);

        if (product && quantity <= product.stock) {
            orders.push({ customerName, product, quantity });
            product.stock -= quantity;
            displayProducts();
            displayOrders();
            e.target.reset();
        } else {
            alert("Invalid product or quantity");
        }
    });

    // Initial display
    displayProducts();
    populateProductSelect();
    displayOrders();
});
