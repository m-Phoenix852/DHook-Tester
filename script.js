document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") send();
});

function send() {
  let url = document.getElementById("webhook-url").value;
  let author = document.getElementById("author").value;
  let avatar = document.getElementById("avatar-url").value;
  let content = document.getElementById("content").value;

  if (url === "" || typeof url === "undefined" || url === null)
    return alert("Webhook URL must not be empty!");
  if (content === "" || typeof content === "undefined" || content === null)
    return alert("Message content must not be empty!");

  document.querySelector("button").innerHTML = "Sending...";
  document.querySelector("button").disabled = true;

  superagent
    .post(url)
    .send({ content: content, username: author, avatar_url: avatar })
    .type("form")
    .then(
      function (res) {
        console.log("Sent successfully!");
        document.querySelector("button").innerHTML = "Send";
        document.querySelector("button").disabled = false;
      },
      function (err) {
        alert("Error: " + err);
        throw err;
      }
    );
}
