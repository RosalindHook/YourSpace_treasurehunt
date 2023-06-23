# YourSpace_treasurehunt

## Introduction
1. A community project treasure hunt based on 'Where's Zombie game' (Raspberry Pi Foundation) - reference https://projects.raspberrypi.org/en/projects/wheres-zombie/. It sets up a simple treasure hunt game using Google Maps API. The map is initialised, and markers are placed on the map based on the provided coordinates and icons. The geolocation feature is used to track the user's position. When the user moves within a certain distance (tolerance) of a marker, an alert is shown indicating what the user has found, and the marker is removed from the map.

2. I used the Raspberry Pi step by step walk through to develop my own version of code that sets up a treasure hunt scenario where the user's location is tracked.
  
4. When the user is within 10 metres of a tree or flower marker, an alert is triggered indicating that the object has been found. The user's own marker (person icon) is not considered for triggering alerts.

5. This code has been developed for Yourspace for their 'Midsummer fair' (Saturday 24 June - Sunday 25 June 2023) and is intended for use by local families, children and others to enjoy a fun, short (20-30 minutes) treasure hunt in the local park. It will include interesting features about the trees and wildlife in the park.

## Project information
1. The HTML markup defines a basic structure for the webpage, including a map container with the ID "tree_map".

2. The JavaScript code initialises variables, which includes:

* the tolerance value (10 metres)
* an empty array to store marker objects (all_markers)
* a string variable (data) that contains marker data in the format of latitude, longitude, and emoji icon.

3. Please note that the marker data was developed by adapting a similar Raspberry Pi project https://projects.raspberrypi.org/en/projects/zombie-apocalypse-map/9 (my mapping of the local area can be found here: https://github.com/RosalindHook/Yourspace_treehunt. Having created this map with interesting features on it, I copied the data for the treasure hunt (i.e. the precise coordinates needed for the features) from the console.
  
4. The initMap() function is defined, which initialises the map using the Google Maps API and creates markers based on the marker data. The code then loops through the markers array and creates markers for each marker data. It extracts latitude, longitude, icon, and object index from each markerData entry. Each marker is created using the google.maps.Marker constructor and added to the tree_map with the specified position, icon, and object index. The initMap function also checks for geolocation suport by calling the function geolocationSupport() and watches the user's position using the browser's geolocation API.
  
5. I needed to trouble-shoot an issue whereby the user's position was jumping around frequently and was inaccurate. I enabled more accurate geolocation monitoring and tracking of the user by adapting my code in the following ways:

* I specified desired options for geolocation accuracy when calling watchPosition() by providing an options object as the second argument. I set the enableHighAccuracy option to true to request the most accurate position available.
* I implemented error handling in the set_my_position() function to handle any errors that might occur during geolocation retrieval. I added an error callback function as the second argument to watchPosition() which could then handle errors accordingly.
* I also adjusted the maximumAge option in the watchPosition() call to specify the maximum age of a cached position that can be used. Setting a lower value, such as 1000 milliseconds, helped ensure that the position is more up-to-date.
   
6. Inside the set_my_position() function (geolocation callback), the user's position is obtained and stored in the pos variable. If the user's marker (myMarker) already exists, it is removed from the map. A new marker is created for the user's position using the Google Maps Marker constructor, and it is added to the all_markers array. The code then loops through all the markers in the all_markers array. For each marker, it checks if it is the user's own marker. If it is, the loop skips to the next iteration. For each non-user marker, the code calculates the distance between the user's position and the marker using the computeDistanceBetween() function from the Google Maps Geometry library. If the distance is less than the tolerance value (10 metres), an alert is triggered indicating that the marker has been found. The marker is also removed from the map and the all_markers array.
   
7. The loop continues until all markers have been checked.
  
8. There is also a scoring feature - the score will be displayed on the web page as "Score: 0" initially, and it will be updated each time the user finds a marker by 1.
   
9. A pop-up box shows a corresponding image and information based on the object index of the detected marker - this is intended to teach children and families about interesting trees in the park.

10. I also developed a corresponding static page with all the tree information and photos included separately, which can be accessed from a link on the Nav bar on the main landing page.

## Documentation

1. This simple treasure hunt is hosted on Github Pages and can be accessed by going to rosalindhook.github.io/YourSpace_treasurehunt/. Also, note that the geolocation feature requires user consent and may not work in some browsers or under certain conditions.

2. If using or adapting this code, you will need to ensure the API key in the script tag is replaced with your own valid API key. 
