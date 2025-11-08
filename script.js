// script.js Divya Divya


// function for do not track
function isDoNotTrackEnabled() {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return dnt === "1" || dnt === "yes";
}

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
    if (isDoNotTrackEnabled()) return; // Respect DNT
	if (sessionStorage.getItem("topBannerClosed") === "true") return;

	var banner = document.getElementById("top-banner");
	banner.classList.remove("hide");

	setTimeout(function () {
		banner.classList.add("show");
	}, 50);
    
}


 /**
 * Displays the footer banner by removing the 'hide' class from it.
 */
function showFooterBanner() {
    if (isDoNotTrackEnabled()) return; // Respect DNT
    if (getCookie("footerBannerClosed"))return;
	document.getElementById("footer-banner").classList.remove("hide");
}

/**
 * Displays the modal by removing the 'hide' class from it.
 */
function showModal() {
    if (isDoNotTrackEnabled()) return; // Respect DNT
	if (localStorage.getItem("modalClosed") === "true") return;

	document.getElementById("modal").classList.remove("hide");
}
	
/**
 * Hides the modal by adding the 'hide' class to it.
 */
function closeModal() {
	document.getElementById("modal").classList.add("hide");
    if (isDoNotTrackEnabled()) return; // Respect DNT
    localStorage.setItem("modalClosed", "true"); // Remember that the modal was closed
}

/**
 * Hides the top banner by adding the 'hide' class to it.
 */
function closeTopBanner() {
	document.getElementById("top-banner").classList.add("hide");
    if (isDoNotTrackEnabled()) return; // Respect DNT
    sessionStorage.setItem("topBannerClosed", "true"); // Remember that the top banner was closed
}

/**
 * Hides the footer banner by adding the 'hide' class to it.
 */
function closeFooterBanner() {
	document.getElementById("footer-banner").classList.add("hide");
    if (isDoNotTrackEnabled()) return; // Respect DNT
    setCookie("footerBannerClosed", "true", 7); // Remember that the footer banner was closed for 7 days
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

/**
 * Clears all data (localStorage, sessionStorage, and cookies)
 * and reloads the page.
 */
function clearAllData() {
    if (isDoNotTrackEnabled()) {
        alert("Do Not Track is enabled — data clearing is not tracked!");
    }

    // Clear storages
    localStorage.clear();
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    alert("All data cleared! Reloading page...");
    location.reload();
}

// Attach event listener to the button
document.getElementById("clear-data-btn").addEventListener("click", clearAllData);


// console log if do not track is enabled
if(isDoNotTrackEnabled()){
    console.log("Do Not Track is enabled - no tracking or storage actions will be performed.");
}