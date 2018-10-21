// staff

// read bio
document.querySelectorAll('.read-bio-container').forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		console.log('clicked');
		var staffContainer = e.target.parentNode.parentNode.parentNode;
		var toggleClassName = 'read-bio-active';

		if (!staffContainer.classList.contains(toggleClassName)) {
			staffContainer.classList.add(toggleClassName);
		} else {
			staffContainer.classList.remove(toggleClassName);
		}
	});
});

var toggleClassName = 'contact-active';

// open contact info

document.querySelectorAll('.contact-container').forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		console.log('contact container clicked');
		var staffContainer = e.target.parentNode.parentNode;

		staffContainer.classList.add(toggleClassName);
	});
});

// close contact info

document.querySelectorAll('.close-contact-info').forEach(function(elem) {
	elem.addEventListener('click', function(e) {
		console.log('close');
		var staffContainer = e.target.closest('.staff');

		console.log(staffContainer);

		staffContainer.classList.remove(toggleClassName);
	});
});
