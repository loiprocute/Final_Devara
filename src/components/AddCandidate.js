import React, { useState, useEffect } from "react";
import "./AddCandidate.css";
import { setDoc, doc } from "firebase/firestore";
import db from "../firebase/firebase";
import IconService from 'icon-sdk-js'
const AddCandidate = () => {
  
  const [name, setName] = useState();
  const [party, setParty] = useState();
  const [qual, setQual] = useState();
  const [ID, setID] = useState();
  const [wallet, setWallet] = useState();
  const [photo, setPhoto] = useState();
  const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3');
  const iconService = new IconService(httpProvider);
  const iconConverter = IconService.IconConverter;
  const iconAmount = IconService.IconAmount;
  const iconWallet = IconService.IconWallet;
  const iconBuilder = IconService.IconBuilder;
  const SignedTransaction = IconService.SignedTransaction;
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await setDoc(doc(db, "candidates", ID), {
  //       name: name,
  //       party: party,
  //       qualification: qual,
  //       aadhar: ID,
  //       walletAddr: wallet,
  //       photo: photo,
  //       votes: 0,
  //     });
  //     alert("Candidate Added Successfully");
  //     // console.log("Candidate Added Successfully");
  //   } catch (e) {
  //     alert("Error : ", e);
  //     console.log("Error adding document: ", e);
  //   }
  // };
  // from: 'hx2cb07728a27ebd9bec0ffe46c27550f1faf6acdf', // TX sender address
  // to: 'cx104f2e875457383486bf98ecc3e1c0dc325208b3',
  // const handleSubmit =  (e) => {
  //   e.preventDefault();
  //   const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
  //       detail: {
  //           type: 'REQUEST_JSON-RPC',
  //           payload: {
  //               jsonrpc: "2.0",
  //               method: "icx_call",
  //               id: 6339,
  //               params: {
  //                 from: 'hx9b4d26d0bd2d21d07a5f1a35beb5040af8c33fa9', // TX sender address
  //                 to: 'cxa32c1dff241c206c8ed5f57ba9dec62e72b3d64d',
  //                   dataType: "call",
  //                   data: {
  //                       method: "createPool", // SCORE external function
  //                       params: {
  //                               poolName: name,
  //                               start: party,
  //                               end: qual
  //                       }
  //                   }
  //               }
  //           }
  //       }
  //   });
  //   window.dispatchEvent(customEvent);
  //   const eventHandler = event => {
  //       const { type, payload } = event.detail;

  //       if (type === 'RESPONSE_JSON-RPC') {
  //           console.log(payload); // e.g., {"jsonrpc": "2.0", "id": 6339, "result": { ... }}

  //       }
  //       else if (type === 'CANCEL_JSON-RPC') {
  //           console.error('User cancelled JSON-RPC request')
  //       }
  //   }
  //   window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name) {
      getMethod({
            from: 'hx9b4d26d0bd2d21d07a5f1a35beb5040af8c33fa9',
            to:  'cxa32c1dff241c206c8ed5f57ba9dec62e72b3d64d',
            method: "createPool",
            params: {
                    poolName: name,
                    start: party,
                    end: qual
                     }
        }, (payload) => {
                console.log("success");
        });
    } else {
        console.log('empty')
    }
}
const callMethod = ({ from, to, method, params, value }, handleSuccess) => {
  const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: {
          type: 'REQUEST_JSON-RPC',
          payload: {
              jsonrpc: "2.0",
              method: "icx_sendTransaction",
              id: 133,
              params: iconConverter.toRawTransaction({
                  from,
                  to,
                  value: iconAmount.of(value || 0, iconAmount.Unit.ICX).toLoop(),
                  dataType: "call",
                  nid: "0x53",
                  timestamp: (new Date()).getTime() * 1000,
                  stepLimit: iconConverter.toBigNumber(1000000),
                  version: iconConverter.toBigNumber(3),
                  data: {
                      method,
                      params,
                  }
              })
          }
      }
  });
  window.dispatchEvent(customEvent);
  console.log(customEvent)

  const eventHandler = event => {
      window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

      const { type, payload } = event.detail;
      if (type === 'RESPONSE_JSON-RPC') {
          handleSuccess(payload);
      }
      else if (type === 'CANCEL_JSON-RPC') {
          console.error('User cancelled JSON-RPC request');
      }
  }
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}
async function getMethod({ from, to, method, params }, handleSuccess) {
  const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: {
          type: 'REQUEST_JSON-RPC',
          payload: {
              jsonrpc: "2.0",
              method: "icx_call",
              id: 133,
              params: {
                  from,
                  to,
                  dataType: "call",
                  data: {
                      method,
                      params,
                  }
              }
          }
      }
  });
  window.dispatchEvent(customEvent);

  await new Promise((resolve, reject) => {
      const eventHandler = event => {
          window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

          const { type, payload } = event.detail;
          if (type === 'RESPONSE_JSON-RPC') {
              handleSuccess(payload.result);
              resolve();
          }
          else if (type === 'CANCEL_JSON-RPC') {
              console.error('User cancelled JSON-RPC request');
              reject();
          }
      }

      window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
  });
}

  const connectWallet = (e) => {
    e.preventDefault();
    const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    });
    window.dispatchEvent(customEvent);
  
    const eventHandler = event => {
        const { type, payload } = event.detail;
        if (type === 'RESPONSE_ADDRESS') {
            console.log(payload); // e.g., hx19870922...
  
        }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
  }
  
  // method: "addCandidate", // SCORE external function
  //                       params: {
  //                               name: name,
  //                               party: party,
  //                               qual: qual,
  //                               imgURL: photo
  //                       }

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
            <script src="https://cdn.jsdelivr.net/npm/icon-sdk-js@latest/build/icon-sdk-js.web.min.js"></script>
            <div className="addCandidateFormField">
            <button
                className="addCandidateFormFieldButton"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
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
