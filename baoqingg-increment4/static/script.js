// Basic JavaScript Statement
var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = 'Hello';
var B = ' world!';
var C = A + B;
console.log(C);

// Basic JavaScript Function
function SumPrint(x1, x2) {
    var x3 = x1 + x2;
    console.log(x3);
 }
 SumPrint(x,y);
 SumPrint(A,B);

 // Conditional Statement
 if (C.length > z) {
    console.log(C);
 } else if (z > C.length) {
    console.log(z);
 } else {
    console.log("good job!");
 }

function greetingFunc() {
    var d = new Date();  // Create a new Date object to get the current time
    var h = d.getHours();  // Get the current hour (0-23)
    var E = document.getElementById("greeting");  // Select the HTML element with ID "greeting"

    // Check the time and update the greeting accordingly
    if (h >= 5 && h < 12) {  
        E.innerHTML = "Good morning, and welcome to MonoMuse.";  // Morning greeting (5 AM - 11:59 AM)
    } else if (h >= 12 && h < 18) {  
        E.innerHTML = "Good afternoon, and welcome to MonoMuse.";  // Afternoon greeting (12 PM - 5:59 PM)
    } else if (h >= 18 && h < 20) {  
        E.innerHTML = "Good evening, and welcome to MonoMuse.";  // Evening greeting (6 PM - 7:59 PM)
    } else {  
        E.innerHTML = "Good night, and welcome to MonoMuse.";  // Night greeting (8 PM - 4:59 AM)
    } 
}

// Get the current page URL
var currentpage = window.location.href;
console.log(currentpage);  // Log the full URL to the console for debugging

// Check if the current page is "index.html" before running the greeting function
if (currentpage.includes("index.html")) {  
   greetingFunc();  // Call the function to update the greeting
}

// Get the Year for the Footer
function addYear() {
    var d = new Date(); // Creates a new Date object
    var y = d.getFullYear(); // Extracts the current year (e.g., 2026)
    var E = document.getElementById("copyYear"); // Finds the element with ID "copyYear"
    E.innerHTML="&copy; " + y + " MonoMuse. All rights reserved.";  // Includes the year to the existing content
 } 

function ActiveNav() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');

    // Iterate over each link
    navLinks.forEach(link => {
        // Check if the link's href matches the current window location
        if (window.location.href === link.href) {
            // Add the 'active' class to highlight the current page
            link.classList.add("active");
        }
    });
}

// Execute the function to set the active navigation link on page load
ActiveNav();


  // When the "Read Less" button is clicked
 $("#readLess").click(function(){ 
    $("#longIntro").hide(); // Hide the long introduction text
    $("#readLess").hide();  // Hide the "Read Less" button itself
    $("#readMore").show();  // Show the "Read More" button  

  });
  
// When the "Read More" button is clicked
  $("#readMore").click(function(){
    $("#longIntro").show();  // Show the long introduction text
    $("#readLess").show();   // Show the "Read Less" button
    $("#readMore").hide();   // Hide the "Read More" button  
  });

// Show the hidden ticket purchase form
function showForm(date) {
  // Make the form visible
  document.getElementById("ticketForm").style.display = "block";

  // Put the selected date into the form
  document.getElementById("visitDate").value = date;
}

// Simulate sending the user to checkout
function submitPurchase() {
  alert("Your order is received. Redirecting to payment system.");
}