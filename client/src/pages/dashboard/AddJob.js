import { useState } from "react";
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    owner,
    description,
    // jobType,
    // jobTypeOptions,
    status,
    statusOptions,
    projectRequirement,
    handleChange,
    clearValues,
    startDate,
    createJob,
    endDate,
    editJob,
    requirement
  } = useAppContext();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const  [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    
  }
  const convertContentToHTML = () => {

    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(convertedContent);
    

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title || !owner || !description ||!startDate ||!endDate) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }


  const handleJobInputDescription = (e) => {
    const name = 'description'
    const value = e.data
    console.log(value);
    handleChange({ name, value })
  }

  const [text, setText] = useState("")

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit project' : 'add project'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* title */}
          <FormRow
            type='text'
            name='title'
            value={title}
            handleChange={handleJobInput}
          />
          {/* owner */}
          <FormRow
            type='text'
            name='owner'
            value={owner}
            handleChange={handleJobInput}
          />
          {/* location */}
          {/* <FormRow
            type='textarea'
            labelText='description'
            name='description'
            value={description}
            handleChange={handleJobInput}
          /> */}

          <FormRow
            type='date'
            labelText='Start Date'
            name='startDate'
            value={startDate}
            handleChange={handleJobInput}
          />

          <FormRow
            type='date'
            labelText='End Date'
            name='endDate'
            value={endDate}
            handleChange={handleJobInput}
          />

          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <FormRowSelect
            labelText='Project Requirement'
            name='requirement'
            value={requirement}
            handleChange={handleJobInput}
            list={projectRequirement}
          />

          <div className="form-row">
          <label className='form-label'>description</label>
              {/* <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperStyle={{ width: 500, border: "1px solid black" }}
              /> */}

          <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
            handleJobInputDescription({ data })

          }}
        />
            


          </div>
      
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
