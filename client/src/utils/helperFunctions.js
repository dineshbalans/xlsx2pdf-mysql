function trimObjectKeysAndValues(obj) {
  let trimmedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let trimmedKey = key.trim().replace(/\s+/g, "");
      let value = obj[key];
      if (typeof value === "string") {
        value = value.trim();
      }
      trimmedObj[trimmedKey] = value;
    }
  }
  console.log(trimmedObj);
  return trimmedObj;
}

export { trimObjectKeysAndValues };
