// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

import iothub from 'azure-iothub'

let connectionString = `HostName=OcteHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=TE9vDi48eu2lT+2+/y8mpLkKf8XVkwxV1e1YI2UbBqA=`;

var registry = iothub.Registry.fromConnectionString(connectionString);

export default function handler(req, res) {
  if (req.method === 'GET') {
    
    registry.get('Entretien', function(err, deviceInfo) {
      if (err) console.log(' error: ' + err.toString());
      if (deviceInfo) { 
        let key = deviceInfo.authentication.symmetricKey.primaryKey
        console.log(key)
        res.status(200).json({ 'key': key })
      }
    });
  }
}
