const socket = io("http://localhost:3004");

let  userDiv = document.getElementById("user");

socket.on("joined", (data)=>{
    userDiv.innerText = `your user id is: ${data}`;
})

socket.on("connect", () => {
    console.log("Connected to the server with ID:", socket.id);
});

socket.on("submission-response", (data)=>{
    let  submissionDiv = document.getElementById("submission");
    submissionDiv.innerText = JSON.stringify(data);
})

socket.on("disconnect", ()=>{
})

socket.on("connect_error", (err) => {
    console.error("Connection Error:", err.message);
});