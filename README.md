# Hyperledger Fabric

You can use Fabric samples to get started working with Hyperledger Fabric, explore important Fabric features, and learn how to build applications that can interact with blockchain networks using the Fabric SDKs. To learn more about Hyperledger Fabric, visit the [Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/latest).

## Getting started with the Fabric

To use the Hyperledger Fabric, you need to download the Fabric Docker images and the Fabric CLI tools. First, make sure that you have installed all of the [Fabric prerequisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html). You can then follow the instructions to [Install the Fabric Samples, Binaries, and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Fabric documentation. In addition to downloading the Fabric images and tool binaries, the Fabric samples will also be cloned to your local machine.

### Prerequisites and Bring up the test network:

* [Docker](https://www.docker.com/products/overview) - v1.12 or higher
* [Docker Compose](https://docs.docker.com/compose/overview/) - v1.8 or higher
* [Git client](https://git-scm.com/downloads) - needed for clone commands
* **Node.js** v8.4.0 or higher
* [Download Docker images](http://hyperledger-fabric.readthedocs.io/en/latest/samples.html#binaries)

```
cd PropertyRegistration
```

Once you have completed the above setup, you will have provisioned a local network with the following docker container configuration:

* 2 CAs
* 1 orderers
* 2 peers (1 peers per Org)
* 2 Organisations (Org1 & Org2)
* 2 couchdb
* 1 Channel

#### Artifacts
* Crypto material has been generated using the **cryptogen** tool from Hyperledger Fabric and mounted to all peers, the orderering node and CA containers. More details regarding the cryptogen tool are available [here](http://hyperledger-fabric.readthedocs.io/en/latest/build_network.html#crypto-generator).
* An Orderer genesis block (genesis.block) and channel configuration transaction (ntuc-channel.tx) has been pre generated using the **configtxgen** tool from Hyperledger Fabric and placed within the artifacts folder. More details regarding the configtxgen tool are available [here](http://hyperledger-fabric.readthedocs.io/en/latest/build_network.html#configuration-transaction-generator).


## How to Run the Application

Below are the instructions given to run this application.

##### Start test - Blockchain network and Application

```
git clone https://github.com/masool/PropertyRegistration.git
```

```
cd PropertyRegistration
```
```
Give chmod permissions to bootstrap.sh, startfabric.sh and stopfabric.sh file
```

```
./bootstrap.sh -r ( Note: Use Sudo if any permission issues) for the first time
```
* bootstrap script will download required hyperledger fabric binaries and also pull fabric docker images if not availble.
* This launches the test permissioned network and can see the below output for successfull up and running the network

```
While run the same network second time give the below command to start the network,  no need to run bootstrap script as all the required binaries have been already dowloaded at the first time run
./startFabric.sh
```


```
Business network has been statted
                                                                                      
                                                                                 
### Generating channel configuration transaction 'test-channel.tx' ###
+ configtxgen -profile ThreeOrgsChannel -outputCreateChannelTx ./channel-artifacts/test-channel.tx -channelID test-channel
```

```
========= All GOOD, Property Registration Business Network execution completed =========== 

```

* After successful launch of network can see all the required docker containers are up and running using below command.
```
docker ps -a
```

##### Stop Apllication and Blockchain Network

* To Stop Network
```
./stopFabric.sh
```
## Couchdb 
* Can access couchdb url :- http://localhost:5984/_utils/

##### To start Api layer follow the below commands

* To start api's
```
./fabricapi.sh
```
## License <a name="license"></a>

Hyperledger Project source code files are made available under the Apache
License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
Hyperledger Project documentation files are made available under the Creative
Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
