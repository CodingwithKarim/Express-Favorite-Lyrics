const update = document.querySelectorAll(".update-btn");
var trash = document.getElementsByClassName("fa-trash");

update.forEach((e) =>
  e.addEventListener("click", (event) => {
    console.log(event.currentTarget.parentNode.childNodes)
    const name = event.currentTarget.parentNode.childNodes[11].value;
    const quote = event.currentTarget.parentNode.childNodes[13].value;
    const _id = event.currentTarget.parentNode.childNodes[9].innerText

    fetch("/quotes", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        quote: quote,
        _id: _id
      }),
    }).then(function (response) {
      window.location.reload();
    });
  })
);

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const quote = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("quotes", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        quote: quote,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
