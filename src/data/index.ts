import * as database from './database.firebase';
import * as seedData from './seedData';

export function getMenuItems(next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.ref('menuItems').once('value', (snapshot) => {
                next(null, snapshot.val())
            });

            // db.menuItems.find().toArray((findError: any, results: any) => {
            //     if (findError) {
            //         next(findError, null);
            //     } else {
            //         next(null, results);
            //     }
            // })
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
            db.ref('setMenus').once('value', (snapshot) => {
                next(null, snapshot.val())
            });

            // db.setMenus.find().toArray((findError: any, results: any) => {
            //     if (findError) {
            //         next(findError, null);
            //     } else {
            //         next(null, results);
            //     }
            // })
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
            const menuItemsRef = db.ref('menuItems');
            menuItemsRef.once('value', (snapshot) => {
                const menuItemsCount = snapshot.val()?.length || 0;

                if (menuItemsCount === 0) {
                    console.info("Seeding the Database for Menu Items...");

                    menuItemsRef.set(seedData.getMenuItems(), (error) => {
                        if (error) {
                            console.error("Failed to insert menu items into database");
                        } else {
                            console.info("Menu Items successfully seeded")
                        }
                    })

                } else {
                    console.info("MenuItems already seeded. Skipping...");
                }
            });

            const setMenusRef = db.ref('setMenus');
            setMenusRef.once('value', (snapshot) => {
                const menuItemsCount = snapshot.val()?.length || 0;

                if (menuItemsCount === 0) {
                    console.info("Seeding the Database for Set Menus...");

                    setMenusRef.set(seedData.getSetMenus(), (error) => {
                        if (error) {
                            console.error("Failed to insert Set Menus into database");
                        } else {
                            console.info("Set Menus successfully seeded")
                        }
                    })

                } else {
                    console.info("SetMenus already seeded. Skipping...");
                }
            });
        }
    })
}