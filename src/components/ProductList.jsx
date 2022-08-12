import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div>
      <h1 className="title">Movie</h1>
      <h2 className="subtitle">List of your movie</h2>
      <Link to="/products/add" className="button is-info mb-2">
        Add New
      </Link>
      <Link to="/products/preview" className="button is-primary mx-2">
        Preview
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Movie Name</th>
            <th>Sinopsis</th>
            <th>Poster</th>
            <th>Realese date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.deskripsi}</td>

              <td>{product.image}</td>
              <td>{product.realese}</td>
              <td>{product.user.name}</td>

              <td>
                <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteProduct(product.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
