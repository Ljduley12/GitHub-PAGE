// Show the default content on page load (Home)
document.getElementById("home").style.display = "block";

// Function to handle navigation clicks
function showContent(contentId) {
  const contents = document.getElementsByClassName("content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
  document.getElementById(contentId).style.display = "block";
}

// Handle navigation clicks
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const contentId = link.getAttribute("href").substring(1);
    showContent(contentId);
  });
});

// Function to toggle fullscreen for the GitHub iframe
function toggleFullscreen() {
  const iframe = document.getElementById("github-iframe");
  if (!document.fullscreenElement) {
    iframe.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Handle fullscreen button click
document.getElementById("fullscreen-btn").addEventListener("click", () => {
  toggleFullscreen();
});

// Function to embed the provided URL in about:blank
function embedUrlInAboutBlank(url) {
  // Create a new iframe element
  const proxyIframe = document.createElement("iframe");
  proxyIframe.src = url;
  proxyIframe.width = "100%";
  proxyIframe.height = "100vh";
  
  // Clear the existing content in about:blank and append the new iframe
  document.body.innerHTML = "";
  document.body.appendChild(proxyIframe);
}

// Prompt for URL on page load
window.addEventListener("DOMContentLoaded", () => {
  const url = prompt("Enter the URL:");
  if (url && url.trim() !== "") {
    const allowProxy = confirm("Allow about:blank?");
    if (allowProxy) {
      // Embed the URL in about:blank
      embedUrlInAboutBlank(url);
    } else {
      // Redirect to the provided URL
      window.location.href = url;
    }
  } else {
    // Show the default content if no URL is provided
    showContent("home");
  }
});
