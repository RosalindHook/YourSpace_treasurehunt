# YourSpace_treasurehunt

## Introduction
1. A community project treasure hunt based on 'Where's Zombie game' (Raspberry Pi Foundation) - reference https://projects.raspberrypi.org/en/projects/wheres-zombie/. It sets up a simple treasure hunt game using Google Maps API. The map is initialised, and markers are placed on the map based on the provided coordinates and icons. The geolocation feature is used to track the user's position. When the user moves within a certain distance (tolerance) of a marker, an alert is shown indicating what the user has found, and the marker is removed from the map.

2. I used the Raspberry Pi step by step walk through to develop my own version of code that sets up a treasure hunt scenario where the user's location is tracked.
  
4. When the user is within 25 metres of a tree or flower marker (more to follow), an alert is triggered indicating that the object has been found. The user's own marker (person icon) is not considered for triggering alerts.

5. This code has been developed for Yourspace for their 'Midsummer fair' and is intended for use by local families, children and others to enjoy a fun, short (20-30 minutes) treasure hunt in the local park. It will include interesting features about the trees and wildlife in the park.

## Project information
1. The HTML markup defines a basic structure for the webpage, including a map container with the ID "tree_map".

2. The JavaScript code initialises variables, which includes:

* the tolerance value (25 metres)
* an empty array to store marker objects (all_markers)
* a string variable (data) that contains marker data in the format of latitude, longitude, and emoji icon.

3. Please note that the marker data was developed by adapting another previous Raspberry Pi project https://projects.raspberrypi.org/en/projects/zombie-apocalypse-map/9 (my mapping of the local area can be found here: https://github.com/RosalindHook/Yourspace_treehunt. Having created this map with interesting features on it, the data for the treasure hunt was copied from the console.
  
4. The initMap() function is defined, which initialises the map using the Google Maps API and creates markers based on the marker data. It also checks for geolocation suport and watches the user's position using the browser's geolocation API. I needed to trouble-shoot an issue whereby the user's position was jumping around and was inaccurate, which I have done by adjusting the Geolocation Options to fine-tune the behaviour of the geolocation updates. I set the enableHighAccuracy option to true to request more accurate position updates from the GPS. I also changed the tolerance for the locations from 5m to 25m, as I realised this was also problematic in terms of getting the user's Geolocation to 'land' on the precise location of the marker data.

5. Inside the set_my_position() function (geolocation callback), the user's position is obtained and stored in the pos variable. If the user's marker (myMarker) already exists, it is removed from the map.
   
6. A new marker is created for the user's position using the Google Maps Marker constructor, and it is added to the all_markers array. The code then loops through all the markers in the all_markers array. For each marker, it checks if it is the user's own marker. If it is, the loop skips to the next iteration. For each non-user marker, the code calculates the distance between the user's position and the marker using the computeDistanceBetween() function from the Google Maps Geometry library. If the distance is less than the tolerance value (25 metres), an alert is triggered indicating that the marker has been found. The marker is also removed from the map and the all_markers array.
   
7. The loop continues until all markers have been checked.
  
9. There is also a scoring feature - the score will be displayed on the web page as "Score: 0" initially, and it will be updated each time the user finds a marker by 1.
   
10. To follow - (16 June 2023) - this code is now at a test stage to check that the code defined above runs as expected. If it works correctly, then the following features will be added:

* score count when a user finds an icon (currently tree or flower)
* more icons based on interesting features in the park
* pop up boxes with more information about the features, to enable families and children to learn more about the local wildlife and nature in the park.

## Documentation

1. This simple treasure hunt is hosted on Github Pages and can be accessed by going to rosalindhook.github.io/YourSpace_treasurehunt/. Also, note that the geolocation feature requires user consent and may not work in some browsers or under certain conditions.

2. If using or adapting this code, you will need to ensure the API key in the script tag is replaced with your own valid API key. 
