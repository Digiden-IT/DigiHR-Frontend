export type ServiceCardProps = {
  icon: string;
  text: string;
};

export type FeatureCardProps = {
  title: string;
  content: string;
  image: string;
  bgColor: string;
};
export interface AnnouncementType {
  id: number;
  title: string;
  description: string;
  authorName: string;
  announcementDate: string;
}
export interface AnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onAdd?: (announcement: AnnouncementType) => void;
  initialData?: AnnouncementType | null;
  isEditing?: boolean;
};
export interface HolidayType {
  id: number;
  date: string;
  dayOfWeek: string;
  holidayName: string;
  // Add any other properties that might be needed
}
export interface HolidayProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (newHoliday: HolidayType) => void;
}
export interface HolidayManagementApiResponse {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  data: HolidayType[];
}
