import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

import AuthPage from './pages/authpage.component';
import NotesPage from './pages/notespage.component';
import EditNotePage from './pages/editnotepage.component';
import Header from './components/header.component';
import Spinner from './components/spinner/spinner.component';
import { logoutUser } from './redux/actions/authActionCreators';

const App = ({ user, dispatchLogoutAction }) => {
  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={2000}
        hideProgressBar transition={Slide} />
      <Spinner />
      <Header isLoggedIn={user.isLoggedIn} userName={user.fullName}
        onLogout={dispatchLogoutAction} />
      <div className="container my-5">
        {!user.isLoggedIn ?
          (<Switch>
            <Route exact path="/auth" component={AuthPage} />
            <Redirect to="/auth" />
          </Switch>) :
          (<Switch>
            <Route exact path="/notes" component={NotesPage} />
            <Route exact path="/edit-note" component={EditNotePage} />
            <Route exact path="/edit-note/:noteId" component={EditNotePage} />
            <Redirect to="/notes" />
          </Switch>)
        }
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
