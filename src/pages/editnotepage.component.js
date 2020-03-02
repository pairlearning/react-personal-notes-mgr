import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { createNote, getNoteById, updateNoteById } from './../redux/actions/notesActionCreators';

const EditNotePage = ({ match, history, dispatchCreateNoteAction, dispatchGetNoteByIdAction, dispatchUpdateNoteAction }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState({ title: false, content: false, description: false, category: false });

    useEffect(() => {
        const { noteId } = match.params;
        if (noteId) {
            dispatchGetNoteByIdAction(noteId, ({ title, content, description, category }) => {
                setTitle(title);
                setContent(content);
                setDescription(description);
                setCategory(category);
            });
        }
    }, [dispatchGetNoteByIdAction, match.params]);

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            const { noteId } = match.params;
            const data = { title, content, description, category };
            if (noteId) {
                dispatchUpdateNoteAction(noteId, data, () => {
                    toast.success('Note updated Successfully!');
                    history.replace('/notes');
                }, (message) => toast.error(`Error: ${message}`));
            } else {
                dispatchCreateNoteAction(data, () => {
                    toast.success('Note created Successfully!');
                    history.replace('/notes');
                }, (message) => toast.error(`Error: ${message}`));
            }
        }
    };

    const isFormInvalid = () => (!title.trim() || !content.trim() || !description.trim() || !category);

    const updateErrorFlags = () => {
        const errObj = { title: false, content: false, description: false, category: false };
        if (!title.trim()) errObj.title = true;
        if (!content.trim()) errObj.content = true;
        if (!description.trim()) errObj.description = true;
        if (!category) errObj.category = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>Edit Note</h2>
                </div>
            </div>
            <div className="row align-items-center mt-4">
                <div className="col-9">
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input noValidate id="title"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`form-control ${error.title ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input noValidate id="content"
                                type="text"
                                placeholder="Content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className={`form-control ${error.content ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input noValidate id="description"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`form-control ${error.description ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select noValidate id="category"
                                name="category"
                                className={`form-control ${error.category ? 'is-invalid' : ''}`}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="GENERAL">General</option>
                                <option value="IDPROOF">ID Proof</option>
                                <option value="PROFESSIONAL">Professional</option>
                            </select>
                            <p className="invalid-feedback">Required</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mr-2 btn-lg">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                onClick={() => history.replace("/notes")}
                                className="btn btn-secondary btn-lg">
                                Cancel | <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchCreateNoteAction: (data, onSuccess, onError) =>
        dispatch(createNote(data, onSuccess, onError)),
    dispatchUpdateNoteAction: (noteId, data, onSuccess, onError) =>
        dispatch(updateNoteById(noteId, data, onSuccess, onError)),
    dispatchGetNoteByIdAction: (noteId, onSuccess) =>
        dispatch(getNoteById(noteId, onSuccess))
});
export default connect(null, mapDispatchToProps)(EditNotePage);
