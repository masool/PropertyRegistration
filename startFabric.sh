cd network/
./network.sh down
./network.sh up -s couchdb
./network.sh createChannel
./network.sh deployCC -l javascript