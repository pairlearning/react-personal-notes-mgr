import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NotesCollection from '../components/notescollection.component';
import { fetchAllNotes } from './../redux/actions/notesActionCreators';

const NotesPage = ({ loading, notes, dispatchFetchAllNotesAction }) => {

    useEffect(() => dispatchFetchAllNotesAction(), [dispatchFetchAllNotesAction]);

    return (
        <React.Fragment>
            <div className="row my-5">
                <div className="col-10">
                    <h2>Personal Notes</h2>
                </div>
                <div className="col-2">
                    <Link to="/edit-note" className="btn btn-primary">
                        Create Note | <i className="fas fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    {
                        notes.length > 0 ? <NotesCollection notes={notes} /> :
                            <div className="text-center mt-5">
                                <h2><i className="far fa-folder-open fa-3x"></i></h2>
                                <h1 className="text-center">You don't have any notes</h1>
                            </div>
                    }
                </div>
            </div>

        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loading: state.loading,
    notes: state.notes
});
const mapDispatchToProps = dispatch => ({
    dispatchFetchAllNotesAction: () => dispatch(fetchAllNotes())
});
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
