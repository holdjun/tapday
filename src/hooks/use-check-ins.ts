"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type CheckInRecord,
  getAllCheckIns,
  getCheckInsForRange,
  setCheckIn as dbSetCheckIn,
} from "@/lib/db";

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthRange(year: number, month: number) {
  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
}

export interface CheckInStats {
  currentStreak: number;
  monthCount: number;
  monthTotal: number;
  totalCount: number;
}

export function useCheckIns(year: number, month: number) {
  const [monthRecords, setMonthRecords] = useState<Map<string, CheckInRecord>>(
    new Map(),
  );
  const [stats, setStats] = useState<CheckInStats>({
    currentStreak: 0,
    monthCount: 0,
    monthTotal: 0,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  const loadData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      // Load month records
      const { start, end } = getMonthRange(year, month);
      const records = await getCheckInsForRange(start, end);
      const map = new Map<string, CheckInRecord>();
      for (const r of records) {
        map.set(r.date, r);
      }
      setMonthRecords(map);

      // Calculate stats
      const all = await getAllCheckIns();
      const dates = new Set(all.map((r) => r.date));
      const totalCount = dates.size;
      const monthCount = all.filter(
        (r) => r.date >= start && r.date <= end,
      ).length;
      const monthTotal = new Date(year, month + 1, 0).getDate();

      let currentStreak = 0;
      const today = new Date();
      const d = new Date(today);
      while (true) {
        const key = formatDate(d);
        if (dates.has(key)) {
          currentStreak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }

      setStats({ currentStreak, monthCount, monthTotal, totalCount });
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleCheckIn = useCallback(
    async (date: string) => {
      const existing = monthRecords.get(date);
      const newState = !existing;
      await dbSetCheckIn(date, newState);
      await loadData();
    },
    [monthRecords, loadData],
  );

  return { monthRecords, stats, loading, toggleCheckIn };
}
