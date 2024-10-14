// import './App.css';
// import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ParticlesComponent from "./components/Layouts/particles"; 


// function App() {
//   return (
//     <div className='App'>
//       <ParticlesComponent id="particles"/>
//         <Routes>
//           {/* <Route path="/" element={<HomePage />} /> */}
//           <Route path="/" element={<Register/>} />
//           {/* <Route path="/register" element={<Register />} /> */}
//           <Route path="/login" element={<Login />} />
//         </Routes>
//         </div>
//   );
// }

// export function ProtectedRoutes(props) {
//   if (localStorage.getItem("user")) {
//     return props.children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default App;

import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ParticlesComponent from "./components/Layouts/particles"; 

function App() {
  return (
    <div className='App'>
      <ParticlesComponent id="particles"/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Route for HomePage */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
        </Routes>
    </div>
  );
}

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
