function spara() {
  let svårighetsgrad = document.getElementById("svårighetsgrad").value;
  let svårighetsgradvisare = document.getElementById("svårighetsgradvisare");
  switch (svårighetsgrad) {
    case "lätt":
      platform.svårighetsgrad = "lätt";
      break;
    case "medel":
      platform.svårighetsgrad = "medel";
      break;
    case "svår":
      platform.svårighetsgrad = "svår";
      break;
    case "extrem":
      platform.svårighetsgrad = "extrem";
      break;
    default:
      platform.svårighetsgrad = "medel";
  }
  svårighetsgradvisare.textContent =
    "Svårighetsgraden är inställd på: " + svårighetsgrad;

  platform.fart = platform.fartnivå();
  platform2.fart = platform.fartnivå();
  platform3.fart = platform.fartnivå();
  platform4.fart = platform.fartnivå();
}
