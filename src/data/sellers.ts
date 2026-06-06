export type Seller = {
  id: string;
  name: string;
  initials: string;
  dept: string;
  hostel: string;
  year: string;
  rating: number;
  reviewCount: number;
  bio: string;
  joined: string;
};

export const sellers: Seller[] = [
  { id: "s1", name: "Ananya Iyer", initials: "AI", dept: "Computer Science", hostel: "Sarojini Hostel", year: "3rd Year", rating: 4.9, reviewCount: 47, bio: "Selling stuff I no longer need. Quick replies, fair prices.", joined: "Aug 2023" },
  { id: "s2", name: "Rohan Mehta", initials: "RM", dept: "Mechanical Engg.", hostel: "Tagore Hostel", year: "4th Year", rating: 4.7, reviewCount: 32, bio: "Final year — clearing out four years of gear.", joined: "Jul 2022" },
  { id: "s3", name: "Priya Nair", initials: "PN", dept: "Economics", hostel: "Kalpana Hostel", year: "2nd Year", rating: 4.8, reviewCount: 21, bio: "Notes-maker. All notes are color-coded and indexed.", joined: "Jan 2024" },
  { id: "s4", name: "Karthik Reddy", initials: "KR", dept: "Electrical Engg.", hostel: "Bose Hostel", year: "3rd Year", rating: 4.6, reviewCount: 28, bio: "Electronics enthusiast — everything tested before sale.", joined: "Oct 2023" },
  { id: "s5", name: "Meera Joshi", initials: "MJ", dept: "Design", hostel: "Sarojini Hostel", year: "4th Year", rating: 5.0, reviewCount: 53, bio: "Selling my design books & supplies. Everything in mint condition.", joined: "Mar 2022" },
  { id: "s6", name: "Aditya Verma", initials: "AV", dept: "Physics", hostel: "Raman Hostel", year: "2nd Year", rating: 4.5, reviewCount: 14, bio: "Cycle, lamp, books — moving back home next sem.", joined: "Feb 2024" },
  { id: "s7", name: "Sneha Kapoor", initials: "SK", dept: "Biotechnology", hostel: "Kalpana Hostel", year: "3rd Year", rating: 4.9, reviewCount: 38, bio: "Bio textbooks galore. Bargaining welcome.", joined: "Sep 2023" },
  { id: "s8", name: "Vikram Singh", initials: "VS", dept: "Civil Engg.", hostel: "Tagore Hostel", year: "M.Tech", rating: 4.8, reviewCount: 26, bio: "M.Tech selling refs and gadgets. DM for combo deals.", joined: "Aug 2023" },
];

export const getSeller = (id: string) => sellers.find((s) => s.id === id);
