class validator {
  static validateTask(taskData) {
    if (
      taskData.hasOwnProperty("id") &&
      taskData.hasOwnProperty("title") &&
      taskData.hasOwnProperty("description") &&
      taskData.hasOwnProperty("status")
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = validator;
