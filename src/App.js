import ProductCard from './ProductCard';
import './App.css';
import React, {useState, useEffect} from 'react';


function App() {
  const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem("isLogged")));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  useEffect(() => {
    if (currentUser) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${currentUser.username}`)) || [];
      setCartItems(savedCart);
    }
  }, [currentUser]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      setIsLogged(true);
      localStorage.setItem("isLogged", true);
      setCurrentUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setShowLogin(false);
      const savedCart = JSON.parse(localStorage.getItem(`cart_${foundUser.username}`)) || [];
      setCartItems(savedCart);
      alert("Zalogowano pomyślnie");
    } else {
      alert("Błędny login lub hasło");
    }
  };

  const handleRegister = () => {
    if (username && password.length >= 6) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find(user => user.username === username)) {
        alert("Użytkownik o podanym loginie już istnieje");
        return;
      }
      const newUser = { username, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      alert("Rejestracja zakończona pomyślnie");
      setShowRegister(false);
    } else {
      alert("Hasło musi mieć co najmniej 6 znaków");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setCurrentUser(null);
    localStorage.removeItem("isLogged");
    localStorage.removeItem("currentUser");
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartItems));
    }
    setCurrentUser(null);
    setCartItems([]);
    setShowCart(false);
  };

  const cart = () => {
    setShowCart(true);
  };

  const hideCart = () => {
    setShowCart(false);
  };

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (index) => {
    const updatedCart =cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="bg-lightblue min-h-screen">
      <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">Eneba.v2</h1>
        <div>
          {isLogged ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Wyloguj się
              </button>
              {showCart && (
                <button onClick={hideCart} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 ml-2">
                  Wyjdz z koszyka
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Zaloguj się
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
              >
                Zarejestruj się
              </button>
            </>
          )}
        </div>
      </header>
      {showLogin && (
        <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg max-w-sm mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">Logowanie</h2>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
            Zaloguj się
          </button>
          <button onClick={() => setShowLogin(false)} className="mt-2 text-red-500">
            Anuluj
          </button>
        </div>
      )}

      {showRegister && (
        <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg max-w-sm mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">Rejestracja</h2>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Hasło (min. 6 znaków)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <button onClick={handleRegister} className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600">
            Zarejestruj się
          </button>
          <button onClick={() => setShowRegister(false)} className="mt-2 text-red-500">
            Anuluj
          </button>
        </div>
      )}
     {!showCart &&( 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        name="Lego Indiana Jones"
        price="32"
        activibility="Polska"
        genre="adventure"
        imageSrc="https://upload.wikimedia.org/wikipedia/en/e/ed/Lego_Indiana_Jones_cover.jpg"
        addToCart={addToCart}
      />
      <ProductCard
        name="Lego Batman"
        price="30"
        activibility="Swiat"
        genre="adventure"
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxoW2ShuR5mlIWkSNNGFGep6RAWwP90pAQg&s"
        addToCart={addToCart}
      />
      <ProductCard
        name="Lego Batman 2"
        price="42"
        activibility="Europa"
        genre="adventure"
        imageSrc="https://cdn1.epicgames.com/offer/cb23c857ec0d42d89b4be34d11302959/batman_1200x1600-d388972fd0a20881901f3946cb1c97f9"
        addToCart={addToCart}
      />
      <ProductCard
        name="Fifa"
        price="240"
        activibility="Niemcy"
        genre="sport"
        imageSrc="https://s2.tvp.pl/images2/2/5/5/uid_255d05c3591c4ec8a0f5676a24dd064e_width_1200_play_0_pos_0_gs_0_height_678_na-okladce-ea-sports-fc-25-znalazl-sie-jude-bellingham-fot-xea-sports-fc.jpg"
        addToCart={addToCart}
      />
      <ProductCard
        name="Polytrack"
        price="0,06"
        activibility="Stany Zjednoczone"
        genre="Wyscigi"
        imageSrc="https://i.ytimg.com/vi/_EkSwZz0_Ls/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLADUcEJEiY8McWeCDatRe4B7-WiRQ"
        addToCart={addToCart}
      />
      <ProductCard
        name="Call of duty"
        price="10"
        activibility="Rosja"
        genre="Strzelanka"
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmRPf1F8j-hbOzAcRAQ4lkECicU8xbOqjE8Q&s"
        addToCart={addToCart}
      />
    </div>
     )}
     {isLogged && !showCart && (
        <footer className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <button onClick={cart} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
            Koszyk
          </button>
        </footer>
      )}
      
      {showCart && isLogged && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Twój Koszyk</h2>
          <div className="space-y-2">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center p-2 bg-white rounded shadow">
                <img src={item.imageSrc} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.price} zł</p>
                  <p>{item.activibility}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="ml-auto text-red-500 hover:text-red-700 font-bold bg-cyan-300 px-4 py-2 rounded">
                  Usuń
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

