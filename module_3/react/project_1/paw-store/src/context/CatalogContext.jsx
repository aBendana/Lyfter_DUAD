import Products from '../data/products.json';
import { createContext, useContext, useState } from 'react';

// initialize the catalog
const initialCatalog = Products;

// create a context for the catalog
const CatalogContext = createContext();

// manage catalog context
const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(initialCatalog);

  return (
    <CatalogContext.Provider value={{ catalog, setCatalog }}>
      {children}
    </CatalogContext.Provider>
  );
};

// custom hook to use the catalog context
const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

export { CatalogProvider, useCatalog };
