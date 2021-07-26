import { Router } from "@reach/router";
import './App.css';
import HomePage from "./components/HomePage";
import LoginRegister from "./views/LoginRegister";
import FitnessClassList from "./components/FitnessClassList";
import AddFitnessClass from "./components/AddFitnessClass";
import EditFitnessClass from "./components/EditFitnessClass";

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage default path="/" />
        <LoginRegister path="/login" />
        <FitnessClassList path="/classes" />
        <AddFitnessClass path="/class/new" />
        <EditFitnessClass path="/class/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
