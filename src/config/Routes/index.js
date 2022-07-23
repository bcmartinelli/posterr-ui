import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import Home from '../../pages/Home/Home'
import NormalRoute from "./NormalRoute";
import { showAlert, updateProfileLoaded } from "../../store/reducers/configSlice";
import { setActiveRoute } from "../../store/reducers/routerSlice";
import { setUserProfile } from "../../store/reducers/userSlice";
import { getCurrentUser } from "../../services/postsService";

export const FilterContext = createContext(false);

const App = props => {
  const { history } = props;
  const { profileIsLoaded} = useSelector((state) => state.config);
  const { isShowing, msg } = useSelector((state) => state.config.alertShowing);
  const userDetail = useSelector((state) => state.user);
  const dispatch = useDispatch();  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(showAlert(false, ''))
  }

  useEffect(() => {
    async function fetchCurrentProfile() {
      const currentProfile = await getCurrentUser(userDetail.id);
      dispatch(setUserProfile(currentProfile.data[0]));
    }
    if (!profileIsLoaded) {
      dispatch(updateProfileLoaded(true));
      fetchCurrentProfile();
    }
  }, [dispatch, userDetail, profileIsLoaded])
  

  useEffect(() => {
    dispatch(setActiveRoute(window.location.pathname));
  }, [dispatch, profileIsLoaded])
  

  return (
    <>
      <Router history={history}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home/all" />} />
          <Route path="/home" element={<Navigate replace to="/home/all" />} />
          <Route path="/home/:filter" element={<NormalRoute component={Home} menu />} exact />
          <Route path="/:profile" element={<NormalRoute component={Home} menu />} exact />
          <Route path="*" element={<Navigate replace to="/home/all" />} />
        </Routes>
      </Router>

      <Snackbar
        open={isShowing}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Alert severity="error" variant="filled">
          {msg === 'LIMIT_PER_DAY'
            ? "You've already reached the limit of 5 posts per day"
            : "Profile not found"
          }
          </Alert>
      </Snackbar>
    </>
  );
}

export default App;
