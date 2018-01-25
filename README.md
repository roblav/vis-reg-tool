# Visual Regression Tool

## Install node using Node Version Manager

https://github.com/creationix/nvm

Currently there are a few manual steps to getting a visual regression report:

## Step 1 - Added reference and test images

In the images directory add reference images and test image.
Create a 'diff' directory. This will hold the image diff that gets generated.

## Step 2 - Install node dependancies

```$ npm install```

## Step 3 - Run vis-reg tool

```$ npm start```

You will either see a failure telling you that the image files in the reference and test directories don't match.

Or your report will open up in your default browser
