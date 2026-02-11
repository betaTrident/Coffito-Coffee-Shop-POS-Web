import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "@/components/common/AddProductModal";
import DateTime from "@/components/layout/DateTime";
import { IoSearch } from "react-icons/io5";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Successfully from "@/components/common/Successfully";
import ConfirmModal from "@/components/common/ConfirmModal";
import UpdateProductModal from "@/components/common/UpdateProdModal";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToUpdate, setProductToUpdate] = useState(null);

  // DELETE MODAL
  const [isConfirmModal, setConfirmModalVisible] = useState(false);

  const showConfirmModal = (product) => {
    setProductToDelete(product);
    setConfirmModalVisible(true);
  };

  const closeModalConfirmModal = () => setConfirmModalVisible(false);

  // UPDATE MODALS
  const [isUpdateProd, setIsModalVisible] = useState(false);
  const openModal = (product) => {
    setProductToUpdate(product);
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  // SUCCESS MODAL
  const [isSuccessfullydModal, setSaveModal] = useState(false);
  const showSuccessfullySaveModal = () => setSaveModal(true);
  const closeSuccessfullySaveModal = () => setSaveModal(false);
  const handleConfirm = () => {
    console.log("Successful!");
    closeSuccessfullySaveModal();
  };

  // ADD PRODUCT MODAL
  const [isAddProdModalVisible, setIsAddProdModalVisible] = useState(false);
  const openAddProdModal = () => setIsAddProdModalVisible(true);
  const closeAddProdModal = () => setIsAddProdModalVisible(false);

  // DELETE a product
  const deleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${productToDelete._id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete._id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete._id)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const productData = Array.isArray(response.data) ? response.data : [];
      setProducts(productData);
      setFilteredProducts(productData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Handle search input and enter key
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.prod_name.toLowerCase().includes(query) ||
        product.prod_price.toString().includes(query) ||
        product.prod_category.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
    setNoResults(false);

    if (event.key === "Enter") {
      if (filtered.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  };

  const updateProductList = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct._id ? updatedProduct : product
      )
    );

    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="main">
      <div className="topbar-con">
        <h2>Product</h2>
        <DateTime />
      </div>

      <div className="details">
        <div className="flex flex-col">
          <div className="flex justify-between mt-5 mb-3 items-center">
            <div className="search w-[250px]">
              <label>
                <IoSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleSearch}
                />
              </label>
            </div>
            <button className="button" onClick={openAddProdModal}>
              Add Product <RiAddCircleLine className="button-icon" />
            </button>
          </div>

          <div className="con-table daily-table p-1 rounded-lg bg-border-color w-full overflow-hidden h-full">
            <div className="table-wrapper-prod table-con bg-card-bg border border-border-color">
              <table>
                <thead>
                  <tr>
                    <th className="hidden">Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {noResults ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Search
                      </td>
                    </tr>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="hidden">{product._id}</td>
                        <td>{product.prod_name}</td>
                        <td>{product.prod_price}</td>
                        <td>{product.prod_category}</td>
                        <td>
                          <div className="action-btn">
                            <button onClick={() => showConfirmModal(product)}>
                              <MdDelete className="del" />
                            </button>
                            <button onClick={() => openModal(product)}>
                              <MdModeEdit className="update" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {isConfirmModal && (
        <ConfirmModal
          closeModalConfirmModal={closeModalConfirmModal}
          showSuccessfullySaveModal={showSuccessfullySaveModal}
          deleteProduct={deleteProduct}
        />
      )}
      {isUpdateProd && (
        <UpdateProductModal
          closeModal={closeModal}
          showSuccessfullySaveModal={showSuccessfullySaveModal}
          productToUpdate={productToUpdate}
          updateProductList={updateProductList}
        />
      )}
      {isAddProdModalVisible && (
        <AddProductModal
          closeModal={closeAddProdModal}
          showSuccessfullySaveModal={showSuccessfullySaveModal}
          addProductToTable={(newProduct) => {
            setProducts([...products, newProduct]);
            setFilteredProducts([...products, newProduct]);
          }}
        />
      )}
      {isSuccessfullydModal && <Successfully onConfirm={handleConfirm} />}
    </div>
  );
}

export default Product;
