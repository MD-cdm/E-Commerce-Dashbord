
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/Add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<h1>Logout  Component</h1>} />
          <Route path="/Profile" element={<Profile/>} />
          </Route>


          <Route path="/Signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />

      {/* #004E74 */}
    </div>
  );
}

export default App;