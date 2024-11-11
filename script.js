// Toggle light/dark mode
function toggleTheme() {
    const body = document.body;

    // Toggle the 'light-mode' class on the body
    body.classList.toggle('light-mode');

    // Change the button text based on current theme
    const button = document.getElementById('theme-toggle');
    if (body.classList.contains('light-mode')) {
        button.textContent = 'Switch to Dark Mode';
    } else {
        button.textContent = 'Switch to Light Mode';
    }
}
