class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    renderCard() {
        return `
            <div class="card">
                <img class="product-image" src="${this.image}" alt="${this.name}">
                <div class="name">${this.name}</div>
                <div class="price">${this.price} ₽</div>
            </div>
        `;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }
}

const products = [
    new Product(1, 'В крапинку', 2000, 'images/point.png'),
    new Product(2, 'Серый', 2500, 'images/grey.png'),
    new Product(3, 'Черный', 1999, 'images/black.png'),
    new Product(4, 'ГОРЯЧЕЕ ТРИО', 6000, 'images/trio.png'),
];

const container = document.getElementById('products');
container.innerHTML = products.map(p => p.renderCard()).join('');