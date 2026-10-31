import React from 'react';
import FloralRomance from '../templates/FloralRomance';
import RoyalGold from '../templates/RoyalGold';
import RusticBoho from '../templates/RusticBoho';
import ModernMinimal from '../templates/ModernMinimal';
import GardenBloom from '../templates/GardenBloom';
import VintageLace from '../templates/VintageLace';
import SouthIndian from '../templates/SouthIndian';
import NorthIndian from '../templates/NorthIndian';
import CelestialStarry from '../templates/CelestialStarry';
import BeachSunset from '../templates/BeachSunset';
import ArtDeco from '../templates/ArtDeco';
import PastelDreamy from '../templates/PastelDreamy';
import BlackTie from '../templates/BlackTie';
import WatercolorWhimsy from '../templates/WatercolorWhimsy';
import CherryBlossom from '../templates/CherryBlossom';
import EmeraldForest from '../templates/EmeraldForest';
import MoroccanLuxe from '../templates/MoroccanLuxe';
import RedGoldFestive from '../templates/RedGoldFestive';
import PurpleRoyale from '../templates/PurpleRoyale';
import IvoryPearl from '../templates/IvoryPearl';
import TealBreeze from '../templates/TealBreeze';
import BurgundyBlossom from '../templates/BurgundyBlossom';

const TEMPLATE_MAP = {
  'floral-romance': FloralRomance,
  'royal-gold': RoyalGold,
  'rustic-boho': RusticBoho,
  'modern-minimal': ModernMinimal,
  'garden-bloom': GardenBloom,
  'vintage-lace': VintageLace,
  'south-indian': SouthIndian,
  'north-indian': NorthIndian,
  'celestial-starry': CelestialStarry,
  'beach-sunset': BeachSunset,
  'art-deco': ArtDeco,
  'pastel-dreamy': PastelDreamy,
  'black-tie': BlackTie,
  'watercolor-whimsy': WatercolorWhimsy,
  'cherry-blossom': CherryBlossom,
  'emerald-forest': EmeraldForest,
  'moroccan-luxe': MoroccanLuxe,
  'red-gold-festive': RedGoldFestive,
  'purple-royale': PurpleRoyale,
  'ivory-pearl': IvoryPearl,
  'teal-breeze': TealBreeze,
  'burgundy-blossom': BurgundyBlossom,
};

export default function TemplateRenderer({ templateId, data }) {
  const Component = TEMPLATE_MAP[templateId] || FloralRomance;
  return <Component data={data} />;
}
