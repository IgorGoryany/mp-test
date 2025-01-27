import { ChangeEvent } from "react";
import { LocationsStore } from "../../store/useLocationsStore";
import { LeafIcon } from "../icons/LeafIcon";
import { LocationIcon } from "../icons/LocationIcon";
import { ServerIcon } from "../icons/ServerIcon";
import { Select } from "../Select/Select";
import s from "./TestLocationSelects.module.css";

export interface LocationItem {
  locationID?: number;
  environmentID?: number;
  hint: string;
  id: number;
}

interface TestLocationSelectsProps {
  store: Omit<LocationsStore, "fetch" | "isLoaded">;
  onChangeLocation: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeEnvironment: (e: ChangeEvent<HTMLSelectElement>) => void;
  location: LocationItem;
}

export const TestLocationSelects = (props: TestLocationSelectsProps) => {
  const { store, location, onChangeEnvironment, onChangeLocation } = props;
  return (
    <div className={s.selects}>
      <Select
        icon={<LocationIcon />}
        label="Локация"
        items={store.locations}
        value={location.locationID}
        onChange={onChangeLocation}
      >
        {(location) => (
          <option key={location.locationID} value={location.locationID}>
            {location.name}
          </option>
        )}
      </Select>
      <Select
        icon={<LeafIcon />}
        label="Среда"
        items={store.environments}
        value={location.environmentID}
        onChange={onChangeEnvironment}
      >
        {(env) => (
          <option key={env.environmentID} value={env.environmentID}>
            {env.name}
          </option>
        )}
      </Select>
      <div className={s.servers}>
        <ServerIcon />
        {store.servers
          .filter(
            (server) =>
              server.locationID === location.locationID &&
              server.environmentID === location.environmentID,
          )
          .map((server) => server.name)
          .join(", ") || "Нет серверов"}
      </div>
    </div>
  );
};
