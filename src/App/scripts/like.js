  const like = document.getElementById("like");

  like.addEventListener("click", function () {
    if (like.src.includes("2.png")) {
      like.src = "../../img/1.png"; 
    } else {
      like.src = "../../img/2.png"; 
    }
  });