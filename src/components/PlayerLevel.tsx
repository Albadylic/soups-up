import { getXPForCurrentLevel, getXPForNextLevel } from '../data/levelConfig';

interface PlayerLevelProps {
  level: number;
  xp: number;
}

export function PlayerLevel({ level, xp }: PlayerLevelProps) {
  const currentLevelXP = getXPForCurrentLevel(level);
  const nextLevelXP = getXPForNextLevel(level);

  let progressPercent = 100;
  if (nextLevelXP !== null) {
    const xpIntoLevel = xp - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;
    progressPercent = Math.min(100, (xpIntoLevel / xpNeededForLevel) * 100);
  }

  return (
    <div class="player-level">
      <div class="level-badge">Lv {level}</div>
      <div class="xp-bar-container">
        <div class="xp-bar" style={{ width: `${progressPercent}%` }} />
      </div>
      <div class="xp-text">
        {xp} XP
      </div>
    </div>
  );
}
