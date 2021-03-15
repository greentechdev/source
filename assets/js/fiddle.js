function fiddle(elem, printResults, displayChart) {
  var jscode = elem.previousElementSibling.getElementsByClassName("language-js")[0].textContent;
  console.log(jscode);

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "https://jsfiddle.net/api/post/library/pure/";
  form.target = "check";

  var js = document.createElement("textarea");
  js.value=jscode;
  js.name="js";
  form.appendChild(js);
  
  var html = document.createElement("textarea");
  html.name = "html";
  if (printResults === "true") {
    html.value += "<pre id=\"results\"></pre>";
  }
  if (displayChart === "true") {
    html.value += "<canvas id=\"myChart\" width=\"740\" height=\"200\"></canvas>";
    var libs = document.createElement("input");  
    libs.value="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js";
    libs.name="resources";
    form.appendChild(libs);
  }
  form.appendChild(html);
  document.body.appendChild(form);

  form.submit();
  form.remove();
}