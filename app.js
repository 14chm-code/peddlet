// 🔥 Firebase 설정 (직접 만들어야 함)
{
  "rules": {
    ".read": false,
    ".write": false
  }
}

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let nickname = "";

// 입장
function startChat() {
  nickname = document.getElementById("nickname").value;
  if (!nickname) return alert("닉네임 입력!");

  document.getElementById("login").style.display = "none";
  document.getElementById("chatUI").style.display = "block";

  loadMessages();
}

// 메시지 보내기
function sendMsg() {
  const msg = document.getElementById("msg").value;
  if (!msg) return;

  db.ref("messages").push({
    name: nickname,
    text: msg
  });

  document.getElementById("msg").value = "";
}

// 메시지 불러오기 (실시간)
function loadMessages() {
  db.ref("messages").on("child_added", (data) => {
    const msg = data.val();
    const div = document.createElement("div");
    div.textContent = `${msg.name}: ${msg.text}`;
    document.getElementById("chat").appendChild(div);
  });
}