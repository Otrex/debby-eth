module.exports = {
  groupBy: (arr, key) => {
    return arr.reduce((rv, x) => {
      if (typeof key === 'function') {
        (rv[key(x)] = rv[key(x)] || []).push(x);
      } else {
        (rv[x[key]] = rv[x[key]] || []).push(x);
      }
      return rv;
    }, {});
  },
  subtractDateByDays: (days, date = Date.now()) => {
    const ONE_DAY_IN_MILLISECONDS = 86400000;
    const d = new Date(date);
    d.setHours(0, 0, 0);
  
    return new Date(d.getTime() - days * ONE_DAY_IN_MILLISECONDS);
  },
}