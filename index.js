const form = document.getElementById("form");
const ul = document.getElementById("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const phonenumber = e.target.phonenumber.value;
  console.log(username);
  const obj = {
    username,
    email,
    phonenumber,
  };
  axios
    .post("http://localhost:3000/add-users/", obj)
    .then((res) => {
      newContent();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
let data;
window.addEventListener("DOMContentLoaded", function () {
  axios.get("http://localhost:3000/get-users/").then((result) => {
    console.log(result.data);
    for (const iterator of result.data) {
      showOnScreen(iterator);
    }
  });
});

function newContent() {
  axios
    .get("http://localhost:3000/get-users/")
    .then((res) => {
      ul.innerHTML = "";
      for (let i = 0; i < res.data.length; ++i) {
        showOnScreen(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
}

function showOnScreen(users) {
  console.log(users);
  let button = document.createElement("button");
  let editBtn = document.createElement("button");
  editBtn.id = "ebtn";
  editBtn.innerText = "Edit";
  button.id = "btn";
  button.innerText = "Delete";
  let li = document.createElement("li");
  li.innerText = `${users.username}  ${users.email} ${users.phonenumber}`;
  ul.appendChild(li);
  ul.appendChild(button);
  ul.appendChild(editBtn);
  ul.appendChild(document.createElement("br"));
  li.style.display = "inline";

  // delete button functionality
  button.addEventListener("click", (e) => {
    deleteData(users, li, button, editBtn);
  });
}

function deleteData(users, li, button, editBtn) {
  axios
    .delete(`http://localhost:3000/users/delete-user/${users.id}`)
    .then((res) => {
      ul.removeChild(li);
      ul.removeChild(button);
      ul.removeChild(editBtn);
      newContent();
    })
    .catch((err) => console.log(err));
}
