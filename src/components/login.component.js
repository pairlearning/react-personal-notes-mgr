import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from './../redux/actions/authActionCreators';

const LoginForm = ({ dispatchLoginAction }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: false, password: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else dispatchLoginAction(email, password,
            () => toast.success("Logged In Successfully!"),
            (message) => toast.error(`Error: ${message}`));
    };

    const handleCancelForm = event => {
        event.preventDefault();
        setEmail('');
        setPassword('');
        setError({ email: false, password: false });
    };

    const isFormInvalid = () => (!email || !password);

    const updateErrorFlags = () => {
        const errObj = { email: false, password: false };
        if (!email.trim()) errObj.email = true;
        if (!password.trim()) errObj.password = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <h2>Have an Account ?</h2>
            <h4>Login here</h4>
            <br />

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input noValidate id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`form-control ${error.email ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input noValidate id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                    <p className="invalid-feedback">Required</p>
                </div>

                <button type="submit" className="btn btn-primary mr-2">
                    Login | <i className="fas fa-sign-in-alt"></i>
                </button>
                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-times"></i>
                </button>
            </form>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (email, password, onSuccess, onError) =>
        dispatch(loginUser({ email, password }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(LoginForm);
