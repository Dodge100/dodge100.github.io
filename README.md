portfolio site
---

all animations and css are all baseline supported so they should work across most browser and without javascript. feel free to open the website with javascript disabled!

i read this [awesome blog post by lyra rebane](https://lyra.horse/blog/2025/08/you-dont-need-js/) in which she details how css has gotten so advanced that you don't need javascript for most simple websites these days. since i was building a personal site and not a web app that depends on javascript, i decided to try out using only html and css.

## local setup
since all code is written in html and css so you could run this by opening the file in your browser directly. however, to make it easier to read the html, svgs in the hero used the <use> html element (baseline supported for all behavior i need). unfortunately, the <use> element doesn't work properly with just the html file. you can instead use a simple server to serve the html to you. one example is python: `python3 -m http.server 3000` which would serve you the html file on port 3000. 

## issues?
please feel free to submit a pr if you have any optimazations or create an issue if you experience any strange behavior on the site. do try to include screenshots for the latter as well as info like operating system and browser version to help me debug.
