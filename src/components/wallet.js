import React  from "react";


class WalletBasic extends React.Component{
    //key:value
    src='https://cdn.jsdelivr.net/npm/icon-sdk-js@latest/build/icon-sdk-js.web.min.j'
    state ={
        name:'my-app',
        myAddress:'',
        VoteContract : 'cx171edf6a84319ef5a2842fe15c63efffbca07ea1',
        status:'',
        id : '',
        nameCan:'',
        party: '',
        qualification: '',
        walletAddr: '',
        photo: '',
    }
    setNameCan =(e)=>{
        e.preventDefault()
        this.setState({
            nameCan :e.target.value,
        })
    }
    setId =(e)=>{
        e.preventDefault()
        this.setState({
            id :e.target.value,
        })
    }
    setParty =(e)=>{
        e.preventDefault()
        this.setState({
            party :e.target.value,
        })
    }
    setQua =(e)=>{
        e.preventDefault()
        this.setState({
            qualification :e.target.value,
        })
    }
    setWallet =(e)=>{
        e.preventDefault()
        this.setState({
            walletAddr :e.target.value,
        })
    }
    setPhoto =(e)=>{
        e.preventDefault()
        this.setState({
            photo :e.target.value,
        })
    }
    setVotes =(e)=>{
        e.preventDefault()
        this.setState({
            votes :e.target.value,
        })
    }
    
    
    handleOnChangeName=(event) => {
        console.log(event.target.value,'event.target',event.target ,'event',event)
        //this.state.name =event.target.value  Bad code !!!
        this.setState(
            {
                name:event.target.value
            }
        )
    }

    handleOnClickButton_Connect = (e) => {
        e.preventDefault()
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
                this.setState(
                    {
                        myAddress:payload
                    }
                )
            }
        }
        window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    handleOnClickButton_getGreeting = () => {
            const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
                detail: {
                    type: 'REQUEST_JSON-RPC',
                    payload: {
                        jsonrpc: "2.0",
                        method: "icx_call",
                        id: 6339,
                        params: {
                            from: this.state.myAddress, // TX sender address
                            to: this.state.VoteContract,   // SCORE address
                            dataType: "call",
                            data: {
                                method: "name", // SCORE external function
                                params: {}
                            }
                        }
                    }
                }
            });
            window.dispatchEvent(customEvent);

            const eventHandler = event => {
                const { type, payload } = event.detail;
                console.log("payload",payload);
                if (type === 'RESPONSE_JSON-RPC') {
                   // e.g., {"jsonrpc": "2.0", "id": 6339, "result": { ... }}
                    this.setState(
                        {
                            status:payload.result
                        }
                    )
                }
                else if (type === 'CANCEL_JSON-RPC') {
                    console.error('User cancelled JSON-RPC request')
                }
            }
            window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        }
    handleSubmit = (e) => {
        e.preventDefault();
        const customEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
            detail: {
                type: 'REQUEST_JSON-RPC',
                payload: {
                    jsonrpc: "2.0",
                    method: "icx_call",
                    id: 6339,
                    params: {
                        from: this.state.myAddress, // TX sender address
                        to: this.state.VoteContract,   // SCORE address
                        dataType: "call",
                        data: {
                            method: "addCandidate", // SCORE external function
                            params: {
                                    'name': this.state.nameCan,
                                    'party': this.state.party,
                                    'qual': this.state.qualification,
                                    "imgURL": this.state.imageurl
                            }
                        }
                    }
                }
            }
        });
        window.dispatchEvent(customEvent);
        const eventHandler = event => {
            const { type, payload } = event.detail;
            console.log("payload",payload);
            if (type === 'RESPONSE_JSON-RPC') {
                console.log(payload); // e.g., {"jsonrpc": "2.0", "id": 6339, "result": { ... }}
                
            }
            else if (type === 'CANCEL_JSON-RPC') {
                console.error('User cancelled JSON-RPC request')
            }
        }
        window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
        }
    render(){
        /*
        let name ='Huu Loi'
        */
       console.log('>>> call render : ',this.state )
        return (
            <>
                {/* <script src="https://cdn.jsdelivr.net/npm/icon-sdk-js@latest/build/icon-sdk-js.web.min.js"></script> */}
                <h1>
                    1.Connect Wallet
                </h1>
                <div>
                    <button onClick={(e) => {this.handleOnClickButton_Connect(e)}}>Click me </button>
                </div>
                <div className="first">
                    My Address is : {this.state.myAddress}
                </div>
                <h1>
                    2.Hello World Contract
                </h1>
                <div>
                    <button onClick={() => {this.handleOnClickButton_getGreeting()}}>Click me </button>
                </div>
                <div className="second">
                    Result : {this.state.status}
                </div>

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
                                        value={this.state.nameCan}
                                        onChange={(e) => this.setNameCan(e)}
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
                            value={this.state.party}
                            onChange={(e) => this.setParty(e)}
                        />
                        </div>

                        <div className="addCandidateFormField">
                        <label
                            className="addCandidateFormFieldLabel"
                            htmlFor="qualification"
                        >
                            Qualification 
                        </label>
                        <input
                            type="text"
                            id="qual"
                            className="addCandidateFormFieldInput"
                            placeholder="Enter candidate's qualifications"
                            value={this.state.qualification}
                            onChange={(e) => this.setQua(e)}
                        />
                        </div>

                        {/* <div className="addCandidateFormField">
                        <label className="addCandidateFormFieldLabel" htmlFor="aadhar">
                            Candidate Aadhar
                        </label>
                        <input
                            type="text"
                            id="aadhar"
                            className="addCandidateFormFieldInput"
                            placeholder="Enter candidate's aadhar"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                        />
                        </div> */}

                        <div className="addCandidateFormField">
                        <label className="addCandidateFormFieldLabel" htmlFor="wallet">
                            Candidate Wallet Address
                        </label>
                        <input
                            type="password"
                            id="wallet"
                            className="addCandidateFormFieldInput"
                            placeholder="Enter candidate's wallet address"
                            value={this.state.wallet}
                            onChange={(e) => this.setWallet(e)}
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
                            value={this.state.photo}
                            onChange={(e) => this.setPhoto(e)}
                        />
                        </div>
                        
                        <div className="addCandidateFormField">
                        <button
                            className="addCandidateFormFieldButton"
                            onClick={this.handleSubmit}
                        >
                            Add Candidate
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>



            </>
            
            
        )
    }

}
export default WalletBasic ;