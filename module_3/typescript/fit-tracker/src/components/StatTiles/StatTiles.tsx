import type { StatTileType } from '../../types/statTileTypes';
import './StatTiles.css';

// big-number tiles shared by the admin overview and catalog
export function StatTiles({
  tiles,
  label,
}: {
  tiles: StatTileType[];
  label: string;
}) {
  return (
    <dl className="stat-tiles" aria-label={label}>
      {tiles.map((tile) => (
        <div className="stat-tiles__tile" key={tile.label}>
          <dt>{tile.label}</dt>
          <dd className="stat-tiles__value">{tile.value}</dd>
          {tile.detail && <dd className="stat-tiles__detail">{tile.detail}</dd>}
        </div>
      ))}
    </dl>
  );
}
