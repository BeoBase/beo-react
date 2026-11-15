import Card from "../ui/Card.tsx";
import AppButton from "./AppButton.tsx";

import type { AppData } from "../../data/AppsData.ts";

type AppListProps = {
  apps: AppData[];
};

// Groups the flat list by tag, keeping the order in which each tag first appears.
function groupByTag(apps: AppData[]): [string, AppData[]][] {
  const groups = new Map<string, AppData[]>();

  for (const app of apps) {
    const group = groups.get(app.tag);
    if (group) {
      group.push(app);
    } else {
      groups.set(app.tag, [app]);
    }
  }

  return [...groups.entries()];
}

// Shows apps as "folders": one Card per tag, with the apps as buttons inside.
// It only displays what it is given: search and filter live in the parent,
// which passes the already-filtered list here. A tag with no apps is not shown.
export default function AppList({ apps }: AppListProps) {
  if (apps.length === 0) {
    return (
      <section className="mx-auto my-2 w-full max-w-6xl shadow-xl">
        <Card>
          <p className="text-center text-stone-100">No apps found.</p>
        </Card>
      </section>
    );
  }

  return (
    <>
      {groupByTag(apps).map(([tag, tagApps]) => (
        <section
          key={tag}
          className="mx-auto my-2 w-full max-w-6xl text-center shadow-xl"
        >
          <Card>
            <h2 className="mb-2 block text-2xl font-bold tracking-wide text-white drop-shadow-sm">
              {tag}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {tagApps.map((app) => (
                <AppButton key={app.name} app={app} />
              ))}
            </div>
          </Card>
        </section>
      ))}
    </>
  );
}
