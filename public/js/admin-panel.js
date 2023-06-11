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
var detailsShow = document.querySelector("#show-details");
var recruiterDetails = document.querySelector(".recruiters-details");

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
        <div class="delete-btn">
            <button class="add-button" onclick="deleteNews('${
              data[i]._id
            }');">Delete</button>
        </div>
    </div>`;
  }
  // console.log(html);
  newsHistory.innerHTML = html;
};

function deleteNews(id) {
  console.log(id);
  fetch(`/api/news/deleteNews`, {
    method: "DELETE",
    body: new URLSearchParams({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("News Deleted Successfully");
        window.location.reload();
      } else alert("Something Went Wrong!!");
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
        <div class="delete-btn">
            <button class="add-button" onclick="deleteEvent('${data[
              i
            ]._id.toString()}');">Delete</button>
        </div>
    </div>`;
  }
  // console.log(html);
  eventsHistory.innerHTML = html;
};

function deleteEvent(id) {
  // console.log(id);
  fetch(`/api/events/deleteEvents`, {
    method: "DELETE",
    body: new URLSearchParams({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("Event Deleted Successfully");
        window.location.reload();
      } else alert("Something Went Wrong!!");
    })
    .catch((err) => {
      alert(err);
    });
}

const showArray = (data) => {
  let html = ``;
  data.map((e) => {
    html += `${e},`;
  });
  return html.slice(0, -1);
};

const displayRecruiterData = (data) => {
  // console.log(data[0]._id);
  let html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `<div class="row">
                <div class="col">
                  <span>${i + 1}</span>
                </div>
                <div class="col">
                  <span>${data[i].orgName}</span>
                </div>
                <div class="col">
                  <a href="${data[i].website}">${data[i].website}</a>
                </div>
                <div class="col">
                  <span>${data[i].jobProfile.jobOffer}</span>
                </div>
                <div class="col">
                  <span>${showArray(data[i].jobProfile.eligibleBatches)}</span>
                </div>
                <div class="col">
                  <span>${data[i].bTech.CTC}</span>
                </div>
                <div class="col">
                  <span>${data[i].jobProfile.selectionProcess}</span>
                </div>
                <div class="col">
                  <button onclick="showDetails('${data[
                    i
                  ]._id.toString()}')">View</button>
                </div>
              </div>`;
  }
  detailsShow.innerHTML = html;
};

