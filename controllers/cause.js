import extend from "../utils/context.js"
import models from "../models/index_model.js";
import docModifier from "../utils/doc_modifier.js";

export default {
    get: {
        dashboard(context) {
            models.cause.getAll().then((response) => {
                const causes = response.docs.map(docModifier);

                let js = Object.values(causes).filter(x=> x.category === "JavaScript");
                context.js = js;
                extend(context).then(function () {
                    this.partial("./views/cause/dashboard.hbs")
                });

                let pyton = Object.values(causes).filter(x=> x.category === "Pyton");
                context.pyton = pyton;
                extend(context).then(function () {
                    this.partial("./views/cause/dashboard.hbs")
                });

                let java = Object.values(causes).filter(x=> x.category === "Java");
                context.java = java;
                extend(context).then(function () {
                    this.partial("./views/cause/dashboard.hbs")
                });

                let cSharp = Object.values(causes).filter(x=> x.category === "C#");
                context.cSharp = cSharp;
                extend(context).then(function () {
                    this.partial("./views/cause/dashboard.hbs")
                })
            });

        },
        create(context) {
            extend(context).then(function () {
                this.partial("./views/cause/create.hbs")
            })
        },
        details(context) {
            const {causeId} = context.params;
            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);
                context.cause = cause;
                context.canEdit = cause.uid !== localStorage.getItem("userId");
                extend(context).then(function () {
                    this.partial("./views/cause/details.hbs")
                })

            }).catch(e => console.error(e));
        },
        edit(context) {
            extend(context).then(function () {
                this.partial("./views/cause/edit.hbs")
            })
        },
    },
    post: {
        create(context) {
            const data = {
                ...context.params,
                uid: localStorage.getItem("userId"),
            };

            models.cause.create(data).then((response) => {
                context.redirect("#/cause/dashboard");
            }).catch((e) => console.error(e));

        }
    },
    del: {
        close(context) {
            let {causeId} = context.params;
            models.cause.close(causeId).then((response) => {
                context.redirect("#/cause/dashboard");
            })
        }
    },
    put: {
        edit (context) {
            const {newComment,causeId} = context.params;
            let currUser = localStorage.getItem('userEmail')
            let finalComent = `${currUser}: ${newComment}`;
            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);
                cause.content.push(finalComent);
                return models.cause.edit(causeId, newComment)
            }).then((response) => {
                context.redirect("#/cause/dashboard");
            })
        }
    }
};