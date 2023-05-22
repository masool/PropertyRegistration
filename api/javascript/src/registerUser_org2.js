/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

exports.RegisterUser_org2 = async (registerUser_org2) => {
    try {
        var response = {};
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org2.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(registerUser_org2);
        if (userIdentity) {
            return({Message:"An identity for the user "+registerUser_org2+" already exists in the wallet"});
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin-org2');
        if (!adminIdentity) {
            return({Message:"An identity for the admin user admin-org2 does not exist in the wallet Run the enrollAdmin.js application before retrying"});
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin-org2');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org2.department1',
            enrollmentID: registerUser_org2,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: registerUser_org2,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org2MSP',
            type: 'X.509',
        };
        await wallet.put(registerUser_org2, x509Identity);
        return({Message: "Successfully registered user "+registerUser_org2+" and imported it into the wallet"});

    } catch (error) {
        console.error(`Failed to register user ${registerUser_org2}: ${error}`);
        response.error = error.message;
        return response;
    }
}
