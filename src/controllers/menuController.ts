import * as data from '../data';

export function init(app: any) {

    app.get("/api/menuItems", (req: any, res: any) => {

      data.getMenuItems((err: any, results: any) => {

        if (err) {
            res.send(400, err);
        } else {
            res.set("Content-Type", "application/json");
            res.send(results);
        }
      });
    });

    app.get("/api/menuItems/:itemNumber", (req: any, res: any) => {
        const itemNumber = req.params.itemNumber;

        data.getMenuItem(itemNumber, (err: any, results: any) => {

            if (err) {
                res.send(400, err);
            } else {
                res.set("Content-Type", "application/json");
                res.send(results);
            }
        });
    });

    app.get("/api/setMenus", (req: any, res: any) => {

        data.getSetMenus((err: any, results: any) => {

            if (err) {
                res.send(400, err);
            } else {
                res.set("Content-Type", "application/json");
                res.send(results);
            }
        });
    });

    // app.get("/notes/:categoryName", 
    //   auth.ensureAuthenticated, 
    //   function (req, res) {
    //     var categoryName = req.params.categoryName;
    //     res.render("notes", { title: categoryName, user: req.user });
    //   });

    // app.post("/newCategory", function (req, res) {
    //   var categoryName = req.body.categoryName;
    //   data.createNewCategory(categoryName, function (err) {
    //     if (err) {
    //       // Handle Error
    //       console.log(err);
    //       req.flash("newCatName", err);
    //       res.redirect("/");
    //     } else {
    //       res.redirect("/notes/" + categoryName);
    //     }
    //   });
    // });

  };