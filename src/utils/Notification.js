export const sendSingleDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'key=AAAAtL22pZ4:APA91bFCU3PqoQa1NL5RyMCCugq0uFuLWvs6neLMRdS9WswD64AwCM98kwBdpyqflau62rkVMeT7GvhLq2Nm3wtVZiGPyd_vQ_NEuI7AoDC2l5YW3McEMCXTIr3CdYSLShWjouSoa_4Q',
  );
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    // to: 'ch5JH2AzSnauVS6BU3Xwdx:APA91bHoF7xhsceVCS42vG8gXm8ePvJZ6Lm1sXQjhjjM2LmWrYcaBp3N6rojs2beIlqrXPq7MCG6XNjiyq-U0YhgeLTGqfZQpb4kvk0Un79IgyPb61IjZR_pmPAB6Q1NS5P0v9P40-AX',

    to: data.token,
    priority: 'high',
    soundName: 'default',
    notification: {
      title: data.title,
      body: data.body,
    },
    data: {},
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const sendMultiDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'key=AAAAtL22pZ4:APA91bFCU3PqoQa1NL5RyMCCugq0uFuLWvs6neLMRdS9WswD64AwCM98kwBdpyqflau62rkVMeT7GvhLq2Nm3wtVZiGPyd_vQ_NEuI7AoDC2l5YW3McEMCXTIr3CdYSLShWjouSoa_4Q',
  );
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    // to: 'ch5JH2AzSnauVS6BU3Xwdx:APA91bHoF7xhsceVCS42vG8gXm8ePvJZ6Lm1sXQjhjjM2LmWrYcaBp3N6rojs2beIlqrXPq7MCG6XNjiyq-U0YhgeLTGqfZQpb4kvk0Un79IgyPb61IjZR_pmPAB6Q1NS5P0v9P40-AX',

    registration_ids: data.token,
    priority: 'high',
    soundName: 'default',
    notification: {
      title: data.title,
      body: data.body,
    },
    data: {},
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
