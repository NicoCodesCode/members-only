const renderLogInPage = (req, res) => {
  res.render("logInForm", { title: "Log In", invalidInput: {} });
};

module.exports = { renderLogInPage };
