// staff

// read bio
document.querySelectorAll('.read-bio-container').forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		var staffContainer = e.target.parentNode.parentNode.parentNode;
		var toggleClassName = 'read-bio-active';

		if (!staffContainer.classList.contains(toggleClassName)) {
			staffContainer.classList.add(toggleClassName);
		} else {
			staffContainer.classList.remove(toggleClassName);
		}
	});
});

document.querySelectorAll('.contact-container').forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		var staffContainer = e.target.parentNode.parentNode;
		var toggleClassName = 'contact-active';

		if (!staffContainer.classList.contains(toggleClassName)) {
			staffContainer.classList.add(toggleClassName);
		} else {
			staffContainer.classList.remove(toggleClassName);
		}
	});
});
