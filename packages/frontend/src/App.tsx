import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import Routes from "./Routes.tsx";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext, AppContextType } from "./lib/contextlib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import TerminalInput from "./components/TerminalInput/TerminalInput.tsx";


function App() {
  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const nav = useNavigate();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    window.localStorage.removeItem('username')
    nav("/");
  }
  React.useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      const userData = await Auth.currentSession();
      console.log(userData)
      window.localStorage.setItem('username', userData?.idToken.payload.email)
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }


  return (
    !isAuthenticating && (
      <div className="App container binary-text">
        <Navbar collapseOnSelect bg="black" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand className="py-3 binary-text">Global Terminal</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link className='binary-text' onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link className="binary-text">Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className="binary-text">Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
        >
          <Routes />
          <TerminalInput />
        </AppContext.Provider>
      </div>
    )
  );

}

export default App;