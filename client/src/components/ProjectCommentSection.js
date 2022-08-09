import moment from "moment";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Wrapper from "../assets/wrappers/ProjectCommentSection";
import { FormRow } from ".";
import { useAppContext } from "../context/appContext";

const ProjectCommentSection = (props) => {
  const { comments, projectId } = props;
  const [comment, setComment] = useState();
  const { sendComment } = useAppContext();

  const renderComments = comments.map((comment) => {
    return (
      <Row key={comment._id} className="comment">
        <Col xs={12}>
          <Row className="comment-header">
            <Col xs={6} className="comment-author">
              {comment.author.userID?.name}
            </Col>
            <Col xs={6} className="comment-time">
              {moment(comment.time).format("LLL")}
            </Col>
          </Row>
          <Row className="comment-body">{comment.body}</Row>
        </Col>
      </Row>
    );
  });

  const handleOnChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleOnClickSend = async () => {
    const body = {
      body: comment
    }
    await sendComment(projectId, body)
    setComment('')
  }

  return (
    <Wrapper>
      <Row className="comment-section">
        <Row>
          <b className="p-0">Comments</b>
        </Row>
        {comments && (
          <Col xs={12} className="comment-list">
            {renderComments}
          </Col>
        )}
        <Col xs={12} className="comment-input-section">
          <FormRow
            value={comment}
            handleChange={handleOnChangeComment}
            type="text"
          />
        </Col>
        <Col xs={12}>
          <button type="button" className="btn send-btn" onClick={handleOnClickSend}>
            Send
          </button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ProjectCommentSection;
