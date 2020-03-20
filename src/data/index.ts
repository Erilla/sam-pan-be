import * as database from './database.firebase';
import * as seedData from './seedData';

const MENUITEMS = 'menuItems';
const SETMENUS = 'setMenus';

export function getMenuItems(next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.ref(MENUITEMS).orderByChild('itemNumber').once('value', (snapshot) => {
                if (snapshot.val())
                {
                    next(null, snapshot.val())
                } else {
                    next(null, {})
                }
            });
        }
    })
}

// TODO: NOT CURRENTLY WORKING
export function getMenuItem(requestedItemNumber: any, next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            const menuItemsRef = db.ref(MENUITEMS);
            menuItemsRef.orderByChild('itemNumber').equalTo(requestedItemNumber).once('value', (snapshot) => {
                if (snapshot.val())
                {
                    next(null, snapshot.val())
                } else {
                    next(null, {})
                }
            });
        }
    })
}

export function getSetMenus(next: any) {
    database.getDb((err: any, db: any) => {
        if (err) {
            console.error("Failed to connect to database: " + err);
        } else {
            db.ref(SETMENUS).orderByChild('mealLetter').once('value', (snapshot) => {
                if (snapshot.val())
                {
                    next(null, snapshot.val())
                } else {
                    next(null, {})
                }
            });
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
            const menuItemsRef = db.ref(MENUITEMS);
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

            const setMenusRef = db.ref(SETMENUS);
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