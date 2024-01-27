// Toggle Style Switcher

const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

// Hide Style Switcher on scrolling

window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        if(document.querySelector(".style-switcher").classList.remove("open"));
    }
})

// Theme colours

const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color)
{
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }
        else
        {
            style.setAttribute("disabled","true");
        }
    })
}

document.addEventListener("DOMContentLoaded", function() {
    const switcherIcon = document.querySelector('.style-switcher-toggler');
    const tooltip = document.createElement('div');
    tooltip.className = 'style-switcher-tooltip';
    tooltip.innerText = 'Theme';
    switcherIcon.appendChild(tooltip);

    switcherIcon.addEventListener('mouseover', function() {
        tooltip.style.display = 'block';
    });

    switcherIcon.addEventListener('mouseout', function() {
        tooltip.style.display = 'none';
    });
});
