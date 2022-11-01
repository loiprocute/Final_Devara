import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase/firebase";
import "./CandidateList.css";
function maskInfo (text) {
  var string = String(text);
  var replaced= string.slice(0, 2) + string.slice(2).replace(/.(?=...)/g, '*');
  console.log("Replaced:" + replaced);
  return replaced;
}

const CandidateListRow = ({ name, party, qual, mail, photo }) => {
  return (
    <div className="CandidateListRow">
      <div>{name}</div>
      <div>{party}</div>
      <div>{qual}</div>
      <div>{maskInfo(mail)}</div>
      <div>
        <img className="photo" src={photo} alt={name} />
      </div>
    </div>
  );
};

export default function CandidatesList() {
  const [candid, setCandid] = useState([]);

  const getCandidates = async (e) => {
    var querySnapshot = await getDocs(collection(db, "candidates"));

    var temp = [];

    querySnapshot.forEach((d) => {
      // console.log(d.data());
      temp.push(d.data());
    });
    console.log(temp);
    setCandid(temp);

    console.log(candid);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div className="CandidateListTable">
      <h1> Candidate's List </h1>
      <div className="CandidateListHeader">
        <div>Name</div>
        <div>Party</div>
        <div>Qualifications</div>
        <div>Identity Card</div>
        <div>Photo</div>
      </div>
      <div className="CandidateListBody">
        {candid.map((d) => (
          <CandidateListRow
            name={d.name}
            party={d.party}
            qual={d.qualification}
            aadh={d.aadhar}
            photo={d.photo}
          />
        ))}
      </div>
    </div>
  );
}
