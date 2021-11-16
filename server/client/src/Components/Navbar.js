import React from "react";
import{
    Route,
    Link,
    BrowserRouter,
    Switch
    
  } from "react-router-dom";

import UpdateInfo from "./UpdateInfo.js";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./homepage";

const NavbarComp = () => {
  return (
      <BrowserRouter>
    <>
      <nav class="navbar navbar-expand-lg navbar-light p-2 bg-light">
        <Link class="navbar-brand" to="#f">
          Navbar
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav ">
            <li class="nav-item active">
              <Link class="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/updateinfo">
                UpdateInfo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
       
       <Switch>
          <Route exact path="/profile">
            <Homepage />
          </Route>
          <Route exact path="/updateinfo">
            <UpdateInfo />
          </Route>
        </Switch> 
       
        </>
        </BrowserRouter> 
   
  );
};

export default NavbarComp;