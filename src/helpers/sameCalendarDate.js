const sameCalendarDate = (date1, date2) => {
    const Date1 = new Date(date1);
    const Date2 = new Date(date2);
    return Date1.getFullYear() === Date2.getFullYear() &&
  Date1.getMonth() === Date2.getMonth() &&
  Date1.getDate() === Date2.getDate();
};

export default sameCalendarDate;