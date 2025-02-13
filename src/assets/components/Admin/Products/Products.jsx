import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import ProductsCard from "./ProductsCard";
import productData from "./ProductData";
import ProductsAdd from "./ProductsAdd";
import ProductsEdit from "./ProductsEdit";
import { Helmet } from "react-helmet";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const[productsData,setProductsData] = useState(productData);
  const[selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Search handler to filter products based on search query
  const searchHandler = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = productData.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) &&
        (selectedCategory === "All Categories" ||
          product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  useEffect(()=> {
    const sortedData = [...productsData].sort((a,b) => 
    a.name.localeCompare(b.name)
    )
    setFilteredProducts(sortedData);
  },[productsData])

  const addProduct = (newProduct) => {
    setProductsData((prev) => [...prev, newProduct]);
  }

  // Category selection handler to filter products by category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    const filtered =
      category === "All Categories"
        ? productData
        : productData.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const openModal = () => {
    document.getElementById('my_modal_1').showModal();
  }

  const openModalEdit = (product) => {    
    setSelectedProduct(product)
    document.getElementById('my_modal_2').showModal();
  }

  const editProductHandler = (updatedproduct) => {
    setProductsData((prev) => 
    prev.map((product) => 
    product.id === updatedproduct.id ? updatedproduct : product
    )
    )
  } 

  const deleteProduct = (productToDelete) => {
    setProductsData((prev) => 
    prev.filter((product) => 
    product.id !== productToDelete.id
    )
    )
  }

  return (
    <>
    <Helmet>
       <meta charSet="utf-8" />
       <title>Products</title>
     </Helmet>
    <div className="max-w-screen-lg mx-auto min-h-screen">
      <PageTitle title="Products" searchHandler={searchHandler} openModal={openModal}/>
      <ProductsAdd addProduct={addProduct}/>
      <ProductsEdit selectedProduct={selectedProduct} editProduct={editProductHandler} deleteProduct={() => deleteProduct(selectedProduct)}/>
      <div className="flex sm:justify-center">
        <details className="ml-24 my-3 sm:ml-0 dropdown">
          <summary className="btn m-1 bg-green-300 hover:bg-green-500">
            {selectedCategory}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li
              className="hover:bg-green-500 rounded-md"
              onClick={() => handleCategorySelect("All Categories")}
            >
              <a>All Categories</a>
            </li>
            <li
              className="hover:bg-green-500 rounded-md"
              onClick={() => handleCategorySelect("Eyeglass Frames")}
            >
              <a>Eyeglass Frames</a>
            </li>
            <li
              className="hover:bg-green-500 rounded-md"
              onClick={() => handleCategorySelect("Lens")}
            >
              <a>Lens</a>
            </li>
            <li
              className="hover:bg-green-500 rounded-md"
              onClick={() => handleCategorySelect("Others")}
            >
              <a>Others</a>
            </li>
          </ul>
        </details>
      </div>

      <div className="grid sm:grid-cols-12 sm:gap-2 lg:gap-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductsCard
              key={index}
              name={product.name}
              description={product.description}
              category={product.category}
              image={product.image}
              stocks={product.stocks}
              price={product.price}
              edit={() => openModalEdit(product)}
            />
          ))
        ) : (
          <p className="col-span-12 text-center">No products found</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Products;
