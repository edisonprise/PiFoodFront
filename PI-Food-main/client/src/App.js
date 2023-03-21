import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/HomePage";
import AddRecipe from "./components/AddRecipe";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/recipe" component={AddRecipe} />
          <Route path="/detail/:id" component={RecipeDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
