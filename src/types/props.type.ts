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
  refetchAnnouncements: () => void;
}

export interface HolidayType {
  id: number;
  date: string;
  dayOfWeek: string;
  holidayName: string;
}

export type EmployeeRecord = {
  id: number;
  name: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  email: string;
  role: string;
  employeeType?: string;
  department: string;
  dateOfJoining: string;
  designation?: string;
  address?: string;
  password?: string;
};

export interface AddEmployeeModalProps {
  visible: boolean;
  onCloseModal: () => void;
  refetchUsers: () => void;
}

export interface HolidayProps {
  visible: boolean;
  onCloseModal: () => void;
  refetchHolidays: () => void;
  id?: number;
}

export interface DeleteModalProps {
  visible: boolean;
  onCloseModal: () => void;
  onOk: () => void;
  deleteModalMessage: string;
}

export interface EmployeeFormFieldFilterOptions {
  name: string;
  constant: string;
}

export interface AddNewEmployeeFormOptionsType {
  departments: EmployeeFormFieldFilterOptions[];
  roles: EmployeeFormFieldFilterOptions[];
  employeeTypes: EmployeeFormFieldFilterOptions[];
  bloodGroups: EmployeeFormFieldFilterOptions[];
  genders: EmployeeFormFieldFilterOptions[];
  [key: string]: EmployeeFormFieldFilterOptions[];
}

export interface EmployeeFormProps {
  form: any;
  isEditMode: boolean;
  isViewMode: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  showButtons: boolean;
  initialValues?: EmployeeRecord;
}
