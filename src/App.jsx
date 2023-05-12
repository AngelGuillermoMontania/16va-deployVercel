import NavBar from "./components/NavBar";
import ContainCard from "./components/ContainCard";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import DetailCard from "./components/DetailCard";
import CartContextProvider, { CartContext } from "./context/CartContext";
import CartDetailContainer from "./components/Cart/CartDetailContainer";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const { nameCategory } = useParams();

  return (
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <CartContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ContainCard />} />
            <Route path="/category/:nameCategory" element={<ContainCard />} />
            <Route path="/detail/:id" element={<DetailCard />} />
            <Route path="/cart" element={<CartDetailContainer />} />
          </Routes>
          <Footer />
        </CartContextProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
