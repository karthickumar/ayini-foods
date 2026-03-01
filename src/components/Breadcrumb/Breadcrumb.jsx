import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
  const location = useLocation();

  // Generate breadcrumb items based on current path if not provided
  const generateBreadcrumbs = () => {
    if (items && items.length > 0) {
      return items;
    }

    const pathnames = location.pathname.split('/').filter(x => x);

    const breadcrumbItems = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;

      // Format the label
      let label = name.charAt(0).toUpperCase() + name.slice(1);
      label = label.replace(/-/g, ' ');

      // Check if it's a product ID (number)
      if (!isNaN(name)) {
        label = 'Product Details';
      }

      breadcrumbItems.push({
        label,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index < breadcrumbItems.length - 1 ? (
              <>
                <Link to={item.path} className="breadcrumb-link">
                  {item.label}
                </Link>
                <span className="breadcrumb-separator">›</span>
              </>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
