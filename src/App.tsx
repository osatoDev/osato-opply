import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./bundles/Sign In";
import SignUp from "./bundles/SignUp/SignUp";
import CssBaseline from "@material-ui/core/CssBaseline";
import { RecoilRoot } from "recoil";
import Suppliers from "./bundles/Suppliers";
import Quotes from "./bundles/Quotes";
import NotFoundPage from "./NotFoundPage";
import SpecificSupplier from "./bundles/SpecificSupplier";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <RecoilRoot>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/signinFromLogout"
                element={<SignIn hasJustLoggedOut />}
              />
              <Route
                path="/signinFromSignUp"
                element={<SignIn hasJustSignedUp={true} />}
              />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Suppliers" element={<Suppliers />} />
              <Route path="/Supplier/:id" element={<SpecificSupplier />} />
              <Route path="/Quotes" element={<Quotes />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </RecoilRoot>
        </BrowserRouter>
      </StyledEngineProvider>
    </>
  );
}

export default App;
