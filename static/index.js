	document.querySelector('#room-name-input').focus();
			document.querySelector('#room-name-input').onkeyup = function(e) {
				if (e.keyCode === 13) {  // enter, return
					document.querySelector('#room-name-submit').click();
				}
			};

// document.querySelector('#room_name').onclick = function(e) {
	
	
// };
document.querySelectorAll('.room').forEach(item => {
	item.addEventListener('click', event => {
		var roomName = item.innerHTML;
	console.log(roomName)
	document.querySelector('#room-name-input').value=roomName;
	  //handle click
	})
  })

document.querySelector('#room-name-submit').onclick = function(e) {
	var roomName = document.querySelector('#room-name-input').value;
	window.location.pathname = '/chat/' + roomName + '/';
};