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

export type EmployeeFormValues = {
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

export type EmployeeRecord = {
  id: number;
  name: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: FormFieldFilterType; 
  bloodGroup?: FormFieldFilterType;
  email: string;
  role: FormFieldFilterType; 
  employeeType?: FormFieldFilterType; 
  department: FormFieldFilterType;
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

export interface FormFieldFilterType {
  name: string;
  constant: string;
}

export interface AddNewEmployeeFormOptionsType {
  departments: FormFieldFilterType[];
  roles: FormFieldFilterType[];
  employeeTypes: FormFieldFilterType[];
  bloodGroups: FormFieldFilterType[];
  genders: FormFieldFilterType[];
  [key: string]: FormFieldFilterType[];
}

export interface EmployeeFormProps {
  form: any;
  isEditMode: boolean;
  isViewMode: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  showButtons: boolean;
  initialValues?: EmployeeRecord;
  currentUserRole?: string;
}

export interface LeaveRecord {
  id: number;
  employeeName: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  leaveReason: FormFieldFilterType;
  requestStatus: FormFieldFilterType;
  numberOfDays: number;
}

export interface LeaveStatsCardProps {
  totalLeave: number;
  usedLeave: number;
  pendingLeave: number;
  availableLeave: number;
}

export interface LeaveRequestModalProps {
  visible: boolean;
  onCloseModal: () => void;
  refetchLeave: () => void;
}
export interface AddLeaveRequestFormOptionsType {
  departments: FormFieldFilterType[];
  leaveReason: FormFieldFilterType[];
  requestStatus: FormFieldFilterType[];
}
