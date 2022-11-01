import React, { useState, useEffect } from "react";
import "./AddCandidate.css";
import { setDoc, doc } from "firebase/firestore";
import db from "../firebase/firebase";

const AddCandidate = () => {
  const [name, setName] = useState();
  const [party, setParty] = useState();
  const [qual, setQual] = useState();
  const [ID, setID] = useState();
  const [wallet, setWallet] = useState();
  const [photo, setPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "candidates", ID), {
        name: name,
        party: party,
        qualification: qual,
        aadhar: ID,
        walletAddr: wallet,
        photo: photo,
        votes: 0,
      });
      alert("Candidate Added Successfully");
      // console.log("Candidate Added Successfully");
    } catch (e) {
      alert("Error : ", e);
      console.log("Error adding document: ", e);
    }
  };
  // from: 'hx2cb07728a27ebd9bec0ffe46c27550f1faf6acdf', // TX sender address
  // to: 'cx104f2e875457383486bf98ecc3e1c0dc325208b3',
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
  //       detail: {
  //           type: 'REQUEST_JSON-RPC',
  //           payload: {
  //               jsonrpc: "2.0",
  //               method: "icx_call",
  //               id: 6339,
  //               params: {
  //                 from: 'hx2cb07728a27ebd9bec0ffe46c27550f1faf6acdf', // TX sender address
  //                 to: 'cxcfcd8958f0e8906418a60d7a4cb050f68e71482c',
  //                   dataType: "call",
  //                   data: {
  //                       method: "addCandidate", // SCORE external function
  //                       params: {
  //                               'name': name,
  //                               'party': party,
  //                               'qual': qual,
  //                               "imgURL": photo
  //                       }
  //                   }
  //               }
  //           }
  //       }
  //   });
  //   window.dispatchEvent(customEvent);
  //   const eventHandler = event => {
  //       const { type, payload } = event.detail;
  //       console.log("payload",payload);
  //       if (type === 'RESPONSE_JSON-RPC') {
  //           console.log(payload); // e.g., {"jsonrpc": "2.0", "id": 6339, "result": { ... }}

  //       }
  //       else if (type === 'CANCEL_JSON-RPC') {
  //           console.error('User cancelled JSON-RPC request')
  //       }
  //   }
  //   window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const customEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
  //     detail: {
  //       type: "REQUEST_JSON-RPC",
  //       payload: {
  //         jsonrpc: "2.0",
  //         method: "icx_call",
  //         id: 6339,
  //         params: {
  //           from: "hx2cb07728a27ebd9bec0ffe46c27550f1faf6acdf", // TX sender address
  //           to: "cxcfcd8958f0e8906418a60d7a4cb050f68e71482c", // SCORE address
  //           dataType: "call",
  //           data: {
  //             method: "name", // SCORE external function
  //             params: {},
  //           },
  //         },
  //       },
  //     },
  //   });
  //   window.dispatchEvent(customEvent);
  // };

  // const eventHandler = (event) => {
  //   console.log("event", event);
  //   // const { type, payload } = event.detail;
  //   // if (type === "RESPONSE_JSON-RPC") {
  //   //   console.log("payload", payload);
  //   // } else if (type === "CANCEL_JSON-RPC") {
  //   //   console.error("User cancelled JSON-RPC request");
  //   // }
  // };

  // useEffect(() => {
  //   const close = window.addEventListener(
  //     "ICONEX_RELAY_RESPONSE",
  //     eventHandler
  //   );

  //   return () => {
  //     window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
  //   };
  // }, []);

  return (
    <div className="AddCandidate">
      <div className="addCandidateForm">
        <div className="addCandidateFormCenter">
          <p className="addCandidateFormTitle">Add Candidate </p>
          <form className="addCandidateFormFields">
            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="name">
                Candidate Name
              </label>
              <input
                type="text"
                id="name"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="party">
                Candidate Party
              </label>
              <input
                type="text"
                id="party"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate party"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label
                className="addCandidateFormFieldLabel"
                htmlFor="qualification"
              >
                Qualification (Separated with ,)
              </label>
              <input
                type="text"
                id="qual"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's qualifications"
                value={qual}
                onChange={(e) => setQual(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="aadhar">
                Identity Card
              </label>
              <input
                type="text"
                id="aadhar"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's Identity Card"
                value={ID}
                onChange={(e) => setID(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="wallet">
                Candidate Wallet Address
              </label>
              <input
                type="password"
                id="wallet"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's wallet address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <label className="addCandidateFormFieldLabel" htmlFor="imageUrl">
                Candidate Photo
              </label>
              <input
                type="text"
                id="photo"
                className="addCandidateFormFieldInput"
                placeholder="Enter candidate's image url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            <div className="addCandidateFormField">
              <button
                className="addCandidateFormFieldButton"
                onClick={handleSubmit}
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
