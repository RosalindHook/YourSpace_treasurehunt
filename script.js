// variable declared to store the map object
 var tree_map;

 // variable to store score
 var score = 0;

 // tolerance value in metres
 var tolerance = 25;

 // all_markers array initialised to store the marker objects
 var all_markers = [];

 // data variable contains the marker data in a string format
 var data = `
 51.3618261801056 -0.21211579496764443 leaf.png 0
 51.36181278192988 -0.21197363788985513 tree2.png 1
 51.36183120442048 -0.21247252876662515 tree.png 2
 51.36196518594738 -0.2123786514511039 tree.png 3
 51.361467777555326 -0.21182611639403603 tree.png 4
 51.36151132194008 -0.21168395931624673 tree2.png 5
 51.3614342818466 -0.21164372618102334 leaf.png 6
 51.36130364834841 -0.2115820353736808 leaf.png 7
 51.36123498187304 -0.21152570898436807 tree2.png 8
 51.36110602260452 -0.21167859489821694 tree2.png 9
 51.36105745343523 -0.21194145138167642 leaf.png 10
 51.36093854249302 -0.2124537533035209 leaf.png 11
 51.36088494872801 -0.21282121593856118 tree.png 12
 51.36075598847395 -0.2133952086677482 tree.png 13
 51.360913420423486 -0.21373316700362466 tree.png 14
 51.36106582743361 -0.21380290443801186 tree2.png 15
 51.361317046673065 -0.21388605291747353 tree.png 16
 51.361420883556214 -0.2138967817535331 flower.png 17
 51.361477826263176 -0.21362587864302895 tree2.png 18
 51.36169722250163 -0.2134649461021354 flower.png 19
 51.364892141198986 -0.21211878530216444 flower.png 20
 `
 // Split data by new line
 var markers = data.split("\n");

 // Variable to store the user's marker
 var userMarker;

 // initMap() function is defined, which will be called to initialise the map and create markers.
 function initMap() {
// tree_map created using the google.maps.Map constructor, specifying the map element and its options
   tree_map = new google.maps.Map(document.getElementById('tree_map'), {
     zoom: 18,
     center: {
       lat: 51.361376,
       lng: -0.212899
     }
   })
// Loops through the array of markers
for (var i = 0; i < markers.length; i++) {
    var markerData = markers[i].trim().split(" ");
    
    var latitude = parseFloat(markerData[0]);
    var longitude = parseFloat(markerData[1]);
    var icon = markerData[2];
    var objectIndex = parseInt(markerData[3]); // Parse the object index
    
    var markerPosition = {
    lat: latitude,
    lng: longitude
    };
    
    var marker = new google.maps.Marker({
    position: markerPosition,
    map: tree_map,
    icon: icon,
    objectIndex: objectIndex // Store the object index as a property
    });
    
    all_markers.push(marker);
    }
};


// Function to check for geolocation support and watch the user's position
function geolocationSupport() {   

if (navigator.geolocation) {
var geolocationOptions = {
enableHighAccuracy: true,
maximumAge: 1000
};
navigator.geolocation.watchPosition(set_my_position, handle_geolocation_error, geolocationOptions);
} else {
alert("Geolocation doesn't work in your browser");
}
}

function handle_geolocation_error(error) {
switch (error.code) {
case error.PERMISSION_DENIED:
 console.log("User denied the request for Geolocation.");
 break;
case error.POSITION_UNAVAILABLE:
 console.log("Location information is unavailable.");
 break;
case error.TIMEOUT:
 console.log("The request to get user location timed out.");
 break;
case error.UNKNOWN_ERROR:
 console.log("An unknown error occurred.");
 break;
}
}


// Geolocation callback function
function set_my_position(position) {
var pos = {
lat: position.coords.latitude,
lng: position.coords.longitude
};

// Remove the previous position marker if it exists
removeUserMarker();

// Create a new marker for the current position
createUserMarker(pos);

// Calculate distance for each marker and handle if it's within tolerance
handleMarkerDetection(pos); // Call handleMarkerDetection with the user's position
}

function removeUserMarker() {
if (userMarker) {
userMarker.setMap(null);
}
}

