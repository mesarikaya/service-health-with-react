import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import Footer from "./component/custom/footer/footer";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { ProfileContent } from "./component/ProfileContent";
import { flattenArr, getAllowedRoutes } from "./component/utils/utils";
import { useSelector } from "react-redux";
import Nodata from "./pages/nodata";
import { PageLayout } from "./component/PageLayout";

export default function ClippedDrawer() {
  const selectEvent = (state) => state?.event;

  const { authDetail } = useSelector(selectEvent);

  // useEffect(() => {

  // }, [authDetail]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
            <Box component="main" sx={{ flexGrow: 1 }} style={{ marginTop: "65px" }}>
              <Routes>
                {flattenArr(getAllowedRoutes(routes)).map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.component />}
                    />
                  );
                })}
                <Route path="*" element={<Nodata />} />
              </Routes>
            </Box>
            <Footer />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Box component="main" sx={{ flexGrow: 1 }} style={{ marginTop: "65px" }}>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="*" element={<Nodata />} />
                </Routes>
              </Suspense>
            </Box>

            <Footer />
          </UnauthenticatedTemplate>
        </PageLayout>
      </Box>
    </React.Fragment>
  );
}
