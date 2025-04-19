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
}
export interface HolidayProps {
  visible: boolean;
  onCancel: () => void;
  refetchHolidays: () => void;
  id?: number;
}