import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navy from "./components/Navy";
import Sidebar from "./components/Sidebar";
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ListeUsers from './components/listeUsers';
import { useNavigate } from 'react-router-dom';


export default function AppRoutes1() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
      <div className="flex-row flex-grow-1 ">
      <div className="flex-shrink-0">
          <div className='row'>
          <div className="col-3" >
            <div style={{ position: 'fixed'}}>
  <Sidebar />
  </div>
</div>

          <div className='col-8 mt-6'>
          <ListeUsers />
          </div>
          </div>
        </div>
        
        <div className="flex-grow-1 overflow-auto">
          <main className="content">
            
          </main>
        </div>
      </div>
     
    </div>
  );
}



