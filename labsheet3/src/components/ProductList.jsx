import products from "../products";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
  return (
    <section>

      <h2>Our Dairy Products</h2>

      <div className="product-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}

      </div>

    </section>
  );
}

export default ProductList;