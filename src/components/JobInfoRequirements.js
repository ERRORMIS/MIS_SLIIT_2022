import Wrapper from "../assets/wrappers/JobInfo";

const JobInfoRequirements = ({ icon, requirement, label }) => {
  return (
    <Wrapper>
      <p>
        <span className="icon">{icon}</span>
      </p>
      <p>
        <b>{label}:-</b>{" "}
      </p>
      <p>
        {requirement.map((item, index) => {
          return (
            <span className="text" key={index}>
              {item.label},{" "}
            </span>
          );
        })}
      </p>
    </Wrapper>
  );
};

export default JobInfoRequirements;
