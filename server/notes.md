

/*


	
// Write a function to retrieve a blob of json
// make an ajax request using the 'fetch function. 
http://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums(){
	fetch('http://rallycoding.herokuapp.com/api/music_albums')
		.then(res => res.json()); 
		.then(json => console.log(json));
}

// same ajax call asyncronously 
async function fetchAlbums(){
	const res = await   fetch('http://rallycoding.herokuapp.com/api/music_albums')
	const json = await	res.json(); 
	console.log(json);	
}

const fetchAlbums = async () => {
	const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json(); 
	console.log(json);	
}
fetchAlbums();



*/

#WEBPACK:
	Module loader
		-condenses large group of css/javascript/etc files, and spits out one big one 
		-Loaders:
			instruct webpack to look for other files as well 
