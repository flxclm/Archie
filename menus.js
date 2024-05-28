/////////////////////////////////// Menús desplegables /////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    //Menú de Categorías
    var dropdownBtn = document.querySelector('.dropdown-btn');
    var dropdownContent = document.querySelector('.sidebar .dropdown-content');
    
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
        });
    }

    //Menú de Usuario
    var userImage = document.querySelector('.user-image');
    var userDropdownContent = document.querySelector('.user-dropdown .dropdown-content');

    userImage.addEventListener('click', function() {
        userDropdownContent.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!userImage.contains(event.target) && !userDropdownContent.contains(event.target)) {
            userDropdownContent.classList.remove('show');
        }

        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});
