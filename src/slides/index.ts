import { SlideComponent } from "@/deck/types";

import S01 from "./01-Title";
import S02 from "./02-Agenda";
import S03 from "./03-Ecosystem";
import S04 from "./04-StableBridge";
import S05 from "./05-CoreIndustry";
import S06 from "./06-CompanyMap";
import S07 from "./07-PlatformTimeline";
import S08 from "./08-PlatformStrategy";
import S09 from "./09-PlatformStress";
import S10 from "./10-PlatformVerdict";
import S11 from "./11-DeviceRevenue";
import S12 from "./12-DeviceStress";
import S13 from "./13-DeviceFinance";
import S14 from "./14-DeviceVerdict";
import S15 from "./15-Final";
import S16 from "./16-Vote";
import S17 from "./17-Comparison";
import S18 from "./18-Closing";

// Deck rebuilt from sample_presentation.pptx — see memory: deck-redesign-pptx.
// Part 1 생태계(03-04) · Part 2 주요사업(05-06) · Part 3A Meta vs X(07-10)
// · Part 3B Samsung vs Apple(11-14) · Part 4 최종선정(15-17) · Q&A(18).
export const slides: SlideComponent[] = [
  S01, S02, S03, S04, S05, S06, S07, S08, S09,
  S10, S11, S12, S13, S14, S15, S16, S17, S18,
];
