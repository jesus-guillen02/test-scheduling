document.addEventListener('DOMContentLoaded', function() {
    // Assuming each scholar's name is a link with a data attribute 'data-scholar-id'
    const scholarLinks = document.querySelectorAll('a[data-scholar-id]');

    scholarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const scholarId = this.getAttribute('data-scholar-id');
            fetchScholarData(scholarId);
        });
    });
});

function fetchScholarData(scholarId) {
    fetch(`https://localhost:3000/scholar/${scholarId}`)
        .then(response => response.json())
        .then(data => {
            displayScholarData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayScholarData(data) {
    // Assuming you have a div with an ID 'scholar-info' to display the information
    const infoDiv = document.getElementById('scholar-info');
    infoDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Hometown: ${data.hometown}</p>
        <p>Class Year: ${data.classYear}</p>
        <p>Biography: ${data.biography}</p>
        // ...and so on for other fields
    `;
}
