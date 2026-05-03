function fetchUserdata(userID, callback){
    setTimeout(function(){
        const users = {
            1 : {id:1, name:"Naveen"},
            2: {id:2, name: "Tom"}
        };


        const user = users[userID]
        if(user){
            callback(null, user)
        }
        else{
            callback("User not found", null);
        }
    }, 2000)
}


function handleUserData(error, user){
    if(error){
        console.log("Error: "+error)
    }
    else{
        console.log("User: "+user.name)
    }
}


fetchUserdata(3, handleUserData)
