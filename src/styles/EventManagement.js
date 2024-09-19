document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('event-name').value;
    const description = document.getElementById('event-description').value;
    const location = document.getElementById('location').value;
    const urgency = document.getElementById('urgency').value;
    const skills = Array.from(document.getElementById('skills').selectedOptions).map(option => option.value);
    const eventDate = document.getElementById('event-date').value;

    if (name && description && location && urgency && skills.length && eventDate) {
        alert('Event Published Successfully!');
    } else {
        alert('Please fill out all required fields.');
    }
});
