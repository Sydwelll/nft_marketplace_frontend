import { create } from "zustand";
import { persist } from "zustand/middleware";

// Initial mock users data with one user already included
const initialUsers = [
  {
    email: "info@ecogreeninnovations.com",
    password: "ecofriendly",
    profile: {
      legalEntityName: "Eco Green Innovations",
      alternateName: "EGI",
      registeredBusinessAddress: "42 Greenway Blvd, 12345 Green City, EcoLand",
      city: "Green City",
      zipCode: "12345",
      profilePictureUrl:
        "https://img.freepik.com/premium-vector/tree-nature-logo-illustration-vector-cartoon-style-green-tree_194708-1766.jpg?w=2000",
      about:
        "Eco Green Innovations specializes in sustainable energy solutions, focusing on solar and wind energy technologies. Committed to environmental stewardship, we strive to reduce carbon footprints globally.",
    },
  },
  {
    email: "contact@globalindustries.com",
    password: "industrial",
    profile: {
      legalEntityName: "Global Heavy Industries",
      alternateName: "GHI",
      registeredBusinessAddress:
        "88 Industrial Park Rd, 67890 Smogtown, IndustryLand",
      city: "Smogtown",
      zipCode: "67890",
      profilePictureUrl:
        "https://png.pngtree.com/png-clipart/20190520/original/pngtree-cartoon-smog-haze-air-pollution-anthropomorphic-illustration-png-image_3904292.jpg",
      about:
        "Global Heavy Industries is a leading manufacturer in heavy machinery and chemical processing. We are pivotal in the global supply chain, focusing on industrial growth and development.",
    },
  },
];

export const useZustandStore = create(
  persist(
    (set, get) => ({
      // Users
      users: initialUsers,
      currentUser: null,
      login: (email, password) => {
        console.log("Email : ", email);
        console.log("Password : ", password);

        console.log("Users : ", JSON.stringify(get().users));

        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ currentUser: user.profile }, false); // false here means no need to persist this particular state change immediately
          return true; // Indicate success
        } else {
          console.error("Invalid credentials ");
          return false; // Indicate failure
        }
      },
      logout: () => {
        set({ currentUser: null });
      },
      isAuthenticated: () => {
        return get().currentUser !== null;
      },

      // Tabs
      currentTab: {},
      setCurrentTab: (tabName) => set({ currentTab: tabName }),

      // Emissions Data
      emissionsData: [],
      setEmissionsData: (data: any) => set({ emissionsData: data }),

      // Upload Data
      lastUploadDate: null,

      setLastUploadDate: (date) => set({ lastUploadDate: date.toISOString() }), // Store as ISO string

      canUpload: () => {
        const today = new Date();
        const lastUploadDate = get().lastUploadDate;

        if (!lastUploadDate) return true;

        const lastUpload = new Date(lastUploadDate);
        const lastUploadYear = lastUpload.getFullYear();

        return today.getFullYear() > lastUploadYear;
      },
    }),
    {
      name: "alyrastore", // Choose an appropriate name for your store
      getStorage: () => localStorage,
    }
  )
);
