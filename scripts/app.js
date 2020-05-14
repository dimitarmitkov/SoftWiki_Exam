import controllers from "../controllers/index.js";

let app = Sammy("#root", function () {

    this.use("Handlebars","hbs");
    //Home
    this.get("#/", controllers.home.get.home);
    // this.get("#/home", controllers.cause.get.function);

    //Users
    this.get("#/user/login",controllers.user.get.login);
    this.get("#/user/register",controllers.user.get.register);
    //
    this.post("#/user/login",controllers.user.post.login);
    this.post("#/user/register",controllers.user.post.register);
    this.get("#/user/logout",controllers.user.get.logout);
    // //Cause
    this.get("#/cause/dashboard",controllers.cause.get.dashboard);
    this.get("#/cause/create", controllers.cause.get.create);
    this.get("#/cause/details/:causeId", controllers.cause.get.details);
    //
    this.post("#/cause/create", controllers.cause.post.create);
    this.get("#/cause/close/:causeId", controllers.cause.del.close);
    this.get("#/cause/edit/:causeId", controllers.cause.get.edit);
    this.post("#/cause/edit/:causeId", controllers.cause.put.edit);
});

    app.run("#/");

