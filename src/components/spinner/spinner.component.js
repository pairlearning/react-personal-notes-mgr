import React from 'react';
import { connect } from 'react-redux';

import './spinner.css';

const Spinner = ({ isLoading }) => (
    <React.Fragment>
        {
            isLoading ? (<div id="spinner-fade">
                <div className="default-spinner spinner-border" role="status"></div>
            </div>) : null}
    </React.Fragment>
);

const mapStateToProps = state => ({
    isLoading: state.loading
});
export default connect(mapStateToProps)(Spinner);
