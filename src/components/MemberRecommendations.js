import React from "react";
import { Col, Row } from "react-bootstrap";
import Wrapper from "../assets/wrappers/MemberRecommendations";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";

const MemberRecommendations = () => {
  const {
    filteredUserBasedOnProjectRequirement,
    teamMembers,
    handleChange,
    isLoading,
  } = useAppContext();

  const handleOnSelect = (id, userType) => {
    if (userType === "students") {
      if (checkIsMember(id, userType)) {
        const temp = teamMembers.studentList.slice();
        temp.splice(temp.indexOf(id), 1);
        handleChange({
          name: "teamMembers",
          value: { ...teamMembers, studentList: temp },
        });
        return;
      }
      const temp = teamMembers.studentList.slice();
      temp.push(id);
      handleChange({
        name: "teamMembers",
        value: { ...teamMembers, studentList: temp },
      });
    }

    if (userType === "alumni") {
      if (checkIsMember(id, userType)) {
        const temp = teamMembers.alumniList.slice();
        temp.splice(temp.indexOf(id), 1);
        handleChange({
          name: "teamMembers",
          value: { ...teamMembers, alumniList: temp },
        });
        return;
      }
      const temp = teamMembers.alumniList.slice();
      temp.push(id);
      handleChange({
        name: "teamMembers",
        value: { ...teamMembers, alumniList: temp },
      });
    }

    if (userType === "staff") {
      if (checkIsMember(id, userType)) {
        const temp = teamMembers.staffList.slice();
        temp.splice(temp.indexOf(id), 1);
        handleChange({
          name: "teamMembers",
          value: { ...teamMembers, staffList: temp },
        });
        return;
      }
      const temp = teamMembers.staffList.slice();
      temp.push(id);
      handleChange({
        name: "teamMembers",
        value: { ...teamMembers, staffList: temp },
      });
    }
  };

  const checkIsMember = (id, userType) => {
    if (userType === "students") {
      return teamMembers?.studentList.includes(id);
    }

    if (userType === "alumni") {
      return teamMembers?.alumniList.includes(id);
    }

    if (userType === "staff") {
      return teamMembers?.staffList.includes(id);
    }
  };

  const renderRecommendationList = (list, userType) => {
    if (!list) {
      return;
    }

    if (list.length === 0) {
      return <span className="no-recommendation-msg">No recommendations</span>;
    }

    return list.map((user) => {
      return (
        <Row key={user._id}>
          <Col xs={2}>
            <input
              type="checkbox"
              id="user"
              name="user"
              checked={checkIsMember(user._id, userType)}
              onChange={() => handleOnSelect(user._id, userType)}
            ></input>
          </Col>
          <Col xs={10}>
            <label htmlFor="user">{user.name}</label>
          </Col>
        </Row>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loading center />
      </div>
    );
  }

  return (
    <Wrapper>
      <Row className="recommendation-section">
        <Col xs={12} className="my-3 topic-text">
          Recommendations
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={4}>
              <Row>
                <Col xs={12} className="mb-2">
                  students
                </Col>
                <Col xs={12} className='student-list'>
                  {renderRecommendationList(
                    filteredUserBasedOnProjectRequirement.students,
                    "students"
                  )}
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <Row>
                <Col xs={12} className="mb-2">
                  Alumni
                </Col>
                <Col xs={12} className='alumni-list'>
                  {renderRecommendationList(
                    filteredUserBasedOnProjectRequirement.alumni,
                    "alumni"
                  )}
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <Row>
                <Col xs={12} className="mb-2">
                  staff
                </Col>
                <Col xs={12} className='staff-list'>
                  {renderRecommendationList(
                    filteredUserBasedOnProjectRequirement.staff,
                    "staff"
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MemberRecommendations;
