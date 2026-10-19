class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Cart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        showCart();
    }

    removeProduct(index) {
        this.products.splice(index, 1);
        showCart();
    }

    getTotal() {
        return this.products.reduce((sum, product) => sum + product.price, 0);
    }
}

const cart = new Cart();

function showCart() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    cartElement.innerHTML = "";

    cart.products.forEach((product, index) => {
        const item = document.createElement("li");
        item.textContent = `${product.name} — ${product.price} ₽ `;

        const button = document.createElement("button");
        button.textContent = "Удалить";
        button.addEventListener("click", () => cart.removeProduct(index));

        item.appendChild(button);
        cartElement.appendChild(item);
    });

    totalElement.textContent = `Итого: ${cart.getTotal()} ₽`;
}

document.getElementById("addApple").addEventListener("click", () => {
    cart.addProduct(new Product("Яблоко", 50));
});

document.getElementById("addBread").addEventListener("click", () => {
    cart.addProduct(new Product("Хлеб", 80));
});
