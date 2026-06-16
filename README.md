# portfolio site

all animations and css are all baseline supported so they should work across most browser and without javascript. feel free to open the website with javascript disabled!

all code is written in html and css so you could just run this by opening the file in your browser directly. however, to make it easier to read the html, svgs in the hero used the <use> html element (baseline supported for all behavior i need). unfortunately, the <use> element doesn't work properly with just the html file. you can instead use a simple server to serve the html to you. one example is python: `python3 -m http.server 3000` which would serve you the html file on port 3000. 
