function dateFormatter(timestamp) {
    months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      };
      
    const dateObj = new Date(timestamp);
    
    const formattedMonth = months[dateObj.getMonth()];
    


    let dayOfMonth = dateObj.getDate();

    // if (dateSuffix) {
    // dayOfMonth = addDateSuffix(dateObj.getDate());
    // } else {
    // dayOfMonth = dateObj.getDate();
    // }

    const year = dateObj.getFullYear();

    let hour;
    // check for 24-hr time
    if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
    } else {
    hour = dateObj.getHours();
    }
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
    hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // set `am` or `pm`
    let periodOfDay;

    if (dateObj.getHours() >= 12) {
    periodOfDay = 'pm';
    } else {
    periodOfDay = 'am';
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
} 

module.exports = dateFormatter