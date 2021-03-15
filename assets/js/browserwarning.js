
if((/*@cc_on!@*/false || !!document.documentMode) && document.cookie.indexOf("dismissedBrowserWarning=1") < 0) {
  console.log("IE not supported");
  document.getElementById("browserwarning").classList.remove("d-none");
}

function dismissBrowserWarning() {
  document.cookie = "dismissedBrowserWarning=1; path=/; SameSite=Strict; max-age=" + 360*24*60*60;
  document.getElementById("browserwarning").classList.add("d-none");
}
