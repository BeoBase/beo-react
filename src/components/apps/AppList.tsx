import Card from "../ui/Card.tsx";
import AppButton from "./AppButton.tsx";

import type { AppData } from "./AppData.ts";

type AppListProps = {
  apps: AppData[];
};

// Folder for apps that have no tag, so they are never hidden
const NO_TAG_FOLDER = "Other";

// Groups the apps by tag, keeping the order in which each tag first appears.
// An app with several tags shows up in every one of its folders.
function groupByTag(apps: AppData[]): [string, AppData[]][] {
  const groups = new Map<string, AppData[]>();

  for (const app of apps) {
    const tags = app.tags.length > 0 ? app.tags : [NO_TAG_FOLDER];

    for (const tag of tags) {
      const group = groups.get(tag);
      if (group) {
        group.push(app);
      } else {
        groups.set(tag, [app]);
      }
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
      <Card layout="page">
        <p className="text-center text-stone-100">No apps found.</p>
      </Card>
    );
  }

  return (
    <>
      {groupByTag(apps).map(([tag, tagApps]) => (
        <Card key={tag} layout="page" className="text-center">
          <h2 className="mb-2 block text-2xl font-bold tracking-wide text-white drop-shadow-sm">
            {tag}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {tagApps.map((app) => (
              <AppButton key={app.id} app={app} />
            ))}
          </div>
        </Card>
      ))}
    </>
  );
}
