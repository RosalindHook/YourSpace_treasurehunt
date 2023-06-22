      // variable declared to store the map object
      var tree_map;

      // variable to store score
      var score = 0;
  
      // tolerance value in metres
      var tolerance = 25;
  
      // all_markers array initialised to store the marker objects
      var all_markers = [];
  
      // data variable contains the marker data in a string format
      var data = `51.36090873171403 -0.2128131693115165 tree.png 0
      51.36158534804417 -0.21196022684478066 flower.png 1
      51.3647254538826 -0.21169339639094842 leaf.png 2
      51.36491615123361 -0.21205793478312085 leaf.png 3
      `;
  
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
        });
  
        // Check for geolocation support and watch the user's position
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(set_my_position);
        } else {
          alert("Geolocation doesn't work in your browser");
        }
  
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
        alert("Found the " + what_is_it);
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
        popupImage.src = "tree.png";
        popupInfo.textContent = "This is a tree";
      } else if (objectIndex === 1) {
        popupImage.src = "flower.png";
        popupInfo.textContent = "This is a flower";
      } else if (objectIndex === 2) {
        popupImage.src = "leaf.png";
        popupInfo.textContent = "This is a leaf";
      } else if (objectIndex === 3) {
        popupImage.src = "leaf.png";
        popupInfo.textContent = "This is another leaf";
      }

      // Display the pop-up box
      popupBox.style.display = "block";
    }

    // Function to close the pop-up box
    function closePopup() {
      var popupBox = document.getElementById("popupBox");
      popupBox.style.display = "none";
    }

      
