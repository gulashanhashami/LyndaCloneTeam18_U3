//async function for login
async function login(){
    loginData={
        username:document.getElementById("username").value,
        password:document.getElementById("password").value,
    };
    loginData=JSON.stringify(loginData);
    //use masai authentication for login data
    let login_api= `https://masai-api-mocker.herokuapp.com/auth/login`;
    //now fetch requset
    let response=await fetch(login_api, {
        //use POST method
        method: "POST",
        body: loginData,
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data=await response.json();
    //console.log("data:", data);
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    //function call for get profile data
    getProfile(username, data.token);
    console.log(data.error)
    if(data.error===false && username.length!==0 && password.length>=6){
        document.getElementById("username").style.borderColor="grey";
        document.getElementById("password").style.borderColor="grey";
        alert("Login successfully.");
        window.location.href="home.html";
    }
    else{
        document.getElementById("username").style.borderColor="red";
        document.getElementById("password").style.borderColor="red";
        alert("Please enter same username and password.");
    }
}
//async function for get profile of user
  async function getProfile(username, token){
       let api=  `https://masai-api-mocker.herokuapp.com/user/${username}`;
       let response= await fetch(api, {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
           },
       });
       let data=await response.json();
   
  }