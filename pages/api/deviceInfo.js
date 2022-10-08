// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

import iothub from 'azure-iothub'

let connectionString = `${process.env.AZURE_KEY}`;

var registry = iothub.Registry.fromConnectionString(connectionString);

export default function getPrimaryKey(req, res) {
  if (req.method === 'GET') {
    
    registry.get('Entretien', function(err, deviceInfo) {
      if (err) console.log(' error: ' + err.toString());
      if (deviceInfo) { 
        let key = deviceInfo.authentication.symmetricKey.primaryKey
        console.log(key)
        res.status(200).json({ 'key': key })
      }
    });
  } else {
    res.status(405).json({'message': 'sorry just get requests accepted'})
  }
}
