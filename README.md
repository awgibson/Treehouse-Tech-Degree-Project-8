# Treehouse-Tech-Degree-Project-8

## Goal
In this project you’ll be provided a website with HTML, SCSS, JPEGs, PNGs and JavaScript files. You’ll be required to set up a Gulp build process to prepare the website for deployment.

### The build process must fulfill the following criteria:

1. Concatenate and minify the JavaScript files
2. Compile SCSS into CSS in a concatenated and minified file
3. Generate JavaScript and CSS source maps
4. Compress any JPEG or PNG files
5. All output for the build process should be in a dist folder for distribution or deployment.

***

## Grading Criteria
+ Running the npm install command installs the build process dependencies properly
+ The gulp scripts command concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file
+ The command copies the all.min.js file into the dist/scripts folder
+ The gulp styles command compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file
+ The command copies the all.min.css file into the dist/styles folder
+ The gulp scripts command generates JavaScript source maps
+ The gulp styles command generates CSS source maps
+ The gulp images command copies the optimized images to the dist/content folder.
+ The gulp clean command deletes all of the files and folders in the dist folder.
+ The gulp build command properly runs the clean, scripts, styles, and images tasks.
+ The clean task fully completes before the scripts, styles, and images tasks are ran.
+ The gulp command properly runs the build task as a dependency
+ The gulp command serves the project using a local webserver.
+ **Exceeds**: The gulp command also listens for changes to any .scss file. When there is a change to any .scss file, the gulp styles command is run, the files are compiled, concatenated and minified to the dist folder, and the browser reloads, displaying the changes