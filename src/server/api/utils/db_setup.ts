import config from "./default_values/config.json";
import users from "./default_values/users.json";
import values from "./default_values/values.json";
import widgets from "./default_values/widgets.json";
import announcements from "./default_values/announcements.json";
import {createValues} from "../services/values.services";
import {createConfig} from "../services/config.services";
import {createUsers} from "../services/users.services";
import {createWidgetData} from "../services/widgetData.service";
import {createAdmin, getAdmin} from "../services/admin.service";
import {createAnnouncements} from "../services/announcements.services";

export async function ensureDatabaseContent(): Promise<void> {
    return getAdmin()
        .then(doc => {
            if (doc === null) return initDb();
        })
        .catch(() => initDb());
}

async function initDb() {
    await createAdmin({password: "admin"}); // this must be changed after the setup! (via the admin interface)
    await createConfig(config);
    await createUsers(users);
    await createValues(values);
    await createWidgetData(widgets);
    await createAnnouncements(announcements);
}