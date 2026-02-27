import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (categoryParam !== 'all') {
      result = result.filter(p => p.category === categoryParam);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [categoryParam, searchQuery, sortBy]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
    setIsSidebarOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSortBy('default');
  };

  const currentCategory = categories.find(c => c.id === categoryParam);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    ...(categoryParam !== 'all' ? [{ label: currentCategory?.name || categoryParam }] : [])
  ];

  return (
    <div className="products-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="products-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Categories</h3>
            <button
              className="sidebar-close"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <ul className="category-list">
            {categories.map(category => (
              <li
                key={category.id}
                className={`category-item ${categoryParam === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">
                  {category.id === 'all'
                    ? products.length
                    : products.filter(p => p.category === category.id).length}
                </span>
              </li>
            ))}
          </ul>

          {(categoryParam !== 'all' || searchQuery) && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="products-main">
          <div className="products-header">
            <div className="products-title">
              <h1>
                {searchQuery
                  ? `Search: "${searchQuery}"`
                  : currentCategory?.name || 'All Products'}
              </h1>
              <span className="products-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="products-controls">
              <button
                className="filter-toggle-btn"
                onClick={() => setIsSidebarOpen(true)}
              >
                🔍 Filter
              </button>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <span className="no-products-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
