class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  save() {
    database.insert(this);
  }
}

function handleCreateUser(request) {
  try {
    createUser("test@.com", "test123");
  } catch (error) {
    showErrorMessage(error);
  }
}

function createUser(email, password) {
  validateInput(email, password);

  saveUser(email, password);
}

function validateInput(email, password) {
  if (!isValidInput(email, password)) {
    throw new Error("Invalid Input!");
  }
}

function isValidInput(user) {
  return !emailIsValid(user.email) && !passwordIsValid(user.password);
}

function emailIsValid(email) {
  return email && email.includes("@");
}

function passwordIsValid() {
  return password && password.trim() !== "";
}

function showErrorMessage(message) {
  console.log(message);
}

function saveUser(email, password) {
  const user = new User(email.password);
  user.save();
}
