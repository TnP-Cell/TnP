document.forms["recruit"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/api/admin/jafRecruit", {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) alert("Form Submitted Successfully");
      else alert("Check your Internet Connection!!");
    })
    .catch((err) => {
      alert("Something Went Wrong" + err);
    });
});

function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

// window.location.href="/"
