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
  name: string;
  role: string;
  time: string;
  topic: string;
  content: string;
  avatar: string;
};
export interface AnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (announcement: AnnouncementType) => void;
  initialData?: AnnouncementType | null;
  isEditing?: boolean;
};
export interface HolidayType {
  key: string;
  date: string;
  day: string;
  holidayName: string;
};

export interface HolidayProps {
  visible: boolean;
  onCancel: () =>void;
  onAdd:(newHoliday: HolidayType) => void;
};


