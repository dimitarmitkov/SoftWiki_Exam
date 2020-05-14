import models from "../models/index_model.js"
import extend from "../utils/context.js"

export default {
    get: {
        login(context) {
            //***
            extend(context).then(function () {
                this.partial("./views/user/login.hbs");
            })
        },
        register(context) {
            //***
            extend(context).then(function () {
                this.partial("./views/user/register.hbs");
            })
        },
        logout(context) {
            models.user.logout().then((response) => {
                context.redirect("#/");
            })
        }
    },
    post: {
        login(context) {
            const {username, password} = context.params;

            models.user.login(username, password)
                .then((response) => {
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;
                    context.redirect("#/cause/dashboard");
                })
                .catch((e) => console.error(e))
        },
        register(context) {
            const {username, password, repPass} = context.params;
            if (password !== repPass) {
                alert("Password doesn't match, please retry")
            } else {
                models.user.register(username, password)
                    .then((response) => {
                        context.redirect("#/user/login");
                    })
                    .catch((e) => console.error(e))
            }
            console.log(username, password, rePassword);
        }
    }
};