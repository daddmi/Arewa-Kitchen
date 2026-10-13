document.body.classList.add("jsOn");
 
// 1. Reveal items as they scroll into view
var revealItems = document.querySelectorAll(".showUp");
 
if ("IntersectionObserver" in window) {
    var watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("seen");
                watcher.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
 
    revealItems.forEach(function (item) {
        watcher.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("seen");
    });
}
 
// 2. Navigation shadow and back to top button
var topBar = document.querySelector(".topBar");
var topButton = document.getElementById("topButton");
 
window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
        topBar.classList.add("scrolled");
    } else {
        topBar.classList.remove("scrolled");
    }
 
    if (window.scrollY > 500) {
        topButton.classList.add("visible");
    } else {
        topButton.classList.remove("visible");
    }
});
 
topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
 
// 3. Menu filter buttons (Menu page only)
var filterButtons = document.querySelectorAll(".filterButton");
var menuGroups = document.querySelectorAll(".menuGroup");
 
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var choice = button.getAttribute("data-show");
 
        filterButtons.forEach(function (other) {
            other.classList.remove("active");
        });
        button.classList.add("active");
 
        menuGroups.forEach(function (group) {
            if (choice === "all" || group.getAttribute("data-type") === choice) {
                group.classList.remove("hidden");
            } else {
                group.classList.add("hidden");
            }
        });
    });
});
 
// 4. Order form sends a ready made message to WhatsApp (Contact page only)
var orderForm = document.getElementById("orderForm");
 
if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
        var name = document.getElementById("customerName").value.trim();
        var dish = document.getElementById("chosenDish").value;
        var amount = document.getElementById("howMany").value;
        var place = document.getElementById("deliveryPlace").value.trim();
        var note = document.getElementById("extraNote").value.trim();
 
        var message = "Hello Arewa Kitchen, my name is " + name + ". I would like to order " + amount + " of " + dish + ".";
 
        if (place) {
            message += " My location is " + place + ".";
        }
        if (note) {
            message += " Extra note: " + note;
        }
 
        var link = "https://wa.me/2349065660700?text=" + encodeURIComponent(message);
        window.open(link, "_blank");
    });
}
