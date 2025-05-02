console.log("🎧 Widget script loaded!");

const testDiv = document.createElement("div");
testDiv.textContent = "Test Widget Loaded";
testDiv.style.position = "fixed";
testDiv.style.bottom = "10px";
testDiv.style.left = "10px";
testDiv.style.padding = "10px";
testDiv.style.background = "red";
testDiv.style.color = "white";
document.body.appendChild(testDiv);
