// Your Existing Tab Switching Code
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the selected tab content and mark the button as active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Show home tab by default when page loads
window.onload = function() {
    document.getElementById("home").style.display = "block";
};

// Drag and Drop Image Upload for Multiple Drop Areas
const dropAreas = document.querySelectorAll(".drop-area"); // Select all drop areas

// Loop through each drop area to add event listeners
dropAreas.forEach((dropArea) => {
    const imageInput = dropArea.querySelector(".imageInput"); // Image input specific to this drop area
    const preview = dropArea.querySelector(".preview"); // Preview specific to this drop area
    const browse = dropArea.querySelector(".browse"); // Browse span specific to this drop area

    // Handle File Selection from input
    if (imageInput) {
        imageInput.addEventListener("change", (event) => handleFiles(event, preview));
    }

    // Handle Click on Browse Span
    if (browse) {
        browse.addEventListener("click", () => imageInput.click());
    }

    // Handle Drag Events
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = "#e0e0e0";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.style.backgroundColor = "#f9f9f9";
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = "#f9f9f9";
        handleFiles(e, preview);
    });
});

// Handle Files and Display Preview
function handleFiles(event, preview) {
    let file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
}