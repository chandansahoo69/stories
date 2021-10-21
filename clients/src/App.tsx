import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
//components
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Home/Homepage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Write from './pages/Write/Write';
import Settings from './pages/Settings/Settings';
import Single from './pages/Single/Single';
import Contact from './pages/Contact/Contact';
import { useLoading } from "./hooks/useLoading";

function App() {
    //get the user from store 
    const currentUser:any = useSelector((state: RootState) => state.authSclice.user);
    console.log("currentUser--->",currentUser);

    const {loading} = useLoading();
    console.log("custom hooks--->",loading);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/posts">
                    <Homepage />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/register">
                    {currentUser ? <Homepage /> : <Register />}
                </Route>
                <Route path="/login">
                    {currentUser ? <Homepage /> : <Login />}
                </Route>
                <Route path="/post/:id">
                    <Single />
                </Route>
                <Route path="/write">
                    {currentUser ? <Write /> : <Login />}
                </Route>
                <Route path="/settings">
                    {currentUser ? <Settings /> : <Login />}
                </Route>
            </Switch>
    </Router>
    </div>
  );
}

export default App;
