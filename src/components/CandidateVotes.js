import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "./CandidateVotes.css";

const CandidateVotesRow = ({ id, cName, party, voteCount}) => (
  <div className="CandidateVotesRow">
    <div>{id}</div>
    <div>{cName}</div>
    <div>{party}</div>
    <div>{voteCount}</div>
  </div>
);

class CandidateVotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          cName: "Anurag Rai",
          party: "BJP",
          voteCount: "0",
        },
        {
          id: 2,
          cName: "Riya Jain",
          party: "INC",
          voteCount: "1",
        },
      ],
    };
  }

  render() {
    const rows = this.state.data.map((rowData) => <CandidateVotesRow {...rowData} />);

    return (
      <div className="CandidateVotesTable">
        <div className="CandidateVotesHeader">
          <div>ID</div>
          <div>Candidate Name</div>
          <div>Party Name</div>
          <div>Vote Count</div>
        </div>
        <div className="CandidateVotesBody">{rows}</div>
      </div>
    );
  }
}
export default CandidateVotes;
