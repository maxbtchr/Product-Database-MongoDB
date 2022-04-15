const mongoose = require("mongoose");

//schema
const productSchema = mongoose.Schema({ 
    code: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true
    }
});

productSchema.methods.getInfo = function() {
    return `code: ${this.code}, description: ${this.description}, price: ${this.price}`;
};

//exporter le schema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

