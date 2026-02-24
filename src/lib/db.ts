import { type DBSchema, type IDBPDatabase, openDB } from "idb";

export interface AppConfig {
  name: string;
  icon: IconConfig;
  marker: MarkerConfig;
  themeColor: string;
  setupCompleted: boolean;
  darkMode: "system" | "light" | "dark";
}

export interface IconConfig {
  type: "emoji" | "image";
  emoji?: string;
  /** Base64 data URL for uploaded images or rendered emoji PNGs */
  imageDataUrl?: string;
}

export interface MarkerConfig {
  type: "emoji" | "lucide";
  emoji?: string;
  lucideIcon?: string;
}

export interface CheckInRecord {
  /** ISO date string: YYYY-MM-DD */
  date: string;
  checkedIn: boolean;
  createdAt: number;
}

interface TapdayDB extends DBSchema {
  config: {
    key: string;
    value: AppConfig;
  };
  checkIns: {
    key: string;
    value: CheckInRecord;
    indexes: { "by-date": string };
  };
}

const DB_NAME = "tapday";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<TapdayDB>> | null = null;

function getDB(): Promise<IDBPDatabase<TapdayDB>> {
  if (!dbPromise) {
    dbPromise = openDB<TapdayDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("config", { keyPath: "name" });
        const checkInStore = db.createObjectStore("checkIns", {
          keyPath: "date",
        });
        checkInStore.createIndex("by-date", "date");
      },
    });
  }
  return dbPromise;
}

const CONFIG_KEY = "app-config";

export const defaultConfig: AppConfig = {
  name: "Tapday",
  icon: { type: "emoji", emoji: "📅" },
  marker: { type: "emoji", emoji: "✅" },
  themeColor: "#f97316",
  setupCompleted: false,
  darkMode: "system",
};

export async function getConfig(): Promise<AppConfig> {
  const db = await getDB();
  const config = await db.get("config", CONFIG_KEY);
  return config ?? { ...defaultConfig };
}

export async function saveConfig(config: AppConfig): Promise<void> {
  const db = await getDB();
  // IndexedDB keyPath is "name" on the store, but we use a fixed key
  // We store with a synthetic key field
  await db.put("config", { ...config, name: CONFIG_KEY } as AppConfig & {
    name: string;
  });
}

export async function getCheckIn(
  date: string,
): Promise<CheckInRecord | undefined> {
  const db = await getDB();
  return db.get("checkIns", date);
}

export async function setCheckIn(
  date: string,
  checkedIn: boolean,
): Promise<void> {
  const db = await getDB();
  if (checkedIn) {
    await db.put("checkIns", { date, checkedIn: true, createdAt: Date.now() });
  } else {
    await db.delete("checkIns", date);
  }
}

export async function getCheckInsForRange(
  startDate: string,
  endDate: string,
): Promise<CheckInRecord[]> {
  const db = await getDB();
  return db.getAllFromIndex(
    "checkIns",
    "by-date",
    IDBKeyRange.bound(startDate, endDate),
  );
}

export async function getAllCheckIns(): Promise<CheckInRecord[]> {
  const db = await getDB();
  return db.getAll("checkIns");
}

export async function clearAllData(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(["config", "checkIns"], "readwrite");
  await Promise.all([
    tx.objectStore("config").clear(),
    tx.objectStore("checkIns").clear(),
    tx.done,
  ]);
}
