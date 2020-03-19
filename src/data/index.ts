import * as database from './database';
import * as seedData from './seedData';

export function getMenuItems(next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.menuItems.find().toArray((findError: any, results: any) => {
                if (findError) {
                    next(findError, null);
                } else {
                    next(null, results);
                }
            })
        }
    })
}

export function getMenuItem(requestedItemNumber: any, next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.menuItems.findOne({ itemNumber: requestedItemNumber }, next);
        }
    })
}

export function getSetMenus(next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.setMenus.find().toArray((findError: any, results: any) => {
                if (findError) {
                    next(findError, null);
                } else {
                    next(null, results);
                }
            })
        }
    })
}

(() => {
    seedDatabase();
})();

function seedDatabase() {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to seed database: " + err);
        } else {
            // test to see if data exists
            const menuItemsCount = db.menuItems.countDocuments();
            if (menuItemsCount === 0) {
                console.info("Seeding the Database for Menu Items...");

                if (db.menuItems.insertMany(seedData.getMenuItems())){
                    console.info("Menu Items successfully seeded")
                } else {
                    console.error("Failed to insert menu items into database");
                };

            } else {
                console.info("MenuItems already seeded. Skipping...");
            }

            const setMenusCount = db.setMenus.countDocuments();
            if (setMenusCount === 0) {
                console.info("Seeding the Database for Set Menus...");

                if (db.setMenus.insertMany(seedData.getSetMenus())){
                    console.info("Set Menus successfully seeded")
                } else {
                    console.error("Failed to insert set menus into database");
                };
            } else {
                console.info("SetMenus already seeded. Skipping...");
            }
        }
    })
}