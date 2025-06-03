class LocalManipulation {
  static store(keysAndValuesArr) {
    keysAndValuesArr.forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  static destroy(keys) {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  static get(key, isBool = false) {
    let retrieveValue = localStorage.getItem(key);
    if (retrieveValue === null) return isBool ? false : undefined;

    try {
      retrieveValue = JSON.parse(retrieveValue);
      return isBool && typeof retrieveValue !== "boolean"
        ? false
        : retrieveValue;
    } catch (err) {
      return isBool ? false : undefined;
    }
  }

  static triggerReloadInOtherTabs() {
    localStorage.setItem("TRIGGER", "true");
    localStorage.removeItem("TRIGGER");
  }
}

export default LocalManipulation;
