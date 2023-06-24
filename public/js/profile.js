// var url = "http://194.113.64.156";
var server_url = "http://localhost:5000";

if (window.innerWidth < 992) {
  window.location.href = "/notview";
} else {
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
  var update = document.querySelectorAll(".update");
  var share = document.querySelectorAll(".share");

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
    )}#toolbar=0&view=fith"
  scrolling="no" frameborder="0" seamless="seamless"></iframe>`;
  }

  fetch(`/api/showProfile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      auth_token: `${localStorage.getItem("token")}`,
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
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/profile";
};

if (!localStorage.getItem("token")) {
  update.forEach((e) => {
    e.style.display = "none";
  });
}

const overlayClose = () => {
  document.querySelector(".overlay").style.display = "none";
};

const overlayOpen = () => {
  document.querySelector(".overlay").style.display = "flex";
};

document.forms["update-resume"].addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(e.target);
  fetch(`/api/updateresume`, {
    method: "PUT",
    headers: {
      auth_token: `${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.status == 0) {
        alert("Resume Updated Successfully");
        window.location.reload();
      } else {
        alert("Something Went Wrong!!");
      }
    })
    .catch((err) => {
      alert("Something Went Wrong!!" + err);
    });
});

document.forms["update-cgpa"].addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(e.target);
  fetch(`/api/updatecgpa`, {
    method: "PUT",
    headers: {
      auth_token: `${localStorage.getItem("token")}`,
    },
    body: new URLSearchParams(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.status == 0) {
        alert("CGPA Updated Successfully");
        window.location.reload();
      } else {
        alert("Something Went Wrong!!");
      }
    })
    .catch((err) => {
      alert("Something Went Wrong!!" + err);
    });
});

const copyToClipboard = (str) => {
  navigator.clipboard.writeText(str);
};
