# Visual Regression Toolkit

This visual regression toolkit has been based on the amazing work done in this project https://github.com/garris/BackstopJS

This is a slim version of that project and assumes that the user generates there before (reference) and after (test) images themselves.

## Requirements

### Install node 

It is recommeneded to install Node using Node Version Manager

https://github.com/creationix/nvm

### Prepare reference and test image to compare

To use this project you will need to have a set of image pairs to compare. 
Each pair of images should be named the same if they are not you will get an error. 
You can have as many pairs of images as you like but it may be worth batching your images in to sets of 10 and generating multiple reports.

## Step 1 - Create reference and test images directory

In the top level create an 'images' directory. In this directory create a 'reference' and 'test' directory.

|_images
  |_reference
  |_test

## Step 2 - Added reference and test images

Add reference images and test images to the relevant folders in the 'images' directory.

## Step 3 - Install node dependancies

```$ npm install```

## Step 4 - Run visual regression report

```$ npm start```

You will either see a failure telling you that the image files in the reference and test directories don't match.

Or your report will open up in your default browser.

## Additional

The main settings for the configuration of the report are held in the 'src/config.js' file.
