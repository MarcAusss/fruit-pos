// /types/Notification.ts
export type Notification = {
  id: string;                   // Firestore doc ID
  message: string;              // Notification text
  time: string;                 // Example: "Just now"
  type: "added" | "updated" | "removed"; 
};