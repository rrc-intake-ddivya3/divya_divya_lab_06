// script.js Divya Divya

// function for cookies
function setCookie(name, value, days) {
    let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
	const value = "; " + document.cookie;
	const parts = value.split("; " + name + "=");
	if (parts.length === 2) return parts.pop().split(";").shift();
}








/**
 * Displays the top banner by removing the 'hide' class from it.
 * Uses a short delay to ensure the transition is triggered.
 */
function showTopBanner() {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
	if (dnt === "1" || dnt === "yes") return; // Respect DNT

	// Don't show if flag already exists in sessionStorage
	if (sessionStorage.getItem("topBannerClosed") === "true") return;

	var banner = document.getElementById("top-banner");
	banner.classList.remove("hide");

	// Short delay to trigger slide-down transition
	setTimeout(function () {
		banner.classList.add("show");
	}, 50);
}


 /**
 * Displays the footer banner by removing the 'hide' class from it.
 */
function showFooterBanner() {
	document.getElementById("footer-banner").classList.remove("hide");
}

/**
 * Displays the modal by removing the 'hide' class from it.
 */
function showModal() {
	const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    if (dnt === "1" || dnt === "yes") return; // Respect Do Not Track setting

    if(localStorage.getItem("modalClosed") === "true") return; // Check if modal was previously closed

    document.getElementById("modal").classList.remove("hide");
}
/**
 * Hides the modal by adding the 'hide' class to it.
 */
function closeModal() {
	document.getElementById("modal").classList.add("hide");
    localStorage.setItem("modalClosed", "true"); // Remember that the modal was closed
}

/**
 * Hides the top banner by adding the 'hide' class to it.
 */
function closeTopBanner() {
	document.getElementById("top-banner").classList.add("hide");
    sessionStorage.setItem("topBannerClosed", "true"); // Remember that the top banner was closed
}

/**
 * Hides the footer banner by adding the 'hide' class to it.
 */
function closeFooterBanner() {
	document.getElementById("footer-banner").classList.add("hide");
}

// Event listeners to close the modal, top banner, and footer banner when 'x' is clicked
document.querySelectorAll(".close").forEach(function (btn) {
	btn.addEventListener("click", function (e) {
		var parent = e.target.parentElement;
		if (parent.id === "modal" || parent.classList.contains("modal-content"))
			closeModal();
		else if (parent.id === "top-banner") closeTopBanner();
		else if (parent.id === "footer-banner") closeFooterBanner();
	});
});

// Show the footer banner after a delay of 1 second
setTimeout(showFooterBanner, 1000);

// Show the top banner after a delay of 2 seconds
setTimeout(showTopBanner, 2000);

// Show the modal after a delay of 4 seconds
setTimeout(showModal, 4000);