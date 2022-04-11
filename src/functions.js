export let getTimeDif = (orgTime) => {
  let currTime = Date.now();
  let tDif = currTime - orgTime;

  if (tDif < 60000) {
    let endNum = Math.floor(tDif / 1000);
    let result;
    if (endNum == 0) {
      result = " just now";
    } else if (endNum == 1) {
      result = endNum + " sec ago";
    } else {
      result = endNum + " secs ago";
    }

    return result;
  } else if ((tDif > 60000 || tDif == 60000) && tDif < 3600000) {
    let endNum = Math.floor(tDif / 60000);
    let result;
    if (endNum <= 1) {
      result = endNum + " min ago";
    } else {
      result = endNum + " mins ago";
    }
    return result;
  } else if ((tDif > 3600000 || tDif == 3600000) && tDif < 216000000) {
    let endNum = Math.floor(tDif / 3600000);

    let result;
    if (endNum <= 1) {
      result = endNum + " hour ago";
    } else {
      result = endNum + " hours ago";
    }
    return result;
  } else if ((tDif > 216000000 || tDif == 216000000) && tDif < 1512000000) {
    let endNum = Math.floor(tDif / 216000000);
    let result;
    if (endNum <= 1) {
      result = endNum + " day ago";
    } else {
      result = endNum + " days ago";
    }
    return result;
  } else if ((tDif > 1512000000 || tDif == 1512000000) && tDif < 1512000000 * 4) {
    let endNum = Math.floor(tDif / 1512000000);

    let result;
    if (endNum <= 1) {
      result = endNum + " week ago";
    } else {
      result = endNum + " weeks ago";
    }
    return result;
  } else if (tDif > 1512000000 * 4 || tDif == 1512000000 * 4) {
    let endNum = Math.floor(tDif / (1512000000*4)) ;

    let result;
    if (endNum <= 1) {
      result = endNum + " month ago";
    } else {
      result = endNum + " months ago";
    }
    return result;
  }
};
