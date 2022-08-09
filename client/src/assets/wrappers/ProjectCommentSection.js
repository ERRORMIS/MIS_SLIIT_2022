import styled from 'styled-components'

const Wrapper = styled.section`
  .comment-section {
    border: 1px solid gray;
    width: 100%;
    padding: 25px 15px;
  }
  .comment-list {
    max-height: 130px;
    overflow-y: scroll;
    padding: 5px;
    font-size: 12px;
  }
  .comment {
    width: 100%;
    padding: 4px 2px;
    margin-bottom: 3px;
    border-bottom: 1px solid #d3d2d2;
  }
  .comment-header {
    width: 100%;
    margin-bottom: 2px;
  }
  .comment-author {
    padding-left: 0;
  }
  .comment-time {
    padding-left: 0;
  }
  .comment-body {
    width: 100%;
    color: brown;
  }
  .comment-input-section {
    margin-top: 8px;
  }
  .send-btn {
    background: #fcefc7;
    color: #ff7f50;
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
`;

export default Wrapper;