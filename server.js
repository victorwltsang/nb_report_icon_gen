const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;

var NounProject = require('the-noun-project'),
  nounProject = new NounProject({key: '2d08d6471a384197bcb60ff6d26aea05', secret: '6e041743f9af411da2fed2a4381aabb1'});

// API calls
app.get('/api/icon', (req, res) => {
  console.log(req.query.name);
  var iconName = req.query.name;

  nounProject.getIconsByTerm(iconName, {
    limit: 1
  }, function(err, data) {
    if (!err) {
      console.log(data.icons[0].preview_url_42);
      saveToIconList(downloadImage(iconName, data.icons[0].preview_url_42));
      res.send({name: iconName, url: data.icons[0].preview_url_42});
    }
  });

});

app.get('/api/all-icons', (req, res) => {
  fs.readFile('icons-db.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);

    } else {
      const obj = JSON.parse(data); //now it an object
      res.send(obj);
    }
  });

});

app.get('/api/icon-db', (req, res) => {
  console.log(req.query.name);
  const iconName = req.query.name;
  const iconUrl = req.query.url;
  let iconObj = {
    name:iconName,
    url:iconUrl
  }

   let result = saveToIconList(iconObj);
   res.send(result);

});

var saveToIconList = ((icon) => {
  fs.readFile('icons-db.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data); //now it an object

      obj.icons.push(icon); //add some data
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('icons-db.json', json, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
        return (obj);
      }); // write it back
    }
  });
  return;
});

var downloadImage = ((name, url) => {

  let ext = path.extname(url);
  let imageName = name.concat(ext);

  if (process.env.NODE_ENV === 'production') {
    request(url).pipe(fs.createWriteStream(path.resolve('client/build/assets/icons', imageName)));
  } else {
    request(url).pipe(fs.createWriteStream(path.resolve('client/public/assets/icons', imageName)));

  }

  let newIcon = {
    name: name,
    url: `./assets/icons/${imageName}`
  }
  return (newIcon);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
