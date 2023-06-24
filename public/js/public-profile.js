// var url = "http://194.113.64.156";
var server_url = "https://tnp.iiitbh.ac.in";

var names = document.querySelectorAll(".name");
var branch = document.querySelectorAll(".branch");
var roll = document.querySelectorAll(".roll");
var cgpa = document.querySelectorAll(".cgpa");
var phone = document.querySelectorAll(".phone");
var email = document.querySelectorAll(".email");
var linkedin = document.querySelector("#linkedin");
var github = document.querySelector("#github");
var resume = document.querySelector(".resume");
var profilePic = document.querySelector("#profile-pic");
var share = document.querySelectorAll(".share");
var viewResume = document.querySelector("#view-resume");

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

function display(data) {
  // console.log(data);
  document.title = `${data.name} | Profile`;
  names.forEach((n) => {
    n.innerHTML = data.name;
  });
  branch.forEach((b) => {
    b.innerHTML = data.branch;
  });
  roll.forEach((r) => {
    r.innerHTML = data.roll;
  });
  cgpa.forEach((c) => {
    c.innerHTML = data.cgpa;
  });
  phone.forEach((p) => {
    p.innerHTML = data.phone;
  });
  email.forEach((e) => {
    e.innerHTML = data.email;
  });
  share.forEach((e) => {
    e.innerHTML = `<button onclick="copyToClipboard('${server_url}/profile/${encodeURIComponent(
      data.email
    )}')">Copy Link 📋</button>`;
  });
  linkedin.innerHTML = `<a href="${data.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>`;
  github.innerHTML = `<a href="${data.github}" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>`;
  profilePic.src = `data:image/png;base64,${arrayBufferToBase64(
    data.profilePic.data.data
  ).toString("base64")}`;
  resume.innerHTML = `<iframe src="data:application/${
    data.resume.contentType
  };base64,${arrayBufferToBase64(data.resume.data.data).toString(
    "base64"
  )}#view=fith"
  scrolling="no" seamless="seamless"></iframe>`;
  const byteArray = new Uint8Array(data.resume.data.data);
  const blob = new Blob([byteArray], {
    type: `application/${data.resume.contentType}`,
  });
  const url = URL.createObjectURL(blob);
  viewResume.href = url;
}
const fetchData = async () => {
  let user = `${window.location.pathname}`;
  user = user.split("/profile/")[1];
  fetch(`/api/publicprofile/${encodeURIComponent(user)}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.status);
      display(data.data);
    })
    .catch((err) => {
      alert("Something Went Wrong!!" + err);
    });
};
fetchData();

const copyToClipboard = (str) => {
  navigator.clipboard.writeText(str);
};
