class Product {
    constructor(
        public name: string,
        public price: number
    ) {}
}

class Cart {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
        showCart();
    }

    removeProduct(index: number): void {
        this.products.splice(index, 1);
        showCart();
    }

    getTotal(): number {
        return this.products.reduce(
            (sum: number, product: Product) => sum + product.price,
            0
        );
    }

    getProducts(): Product[] {
        return this.products;
    }
}

function getElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`В HTML не найден элемент с id="${id}"`);
    }

    return element as T;
}

const cart = new Cart();

const cartElement = getElement<HTMLUListElement>("cart");
const totalElement = getElement<HTMLElement>("total");
const addAppleButton = getElement<HTMLButtonElement>("addApple");
const addBreadButton = getElement<HTMLButtonElement>("addBread");

function showCart(): void {
    cartElement.innerHTML = "";

    cart.getProducts().forEach((product: Product, index: number) => {
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

addAppleButton.addEventListener("click", () => {
    cart.addProduct(new Product("Яблоко", 50));
});

addBreadButton.addEventListener("click", () => {
    cart.addProduct(new Product("Хлеб", 80));
});
