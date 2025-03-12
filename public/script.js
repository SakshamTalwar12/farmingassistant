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

    // Ensure modal remains accessible
    const modal = document.getElementById("modal");
    if (modal) {
        document.body.appendChild(modal);
    }
}

// Show home tab by default when page loads
window.onload = function () {
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


// Handle Form Submission


const imageUpload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const placeholder = document.querySelector(".upload-placeholder");

imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
            placeholder.style.display = "none"; // Hide text when image is uploaded
        };
        reader.readAsDataURL(file);
    }
});

function submitImage() {
    if (!imageUpload.files.length) {
        alert("Please upload an image first.");
        return;
    }
    alert("Image submitted successfully! (Backend processing needed)");
}

// Practices Modal
document.getElementById("openPracticesModalBtn").addEventListener("click", function () {
    document.getElementById("practicesModal").style.display = "block";
});
document.getElementById("closePracticesModal").addEventListener("click", function () {
    document.getElementById("practicesModal").style.display = "none";
});

// Schemes Modal
document.getElementById("openSchemesModalBtn").addEventListener("click", function () {
    document.getElementById("schemesModal").style.display = "block";
});
document.getElementById("closeSchemesModal").addEventListener("click", function () {
    document.getElementById("schemesModal").style.display = "none";
});

// Close modals when clicking outside
window.addEventListener("click", function (event) {
    if (event.target.id === "practicesModal") {
        document.getElementById("practicesModal").style.display = "none";
    } else if (event.target.id === "schemesModal") {
        document.getElementById("schemesModal").style.display = "none";
    }
});

// Form Submission Handling
document.getElementById("submitPracticesDetails").addEventListener("click", function () {
    const soilType = document.getElementById("soilType").value;
    const irrigation = document.getElementById("irrigation").value;
    const crops = document.getElementById("crops").value;
    const pestIssues = document.getElementById("pestIssues").value;
    const fertilizers = document.getElementById("fertilizers").value;
    const weatherIssues = document.getElementById("weatherIssues").value;

    const farmerData = {
        soilType,
        irrigation,
        crops,
        pestIssues,
        fertilizers,
        weatherIssues,
    };

    console.log("Practices Data:", farmerData);

    document.getElementById("responsePractices").innerText =
        "Best practices details submitted successfully!";
});

document.getElementById("submitSchemesDetails").addEventListener("click", function () {
    const state = document.getElementById("state").value;
    const landArea = document.getElementById("landArea").value;
    const crops = document.getElementById("cropsSchemes").value;
    const income = document.getElementById("income").value;
    const kcc = document.getElementById("kcc").value;
    const pmKisan = document.getElementById("pmKisan").value;
    const otherDetails = document.getElementById("otherDetails").value;

    if (!state || !landArea || !crops || !income) {
        alert("Please fill all required details.");
        return;
    }

    console.log("Schemes Data:", {
        State: state,
        "Land Area": landArea,
        Crops: crops,
        "Annual Income": income,
        "Kisan Credit Card": kcc,
        "PM-KISAN Registered": pmKisan,
        "Other Details": otherDetails,
    });

    document.getElementById("responseSchemes").innerText =
        "Government schemes details submitted successfully!";
});




