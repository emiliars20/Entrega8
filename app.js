const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(express.json());

// Rutas
app.get("/categories", (req, res) => {
    const cats = require("./emercado-api-main/cats/cat.json");
    res.json(cats);
});

app.get("/cart", (req, res) => {
    const cart = require("./emercado-api-main/cart/buy.json");
    res.json(cart);
});

// Ruta para productos por categoría (cats_products/101.json - 109.json)
app.get("/category-products/:id", (req, res) => {
    const categoryId = req.params.id;
    try {
        const categoryProducts = require(`./emercado-api-main/cats_products/${categoryId}.json`);
        res.json(categoryProducts);
    } catch (error) {
        res.status(404).json({ error: "Archivo no encontrado" });
    }
});

// Ruta para productos individuales (products/40281.json, etc.)
app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    try {
        const product = require(`./emercado-api-main/products/${productId}.json`);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
