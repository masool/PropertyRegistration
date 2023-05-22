cd api/javascript/src/

  if [ -d "wallet" ]; then
  chmod 777 wallet
  rm -rf wallet
  echo "wallet folder deleted"
  else 
  echo "wallet folder not found"
  fi

  if [ -d "node_modules" ]; then
  echo "Node modules already exists, if need to install again stop here and run "npm i" "
  else 
  echo "Installing node modules"
  sudo npm install
  sleep 2
  sudo npm audit fix
  fi

sleep 2
echo "run enroll admin for ADMIN fo org1"
node enrollAdmin_org1.js
echo
echo "run enroll admin for ADMIN fo org2"
node enrollAdmin_org2.js
echo
sleep 2
chmod 777 wallet
sleep 2
# echo "Run register user for USER for org1"
# node registerUser_org1.js
# echo
# echo "Run register user for USER for org2"
# node registerUser_org2.js
echo
echo "start npm"
echo
# pm2 start app.js
sudo npm start
