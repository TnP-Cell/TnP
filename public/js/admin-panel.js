// const url = "http://194.113.64.156";
// var url = "http://localhost:5000";

var newsHistory = document.querySelector("#news-history");
var eventsHistory = document.querySelector("#events-history");
var newsAdd = document.querySelector("#news-add");
var eventsAdd = document.querySelector("#events-add");
var newsAddBtn = document.querySelector("#news-ab");
var eventsAddBtn = document.querySelector("#events-ab");
var newsImg = document.querySelector("#news-img");
var eventsImg = document.querySelector("#events-img");
var backBtn = document.querySelector("#b-btn");
var imgUpd = document.querySelector("#img-upd");
var imgShow = document.querySelector("#img-show");

eventsAdd.style.display = "none";

newsAddBtn.addEventListener("click", () => {
  newsImg.src = "./assets/option-icon-active.svg";
  eventsImg.src = "./assets/option-icon-inactive.svg";
  newsAdd.style.display = "block";
  eventsAdd.style.display = "none";
});

eventsAddBtn.addEventListener("click", () => {
  eventsImg.src = "./assets/option-icon-active.svg";
  newsImg.src = "./assets/option-icon-inactive.svg";
  eventsAdd.style.display = "block";
  newsAdd.style.display = "none";
});

imgUpd.addEventListener("change", (e) => {
  imgShow.src = URL.createObjectURL(e.target.files[0]);
});
imgShow.addEventListener("load", () => {
  URL.revokeObjectURL(imgShow.src);
});

document.forms["news-add"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/news/newsUpload`, {
    method: "POST",
    headers: {
      auth_token: localStorage.getItem("adminToken"),
    },
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("News Added Successfully!!");
        window.location.reload();
        // fetchNewsData();
        // fetchEventsData();
        // historyItems.innerHTML = html;
      } else {
        alert("Something went wrong while adding News!!");
      }
    })
    .catch((err) => {
      alert("Error: " + err);
    });
});

document.forms["events-add"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/events/eventsUpload`, {
    method: "POST",
    headers: {
      auth_token: localStorage.getItem("adminToken"),
    },
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("Events Added Successfully!!");
        window.location.reload();
        // fetchNewsData();
        // fetchEventsData();
        // historyItems.innerHTML = html;
      } else {
        alert("Something went wrong while adding Events!!");
      }
    })
    .catch((err) => {
      alert("Error: " + err);
    });
});

document.forms["image-add"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/admin/carouselUpload`, {
    method: "POST",
    headers: {
      auth_token: `${localStorage.getItem("adminToken")}`,
    },
    body: new FormData(e.target),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("Images Uploaded Successfully");
        window.location.reload();
      } else alert("Something Went Wrong!!");
    })
    .catch((err) => {
      alert(err);
    });
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const displayNews = (data) => {
  var html = ``;
  for (var i = data.length - 1; i >= 0; i--) {
    html += `<div class="h-item">
        <div class="time">
            <h3>${data[i].date}</h3>
            <p>${months[data[i].month]}</p>
        </div>
        <div class="h-text">
            <a href="${data[i].news.link}" target="_blank">${
      data[i].news.desc
    }</a>
        </div>
        <div class="update-btn">
            <button class="add-button" id="update-data" value="${
              data[i]._id
            }">Update</button>
        </div>
        <div class="delete-btn">
            <button class="add-button" onclick="deleteNews(${
              data[i]._id
            });">Delete</button>
        </div>
    </div>`;
  }
  // console.log(html);
  newsHistory.innerHTML = html;
};

function deleteNews(id) {
  console.log(id);
  fetch(`/api/news/deleteNews`, {
    method: "POST",
    body: `${id}`,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) alert("News Deleted Successfully");
      else alert("Something Went Wrong!!");
    })
    .catch((err) => {
      alert(err);
    });
}

const displayEvents = (data) => {
  // console.log(data)
  var html = ``;
  for (var i = data.length - 1; i >= 0; i--) {
    html += `<div class="h-item">
        <div class="time">
            <h3>${data[i].date}</h3>
            <p>${months[data[i].month]}</p>
        </div>
        <div class="h-text">
            <a href="${data[i].events.link}" target="_blank">${
      data[i].events.desc
    }</a>
        </div>
        <div class="update-btn">
            <button class="add-button" id="update-data" value="${
              data[i]._id
            }">Update</button>
        </div>
        <div class="delete-btn">
            <button class="add-button" onclick="deleteEvents(${
              data[i]._id
            })">Delete</button>
        </div>
    </div>`;
  }
  // console.log(html);
  eventsHistory.innerHTML = html;
};

function deleteEvents(id) {
  console.log(id);
  fetch(`/api/events/deleteEvents`, {
    method: "POST",
    body: `${id}`,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) alert("Event Deleted Successfully");
      else alert("Something Went Wrong!!");
    })
    .catch((err) => {
      alert(err);
    });
}

const displayData = (data) => {
  document.title = `Welcome !! ${data.name} | ${data.post}`;
};

const fetchAdminData = () => {
  fetch(`/api/admin/adminShow`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      auth_token: `${localStorage.getItem("adminToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      if (data.status == 0) {
        displayData(data.data);
      } else {
        localStorage.removeItem("adminToken");
        window.location.href = "./admin-login.html";
        alert("Status not 0");
      }
    })
    .catch((err) => {
      // localStorage.removeItem("adminToken");
      // window.location.href = "./admin-login.html";
      alert(err);
    });
};

const fetchNewsData = () => {
  fetch(`/api/news/newsFetch`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      auth_token: localStorage.getItem("adminToken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        displayNews(data.data);
      } else {
        // localStorage.removeItem("adminToken");
        // window.location.href = "./admin-login.html";
      }
    })
    .catch((err) => {
      // localStorage.removeItem("adminToken");
      // window.location.href = "./admin-login.html";
    });
};

const fetchEventsData = () => {
  fetch(`/api/events/eventsFetch`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      auth_token: localStorage.getItem("authToken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        displayEvents(data.data);
      } else {
        // localStorage.removeItem("adminToken");
        // window.location.href = "./admin-login.html";
      }
    })
    .catch((err) => {
      // localStorage.removeItem("adminToken");
      // window.location.href = "./admin-login.html";
    });
};

if (localStorage.getItem("adminToken")) {
  fetchAdminData();
  fetchNewsData();
  fetchEventsData();
  // displayDetails();
} else {
  window.location.href = "/admin";
}

backBtn.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin";
});

// console.log(html);
