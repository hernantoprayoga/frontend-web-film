import axios from "axios";
import React, { useState, useEffect } from "react";

const PreviewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  return (
    <div className="container mt-5">
      <h1 className="title">Preview Movie</h1>
      <h2 className="subtitle">List of your movie</h2>
      <div className="columns is-multiline">
        {products.map((product) => (
          <div className=" column is-one-quarter" key={product.id}>
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by5">
                  <img src={product.url} alt="Image" />
                </figure>
              </div>
              <div class="card-content pb-2 pt-2">
                <div class="media">
                  <div class="media-content">
                    <p className="title is-4  pb-0 pt-0 has-text-link has-text-weight-bold	">{product.name}</p>
                    <p className="title is-7 pt-0 pb-0	">Sinopsis:</p>
                    <p className="subtitle is-7 pt-0 pb-3">{product.deskripsi}</p>
                    <p className="subtitle is-7 has-text-danger">Realese Date: {product.realese}</p>
                  </div>
                </div>
              </div>
              <footer className="card-footer"></footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewProduct;
