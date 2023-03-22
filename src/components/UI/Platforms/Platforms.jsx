import { Link } from 'react-router-dom';

import playstation from '../../../resources/img/icons/playstation.svg';
import xbox from '../../../resources/img/icons/xbox.svg';
import pc from '../../../resources/img/icons/windows.svg';
import android from '../../../resources/img/icons/android.svg';
import nintendo from '../../../resources/img/icons/nintendo.svg';
import apple from '../../../resources/img/icons/ios.svg';

import './platforms.scss';

const Platforms = ({platforms}) => {
  const usedIcons = {};
  const platformIcons = {
    'PlayStation 5': playstation,
    'PlayStation 4': playstation,
    'PlayStation 3': playstation,
    'PS Vita': playstation,
    'Xbox Series S/X': xbox,
    'Xbox 360': xbox,
    'Xbox One': xbox,
    'Android': android,
    'Nintendo Switch': nintendo,
    'iOS': apple,
    'macOS': apple,
    'PC': pc,
    'Linux': pc
  };

  return (
    <ul className="platforms">
      {platforms !== null
          ? platforms.map((platform, index) => {
            const iconPath = platformIcons[platform.platform.name];
            if (iconPath && !usedIcons[iconPath]) { // if icon has not been displayed yet
              usedIcons[iconPath] = true;
              return <li key={index} className="platform"><Link to={`/platforms/${platform.platform.id}`}><img src={platformIcons[platform.platform.name]} alt="platform-icon" /></Link></li>;
            } else {
              return null;
            }
          })
          : null
      }
    </ul>
  );
};

export default Platforms;