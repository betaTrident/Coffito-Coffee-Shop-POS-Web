import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateProductModal({ closeModal, showSuccessfullySaveModal, productToUpdate, updateProductList }) {
  const [isVisible, setIsVisible] = useState(false);
  const [noChanges, setNoChanges] = useState(false);
  const [product, setProduct] = useState({
    prod_name: productToUpdate?.prod_name || "",
    prod_price: productToUpdate?.prod_price || "",
    prod_category: productToUpdate?.prod_category || "",
  });

  useEffect(() => {
    setIsVisible(true);

    if (productToUpdate) {
      setProduct({
        prod_name: productToUpdate.prod_name,
        prod_price: productToUpdate.prod_price,
        prod_category: productToUpdate.prod_category,
      });
    }

    return () => setIsVisible(false);
  }, [productToUpdate]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/products/${productToUpdate._id}`, {
        prod_name: product.prod_name,
        prod_price: product.prod_price,
        prod_category: product.prod_category,
      });

      if (
        product.prod_name === productToUpdate.prod_name &&
        product.prod_price === productToUpdate.prod_price &&
        product.prod_category === productToUpdate.prod_category
      ) {
        setNoChanges(true);
        return;
      }

      if (response.status === 200) {
        updateProductList(response.data);
        showSuccessfullySaveModal();
        closeModal();
      } else {
        console.error("Failed to update product", response.status);
      }
    } catch (err) {
      console.error("Error updating product: ", err);
    }
  };

  return (
    <div
      className={`w-full z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-[300px] text-center transform ${
          isVisible ? "translate-y-0" : "-translate-y-10"
        } transition-transform duration-300`}
      >
        <h3 className="text-lg font-semibold mb-4">Update Product Details</h3>

        <div className="mb-4">
          <label className="block text-left font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="prod_name"
            value={product.prod_name}
            onChange={handleUpdateChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left font-medium mb-1">Price</label>
          <input
            type="number"
            name="prod_price"
            value={product.prod_price}
            onChange={handleUpdateChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-left font-medium mb-1">Product Category</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="prod_category"
            value={product.prod_category}
            onChange={handleUpdateChange}
          >
            <option value="">Select category</option>
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
          </select>
        </div>

        {noChanges && <p className="text-red-500 text-sm mb-[10%]">No changes has been made</p>}

        <div className="flex justify-around relative mt-2">
          <button className="btn-confirm bg-blue-500 text-white py-1 px-4 rounded" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel bg-gray-300 py-1 px-4 rounded" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;