function createUserMarker(position) {
userMarker = new google.maps.Marker({
position: position,
map: tree_map,
icon: 'https://maps.google.com/mapfiles/kml/shapes/man.png'
});
}

// Function to handle marker detection
function handleMarkerDetection(position) {
for (var i = 0; i < all_markers.length; i++) {
var marker = all_markers[i];
if (marker === userMarker) {
 continue;
}

 var distance = google.maps.geometry.spherical.computeDistanceBetween(position, marker.getPosition());

 if (distance < tolerance) {
   var what_is_it = marker.getIcon();
   what_is_it = what_is_it.replace(".png", "");
   alert("You found tree-sure... You score 1 point!");
   var objectIndex = marker.objectIndex; // Retrieve the object index from the marker
   showPopup(objectIndex);
   score++;
   document.getElementById("score").textContent = "Score: " + score;
   marker.setMap(null);
   all_markers.splice(i, 1);
   i--;
 }
}
}
// Function to show the pop-up box
function showPopup(objectIndex) {
 var popupBox = document.getElementById("popupBox");
 var popupImage = document.getElementById("popupImage");
 var popupInfo = document.getElementById("popupInfo");

 // Set the image source and information based on the object index
 if (objectIndex === 0) {
   popupImage.src = "maple.jpg";
   popupInfo.textContent = "This is a Japanese Maple tree - a small, deciduous tree which is grown for autumn tints and beautiful foliage. A classic small tree for a traditional Japanese garden.";
 } else if (objectIndex === 1) {
   popupImage.src = "monkey.jpg";
   popupInfo.textContent = "This is a Monkey Puzzle or Chilean Pine - an evergreen tree that can live for 1000 years! The Victorians gave it the first of these names, because they thought monkeys would be confused if they tried to climb its spiny spiralling branches.";
 } else if (objectIndex === 2) {
   popupImage.src = "citronella.jpg";
   popupInfo.textContent = "This seems to be a Citronella Engleriana - which originally came from Rio de Janeiro in Brazil. How did it end up in Seears Park?! Look for smooth mid green waxy leaves and the little green ‘fruits’ (don’t eat!).";
 } else if (objectIndex === 3) {
   popupImage.src = "field_maple.jpg";
   popupInfo.textContent = "This is a Field Maple - a broadleaf deciduous tree which is native to the UK and most of Europe. The sap can be used to make maple syrup - yum! The leaves are small, dark green and shiny, with five lobes and rounded teeth.";
 } else if (objectIndex === 4) {
   popupImage.src = "dogwood.jpg";
   popupInfo.textContent = "This is Common Dogwood - a small broadleaf shrub, typically found growing along woodland edges and in hedgerows of southern England. It has black berries which used to be used for primitive inks and lamp oil.";
 } else if (objectIndex === 5) {
   popupImage.src = "holly.jpg";
   popupInfo.textContent = "This is Holly - a type of bush with recognisable leaves. The leaves have sharp edges, and are often used to decorate a house on Christmas Day. Some types of holly are used to make tea. The leaves of the Holly don't fall off in the winter because they're very thick and have a waxy layer on them.";
 } else if (objectIndex === 6) {
   popupImage.src = "conker.jpg";
   popupInfo.textContent = "This looks like a young conker, which means this is a Horse Chestnut Tree. The conker sits inside a spiky green shell, before falling to the ground in autumn. Its signature reddish-brown conkers appear in autumn.";
 } else if (objectIndex === 7) {
   popupImage.src = "cherry.jpg";
   popupInfo.textContent = "Cherry plum - this is a street tree, an early spring flowerer and the ancestor of the domestic plum tree. Look out for purple and red leaves.";
 } else if (objectIndex === 8) {
   popupImage.src = "atlas_cedar.jpg";
   popupInfo.textContent = "This is one of three Atlas Cedar trees - can you find the other two? There are two of these spiky trees near each other in one corner of the park, and one in the opposite corner. Can you find all 3? Look for the silvery blue spiky leaves. This tree originally came from North Africa.";
 } else if (objectIndex === 9) {
   popupImage.src = "atlas_cedar2.jpg";
   popupInfo.textContent = "This is one of three Atlas Cedar trees - can you find the other two? There are two of these spiky trees near each other in one corner of the park, and one in the opposite corner. Can you find all 3? Look for the silvery blue spiky leaves. This tree originally came from North Africa.";
 } else if (objectIndex === 10) {
   popupImage.src = "ginkgo.jpg";
   popupInfo.textContent = "This is Ginkgo Biloba, otherwise known as the Maidenhair Tree, the tree that outlived the dinosaurs as it comes from prehistoric times. This tree has a long life - the oldest one is thought to be 3500+ years old! Look for the fan-shaped leaves. There are two of these on the same side of the park - one big and one small - this is the bigger one";
 } else if (objectIndex === 11) {
   popupImage.src = "ginkgo2.jpg";
   popupInfo.textContent = "This is Ginkgo Biloba otherwise known as the Maidenhair Tree, the tree that outlived the dinosaurs as it comes from prehistoric times. This tree has a long life - the oldest one is thought to be 3500+ years old! Look for the fan-shaped leaves. There are two of these on the same side of the park - one big and one small. This is the smaller one, which was planted in May 2023 by volunteers to celebrate King Charles’ coronation.";
 } else if (objectIndex === 12) {
   popupImage.src = "black_locust.jpg";
   popupInfo.textContent = "This is the Black Locust tree or False Acacia, is native to eastern North America and widely planted in Europe. Bees love it when it blossoms, and acacia honey comes from bees feeding on this tree. The leaves are in pairs directly opposite each other.";
 } else if (objectIndex === 13) {
   popupImage.src = "lime.jpg";
   popupInfo.textContent = "This is the Small Leaved Lime - a pollinator magnet! The small-leaved lime’s blossom produces a sweet scent and pleasantly minty honey, and its leaves support the caterpillars of moths such as the lime hawk, peppered and vapourer. Flowers are green-yellow, have five petals, and hang in clusters of 4–10.";
 } else if (objectIndex === 14) {
   popupImage.src = "redwood.jpg";
   popupInfo.textContent = "This is a Giant Redwood - these trees are really amazing, and can live for over 3,000 years. They can also grow really tall - the tallest living Giant Redwood in the world is over 80 metres and can be found in California. There are two in Seears Park - will they grow that big?";
 } else if (objectIndex === 15) {
   popupImage.src = "leyland.jpg";
   popupInfo.textContent = "Leyland cypress - this is a fast growing tree that reaches enormous heights quickly. Its leaves are scale-like, soft and overlapping, and their flowers are purple/blue buds. Some animals use these trees for shelter, especially in urban areas where cover can be sparse.";
 } else if (objectIndex === 16) {
   popupImage.src = "redwood1.jpg";
   popupInfo.textContent = "This is a Giant Redwood - these trees are really amazing, and can live for over 3,000 years. They can also grow really tall - the tallest living Giant Redwood in the world is over 80 metres and can be found in California. There are two in Seears Park - will they grow that big?";
 } else if (objectIndex === 17) {
   popupImage.src = "elder.jpg";
   popupInfo.textContent = "Elder - look for the white frothy elderflower, which can be used in cooking to make sweet drinks and cakes. The Elder tree is linked to Fairy and Goddess mythology, with people believing the best time to encounter fairies was under an elder tree on Midsummer’s Eve. It used to be considered lucky if it grew near your house.";
 } else if (objectIndex === 18) {
   popupImage.src = "atlas_cedar3.jpg";
   popupInfo.textContent = "This is one of three Atlas Cedar trees - can you find the other two? There are two of these spiky trees near each other in one corner of the park, and one in the opposite corner. Can you find all 3? Look for the silvery blue spiky leaves. This tree originally came from North Africa.";
 } else if (objectIndex === 19) {
   popupImage.src = "blackberry.jpg";
   popupInfo.textContent = "This is a blackberry bush - there aren’t any sweet blackberries yet (though a few green fruit are starting to appear), but look out for the white and pale pink flowers and spiky branches.";
 }
 else if (objectIndex === 20) {
   popupImage.src = "blackberry.jpg";
   popupInfo.textContent = "This is a test blah blah blah";
 }

 // Display the pop-up box
 popupBox.style.display = "block";
}

// Function to close the pop-up box
function closePopup() {
 var popupBox = document.getElementById("popupBox");
 popupBox.style.display = "none";
}    
