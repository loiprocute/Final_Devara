
package com.iconloop.score.example;
import java.math.BigInteger;
// package mypack;
// import mypack.*;
import java.util.*;
import score.Context;
import score.Address;
import score.DictDB;
import score.VarDB;
import score.annotation.EventLog;
import score.annotation.External;
import score.annotation.Optional;
import score.annotation.Payable;



class Candidate{
    
    public int id ;
    public String name;
    public int votes;
    public String party;
    public String qualification;
    public String imageurl;
    public Candidate(int id,String name,int votes,String party,String qualification,String imageurl){
        this.id=id;
        this.name=name;
        this.votes=votes;
        this.party=party;
        this.qualification=qualification;
        this.imageurl=imageurl;
    }
}
class Voter { 
    public Address voterAddr ;
    public Voter(Address _addr){
        this.voterAddr=_addr;
    }
}


public class vote {
    
    

    public String name ;
    public int candidatesCount;
    public Address manager;
    public int  votersCount;
    //Hashtable<Integer, Candidate> candidates = new Hashtable<Integer, Candidate>();
    DictDB<Integer, Candidate> candidates = Context.newDictDB("candidates",Candidate.class);
    //checks if person has already voted
    //Hashtable<Address, Boolean> hasVoted = new Hashtable<Address, Boolean>();
    DictDB<Address, Boolean> hasVoted = Context.newDictDB("hasVoted",Boolean.class);
    //Hashtable<Integer, Voter> voters = new Hashtable<Integer, Voter>();
    DictDB<Integer, Voter> voters = Context.newDictDB("voters",Voter.class);

    public vote(String name){
        this.name =name;
        this.manager=Context.getOwner();
        this.candidatesCount=0;
        this.votersCount=0;
        Context.println(this.manager.toString());

    }
    // Only Manager can call this function
    @External()
    public String name(){
        String  msg="hello " +  this.name + " contract" ;
        Context.println(msg);
        return msg;

    }
    @External(readonly = true)
    public String Manager(){
        return this.manager.toString();

    }
    @External()
    public void  addCandidate(String name, String party, String qual, String imgURL){
        Context.require(Context.getCaller().equals(this.manager));
        this.candidatesCount++;
        Candidate candidate= new Candidate(candidatesCount, name, 0, party, qual, imgURL);
        this.candidates.set(candidatesCount,candidate);
        String msg = "Hello " + name + "!";
        Context.println(msg);

    }
 
    //Except Manager
    @External()
    public void Vote(int _id){
        
        Context.require(!Context.getCaller().equals(this.manager));
        Context.require(!this.hasVoted.get(Context.getCaller()));
        this.candidates.get(_id).votes++;
        this.hasVoted.set(Context.getCaller(),true);
        this.votersCount++;
        Voter voter_ =new Voter(Context.getCaller());
        this.voters.set(this.votersCount,voter_);
    }
 
    // Only Manager can call this function
    @External()
    public Candidate electionResult(){
        Context.require(Context.getCaller().equals(this.manager));
        int max = this.candidates.get(1).votes;
        int winnerId =1;
        for(int j = 2; j <= candidatesCount; j++){
            if(max < this.candidates.get(j).votes) {
                max = this.candidates.get(j).votes;
                winnerId = j;
            }
        }
        return this.candidates.get(winnerId);
    }

    
}

//cx5563e469f9ed5b43cd2e58864624fdc69bdf7e5a
