import EmissionsChart from "@/components/Profile/EmissionsCharts";
import KYBInformation from "@/components/Profile/KYBInformations";
import OwnedNFTsList from "@/components/Profile/OwnedNFTList";
import UploadReport from "@/components/Profile/UploadReport";

import {
  faBell,
  faChartScatterBubble,
  faCogs,
  faFileExcel,
  faKey,
  faUserCircle,
  faWallet,
} from "@fortawesome/pro-duotone-svg-icons";

export const tabs = [
  {
    name: "KYB Information",
    icon: faUserCircle,
    current: true,
  },
  {
    name: "Emission Report",
    icon: faFileExcel,
    current: false,
  },
  {
    name: "Report Analysis",
    icon: faChartScatterBubble,
    current: false,
  },
  {
    name: "Wallet",
    icon: faWallet,
    current: false,
  },
  { name: "Password", icon: faKey, current: false },
  { name: "Notifications", icon: faBell, current: false },

  { name: "Settings", icon: faCogs, current: false },
];

export const tabComponents = {
  "KYB Information": KYBInformation,
  "Emission Report": UploadReport,
  "Report Analysis": EmissionsChart,
  Wallet: OwnedNFTsList,
};
