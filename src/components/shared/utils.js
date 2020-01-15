function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

function handleDate(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const monthLetters = value => monthNames[value].substring(0, 3);
  const mailDate = new Date(date);
  const mailHour = mailDate.getHours();
  const mailDay = mailDate.getDate();
  const mailMonth = mailDate.getMonth();
  const mailYear = mailDate.getFullYear();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDate();
  const currentMonth = mailDate.getMonth();
  const currentYear = currentDate.getFullYear();
  if (mailYear === currentYear) {
    if (mailMonth === currentMonth && mailDay === currentDay) {
      if (mailHour === currentHour) {
        const mailMinutes = mailDate.getMinutes();
        const currentMinutes = currentDate.getMinutes();
        const diffTime = currentMinutes - mailMinutes;
        return `${formatAMPM(mailDate)}(${diffTime} minutes ago)`;
      } else {
        return `${formatAMPM(mailDate)}`;
      }
    } else {
      const monthStr = monthLetters(mailMonth);
      return `${monthStr} ${mailDay}`;
    }
  } else {
    const monthStr = monthLetters(mailMonth);
    return `${monthStr} ${mailDay},${mailYear}`;
  }
}

// Filter the results of the search box
function resultsFilter(mails, subject, searchKey) {
  const lowercasedFilter = subject.toLowerCase();
  return mails.filter(mail => {
    return Object.keys(mail).some(
      key =>
        key === searchKey &&
        mail[searchKey].toLowerCase().includes(lowercasedFilter)
    );
  });
}

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export { handleDate, resultsFilter, isEmpty };
