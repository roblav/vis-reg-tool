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

Or a config file will be created.

## Step 4 - View report

In the 'compare' directory you should see a generated config.js file. Open index.html in your browser of choice.

## Step 5 - Archive your report (Optional)

If you want to create more than 1 report you need to archive it.

Create a build directory.
In it create a directory and name it a memorable report name.
Copy the compare folder into your new report directory.
Also, copy the images directory into your report directory.
