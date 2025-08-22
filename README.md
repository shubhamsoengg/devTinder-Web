# DevTinder

-   Create a Vite + React application
-   Remove unnecessary code and create a hello world app.
-   Install tailwind css
-   Install Daisy UI and pull th navbar component from daisyUI
-   install react-router-dom
-   create BrowserRouter > Routes > Route=/Body > Route Children
-   outlet for body
-   setup login page
-   install axios
-   install cors() on backend and whitelist our frontend url
-   Also add credentails: true
-   on frontend, on axios, add withcredentials: true

-   create a profile page and also a live preview section. think about how we can remove the call to action btns from preview.
-   There should be an option to reject an accepted request as well.
-   do overall site validations.
-   can we add chat/message options?
-   Can we make the images proper? same size for everyone? best way to upload images, where to store them?

# Deployment

-   signup to aws
-   create ec2 instance, connect
-   ssh -i "devTinder-secret.pem" ubuntu@ec2-3-17-62-11.us-east-2.compute.amazonaws.com in your local terminal and you'll go into the ubuntu terminal
-   This now is like a new machine. Install node through curl.
-   then install the correct version on nvm which is working on your local. At the time my local version was 20.19.4. so in ubuntu as well I run "nvm install 20.19.4"
-   git clone both your front end and backend projects

## Frontend:

-   do a ls and check
-   get into devTinder-Web -> "npm install" -> "npm run build". This will run the "prod" build and create the dist folder.
-   sudo apt update
-   sudo apt install nginx
-   sudo systemctl start nginx
-   sudo systemctl enable nginx
-   Copy code from dist(build files) to /var/www/html/
-   sudo scp -r dist/\* /var/www/html/
-   Enable port :80 of your instance

## Backend

-   updated DB password
-   allowed ec2 instance public IP on mongodb server
-   npm intsall pm2 -g
-   pm2 start npm --name "devTinder-backend" -- start
-   pm2 logs
-   pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
-   config nginx - /etc/nginx/sites-available/default
-   restart nginx - sudo systemctl restart nginx
-   Modify the BASEURL in frontend project to "/api"

# Nginx Configuration

-   Frontend = http://3.17.62.11/
-   Backend = http://3.17.62.11:3000/

-   Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

-   nginx config :

    server_name 43.204.96.49;

    location /api/ {
    proxy_pass http://localhost:7777/; # Pass the request to the Node.js app
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
