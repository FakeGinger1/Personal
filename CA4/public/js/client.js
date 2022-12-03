//front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");


let userName = "";
let id;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    //console.log(typeof(userName));   
    

    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    
    }
    
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5><i class="fa-solid fa-user"></i> ${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;
};

//function used to show a message in chat when a user joins
function userjoins(user) {
  //This if statement checks whether user is already in userlist
  //and then inverts the result of the expression in the condition
  //to true, while also casting from an object to boolean
  if (!!document.querySelector(`.${user}-userlist`)) {
        return;
    
    }
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

    const receivedMsg = `
    <div class="incoming__message">
      <div class="received__message">
        <p><i class="fa-solid fa-user-plus"></i> ${user} has joined the chat!</p>
        <div class="message__info">
          <span class="time_date">${formattedTime}</span>
        </div>
      </div>
    </div>`;

    messageBox.innerHTML += receivedMsg;
    //attempt to make the messagebox scroll down when messages exceed the 
    //height of the message box however doesnt integrate well with the CSS 
    //styling wnd where the input box and enter button is placed
    window.scrollTo(0, document.content.scrollHeight);

}
//function used to show a message in chat when a user leaves
function useleaves(userName) {
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

    const receivedMsg = `
    <div class="incoming__message">
      <div class="received__message">
        <p><i class="fa-solid fa-user-minus"></i> ${userName} has left the chat!</p>
        <div class="message__info">
          <span class="time_date">${formattedTime}</span>
        </div>
      </div>
    </div>`;

    messageBox.innerHTML += receivedMsg;

    window.scrollTo(0, document.content.scrollHeight);

}

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          userjoins(user)
          return addToUsersBox(user);
      });
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  useleaves(userName)
  document.querySelector(`.${userName}-userlist`).remove();
 ;
  
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const fallback = document.querySelector(".fallback");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <h5>${userName}</h5>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
  window.scrollTo(0, document.content.scrollHeight);
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

//([1]Mateusz Piguła, 2020) emit a typing event 
inputField.addEventListener("keyup", () => {
  socket.emit("typing", {
    //if the length value of the input field of the form is more than 0 
    //then assigns the value to "isTyping"
    isTyping: inputField.value.length > 0,
    nick: userName,
    });
  });

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

//([1]Mateusz Piguła, 2020) if user is typing then "'username' is typing in the chat.." 
//is shown on the HTML of the chat. 
socket.on("typing", function (data) {
  const { isTyping, nick } = data;
  //checks if user is not typing and returns value
  if (!isTyping) {
    fallback.innerHTML = "";
    return;
  }

  fallback.innerHTML = `<p>${nick} is typing in the chat...</p>`;
});