const displayParticularRecruiter = (data) => {
  let html = `
  <div class="fields-head">
  <h3 style="color:#e7a849">Date of Application: ${data.dof}</h3>
</div>
<div class="fields-head">
  <h3>1. General Information</h3>
</div>
<div class="fields">
  <h4>Name of Organization:</h4>
  <span>${data.orgName}</span>
</div>
<div class="fields">
  <h4>Website:</h4>
  <a href="${data.webiste}">${data.website}</a>
</div>
<div class="fields">
  <h4>Location:</h4>
  <span>${data.postalAddress}</span>
</div>
<div class="fields">
  <h4>Category:</h4>
  <span>${data.category}</span>
</div>
<div class="fields">
  <h4>Industry Sector:</h4>
  <span>${data.industrySector}</span>
</div>
<div class="fields">
  <h4>About Comapny:</h4>
  <span>${data.aboutOrg}</span>
</div>
<div class="fields-head">
  <h3>2.a. Contact Details: Head HR</h3>
</div>
<div class="fields">
  <h4>Name of Head HR:</h4>
  <span>${data.contact.headHR.name}</span>
</div>
<div class="fields">
  <h4>Phone:</h4>
  <span>${data.contact.headHR.mobile}</span>
</div>
<div class="fields">
  <h4>Email:</h4>
  <a href="mailto:${data.contact.headHR.email}"
    >${data.contact.headHR.email}</a
  >
</div>
<div class="fields">
  <h4>Landline:</h4>
  <span>${data.contact.headHR.landline}</span>
</div>
<div class="fields-head">
  <h3>2.b. Contact Details: First Contact Person</h3>
</div>
<div class="fields">
  <h4>Name of First Contact Person:</h4>
  <span>${data.contact.firstContactPerson.name}</span>
</div>
<div class="fields">
  <h4>Phone:</h4>
  <span>${data.contact.firstContactPerson.mobile}</span>
</div>
<div class="fields">
  <h4>Email:</h4>
  <a href="mailto:${data.contact.firstContactPerson.email}"
    >${data.contact.firstContactPerson.email}</a
  >
</div>
<div class="fields">
  <h4>Landline:</h4>
  <span>${data.contact.firstContactPerson.landline}</span>
</div>
<div class="fields-head">
  <h3>3. Job Profile Details</h3>
</div>
<div class="fields">
  <h4>Job Offer Type:</h4>
  <span>${data.jobProfile.jobOffer}</span>
</div>
<div class="fields">
  <h4>Selection Type:</h4>
  <span>${data.jobProfile.selectionProcess}</span>
</div>
<div class="fields">
  <h4>Eligible Batches:</h4>
  <span>${showArray(data.jobProfile.eligibleBatches)}</span>
</div>
<div class="fields">
  <h4>Eligible Branches:</h4>
  <span>${showArray(data.branches.bTech)}</span>
</div>
<div class="fields">
  <h4>Job Designation:</h4>
  <span>${data.bTech.jobDesignation}</span>
</div>
<div class="fields">
  <h4>Place of Posting:</h4>
  <span>${data.bTech.jobLocation}</span>
</div>
<div class="fields">
  <h4>Job Description/Summary:</h4>
  <span>${data.bTech.jobDescription}</span>
</div>
<div class="fields-head">
  <h3>4. Salary Details:</h3>
</div>
<div class="fields">
  <h4>Remuneration for Internship:</h4>
  <span>${data.salary.renumeration}</span>
</div>
<div class="fields">
  <h4>Cost to Company (CTC):</h4>
  <span>${data.bTech.CTC}</span>
</div>
<div class="fields">
  <h4>Gross:</h4>
  <span>${data.bTech.gross}</span>
</div>
<div class="fields">
  <h4>Take-Home:</h4>
  <span>${data.bTech.takeHome}</span>
</div>
<div class="fields">
  <h4>Bonus/Perks/Incentives:</h4>
  <span>${data.bTech.bonus}</span>
</div>
<div class="fields">
  <h4>Relocation:</h4>
  <span>${data.bTech.relocationBonus}</span>
</div>
<div class="fields">
  <h4>Bond or Contract:</h4>
  <span>${data.bTech.contract}</span>
</div>
<div class="fields-head">
  <h3>5. Process:</h3>
</div>
<div class="fields">
  <h4>Mode of Selection:</h4>
  <span>${showArray(data.programs.bTech)}</span>
</div>
<div class="fields">
  <h4>Number of Rounds:</h4>
  <span>${data.selectionProcess.rounds}</span>
</div>
<div class="fields">
  <h4>Eligibility Criteria:</h4>
  <span>${data.selectionProcess.eligibility}</span>
</div>
<div class="fields">
  <h4>Prferred Period of Visit for Recruitment:</h4>
  <span>${data.selectionProcess.pov}</span>
</div>
<div class="fields-head">
  <h3>6. Preference & Requirements</h3>
</div>
<div class="fields">
  <h4>Preferred Location:</h4>
  <span>${data.selectionProcess.preferredLocation}</span>
</div>
<div class="fields">
  <h4>Number of Offers:</h4>
  <span>${data.selectionProcess.offers}</span>
</div>
<div class="fields">
  <h4>Number of member visiting IIIT Bhagalpur Campus:</h4>
  <span>${data.logisticalDetails.members}</span>
</div>
<div class="fields">
  <h4>No. of Rooms and Days required for the selection Process:</h4>
  <span>${data.logisticalDetails.rooms}</span>
</div>
<div class="fields">
  <h4>Other Requirements:</h4>
  <span>${data.otherRequirements}</span>
</div>
  `;
  recruiterDetails.innerHTML = html;
};

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
      if (data.status == 0) {
        displayData(data.data);
      } else {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
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
      auth_token: localStorage.getItem("adminToken"),
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

const fetchRecruitersData = () => {
  fetch(`/api/admin/jafView`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        displayRecruiterData(data.data);
      } else {
        alert(data.error);
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

const showDetails = (id) => {
  let overlay = document.querySelector(".overlay");
  let studentPage = document.querySelector(".student-page");
  overlay.style.display = "flex";
  overlay.style["overflow-y"] = "auto";
  studentPage.style["overflow-y"] = "hidden";
  studentPage.style["position"] = "fixed";
  fetchParticularRecruiter(id);
};

const closeDetails = () => {
  let overlay = document.querySelector(".overlay");
  let studentPage = document.querySelector(".student-page");
  overlay.style.display = "none";
  studentPage.style["overflow-y"] = "auto";
  studentPage.style["position"] = "relative";
};

const fetchParticularRecruiter = (id) => {
  fetch(`/api/admin/jafDetails?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        displayParticularRecruiter(data.data);
      } else {
        alert(data.error);
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

if (localStorage.getItem("adminToken")) {
  fetchAdminData();
  fetchNewsData();
  fetchEventsData();
  fetchRecruitersData();
  // displayDetails();
} else {
  window.location.href = "/admin";
}

backBtn.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin";
});

// console.log(html);
