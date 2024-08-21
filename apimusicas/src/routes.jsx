import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PagPrincipal from './Pagprincipal/PagPrincipal';
import Pag2000 from './Pag2000/Pag2000';
import Pag2006 from './Pag2006/Pag2006';
import Pag2011 from './Pag2011/Pag2011';




function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PagPrincipal />} />
        <Route path="/2000-2005" element={<Pag2000 />} />
        <Route path="/2006-2010" element={<Pag2006 />} />
        <Route path="/2011-2015" element={<Pag2011 />} />



      </Routes>
    </Router>
  );
}

export default AppRoutes;
