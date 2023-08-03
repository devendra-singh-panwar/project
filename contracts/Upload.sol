pragma solidity^0.8.0; //pure 
// SPDX-License-Identifier: GPL-3.0

contract Upload{
    struct Access{
        address user; 
        // string  userName
        bool access; // true or false 
    }

    mapping(address =>string[]) value; // ita will store the url of images of videos or pdf 

    mapping(address => mapping(address=>bool)) ownership; // this ownership mapping function will show the data 
    //  ownership [address1][addresss2]=true;

    mapping (address=>Access[]) accessList; // it ( accessList) will show the list of the people ( addresses ) that they have accessed teh video and images and pdfs .


    mapping(address=>mapping(address=>bool)) previousData; // we need this previousData becuase here is not nodejs like backend we're totally rely on the Blockchain and our all of the data will store on the blockchian.

    function add( address _user  , string memory url) external {// this function will allow user to add the files ( vidoeo photo, pdfs)
        value[_user].push(url); // which means "push the url on the user addresss).
    }

    function allow(address user ) external { // this function will allow to user the access is true or not 
        ownership[msg.sender][user]=true; // in the first do true the ownership
        if(previousData[msg.sender][user]){ // if the previous data is true (it
            for(uint i=0;i<accessList[msg.sender].length;i++){ // then search the user in this array(accessList[])  we are writing this because disallow function will do false to any user access
                if(accessList[msg.sender][i].user==user){ // and then if we found the user is already present in the 
                    accessList[msg.sender][i].access=true; // and then do true of user to access on the accessList
                }
            }

            }else{
                accessList[msg.sender].push(Access(user,true)); // if the condition is false in if condition then the loop will come here so  this will allow user to access the list to push 
                // above line means pushing the value like struct type Access(user,true) to the accessList array
                previousData[msg.sender][user]=true;  // end at the last we're gonna do the true the previousData which is user 

            }
        }
    


    function disallow(address user) external {// basically this function will disallow of the user to accesss the other photos ,videos 
        ownership[msg.sender][user]=false;  // directly disallow access of the user to see others medias 
        for(uint i=0;i<accessList[msg.sender].length;i++){  // search every element on the accessList arrary
        if(accessList[msg.sender][i].user==user){ // if we found the user which we want to disallow 
          accessList[msg.sender][i].access= false; // so here do it . like do false the access of this user.
        }
        }
    
    }
    
    function display(address user)external  view returns(string[] memory ){ //this function will display the users id 
        require(msg.sender==user||ownership[user][msg.sender],"you don't have access to display "); // this require function  for the user identification , 
        return value[user];
    }

    function shareAccess() public view returns(Access[] memory){ // this function will return of the data of the user which has already shared 
        return accessList[msg.sender];
    }

}       

