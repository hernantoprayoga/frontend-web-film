import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [realese, setRealese] = useState("");
  const [preview, setPrivew] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPrivew(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("deskripsi", deskripsi);
    formData.append("realese", realese);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/-formdata",
        },
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">MOVIE</h1>
      <h2 className="subtitle">Add New Movie</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi</label>
                <div className="control">
                  <input type="text" className="input" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Deskripsi" />
                </div>
              </div>
              <div className="date">
                <label className="label">Realese Date</label>
                <div className="control">
                  <input type="date" className="input" value={deskripsi} onChange={(e) => setRealese(e.target.value)} placeholder="Realese Date" />
                </div>
              </div>

              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input type="file" className="file-input" onChange={loadImage} />
                      <span className="file-cta">
                        <span className="file-label"> Choose a file... </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
