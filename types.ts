
export interface Alarm {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  label: string;
  days: string[];
  isActive: boolean;
}

export enum AppScreen {
  ALARMS = 'ALARMS',
  MISSION = 'MISSION',
  ANALYSIS = 'ANALYSIS',
  SOUNDS = 'SOUNDS',
  PROFILE = 'PROFILE'
}

export interface SleepDataPoint {
  day: string;
  quality: number;
  isToday?: boolean;
}
